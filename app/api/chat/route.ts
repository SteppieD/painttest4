import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import { QuoteCalculator, calculator } from '@/lib/calculators/quote-calculator';
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
    
    // Parse request body - always use AI
    const { message, sessionId } = await request.json();
    const useAI = true; // Always use AI mode
    
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
        
        // Get company rates from database
        const companyData = await db.getCompany(company.id);
        const companyRates = {
          paintingRate: companyData?.default_painting_rate || 2.50,
          primingRate: companyData?.default_priming_rate || 0.40,
          trimRate: companyData?.default_trim_rate || 1.92,
          doorRate: companyData?.default_door_rate || 100,
          windowRate: companyData?.default_window_rate || 25,
          overheadPercent: companyData?.overhead_percent || 15,
          profitMargin: companyData?.profit_margin || 30,
          hourlyRate: companyData?.default_hourly_rate || 45
        };
        
        // Get preferred paint products
        let paintProducts = [];
        try {
          paintProducts = await db.getAll(
            `SELECT * FROM paint_products 
             WHERE user_id = (SELECT id FROM users WHERE company_name = ?) 
             AND is_active = TRUE
             LIMIT 3`,
            [company.name]
          );
        } catch (err) {
          console.log('[CHAT] Paint products query failed:', err);
          // Continue without paint products
        }
        
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
          projectType: 'interior' // Default project type
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
              taxRate: companyData?.tax_rate || 0
            };
            
            const calculation = QuoteCalculator.calculate(calculatorInput);
            
            // Format the quote presentation
            response += '\n\n' + quoteAssistant.formatQuotePresentation(calculation);
            
            quoteData = {
              ...parsedInfo,
              pricing: calculation,
              sessionId: session
            };
          }
        } catch (aiError) {
          console.error('[CHAT] AI error:', aiError);
          throw aiError; // Let the error propagate to show proper error message
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
        
        if (result.isComplete) {
          // Process step-by-step data collection
          const data = manager.getCollectedData();
          const contactInfo = {
            email: data.customerEmail || '',
            phone: data.customerPhone || ''
          };
          
          // Get surfaces from collected data
          const surfaces = {
            walls: data.wallSqft || 0,
            ceilings: data.ceilingSqft || 0,
            trim: data.trimLinearFt || 0,
            doors: data.doors || 0,
            windows: data.windows || 0
          };
          
          const calculatorInput = {
            surfaces,
            paintQuality: data.paintQuality as any || 'better'
          };
          
          const calculation = QuoteCalculator.calculate(calculatorInput);
          
          quoteData = {
            customerName: data.customerName,
            customerEmail: contactInfo.email,
            customerPhone: contactInfo.phone,
            address: data.address,
            projectType: data.projectType,
            surfaces,
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
      console.error('[CHAT] Process error details:', {
        message: processError instanceof Error ? processError.message : 'Unknown error',
        stack: processError instanceof Error ? processError.stack : undefined,
        type: processError?.constructor?.name
      });
      
      // Include error details in response for debugging
      const errorDetails = processError instanceof Error ? processError.message : String(processError);
      
      // Check for specific OpenRouter errors
      if (errorDetails.includes('401') || errorDetails.includes('Unauthorized')) {
        response = "OpenRouter API key is invalid or not configured properly. Please check your API key in environment variables.";
      } else if (errorDetails.includes('402') || errorDetails.includes('insufficient_quota')) {
        response = "OpenRouter API quota exceeded. Please check your OpenRouter account credits.";
      } else if (errorDetails.includes('OpenRouter API key is required')) {
        response = "OpenRouter API key is missing. Please configure OPENROUTER_API_KEY in environment variables.";
      } else {
        response = `I apologize, but I'm having trouble processing your request. Error: ${errorDetails}. Let me help you create a quote step by step. What's the customer's name?`;
      }
      
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
    
    // Check if it's an API key error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('OpenRouter API key is required')) {
      return NextResponse.json({
        response: "OpenRouter API key is not configured. Please set OPENROUTER_API_KEY in your environment variables.",
        sessionId: `error-${Date.now()}`,
        suggestedReplies: [],
        isComplete: false,
        quoteData: null,
        error: {
          message: 'OpenRouter API key required',
          details: errorMessage
        }
      }, { status: 200 });
    }
    
    // Return user-friendly error with fallback response
    return NextResponse.json({
      response: "I apologize, but I'm experiencing issues with the AI service. Please ensure your OpenRouter API key is valid and has credits.",
      sessionId: `error-${Date.now()}`,
      suggestedReplies: ['Try again'],
      isComplete: false,
      quoteData: null,
      error: {
        message: 'AI service error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
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
      // Don't suggest specific names
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