import { NextRequest, NextResponse } from 'next/server';
import { openRouterClient } from '@/lib/ai/openrouter-client';

export async function GET(_request: NextRequest) {
  const results = {
    success: true,
    tests: {
      apiKeyLoaded: false,
      mockResponse: false,
      liveResponse: false
    },
    data: {} as any,
    errors: {} as any,
    env: {
      hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
      nodeEnv: process.env.NODE_ENV
    }
  };
  
  try {
    // Test 1: Check if API key is loaded
    results.tests.apiKeyLoaded = !!process.env.OPENROUTER_API_KEY;
    
    // Test 2: Get mock response
    try {
      const mockMessages = [
        { role: 'system' as const, content: 'You are a helpful assistant.' },
        { role: 'user' as const, content: 'Hello, this is a test.' }
      ];
      
      // Force mock by temporarily unsetting the API key
      const originalKey = process.env.OPENROUTER_API_KEY;
      process.env.OPENROUTER_API_KEY = '';
      
      const mockResponse = await openRouterClient.createChatCompletion(mockMessages);
      results.tests.mockResponse = true;
      results.data.mockResponse = mockResponse.substring(0, 100) + '...';
      
      // Restore API key
      process.env.OPENROUTER_API_KEY = originalKey;
    } catch (error) {
      results.errors.mockResponse = error instanceof Error ? error.message : 'Unknown error';
    }
    
    // Test 3: Get live response (if API key exists)
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const testMessages = [
          { role: 'system' as const, content: 'You are a helpful assistant. Respond with a single sentence.' },
          { role: 'user' as const, content: 'Say "AI test successful" if you can read this.' }
        ];
        
        const liveResponse = await openRouterClient.createChatCompletion(testMessages, {
          max_tokens: 50
        });
        results.tests.liveResponse = true;
        results.data.liveResponse = liveResponse;
      } catch (error) {
        results.errors.liveResponse = error instanceof Error ? error.message : 'Unknown error';
      }
    } else {
      results.data.liveResponse = 'Skipped - no API key';
    }
    
    return NextResponse.json(results);
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      results
    }, { status: 500 });
  }
}