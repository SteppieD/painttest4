import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { event, timestamp: _timestamp } = await request.json();
    
    const quote = await db.getQuote(params.id);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Update tracking fields based on event type
    const updates: unknown = {
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