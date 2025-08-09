import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromHeaders } from '@/lib/auth/auth-helpers';

export async function POST(request: NextRequest) {
  try {
    const company = await getCompanyFromHeaders(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { platform, shareCode } = await request.json();

    // Here we would typically:
    // 1. Store the share in a database
    // 2. Generate tracking parameters
    // 3. Create shortened URL

    // For now, we're using localStorage on the client side
    // In production, this would be database-backed

    const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'}?ref=${shareCode}&utm_source=${platform}&utm_medium=social&utm_campaign=share_reward`;

    return NextResponse.json({
      success: true,
      shareCode,
      shareUrl,
      platform
    });
  } catch (error) {
    console.error('Share tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track share' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const company = await getCompanyFromHeaders(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, fetch from database
    // For now, return empty stats
    return NextResponse.json({
      shares: [],
      credits: {
        available: 0,
        earned: 0,
        used: 0
      }
    });
  } catch (error) {
    console.error('Share stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch share stats' },
      { status: 500 }
    );
  }
}