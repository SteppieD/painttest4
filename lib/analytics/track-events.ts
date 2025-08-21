// Centralized event tracking for Google Tag Manager
// These functions push events to the dataLayer for GTM to process

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

// Helper to safely push to dataLayer
const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Track quote creation
export const trackQuoteCreated = (quoteData: {
  quoteId: string;
  value: number;
  customerName?: string;
  projectType?: string;
}) => {
  pushToDataLayer({
    event: 'quote_created',
    quote_id: quoteData.quoteId,
    quote_value: quoteData.value,
    customer_name: quoteData.customerName,
    project_type: quoteData.projectType,
    timestamp: new Date().toISOString()
  });
};

// Track quote acceptance
export const trackQuoteAccepted = (quoteData: {
  quoteId: string;
  value: number;
}) => {
  pushToDataLayer({
    event: 'quote_accepted',
    quote_id: quoteData.quoteId,
    quote_value: quoteData.value,
    timestamp: new Date().toISOString()
  });
};

// Track subscription upgrade
export const trackSubscriptionUpgrade = (plan: string, billing: 'monthly' | 'yearly') => {
  pushToDataLayer({
    event: 'subscription_upgrade',
    plan_name: plan,
    billing_cycle: billing,
    timestamp: new Date().toISOString()
  });
};

// Track onboarding completion
export const trackOnboardingComplete = (method: 'traditional' | 'during_quote') => {
  pushToDataLayer({
    event: 'onboarding_complete',
    onboarding_method: method,
    timestamp: new Date().toISOString()
  });
};

// Track achievement unlocked
export const trackAchievementUnlocked = (achievementId: string, points: number) => {
  pushToDataLayer({
    event: 'achievement_unlocked',
    achievement_id: achievementId,
    points_earned: points,
    timestamp: new Date().toISOString()
  });
};

// Track feature usage
export const trackFeatureUsage = (feature: string) => {
  pushToDataLayer({
    event: 'feature_used',
    feature_name: feature,
    timestamp: new Date().toISOString()
  });
};

// Track AI chat interaction
export const trackAIChatInteraction = (messageCount: number, sessionDuration: number) => {
  pushToDataLayer({
    event: 'ai_chat_interaction',
    message_count: messageCount,
    session_duration_seconds: sessionDuration,
    timestamp: new Date().toISOString()
  });
};

// Track page performance
export const trackPagePerformance = () => {
  if (typeof window !== 'undefined' && window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    
    pushToDataLayer({
      event: 'page_performance',
      page_load_time: pageLoadTime,
      dom_ready_time: domReadyTime,
      timestamp: new Date().toISOString()
    });
  }
};

// Track user engagement
export const trackUserEngagement = (engagementType: 'scroll' | 'click' | 'form_submit', details?: Record<string, unknown>) => {
  pushToDataLayer({
    event: 'user_engagement',
    engagement_type: engagementType,
    details: details,
    timestamp: new Date().toISOString()
  });
};