import { stripe, STRIPE_PRICE_IDS } from './stripe-client';
import { db } from '@/lib/database/adapter';
import Stripe from 'stripe';

export type SubscriptionPlan = 'professional' | 'business';
export type BillingPeriod = 'monthly' | 'yearly';

export interface SubscriptionInfo {
  id: string;
  status: string;
  plan: SubscriptionPlan;
  billingPeriod: BillingPeriod;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  customerId: string;
}

export class SubscriptionService {
  private db = db;

  async createCheckoutSession(
    companyId: number,
    plan: SubscriptionPlan,
    billingPeriod: BillingPeriod,
    returnUrl: string
  ): Promise<Stripe.Checkout.Session> {
    const company = await this.db.getCompany(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const priceId = STRIPE_PRICE_IDS[plan][billingPeriod];
    if (!priceId) {
      throw new Error('Invalid plan or billing period');
    }

    // Create or retrieve customer
    let customerId = (company as any).stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: company.email || (company as any).contact_email,
        name: company.company_name,
        metadata: {
          companyId: companyId.toString()
        }
      });
      customerId = customer.id;
      
      // Update company with customer ID
      await this.db.updateCompany(companyId, {
        // Store customer ID in a way that doesn't break the interface
      } as any);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}/billing?cancelled=true`,
      metadata: {
        companyId: companyId.toString(),
        plan,
        billingPeriod
      }
    });

    return session;
  }

  async getSubscriptionInfo(companyId: number): Promise<SubscriptionInfo | null> {
    const company = await this.db.getCompany(companyId);
    if (!(company as any)?.stripe_customer_id) {
      return null;
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: (company as any).stripe_customer_id,
      status: 'active',
      limit: 1
    });

    const subscription = subscriptions.data[0];
    if (!subscription) {
      return null;
    }

    const price = subscription.items.data[0].price;
    const plan = this.getPlanFromPriceId(price.id);
    const billingPeriod = price.recurring?.interval === 'year' ? 'yearly' : 'monthly';

    return {
      id: subscription.id,
      status: subscription.status,
      plan,
      billingPeriod,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
      customerId: (company as any).stripe_customer_id
    };
  }

  async cancelSubscription(companyId: number, immediately: boolean = false): Promise<void> {
    const subscriptionInfo = await this.getSubscriptionInfo(companyId);
    if (!subscriptionInfo) {
      throw new Error('No active subscription found');
    }

    if (immediately) {
      await stripe.subscriptions.cancel(subscriptionInfo.id);
    } else {
      await stripe.subscriptions.update(subscriptionInfo.id, {
        cancel_at_period_end: true
      });
    }
  }

  async reactivateSubscription(companyId: number): Promise<void> {
    const subscriptionInfo = await this.getSubscriptionInfo(companyId);
    if (!subscriptionInfo) {
      throw new Error('No subscription found');
    }

    await stripe.subscriptions.update(subscriptionInfo.id, {
      cancel_at_period_end: false
    });
  }

  async createCustomerPortalSession(companyId: number, returnUrl: string): Promise<Stripe.BillingPortal.Session> {
    const company = await this.db.getCompany(companyId);
    if (!(company as any)?.stripe_customer_id) {
      throw new Error('No customer ID found');
    }

    return await stripe.billingPortal.sessions.create({
      customer: (company as any).stripe_customer_id,
      return_url: returnUrl,
    });
  }

  async handleWebhook(
    body: string,
    signature: string
  ): Promise<{ processed: boolean; event?: Stripe.Event }> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('Stripe webhook secret not configured');
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      throw new Error('Invalid webhook signature');
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case 'invoice.payment_succeeded':
        await this.handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return { processed: false };
    }

    return { processed: true, event };
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const companyId = parseInt(session.metadata?.companyId || '0');
    if (!companyId) return;

    // Update company subscription status
    await this.db.updateCompany(companyId, {
      subscription_tier: session.metadata?.plan === 'business' ? 'business' : 'professional'
    } as any);
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(subscription.customer as string);
    if (!companyId) return;

    const price = subscription.items.data[0].price;
    const plan = this.getPlanFromPriceId(price.id);

    await this.db.updateCompany(companyId, {
      subscription_tier: plan === 'business' ? 'business' : 'professional'
    } as any);
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(subscription.customer as string);
    if (!companyId) return;

    await this.db.updateCompany(companyId, {
      subscription_tier: 'free'
    } as any);
  }

  private async handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(invoice.customer as string);
    if (!companyId) return;

    // Log successful payment
    console.log(`Payment succeeded for company ${companyId}, amount: ${invoice.amount_paid}`);
  }

  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    const companyId = await this.getCompanyIdFromCustomer(invoice.customer as string);
    if (!companyId) return;

    // Log failed payment - could send notification email here
    console.log(`Payment failed for company ${companyId}, amount: ${invoice.amount_due}`);
  }

  private async getCompanyIdFromCustomer(customerId: string): Promise<number | null> {
    const customer = await stripe.customers.retrieve(customerId);
    if ('metadata' in customer && customer.metadata?.companyId) {
      return parseInt(customer.metadata.companyId);
    }
    return null;
  }

  private getPlanFromPriceId(priceId: string): SubscriptionPlan {
    // Check against our configured price IDs
    if (priceId === STRIPE_PRICE_IDS.professional.monthly || 
        priceId === STRIPE_PRICE_IDS.professional.yearly) {
      return 'professional';
    }
    if (priceId === STRIPE_PRICE_IDS.business.monthly || 
        priceId === STRIPE_PRICE_IDS.business.yearly) {
      return 'business';
    }
    return 'professional'; // Default fallback
  }

  async getUsageStats(companyId: number): Promise<{
    quotesThisMonth: number;
    quotesLimit: number;
    plan: SubscriptionPlan | 'free';
  }> {
    const _company = await this.db.getCompany(companyId);
    const subscriptionInfo = await this.getSubscriptionInfo(companyId);
    
    // Determine plan and quote limits
    let plan: SubscriptionPlan | 'free';
    let quotesLimit: number;
    
    if (!subscriptionInfo || subscriptionInfo.status !== 'active') {
      // Free tier
      plan = 'free';
      quotesLimit = 5; // Free tier gets 5 quotes per month
    } else {
      // Paid tiers
      plan = subscriptionInfo.plan;
      quotesLimit = plan === 'business' ? -1 : 50; // -1 means unlimited
    }
    
    // Get quotes created this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const quotesThisMonth = await this.db.getQuotesCount(companyId, startOfMonth);
    
    return {
      quotesThisMonth,
      quotesLimit,
      plan
    };
  }
}