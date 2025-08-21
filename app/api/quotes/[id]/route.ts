import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { QuoteIdSchema, sanitizeString, validateCompanyId } from '@/lib/validation/schemas';
// GET single quote by quote_id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const company = await getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate quote ID parameter
    let validatedQuoteId: string;
    try {
      validatedQuoteId = QuoteIdSchema.parse(params.id);
    } catch (error) {
      return NextResponse.json({ 
        error: 'Invalid quote ID format',
        details: error instanceof Error ? error.message : 'Quote ID validation failed'
      }, { status: 400 });
    }

    // Get quote by quote_id using the adapter method
    const quote = await db.getQuote(validatedQuoteId);

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Validate company ID and check ownership
    const validatedCompanyId = validateCompanyId(company.id);
    if (quote.company_id !== validatedCompanyId) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // No JSON parsing needed for current Quote interface

    return NextResponse.json({ 
      success: true,
      quote 
    });

  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

// PUT - Update quote (full update from edit form)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const company = await getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let quoteData: Record<string, unknown>;
    try {
      quoteData = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: 'Failed to parse JSON' },
        { status: 400 }
      );
    }

    // Sanitize string fields to prevent XSS
    if (quoteData.customer_name) {
      quoteData.customer_name = sanitizeString(quoteData.customer_name);
    }
    if (quoteData.customer_email) {
      quoteData.customer_email = sanitizeString(quoteData.customer_email);
    }
    if (quoteData.customer_phone) {
      quoteData.customer_phone = sanitizeString(quoteData.customer_phone);
    }
    if (quoteData.address) {
      quoteData.address = sanitizeString(quoteData.address);
    }
    if (quoteData.special_requests) {
      quoteData.special_requests = sanitizeString(quoteData.special_requests);
    }
    
    // Validate quote ID parameter
    let validatedQuoteId: string;
    try {
      validatedQuoteId = QuoteIdSchema.parse(params.id);
    } catch (error) {
      return NextResponse.json({ 
        error: 'Invalid quote ID format',
        details: error instanceof Error ? error.message : 'Quote ID validation failed'
      }, { status: 400 });
    }

    // First, get the existing quote to get its id
    const existingQuote = await db.getQuote(validatedQuoteId);
    
    if (!existingQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Validate company ID and check ownership
    const validatedCompanyId = validateCompanyId(company.id);
    if (existingQuote.company_id !== validatedCompanyId) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Prepare update data - remove fields that shouldn't be updated
    const { 
      // These destructured variables are intentionally unused - they're being removed from updateData
      id: _id, 
      quote_id: _quoteId, 
      company_id: _companyId, 
      created_at: _createdAt, 
      updated_at: _updatedAt,
      ...updateData 
    } = quoteData;

    // Ensure updated_at is set
    updateData.updated_at = new Date().toISOString();

    // Use the updateQuote method with the database id
    if (!existingQuote.id) {
      return NextResponse.json(
        { error: 'Quote ID is missing' },
        { status: 400 }
      );
    }
    const updatedQuote = await db.updateQuote(existingQuote.id, updateData);

    return NextResponse.json({ 
      success: true,
      quote: updatedQuote,
      message: 'Quote updated successfully'
    });

  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update quote',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}