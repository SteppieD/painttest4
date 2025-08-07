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
  professional: {
    name: 'professional',
    displayName: 'Professional',
    monthlyQuoteLimit: 50, // 50 quotes per month
    features: [
      '50 quotes per month',
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
  business: {
    name: 'business',
    displayName: 'Business',
    monthlyQuoteLimit: -1, // Unlimited
    features: [
      'Everything in Professional',
      'Multiple users',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'Custom reporting',
      'White-label options'
    ],
    price: 149 // $149/month
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

    // Unlimited for business tier
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

    // For now, we'll skip the monthly reset logic since last_quote_reset field doesn't exist
    // This would need to be implemented with a separate tracking mechanism
    // or by adding the field to the Company interface and database schema
  }

  static async upgradeToProfessional(companyId: number, stripeCustomerId?: string, stripeSubscriptionId?: string): Promise<void> {
    const company = await db.getCompany(companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const previousTier = company.subscription_tier || 'free';
    
    await db.updateCompany(companyId, {
      subscription_tier: 'professional'
    } as any);

    // Log the subscription event
    await this.logSubscriptionEvent(companyId, 'upgrade', previousTier, 'professional');
  }

  static async startTrial(companyId: number, durationDays: number = 14): Promise<Date> {
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + durationDays);

    await db.updateCompany(companyId, {
      subscription_tier: 'professional'
    } as any);

    await this.logSubscriptionEvent(companyId, 'trial_started', 'free', 'professional', { 
      duration_days: durationDays 
    });

    return trialEndDate;
  }

  static async checkTrialStatus(companyId: number): Promise<{ isTrialing: boolean; daysRemaining: number; expired: boolean }> {
    // Trial functionality not available without trial_ends_at field
    return { isTrialing: false, daysRemaining: 0, expired: false };
  }

  static async downgradeToFree(companyId: number): Promise<void> {
    const company = await db.getCompany(companyId);
    if (!company) return;

    const previousTier = company.subscription_tier || 'professional';

    await db.updateCompany(companyId, {
      subscription_tier: 'free'
    } as any);

    await this.logSubscriptionEvent(companyId, 'downgrade', previousTier, 'free');
  }

  private static async logSubscriptionEvent(
    companyId: number, 
    eventType: string, 
    fromTier: string, 
    toTier: string,
    metadata?: Record<string, unknown>
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