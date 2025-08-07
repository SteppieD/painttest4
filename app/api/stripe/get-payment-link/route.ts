import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';

// Server-side only Stripe payment links - these should never be exposed to client
const STRIPE_PAYMENT_LINKS = {
  professional: {
    monthly: process.env.STRIPE_PRO_MONTHLY_LINK || 'https://buy.stripe.com/test_cN2bJ13Ombnu7io144',
    yearly: process.env.STRIPE_PRO_YEARLY_LINK || 'https://buy.stripe.com/test_28o28r5Ww4T67io8wx'
  },
  business: {
    monthly: process.env.STRIPE_BUSINESS_MONTHLY_LINK || 'https://buy.stripe.com/test_8wM9AVdoY9769qA8wy',
    yearly: process.env.STRIPE_BUSINESS_YEARLY_LINK || 'https://buy.stripe.com/test_3cs9AV0Cc3OW5ag9AD'
  }
};

interface GetPaymentLinkRequest {
  plan: 'professional' | 'business';
  billingPeriod: 'monthly' | 'yearly';
}

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }

    const body: GetPaymentLinkRequest = await request.json();
    const { plan, billingPeriod } = body;

    // Validate input parameters
    if (!plan || !billingPeriod) {
      return NextResponse.json(
        { error: 'Plan and billing period are required' },
        { status: 400 }
      );
    }

    if (!['professional', 'business'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be professional or business' },
        { status: 400 }
      );
    }

    if (!['monthly', 'yearly'].includes(billingPeriod)) {
      return NextResponse.json(
        { error: 'Invalid billing period. Must be monthly or yearly' },
        { status: 400 }
      );
    }

    // Get the secure payment link from server-side environment variables
    const paymentLink = STRIPE_PAYMENT_LINKS[plan][billingPeriod];

    if (!paymentLink) {
      return NextResponse.json(
        { error: 'Payment link not configured for this plan' },
        { status: 500 }
      );
    }

    // Optionally, add customer email if available for better UX
    let finalLink = paymentLink;
    if (auth.company) {
      // Try to get company email from auth context or database if needed
      const companyEmail = (auth.company as any).email;
      if (companyEmail) {
        const separator = finalLink.includes('?') ? '&' : '?';
        finalLink = `${finalLink}${separator}prefilled_email=${encodeURIComponent(companyEmail)}`;
      }
    }

    return NextResponse.json({
      success: true,
      paymentUrl: finalLink,
      plan,
      billingPeriod
    });

  } catch (error) {
    console.error('Get payment link error:', error);
    return NextResponse.json(
      { error: 'Failed to generate payment link' },
      { status: 500 }
    );
  }
}