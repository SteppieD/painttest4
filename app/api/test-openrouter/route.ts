import { NextRequest, NextResponse } from 'next/server';
import { openRouterClient } from '@/lib/ai/openrouter-client';

export async function GET(request: NextRequest) {
  try {
    // Check if API key exists
    const hasApiKey = !!process.env.OPENROUTER_API_KEY;
    const apiKeyLength = process.env.OPENROUTER_API_KEY?.length || 0;
    const apiKeyPrefix = process.env.OPENROUTER_API_KEY?.substring(0, 10) || 'not-set';
    
    // Try to get available models first
    let availableModels = [];
    let modelsError = null;
    try {
      availableModels = await openRouterClient.getAvailableModels();
    } catch (error) {
      modelsError = error instanceof Error ? error.message : String(error);
    }
    
    // Try different model names to find the correct one
    const modelTests = [
      'anthropic/claude-3.5-sonnet',
      'anthropic/claude-3.5-sonnet-20241022',
      'anthropic/claude-sonnet-4',
      'anthropic/claude-3-5-sonnet-20241022',
      'claude-3.5-sonnet'
    ];
    
    let workingModel = null;
    let testResults = {};
    
    for (const model of modelTests) {
      try {
        const response = await openRouterClient.createChatCompletion([
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Say "OK" and nothing else.' }
        ], {
          model: model,
          max_tokens: 10
        });
        testResults[model] = { success: true, response: response };
        if (!workingModel) workingModel = model;
      } catch (error) {
        testResults[model] = { 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        };
      }
    }
    
    return NextResponse.json({
      status: 'Test complete',
      apiKey: {
        exists: hasApiKey,
        length: apiKeyLength,
        prefix: apiKeyPrefix,
        isPlaceholder: process.env.OPENROUTER_API_KEY === 'your_openrouter_key'
      },
      models: {
        available: availableModels.slice(0, 20), // First 20 models
        error: modelsError,
        anthropicModels: availableModels.filter((m: any) => 
          m.id && m.id.toLowerCase().includes('claude')
        )
      },
      modelTests: testResults,
      workingModel: workingModel,
      recommendation: workingModel ? 
        `Use model: ${workingModel}` : 
        'No working model found - check API key and credits',
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