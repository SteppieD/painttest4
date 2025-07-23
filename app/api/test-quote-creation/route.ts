import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { generateQuoteNumber } from '@/lib/quote-number-generator-adapter';

export async function POST(request: NextRequest) {
  try {
    // Test data for debugging
    const testQuoteData = {
      company_id: 1,
      quote_id: 'TEST-' + Date.now(),
      customer_name: 'Test Customer',
      customer_email: 'test@example.com',
      customer_phone: '555-1234',
      address: '123 Test St',
      project_type: 'interior',
      rooms: JSON.stringify(['Living Room']),
      paint_quality: 'standard',
      prep_work: 'minimal',
      timeline: '1 week',
      special_requests: null,
      walls_sqft: 500,
      ceilings_sqft: 0,
      trim_sqft: 0,
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
      total_revenue: 1000,
      total_materials: 200,
      paint_cost: 150,
      sundries_cost: 50,
      sundries_percentage: 12,
      projected_labor: 400,
      labor_percentage: 40,
      projected_profit: 400,
      paint_coverage: 350,
      tax_rate: 0,
      tax_amount: 0,
      subtotal: 1000,
      base_cost: 1000,
      markup_percentage: 30,
      final_price: 1000,
      room_data: JSON.stringify(['Living Room']),
      room_count: 1,
      confirmed_rates: JSON.stringify({}),
      status: 'pending',
      conversation_summary: JSON.stringify([{ message: 'Test quote' }])
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
      errorInfo['supabaseError'] = {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      };
    }

    return NextResponse.json(errorInfo, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Test endpoint ready',
    databaseType: db?.constructor?.name,
    environment: {
      hasSupabase: !!(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Not configured',
      isVercel: process.env.VERCEL === '1',
      nodeEnv: process.env.NODE_ENV
    }
  });
}