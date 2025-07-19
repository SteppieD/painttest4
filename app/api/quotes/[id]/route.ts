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