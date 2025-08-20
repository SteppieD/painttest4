import { openRouterClient, Message } from './openrouter-client';
import { QuoteCalculatorV2, CalculatorInputV2, CalculatorOutputV2 } from '../calculators/quote-calculator-v2';
import { PricingConfigManager, CompanyPricingConfig } from '../config/pricing-config';

export interface QuoteContext {
  companyId: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  address?: string;
  projectType?: 'interior' | 'exterior';
  surfaces?: string[];
  rooms?: unknown[];
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
    ceilingRate?: number;
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
  metadata?: Record<string, unknown>;
}

export class QuoteAssistant {
  // Use the exact model ID that worked in the test
  private model = 'anthropic/claude-sonnet-4';
  
  async processMessage(
    userMessage: string,
    context: QuoteContext,
    conversationHistory: ConversationMessage[] = []
  ): Promise<string> {
    // Input validation to prevent security issues
    if (!userMessage || typeof userMessage !== 'string') {
      throw new Error('Invalid user message');
    }
    
    // Prevent excessively long messages that could cause DoS
    if (userMessage.length > 10000) {
      throw new Error('Message too long. Please keep messages under 10,000 characters.');
    }
    
    // Validate conversation history
    if (conversationHistory.length > 100) {
      console.warn('[SECURITY] Conversation history too long, limiting to last 50 messages');
      conversationHistory = conversationHistory.slice(-50);
    }
    
    console.log('[QuoteAssistant] Processing message with context:', {
      hasApiKey: !!process.env.OPENROUTER_API_KEY,
      apiKeyLength: process.env.OPENROUTER_API_KEY?.length || 0,
      contextKeys: Object.keys(context),
      historyLength: conversationHistory.length,
      userMessage: userMessage.substring(0, 50) + '...'
    });
    
    const messages = this.buildMessages(userMessage, context, conversationHistory);
    
    try {
      console.log('[QuoteAssistant] Calling OpenRouter with', messages.length, 'messages');
      const response = await openRouterClient.createChatCompletion(messages, {
        model: this.model,
        temperature: 0.7,
        max_tokens: 1500
      });
      
      console.log('[QuoteAssistant] Got response:', response.substring(0, 100) + '...');
      return response;
    } catch (error: Error | unknown) {
      console.error('[QuoteAssistant] Error calling OpenRouter:', error);
      console.error('[QuoteAssistant] Error details:', {
        message: (error as any).message,
        stack: (error as any).stack,
        response: (error as any).response?.data,
        status: (error as any).response?.status,
        errorType: (error as any).constructor?.name
      });
      
      // Provide more specific error messages
      if ((error as any).message?.includes('401')) {
        throw new Error('OpenRouter API key is invalid or unauthorized');
      } else if ((error as any).message?.includes('402')) {
        throw new Error('OpenRouter account has insufficient credits');
      } else if ((error as any).message?.includes('API key')) {
        throw new Error('OpenRouter API key is required');
      }
      
      throw error; // Re-throw to let the chat route handle it
    }
  }

