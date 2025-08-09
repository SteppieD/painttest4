import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';

// Server-side only Stripe payment links - these should never be exposed to client
// In production, these environment variables should be set in Vercel with real Stripe links
// Business tier removed - see PRICING_STRATEGY.md for future add-on plans
const STRIPE_PAYMENT_LINKS = {
  professional: {
    monthly: process.env.STRIPE_PRO_MONTHLY_LINK || process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_LINK,
    yearly: process.env.STRIPE_PRO_YEARLY_LINK || process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_LINK
  }
};

interface GetPaymentLinkRequest {
  plan: 'professional'; // Only professional tier now
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

    if (plan !== 'professional') {
      return NextResponse.json(
        { error: 'Invalid plan. Must be professional' },
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
      console.error('Payment link not found:', {
        plan,
        billingPeriod,
        availableLinks: {
          professional: {
            monthly: !!STRIPE_PAYMENT_LINKS.professional.monthly,
            yearly: !!STRIPE_PAYMENT_LINKS.professional.yearly
          },
          business: {
            monthly: !!STRIPE_PAYMENT_LINKS.business.monthly,
            yearly: !!STRIPE_PAYMENT_LINKS.business.yearly
          }
        }
      });
      return NextResponse.json(
        { 
          error: 'Payment link not configured for this plan',
          details: `Missing link for ${plan} ${billingPeriod}` 
        },
        { status: 500 }
      );
    }

    // Log for debugging (remove in production)
    console.log('Payment link retrieved:', {
      plan,
      billingPeriod,
      linkFound: !!paymentLink,
      linkPrefix: paymentLink ? paymentLink.substring(0, 30) + '...' : 'none'
    });

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