/**
 * Enhanced Quote Assistant with Settings Integration
 * 
 * This version of the quote assistant integrates with the comprehensive
 * settings system to provide accurate, company-specific quotes and recommendations.
 */

import { openRouterClient, Message } from './openrouter-client';
import { EnhancedQuoteCalculator, EnhancedCalculatorInput } from '../calculators/enhanced-quote-calculator';
import { SettingsIntegrationService } from '../services/settings-integration-service';
import { 
  getAIContextString,
  calculateQuoteWithSettings,
  validateQuoteInput
} from '../helpers/settings-helpers';

export interface EnhancedQuoteContext {
  companyId: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  projectType?: 'interior' | 'exterior' | 'commercial' | 'residential';
  surfaces?: string[];
  rooms?: unknown[];
  paintQuality?: 'economy' | 'standard' | 'premium' | 'luxury';
  prepWork?: 'none' | 'light' | 'moderate' | 'heavy' | 'extreme';
  complexity?: 'simple' | 'standard' | 'detailed' | 'highDetail' | 'custom';
  ceilingHeight?: 'standard' | 'high' | 'veryHigh' | 'cathedral';
  locationType?: 'urban' | 'suburban' | 'rural';
  timeline?: string;
  specialRequests?: string;
  isRushJob?: boolean;
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
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

export class EnhancedQuoteAssistant {
  private model = 'anthropic/claude-3.5-sonnet-20241022';  // Latest Claude 3.5 Sonnet
  
