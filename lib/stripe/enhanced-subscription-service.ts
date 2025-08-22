/**
 * Enhanced Subscription Service with N8N Integration
 * Extends the base subscription service to trigger N8N workflows
 */

import { SubscriptionService, SubscriptionPlan } from './subscription-service';
import { n8nService } from '@/lib/services/n8n-integration-service';
import { db } from '@/lib/database/adapter';
import Stripe from 'stripe';

interface CompanyWithStripe {
  id: number;
  company_name: string;
  email?: string;
  contact_email?: string;
  stripe_customer_id?: string;
}

interface StripeInvoiceData {
  id: string;
  subscription?: string;
  customer: string;
  amount_paid: number;
  amount_due: number;
  currency: string;
  number?: string;
  hosted_invoice_url?: string;
  next_payment_attempt?: number;
  attempt_count?: number;
  last_finalization_error?: {
    message?: string;
  };
}

interface StripeSubscriptionData {
  id: string;
  customer: string;
  current_period_end: number;
  trial_end?: number;
  canceled_at?: number;
  cancellation_details?: {
    reason?: string;
  };
  items: {
    data: Array<{
      price: {
        id: string;
        recurring?: {
          interval: string;
        };
      };
    }>;
  };
}

export class EnhancedSubscriptionService extends SubscriptionService {
  
  /**
   * Enhanced webhook handler that triggers N8N workflows
   */
  async handleWebhook(
    body: string,
    signature: string
  ): Promise<{ processed: boolean; event?: Stripe.Event }> {
    // First, process with parent class
    const result = await super.handleWebhook(body, signature);
    
    if (!result.processed || !result.event) {
      return result;
    }

    // Then trigger N8N workflows based on event type
    try {
      await this.triggerN8NWorkflow(result.event);
    } catch (error) {
      console.error('[Enhanced Subscription] Error triggering N8N workflow:', error);
      // Don't fail the webhook processing if N8N fails
    }

    return result;
  }

  /**
   * Trigger appropriate N8N workflow based on Stripe event
   */
  private async triggerN8NWorkflow(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        await this.handlePaymentSuccessWorkflow(event.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await this.handlePaymentFailedWorkflow(event.data.object as Stripe.Invoice);
        break;
      
      case 'customer.subscription.created':
        await this.handleSubscriptionCreatedWorkflow(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdatedWorkflow(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await this.handleSubscriptionCancelledWorkflow(event.data.object as Stripe.Subscription);
        break;
    }
  }

  /**
   * Handle payment success workflow
   */
  private async handlePaymentSuccessWorkflow(invoice: Stripe.Invoice): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(invoice.customer as string);
    if (!companyId) return;

    const company = await db.getCompany(companyId);
    if (!company) return;
    const companyWithStripe = company as CompanyWithStripe;

    // Get subscription details - invoice may have subscription info
    const invoiceData = invoice as unknown as StripeInvoiceData;
    const subscriptionId = invoiceData.subscription;
    const subscription = subscriptionId 
      ? await this.stripe.subscriptions.retrieve(subscriptionId) as unknown as StripeSubscriptionData
      : null;

    await n8nService.triggerWorkflow('payment_success', {
      companyId,
      amount: invoiceData.amount_paid / 100, // Convert from cents
      currency: invoiceData.currency || 'usd',
      invoiceNumber: invoiceData.number || `INV-${invoiceData.id}`,
      invoiceUrl: invoiceData.hosted_invoice_url || undefined,
      customerEmail: company.email || companyWithStripe.contact_email || '',
      customerName: company.company_name,
      subscriptionPlan: this.getPlanFromSubscription(subscription),
      nextBillingDate: subscription 
        ? new Date(subscription.current_period_end * 1000)
        : new Date()
    });
  }

  /**
   * Handle payment failed workflow
   */
  private async handlePaymentFailedWorkflow(invoice: Stripe.Invoice): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(invoice.customer as string);
    if (!companyId) return;

    const company = await db.getCompany(companyId);
    if (!company) return;
    const companyWithStripe = company as CompanyWithStripe;
    const invoiceData = invoice as unknown as StripeInvoiceData;

    // Calculate next retry date if applicable
    let nextRetryDate: Date | undefined;
    if (invoiceData.next_payment_attempt) {
      nextRetryDate = new Date(invoiceData.next_payment_attempt * 1000);
    }

    await n8nService.triggerWorkflow('payment_failed', {
      companyId,
      amount: invoiceData.amount_due / 100, // Convert from cents
      currency: invoiceData.currency || 'usd',
      invoiceNumber: invoiceData.number || `INV-${invoiceData.id}`,
      customerEmail: company.email || companyWithStripe.contact_email || '',
      customerName: company.company_name,
      failureReason: this.getFailureReason(invoice),
      attemptCount: invoiceData.attempt_count || 1,
      nextRetryDate
    });
  }

