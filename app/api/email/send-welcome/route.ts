import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const { email, companyName, accessCode } = await request.json()

    console.log('📧 Welcome email request:', {
      to: email,
      subject: 'Welcome to PaintQuote Pro - Your Access Code',
      companyName,
      accessCode
    })

    const emailTemplate = `Welcome to PaintQuote Pro, ${companyName}!

Your access code is: ${accessCode}

Keep this code safe - you'll need it to log in to your account.

Get started in 60 seconds:
1. Log in at ${process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'}/access-code
2. Complete your business profile
3. Create your first professional quote

Need help? Reply to this email or visit our help center.

Happy quoting!
The PaintQuote Pro Team`

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
    .access-code { background: white; border: 2px solid #3B82F6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
    .access-code-text { font-size: 28px; font-weight: bold; color: #3B82F6; letter-spacing: 2px; font-family: monospace; }
    .button { display: inline-block; padding: 12px 30px; background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .step { margin: 10px 0; padding-left: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎨 Welcome to PaintQuote Pro!</h1>
      <p>Professional quotes in 2 minutes</p>
    </div>
    
    <div class="content">
      <h2>Hi ${companyName}! 👋</h2>
      
      <p>Your account has been created successfully. Here's your access code:</p>
      
      <div class="access-code">
        <p style="margin: 0; color: #666; font-size: 14px;">Your Access Code</p>
        <p class="access-code-text">${accessCode}</p>
        <p style="margin: 0; color: #666; font-size: 12px;">Keep this code safe!</p>
      </div>
      
      <div class="steps">
        <h3>Get started in 60 seconds:</h3>
        <div class="step">1️⃣ Log in at ${process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'}/access-code</div>
        <div class="step">2️⃣ Complete your business profile</div>
        <div class="step">3️⃣ Create your first professional quote</div>
      </div>
      
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'}/access-code" class="button">
          Log In Now
        </a>
      </div>
      
      <p style="color: #666; font-size: 14px;">
        Need help? Just reply to this email and we'll assist you right away.
      </p>
    </div>
    
    <div class="footer">
      <p>© PaintQuote Pro - Professional Painting Quotes Made Easy</p>
      <p style="font-size: 12px;">You're receiving this because you signed up for PaintQuote Pro</p>
    </div>
  </div>
</body>
</html>`

    // For development, log the email
    if (process.env.NODE_ENV === 'development') {
      console.log('Email text preview:', emailTemplate)
    }

    // Send email with Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      const { data, error } = await resend.emails.send({
        from: process.env.DEFAULT_FROM_EMAIL || 'PaintQuote Pro <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to PaintQuote Pro - Your Access Code',
        html: htmlTemplate,
        text: emailTemplate
      })

      if (error) {
        console.error('Resend error:', error)
        throw new Error(error.message)
      }

      console.log('Welcome email sent successfully:', data?.id)
    } else {
      console.warn('RESEND_API_KEY not configured - email not sent')
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome email sent successfully'
    })

  } catch (error) {
    console.error('Error sending welcome email:', error)
    // Don't fail the signup if email fails
    return NextResponse.json({
      success: false,
      message: 'Email could not be sent but account was created'
    })
  }
}