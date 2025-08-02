// Intelligent Quote Parsing System for PaintQuote Pro
// Multi-LLM approach integrated with charge rate system


interface ParsedQuoteData {
  // Customer Information
  customer: {
    name?: string
    email?: string
    phone?: string
    address?: string
  }
  
  // Project Details
  projectType: 'residential' | 'commercial'
  description?: string
  
  // Surfaces with measurements
  surfaces: Array<{
    type: string
    name: string
    area?: number        // Square feet for walls/ceilings/soffits
    linearFeet?: number  // Linear feet for baseboards/crown molding/fascia
    count?: number       // Unit count for doors/windows
    coats: number
    condition: 'good' | 'fair' | 'poor'
    prepWork: string[]
  }>
  
  // Charge Rates (from company settings)
  chargeRates?: Record<string, number | string>
  
  // Quote Settings
  settings: {
    taxRate: number
    overheadPercent: number
    profitMargin: number
  }
  
  // Metadata
  confidence: {
    score: number
    missingFields: string[]
    assumptions: string[]
  }
  
  // AI Analysis
  analysis: {
    projectComplexity: 'simple' | 'moderate' | 'complex'
    estimatedDuration: number // days
    recommendations: string[]
  }
}

interface ParsingResult {
  success: boolean
  data: ParsedQuoteData
  errors: string[]
  warnings: string[]
  needsClarification: boolean
  clarificationQuestions: string[]
}

export class IntelligentQuoteParser {
  private openRouterKey: string
  
  constructor(openRouterKey: string) {
    this.openRouterKey = openRouterKey
  }
  
