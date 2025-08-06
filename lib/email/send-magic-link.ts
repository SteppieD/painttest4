import { Resend } from 'resend';

interface SendMagicLinkParams {
  email: string;
  magicLink: string;
  type: 'signup' | 'login';
  companyName?: string;
  accessCode?: string;
}

export async function sendMagicLinkEmail({
  email,
  magicLink,
  type,
  companyName,
  accessCode
}: SendMagicLinkParams): Promise<boolean> {
  try {
    const subject = type === 'signup' 
      ? 'Complete your PaintQuote Pro signup'
      : 'Your PaintQuote Pro login link';

    const greeting = companyName 
      ? `Hi ${companyName},`
      : 'Hi there,';

    const action = type === 'signup'
      ? 'complete your signup'
      : 'log in to your account';

    const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .button { 
                display: inline-block; 
                padding: 12px 30px; 
                background: linear-gradient(to right, #3B82F6, #8B5CF6);
                color: white !important;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                margin: 20px 0;
              }
              .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
              .warning { background: #FEF3C7; border: 1px solid #F59E0B; padding: 10px; border-radius: 4px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🎨 PaintQuote Pro</h1>
              
              <p>${greeting}</p>
              
              <p>Click the button below to ${action}:</p>
              
              <a href="${magicLink}" class="button">
                ${type === 'signup' ? 'Complete Signup' : 'Log In Now'}
              </a>
              
              <div class="warning">
                ⏰ This link expires in 15 minutes for security reasons.
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="background: #f3f4f6; padding: 10px; border-radius: 4px; word-break: break-all;">
                ${magicLink}
              </p>
              
              ${accessCode ? `
                <div style="background: #E0F2FE; border: 2px solid #0284C7; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
                  <h3 style="margin: 0 0 10px 0; color: #0C4A6E;">Your Access Code</h3>
                  <p style="font-size: 32px; font-weight: bold; font-family: monospace; color: #0284C7; margin: 10px 0;">
                    ${accessCode}
                  </p>
                  <p style="margin: 10px 0 0 0; font-size: 14px; color: #475569;">
                    Save this code - you'll need it to log in directly without email verification
                  </p>
                </div>
              ` : ''}
              
              ${type === 'signup' ? `
                <h3>What happens next?</h3>
                <ol>
                  <li>Click the link to verify your email</li>
                  <li>Set up your business profile</li>
                  <li>Start creating professional quotes in minutes!</li>
                </ol>
              ` : ''}
              
              <div class="footer">
                <p>If you didn't request this email, you can safely ignore it.</p>
                <p>Need help? Reply to this email or visit our help center.</p>
                <p>© PaintQuote Pro - Professional Quotes in 2 Minutes</p>
              </div>
            </div>
          </body>
          </html>
        `;
        
    const text = `
${greeting}

Click this link to ${action}:
${magicLink}

This link expires in 15 minutes for security reasons.

${accessCode ? `
YOUR ACCESS CODE: ${accessCode}
Save this code - you'll need it to log in directly without email verification
` : ''}

${type === 'signup' ? `What happens next?
1. Click the link to verify your email
2. Set up your business profile  
3. Start creating professional quotes in minutes!` : ''}

If you didn't request this email, you can safely ignore it.

Need help? Reply to this email or visit our help center.

© PaintQuote Pro
        `;

    // Log in development for testing
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Magic link email:', {
        to: email,
        subject,
        preview: 'Magic link: ' + magicLink
      });
    }

    // Send email with Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const { data, error } = await resend.emails.send({
        from: process.env.DEFAULT_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'PaintQuote Pro <onboarding@resend.dev>',
        to: email,
        subject,
        html,
        text
      });

      if (error) {
        console.error('Resend error:', error);
        return false;
      }

      console.log('Email sent successfully:', data?.id);
      return true;
    } else {
      console.warn('RESEND_API_KEY not configured - email not sent');
      console.log('🔗 Magic link (for testing):', magicLink);
      return false;
    }
  } catch (error) {
    console.error('Error sending magic link email:', error);
    return false;
  }
}