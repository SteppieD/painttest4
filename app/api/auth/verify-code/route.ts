import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessCode } from '@/lib/auth/access-code';
import { createSimpleSession } from '@/lib/auth/simple-session';

export async function POST(request: NextRequest) {
  try {
    const { accessCode } = await request.json();

    if (!accessCode) {
      return NextResponse.json(
        { error: 'Access code is required' },
        { status: 400 }
      );
    }

    // Verify access code
    const company = await verifyAccessCode(accessCode);

    if (!company) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 401 }
      );
    }

    // Create simple session
    const sessionId = createSimpleSession(company.id, company);

    // Set session cookie
    const response = NextResponse.json({
      success: true,
      company: {
        id: company.id,
        accessCode: company.access_code,
        name: company.company_name,
        phone: company.phone,
        email: company.email,
        logoUrl: company.logo_url,
        isTrial: company.is_trial,
        quoteLimit: company.quote_limit,
        needsOnboarding: false
      }
    });

    // Set HTTP-only cookie for session
    response.cookies.set('pq_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Access code verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to list demo companies for testing
export async function GET() {
  return NextResponse.json({
    companies: [
      { 
        access_code: 'DEMO2024', 
        company_name: 'Demo Painting Company',
        description: 'Full-featured demo account'
      },
      { 
        access_code: 'PAINTER001', 
        company_name: 'Smith Painting LLC',
        description: 'Sample painting contractor'
      },
      { 
        access_code: 'CONTRACTOR123', 
        company_name: 'Elite Contractors',
        description: 'Premium contractor account'
      }
    ],
    message: 'Available access codes for testing'
  });
}