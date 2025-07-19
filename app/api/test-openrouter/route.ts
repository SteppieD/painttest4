import { NextRequest, NextResponse } from 'next/server';
import { openRouterClient } from '@/lib/ai/openrouter-client';

export async function GET(request: NextRequest) {
  try {
    // Check if API key exists
    const hasApiKey = !!process.env.OPENROUTER_API_KEY;
    const apiKeyLength = process.env.OPENROUTER_API_KEY?.length || 0;
    const apiKeyPrefix = process.env.OPENROUTER_API_KEY?.substring(0, 10) || 'not-set';
    
    // Try to make a simple API call
    let testResult = 'Not tested';
    let testError = null;
    
    try {
      const response = await openRouterClient.createChatCompletion([
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say "API connection successful" and nothing else.' }
      ], {
        model: 'anthropic/claude-sonnet-4',
        max_tokens: 50
      });
      testResult = response || 'Empty response';
    } catch (error) {
      testError = error instanceof Error ? error.message : String(error);
      testResult = 'Failed';
    }
    
    return NextResponse.json({
      status: 'Test complete',
      apiKey: {
        exists: hasApiKey,
        length: apiKeyLength,
        prefix: apiKeyPrefix,
        isPlaceholder: process.env.OPENROUTER_API_KEY === 'your_openrouter_key'
      },
      model: 'anthropic/claude-sonnet-4',
      testCall: {
        result: testResult,
        error: testError
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV
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