  async processMessage(
    userMessage: string,
    context: EnhancedQuoteContext,
    conversationHistory: ConversationMessage[] = []
  ): Promise<string> {
    // Input validation
    if (!userMessage || typeof userMessage !== 'string') {
      throw new Error('Invalid user message');
    }
    
    if (userMessage.length > 10000) {
      throw new Error('Message too long. Please keep messages under 10,000 characters.');
    }
    
    // Validate conversation history
    if (conversationHistory.length > 100) {
      console.warn('[ENHANCED-QUOTE-ASSISTANT] Conversation history too long, limiting to last 50 messages');
      conversationHistory = conversationHistory.slice(-50);
    }
    
    console.log('[ENHANCED-QUOTE-ASSISTANT] Processing message with enhanced context:', {
      companyId: context.companyId,
      contextKeys: Object.keys(context),
      historyLength: conversationHistory.length,
      userMessage: userMessage.substring(0, 50) + '...'
    });
    
    const messages = await this.buildEnhancedMessages(userMessage, context, conversationHistory);
    
    try {
      console.log('[ENHANCED-QUOTE-ASSISTANT] Calling OpenRouter with', messages.length, 'messages');
      const response = await openRouterClient.createChatCompletion(messages, {
        model: this.model,
        temperature: 0.3,
        max_tokens: 4000
      });
      
      console.log('[ENHANCED-QUOTE-ASSISTANT] Response received successfully');
      return response;
    } catch (error) {
      console.error('[ENHANCED-QUOTE-ASSISTANT] Error calling OpenRouter:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse quote information from conversation with enhanced validation
   */
  async parseQuoteInformation(conversation: string, companyId: number): Promise<any> {
    console.log('[ENHANCED-QUOTE-ASSISTANT] Parsing quote information with company validation');
    
    // Get company settings for validation
    const settings = await SettingsIntegrationService.getCompanySettings(companyId);
    
    const parseMessages: Message[] = [
      {
        role: 'system',
        content: `You are a quote information parser. Extract structured quote data from the conversation.

COMPANY SETTINGS CONTEXT:
${await getAIContextString(companyId)}

Extract the following information and return as JSON:
{
  "customerName": "string",
  "customerEmail": "string (optional)",
  "customerPhone": "string (optional)",
  "address": "string (optional)",
  "projectType": "interior|exterior|commercial|residential",
  "surfaces": ["walls", "ceilings", "trim", "doors", "windows"],
  "measurements": {
    "wallSqft": number,
    "ceilingSqft": number,
    "trimLinearFt": number,
    "doors": number,
    "windows": number
  },
  "paintProducts": {
    "walls": "string",
    "ceiling": "string", 
    "trim": "string",
    "primer": "string"
  },
  "projectDetails": {
    "paintQuality": "economy|standard|premium|luxury",
    "prepCondition": "good|minor|major",
    "complexity": "simple|standard|detailed|highDetail|custom",
    "ceilingHeight": "standard|high|veryHigh|cathedral",
    "locationType": "urban|suburban|rural",
    "rushJob": boolean
  },
  "specialRequests": "string",
  "timeline": "string",
  "pricing": {
    "materials": number,
    "labor": number,
    "total": number,
    "adjustments": {
      "seasonal": number,
      "location": number,
      "prep": number,
      "complexity": number
    }
  }
}

Use the company's paint products when available. Apply appropriate quality levels and adjustments based on the conversation context.`
      },
      {
        role: 'user',
        content: `Parse this conversation and extract quote information:\n\n${conversation}`
      }
    ];

    try {
      const response = await openRouterClient.createChatCompletion(parseMessages, {
        model: this.model,
        temperature: 0.1,
        max_tokens: 2000
      });

      const parsed = JSON.parse(response);
      
      // Validate the parsed data against company settings
      const validation = await validateQuoteInput(companyId, parsed);
      if (!validation.isValid) {
        console.warn('[ENHANCED-QUOTE-ASSISTANT] Validation warnings:', validation.warnings);
      }
      
      return parsed;
    } catch (error) {
      console.error('[ENHANCED-QUOTE-ASSISTANT] Error parsing quote information:', error);
      return null;
    }
  }

  /**
   * Generate a complete quote using the enhanced calculator
   */
  async generateEnhancedQuote(
    context: EnhancedQuoteContext,
    conversation: string
  ): Promise<any> {
    console.log('[ENHANCED-QUOTE-ASSISTANT] Generating enhanced quote for company:', context.companyId);
    
    try {
      // Parse the conversation to get structured data
      const parsedData = await this.parseQuoteInformation(conversation, context.companyId);
      
      if (!parsedData) {
        throw new Error('Could not parse quote information from conversation');
      }
      
      // Build enhanced calculator input
      const calculatorInput: EnhancedCalculatorInput = {
        companyId: context.companyId,
        surfaces: parsedData.measurements || {},
        paintProducts: parsedData.paintProducts,
        projectDetails: {
          paintQuality: parsedData.projectDetails?.paintQuality || context.paintQuality || 'standard',
          prepCondition: this.mapPrepCondition(parsedData.projectDetails?.prepCondition || context.prepWork),
          rushJob: parsedData.projectDetails?.rushJob || context.isRushJob || false,
          locationType: parsedData.projectDetails?.locationType || context.locationType || 'suburban',
          complexity: parsedData.projectDetails?.complexity || context.complexity || 'standard',
          ceilingHeight: parsedData.projectDetails?.ceilingHeight || context.ceilingHeight || 'standard'
        }
      };
      
      // Calculate the quote
      const quote = await EnhancedQuoteCalculator.calculate(calculatorInput);
      
      // Enhance the quote with conversation data
      const enhancedQuote = {
        ...quote,
        customer: {
          name: parsedData.customerName || context.customerName,
          email: parsedData.customerEmail || context.customerEmail,
          phone: parsedData.customerPhone || context.customerPhone,
          address: parsedData.address || context.address
        },
        project: {
          type: parsedData.projectType || context.projectType,
          surfaces: parsedData.surfaces || context.surfaces,
          specialRequests: parsedData.specialRequests || context.specialRequests,
          timeline: parsedData.timeline || context.timeline
        },
        metadata: {
          calculatedAt: new Date().toISOString(),
          companyId: context.companyId,
          usedEnhancedCalculator: true,
          settingsVersion: quote.usedSettings
        }
      };
      
      console.log('[ENHANCED-QUOTE-ASSISTANT] Enhanced quote generated successfully:', {
        total: quote.total,
        adjustments: quote.adjustmentsSummary.totalMultiplier
      });
      
      return enhancedQuote;
    } catch (error) {
      console.error('[ENHANCED-QUOTE-ASSISTANT] Error generating enhanced quote:', error);
      throw error;
    }
  }

  /**
   * Check if the conversation contains enough information for a quote
   */
  hasMinimumQuoteInformation(context: EnhancedQuoteContext, conversationHistory: ConversationMessage[]): boolean {
    const conversation = conversationHistory.map(m => m.content).join(' ').toLowerCase();
    
    // Check for customer name
    const hasCustomer = !!(context.customerName || 
      conversation.includes('name') || 
      conversation.includes('customer'));
    
    // Check for measurements
    const hasMeasurements = !!(
      context.measurements?.wallSqft ||
      context.measurements?.linearFeetWalls ||
      conversation.includes('sqft') ||
      conversation.includes('square') ||
      conversation.includes('feet') ||
      conversation.includes('room') ||
      conversation.includes('wall')
    );
    
    return hasCustomer && hasMeasurements;
  }

  /**
   * Check if user is ready to review the quote
   */
  isReadyToReview(message: string): boolean {
    const reviewKeywords = [
      'ready', 'review', 'calculate', 'quote', 'estimate', 'price', 'cost',
      'total', 'done', 'finished', 'complete', 'show me', 'generate',
      'how much', 'what would', 'final'
    ];
    
    const lowerMessage = message.toLowerCase();
    return reviewKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  /**
   * Check if the AI response contains a complete quote
   */
  isQuoteComplete(response: string): boolean {
    const response_lower = response.toLowerCase();
    const hasPrice = /\$[\d,]+/.test(response);
    const hasTotal = response_lower.includes('total') || response_lower.includes('price');
    const hasBreakdown = response_lower.includes('materials') || response_lower.includes('labor');
    
    return hasPrice && (hasTotal || hasBreakdown);
  }

  // Private helper methods

  private async buildEnhancedMessages(
    userMessage: string,
    context: EnhancedQuoteContext,
    conversationHistory: ConversationMessage[]
  ): Promise<Message[]> {
    // Get comprehensive AI context
    const settingsContext = await getAIContextString(context.companyId);
    
    const systemPrompt = `You are a professional painting contractor's AI assistant with access to comprehensive company settings and advanced pricing capabilities.

${settingsContext}

ENHANCED CAPABILITIES:
- Real-time pricing with seasonal adjustments
- Location-based pricing (urban/suburban/rural: ${context.locationType || 'suburban'})
- Quality-based product selection (economy/standard/premium/luxury)
- Prep work assessment (none/light/moderate/heavy/extreme)
- Complexity adjustments (simple/standard/detailed/highDetail/custom)
- Height considerations (standard/high/veryHigh/cathedral)
- Rush job surcharges

CURRENT PROJECT CONTEXT:
- Project Type: ${context.projectType || 'Not specified'}
- Location Type: ${context.locationType || 'suburban'}
- Paint Quality: ${context.paintQuality || 'standard'}
- Prep Work: ${context.prepWork || 'light'}
- Complexity: ${context.complexity || 'standard'}
- Ceiling Height: ${context.ceilingHeight || 'standard'}
- Rush Job: ${context.isRushJob ? 'Yes' : 'No'}

CUSTOMER INFO:
- Name: ${context.customerName || 'Not provided'}
- Email: ${context.customerEmail || 'Not provided'}
- Phone: ${context.customerPhone || 'Not provided'}
- Address: ${context.address || 'Not provided'}

MEASUREMENTS:
- Wall Sq Ft: ${context.measurements?.wallSqft || 'Not provided'}
- Ceiling Sq Ft: ${context.measurements?.ceilingSqft || 'Not provided'}
- Trim Linear Ft: ${context.measurements?.trimLinearFt || 'Not provided'}
- Doors: ${context.measurements?.doors || 'Not provided'}
- Windows: ${context.measurements?.windows || 'Not provided'}

INSTRUCTIONS:
1. Use ALL company settings for accurate pricing
2. Apply appropriate adjustments based on project details
3. Recommend suitable paint products from company inventory
4. Provide detailed breakdowns when calculating quotes
5. Consider seasonal pricing and location adjustments
6. Ask for missing information in a friendly, professional manner
7. Explain pricing adjustments transparently
8. Always check minimum job requirements

When ready to generate a quote, use the enhanced calculator with all available settings and adjustments.`;

    const messages: Message[] = [
      { role: 'system', content: systemPrompt }
    ];

    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    });

    // Add current user message
    messages.push({ role: 'user', content: userMessage });

    return messages;
  }

  private mapPrepCondition(condition?: string): 'good' | 'minor' | 'major' {
    switch (condition) {
      case 'none':
      case 'light': return 'good';
      case 'moderate': return 'minor';
      case 'heavy':
      case 'extreme': return 'major';
      default: return 'good';
    }
  }
}

// Export singleton instance
export const enhancedQuoteAssistant = new EnhancedQuoteAssistant();