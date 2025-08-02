import { NextRequest, NextResponse } from 'next/server';
import { quoteAssistant } from '@/lib/ai/quote-assistant';

export async function GET(_request: NextRequest) {
  try {
    // Test basic quote assistant functionality
    const testContext = {
      companyId: 1,
      companyRates: {
        paintingRate: 2.50,
        primingRate: 0.40,
        trimRate: 1.92,
        doorRate: 100,
        windowRate: 25,
        overheadPercent: 15,
        profitMargin: 30,
        hourlyRate: 45
      },
      preferredPaints: [{
        id: '1',
        name: 'Sherwin Williams ProClassic',
        coverageRate: 350,
        costPerGallon: 50
      }],
      projectType: 'interior' as const
    };

    const testMessage = "Hi, I need a quote for painting a room that's 12x14 feet with 9-foot ceilings.";
    
    console.log('[TestQuoteAssistant] Starting test with:', {
      hasApiKey: !!process.env.OPENROUTER_API_KEY,
      apiKeyLength: process.env.OPENROUTER_API_KEY?.length || 0,
      apiKeyPrefix: process.env.OPENROUTER_API_KEY?.substring(0, 10) + '...',
      nodeEnv: process.env.NODE_ENV
    });

    let response;
    let error: Error | unknown;
    
    try {
      response = await quoteAssistant.processMessage(
        testMessage,
        testContext,
        []
      );
    } catch (err) {
      error = err;
      console.error('[TestQuoteAssistant] Error:', err);
    }

    return NextResponse.json({
      test: 'quote-assistant',
      apiKeyStatus: {
        exists: !!process.env.OPENROUTER_API_KEY,
        length: process.env.OPENROUTER_API_KEY?.length || 0,
        prefix: process.env.OPENROUTER_API_KEY?.substring(0, 10) + '...'
      },
      testContext,
      testMessage,
      result: {
        success: !!response,
        response: response ? response.substring(0, 200) + '...' : null,
        error: error && error instanceof Error ? {
          message: error.message,
          stack: error.stack,
          type: error.constructor.name
        } : null
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}