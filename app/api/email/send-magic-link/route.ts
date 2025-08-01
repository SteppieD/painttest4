import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, text } = await request.json();

    // Log in development for testing
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Magic link email:', {
        to,
        subject,
        preview: text.substring(0, 200) + '...'
      });
      
      // Extract and log the magic link for easy testing
      const linkMatch = text.match(/https?:\/\/[^\s]+\/auth\/verify\?token=[^\s]+/);
      if (linkMatch) {
        console.log('🔗 Magic link:', linkMatch[0]);
      }
    }

    // Send email with Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const { data, error } = await resend.emails.send({
        from: process.env.DEFAULT_FROM_EMAIL || 'PaintQuote Pro <onboarding@resend.dev>',
        to,
        subject,
        html,
        text
      });

      if (error) {
        console.error('Resend error:', error);
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
      }

      console.log('Email sent successfully:', data?.id);
    } else {
      console.warn('RESEND_API_KEY not configured - email not sent');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending magic link email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}