// Stripe Payment Links Configuration - SECURITY UPDATE
// This file now contains only client-side helpers for secure payment processing
// All actual Stripe URLs are handled server-side via /api/stripe/get-payment-link

/**
 * Secure client-side helper to redirect to Stripe payment
 * This function calls our secure API endpoint instead of using hardcoded URLs
 */
// Business tier removed - Professional tier only
export async function redirectToStripePayment(plan: 'professional', billing?: 'monthly' | 'yearly') {
  try {
    // Get company data from localStorage for authentication
    const companyData = typeof window !== 'undefined' ? localStorage.getItem('paintquote_company') : null;
    if (!companyData) {
      // Redirect to access code page if not authenticated
      window.location.href = '/access-code';
      return;
    }

    const billingPeriod = billing || 'monthly';

    // Call secure API endpoint to get payment link
    const response = await fetch('/api/stripe/get-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-company-data': companyData
      },
      body: JSON.stringify({
        plan,
        billingPeriod
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Redirect to access code page if unauthorized
        window.location.href = '/access-code';
        return;
      }
      throw new Error('Failed to get payment link');
    }

    const data = await response.json();
    
    if (data.success && data.paymentUrl) {
      window.location.href = data.paymentUrl;
    } else {
      throw new Error('Invalid response from payment link API');
    }
  } catch (error) {
    console.error('Error getting payment link:', error);
    // Fallback to access code page on error
    window.location.href = '/access-code';
  }
}

/**
 * DEPRECATED: getStripePaymentLink is no longer used for security reasons
 * Use redirectToStripePayment() instead which calls secure API endpoints
 */
export function getStripePaymentLink(plan: 'professional' | 'upgrade', billing?: 'monthly' | 'yearly'): string {
  console.warn('getStripePaymentLink is deprecated - use redirectToStripePayment() for secure payment processing');
  return '/access-code'; // Redirect to authentication instead of exposing URLs
}