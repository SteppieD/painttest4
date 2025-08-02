import { NextRequest, NextResponse } from 'next/server';
import { db, type Company } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { generateQuoteNumber } from '@/lib/quote-number-generator-adapter';
import { SubscriptionService } from '@/lib/services/subscription';
export const dynamic = 'force-dynamic';

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
interface RequestBody {
  companyId: number | string;
  quoteData: {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    address?: string;
    projectType?: string;
    surfaces?: string[];
    sqft?: number;
    ceilings_sqft?: number;
    trim_sqft?: number;
    rooms?: Array<{ name: string; length?: number; width?: number }>;
    breakdown?: {
      materials?: number;
      labor?: number;
      markup?: number;
      [key: string]: unknown;
    };
    finalPrice?: number;
    totalCost?: number;
    timeEstimate?: string;
    timeline?: string;
    specialRequests?: string | string[];
    [key: string]: unknown;
  };
  conversationHistory?: Array<{ role: string; content: string }>;
}

export async function POST(request: NextRequest) {
  let requestBody: RequestBody;
  try {
    let companyId: number | string;
    let quoteData: RequestBody['quoteData'];
    
    try {
    const company = getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error('[QUOTES API] Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body', details: 'Failed to parse JSON' },
        { status: 400 }
      );
    }
    
    companyId = requestBody.companyId;
    quoteData = requestBody.quoteData;
    const conversationHistory = requestBody.conversationHistory;
    
    console.log('[QUOTES API] Request data:', { companyId, quoteData });
    console.log('[QUOTES API] Company from auth:', company);
    
    // Validate required fields
    if (!companyId) {
      return NextResponse.json(
        { error: 'Missing companyId' },
        { status: 400 }
      );
    }
    
    if (!quoteData) {
      return NextResponse.json(
        { error: 'Missing quoteData' },
        { status: 400 }
      );
    }

    // Ensure companyId is a number
    const numericCompanyId = typeof companyId === 'string' ? parseInt(companyId) : companyId;
    
    // Check subscription limits before creating quote
    const quoteLimitCheck = await SubscriptionService.checkQuoteLimit(numericCompanyId);
    if (!quoteLimitCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Quote limit reached',
          message: `You've reached your monthly limit of ${quoteLimitCheck.limit} quotes. Upgrade to Pro for unlimited quotes.`,
          limit: quoteLimitCheck.limit,
          remaining: 0,
          upgradeUrl: '/dashboard/settings/billing'
        },
        { status: 403 }
      );
    }
    
    // Get company data to fetch tax rate
    let companyData = await db.getCompany(numericCompanyId);
    
    // If company doesn't exist in memory adapter, create it from auth data
    if (!companyData && company) {
      console.log('[QUOTES API] Company not found in DB, creating from auth data:', {
        id: numericCompanyId,
        accessCode: company.access_code,
        name: company.name
      });
      
      try {
        // Create the company in the database
        companyData = await db.createCompany({
          access_code: company.access_code,
          company_name: company.name || 'Unknown Company',
          email: company.email || `company${numericCompanyId}@example.com`,
          phone: '',
          tax_rate: 0,
          onboarding_completed: false,
          onboarding_step: 0,
          subscription_tier: 'free',
          monthly_quote_count: 0,
          monthly_quote_limit: 5
        });
        console.log('[QUOTES API] Company created successfully:', companyData);
      } catch (createError) {
        console.error('[QUOTES API] Failed to create company:', createError);
        // Continue with minimal company data if creation fails
        companyData = {
          id: numericCompanyId,
          access_code: company.access_code,
          company_name: company.name || 'Unknown Company',
          email: company.email || '',
          tax_rate: 0,
          onboarding_completed: false,
          onboarding_step: 0,
          subscription_tier: 'free',
          monthly_quote_count: 0,
          monthly_quote_limit: 5
        } as Company;
      }
    }
    
    const companyTaxRate = companyData?.tax_rate || 0;
    
    // Generate unique quote ID
    const quoteId = await generateQuoteNumber(numericCompanyId);

    // Prepare quote data for database using Quote interface fields
    const materialCost = quoteData.breakdown?.materials || 0;
    const laborCost = quoteData.breakdown?.labor || 0;
    const totalCost = quoteData.finalPrice || quoteData.totalCost || materialCost + laborCost;
    
    const quote = {
      company_id: numericCompanyId,
      quote_id: quoteId,
      customer_name: cleanCustomerName(quoteData.customerName) || 'Unknown Customer',
      customer_email: quoteData.customerEmail || null,
      customer_phone: quoteData.customerPhone || null,
      address: quoteData.address || null,
      project_type: quoteData.projectType || 'interior',
      surfaces: quoteData.surfaces || ['walls', 'ceilings'],
      measurements: {
        walls: quoteData.sqft || 0,
        ceilings: quoteData.ceilings_sqft || 0,
        trim: quoteData.trim_sqft || 0,
        rooms: quoteData.rooms || []
      },
      pricing: {
        materials: materialCost,
        labor: laborCost,
        markup: quoteData.breakdown?.markup || 0,
        tax: (totalCost * companyTaxRate / 100),
        total: totalCost,
        breakdown: quoteData.breakdown || {}
      },
      labor_cost: laborCost,
      material_cost: materialCost,
      total_cost: totalCost,
      timeline: quoteData.timeEstimate || quoteData.timeline || null,
      special_requests: Array.isArray(quoteData.specialRequests) 
        ? quoteData.specialRequests.join(', ') 
        : quoteData.specialRequests || null,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Save quote to database
    console.log('[QUOTES API] Quote data to save:', quote);
    console.log('[QUOTES API] Quote data keys:', Object.keys(quote));
    console.log('[QUOTES API] Sample values:', {
      company_id: quote.company_id,
      quote_id: quote.quote_id,
      customer_name: quote.customer_name,
      total_cost: quote.total_cost,
      surfaces: quote.surfaces
    });
    
    let result;
    try {
      result = await db.createQuote(quote);
      console.log('[QUOTES API] Quote created successfully:', result);
      
      // Increment quote count for subscription tracking
      await SubscriptionService.incrementQuoteCount(numericCompanyId);
    } catch (dbError) {
      console.error('[QUOTES API] Database error:', dbError);
      console.error('[QUOTES API] Error message:', dbError instanceof Error ? dbError.message : 'Unknown error');
      console.error('[QUOTES API] Error stack:', dbError instanceof Error ? dbError.stack : 'No stack');
      throw dbError;
    }

    if (!result) {
      console.error('[QUOTES API] No result returned from createQuote');
      throw new Error('Failed to create quote - no result returned');
    }

    // Return response with GTM tracking data
    const response = {
      success: true,
      quoteId,
      quote: {
        ...quote,
        id: result.id
      },
      // Include tracking data for client-side GTM
      trackingData: {
        event: 'quote_created',
        quote_id: quoteId,
        quote_value: quote.total_cost || 0,
        project_type: quote.project_type,
        customer_name: quote.customer_name
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[QUOTES API] Error creating quote:', error);
    console.error('[QUOTES API] Error type:', typeof error);
    console.error('[QUOTES API] Error constructor:', error?.constructor?.name);
    console.error('[QUOTES API] Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('[QUOTES API] Request data that caused error:', { 
      companyId, 
      quoteDataKeys: quoteData ? Object.keys(quoteData) : 'no quoteData',
      hasConversationHistory: !!requestBody?.conversationHistory
    });
    
    // More detailed error info
    if (error instanceof Error) {
      console.error('[QUOTES API] Error name:', error.name);
      console.error('[QUOTES API] Error message:', error.message);
      
      // Check for specific database errors
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.error('[QUOTES API] Database tables might not exist. Run the Supabase migration.');
        return NextResponse.json(
          { 
            error: 'Database not initialized', 
            details: 'Database tables not found. Please run the Supabase migration script.',
            helpUrl: '/supabase-setup.sql'
          },
          { status: 500 }
        );
      }
    }
    
    // Return error response with more details
    const errorResponse = {
      error: 'Failed to create quote',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: {
        hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL),
        isVercel: process.env.VERCEL === '1',
        nodeEnv: process.env.NODE_ENV
      }
    };
    
    // Add stack trace in development
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      (errorResponse as unknown)['stack'] = error.stack;
    }
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
  } catch (outerError) {
    // Catch any unhandled errors
    console.error('[QUOTES API] Unhandled error in POST handler:', outerError);
    console.error('[QUOTES API] Error type:', typeof outerError);
    console.error('[QUOTES API] Error details:', outerError instanceof Error ? {
      name: outerError.name,
      message: outerError.message,
      stack: outerError.stack?.split('\n').slice(0, 5).join('\n')
    } : outerError);
    
    // In production, log the full error but return a generic message
    const isProduction = process.env.NODE_ENV === 'production';
    const errorMessage = outerError instanceof Error ? outerError.message : 'An unexpected error occurred';
    
    return NextResponse.json({
      error: 'Internal server error',
      details: isProduction ? 'An error occurred while creating the quote' : errorMessage,
      debugInfo: isProduction ? undefined : {
        errorType: outerError?.constructor?.name,
        message: errorMessage,
        stack: outerError instanceof Error ? outerError.stack?.split('\n').slice(0, 10) : undefined
      },
      timestamp: new Date().toISOString(),
      hint: 'Check Vercel function logs for detailed error information'
    }, { status: 500 });
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