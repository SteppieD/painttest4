import { NextRequest, NextResponse } from 'next/server';
import { openRouterClient } from '@/lib/ai/openrouter-client';
import { quoteAssistant } from '@/lib/ai/quote-assistant';

export async function GET() {
  const hasApiKey = !!process.env.OPENROUTER_API_KEY;
  
  try {
    // Test basic completion
    const testResponse = await openRouterClient.createChatCompletion([
      { role: 'user', content: 'Say "Hello from OpenRouter!" if you can hear me.' }
    ], { max_tokens: 50 });

    // Test quote parsing
    const testParsing = await quoteAssistant.parseQuoteInformation(
      'I need a quote for John Smith at 123 Main St. Interior painting for 3 bedrooms.'
    );

    // Get available models
    const models = await openRouterClient.getAvailableModels();

    return NextResponse.json({
      status: 'ok',
      configured: hasApiKey,
      testResponse,
      testParsing,
      availableModels: models.slice(0, 5), // First 5 models
      message: hasApiKey 
        ? 'OpenRouter AI integration is working correctly' 
        : 'OpenRouter API key not configured - using mock responses'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      configured: hasApiKey,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to test OpenRouter integration'
    }, { status: 500 });
  }
}