  async parseQuoteInformation(
    conversationText: string
  ): Promise<Partial<QuoteContext>> {
    // Input validation
    if (!conversationText || typeof conversationText !== 'string') {
      console.warn('[SECURITY] Invalid conversation text for parsing');
      return {};
    }
    
    if (conversationText.length > 50000) {
      console.warn('[SECURITY] Conversation text too long for parsing');
      return {};
    }
    
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
        - measurements (object with wallSqft, ceilingSqft, linearFeetWalls, ceilingHeight, doors, windows, etc.)
        - paintProducts (object with walls/ceiling/trim paint details including name, costPerGallon, coverageRate)
        - paintQuality
        - prepWork (good/minor/major)
        - timeline
        - specialRequests
        - pricing (object with total, materials, labor, breakdown with detailed costs)
        
        IMPORTANT: Parse comprehensive messages that include all details at once. For example:
        - "500 linear feet" with "9 feet tall" = measurements: { linearFeetWalls: 500, ceilingHeight: 9, wallSqft: 4500 }
        - "$50 a gallon" with "350 square feet per gallon" = paintProducts: { walls: { costPerGallon: 50, coverageRate: 350 } }
        - "not painting ceilings/doors/trim" = surfaces: ["walls"]
        - "Labor: $2,150 (86 hours at $25/hour)" = pricing: { labor: { total: 2150, hours: 86, rate: 25 } }
        - "Paint: $2,325 (31 gallons at $75/gallon)" = pricing: { materials: { total: 2325, gallons: 31, costPerGallon: 75 } }
        - ALWAYS VERIFY: Wall gallons = (Wall SQFT ÷ Spread Rate) × 1.8 for two coats
        - ALWAYS VERIFY: Ceiling gallons = (Ceiling SQFT ÷ Spread Rate) × 1.8 for two coats
        - "Total: $4,475" = pricing: { total: 4475 }
        
        When extracting pricing, look for patterns like:
        - "Two bedrooms, walls only"
        - "10,800 sq ft total area" 
        - Labor amounts with hours and rates
        - Paint/material costs with quantities
        - Total project costs
        
        Return valid JSON. Extract all information provided, even from complex messages.`
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
    pricing: {
      total: number;
      materials?: { total: number };
      labor?: { total: number };
      breakdown?: {
        primer?: { gallons: number; product: string; cost: number };
        wallPaint?: { gallons: number; product: string; cost: number };
        ceilingPaint?: { gallons: number; product: string; cost: number };
        supplies?: number;
        prepWork?: { hours: number; cost: number };
        painting: { hours: number; cost: number };
      };
    }
  ): Promise<string> {
    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are a professional painting contractor assistant. Generate a clear, professional summary of the quote details for the contractor to review before sending to their customer.'
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
        content: `You are a professional painting quote assistant designed to help contractors generate accurate quotes for their customers in under 2 minutes while on-site. Your goal is to gather essential measurements and project details through a conversational flow, then calculate a complete quote using the contractor's pre-configured rates and preferences. You are helping the contractor create quotes, not talking to the customer directly.

## CRITICAL MEMORY INSTRUCTIONS:
- REMEMBER EVERYTHING from this conversation - every detail, measurement, preference, and piece of information
- NEVER ask for information that was already provided earlier in the conversation
- Reference earlier parts of the conversation when relevant
- Build upon what you've learned - if they said "20 foot ceilings" earlier, remember that
- Keep a mental note of ALL details: customer name, address, room counts, paint preferences, special requests

## AUTOMATIC QUOTE GENERATION AND REVIEW READINESS:
IMPORTANT: When you have ALL necessary information to create a complete quote, you should automatically:
1. Generate the full quote breakdown
2. Present it with "Here's your complete quote" or similar
3. Include action phrases that trigger review buttons: "Ready to review and save" or "Please review the details below"

Trigger automatic quote generation when:
- You have customer name, measurements, surfaces, and paint details
- The contractor provides comprehensive information in one message
- The conversation naturally reaches a complete state
- The contractor expresses ANY form of approval or readiness

Readiness expressions include: "ready to review", "let's review", "looks good", "sounds good", "perfect", "great", "proceed", "continue", "finalize", "done", "that's correct", or similar.

ALWAYS end quote presentations with clear next-step language like:
"Your quote is ready for review. You can now customize it further or save it directly."

## RESPONSIVE LINE ITEM HANDLING:
Be prepared to add these items when the contractor mentions or requests them:
- "We'll need a scissor lift" → Add "Scissor lift rental: $300/day"
- "Need to rent a lift" → Add appropriate lift rental
- "It's 40 miles away" → Add "Travel/mileage: $X at $0.65/mile"
- "We'll use a sprayer" → Add "Sprayer equipment rental: $175/day"
- "Rush job" or "needs it by tomorrow" → Add "Rush service surcharge: 15%"
- "Downtown location" → Ask if parking permits needed
- "Need drop cloths" → Add "Drop cloths and protection materials: $75-150"
- "Match existing texture" → Add "Texture matching service: $200-400"
- "Need to match the color" → Add "Color matching and samples: $50"
- "Dispose of old paint" → Add "Hazardous material disposal: $75"
- "Weekend work" → Add "Weekend/overtime surcharge: 25%"
- "Need scaffolding" → Add "Scaffolding rental: $500-800/week"

When the contractor mentions equipment or special circumstances, acknowledge and add to quote:
"Got it, I'll add the scissor lift rental at $300/day to the quote."
DON'T add these items unless specifically mentioned or clearly needed based on what the contractor says.

## CONTRACTOR'S RATES (Variable by factors):
${context.companyRates ? `
BASE RATES (before adjustments):
- Walls: $${context.companyRates.paintingRate || 'Ask contractor'}/sqft
- Ceilings: $${context.companyRates.ceilingRate || 'Ask contractor'}/sqft
- Doors: $${context.companyRates.doorRate || 'Ask contractor'}/door
- Windows: $${context.companyRates.windowRate || 'Ask contractor'}/window
- Primer: $${context.companyRates.primingRate || 'Ask contractor'}/sqft
- Overhead: ${context.companyRates.overheadPercent || 15}%
- Profit Margin: ${context.companyRates.profitMargin || 30}%

ADJUSTMENT FACTORS:
- Season: ${this.getCurrentSeasonName()} (pricing may vary)
- Product grades available: Economy, Standard, Premium, Luxury
- Rush jobs: 25% surcharge
- High ceilings: Additional charges apply
- Prep work: Affects final pricing
` : 'Rates not configured - ask contractor for their current pricing'}

## PREFERRED PAINTS:
${context.preferredPaints?.map(paint => `- ${paint.name}: ${paint.coverageRate} sqft/gallon at $${paint.costPerGallon}/gallon`).join('\n') || 'No preferred paints configured'}

## CURRENT CONTEXT (Remember ALL of this):
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
You are assisting the CONTRACTOR, not the customer. The contractor will provide project details. ALWAYS start with the biggest cost drivers first, then get progressively more specific. Keep questions simple and assume the contractor is standing in the customer's space.

IMPORTANT: If the contractor provides ALL information in one message (customer name, address, measurements, paint selection, etc.), acknowledge everything and proceed directly to quote calculation. Don't ask for information already provided.

## YOUR GOALS:
1. Help the contractor complete an accurate quote for their customer in under 2 minutes
2. Maximum 10-12 total questions (or less if info provided upfront)
3. Use contractor's pre-set rates
4. Offer their preferred paint options first
5. Calculate materials and labor automatically
6. Present clear, professional quote breakdown for the contractor to review
7. RESPONSIVELY add line items when contractor mentions equipment, travel, or special circumstances
8. ALWAYS provide detailed pricing when user expresses readiness to review
9. AUTOMATICALLY present the complete quote when you have all necessary information
10. END every complete quote with action phrases like "ready for review" or "ready to save"

## QUOTE GENERATION TRIGGERS:
Automatically generate a complete quote when ANY of these conditions are met:
1. You have ALL essential information (customer, measurements, surfaces, paint)
2. The contractor expresses ANY readiness or approval
3. The conversation naturally reaches completion
4. You've calculated pricing and have no more questions

When generating the quote, ALWAYS:
- Include MATERIALS breakdown (paint, primer, supplies)
- Include LABOR breakdown (prep work, painting hours)
- Show TOTAL with clear pricing structure
- Provide timeline estimate
- End with action-triggering phrases like "Ready for review" or "Quote complete - ready to save"
- Use language that signals the system to show review buttons

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

## CALCULATION FORMULAS (INTERIOR PAINTING):

1. PRIMER: 
   - Primer SQFT = Linear Feet × Ceiling Height
   - Gallons = Primer SQFT ÷ Spread Rate (typically 200-300 sqft/gal)

2. WALLS:
   - Wall SQFT = Linear Feet × Ceiling Height
   - Gallons = (Wall SQFT ÷ Spread Rate) × 1.8 (for two coats)
   - Spread rate typically 350-400 sqft/gal

3. CEILINGS:
   - Gallons = (Ceiling SQFT ÷ Spread Rate) × 1.8 (for two coats)
   - Spread rate typically ~350 sqft/gal

4. DOORS/WINDOWS:
   - Doors: 1 gallon covers 4-5 doors (two coats, both sides)
   - Windows: 1 gallon covers 2-3 windows (two coats)
   - Gallons = Count ÷ Coverage Rate

5. PRICING (VARIABLE - based on user preferences):
   - Rates vary by: location, season, product grade, complexity
   - Base rates are adjusted with multipliers
   - Always ask about product grade preference (economy/standard/premium/luxury)
   - Consider seasonal pricing (busy summer vs slow winter)
   - Account for job complexity and ceiling height
   - Rush jobs have surcharge

## PARSING COMPREHENSIVE MESSAGES:
When contractors provide detailed information like:
"It's for Cici at 9090 Hillside Drive. We are not painting the ceilings. The project is a 500 linear feet of interior painting. $50 a gallon bucket eggshell shirwin williams. spread rate is 350 square feet per gallon. Ceilings are 9 feet tall. We are not painting doors, or trim or windows. No primer. labour is included in the cost per square foot at $1.50."

Extract and CALCULATE:
- Customer: Cici
- Address: 9090 Hillside Drive
- Linear feet walls: 500
- Ceiling height: 9 feet
- Wall SQFT: 500 × 9 = 4,500 sqft
- Wall gallons needed: (4,500 ÷ 350) × 1.8 = 23.1 → 24 gallons (for two coats)
- Paint cost: 24 × $50 = $1,200
- Labor cost: 4,500 × $1.50 = $6,750
- Total: $7,950
- Surfaces: walls only (no ceilings, doors, trim, windows)
- No primer needed

Ask about: "What grade of paint would you like to use? (economy/standard/premium/luxury)" and "Is this a rush job?"
Then calculate with appropriate pricing adjustments.

When the user says "call it complete", "nope" (to additional items), "that's all", or indicates they're done:
1. Immediately provide the final quote summary with total price
2. Say "Quote is finalized at $X,XXX" 
3. End with "Ready to review and send to your customer!"

Keep responses under 2 sentences when possible. Be conversational but efficient. REMEMBER EVERYTHING.`
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

  formatQuotePresentation(quoteData: {
    materials: { total: number };
    labor: { total: number };
    total: number;
    timeline: string;
    breakdown: {
      primer?: { gallons: number; product: string; cost: number };
      wallPaint?: { gallons: number; product: string; cost: number };
      ceilingPaint?: { gallons: number; product: string; cost: number };
      supplies?: number;
      prepWork?: { hours: number; cost: number };
      painting: { hours: number; cost: number };
    };
  }): string {
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

✅ **Your quote is ready for review.** You can now customize it further or save it directly.

Would you like to make any adjustments before saving?`;
  }