  async parseConversation(messages: Array<{role: string, content: string}>): Promise<ParsingResult> {
    try {
      // Convert conversation to single text for parsing
      const conversationText = messages
        .map(m => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.content}`)
        .join('\n')
      
      // Stage 1: Extract quote data with Claude Sonnet
      const extractedData = await this.extractQuoteData(conversationText)
      
      // Stage 2: Map to our charge rate system
      const mappedResult = this.mapToChargeRateSystem(extractedData)
      
      // Stage 3: Quality assessment
      const finalResult = this.assessQuality(mappedResult)
      
      return {
        success: true,
        data: finalResult,
        errors: [],
        warnings: finalResult.confidence.missingFields.map(field => `Missing: ${field}`),
        needsClarification: finalResult.confidence.missingFields.length > 0,
        clarificationQuestions: this.generateClarificationQuestions(finalResult)
      }
      
    } catch (error) {
      return {
        success: false,
        data: this.getEmptyQuoteData(),
        errors: [error instanceof Error ? error.message : 'Unknown parsing error'],
        warnings: [],
        needsClarification: true,
        clarificationQuestions: ['Could you provide more details about your painting project?']
      }
    }
  }
  
  private async extractQuoteData(text: string): Promise<ParsedQuoteData> {
    const prompt = `Extract structured painting quote information from this conversation.

CRITICAL RULES:
1. Only extract explicitly stated information
2. Never make assumptions about unstated values
3. Map surface types to our system:
   - Interior: walls, ceilings, baseboards, crown_molding, doors, windows
   - Exterior: exterior_walls, fascia, soffits, exterior_doors, exterior_windows
4. Identify measurement types:
   - Square feet: walls, ceilings, soffits, exterior walls
   - Linear feet: baseboards, crown molding, fascia
   - Unit count: doors, windows
5. Extract customer information carefully
6. Note any special requirements or prep work

CONVERSATION:
${text}

Return JSON in this exact structure:
{
  "customer": {
    "name": string | null,
    "email": string | null,
    "phone": string | null,
    "address": string | null
  },
  "projectType": "residential" | "commercial",
  "description": string | null,
  "surfaces": [
    {
      "type": string,
      "name": string,
      "area": number | null,
      "linearFeet": number | null,
      "count": number | null,
      "coats": number,
      "condition": "good" | "fair" | "poor",
      "prepWork": string[]
    }
  ],
  "settings": {
    "taxRate": number,
    "overheadPercent": number,
    "profitMargin": number
  },
  "analysis": {
    "projectComplexity": "simple" | "moderate" | "complex",
    "estimatedDuration": number,
    "recommendations": string[]
  }
}`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openRouterKey}`,
        'HTTP-Referer': 'https://paintquotepro.com',
        'X-Title': 'PaintQuote Pro'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.1,
        max_tokens: 4096
      })
    })
    
    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }
    
    const data = await response.json()
    const content = data.choices[0].message.content
    
    // Clean and parse JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response')
    }
    
    return JSON.parse(jsonMatch[0])
  }
  
  
  private mapToChargeRateSystem(data: ParsedQuoteData): ParsedQuoteData {
    // Map surfaces to our charge rate categories
    const mappedSurfaces = data.surfaces.map(surface => {
      // Ensure proper type mapping
      const typeMap: Record<string, string> = {
        'wall': 'walls',
        'ceiling': 'ceilings',
        'baseboard': 'baseboards',
        'crown': 'crown_molding',
        'door': 'doors',
        'window': 'windows',
        'exterior wall': 'exterior_walls',
        'fascia board': 'fascia',
        'soffit': 'soffits',
        'exterior door': 'exterior_doors',
        'exterior window': 'exterior_windows'
      }
      
      const mappedType = typeMap[surface.type.toLowerCase()] || surface.type
      
      return {
        ...surface,
        type: mappedType,
        // Ensure coats default to 2 if not specified
        coats: surface.coats || 2,
        // Default condition to good if not specified
        condition: surface.condition || 'good',
        // Default prep work
        prepWork: surface.prepWork || []
      }
    })
    
    return {
      ...data,
      surfaces: mappedSurfaces
    }
  }
  
  private assessQuality(data: ParsedQuoteData): ParsedQuoteData {
    const missingFields: string[] = []
    const assumptions: string[] = []
    
    // Check customer information
    if (!data.customer.name) missingFields.push('Customer name')
    if (!data.customer.address && !data.customer.email && !data.customer.phone) {
      missingFields.push('Customer contact information')
    }
    
    // Check surfaces
    if (data.surfaces.length === 0) {
      missingFields.push('Surface information')
    } else {
      data.surfaces.forEach((surface, index) => {
        if (!surface.area && !surface.linearFeet && !surface.count) {
          missingFields.push(`Measurements for ${surface.name}`)
        }
      })
    }
    
    // Calculate confidence score
    const totalFields = 10 // Approximate critical fields
    const filledFields = totalFields - missingFields.length
    const confidenceScore = Math.round((filledFields / totalFields) * 100)
    
    // Add assumptions made
    if (data.settings.taxRate === 8.25) {
      assumptions.push('Using default tax rate of 8.25%')
    }
    if (data.settings.overheadPercent === 15) {
      assumptions.push('Using default overhead of 15%')
    }
    if (data.settings.profitMargin === 30) {
      assumptions.push('Using default profit margin of 30%')
    }
    
    return {
      ...data,
      confidence: {
        score: confidenceScore,
        missingFields,
        assumptions
      }
    }
  }
  
  private generateClarificationQuestions(data: ParsedQuoteData): string[] {
    const questions: string[] = []
    
    if (!data.customer.name) {
      questions.push("What is the customer's name?")
    }
    
    if (!data.customer.address) {
      questions.push("What is the property address?")
    }
    
    if (data.surfaces.length === 0) {
      questions.push("Which surfaces need to be painted?")
    } else {
      data.surfaces.forEach(surface => {
        if (!surface.area && !surface.linearFeet && !surface.count) {
          const unit = surface.type.includes('baseboard') || surface.type.includes('crown') || surface.type.includes('fascia') 
            ? 'linear feet' 
            : surface.type.includes('door') || surface.type.includes('window')
            ? 'count'
            : 'square feet'
          questions.push(`What are the measurements for ${surface.name} (in ${unit})?`)
        }
      })
    }
    
    return questions
  }
  
  private getEmptyQuoteData(): ParsedQuoteData {
    return {
      customer: {},
      projectType: 'residential',
      surfaces: [],
      settings: {
        taxRate: 8.25,
        overheadPercent: 15,
        profitMargin: 30
      },
      confidence: {
        score: 0,
        missingFields: [],
        assumptions: []
      },
      analysis: {
        projectComplexity: 'simple',
        estimatedDuration: 1,
        recommendations: []
      }
    }
  }
  
  // Helper method to check if we have enough data for quote generation
  hasMinimumDataForQuote(data: ParsedQuoteData): boolean {
    return !!(
      data.customer.name &&
      data.surfaces.length > 0 &&
      data.surfaces.every(s => 
        (s.area && s.area > 0) || 
        (s.linearFeet && s.linearFeet > 0) || 
        (s.count && s.count > 0)
      )
    )
  }
  
  // Convert parsed data to quote input format
  toQuoteInput(data: ParsedQuoteData, chargeRates: Record<string, unknown>): {
    customer: ParsedQuoteData['customer'];
    projectType: string;
    description?: string;
    surfaces: ParsedQuoteData['surfaces'];
    chargeRates: Record<string, unknown>;
    settings: ParsedQuoteData['settings'];
  } {
    return {
      customer: data.customer,
      projectType: data.projectType,
      description: data.description,
      surfaces: data.surfaces,
      chargeRates,
      settings: data.settings
    }
  }
}