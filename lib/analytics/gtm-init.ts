// Initialize Google Tag Manager tracking for Next.js app
// This ensures GTM is properly initialized on all pages

import { trackPageView } from './gtm';

// Check if GTM is enabled
export const isGTMEnabled = () => {
  return typeof window !== 'undefined' && 
         !!process.env.NEXT_PUBLIC_GTM_ID &&
         window.dataLayer !== undefined;
};

// Initialize GTM on app load
export const initializeGTM = () => {
  if (!isGTMEnabled()) return;

  // Track initial page view
  if (typeof window !== 'undefined') {
    // Push default consent state (adjust based on your privacy policy)
    window.dataLayer.push({
      event: 'consent_default',
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'functionality_storage': 'granted',
      'personalization_storage': 'granted',
      'security_storage': 'granted'
    });

    // Push initial configuration
    window.dataLayer.push({
      event: 'gtm.init',
      'gtm.uniqueEventId': Date.now()
    });
  }
};

// Track route changes in Next.js
export const trackRouteChange = (url: string) => {
  if (!isGTMEnabled()) return;
  
  // Track page view for SPA navigation
  trackPageView(url);
};

// Enhanced ecommerce helper
export const pushEcommerceEvent = (eventData: unknown) => {
  if (!isGTMEnabled()) return;
  
  window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce data
  window.dataLayer.push(eventData as Record<string, any>);
};