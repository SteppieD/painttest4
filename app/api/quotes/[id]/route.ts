import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

// GET single quote by quote_id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get quote by quote_id using the adapter method
    const quote = await db.getQuote(params.id);

    if (!quote || quote.company_id !== company.id) {
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
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quoteData = await request.json();
    
    // First, get the existing quote to get its id
    const existingQuote = await db.getQuote(params.id);
    
    if (!existingQuote || existingQuote.company_id !== company.id) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Prepare update data - remove fields that shouldn't be updated
    const { 
      id, 
      quote_id, 
      company_id, 
      created_at, 
      updated_at,
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

