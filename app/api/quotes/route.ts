import { NextRequest, NextResponse } from 'next/server';
import { db, type Company } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { generateQuoteNumber } from '@/lib/quote-number-generator-adapter';
import { SubscriptionService } from '@/lib/services/subscription';
import { CreateQuoteSchema, validateCompanyId, sanitizeString } from '@/lib/validation/schemas';
export const dynamic = 'force-dynamic';

// Helper function to clean customer names
const cleanCustomerName = (name: string | undefined) => {
  if (!name) return 'Customer';
  
  // Handle "It's for [Name]" pattern
  const itsForMatch = name.match(/it'?s\s+for\s+([^.]+)/i);
  if (itsForMatch) {
    return itsForMatch[1].trim();
  }
  
  return name.trim();
};

// POST - Create a new quote
// Request body type is now handled by Zod validation

// Error response interface
interface ErrorResponse {
  error: string;
  details: string;
  timestamp: string;
  environment: {
    hasSupabase: boolean;
    isVercel: boolean;
    nodeEnv: string | undefined;
  };
  stack?: string; // Optional stack trace for development
}

export async function POST(request: NextRequest) {
  let requestBody: unknown;
  let validatedData: ReturnType<typeof CreateQuoteSchema.parse>;
  let numericCompanyId: number;
  
  try {
    
    try {
    const company = await getCompanyFromRequest(request);
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
    
    // Validate and sanitize the request body
    try {
      validatedData = CreateQuoteSchema.parse(requestBody);
    } catch (validationError) {
      console.error('[QUOTES API] Request validation failed:', validationError);
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: validationError instanceof Error ? validationError.message : 'Validation failed',
          validationErrors: validationError
        },
        { status: 400 }
      );
    }
    
    const { companyId, quoteData, conversationHistory: _conversationHistory } = validatedData;
    
    console.log('[QUOTES API] Request data (validated):', { companyId, customerName: quoteData.customerName });
    console.log('[QUOTES API] Company from auth:', company);
    
    // companyId is now guaranteed to be a valid positive integer from validation
    numericCompanyId = companyId;
    
    // Check subscription limits before creating quote
    const quoteLimitCheck = await SubscriptionService.checkQuoteLimit(numericCompanyId);
    if (!quoteLimitCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Quote limit reached',
          message: `You've reached your monthly limit of ${quoteLimitCheck.limit} quotes. Your limit resets next month, or upgrade now for unlimited quotes.`,
          limit: quoteLimitCheck.limit,
          remaining: 0,
          upgradeUrl: '/pricing',
          resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
          upgradeMessage: 'Upgrade to Professional plan for unlimited quotes, custom branding, and advanced features starting at $79/month.'
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
        name: company.name,
        email: company.email,
        access_code: company.access_code
      });
      
      const newCompanyData: Company = {
        id: numericCompanyId,
        company_name: company.name,  // Use company_name as per the interface
        name: company.name,
        email: company.email || '',  // Provide empty string as default if email is undefined
        access_code: company.access_code,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        onboarding_completed: true,
        onboarding_step: 0,
        tax_rate: 0,
        subscription_tier: 'free',
        monthly_quote_count: 0,
        monthly_quote_limit: 5,
        default_hourly_rate: 45,
        default_labor_percentage: 35
      };
      
      companyData = await db.createCompany(newCompanyData);
      console.log('[QUOTES API] Created new company:', companyData);
    }
    
    if (!companyData) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Generate quote number for this company
    const quoteNumber = await generateQuoteNumber(numericCompanyId);
    
    // Clean up and sanitize customer name
    const cleanedCustomerName = sanitizeString(cleanCustomerName(quoteData.customerName));
    
    // Create quote data with all required fields
    const newQuoteData = {
      company_id: numericCompanyId,
      quote_id: quoteNumber,
      customer_name: cleanedCustomerName,
      customer_email: quoteData.customerEmail ? sanitizeString(quoteData.customerEmail) : '',
      customer_phone: quoteData.customerPhone ? sanitizeString(quoteData.customerPhone) : '',
      address: quoteData.address ? sanitizeString(quoteData.address) : '',
      project_type: quoteData.projectType || 'interior',
      surfaces: quoteData.surfaces || ['walls'],
      measurements: {
        sqft: quoteData.sqft || 0,
        ceilings_sqft: quoteData.ceilings_sqft || 0,
        trim_sqft: quoteData.trim_sqft || 0,
        rooms: quoteData.rooms || []
      },
      pricing: quoteData.breakdown ? {
        materials: quoteData.breakdown.materials || 0,
        labor: quoteData.breakdown.labor || 0,
        markup: quoteData.breakdown.markup || 0,
        tax: 0,
        total: quoteData.finalPrice || quoteData.totalCost || 0
      } : {
        materials: 0,
        labor: 0,
        markup: 0,
        tax: 0,
        total: quoteData.finalPrice || quoteData.totalCost || 0
      },
      labor_cost: quoteData.breakdown?.labor || 0,
      material_cost: quoteData.breakdown?.materials || 0,
      total_cost: quoteData.finalPrice || quoteData.totalCost || 0,
      status: 'pending' as const,
      
      // Store current tax rate with quote for historical accuracy
      tax_rate: companyData.tax_rate || 0,
      time_estimate: quoteData.timeEstimate ? sanitizeString(quoteData.timeEstimate) : undefined,
      timeline: quoteData.timeline ? sanitizeString(quoteData.timeline) : undefined,
      special_requests: Array.isArray(quoteData.specialRequests) 
        ? sanitizeString(quoteData.specialRequests.map(r => sanitizeString(r)).join(', ')) 
        : sanitizeString(quoteData.specialRequests || ''),
      
      // Add timestamps
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('[QUOTES API] Creating quote with data:', {
      ...newQuoteData,
      // Don't log sensitive data, just structure
      customer_email: newQuoteData.customer_email ? '[email provided]' : '[no email]',
      customer_phone: newQuoteData.customer_phone ? '[phone provided]' : '[no phone]'
    });

    // Create the quote
    const createdQuote = await db.createQuote(newQuoteData);

    // Track usage for subscription
    await SubscriptionService.incrementQuoteCount(numericCompanyId);

    // Track achievements (server-side tracking for security)
    // Note: Client will also track for immediate feedback
    
    console.log('[QUOTES API] Quote created successfully:', {
      id: createdQuote.id,
      quote_id: createdQuote.quote_id,
      customer: createdQuote.customer_name,
      total: createdQuote.total_cost
    });

    return NextResponse.json({
      success: true,
      quote: createdQuote,
      quoteId: quoteNumber,
      message: 'Quote created successfully',
      debugInfo: process.env.NODE_ENV === 'development' ? {
        companyFound: !!companyData,
        quoteNumber,
        numericCompanyId,
        hasBreakdown: !!quoteData.breakdown
      } : undefined
    }, { status: 201 });

  } catch (error) {
    console.error('[QUOTES API] Error in create quote:', error);
    console.error('[QUOTES API] Request context:', {
      errorType: error?.constructor?.name,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });
    
    // Check for Supabase connection issues
    if (error instanceof Error && error.message.includes('fetch')) {
      console.error('[QUOTES API] Possible network/database connection error');
      
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return NextResponse.json(
          { 
            error: 'Database configuration missing',
            details: 'Supabase URL not configured. Please check environment variables.',
            debugInfo: process.env.NODE_ENV === 'development' ? {
              missingVars: {
                SUPABASE_URL: !process.env.NEXT_PUBLIC_SUPABASE_URL,
                SUPABASE_ANON_KEY: !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              }
            } : undefined,
            helpUrl: '/supabase-setup.sql'
          },
          { status: 500 }
        );
      }
    }
    
    // Return error response with more details
    const errorResponse: ErrorResponse = {
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
      errorResponse.stack = error.stack;
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

// GET - Fetch all quotes for a company
export async function GET(request: NextRequest) {
  try {
    const company = await getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate company ID before database query
    const validatedCompanyId = validateCompanyId(company.id);
    
    // Get all quotes for this company
    const quotes = await db.getQuotesByCompanyId(validatedCompanyId);

    return NextResponse.json({
      success: true,
      quotes,
      count: quotes.length
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch quotes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}