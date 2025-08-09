import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromHeaders } from '@/lib/auth/auth-helpers';

export async function POST(request: NextRequest) {
  try {
    const company = await getCompanyFromHeaders(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { shareCode } = await request.json();

    // In production, we would:
    // 1. Check if the share was posted (via social media APIs if available)
    // 2. Check if it received clicks/engagement
    // 3. Verify it's not fraudulent (same IP, bot traffic, etc.)
    // 4. Award the credit

    // For demo purposes, auto-verify after a short delay
    // This would be replaced with actual verification logic
    const isVerified = true;

    if (isVerified) {
      // Award credit to the company
      // In production, this would update the database
      return NextResponse.json({
        success: true,
        verified: true,
        creditAwarded: 1,
        message: 'Share verified! You earned 1 free quote credit.'
      });
    }

    return NextResponse.json({
      success: false,
      verified: false,
      message: 'Share could not be verified. Please ensure it was posted publicly.'
    });
  } catch (error) {
    console.error('Share verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify share' },
      { status: 500 }
    );
  }
}