  // Check if message contains comprehensive quote information
  // Simplified regex patterns to prevent ReDoS attacks
  isComprehensiveMessage(message: string): boolean {
    // Use simple, non-backtracking patterns
    const indicators = [
      /\d+\s*feet/i,  // Simplified: just digits + feet
      /\$\d+.*gallon/i,  // Simplified: $ + digits + gallon
      /\d+\s*ft.*tall/i,  // Simplified: digits + ft + tall
      /spread.rate/i,  // Simplified: spread + rate
      /not.painting/i,  // Simplified: not + painting
      /square.feet.per.gallon/i  // Simplified: use dots instead of \s*
    ];
    
    // Add input length validation to prevent excessive processing
    if (message.length > 10000) {
      console.warn('[SECURITY] Message too long, limiting comprehensive analysis');
      return false;
    }
    
    const matchCount = indicators.filter(pattern => pattern.test(message)).length;
    return matchCount >= 3; // If message contains 3+ indicators, it's comprehensive
  }

  // Check if user is expressing readiness to review the quote
  // Simplified regex patterns to prevent ReDoS attacks
  isReadyToReview(message: string): boolean {
    // Add input validation
    if (!message || message.length > 5000) {
      console.warn('[SECURITY] Invalid message for readiness check');
      return false;
    }
    
    // Use simple string includes instead of complex regex for better performance
    const messageLower = message.toLowerCase();
    const readinessKeywords = [
      'ready to review',
      'lets review',
      'let\'s review', 
      'looks good',
      'sounds good',
      'that\'s good',
      'that\'s correct',
      'that\'s right',
      'perfect',
      'great',
      'excellent',
      'proceed',
      'continue',
      'move forward',
      'next step',
      'finalize',
      'complete',
      'done',
      'finish',
      'send it',
      'approve',
      'confirm',
      'create the quote',
      'generate the quote',
      'save the quote',
      'call it complete',
      'nope',
      'no thanks',
      'that\'s all',
      'that\'s it',
      'all set',
      'we\'re done'
    ];
    
    // Use simple string includes for better performance and security
    return readinessKeywords.some(keyword => messageLower.includes(keyword));
  }

