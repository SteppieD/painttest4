import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { generateQuoteNumber } from '@/lib/quote-number-generator-adapter';

// Interface for Supabase errors
interface SupabaseError {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
}

// Interface for error info with optional supabase error
interface ErrorInfo {
  error: string;
  message: string;
  errorType?: string;
  stack?: string[];
  databaseType?: string;
  environment: {
    hasSupabase: boolean;
    isVercel: boolean;
    nodeEnv: string | undefined;
  };
  supabaseError?: SupabaseError;
}

export async function POST(_request: NextRequest) {
  try {
    // Test data for debugging - using Quote interface format
    const testQuoteData = {
      company_id: 1,
      quote_id: 'TEST-' + Date.now(),
      customer_name: 'Test Customer',
      customer_email: 'test@example.com',
      customer_phone: '555-1234',
      address: '123 Test St',
      project_type: 'interior',
      surfaces: ['walls', 'ceilings'],
      measurements: {
        walls: 500,
        ceilings: 0,
        rooms: ['Living Room']
      },
      pricing: {
        materials: 200,
        labor: 400,
        markup: 400,
        tax: 0,
        total: 1000
      },
      labor_cost: 400,
      material_cost: 200,
      total_cost: 1000,
      status: 'pending' as const,
      tax_rate: 8.25,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('[TestQuoteCreation] Starting test with data:', testQuoteData);
    
    // Try to generate a quote number
    const quoteNumber = await generateQuoteNumber(testQuoteData.company_id);
    testQuoteData.quote_id = quoteNumber;
    
    console.log('[TestQuoteCreation] Generated quote number:', quoteNumber);

    // Try to create the quote
    const result = await db.createQuote(testQuoteData);
    
    console.log('[TestQuoteCreation] Quote created successfully:', result);

    return NextResponse.json({
      test: 'quote-creation',
      success: true,
      result: {
        id: result.id,
        quote_id: result.quote_id,
        customer_name: result.customer_name,
        total_cost: result.total_cost,
        status: result.status
      },
      testData: testQuoteData,
      environment: {
        hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL),
        isVercel: process.env.VERCEL === '1',
        nodeEnv: process.env.NODE_ENV
      }
    });

  } catch (error) {
    console.error('[TestQuoteCreation] Error:', error);
    
    const errorInfo: ErrorInfo = {
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      errorType: error?.constructor?.name,
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 10) : undefined,
      databaseType: db?.constructor?.name,
      environment: {
        hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL),
        isVercel: process.env.VERCEL === '1',
        nodeEnv: process.env.NODE_ENV
      }
    };

    // Add specific error details for Supabase errors
    if (error && typeof error === 'object' && 'code' in error) {
      const supabaseError = error as SupabaseError;
      errorInfo.supabaseError = {
        code: supabaseError.code,
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint
      };
    }

    return NextResponse.json(errorInfo, { status: 500 });
  }
}

export async function GET(_request: NextRequest) {
  return NextResponse.json({
    message: 'Use POST to test quote creation',
    endpoint: '/api/test-quote-creation',
    method: 'POST'
  });
}