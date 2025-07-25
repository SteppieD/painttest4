interface SendMagicLinkParams {
  email: string;
  magicLink: string;
  type: 'signup' | 'login';
  companyName?: string;
}

export async function sendMagicLinkEmail({
  email,
  magicLink,
  type,
  companyName
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

    // In production, this would use a real email service
    // For now, we'll use the existing email endpoint
    const response = await fetch('/api/email/send-magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject,
        html: `
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
        `,
        text: `
${greeting}

Click this link to ${action}:
${magicLink}

This link expires in 15 minutes for security reasons.

${type === 'signup' ? `What happens next?
1. Click the link to verify your email
2. Set up your business profile  
3. Start creating professional quotes in minutes!` : ''}

If you didn't request this email, you can safely ignore it.

Need help? Reply to this email or visit our help center.

© PaintQuote Pro
        `
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending magic link email:', error);
    return false;
  }
}