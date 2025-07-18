import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    // Simple test response without authentication
    return NextResponse.json({
      response: `Test response: I received your message "${message}". The chat system is working but authentication might be having issues.`,
      sessionId: 'test-session',
      suggestedReplies: ['Tell me more', 'Create a quote', 'Help'],
      isComplete: false,
      quoteData: null
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Test endpoint error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}