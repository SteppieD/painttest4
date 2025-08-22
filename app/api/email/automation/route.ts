import { NextRequest, NextResponse } from 'next/server';
import { requireCompanyAuth } from '@/lib/auth/middleware';
import { emailAutomationService } from '@/lib/email/EmailAutomationService';
import { db } from '@/lib/database/adapter';

export const dynamic = 'force-dynamic';

interface AutomationResult {
  message: string;
  emailId?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate the request
    const auth = await requireCompanyAuth(request);
    if (auth instanceof NextResponse) {
      return auth; // Return the 401 response
    }

    // Type guard: auth is guaranteed to have company when not NextResponse
    if (!auth.company) {
      return NextResponse.json({
        success: false,
        error: 'Company information missing'
      }, { status: 401 });
    }

    const { action, quoteId, followUpNumber, daysUntilExpiration } = await request.json();

    if (!action || !quoteId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: action, quoteId'
      }, { status: 400 });
    }

    // Get quote and company details
    const quote = await db.getQuote(quoteId);
    if (!quote) {
      return NextResponse.json({
        success: false,
        error: 'Quote not found'
      }, { status: 404 });
    }

    const company = await db.getCompany(auth.company.id);
    if (!company) {
      return NextResponse.json({
        success: false,
        error: 'Company not found'
      }, { status: 404 });
    }

    let result: AutomationResult;

    switch (action) {
      case 'schedule_follow_ups':
        await emailAutomationService.scheduleQuoteFollowUps(quote, company);
        result = { message: 'Follow-up sequence scheduled successfully' };
        break;

      case 'send_follow_up':
        const emailId = await emailAutomationService.sendImmediateFollowUp(
          quote, 
          company, 
          followUpNumber || 1
        );
        result = { 
          message: 'Follow-up email sent successfully',
          emailId: emailId || undefined
        };
        break;

      case 'send_expiration_warning':
        const expirationEmailId = await emailAutomationService.sendExpirationWarning(
          quote,
          company,
          daysUntilExpiration || 5
        );
        result = {
          message: 'Expiration warning sent successfully',
          emailId: expirationEmailId || undefined
        };
        break;

      case 'cancel_automation':
        await emailAutomationService.cancelAutomation(quoteId, 'Manually cancelled');
        result = { message: 'Automation cancelled successfully' };
        break;

      case 'get_status':
        const status = await emailAutomationService.getAutomationStatus(quoteId);
        result = { message: 'Status retrieved successfully', ...status };
        break;

      default:
        return NextResponse.json({
          success: false,
          error: `Unknown action: ${action}`
        }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Email automation API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process email automation request',
      details: errorMessage
    }, { status: 500 });
  }
}