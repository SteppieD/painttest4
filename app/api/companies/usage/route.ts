import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { SubscriptionService } from '@/lib/services/subscription';

export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const usage = await SubscriptionService.getUsageStats(company.id);

    return NextResponse.json(usage);

  } catch (error) {
    console.error('Error fetching usage stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage statistics' },
      { status: 500 }
    );
  }
}