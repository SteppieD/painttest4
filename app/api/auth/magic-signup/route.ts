import { NextRequest, NextResponse } from 'next/server';
import { generateMagicLink } from '@/lib/auth/magic-link';
import { sendMagicLinkEmail } from '@/lib/email/send-magic-link';
import { getDatabaseAdapter } from '@/lib/database/adapter';

export async function POST(request: NextRequest) {
  try {
    const { email, companyName } = await request.json();

    // Validate inputs
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!companyName || !companyName.trim()) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const db = getDatabaseAdapter();
    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists
    try {
      const existingCompanies = await db.getAllCompanies();
      const existingCompany = existingCompanies.find(
        company => company.email?.toLowerCase() === normalizedEmail
      );
      
      if (existingCompany) {
        // Send login link instead
        const magicLink = await generateMagicLink(normalizedEmail, 'login', existingCompany.id);
        
        await sendMagicLinkEmail({
          email: normalizedEmail,
          magicLink,
          type: 'login',
          companyName: existingCompany.name || existingCompany.company_name
        });

        return NextResponse.json({
          success: true,
          message: 'An account already exists with this email. We\'ve sent you a login link instead.',
          emailSent: true
        });
      }
    } catch (checkError) {
      console.error('Error checking existing email:', checkError);
    }

    // Generate magic link for signup
    const magicLink = await generateMagicLink(normalizedEmail, 'signup');

    // Send magic link email
    const emailSent = await sendMagicLinkEmail({
      email: normalizedEmail,
      magicLink,
      type: 'signup',
      companyName: companyName.trim()
    });

    // Store temporary signup data (optional - can also encode in JWT)
    // This helps preserve the company name during the verification process
    try {
      await db.query(
        `INSERT INTO pending_signups (email, company_name, created_at, expires_at) 
         VALUES (?, ?, datetime('now'), datetime('now', '+15 minutes'))
         ON CONFLICT(email) DO UPDATE SET 
         company_name = excluded.company_name,
         created_at = excluded.created_at,
         expires_at = excluded.expires_at`,
        [normalizedEmail, companyName.trim()]
      );
    } catch (error) {
      // Continue even if this fails - we can get company name from user later
      console.log('Could not store pending signup data');
    }

    return NextResponse.json({
      success: true,
      message: 'Check your email to complete signup!',
      emailSent,
      email: normalizedEmail
    });

  } catch (error) {
    console.error('Magic signup error:', error);
    return NextResponse.json(
      { error: 'Failed to process signup. Please try again.' },
      { status: 500 }
    );
  }
}