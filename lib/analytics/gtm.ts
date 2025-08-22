// Google Tag Manager helper functions

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Push an event to Google Tag Manager's dataLayer
 */
export function pushToDataLayer(event: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  pushToDataLayer({
    event: eventName,
    ...parameters,
  });
}

/**
 * Track page view (useful for SPAs)
 */
export function trackPageView(url: string, title?: string) {
  pushToDataLayer({
    event: 'page_view',
    page_location: url,
    page_title: title || document.title,
  });
}

/**
 * Track quote creation
 */
export function trackQuoteCreated(quoteData: {
  quoteId: string;
  value: number;
  customerName?: string;
  projectType?: string;
}) {
  trackEvent('quote_created', {
    quote_id: quoteData.quoteId,
    quote_value: quoteData.value,
    customer_name: quoteData.customerName,
    project_type: quoteData.projectType,
  });
}

/**
 * Track quote viewed
 */
export function trackQuoteViewed(quoteId: string) {
  trackEvent('quote_viewed', {
    quote_id: quoteId,
  });
}

/**
 * Track quote accepted
 */
export function trackQuoteAccepted(quoteId: string, value: number) {
  trackEvent('quote_accepted', {
    quote_id: quoteId,
    quote_value: value,
  });
}

/**
 * Track user signup
 */
export function trackSignup(method: string) {
  trackEvent('sign_up', {
    method: method,
  });
}

/**
 * Track user login
 */
export function trackLogin(method: string) {
  trackEvent('login', {
    method: method,
  });
}

/**
 * Track subscription upgrade
 */
export function trackSubscriptionUpgrade(plan: string, value: number) {
  trackEvent('purchase', {
    currency: 'USD',
    value: value,
    items: [{
      item_id: plan,
      item_name: `${plan} subscription`,
      item_category: 'subscription',
      quantity: 1,
      price: value,
    }],
  });
}