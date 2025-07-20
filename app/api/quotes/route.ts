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
  let companyId: any;
  let quoteData: any;
  
  try {
    const company = getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestBody = await request.json();
    companyId = requestBody.companyId;
    quoteData = requestBody.quoteData;
    const conversationHistory = requestBody.conversationHistory;
    
    console.log('[QUOTES API] Request data:', { companyId, quoteData });

    // Ensure companyId is a number
    const numericCompanyId = typeof companyId === 'string' ? parseInt(companyId) : companyId;
    
    // Generate unique quote ID
    const quoteId = await generateQuoteNumber(numericCompanyId);

    // Prepare quote data for database with all required fields
    const quote = {
      company_id: numericCompanyId,
      quote_id: quoteId,
      customer_name: cleanCustomerName(quoteData.customerName) || 'Unknown Customer',
      customer_email: quoteData.customerEmail || null,
      customer_phone: quoteData.customerPhone || null,
      address: quoteData.address || null,
      project_type: quoteData.projectType || 'interior',
      rooms: typeof quoteData.rooms === 'string' ? quoteData.rooms : JSON.stringify(quoteData.rooms || []),
      paint_quality: quoteData.paintQuality || null,
      prep_work: quoteData.prepWork || null,
      timeline: quoteData.timeEstimate || quoteData.timeline || null,
      special_requests: Array.isArray(quoteData.specialRequests) 
        ? quoteData.specialRequests.join(', ') 
        : quoteData.specialRequests || null,
      walls_sqft: quoteData.sqft || 0,
      ceilings_sqft: quoteData.ceilings_sqft || 0,
      trim_sqft: quoteData.trim_sqft || 0,
      doors_count: 0,
      windows_count: 0,
      priming_sqft: 0,
      painting_rate: 0,
      priming_rate: 0,
      trim_rate: 0,
      door_rate: 0,
      window_rate: 0,
      walls_rate: 0,
      ceilings_rate: 0,
      walls_paint_cost: 0,
      ceilings_paint_cost: 0,
      trim_paint_cost: 0,
      total_revenue: quoteData.finalPrice || quoteData.totalCost || 0,
      total_materials: quoteData.breakdown?.materials || 0,
      paint_cost: quoteData.breakdown?.materials || 0,
      sundries_cost: 0,
      sundries_percentage: 12,
      projected_labor: quoteData.breakdown?.labor || 0,
      labor_percentage: 0,
      projected_profit: quoteData.breakdown?.markup || 0,
      paint_coverage: 350,
      tax_rate: 0,
      tax_amount: 0,
      subtotal: quoteData.totalCost || 0,
      base_cost: quoteData.totalCost || 0,
      markup_percentage: quoteData.markupPercentage || 30,
      final_price: quoteData.finalPrice || quoteData.totalCost || 0,
      room_data: JSON.stringify(quoteData.rooms || []),
      room_count: quoteData.roomCount || 0,
      confirmed_rates: JSON.stringify({}),
      status: 'pending',
      conversation_summary: typeof conversationHistory === 'string' 
        ? conversationHistory 
        : JSON.stringify(conversationHistory || [{ quoteData }])
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
    console.error('Request data that caused error:', { companyId, quoteData });
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