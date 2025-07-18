import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';
import { SubscriptionService } from '@/lib/stripe/subscription-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscriptionService = new SubscriptionService();
    const subscriptionInfo = await subscriptionService.getSubscriptionInfo(auth.company!.id);
    const usageStats = await subscriptionService.getUsageStats(auth.company!.id);

    return NextResponse.json({
      subscription: subscriptionInfo,
      usage: usageStats
    });

  } catch (error) {
    console.error('Get subscription info error:', error);
    return NextResponse.json(
      { error: 'Failed to get subscription info' },
      { status: 500 }
    );
  }
}