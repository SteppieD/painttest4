import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { generateQuoteNumber } from '@/lib/quote-number-generator';

// Helper function to clean customer names
const cleanCustomerName = (name: string) => {
  if (!name) return 'Customer';
  
  // Handle "It's for [Name]" pattern
  const itsForMatch = name.match(/it'?s\s+for\s+([^.]+)/i);
  if (itsForMatch) {
    return itsForMatch[1].trim();
  }
  
  return name.trim();
};

// POST - Create a new quote
export async function POST(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companyId, quoteData, conversationHistory } = await request.json();
    
    console.log('[QUOTES API] Request data:', { companyId, quoteData });

    // Generate unique quote ID
    const quoteId = await generateQuoteNumber(parseInt(companyId));

    // Prepare quote data for database
    const quote = {
      company_id: parseInt(companyId),
      quote_id: quoteId,
      customer_name: cleanCustomerName(quoteData.customerName) || 'Unknown Customer',
      customer_email: quoteData.customerEmail || null,
      customer_phone: quoteData.customerPhone || null,
      address: quoteData.address || null,
      project_type: quoteData.projectType || 'interior',
      rooms: typeof quoteData.rooms === 'string' ? quoteData.rooms : JSON.stringify(quoteData.rooms || []),
      room_count: quoteData.roomCount || (quoteData.rooms ? quoteData.rooms.length : 0),
      paint_quality: quoteData.paintQuality || null,
      prep_work: quoteData.prepWork || null,
      timeline: quoteData.timeEstimate || quoteData.timeline || null,
      special_requests: quoteData.specialRequests || null,
      walls_sqft: quoteData.sqft || 0,
      ceilings_sqft: quoteData.ceilings_sqft || 0,
      trim_sqft: quoteData.trim_sqft || 0,
      total_revenue: quoteData.finalPrice || quoteData.totalCost || 0,
      total_materials: quoteData.breakdown?.materials || 0,
      projected_labor: quoteData.breakdown?.labor || 0,
      base_cost: quoteData.totalCost || 0,
      markup_percentage: quoteData.markupPercentage || 0,
      final_price: quoteData.finalPrice || quoteData.totalCost || 0,
      conversation_summary: typeof conversationHistory === 'string' 
        ? conversationHistory 
        : JSON.stringify(conversationHistory || [{ quoteData }]),
      status: 'pending'
    };

    // Save quote to database
    console.log('[QUOTES API] Quote data to save:', quote);
    console.log('[QUOTES API] Quote data keys:', Object.keys(quote));
    const result = await db.createQuote(quote);

    return NextResponse.json({
      success: true,
      quoteId,
      quote: {
        ...quote,
        id: result.id
      }
    });

  } catch (error) {
    console.error('Error creating quote:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { 
        error: 'Failed to create quote', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve quotes
export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quotes = await db.getQuotesByCompanyId(company.id);
    
    return NextResponse.json({ 
      success: true,
      quotes: quotes || [] 
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}