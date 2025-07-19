import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe instance
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Server-side Stripe instance - lazy loaded to avoid build errors
let stripeInstance: Stripe | null = null;

export const getStripe = () => {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
    });
  }
  return stripeInstance;
};

// For backwards compatibility
export const stripe = new Proxy({} as Stripe, {
  get(target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver);
  }
});

// Subscription price IDs - use fallbacks to avoid build errors
export const STRIPE_PRICE_IDS = {
  professional: {
    monthly: process.env.STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID || '',
    yearly: process.env.STRIPE_PROFESSIONAL_YEARLY_PRICE_ID || ''
  },
  business: {
    monthly: process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID || '',
    yearly: process.env.STRIPE_BUSINESS_YEARLY_PRICE_ID || ''
  }
};

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  professional: {
    name: 'Professional',
    features: [
      'Up to 50 quotes per month',
      'AI-powered quote generation',
      'Customer management',
      'Email quotes',
      'Basic analytics',
      'Priority support'
    ],
    pricing: {
      monthly: 29.99,
      yearly: 299.99
    }
  },
  business: {
    name: 'Business',
    features: [
      'Unlimited quotes',
      'Advanced AI features',
      'Team collaboration',
      'Custom branding',
      'Advanced analytics',
      'API access',
      'Priority support',
      'Custom integrations'
    ],
    pricing: {
      monthly: 79.99,
      yearly: 799.99
    }
  }
};