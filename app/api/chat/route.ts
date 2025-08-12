import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import { db, DatabaseAdapter } from '@/lib/database/adapter';

export const dynamic = 'force-dynamic';

// Extended database interface with optional methods
interface ExtendedDatabaseAdapter extends DatabaseAdapter {
  getPaintProductsByCompanyId?: (companyId: number) => Promise<unknown[]>;
}

// Paint product interface
interface PaintProduct {
  name?: string;
  product_name?: string;
  brand?: string;
  type?: string;
}

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
}, 30 * 60 * 1000); // Check every 30 minutes

export async function POST(request: NextRequest) {
  try {
    console.log('[CHAT] Starting request processing');
    
    // Get user session/company
    const company = await getCompanyFromRequest(request);
    if (!company) {
      console.log('[CHAT] No valid company found in request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[CHAT] Company found:', company.name);

    const { message, sessionId, useContext = true, isFirstQuote = false, onboardingSettings = {} } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get or create conversation manager for this session
    let conversationManager = sessions.get(sessionId);
    if (!conversationManager) {
      conversationManager = new ConversationManager();
      sessions.set(sessionId, conversationManager);
      console.log('[CHAT] Created new conversation manager for session:', sessionId);
    }

    // Add user message to conversation
    conversationManager.addMessage({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    let context = '';
    
    if (useContext) {
      try {
        console.log('[CHAT] Building context for company:', company.id);
        
        // Get recent quotes for context
        const recentQuotes = await db.getQuotesByCompanyId(company.id);
        console.log('[CHAT] Found recent quotes:', recentQuotes.length);

        // Get quote count for this month
        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);
        
        const monthlyQuoteCount = await db.getQuotesCount(company.id, thisMonth);
        console.log('[CHAT] Monthly quote count:', monthlyQuoteCount);

        // Get company data for calculator initialization
        const companyData = await db.getCompany(company.id);
        console.log('[CHAT] Company data retrieved for calculator');

        // Quote calculator configuration available for context
        // The QuoteCalculator class uses static methods, no instantiation needed
        
        // Get preferred paint products using Supabase-compatible method
        let paintProducts: PaintProduct[] = [];
        try {
          // Check if db has the new method
          const extendedDb = db as ExtendedDatabaseAdapter;
          if (typeof extendedDb.getPaintProductsByCompanyId === 'function') {
            const rawProducts = await extendedDb.getPaintProductsByCompanyId(company.id);
            paintProducts = rawProducts as PaintProduct[];
          } else {
            console.log('[CHAT] Paint products method not available, using defaults');
          }
        } catch (err) {
          console.log('[CHAT] Paint products query failed:', err);
          // Continue without paint products - use defaults
        }

        console.log('[CHAT] Paint products found:', paintProducts.length);
        if (paintProducts.length > 0) {
          console.log('[CHAT] Sample paint products:', paintProducts.slice(0, 3).map(p => ({ name: p.product_name || p.name, use_case: p.use_case, cost: p.cost_per_gallon })));
        }

        // Build context string with company information
        context = `
Company: ${company.name}
Monthly quotes used: ${monthlyQuoteCount}
Recent quote count: ${recentQuotes.length}
Company tax rate: ${companyData?.tax_rate || onboardingSettings?.taxRate || 8.25}%
Default hourly rate: $${companyData?.default_hourly_rate || onboardingSettings?.laborRate || 45}
Subscription tier: ${companyData?.subscription_tier || 'basic'}
Is first quote: ${isFirstQuote}
Onboarding settings collected: ${Object.keys(onboardingSettings || {}).join(', ') || 'none'}

Paint products preferences: ${paintProducts.length > 0 ? paintProducts.map((p: PaintProduct) => p.name || p.product_name).join(', ') : 'Using default product recommendations'}

Available quote types: Residential Interior, Residential Exterior, Commercial Interior, Commercial Exterior

Conversation context is tracked for this session.

Calculator instance available with company settings.
        `.trim();

        console.log('[CHAT] Context built successfully, length:', context.length);
      } catch (error) {
        console.error('[CHAT] Error building context:', error);
        context = `
Company: ${company.name}
Basic context available. Some features may be limited due to data access issues.
Calculator instance available with default settings.
        `.trim();
      }
    }

    console.log('[CHAT] Calling quote assistant with context length:', context.length);

    // Get AI response with full conversation history
    const quoteContext = {
      companyId: company.id
    };
    
    // Pass the full conversation history to maintain memory
    const conversationHistory = conversationManager.getMessages();
    const aiResponse = await quoteAssistant.processMessage(message, quoteContext, conversationHistory);
    
    console.log('[CHAT] AI response received, length:', aiResponse.length);

    // Add AI response to conversation
    conversationManager.addMessage({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });

    // Check if user is ready to review or if quote is complete
    const userWantsReview = quoteAssistant.isReadyToReview(message);
    const hasMinimumInfo = quoteAssistant.hasMinimumQuoteInformation(quoteContext, conversationHistory);
    const aiGeneratedCompleteQuote = quoteAssistant.isQuoteComplete(aiResponse);
    
    // Quote is ready if:
    // 1. User expresses readiness AND we have minimum info, OR
    // 2. AI has generated a complete quote (determined it has all info needed)
    const isQuoteComplete = (userWantsReview && hasMinimumInfo) || aiGeneratedCompleteQuote;
    
    let quoteData: any = null;
    if (isQuoteComplete) {
      // Parse the conversation to extract quote data
      const fullConversation = conversationManager.getMessages()
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');
      
      try {
        const parsedData: any = await quoteAssistant.parseQuoteInformation(fullConversation);
        console.log('[CHAT] Parsed quote data:', parsedData);
        
        // Set quoteData if we have enough information OR user expressed readiness
        const hasBasicInfo = parsedData.customerName && 
                            (parsedData.measurements?.wallSqft || 
                             parsedData.measurements?.linearFeetWalls ||
                             userWantsReview); // Allow with less info if user wants to review
        
        if (hasBasicInfo) {
          quoteData = {
            ...parsedData,
            pricing: {
              total: 0,
              materials: { total: 0 },
              labor: { total: 0 },
              breakdown: {}
            }
          };
          
          // Extract pricing from the AI response and full conversation
          const fullText = fullConversation + ' ' + aiResponse;
          
          // Use parsed data pricing if available, otherwise extract from text
          if ((parsedData as any).pricing) {
            quoteData.pricing = {
              ...quoteData.pricing,
              ...(parsedData as any).pricing
            };
          } else {
            const priceMatch = fullText.match(/\$[\d,]+(?:\.\d{2})?/g);
            
            if (priceMatch && priceMatch.length > 0) {
              // Get all prices and find the total
              const prices = priceMatch.map(p => parseFloat(p.replace(/[$,]/g, '')));
              
              // Look for explicit total mentions
              const totalMatch = fullText.match(/(?:total|total\s+cost|total\s+price|final\s+price)[:\s]*\$?([\d,]+(?:\.\d{2})?)/i);
              if (totalMatch) {
                quoteData.pricing.total = parseFloat(totalMatch[1].replace(/,/g, ''));
              } else {
                quoteData.pricing.total = Math.max(...prices);
              }
              
              // Extract materials and labor with better patterns
              const materialMatch = fullText.match(/(?:materials?|paint|supplies)[:\s]*\$?([\d,]+(?:\.\d{2})?)/i);
              const laborMatch = fullText.match(/(?:labor|labour)[:\s]*\$?([\d,]+(?:\.\d{2})?)/i);
              
              if (materialMatch) {
                quoteData.pricing.materials.total = parseFloat(materialMatch[1].replace(/,/g, ''));
              }
              if (laborMatch) {
                quoteData.pricing.labor.total = parseFloat(laborMatch[1].replace(/,/g, ''));
              }
              
              // Extract detailed breakdown items
              const gallonMatch = fullText.match(/(\d+)\s*gallons?[^$]*\$?([\d,]+(?:\.\d{2})?)/gi);
              const hoursMatch = fullText.match(/(\d+)\s*hours?[^$]*\$?([\d,]+(?:\.\d{2})?)/gi);
              
              if (gallonMatch) {
                gallonMatch.forEach((match, i) => {
                  const parts = match.match(/(\d+)\s*gallons?[^$]*\$?([\d,]+(?:\.\d{2})?)/i);
                  if (parts) {
                    const gallons = parseInt(parts[1]);
                    const cost = parseFloat(parts[2].replace(/,/g, ''));
                    if (i === 0) quoteData.pricing.breakdown.wallPaint = { gallons, cost };
                  }
                });
              }
              
              if (hoursMatch) {
                hoursMatch.forEach((match, i) => {
                  const parts = match.match(/(\d+)\s*hours?[^$]*\$?([\d,]+(?:\.\d{2})?)/i);
                  if (parts) {
                    const hours = parseInt(parts[1]);
                    const cost = parseFloat(parts[2].replace(/,/g, ''));
                    if (i === 0) quoteData.pricing.breakdown.painting = { hours, cost };
                  }
                });
              }
            }
          }
          
          // If user wants to review but we don't have pricing yet, create basic structure
          if (userWantsReview && quoteData.pricing.total === 0) {
            // Set a placeholder or try to extract from conversation context
            const basicPriceMatch = fullConversation.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/g);
            if (basicPriceMatch) {
              const price = parseFloat(basicPriceMatch[basicPriceMatch.length - 1].replace(/[$,]/g, ''));
              if (price > 100) { // Reasonable quote minimum
                quoteData.pricing.total = price;
                quoteData.pricing.materials.total = Math.round(price * 0.4); // Estimate 40% materials
                quoteData.pricing.labor.total = Math.round(price * 0.6); // Estimate 60% labor
              }
            }
          }
        }
      } catch (error) {
        console.error('[CHAT] Error parsing quote data:', error);
      }
    }

    return NextResponse.json({ 
      response: aiResponse,
      sessionId,
      contextUsed: useContext,
      companyName: company.name,
      isComplete: isQuoteComplete,
      quoteData,
      userWantsReview,
      hasMinimumInfo,
      debug: {
        userWantsReview,
        hasMinimumInfo,
        aiGeneratedCompleteQuote,
        isQuoteComplete
      }
    });

  } catch (error) {
    console.error('[CHAT] Error in chat API:', error);
    
    // Return a more helpful error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({ 
      error: 'Failed to process chat request',
      details: errorMessage
    }, { status: 500 });
  }
}