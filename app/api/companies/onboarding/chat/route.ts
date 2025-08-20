import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
}) : null;

// Define the steps and what data to collect (used for reference but not directly accessed)
// const ONBOARDING_STEPS = [
//   { step: 0, field: 'companyName', nextQuestion: 'business email' },
//   { step: 1, field: 'email', nextQuestion: 'phone number' },
//   { step: 2, field: 'phone', nextQuestion: 'location (city and state)' },
//   { step: 3, field: 'location', nextQuestion: 'local sales tax rate' },
//   { step: 4, field: 'taxRate', nextQuestion: 'pricing preferences' },
//   { step: 5, field: 'pricing', nextQuestion: null }
// ];

export async function POST(request: NextRequest) {
  try {
    const company = await getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, collectedData, currentStep } = await request.json();

    // Create the prompt for the AI
    const systemPrompt = `You are a friendly onboarding assistant for PaintQuote Pro, helping painting contractors set up their business profile. 

Current step: ${currentStep}
Data collected so far: ${JSON.stringify(collectedData)}

Your task is to:
1. Extract relevant information from the user's message based on the current step
2. Respond in a friendly, conversational way
3. Ask for the next piece of information if needed
4. Guide them through setting up their:
   - Company name (step 0)
   - Business email (step 1)
   - Phone number (step 2)
   - Location - city and state (step 3)
   - Local sales tax rate (step 4)
   - Pricing preferences - hourly rate, markup percentage, minimum job size (step 5)

Keep responses concise and friendly. Use emojis occasionally. If the user provides multiple pieces of information at once, acknowledge all of them.

When asking about pricing preferences, suggest industry standards:
- Hourly labor rate: $35-65/hour (average $45)
- Markup: 20-50% (average 30%)
- Minimum job: $300-1000 (average $500)

Important: You must respond with a JSON object containing:
{
  "response": "Your friendly message to the user",
  "extractedData": { "field": "value" },
  "isComplete": false,
  "nextStep": number
}`;

    let aiResponse;
    
    if (anthropic) {
      try {
        const completion = await anthropic.messages.create({
          model: 'claude-3-haiku-20240307',  // Using Haiku for fast onboarding responses
          max_tokens: 500,
          temperature: 0.7,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: `User message: "${message}"\n\nBased on the current step ${currentStep}, extract relevant data and provide a friendly response.`
            }
          ]
        });

        // Parse the AI response
        const content = completion.content[0];
        if (content.type === 'text') {
          aiResponse = JSON.parse(content.text);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (parseError) {
        // Fallback response if AI doesn't return proper JSON
        aiResponse = generateFallbackResponse(currentStep, message, collectedData);
      }
    } else if (process.env.OPENROUTER_API_KEY) {
      // Use OpenRouter as fallback
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
            'X-Title': 'PaintQuote Pro'
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3-haiku-20240307',  // Using Haiku for fast onboarding responses
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: `User message: "${message}"\n\nBased on the current step ${currentStep}, extract relevant data and provide a friendly response.`
              }
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });

        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          aiResponse = JSON.parse(data.choices[0].message.content);
        } else {
          throw new Error('Invalid OpenRouter response');
        }
      } catch (error) {
        aiResponse = generateFallbackResponse(currentStep, message, collectedData);
      }
    } else {
      // No AI service available, use fallback
      aiResponse = generateFallbackResponse(currentStep, message, collectedData);
    }

    // Update collected data - merge the extracted data properly
    const updatedData = {
      ...collectedData,
      ...aiResponse.extractedData
    };

    // Log the updated data for debugging
    console.log('[CHAT ONBOARDING] Updated data:', updatedData);
    console.log('[CHAT ONBOARDING] Next step:', aiResponse.nextStep);
    console.log('[CHAT ONBOARDING] Is complete:', aiResponse.isComplete);

    return NextResponse.json({
      response: aiResponse.response,
      collectedData: aiResponse.extractedData,  // Only send the new extracted data
      nextStep: aiResponse.nextStep,
      isComplete: aiResponse.isComplete
    });

  } catch (error) {
    console.error('Error in chat onboarding:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

interface OnboardingData {
  companyName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  taxRate?: number;
  hourlyRate?: number;
  markupPercentage?: number;
  minimumJobSize?: number;
}

function generateFallbackResponse(currentStep: number, message: string, collectedData: unknown) {
  // Log for debugging
  console.log('[FALLBACK] Step:', currentStep, 'Message:', message, 'CollectedData:', collectedData);
  
  // Type guard for collectedData
  const data = collectedData as OnboardingData || {};
  
  const responses = {
    0: {
      response: "Great! I'll use that as your company name. What's your business email address?",
      extractedData: { companyName: message.trim() },
      nextStep: 1,
      isComplete: false
    },
    1: {
      response: "Perfect! I've saved your email. What's the best phone number to reach your business?",
      extractedData: { email: message.trim() },
      nextStep: 2,
      isComplete: false
    },
    2: {
      response: "Got it! Now, where is your business located? Please tell me your city and state.",
      extractedData: { phone: message.trim() },
      nextStep: 3,
      isComplete: false
    },
    3: {
      response: "Thanks! What's your local sales tax rate? (For example: 8.25 for 8.25%)",
      extractedData: extractLocationFromMessage(message),
      nextStep: 4,
      isComplete: false
    },
    4: {
      response: `Great! Now let's set up your pricing. I need three things:
- Your hourly labor rate (industry average: $45/hour)
- Your markup percentage (industry average: 30%)
- Your minimum job size (industry average: $500)

You can tell me all three at once, like: "$50/hour, 35% markup, $600 minimum"`,
      extractedData: { taxRate: parseFloat(message.replace('%', '').trim()) || 0 },
      nextStep: 5,
      isComplete: false
    },
    5: {
      response: `Excellent! I've set up your pricing preferences. 

Here's a summary of your business setup:
✅ Company: ${data.companyName || 'Your Company'}
✅ Email: ${data.email || 'Not provided'}
✅ Phone: ${data.phone || 'Not provided'}
✅ Location: ${data.city || 'City'}, ${data.state || 'State'}
✅ Tax Rate: ${data.taxRate || 0}%
✅ Pricing: Set up and ready!

You're all set! Let me save these settings and get you started with PaintQuote Pro! 🎉`,
      extractedData: extractPricingFromMessage(message),
      nextStep: 6,
      isComplete: true
    }
  };

  type ResponseType = {
    response: string;
    extractedData: Record<string, unknown>;
    nextStep: number;
    isComplete: boolean;
  };
  
  const responseMap = responses as Record<number, ResponseType>;
  return responseMap[currentStep] || responseMap[0];
}

function extractLocationFromMessage(message: string): unknown {
  // Simple extraction - in production, you'd use more sophisticated parsing
  const parts = message.split(',').map(s => s.trim());
  if (parts.length >= 2) {
    return {
      city: parts[0],
      state: parts[1].replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 2)
    };
  }
  return { city: message.trim(), state: '' };
}

function extractPricingFromMessage(message: string): unknown {
  const numbers = message.match(/\d+(\.\d+)?/g) || [];
  
  // Try to intelligently parse the numbers
  let laborRate = 45; // default
  let markupPercentage = 30; // default
  let minimumJobSize = 500; // default

  if (numbers.length >= 1 && numbers[0]) {
    // First number is likely hourly rate
    laborRate = parseFloat(numbers[0]);
  }
  if (numbers.length >= 2 && numbers[1]) {
    // Second number is likely markup
    markupPercentage = parseFloat(numbers[1]);
  }
  if (numbers.length >= 3 && numbers[2]) {
    // Third number is likely minimum
    minimumJobSize = parseFloat(numbers[2]);
  }

  return {
    laborRate,
    markupPercentage,
    minimumJobSize
  };
}