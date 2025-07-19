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

    // Get quote by quote_id
    const quote = await db.get(
      `SELECT * FROM quotes WHERE quote_id = ? AND company_id = ?`,
      [params.id, company.id]
    );

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Parse JSON fields if they exist
    try {
      if (quote.rooms && typeof quote.rooms === 'string') {
        quote.rooms = JSON.parse(quote.rooms);
      }
      if (quote.conversation_summary && typeof quote.conversation_summary === 'string') {
        quote.conversation_summary = JSON.parse(quote.conversation_summary);
      }
    } catch (e) {
      // If parsing fails, leave as string
    }

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

// PATCH - Update quote
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();
    
    // Remove fields that shouldn't be updated directly
    const { id, quote_id, company_id, created_at, ...updateData } = updates;

    // Build update query
    const updateFields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
    const updateValues = Object.values(updateData);
    
    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Add WHERE clause parameters
    updateValues.push(params.id, company.id);

    // Update the quote
    const result = await db.run(
      `UPDATE quotes SET ${updateFields} WHERE quote_id = ? AND company_id = ?`,
      updateValues
    );

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Quote not found or no changes made' }, { status: 404 });
    }

    // Fetch the updated quote
    const updatedQuote = await db.get(
      `SELECT * FROM quotes WHERE quote_id = ? AND company_id = ?`,
      [params.id, company.id]
    );

    // Parse JSON fields if they exist
    try {
      if (updatedQuote.rooms && typeof updatedQuote.rooms === 'string') {
        updatedQuote.rooms = JSON.parse(updatedQuote.rooms);
      }
      if (updatedQuote.conversation_summary && typeof updatedQuote.conversation_summary === 'string') {
        updatedQuote.conversation_summary = JSON.parse(updatedQuote.conversation_summary);
      }
    } catch (e) {
      // If parsing fails, leave as string
    }

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