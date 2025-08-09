import { NextRequest, NextResponse } from 'next/server';
import { db, UpdateQuoteData } from '@/lib/database/adapter';
import { achievementService } from '@/lib/gamification/achievement-service';
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { event } = await request.json();
    
    const quote = await db.getQuote(params.id);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Update tracking fields based on event type
    const updates: UpdateQuoteData = {
      updated_at: new Date().toISOString()
    };
    
    switch (event) {
      case 'sent':
        updates.status = 'sent';
        break;
        
      case 'viewed':
        updates.status = 'viewed';
        break;
        
      case 'accepted':
        updates.status = 'accepted';
        // Track achievement for accepted quote
        if (quote.company_id) {
          await achievementService.checkQuoteAcceptedAchievements(
            quote.company_id,
            quote.total_revenue || quote.total_cost || quote.total_price
          );
        }
        break;
        
      case 'follow_up':
        // Just update the timestamp
        break;
    }

    if (Object.keys(updates).length > 0) {
      if (quote.id) {
        await db.updateQuote(quote.id, updates);
      }
      
      // Update company analytics
      await updateCompanyAnalytics(quote.company_id, event);
    }

    return NextResponse.json({ 
      success: true,
      event,
      updates 
    });

  } catch (error) {
    console.error('Error tracking quote event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

async function updateCompanyAnalytics(companyId: number, event: string) {
  // In production, this would update the quote_analytics table
  // For now, we'll just log the event
  console.log('Analytics event:', {
    companyId,
    event,
    timestamp: new Date().toISOString()
  });
}