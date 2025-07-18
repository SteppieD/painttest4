import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getAuthContext } from '@/lib/auth/middleware';
import { generateQuoteNumber } from '@/lib/quote-number-generator';

// Helper function to clean customer names
const cleanCustomerName = (name: string) => {
  if (!name) return 'Customer';
  
  // Handle "It's for [Name]" pattern
  const itsForMatch = name.match(/it'?s\s+for\s+([^.]+)/i);
  if (itsForMatch) {
    return itsForMatch[1].trim();
  }
  
  // Handle "Customer: [Name]" pattern
  const customerMatch = name.match(/customer:\s*([^,]+)/i);
  if (customerMatch) {
    return customerMatch[1].trim();
  }
  
  // Handle various name patterns
  const namePatterns = [
    /(?:the\s+)?customers?\s+name\s+is\s+([A-Z][a-z]+)(?:\s+and|$)/i,
    /name\s+is\s+([A-Z][a-z]+)/i,
    /(?:for|customer|client)?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/
  ];
  
  for (const pattern of namePatterns) {
    const match = name.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  // If it's too long or contains sentences, return default
  if (name.length > 50 || name.includes('.') || name.includes('painting')) {
    return 'Customer';
  }
  
  return name;
};

// POST - Create a new quote
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestData = await request.json();
    
    // Extract data from request
    let quoteData, companyId, conversationHistory;
    
    if (requestData.quoteData && requestData.companyId) {
      // New nested format
      ({ quoteData, companyId, conversationHistory } = requestData);
    } else if (requestData.company_id || requestData.companyId) {
      // Old flat format - map to new format
      companyId = requestData.company_id || requestData.companyId;
      conversationHistory = requestData.conversation_summary;
      
      quoteData = {
        customerName: cleanCustomerName(requestData.customer_name),
        customerEmail: requestData.customer_email,
        customerPhone: requestData.customer_phone,
        address: requestData.address,
        projectType: requestData.project_type,
        rooms: requestData.room_data,
        roomCount: requestData.room_count,
        paintQuality: requestData.paint_quality,
        prepWork: requestData.prep_work,
        timeEstimate: requestData.timeline,
        specialRequests: requestData.special_requests,
        totalCost: requestData.total_cost,
        finalPrice: requestData.final_price || requestData.total_revenue,
        markupPercentage: requestData.markup_percentage,
        sqft: requestData.walls_sqft,
        breakdown: {
          materials: requestData.total_materials,
          labor: requestData.total_labor || requestData.projected_labor,
          markup: requestData.markup_amount
        }
      };
    } else {
      return NextResponse.json(
        { error: 'Quote data and company ID are required' },
        { status: 400 }
      );
    }

    // Verify company access
    if (auth.type === 'company' && auth.company?.id !== parseInt(companyId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // TODO: Check subscription limits here
    // const canCreate = await checkQuoteLimits(companyId);
    // if (!canCreate) {
    //   return NextResponse.json({ error: 'Quote limit reached' }, { status: 403 });
    // }

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
    const result = await db.createQuote(quote);

    // TODO: Record quote usage for subscription tracking
    // await recordQuoteUsage(companyId, quoteId);

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
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}

// GET - Retrieve quotes
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const companyId = searchParams.get('company_id');
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    // For company users, they can only see their own quotes
    if (auth.type === 'company') {
      const quotes = await db.getQuotesByCompanyId(auth.company!.id);
      
      // Filter by status if provided
      let filteredQuotes = quotes;
      if (status) {
        filteredQuotes = quotes.filter((q: any) => q.status === status);
      }
      
      // Limit results
      if (filteredQuotes.length > limit) {
        filteredQuotes = filteredQuotes.slice(0, limit);
      }
      
      return NextResponse.json({ quotes: formatQuotes(filteredQuotes) });
    }

    // For admin users, they can see all quotes or filter by company
    if (auth.type === 'admin') {
      if (companyId) {
        const quotes = await db.getQuotesByCompanyId(parseInt(companyId));
        return NextResponse.json({ quotes: formatQuotes(quotes) });
      } else {
        // Get all quotes (admin only)
        const quotes = await db.query('SELECT * FROM quotes ORDER BY created_at DESC LIMIT ?', [limit]);
        return NextResponse.json({ quotes: formatQuotes(quotes) });
      }
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { quotes: [], error: 'Failed to fetch quotes' },
      { status: 200 } // Return 200 with empty array to prevent frontend crashes
    );
  }
}

// PUT - Update a quote
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, updates } = await request.json();

    if (!id || !updates) {
      return NextResponse.json(
        { error: 'Quote ID and updates are required' },
        { status: 400 }
      );
    }

    // Get the quote to check ownership
    const quote = await db.getQuote(id);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Verify access
    if (auth.type === 'company' && quote.company_id !== auth.company!.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update the quote
    const result = await db.updateQuote(id, updates);

    return NextResponse.json({
      success: true,
      quote: result
    });

  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a quote
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Quote ID is required' },
        { status: 400 }
      );
    }

    // Get the quote to check ownership
    const quote = await db.getQuote(id);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Verify access
    if (auth.type === 'company' && quote.company_id !== auth.company!.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Delete the quote
    await db.query('DELETE FROM quotes WHERE quote_id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Quote deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote' },
      { status: 500 }
    );
  }
}

