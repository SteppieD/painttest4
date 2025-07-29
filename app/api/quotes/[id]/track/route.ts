import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { event, timestamp } = await request.json();
    
    const quote = await db.getQuote(params.id);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Update tracking fields based on event type
    const updates: any = {};
    
    switch (event) {
      case 'sent':
        updates.sent_at = timestamp || new Date().toISOString();
        // Calculate response time if quote was created
        if (quote.created_at) {
          const createdAt = new Date(quote.created_at);
          const sentAt = new Date(updates.sent_at);
          const hoursElapsed = Math.round((sentAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
          updates.response_time_hours = hoursElapsed;
        }
        break;
        
      case 'viewed':
        if (!quote.viewed_at) { // Only track first view
          updates.viewed_at = timestamp || new Date().toISOString();
        }
        break;
        
      case 'accepted':
        updates.accepted_at = timestamp || new Date().toISOString();
        updates.status = 'accepted';
        break;
        
      case 'follow_up':
        updates.follow_up_count = (quote.follow_up_count || 0) + 1;
        updates.last_follow_up_at = timestamp || new Date().toISOString();
        break;
    }

    if (Object.keys(updates).length > 0) {
      await db.updateQuote(parseInt(params.id), updates);
      
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