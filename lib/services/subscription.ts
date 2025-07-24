import { db } from '@/lib/database/adapter';

export interface SubscriptionTier {
  name: string;
  displayName: string;
  monthlyQuoteLimit: number;
  features: string[];
  price: number;
}

export const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  free: {
    name: 'free',
    displayName: 'Free',
    monthlyQuoteLimit: 5,
    features: [
      '5 quotes per month',
      'AI-powered quote creation',
      'Basic templates',
      'Mobile access'
    ],
    price: 0
  },
  pro: {
    name: 'pro',
    displayName: 'Pro',
    monthlyQuoteLimit: -1, // Unlimited
    features: [
      'Unlimited quotes',
      'Professional templates',
      'Custom branding',
      'Analytics & insights',
      'Priority support',
      'Advanced AI features',
      'Quote tracking',
      'Automated follow-ups'
    ],
    price: 79
  },
  enterprise: {
    name: 'enterprise',
    displayName: 'Enterprise',
    monthlyQuoteLimit: -1, // Unlimited
    features: [
      'Everything in Pro',
      'Multiple users',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'Custom reporting',
      'White-label options'
    ],
    price: -1 // Custom pricing
  }
};

export class SubscriptionService {
  static async checkQuoteLimit(companyId: number): Promise<{ allowed: boolean; remaining: number; limit: number }> {
    const company = await db.getCompany(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    // Reset monthly count if needed
    await this.resetMonthlyQuotesIfNeeded(companyId);

    const tier = SUBSCRIPTION_TIERS[company.subscription_tier || 'free'];
    const limit = tier.monthlyQuoteLimit;
    const count = company.monthly_quote_count || 0;

    // Unlimited for pro and enterprise
    if (limit === -1) {
      return { allowed: true, remaining: -1, limit: -1 };
    }

    const remaining = Math.max(0, limit - count);
    return { 
      allowed: count < limit, 
      remaining,
      limit 
    };
  }

  static async incrementQuoteCount(companyId: number): Promise<void> {
    const company = await db.getCompany(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const newCount = (company.monthly_quote_count || 0) + 1;
    await db.updateCompany(companyId, {
      monthly_quote_count: newCount
    });
  }

  static async resetMonthlyQuotesIfNeeded(companyId: number): Promise<void> {
    const company = await db.getCompany(companyId);
    if (!company) return;

    const lastReset = company.last_quote_reset ? new Date(company.last_quote_reset) : new Date();
    const now = new Date();
    
    // Check if we're in a new month
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
      await db.updateCompany(companyId, {
        monthly_quote_count: 0,
        last_quote_reset: now.toISOString()
      });
    }
  }

  static async upgradeToPro(companyId: number, stripeCustomerId?: string, stripeSubscriptionId?: string): Promise<void> {
    const company = await db.getCompany(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const previousTier = company.subscription_tier || 'free';
    
    await db.updateCompany(companyId, {
      subscription_tier: 'pro',
      subscription_status: 'active',
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      trial_ends_at: null // Clear trial if upgrading
    });

    // Log the subscription event
    await this.logSubscriptionEvent(companyId, 'upgrade', previousTier, 'pro');
  }

  static async startTrial(companyId: number, durationDays: number = 14): Promise<Date> {
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + durationDays);

    await db.updateCompany(companyId, {
      subscription_tier: 'pro',
      subscription_status: 'trialing',
      trial_ends_at: trialEndDate.toISOString()
    });

    await this.logSubscriptionEvent(companyId, 'trial_started', 'free', 'pro', { 
      duration_days: durationDays 
    });

    return trialEndDate;
  }

  static async checkTrialStatus(companyId: number): Promise<{ isTrialing: boolean; daysRemaining: number; expired: boolean }> {
    const company = await db.getCompany(companyId);
    if (!company || !company.trial_ends_at) {
      return { isTrialing: false, daysRemaining: 0, expired: false };
    }

    const now = new Date();
    const trialEnd = new Date(company.trial_ends_at);
    const isTrialing = company.subscription_status === 'trialing';
    const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const expired = daysRemaining <= 0;

    // If trial expired, downgrade to free
    if (expired && isTrialing) {
      await this.downgradeToFree(companyId);
    }

    return { isTrialing, daysRemaining: Math.max(0, daysRemaining), expired };
  }

  static async downgradeToFree(companyId: number): Promise<void> {
    const company = await db.getCompany(companyId);
    if (!company) return;

    const previousTier = company.subscription_tier || 'pro';

    await db.updateCompany(companyId, {
      subscription_tier: 'free',
      subscription_status: 'active',
      trial_ends_at: null,
      stripe_subscription_id: null
    });

    await this.logSubscriptionEvent(companyId, 'downgrade', previousTier, 'free');
  }

  private static async logSubscriptionEvent(
    companyId: number, 
    eventType: string, 
    fromTier: string, 
    toTier: string,
    metadata?: any
  ): Promise<void> {
    // In a real implementation, this would write to the subscription_events table
    console.log('Subscription event:', {
      companyId,
      eventType,
      fromTier,
      toTier,
      metadata,
      timestamp: new Date().toISOString()
    });
  }

  static async getUsageStats(companyId: number): Promise<{
    currentMonth: {
      quotesCreated: number;
      quotesRemaining: number;
      limit: number;
    };
    lastMonth: {
      quotesCreated: number;
      quotesAccepted: number;
      conversionRate: number;
      avgResponseTime: number;
    };
  }> {
    const company = await db.getCompany(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const quoteLimitInfo = await this.checkQuoteLimit(companyId);
    
    // For last month stats, we'd query the quote_analytics table
    // For now, returning mock data
    return {
      currentMonth: {
        quotesCreated: company.monthly_quote_count || 0,
        quotesRemaining: quoteLimitInfo.remaining,
        limit: quoteLimitInfo.limit
      },
      lastMonth: {
        quotesCreated: 20,
        quotesAccepted: 10,
        conversionRate: 50,
        avgResponseTime: 18 // hours
      }
    };
  }
}