// Helper function to format quotes for response
function formatQuotes(quotes: any[]): any[] {
  return quotes.map((quote: any) => {
    // Parse JSON fields
    let rooms = [];
    let breakdown = null;
    let conversationSummary = null;

    try {
      if (quote.rooms) {
        rooms = typeof quote.rooms === 'string' ? JSON.parse(quote.rooms) : quote.rooms;
      }
    } catch (e) {
      console.error('Error parsing rooms:', e);
    }

    try {
      if (quote.conversation_summary) {
        conversationSummary = typeof quote.conversation_summary === 'string' 
          ? JSON.parse(quote.conversation_summary) 
          : quote.conversation_summary;
          
        // Try to extract breakdown from conversation
        if (Array.isArray(conversationSummary) && conversationSummary.length > 0) {
          const lastMessage = conversationSummary[conversationSummary.length - 1];
          if (lastMessage?.quoteData?.breakdown) {
            breakdown = lastMessage.quoteData.breakdown;
          }
        }
      }
    } catch (e) {
      console.error('Error parsing conversation summary:', e);
    }

    // Create breakdown if not found
    if (!breakdown) {
      breakdown = {
        labor: quote.projected_labor || Math.round((quote.total_revenue || 0) * 0.45),
        materials: quote.total_materials || Math.round((quote.total_revenue || 0) * 0.35),
        prepWork: Math.round((quote.total_revenue || 0) * 0.05),
        markup: Math.round((quote.final_price || quote.total_revenue || 0) - (quote.base_cost || 0))
      };
    }

    return {
      id: quote.id,
      quote_id: quote.quote_id,
      customer_name: quote.customer_name || 'Unknown Customer',
      customer_email: quote.customer_email || '',
      customer_phone: quote.customer_phone || '',
      address: quote.address || 'No address provided',
      quote_amount: quote.final_price || quote.total_revenue || 0,
      final_price: quote.final_price || quote.total_revenue || 0,
      notes: quote.special_requests || '',
      status: quote.status || 'pending',
      created_at: quote.created_at,
      updated_at: quote.updated_at,
      company_id: quote.company_id,
      project_type: quote.project_type || 'interior',
      time_estimate: quote.timeline,
      rooms,
      room_count: quote.room_count || rooms.length,
      breakdown,
      total_cost: quote.final_price || quote.total_revenue || 0,
      sqft: (quote.walls_sqft || 0) + (quote.ceilings_sqft || 0) + (quote.trim_sqft || 0),
      conversation_summary: conversationSummary
    };
  });
}