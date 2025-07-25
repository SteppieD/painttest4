import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLink, invalidateMagicLink } from '@/lib/auth/magic-link';
import { getDatabaseAdapter } from '@/lib/database/adapter';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify the magic link token
    const verification = await verifyMagicLink(token);

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error || 'Invalid or expired link' },
        { status: 400 }
      );
    }

    const db = getDatabaseAdapter();
    const { email, type, companyId } = verification;

    let company;
    let accessCode;
    let isNewSignup = false;

    if (type === 'login' && companyId) {
      // Handle login - fetch existing company
      const companies = await db.getAllCompanies();
      company = companies.find(c => c.id === companyId);
      
      if (!company) {
        return NextResponse.json(
          { error: 'Company not found' },
          { status: 404 }
        );
      }
      
      accessCode = company.access_code || company.accessCode;
    } else if (type === 'signup' && email) {
      // Handle signup - create new company
      isNewSignup = true;
      
      // Check for pending signup data to get company name
      let companyName = 'My Company';
      try {
        const pendingData = await db.query(
          'SELECT company_name FROM pending_signups WHERE email = ? AND expires_at > datetime("now")',
          [email]
        );
        if (pendingData.length > 0) {
          companyName = pendingData[0].company_name;
        }
      } catch (error) {
        // Use default company name if query fails
      }

      // Generate access code
      accessCode = 'PQ' + Math.random().toString(36).substr(2, 8).toUpperCase();

      // Create company
      const isSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
      company = await db.createCompany({
        company_name: companyName,
        access_code: accessCode,
        email: email,
        phone: '',
        is_trial: isSupabase ? false : 0,
        quote_limit: 5,
        onboarding_completed: false
      });

      // Clean up pending signup
      try {
        await db.query('DELETE FROM pending_signups WHERE email = ?', [email]);
      } catch (error) {
        // Ignore cleanup errors
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid verification type' },
        { status: 400 }
      );
    }

    // Create session
    const sessionId = Math.random().toString(36).substr(2, 16);
    cookies().set('pq_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    // Invalidate the magic link token
    await invalidateMagicLink(token);

    return NextResponse.json({
      success: true,
      message: isNewSignup ? 'Email verified! Welcome to PaintQuote Pro.' : 'Successfully logged in!',
      company: {
        id: company.id,
        name: company.name || company.company_name,
        email: company.email,
        onboarding_completed: company.onboarding_completed
      },
      accessCode,
      isNewSignup
    });

  } catch (error) {
    console.error('Magic link verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify magic link' },
      { status: 500 }
    );
  }
}