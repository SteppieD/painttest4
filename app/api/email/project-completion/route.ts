import { NextRequest, NextResponse } from 'next/server';
import { requireCompanyAuth } from '@/lib/auth/middleware';
import { emailAutomationService } from '@/lib/email/EmailAutomationService';
import { db } from '@/lib/database/adapter';

export const dynamic = 'force-dynamic';

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

    const { 
      customerName,
      customerEmail,
      projectType,
      totalAmount,
      projectDuration,
      reviewUrl,
      referralIncentive 
    } = await request.json();

    if (!customerName || !customerEmail || !projectType) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: customerName, customerEmail, projectType'
      }, { status: 400 });
    }

    // Get company details
    const company = await db.getCompany(auth.company.id);
    if (!company) {
      return NextResponse.json({
        success: false,
        error: 'Company not found'
      }, { status: 404 });
    }

    // Send project completion email
    const emailId = await emailAutomationService.sendProjectCompletionEmail(
      customerName,
      customerEmail,
      {
        projectType,
        totalAmount: totalAmount || '0',
        projectDuration: projectDuration || 'Recently completed'
      },
      company as any,
      {
        reviewUrl,
        referralIncentive
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Project completion email sent successfully',
      emailId,
      sentTo: customerEmail
    });

  } catch (error) {
    console.error('[EMAIL] Project completion error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send project completion email'
    }, { status: 500 });
  }
}