  // Check if the conversation has enough information for a quote
  hasMinimumQuoteInformation(context: QuoteContext, conversationHistory: ConversationMessage[]): boolean {
    // Check if we have essential information
    const hasCustomer = !!context.customerName;
    const hasMeasurements = !!(context.measurements?.wallSqft || 
                              (context.measurements?.linearFeetWalls && context.measurements?.ceilingHeight));
    const hasSurfaces = !!(context.surfaces && context.surfaces.length > 0);
    
    // Or check if conversation contains pricing information
    const fullConversation = conversationHistory
      .map(m => m.content)
      .join(' ')
      .toLowerCase();
    
    const hasPricing = /\$\d+/.test(fullConversation) && 
                      (/total|cost|price/i.test(fullConversation));
    
    return (hasCustomer && hasMeasurements && hasSurfaces) || hasPricing;
  }

  private getCurrentSeasonName(): string {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer (busy season)';
    if (month >= 9 && month <= 11) return 'Fall';
    return 'Winter (off-season)';
  }

  // Calculate quote using the V2 calculator with dynamic pricing
  async calculateQuote(context: QuoteContext, pricingConfig?: CompanyPricingConfig): Promise<CalculatorOutputV2 | null> {
    // Convert QuoteContext to CalculatorInputV2
    const input: CalculatorInputV2 = {
      linearFeetWalls: context.measurements?.linearFeetWalls,
      ceilingHeight: context.measurements?.ceilingHeight,
      ceilingSqft: context.measurements?.ceilingSqft,
      doors: context.measurements?.doors,
      windows: context.measurements?.windows,
      
      paintProducts: {
        primer: context.paintProducts?.primer ? {
          name: context.paintProducts.primer,
          spreadRate: 250, // default
          costPerGallon: 25
        } : undefined,
        walls: context.paintProducts?.walls ? {
          name: context.paintProducts.walls,
          spreadRate: 375, // default
          costPerGallon: 35
        } : undefined,
        ceiling: context.paintProducts?.ceiling ? {
          name: context.paintProducts.ceiling,
          spreadRate: 350, // default
          costPerGallon: 30
        } : undefined,
        trim: context.paintProducts?.trim ? {
          name: context.paintProducts.trim,
          doorsPerGallon: 4.5,
          windowsPerGallon: 2.5,
          costPerGallon: 40
        } : undefined
      },
      
      needsPrimer: context.prepCondition === 'major',
      
      pricingRates: {
        wallsPerSqft: context.companyRates?.paintingRate,
        ceilingsPerSqft: context.companyRates?.paintingRate, // Using paintingRate as fallback
        doorsPerUnit: context.companyRates?.doorRate,
        windowsPerUnit: context.companyRates?.windowRate,
        primerPerSqft: context.companyRates?.primingRate,
        
        // Apply dynamic adjustments if config provided
        seasonalAdjustment: pricingConfig ? 
          pricingConfig.seasonalPricing[PricingConfigManager.getCurrentSeason()] : 1.0,
        locationMultiplier: 1.0, // Would be set based on job location
        productGradeMultiplier: 1.0 // Would be set based on selected grade
      },
      
      surfaces: {
        walls: context.surfaces?.includes('walls'),
        ceilings: context.surfaces?.includes('ceilings') || context.surfaces?.includes('ceiling'),
        doors: context.surfaces?.includes('doors'),
        windows: context.surfaces?.includes('windows'),
        trim: context.surfaces?.includes('trim')
      },
      
      overheadPercent: context.companyRates?.overheadPercent || 10,
      markupPercent: context.companyRates?.profitMargin || 20,
      taxRate: 0 // Can be added from context if available
    };
    
    // Only calculate if we have minimum required data
    if (input.linearFeetWalls && input.ceilingHeight) {
      return Promise.resolve(QuoteCalculatorV2.calculate(input));
    }
    
    return Promise.resolve(null);
  }
  