  /**
   * Handle subscription created workflow
   */
  private async handleSubscriptionCreatedWorkflow(subscription: Stripe.Subscription): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(subscription.customer as string);
    if (!companyId) return;

    const company = await db.getCompany(companyId);
    if (!company) return;
    const companyWithStripe = company as CompanyWithStripe;
    const subscriptionData = subscription as unknown as StripeSubscriptionData;

    const plan = this.getPlanFromSubscription(subscription);
    const billingPeriod = this.getBillingPeriod(subscription);

    await n8nService.triggerWorkflow('subscription_created', {
      companyId,
      plan,
      billingPeriod,
      customerEmail: company.email || companyWithStripe.contact_email || '',
      customerName: company.company_name,
      trialEndsAt: subscriptionData.trial_end 
        ? new Date(subscriptionData.trial_end * 1000)
        : undefined
    });
  }

  /**
   * Handle subscription updated workflow
   */
  private async handleSubscriptionUpdatedWorkflow(subscription: Stripe.Subscription): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(subscription.customer as string);
    if (!companyId) return;

    const company = await db.getCompany(companyId);
    if (!company) return;
    const companyWithStripe = company as CompanyWithStripe;

    // For updates, we'd need to track the previous plan
    // This would require storing subscription history
    const newPlan = this.getPlanFromSubscription(subscription);
    
    await n8nService.triggerWorkflow('subscription_updated', {
      companyId,
      oldPlan: 'previous_plan', // You'd need to track this
      newPlan,
      customerEmail: company.email || companyWithStripe.contact_email || '',
      customerName: company.company_name,
      effectiveDate: new Date()
    });
  }

  /**
   * Handle subscription cancelled workflow
   */
  private async handleSubscriptionCancelledWorkflow(subscription: Stripe.Subscription): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(subscription.customer as string);
    if (!companyId) return;

    const company = await db.getCompany(companyId);
    if (!company) return;
    const companyWithStripe = company as CompanyWithStripe;
    const subscriptionData = subscription as unknown as StripeSubscriptionData;

    const plan = this.getPlanFromSubscription(subscription);

    await n8nService.triggerWorkflow('subscription_cancelled', {
      companyId,
      plan,
      customerEmail: company.email || companyWithStripe.contact_email || '',
      customerName: company.company_name,
      cancellationDate: subscriptionData.canceled_at 
        ? new Date(subscriptionData.canceled_at * 1000)
        : new Date(),
      reason: subscriptionData.cancellation_details?.reason
    });
  }

  /**
   * Check usage and trigger warning if needed
   */
  async checkUsageAndWarn(companyId: number): Promise<void> {
    const stats = await this.getUsageStats(companyId);
    
    if (stats.quotesLimit > 0) { // Not unlimited
      const percentageUsed = (stats.quotesThisMonth / stats.quotesLimit) * 100;
      
      // Trigger warning at 80% usage
      if (percentageUsed >= 80 && percentageUsed < 100) {
        const company = await db.getCompany(companyId);
        if (!company) return;
        const companyWithStripe = company as CompanyWithStripe;

        await n8nService.triggerWorkflow('usage_limit_warning', {
          companyId,
          currentUsage: stats.quotesThisMonth,
          limit: stats.quotesLimit,
          percentageUsed,
          customerEmail: company.email || companyWithStripe.contact_email || ''
        });
      }
    }
  }

  // Helper methods

  private getPlanFromSubscription(subscription: Stripe.Subscription | null): string {
    if (!subscription) return 'free';
    
    const subscriptionData = subscription as unknown as StripeSubscriptionData;
    const priceId = subscriptionData.items.data[0]?.price.id;
    if (!priceId) return 'free';
    
    return this.getPlanFromPriceId(priceId);
  }

  private getBillingPeriod(subscription: Stripe.Subscription): 'monthly' | 'yearly' {
    const subscriptionData = subscription as unknown as StripeSubscriptionData;
    const interval = subscriptionData.items.data[0]?.price.recurring?.interval;
    return interval === 'year' ? 'yearly' : 'monthly';
  }

  private getFailureReason(invoice: Stripe.Invoice): string {
    // Extract failure reason from invoice
    // In Stripe v18, charge info is accessed differently
    const invoiceData = invoice as unknown as StripeInvoiceData;
    if (invoiceData.last_finalization_error) {
      return invoiceData.last_finalization_error.message || 'Payment failed';
    }
    return 'Payment failed';
  }

  private stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// Export enhanced service
export const enhancedSubscriptionService = new EnhancedSubscriptionService();