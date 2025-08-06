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
          companyName: existingCompany.name || existingCompany.company_name,
          accessCode: existingCompany.access_code // Include existing access code for reference
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

    // Generate access code NOW, not after verification
    const accessCode = 'PQ' + Math.random().toString(36).substr(2, 8).toUpperCase();

    // Generate magic link for signup - include access code in the token
    const magicLink = await generateMagicLink(normalizedEmail, 'signup');

    // Send magic link email WITH the access code
    const emailSent = await sendMagicLinkEmail({
      email: normalizedEmail,
      magicLink,
      type: 'signup',
      companyName: companyName.trim(),
      accessCode // Pass the access code to include in email
    });

    // Store temporary signup data with access code
    // This preserves both company name and access code during verification
    try {
      await db.query(
        `INSERT INTO pending_signups (email, company_name, access_code, created_at, expires_at) 
         VALUES (?, ?, ?, datetime('now'), datetime('now', '+15 minutes'))
         ON CONFLICT(email) DO UPDATE SET 
         company_name = excluded.company_name,
         access_code = excluded.access_code,
         created_at = excluded.created_at,
         expires_at = excluded.expires_at`,
        [normalizedEmail, companyName.trim(), accessCode]
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