import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { db } from '@/lib/database/adapter';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, context, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Add company ID to context
    const enhancedContext = {
      ...context,
      companyId: auth.company!.id
    };

    // Process the message
    const response = await quoteAssistant.processMessage(
      message,
      enhancedContext,
      conversationHistory || []
    );

    // Detect conversation stage
    const stage = await quoteAssistant.detectConversationStage(
      conversationHistory || [],
      enhancedContext
    );

    // Try to parse any new information from the conversation
    const allMessages = [
      ...(conversationHistory || []),
      { role: 'user', content: message },
      { role: 'assistant', content: response }
    ];
    
    const conversationText = allMessages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    
    const parsedInfo = await quoteAssistant.parseQuoteInformation(conversationText);

    return NextResponse.json({
      response,
      stage,
      parsedContext: {
        ...enhancedContext,
        ...parsedInfo
      }
    });

  } catch (error) {
    console.error('Quote assistant error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// GET endpoint to check API status
export async function GET() {
  const hasApiKey = !!process.env.OPENROUTER_API_KEY;
  
  return NextResponse.json({
    status: 'ok',
    configured: hasApiKey,
    model: 'anthropic/claude-3.5-sonnet',
    message: hasApiKey 
      ? 'OpenRouter AI assistant is configured and ready' 
      : 'OpenRouter API key not configured - using mock responses'
  });
}