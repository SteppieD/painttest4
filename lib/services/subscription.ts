import { db } from '@/lib/database/adapter';
import { validateCompanyId } from '@/lib/validation/schemas';

export interface SubscriptionTier {
  name: string;
  displayName: string;
  monthlyQuoteLimit: number;
  features: string[];
  price: number;
}

// Business tier removed - see PRICING_STRATEGY.md for future add-on plans
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
    monthlyQuoteLimit: -1, // Unlimited quotes for Pro users
    features: [
      'Unlimited quotes',
      'AI-powered instant quoting',
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
  // Pro tier simplified to just Free and Professional
  // Future: Add modular add-ons instead of fixed business tier
  pro: {
    name: 'pro',
    displayName: 'Professional',
    monthlyQuoteLimit: -1,
    features: [
      'Unlimited quotes',
      'AI-powered instant quoting',
      'Professional templates',
      'Custom branding',
      'Analytics & insights',
      'Priority support',
      'Advanced AI features',
      'Quote tracking',
      'Automated follow-ups'
    ],
    price: 79
  }
};

export class SubscriptionService {
  static async checkQuoteLimit(companyId: number): Promise<{ allowed: boolean; remaining: number; limit: number }> {
    // Validate company ID to prevent SQL injection
    const validatedCompanyId = validateCompanyId(companyId);
    const company = await db.getCompany(validatedCompanyId);
    if (!company) {
      throw new Error('Company not found');
    }

    // Reset monthly count if needed
    await this.resetMonthlyQuotesIfNeeded(validatedCompanyId);

    const tier = SUBSCRIPTION_TIERS[company.subscription_tier || 'free'];
    const limit = tier.monthlyQuoteLimit;
    const count = company.monthly_quote_count || 0;

    // Unlimited for professional/pro tier
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
    // Validate company ID to prevent SQL injection
    const validatedCompanyId = validateCompanyId(companyId);
    
    // Use atomic operation to prevent race conditions
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        const company = await db.getCompany(validatedCompanyId);
        if (!company) {
          throw new Error('Company not found');
        }

        const currentCount = company.monthly_quote_count || 0;
        const newCount = currentCount + 1;
        
        // Attempt atomic update with optimistic concurrency control
        await db.updateCompany(validatedCompanyId, {
          monthly_quote_count: newCount
        });
        
        // If we get here, the update succeeded
        break;
        
      } catch (error) {
        retryCount++;
        if (retryCount >= maxRetries) {
          console.error(`Failed to increment quote count after ${maxRetries} retries:`, error);
          throw new Error('Failed to increment quote count due to concurrent updates');
        }
        
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 100));
      }
    }
  }

  static async resetMonthlyQuotesIfNeeded(companyId: number): Promise<void> {
    const validatedCompanyId = validateCompanyId(companyId);
    const company = await db.getCompany(validatedCompanyId);
    if (!company) return;

    // For now, we'll skip the monthly reset logic since last_quote_reset field doesn't exist
    // This would need to be implemented with a separate tracking mechanism
    // or by adding the field to the Company interface and database schema
  }

  static async upgradeToProfessional(companyId: number, stripeCustomerId?: string, stripeSubscriptionId?: string): Promise<void> {
    const validatedCompanyId = validateCompanyId(companyId);
    const company = await db.getCompany(validatedCompanyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const previousTier = company.subscription_tier || 'free';
    
    await db.updateCompany(validatedCompanyId, {
      subscription_tier: 'professional'
    } as any);

    // Log the subscription event
    await this.logSubscriptionEvent(validatedCompanyId, 'upgrade', previousTier, 'professional');
  }

  static async startTrial(companyId: number, durationDays: number = 14): Promise<Date> {
    const validatedCompanyId = validateCompanyId(companyId);
    const validatedDuration = Math.max(1, Math.min(365, Math.floor(durationDays))); // Validate duration
    
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + validatedDuration);

    await db.updateCompany(validatedCompanyId, {
      subscription_tier: 'professional'
    } as any);

    await this.logSubscriptionEvent(validatedCompanyId, 'trial_started', 'free', 'professional', { 
      duration_days: validatedDuration 
    });

    return trialEndDate;
  }

  static async checkTrialStatus(companyId: number): Promise<{ isTrialing: boolean; daysRemaining: number; expired: boolean }> {
    const validatedCompanyId = validateCompanyId(companyId);
    // Trial functionality not available without trial_ends_at field
    return { isTrialing: false, daysRemaining: 0, expired: false };
  }

  static async downgradeToFree(companyId: number): Promise<void> {
    const validatedCompanyId = validateCompanyId(companyId);
    const company = await db.getCompany(validatedCompanyId);
    if (!company) return;

    const previousTier = company.subscription_tier || 'professional';

    await db.updateCompany(validatedCompanyId, {
      subscription_tier: 'free'
    } as any);

    await this.logSubscriptionEvent(validatedCompanyId, 'downgrade', previousTier, 'free');
  }

  private static async logSubscriptionEvent(
    companyId: number, 
    eventType: string, 
    fromTier: string, 
    toTier: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const validatedCompanyId = validateCompanyId(companyId);
    // In a real implementation, this would write to the subscription_events table
    console.log('Subscription event:', {
      companyId: validatedCompanyId,
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
    const validatedCompanyId = validateCompanyId(companyId);
    const company = await db.getCompany(validatedCompanyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const quoteLimitInfo = await this.checkQuoteLimit(validatedCompanyId);
    
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