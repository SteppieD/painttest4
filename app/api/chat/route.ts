import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { ConversationManager } from '@/lib/chat/conversation-manager';
import { QuoteCalculator } from '@/lib/calculators/quote-calculator';
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

    const { message, sessionId, useContext = true } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get or create conversation manager for this session
    let conversationManager = sessions.get(sessionId);
    if (!conversationManager) {
      conversationManager = new ConversationManager(sessionId);
      sessions.set(sessionId, conversationManager);
      console.log('[CHAT] Created new conversation manager for session:', sessionId);
    }

    // Add user message to conversation
    conversationManager.addMessage({
      role: 'user',
      content: message,
      timestamp: new Date(),
      sessionId
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

        // Initialize quote calculator with company settings
        // Calculator available for context but not used directly in response
        new QuoteCalculator({
          taxRate: companyData?.tax_rate || 8.25,
          overheadPercent: 15,
          profitMargin: 30,
          laborRate: companyData?.default_hourly_rate || 45,
          chargeRates: {
            walls: 3.50,
            ceilings: 4.00,
            baseboards: 2.50,
            crownMolding: 5.00,
            doorsWithJams: 125.00,
            windows: 75.00,
            exteriorWalls: 4.50,
            fasciaBoards: 6.00,
            soffits: 5.00,
            exteriorDoors: 150.00,
            exteriorWindows: 100.00,
          },
          hourlyRate: companyData?.default_hourly_rate || 45
        });
        
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
Company tax rate: ${companyData?.tax_rate || 8.25}%
Default hourly rate: $${companyData?.default_hourly_rate || 45}
Subscription tier: ${companyData?.subscription_tier || 'basic'}

Paint products preferences: ${paintProducts.length > 0 ? paintProducts.map((p: PaintProduct) => p.name || p.product_name).join(', ') : 'Using default product recommendations'}

Available quote types: Residential Interior, Residential Exterior, Commercial Interior, Commercial Exterior

Previous context from this conversation:
${conversationManager.getContextSummary()}

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

    // Get AI response
    const aiResponse = await quoteAssistant(message, context);
    
    console.log('[CHAT] AI response received, length:', aiResponse.length);

    // Add AI response to conversation
    conversationManager.addMessage({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      sessionId
    });

    return NextResponse.json({ 
      response: aiResponse,
      sessionId,
      contextUsed: useContext,
      companyName: company.name
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