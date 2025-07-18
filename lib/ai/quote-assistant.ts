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
    linearFeetWalls?: number;
    ceilingHeight?: number;
    roomLength?: number;
    roomWidth?: number;
  };
  paintProducts?: {
    walls?: string;
    ceiling?: string;
    trim?: string;
    primer?: string;
  };
  prepCondition?: 'good' | 'minor' | 'major';
  rushJob?: boolean;
  companyRates?: {
    paintingRate?: number;
    primingRate?: number;
    trimRate?: number;
    doorRate?: number;
    windowRate?: number;
    overheadPercent?: number;
    profitMargin?: number;
    hourlyRate?: number;
  };
  preferredPaints?: Array<{
    id: string;
    name: string;
    coverageRate: number;
    costPerGallon: number;
  }>;
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
        content: `You are a professional painting quote assistant designed to help contractors generate accurate quotes in under 2 minutes while on-site. Your goal is to gather essential measurements and project details through a conversational flow, then calculate a complete quote using the contractor's pre-configured rates and preferences.

## CONTRACTOR'S RATES:
${context.companyRates ? `
- Painting Rate: $${context.companyRates.paintingRate}/sqft
- Priming Rate: $${context.companyRates.primingRate}/sqft
- Trim Rate: $${context.companyRates.trimRate}/linear ft
- Door Rate: $${context.companyRates.doorRate}/door
- Window Rate: $${context.companyRates.windowRate}/window
- Overhead: ${context.companyRates.overheadPercent}%
- Profit Margin: ${context.companyRates.profitMargin}%
- Hourly Rate: $${context.companyRates.hourlyRate}/hour
` : ''}

## PREFERRED PAINTS:
${context.preferredPaints?.map(paint => `- ${paint.name}: ${paint.coverageRate} sqft/gallon at $${paint.costPerGallon}/gallon`).join('\n') || 'No preferred paints configured'}

## CURRENT CONTEXT:
Project Type: ${context.projectType || 'Not specified'}
Customer: ${context.customerName || 'Not specified'}
Address: ${context.address || 'Not specified'}
${context.surfaces?.length ? `Surfaces: ${context.surfaces.join(', ')}` : ''}
${context.measurements ? `
Measurements collected:
${context.measurements.linearFeetWalls ? `- Linear feet of walls: ${context.measurements.linearFeetWalls}` : ''}
${context.measurements.ceilingHeight ? `- Ceiling height: ${context.measurements.ceilingHeight}ft` : ''}
${context.measurements.wallSqft ? `- Wall sqft: ${context.measurements.wallSqft}` : ''}
${context.measurements.ceilingSqft ? `- Ceiling sqft: ${context.measurements.ceilingSqft}` : ''}
${context.measurements.doors ? `- Doors: ${context.measurements.doors}` : ''}
${context.measurements.windows ? `- Windows: ${context.measurements.windows}` : ''}
` : ''}

## CONVERSATION STRATEGY:
ALWAYS start with the biggest cost drivers first, then get progressively more specific. Keep questions simple and assume the contractor is standing in the space.

## YOUR GOALS:
1. Complete accurate quote in under 2 minutes
2. Maximum 10-12 total questions
3. Use contractor's pre-set rates
4. Offer preferred paint options first
5. Calculate materials and labor automatically
6. Present clear, professional quote breakdown

## CONVERSATION FLOW:
1. Opening (10 seconds) - Identify space type
2. Room Dimensions (30 seconds) - Get measurements
3. Surfaces & Scope (45 seconds) - What to paint
4. Paint Selection (20 seconds) - Which products
5. Condition Assessment (15 seconds) - Prep work needed
6. Timeline (10 seconds) - When to complete

For single rooms, ask for:
- Linear feet of walls around perimeter
- Ceiling height (8ft, 9ft, 10ft+, vaulted)
- Room length and width for ceiling

For whole house, ask for:
- Number of rooms
- Approximate square footage

Keep responses under 2 sentences when possible. Be conversational but efficient.`
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
    // Follow the structured flow from research
    if (!context.projectType || !context.rooms?.length) {
      return 'opening'; // Step 1: Identify space type
    }
    
    if (!context.measurements?.linearFeetWalls || !context.measurements?.ceilingHeight) {
      return 'dimensions'; // Step 2: Get measurements
    }
    
    if (!context.surfaces || context.surfaces.length === 0) {
      return 'surfaces'; // Step 3: What to paint
    }
    
    if (!context.paintProducts?.walls) {
      return 'paint_selection'; // Step 4: Choose paint
    }
    
    if (!context.prepCondition) {
      return 'condition'; // Step 5: Assess prep work
    }
    
    if (!context.timeline) {
      return 'timeline'; // Step 6: When to complete
    }
    
    return 'ready_for_quote';
  }
  
  getSuggestedReplies(stage: string, context: QuoteContext): string[] {
    switch (stage) {
      case 'opening':
        return ['Living room', 'Bedroom', 'Kitchen', 'Bathroom', 'Whole house', 'Office'];
      
      case 'dimensions':
        return ['Standard 8ft ceiling', '9ft ceiling', '10ft+ ceiling', 'Vaulted ceiling'];
      
      case 'surfaces':
        return ['Walls only', 'Walls + ceiling', 'Include trim and doors', 'Everything'];
      
      case 'paint_selection':
        return context.preferredPaints?.map(p => p.name) || ['Premium paint', 'Standard paint', 'Budget paint'];
      
      case 'condition':
        return ['Good shape', 'Minor touch-ups needed', 'Major prep work needed'];
      
      case 'timeline':
        return ['This week', 'Next week', 'Within a month', 'Flexible'];
      
      default:
        return [];
    }
  }

  formatQuotePresentation(quoteData: any): string {
    const { materials, labor, total, timeline, breakdown } = quoteData;
    
    return `Here's your quote breakdown:

**MATERIALS:** $${materials.total.toFixed(2)}
${breakdown.primer ? `- Primer: ${breakdown.primer.gallons} gallons ${breakdown.primer.product} ($${breakdown.primer.cost.toFixed(2)})` : ''}
${breakdown.wallPaint ? `- Wall Paint: ${breakdown.wallPaint.gallons} gallons ${breakdown.wallPaint.product} ($${breakdown.wallPaint.cost.toFixed(2)})` : ''}
${breakdown.ceilingPaint ? `- Ceiling Paint: ${breakdown.ceilingPaint.gallons} gallons ${breakdown.ceilingPaint.product} ($${breakdown.ceilingPaint.cost.toFixed(2)})` : ''}
${breakdown.supplies ? `- Supplies: $${breakdown.supplies.toFixed(2)}` : ''}

**LABOR:** $${labor.total.toFixed(2)}
${breakdown.prepWork ? `- Prep work: ${breakdown.prepWork.hours} hours ($${breakdown.prepWork.cost.toFixed(2)})` : ''}
- Painting: ${breakdown.painting.hours} hours ($${breakdown.painting.cost.toFixed(2)})

**TOTAL PROJECT:** $${total.toFixed(2)}
*Includes overhead and profit margin*

**Timeline:** ${timeline}

Would you like me to adjust anything or send this quote to your client?`;
  }
}

// Export singleton instance
export const quoteAssistant = new QuoteAssistant();