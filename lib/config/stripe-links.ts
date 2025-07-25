// Stripe Payment Links Configuration
// These links should be created in your Stripe Dashboard and replaced with actual URLs

export const STRIPE_PAYMENT_LINKS = {
  // Professional Plan Links
  professional: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK || 'https://buy.stripe.com/test_professional_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK || 'https://buy.stripe.com/test_professional_yearly'
  },
  
  // Business Plan Links  
  business: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_LINK || 'https://buy.stripe.com/test_business_monthly',
    yearly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_LINK || 'https://buy.stripe.com/test_business_yearly'
  },
  
  // One-time upgrade link for general upgrades
  upgrade: process.env.NEXT_PUBLIC_STRIPE_UPGRADE_LINK || 'https://buy.stripe.com/test_upgrade'
};

// Helper function to get the appropriate payment link
export function getStripePaymentLink(plan: 'professional' | 'business' | 'upgrade', billing?: 'monthly' | 'yearly') {
  if (plan === 'upgrade') {
    return STRIPE_PAYMENT_LINKS.upgrade;
  }
  
  const billingPeriod = billing || 'monthly';
  return STRIPE_PAYMENT_LINKS[plan][billingPeriod];
}

// Helper to redirect to Stripe payment
export function redirectToStripePayment(plan: 'professional' | 'business' | 'upgrade', billing?: 'monthly' | 'yearly') {
  const link = getStripePaymentLink(plan, billing);
  
  // Add customer email if available
  const company = typeof window !== 'undefined' ? localStorage.getItem('paintquote_company') : null;
  if (company) {
    try {
      const companyData = JSON.parse(company);
      const email = companyData.email;
      if (email) {
        const separator = link.includes('?') ? '&' : '?';
        window.location.href = `${link}${separator}prefilled_email=${encodeURIComponent(email)}`;
        return;
      }
    } catch (e) {
      console.error('Error parsing company data:', e);
    }
  }
  
  window.location.href = link;
}