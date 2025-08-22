import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/EmailService';
import { EMAIL_TEMPLATES } from '@/lib/email/templates';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = emailService.getServiceStatus();
    
    return NextResponse.json({
      success: true,
      status,
      templates: Object.keys(EMAIL_TEMPLATES),
      message: status.available 
        ? 'Email service is configured and ready'
        : 'Email service is not configured - check environment variables'
    });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check email service status'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { to, template, data } = await request.json();

    if (!to || !template) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: to, template'
      }, { status: 400 });
    }

    // Get template
    const emailTemplate = EMAIL_TEMPLATES[template as keyof typeof EMAIL_TEMPLATES];
    if (!emailTemplate) {
      return NextResponse.json({
        success: false,
        error: `Template '${template}' not found`,
        availableTemplates: Object.keys(EMAIL_TEMPLATES)
      }, { status: 400 });
    }

    // Send test email
    const emailId = await emailService.sendTransactional(
      emailTemplate,
      to,
      data || {}
    );

    return NextResponse.json({
      success: true,
      emailId,
      message: emailId 
        ? `Test email sent with ID: ${emailId}`
        : 'Test email logged (service not configured)',
      template: emailTemplate.name
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    }, { status: 500 });
  }
}