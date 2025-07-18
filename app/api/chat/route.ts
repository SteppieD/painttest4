import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import { calculator } from '@/lib/calculators/quote-calculator';

// Store conversation managers per session
const sessions = new Map<string, ConversationManager>();

// Cleanup old sessions after 1 hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [sessionId, manager] of sessions.entries()) {
    const messages = manager.getMessages();
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.timestamp.getTime() < oneHourAgo) {
      sessions.delete(sessionId);
    }
  }
}, 10 * 60 * 1000); // Check every 10 minutes

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, sessionId, useAI = true } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get or create session
    const session = sessionId || `${auth.company!.id}-${Date.now()}`;
    let manager = sessions.get(session);
    
    if (!manager) {
      manager = new ConversationManager();
      sessions.set(session, manager);
    }

    let response: string;
    let isComplete = false;
    let quoteData = null;

    if (useAI) {
      // Use AI assistant for natural conversation
      const context = {
        companyId: auth.company!.id,
        ...manager.getCollectedData()
      };

      const conversationHistory = manager.getMessages().map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const aiResponse = await quoteAssistant.processMessage(
        message,
        context,
        conversationHistory
      );

      response = aiResponse;

      // Try to parse information from the conversation
      const allMessages = [...conversationHistory, 
        { role: 'user' as const, content: message },
        { role: 'assistant' as const, content: response }
      ];
      
      const conversationText = allMessages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      
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

        const calculation = calculator.calculate(calculatorInput);
        
        quoteData = {
          ...parsedInfo,
          pricing: calculation,
          sessionId: session
        };
      }
    } else {
      // Use structured conversation flow
      const result = manager.processUserInput(message);
      response = result.response;
      isComplete = result.isComplete;
      
      if (isComplete) {
        const data = manager.getCollectedData();
        const contactInfo = manager.parseContactInfo(data);
        
        // Build quote data
        const surfaces: any = {};
        if (data.projectType === 'interior') {
          // Estimate based on room count if no specific dimensions
          const roomCount = data.roomCount || 1;
          surfaces.walls = roomCount * 400; // Average room walls
          surfaces.ceilings = data.surfaces?.includes('ceilings') ? roomCount * 150 : 0;
          surfaces.trim = data.surfaces?.includes('trim') ? roomCount * 60 : 0;
          surfaces.doors = data.surfaces?.includes('doors') ? roomCount * 2 : 0;
          surfaces.windows = data.surfaces?.includes('windows') ? roomCount * 2 : 0;
        } else {
          surfaces.walls = data.sqft || 1000;
        }
        
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

    // Store messages
    manager.getMessages().push(
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: response, timestamp: new Date() }
    );

    return NextResponse.json({
      response,
      sessionId: session,
      isComplete,
      quoteData,
      suggestedReplies: getSuggestedReplies(manager)
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve conversation history
export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ messages: [] });
    }

    const manager = sessions.get(sessionId);
    if (!manager) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({
      messages: manager.getMessages(),
      isComplete: manager.isComplete(),
      collectedData: manager.getCollectedData()
    });

  } catch (error) {
    console.error('Get chat history error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve chat history' },
      { status: 500 }
    );
  }
}

function getSuggestedReplies(manager: ConversationManager): string[] {
  const currentStep = manager.getCurrentStep();
  
  if (!currentStep) return [];
  
  switch (currentStep.type) {
    case 'select':
      return currentStep.options || [];
    case 'multiselect':
      return ['All surfaces', ...(currentStep.options || [])];
    case 'number':
      if (currentStep.field === 'roomCount') {
        return ['1 room', '2-3 rooms', '4-5 rooms', 'Whole house'];
      }
      return [];
    default:
      return [];
  }
}