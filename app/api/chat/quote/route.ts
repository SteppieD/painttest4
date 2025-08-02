import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { IntelligentQuoteParser } from '@/lib/ai/intelligent-quote-parser'
export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

interface AuthPayload {
  userId: number
  companyId: number
  email: string
  role: string
}

async function getAuth(): Promise<AuthPayload | null> {
  const token = cookies().get('auth-token')?.value
  if (!token) return null
  
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload
  } catch {
    return null
  }
}

const SYSTEM_PROMPT = `You are a helpful assistant for a painting contractor. Your job is to gather information needed to create a painting quote.

You need to collect:
1. Customer information (name, email, phone, address)
2. Project type (residential or commercial)
3. Surfaces to be painted with measurements:
   - Interior walls (square feet)
   - Ceilings (square feet)
   - Baseboards (linear feet)
   - Crown molding (linear feet)
   - Doors & door jams (count)
   - Windows (count)
   - Exterior walls (square feet)
   - Fascia boards (linear feet)
   - Soffits (square feet)
   - Exterior doors (count)
   - Exterior windows (count)
4. Condition of surfaces (excellent, good, fair, poor)
5. Number of coats needed (typically 2)
6. Any prep work required

Ask questions conversationally and gather all necessary information. Be helpful and professional.

When you have collected enough information, respond with a JSON object in this format:
{
  "quoteData": {
    "customer": {
      "name": "string",
      "email": "string",
      "phone": "string (optional)",
      "address": "string (optional)"
    },
    "projectType": "residential" or "commercial",
    "description": "string (optional)",
    "surfaces": [
      {
        "id": "unique-id",
        "name": "descriptive name",
        "type": "wall|ceiling|baseboard|crown_molding|door|window|exterior_wall|fascia|soffit|exterior_door|exterior_window",
        "area": number (for walls, ceilings, soffits),
        "linearFeet": number (for baseboards, crown molding, fascia),
        "count": number (for doors, windows),
        "coats": number (usually 2),
        "condition": "excellent|good|fair|poor",
        "prepWork": ["none"] or array of prep work needed
      }
    ]
  }
}

If you need more information, continue the conversation. Only generate the JSON when you have enough details.`

export async function POST(request: NextRequest) {
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!ANTHROPIC_API_KEY && !OPENROUTER_API_KEY) {
    return NextResponse.json({ 
      error: 'AI service not configured. Please set ANTHROPIC_API_KEY or OPENROUTER_API_KEY in environment variables.' 
    }, { status: 500 })
  }

  try {
    const { messages } = await request.json()
    
    // Initialize the intelligent parser if OpenRouter key is available
    const parser = OPENROUTER_API_KEY ? new IntelligentQuoteParser(OPENROUTER_API_KEY) : null
    
    // Try to parse the conversation for quote data if parser is available
    const parsingResult = parser ? await parser.parseConversation(messages) : null
    
    // Use default charge rates (Company interface doesn't have settings field)
    const chargeRates = {
      walls: 3.50,
      ceilings: 3.00,
      baseboards: 2.50,
      crownMolding: 3.50,
      doors: 150,
      windows: 100,
      exteriorWalls: 4.00,
      fascia: 3.00,
      soffits: 3.50,
      exteriorDoors: 200,
      exteriorWindows: 150
    }
    
    // Check if we have enough data for quote generation
    if (parsingResult && parsingResult.success && parser && parser.hasMinimumDataForQuote(parsingResult.data)) {
      // Convert to quote format
      const quoteData = parser.toQuoteInput(parsingResult.data, chargeRates)
      
      return NextResponse.json({
        message: "Great! I've collected all the information needed. Creating your quote now...",
        quoteData,
        parsingMetadata: {
          confidence: parsingResult.data.confidence.score,
          assumptions: parsingResult.data.confidence.assumptions
        }
      })
    }
    
    // Otherwise, continue conversation with Claude
    let response: Response
    
    if (OPENROUTER_API_KEY && !ANTHROPIC_API_KEY) {
      // Use OpenRouter for Claude access
      response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://paintquotepro.com',
          'X-Title': 'PaintQuote Pro'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-sonnet:beta',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT + '\n\nAdditional context from parsing:\n' + 
                (parsingResult && parsingResult.needsClarification 
                  ? `Please ask about: ${parsingResult.clarificationQuestions.join(', ')}`
                  : '')
            },
            ...messages
          ],
          max_tokens: 1000,
          temperature: 0.7
        }),
      })
    } else {
      // Use direct Anthropic API
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          system: SYSTEM_PROMPT + '\n\nAdditional context from parsing:\n' + 
            (parsingResult && parsingResult.needsClarification 
              ? `Please ask about: ${parsingResult.clarificationQuestions.join(', ')}`
              : ''),
          messages: messages,
        }),
      })
    }

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      throw new Error('Failed to get AI response')
    }

    const data = await response.json()
    const assistantMessage = OPENROUTER_API_KEY && !ANTHROPIC_API_KEY 
      ? data.choices[0].message.content 
      : data.content[0].text

    return NextResponse.json({ 
      message: assistantMessage,
      parsingStatus: parsingResult ? {
        confidence: parsingResult.data.confidence.score,
        missingFields: parsingResult.data.confidence.missingFields
      } : undefined
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}