  // Check if AI response contains a complete quote
  // Simplified to prevent ReDoS attacks
  isQuoteComplete(aiResponse: string): boolean {
    // Add input validation
    if (!aiResponse || aiResponse.length > 10000) {
      console.warn('[SECURITY] Invalid AI response for quote completion check');
      return false;
    }
    
    const responseLower = aiResponse.toLowerCase();
    
    // Check for quote completion indicators using simple string includes
    const completionPhrases = [
      'quote is ready',
      'quote complete',
      'ready for review',
      'ready to review',
      'review and save',
      'customize it further or save',
      'your quote is ready',
      'here\'s your quote',
      'here is your quote',
      'complete quote',
      'quote breakdown',
      'quote is finalized',
      'finalized at',
      'final quote',
      'have a great',
      'good luck with',
      'best of luck'
    ];
    
    // Check for pricing structure with simple patterns
    const hasPricingStructure = 
      (responseLower.includes('total') && responseLower.includes('$')) ||
      (responseLower.includes('materials') && responseLower.includes('labor')) ||
      (responseLower.includes('$') && responseLower.includes('quote'));
    
    // Check if any completion phrase is present
    const hasCompletionPhrase = completionPhrases.some(phrase => responseLower.includes(phrase));
    
    // Quote is complete if it has pricing and a completion phrase
    return hasPricingStructure && hasCompletionPhrase;
  }
}

// Export singleton instance
export const quoteAssistant = new QuoteAssistant();