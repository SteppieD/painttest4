import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import { calculator } from '@/lib/calculators/quote-calculator';

// Store conversation managers per session
const sessions = new Map<string, ConversationManager>();

// Cleanup old sessions periodically
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [sessionId, manager] of Array.from(sessions.entries())) {
    const messages = manager.getMessages();
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.timestamp.getTime() < oneHourAgo) {
      sessions.delete(sessionId);
    }
  }
}, 10 * 60 * 1000); // Check every 10 minutes

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Get company with automatic fallback to demo
    const company = getCompanyFromRequest(request);
    console.log('[CHAT] Processing for company:', company);
    
    // Parse request body
    const { message, sessionId, useAI = true } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Get or create session
    const session = sessionId || `${company.id}-${Date.now()}`;
    let manager = sessions.get(session);
    
    if (!manager) {
      manager = new ConversationManager();
      sessions.set(session, manager);
    }
    
    let response: string;
    let isComplete = false;
    let quoteData = null;
    let suggestedReplies: string[] = [];
    
    try {
      if (useAI) {
        console.log('[CHAT] Using AI assistant');
        // Get all messages for context
        const allMessages = [
          ...manager.getMessages(),
          { role: 'user' as const, content: message }
        ];
        
        const conversationText = allMessages
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n');
        
        // Try to use AI, fall back to structured flow on error
        try {
          response = await quoteAssistant.processMessage(
            message,
            { companyId: company.id },
            allMessages
          );
          
          // Try to parse quote information
          const parsedInfo = await quoteAssistant.parseQuoteInformation(conversationText);
          
          // Check if we have enough information for a quote
          if (parsedInfo.customerName && parsedInfo.address && 
              (parsedInfo.measurements?.wallSqft || parsedInfo.rooms?.length)) {
            isComplete = true;
            
            // Calculate quote
            const calculatorInput = parsedInfo.rooms?.length 
              ? calculator.estimateFromRooms(parsedInfo.rooms, parsedInfo.paintQuality as any)
              : {
                  surfaces: {
                    walls: parsedInfo.measurements?.wallSqft,
                    ceilings: parsedInfo.measurements?.ceilingSqft,
                    trim: parsedInfo.measurements?.trimLinearFt,
                    doors: parsedInfo.measurements?.doors,
                    windows: parsedInfo.measurements?.windows
                  },
                  paintQuality: parsedInfo.paintQuality || 'better'
                };
            
            const calculation = calculator.calculate(calculatorInput as any);
            
            quoteData = {
              ...parsedInfo,
              pricing: calculation,
              sessionId: session
            };
          }
        } catch (aiError) {
          console.error('[CHAT] AI error, falling back to structured flow:', aiError);
          // Fall back to structured conversation
          const result = manager.processUserInput(message);
          response = result.response;
          isComplete = result.isComplete;
          quoteData = result.quoteData;
        }
      } else {
        console.log('[CHAT] Using structured flow');
        // Use structured conversation flow
        const result = manager.processUserInput(message);
        response = result.response;
        isComplete = result.isComplete;
        
        if (result.surfaces) {
          // Process step-by-step data collection
          const data = manager.getCollectedData();
          const contactInfo = {
            email: data.customerEmail || '',
            phone: data.customerPhone || ''
          };
          
          // Only calculate if we have surfaces
          const surfaces = result.surfaces || {};
          
          const calculatorInput = {
            surfaces,
            paintQuality: data.paintQuality as any || 'better'
          };
          
          const calculation = calculator.calculate(calculatorInput);
          
          quoteData = {
            customerName: data.customerName,
            customerEmail: contactInfo.email,
            customerPhone: contactInfo.phone,
            address: data.address,
            projectType: data.projectType,
            surfaces: data.surfaces,
            roomCount: data.roomCount,
            paintQuality: data.paintQuality,
            timeline: data.timeline,
            specialRequests: data.specialRequests,
            pricing: calculation,
            sessionId: session
          };
        }
      }
      
      // Get suggested replies
      suggestedReplies = getSuggestedReplies(manager);
      
    } catch (processError) {
      console.error('[CHAT] Process error:', processError);
      response = "I apologize, but I'm having trouble processing your request. Let me help you create a quote step by step. What's the customer's name?";
      
      // Reset conversation on error
      manager = new ConversationManager();
      sessions.set(session, manager);
    }
    
    // Track message
    if ((manager as any).addMessage) {
      (manager as any).addMessage({
        role: 'user',
        content: message,
        timestamp: new Date()
      });
      
      (manager as any).addMessage({
        role: 'assistant',
        content: response,
        timestamp: new Date()
      });
    }
    
    // Return response with metrics
    return NextResponse.json({
      response,
      sessionId: session,
      suggestedReplies,
      isComplete,
      quoteData,
      metrics: {
        processingTime: Date.now() - startTime,
        aiEnabled: useAI,
        sessionMessages: manager.getMessages().length
      }
    });
    
  } catch (error) {
    console.error('[CHAT] Fatal error:', error);
    console.error('[CHAT] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Return user-friendly error with fallback response
    return NextResponse.json({
      response: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or contact support if the issue persists.",
      sessionId: `error-${Date.now()}`,
      suggestedReplies: ['Try again', 'Contact support'],
      isComplete: false,
      quoteData: null,
      error: {
        message: 'Chat service temporarily unavailable',
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      }
    }, { status: 200 }); // Return 200 with error in body to prevent UI errors
  }
}

// Helper function to get suggested replies
function getSuggestedReplies(manager: ConversationManager): string[] {
  const state = manager.getState();
  
  if (state.isComplete) {
    return ['Create another quote', 'Edit this quote', 'Send to customer'];
  }
  
  const currentStep = state.currentStep;
  const suggestions = [];
  
  // Add contextual suggestions based on current step
  switch (currentStep) {
    case 'start':
      suggestions.push('John Smith', 'Jane Doe');
      break;
    case 'address':
      suggestions.push('123 Main St, City, ST 12345');
      break;
    case 'projectType':
      suggestions.push('Interior', 'Exterior', 'Both');
      break;
    case 'rooms':
      suggestions.push('3 bedrooms, 2 bathrooms', 'Whole house', 'Living room and kitchen');
      break;
    case 'paintQuality':
      suggestions.push('Good quality', 'Better quality', 'Best quality');
      break;
    default:
      suggestions.push('Continue', 'Skip this', 'Go back');
  }
  
  return suggestions;
}

// GET endpoint to retrieve conversation history
export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    const manager = sessions.get(sessionId);
    
    if (!manager) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      messages: manager.getMessages(),
      state: manager.getState(),
      sessionId
    });
    
  } catch (error) {
    console.error('Get conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve conversation' },
      { status: 500 }
    );
  }
}