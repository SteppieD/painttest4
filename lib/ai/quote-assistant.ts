import { openRouterClient, Message } from './openrouter-client';

export interface QuoteContext {
  companyId: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  projectType?: 'interior' | 'exterior';
  surfaces?: string[];
  rooms?: any[];
  paintQuality?: string;
  prepWork?: string;
  timeline?: string;
  specialRequests?: string;
  measurements?: {
    wallSqft?: number;
    ceilingSqft?: number;
    trimLinearFt?: number;
    doors?: number;
    windows?: number;
  };
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  metadata?: any;
}

export class QuoteAssistant {
  private model = 'anthropic/claude-3.5-sonnet';
  
  async processMessage(
    userMessage: string,
    context: QuoteContext,
    conversationHistory: ConversationMessage[] = []
  ): Promise<string> {
    const messages = this.buildMessages(userMessage, context, conversationHistory);
    
    try {
      const response = await openRouterClient.createChatCompletion(messages, {
        model: this.model,
        temperature: 0.7,
        max_tokens: 1500
      });
      
      return response;
    } catch (error) {
      console.error('Quote assistant error:', error);
      return "I apologize, but I'm having trouble processing your request. Could you please try again?";
    }
  }

  async parseQuoteInformation(
    conversationText: string
  ): Promise<Partial<QuoteContext>> {
    const messages: Message[] = [
      {
        role: 'system',
        content: `You are a quote parsing assistant. Extract painting quote information from the conversation and return it in JSON format. Include:
        - customerName
        - customerEmail  
        - customerPhone
        - address
        - projectType (interior/exterior)
        - surfaces (array of surfaces to paint)
        - rooms (array of room objects with name and dimensions)
        - measurements (object with wallSqft, ceilingSqft, etc.)
        - paintQuality
        - prepWork
        - timeline
        - specialRequests
        
        Only include fields that are explicitly mentioned. Return valid JSON.`
      },
      {
        role: 'user',
        content: conversationText
      }
    ];

    try {
      const response = await openRouterClient.createChatCompletion(messages, {
        model: this.model,
        temperature: 0.3,
        max_tokens: 1000
      });
      
      // Try to parse the JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {};
    } catch (error) {
      console.error('Error parsing quote information:', error);
      return {};
    }
  }

  async generateQuoteSummary(
    context: QuoteContext,
    pricing: any
  ): Promise<string> {
    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are a professional painting contractor assistant. Generate a clear, professional summary of the quote details.'
      },
      {
        role: 'user',
        content: `Generate a professional quote summary for:
        Customer: ${context.customerName}
        Address: ${context.address}
        Project Type: ${context.projectType}
        Surfaces: ${context.surfaces?.join(', ')}
        Total Price: $${pricing.total}
        
        Include a brief project description and key details.`
      }
    ];

    try {
      const response = await openRouterClient.createChatCompletion(messages, {
        model: this.model,
        temperature: 0.5,
        max_tokens: 500
      });
      
      return response;
    } catch (error) {
      console.error('Error generating quote summary:', error);
      return 'Professional painting services as discussed.';
    }
  }

  private buildMessages(
    userMessage: string,
    context: QuoteContext,
    conversationHistory: ConversationMessage[]
  ): Message[] {
    const messages: Message[] = [
      {
        role: 'system',
        content: `You are a helpful painting contractor assistant. You help create professional painting quotes by gathering necessary information in a conversational way.

Current context:
${context.customerName ? `Customer: ${context.customerName}` : ''}
${context.address ? `Address: ${context.address}` : ''}
${context.projectType ? `Project Type: ${context.projectType}` : ''}
${context.surfaces?.length ? `Surfaces: ${context.surfaces.join(', ')}` : ''}

Guide the conversation to gather:
1. Customer information (name, address, contact)
2. Project type (interior/exterior)
3. Surfaces to paint (walls, ceilings, trim, etc.)
4. Room dimensions or square footage
5. Paint quality preferences
6. Timeline
7. Special requirements

Be conversational and professional. Ask for missing information naturally.`
      }
    ];

    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });

    // Add current message
    messages.push({
      role: 'user',
      content: userMessage
    });

    return messages;
  }

  async detectConversationStage(
    conversationHistory: ConversationMessage[],
    context: QuoteContext
  ): Promise<string> {
    // Determine what information we still need
    const missingInfo = [];
    
    if (!context.customerName) missingInfo.push('customer name');
    if (!context.address) missingInfo.push('address');
    if (!context.projectType) missingInfo.push('project type');
    if (!context.surfaces || context.surfaces.length === 0) missingInfo.push('surfaces to paint');
    if (!context.measurements?.wallSqft && !context.rooms?.length) missingInfo.push('measurements');
    
    if (missingInfo.length === 0) {
      return 'ready_for_quote';
    } else if (missingInfo.length > 3) {
      return 'gathering_basic_info';
    } else {
      return 'gathering_details';
    }
  }
}

// Export singleton instance
export const quoteAssistant = new QuoteAssistant();