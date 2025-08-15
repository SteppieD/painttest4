import { NextRequest, NextResponse } from 'next/server';
import { enhancedSubscriptionService } from '@/lib/stripe/enhanced-subscription-service';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    // Using enhanced service with N8N integration
    const result = await enhancedSubscriptionService.handleWebhook(body, signature);

    if (result.processed) {
      return NextResponse.json({ received: true });
    } else {
      return NextResponse.json({ received: true, ignored: true });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}