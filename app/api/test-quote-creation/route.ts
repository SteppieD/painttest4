import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { generateQuoteNumber } from '@/lib/quote-number-generator-adapter';

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
      timeline: '1 week',
      special_requests: undefined,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    console.log('[TEST-QUOTE] Starting test quote creation');
    console.log('[TEST-QUOTE] Database adapter type:', db.constructor.name);
    
    // Try to generate quote number
    let quoteNumber;
    try {
      quoteNumber = await generateQuoteNumber(1);
      console.log('[TEST-QUOTE] Generated quote number:', quoteNumber);
      testQuoteData.quote_id = quoteNumber;
    } catch (error) {
      console.error('[TEST-QUOTE] Error generating quote number:', error);
      console.error('[TEST-QUOTE] Using fallback quote number');
    }

    // Try to create quote
    console.log('[TEST-QUOTE] Attempting to create quote');
    const result = await db.createQuote(testQuoteData);
    console.log('[TEST-QUOTE] Quote created successfully:', result);

    return NextResponse.json({
      success: true,
      message: 'Test quote created successfully',
      quoteId: result.quote_id,
      id: result.id,
      databaseType: db.constructor.name
    });

  } catch (error) {
    console.error('[TEST-QUOTE] Error in test:', error);
    
    const errorInfo = {
      error: 'Test quote creation failed',
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
      (errorInfo as unknown)['supabaseError'] = {
        code: (error as unknown).code,
        message: (error as unknown).message,
        details: (error as unknown).details,
        hint: (error as unknown).hint
      };
    }

    return NextResponse.json(errorInfo, { status: 500 });
  }
}

export async function GET(_request: NextRequest) {
  try {
    // Test database connection
    const testCompanies = await db.getAllCompanies();
    
    return NextResponse.json({
      message: 'Test endpoint ready',
      databaseType: db?.constructor?.name || 'Unknown',
      databaseCheck: {
        canConnect: true,
        companiesCount: testCompanies?.length || 0
      },
      environment: {
        hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL),
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Not configured',
        hasServiceKey: !!(process.env.SUPABASE_SERVICE_ROLE_KEY),
        hasAnonKey: !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        isVercel: process.env.VERCEL === '1',
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Test endpoint error',
      databaseType: db?.constructor?.name || 'Unknown',
      databaseCheck: {
        canConnect: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      environment: {
        hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL),
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Not configured',
        hasServiceKey: !!(process.env.SUPABASE_SERVICE_ROLE_KEY),
        hasAnonKey: !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        isVercel: process.env.VERCEL === '1',
        nodeEnv: process.env.NODE_ENV
      }
    });
  }
}