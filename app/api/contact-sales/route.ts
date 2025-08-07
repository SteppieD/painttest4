import { NextRequest, NextResponse } from 'next/server';
import { validateAndSanitizeContactForm } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let requestBody: unknown;
    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error('[CONTACT-SALES API] Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body', details: 'Failed to parse JSON' },
        { status: 400 }
      );
    }

    // Validate and sanitize the contact form data
    let validatedData: ReturnType<typeof validateAndSanitizeContactForm>;
    try {
      validatedData = validateAndSanitizeContactForm(requestBody);
    } catch (validationError) {
      console.error('[CONTACT-SALES API] Validation failed:', validationError);
      return NextResponse.json(
        { 
          error: 'Invalid contact form data', 
          details: validationError instanceof Error ? validationError.message : 'Validation failed'
        },
        { status: 400 }
      );
    }

    // Log the sanitized contact form submission (in production, this would be saved to database)
    console.log('[CONTACT-SALES API] Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      employees: validatedData.employees,
      monthlyQuotes: validatedData.monthlyQuotes,
      timestamp: new Date().toISOString(),
      // Don't log phone numbers or messages for privacy
      hasPhone: !!validatedData.phone,
      hasMessage: !!validatedData.message
    });

    // In a real implementation, you would:
    // 1. Save the contact to your CRM or database
    // 2. Send notification emails to your sales team
    // 3. Send confirmation email to the customer
    // 4. Trigger any automation workflows

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! Our sales team will contact you within 24 hours.',
      contactId: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` // Generate a fake ID for tracking
    }, { status: 200 });

  } catch (error) {
    console.error('[CONTACT-SALES API] Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: 'An error occurred while processing your request. Please try again.'
      },
      { status: 500 }
    );
  }
}
