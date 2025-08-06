import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export async function POST(request: NextRequest) {
  console.log('[CHAT-DEBUG] Starting request');
  
  try {
    // Test 1: Parse request body
    let body;
    try {
      body = await request.json();
      console.log('[CHAT-DEBUG] Request body:', JSON.stringify(body, null, 2));
    } catch (err) {
      console.error('[CHAT-DEBUG] Failed to parse body:', err);
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    
    // Test 2: Get company
    let company;
    try {
      company = getCompanyFromRequest(request);
      console.log('[CHAT-DEBUG] Company:', company);
    } catch (err) {
      console.error('[CHAT-DEBUG] Failed to get company:', err);
      return NextResponse.json({ error: 'Company authentication failed' }, { status: 401 });
    }
    
    // Test 3: Check environment
    const envCheck = {
      hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
      keyLength: process.env.OPENROUTER_API_KEY?.length || 0,
      nodeEnv: process.env.NODE_ENV
    };
    console.log('[CHAT-DEBUG] Environment:', envCheck);
    
    // Test 4: Try to import and use quote assistant
    try {
      const { quoteAssistant } = await import('@/lib/ai/quote-assistant');
      console.log('[CHAT-DEBUG] Quote assistant imported successfully');
      
      // Check if company exists before using it
      if (!company) {
        return NextResponse.json({ 
          error: 'No company data available',
          debug: { company: null, envCheck }
        }, { status: 401 });
      }
      
      // Simple test
      const testResponse = await quoteAssistant.processMessage(
        body.message || 'Hello',
        { companyId: company.id, projectType: 'interior' },
        []
      );
      
      console.log('[CHAT-DEBUG] Test response:', testResponse.substring(0, 100) + '...');
      
      return NextResponse.json({
        success: true,
        response: testResponse,
        debug: {
          company,
          envCheck,
          messageReceived: body.message
        }
      });
    } catch (err) {
      console.error('[CHAT-DEBUG] Quote assistant error:', err);
      console.error('[CHAT-DEBUG] Error type:', err?.constructor?.name);
      console.error('[CHAT-DEBUG] Error stack:', err instanceof Error ? err.stack : 'No stack');
      
      return NextResponse.json({
        error: 'Quote assistant failed',
        details: err instanceof Error ? err.message : String(err),
        type: err?.constructor?.name
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('[CHAT-DEBUG] Unexpected error:', error);
    return NextResponse.json({
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}