import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find company by email
    const { data: company, error } = await supabase
      .from('companies')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !company) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      );
    }

    // Send the access code email
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@paintquote.app';
    
    if (!resend) {
      console.log('Resend API key not configured. Would send email to:', email);
      console.log('Access code:', company.access_code);
      return NextResponse.json({
        success: true,
        message: 'Access code email functionality not configured. Check server logs for access code.'
      });
    }
    
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Your Access Code - PaintQuote',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Your Access Code</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Ready to access your PaintQuote dashboard</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 12px; padding: 30px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Access Code</p>
                <div style="font-size: 36px; font-weight: 700; font-family: 'Monaco', 'Menlo', monospace; color: #1e293b; letter-spacing: 4px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">${company.access_code}</div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://paintquote.app'}/access-code" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                Access Your Dashboard
              </a>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
              <p style="margin: 0; font-size: 14px; color: #64748b; text-align: center;">
                This code is unique to your company: <strong>${company.company_name}</strong>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
            <p style="margin: 0;">If you didn't request this code, please ignore this email.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Access code sent successfully' 
    });

  } catch (error) {
    console.error('Error resending access code:', error);
    return NextResponse.json(
      { error: 'Failed to send access code' },
      { status: 500 }
    );
  }
}