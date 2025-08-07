import { db } from '@/lib/database/adapter';

/**
 * Subscription tiers with their features and limits
 */
export enum SubscriptionTier {
  FREE = 'free',
  PROFESSIONAL = 'professional', 
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise'
}

export interface TierLimits {
  quotesPerMonth: number;
  hasAI: boolean;
  hasAnalytics: boolean;
  maxUsers: number;
  hasCustomBranding: boolean;
  hasIntegrations: boolean;
  hasAdvancedAnalytics: boolean;
  hasAPIAccess: boolean;
  hasPrioritySupport: boolean;
}

/**
 * Define features and limits for each tier
 */
export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  [SubscriptionTier.FREE]: {
    quotesPerMonth: 5,
    hasAI: false,
    hasAnalytics: false,
    maxUsers: 1,
    hasCustomBranding: false,
    hasIntegrations: false,
    hasAdvancedAnalytics: false,
    hasAPIAccess: false,
    hasPrioritySupport: false,
  },
  [SubscriptionTier.PROFESSIONAL]: {
    quotesPerMonth: -1, // Unlimited
    hasAI: true,
    hasAnalytics: true,
    maxUsers: 3,
    hasCustomBranding: true,
    hasIntegrations: false,
    hasAdvancedAnalytics: false,
    hasAPIAccess: false,
    hasPrioritySupport: true,
  },
  [SubscriptionTier.BUSINESS]: {
    quotesPerMonth: -1, // Unlimited
    hasAI: true,
    hasAnalytics: true,
    maxUsers: -1, // Unlimited
    hasCustomBranding: true,
    hasIntegrations: true,
    hasAdvancedAnalytics: true,
    hasAPIAccess: false,
    hasPrioritySupport: true,
  },
  [SubscriptionTier.ENTERPRISE]: {
    quotesPerMonth: -1, // Unlimited
    hasAI: true,
    hasAnalytics: true,
    maxUsers: -1, // Unlimited
    hasCustomBranding: true,
    hasIntegrations: true,
    hasAdvancedAnalytics: true,
    hasAPIAccess: true,
    hasPrioritySupport: true,
  }
};

export interface Company {
  id: number;
  subscription_tier?: string;
  monthly_quote_count?: number;
  access_code: string;
}

/**
 * Get company tier from localStorage or database
 */
export async function getUserTier(companyId?: number): Promise<SubscriptionTier> {
  // Try localStorage first (for client-side)
  if (typeof window !== 'undefined' && !companyId) {
    const companyData = localStorage.getItem('paintquote_company');
    if (companyData) {
      try {
        const company = JSON.parse(companyData);
        return (company.subscription_tier as SubscriptionTier) || SubscriptionTier.FREE;
      } catch {
        return SubscriptionTier.FREE;
      }
    }
  }

  // Fallback to database (for server-side)
  if (companyId) {
    try {
      const company = await db.getCompany(companyId);
      return (company?.subscription_tier as SubscriptionTier) || SubscriptionTier.FREE;
    } catch {
      return SubscriptionTier.FREE;
    }
  }

  return SubscriptionTier.FREE;
}

/**
 * Check if user has access to a specific feature
 */
export async function hasFeatureAccess(feature: keyof TierLimits, companyId?: number): Promise<boolean> {
  const tier = await getUserTier(companyId);
  const limits = TIER_LIMITS[tier];
  
  if (typeof limits[feature] === 'boolean') {
    return limits[feature] as boolean;
  }
  
  // For numeric limits, return true if unlimited (-1) or has capacity
  return (limits[feature] as number) !== 0;
}

/**
 * Check if user can create more quotes
 */
export async function canCreateQuote(companyId?: number): Promise<{ 
  allowed: boolean; 
  remaining: number; 
  limit: number;
  tier: SubscriptionTier;
}> {
  const tier = await getUserTier(companyId);
  const limits = TIER_LIMITS[tier];
  
  // Unlimited quotes for paid tiers
  if (limits.quotesPerMonth === -1) {
    return { allowed: true, remaining: -1, limit: -1, tier };
  }

  // Check current usage for free tier
  let currentCount = 0;
  if (typeof window !== 'undefined' && !companyId) {
    const companyData = localStorage.getItem('paintquote_company');
    if (companyData) {
      try {
        const company = JSON.parse(companyData);
        currentCount = company.monthly_quote_count || 0;
      } catch {
        currentCount = 0;
      }
    }
  } else if (companyId) {
    try {
      const company = await db.getCompany(companyId);
      currentCount = company?.monthly_quote_count || 0;
    } catch {
      currentCount = 0;
    }
  }

  const remaining = Math.max(0, limits.quotesPerMonth - currentCount);
  return {
    allowed: currentCount < limits.quotesPerMonth,
    remaining,
    limit: limits.quotesPerMonth,
    tier
  };
}

/**
 * Get tier limits for a specific tier
 */
export function getTierLimits(tier: SubscriptionTier): TierLimits {
  return TIER_LIMITS[tier];
}

/**
 * Check if current tier is at least the minimum required tier
 */
export async function hasMinimumTier(
  requiredTier: SubscriptionTier, 
  companyId?: number
): Promise<boolean> {
  const currentTier = await getUserTier(companyId);
  
  const tierHierarchy = [
    SubscriptionTier.FREE,
    SubscriptionTier.PROFESSIONAL,
    SubscriptionTier.BUSINESS,
    SubscriptionTier.ENTERPRISE
  ];
  
  const currentIndex = tierHierarchy.indexOf(currentTier);
  const requiredIndex = tierHierarchy.indexOf(requiredTier);
  
  return currentIndex >= requiredIndex;
}

/**
 * Get upgrade URL for current tier
 */
export function getUpgradeUrl(currentTier?: SubscriptionTier): string {
  switch (currentTier) {
    case SubscriptionTier.FREE:
      return '/dashboard/settings/billing?upgrade=professional';
    case SubscriptionTier.PROFESSIONAL:
      return '/dashboard/settings/billing?upgrade=business';
    case SubscriptionTier.BUSINESS:
      return '/dashboard/settings/billing?upgrade=enterprise';
    default:
      return '/dashboard/settings/billing';
  }
}

/**
 * Get readable tier names
 */
export function getTierDisplayName(tier: SubscriptionTier): string {
  switch (tier) {
    case SubscriptionTier.FREE:
      return 'Free';
    case SubscriptionTier.PROFESSIONAL:
      return 'Professional';
    case SubscriptionTier.BUSINESS:
      return 'Business';
    case SubscriptionTier.ENTERPRISE:
      return 'Enterprise';
    default:
      return 'Free';
  }
}

/**
 * Get next tier in hierarchy
 */
export function getNextTier(currentTier: SubscriptionTier): SubscriptionTier | null {
  switch (currentTier) {
    case SubscriptionTier.FREE:
      return SubscriptionTier.PROFESSIONAL;
    case SubscriptionTier.PROFESSIONAL:
      return SubscriptionTier.BUSINESS;
    case SubscriptionTier.BUSINESS:
      return SubscriptionTier.ENTERPRISE;
    default:
      return null;
  }
}