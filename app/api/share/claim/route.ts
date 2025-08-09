import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const _company = auth.company;

    const { shareCode: _shareCode } = await request.json();

    // In production, this would:
    // 1. Check if the share belongs to this company
    // 2. Check if it's verified
    // 3. Check if reward hasn't been claimed yet
    // 4. Add credits to the company's account
    // 5. Mark the reward as claimed

    // For demo purposes, simulate successful claim
    return NextResponse.json({
      success: true,
      creditsAwarded: 1,
      newBalance: 1, // This would come from database
      message: 'Successfully claimed 1 free quote credit!'
    });
  } catch (error) {
    console.error('Claim reward error:', error);
    return NextResponse.json(
      { error: 'Failed to claim reward' },
      { status: 500 }
    );
  }
}