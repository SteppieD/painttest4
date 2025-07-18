import { NextRequest, NextResponse } from 'next/server';
import { SubscriptionService } from '@/lib/stripe/subscription-service';
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

    const subscriptionService = new SubscriptionService();
    const result = await subscriptionService.handleWebhook(body, signature);

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