import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import { calculator } from '@/lib/calculators/quote-calculator';
import { db } from '@/lib/database/adapter';

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
        console.log('[CHAT] Using AI assistant with enhanced context');
        
        // Get company rates and preferred paints
        const companyRates = {
          paintingRate: company.defaultPaintingRate || 2.50,
          primingRate: company.defaultPrimingRate || 0.40,
          trimRate: company.defaultTrimRate || 1.92,
          doorRate: company.defaultDoorRate || 100,
          windowRate: company.defaultWindowRate || 25,
          overheadPercent: company.overheadPercent || 15,
          profitMargin: company.profitMargin || 30,
          hourlyRate: company.defaultHourlyRate || 45
        };
        
        // Get preferred paint products
        const paintProducts = await db.getAll(
          `SELECT * FROM paint_products 
           WHERE user_id = (SELECT id FROM users WHERE company_name = ?) 
           AND is_preferred = TRUE AND is_active = TRUE
           LIMIT 3`,
          [company.name]
        );
        
        const preferredPaints = paintProducts?.map(p => ({
          id: p.id,
          name: p.product_name,
          coverageRate: p.coverage_rate || 350,
          costPerGallon: p.cost_per_gallon
        })) || [];
        
        // Get all messages for context
        const allMessages = [
          ...manager.getMessages(),
          { role: 'user' as const, content: message, timestamp: new Date() }
        ];
        
        const conversationText = allMessages
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n');
        
        // Build enhanced context
        const context = {
          companyId: company.id,
          companyRates,
          preferredPaints,
          projectType: company.projectType || 'interior'
        };
        
        // Detect conversation stage
        const stage = await quoteAssistant.detectConversationStage(allMessages, context);
        suggestedReplies = quoteAssistant.getSuggestedReplies(stage, context);
        
        // Try to use AI, fall back to structured flow on error
        try {
          response = await quoteAssistant.processMessage(
            message,
            context,
            allMessages
          );
          
          // Try to parse quote information
          const parsedInfo = await quoteAssistant.parseQuoteInformation(conversationText);
          
          // Check if we have enough information for a quote
          if (parsedInfo.customerName && parsedInfo.address && 
              (parsedInfo.measurements?.wallSqft || parsedInfo.rooms?.length)) {
            isComplete = true;
            
            // Parse measurements if in text form
            const measurements = manager.parseMeasurements(conversationText);
            
            // Calculate quote with enhanced data
            const calculatorInput = {
              surfaces: {
                walls: measurements.wallSqft || parsedInfo.measurements?.wallSqft,
                ceilings: measurements.ceilingSqft || parsedInfo.measurements?.ceilingSqft,
                trim: parsedInfo.measurements?.trimLinearFt,
                doors: parsedInfo.measurements?.doors,
                windows: parsedInfo.measurements?.windows,
                priming: parsedInfo.prepWork === 'major' ? measurements.wallSqft : 0
              },
              paintProducts: parsedInfo.paintProducts,
              companyRates,
              prepCondition: parsedInfo.prepWork as any || 'good',
              rushJob: parsedInfo.timeline === 'this week',
              taxRate: company.taxRate || 0
            };
            
            const calculation = calculator.calculate(calculatorInput);
            
            // Format the quote presentation
            response += '\n\n' + quoteAssistant.formatQuotePresentation(calculation);
            
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
        
        // Get suggested replies based on current step
        const currentStep = manager.getCurrentStep();
        if (currentStep?.options) {
          suggestedReplies = currentStep.options;
        }
        
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