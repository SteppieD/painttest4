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

    // Check if the quote is complete by looking for key indicators
    const isQuoteComplete = aiResponse.toLowerCase().includes('total project cost') || 
                          aiResponse.toLowerCase().includes('total: $') ||
                          (aiResponse.toLowerCase().includes('finalize') && aiResponse.toLowerCase().includes('quote'));
    
    let quoteData = null;
    if (isQuoteComplete) {
      // Parse the conversation to extract quote data
      const fullConversation = conversationManager.getMessages()
        .map(m => `${m.role}: ${m.content}`)
        .join('\n');
      
      try {
        const parsedData = await quoteAssistant.parseQuoteInformation(fullConversation);
        console.log('[CHAT] Parsed quote data:', parsedData);
        
        // Only set quoteData if we have enough information
        if (parsedData.customerName && (parsedData.measurements?.wallSqft || parsedData.measurements?.linearFeetWalls)) {
          quoteData = {
            ...parsedData,
            pricing: {
              total: 0, // This will be calculated based on the conversation
              materials: { total: 0 },
              labor: { total: 0 }
            }
          };
          
          // Extract pricing from the conversation
          const priceMatch = aiResponse.match(/\$[\d,]+(?:\.\d{2})?/g);
          if (priceMatch && priceMatch.length > 0) {
            // Get the last/largest price as the total
            const prices = priceMatch.map(p => parseFloat(p.replace(/[$,]/g, '')));
            quoteData.pricing.total = Math.max(...prices);
            
            // Try to extract materials and labor
            const materialMatch = aiResponse.match(/(?:materials?|paint)[:\s]+\$?([\d,]+(?:\.\d{2})?)/i);
            const laborMatch = aiResponse.match(/(?:labor)[:\s]+\$?([\d,]+(?:\.\d{2})?)/i);
            
            if (materialMatch) {
              quoteData.pricing.materials.total = parseFloat(materialMatch[1].replace(/,/g, ''));
            }
            if (laborMatch) {
              quoteData.pricing.labor.total = parseFloat(laborMatch[1].replace(/,/g, ''));
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
      quoteData
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