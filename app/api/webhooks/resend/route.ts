import { NextRequest, NextResponse } from 'next/server';
import { ResendWebhookEvent } from '@/lib/email/types';

export const dynamic = 'force-dynamic';

// Simple webhook signature verification (production should use proper HMAC verification)
function verifyWebhookSignature(body: string, signature: string | null, secret: string | undefined): boolean {
  if (!signature || !secret) {
    console.warn('[WEBHOOK] Missing signature or secret - skipping verification');
    return true; // Allow for development/testing
  }
  
  // In production, implement proper HMAC-SHA256 verification
  // For now, just check if signature exists
  return signature.length > 0;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('resend-signature');
    
    console.log('[WEBHOOK] Received Resend webhook');

    // Verify webhook authenticity
    const isValidSignature = verifyWebhookSignature(
      body,
      signature,
      process.env.RESEND_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      console.error('[WEBHOOK] Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse webhook data
    let event: ResendWebhookEvent;
    try {
      event = JSON.parse(body);
    } catch (parseError) {
      console.error('[WEBHOOK] Failed to parse webhook body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Handle different event types
    await handleEmailEvent(event);

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('[WEBHOOK] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleEmailEvent(event: ResendWebhookEvent) {
  console.log(`[WEBHOOK] Processing ${event.type} for email ${event.data.email_id}`);

  switch (event.type) {
    case 'email.delivered':
      console.log(`[EMAIL] Delivered: ${event.data.email_id} to ${event.data.to}`);
      // TODO: Update email status in database
      break;

    case 'email.bounced':
      console.log(`[EMAIL] Bounced: ${event.data.email_id} to ${event.data.to}`);
      // TODO: Mark email as bounced, potentially suppress recipient
      break;

    case 'email.opened':
      console.log(`[EMAIL] Opened: ${event.data.email_id} by ${event.data.to}`);
      // TODO: Track email open for analytics
      break;

    case 'email.clicked':
      console.log(`[EMAIL] Clicked: ${event.data.email_id} by ${event.data.to}`);
      // TODO: Track email click for analytics
      break;

    case 'email.complained':
      console.log(`[EMAIL] Complained: ${event.data.email_id} from ${event.data.to}`);
      // TODO: Handle spam complaint, suppress recipient
      break;

    default:
      console.log(`[WEBHOOK] Unknown event type: ${event.type}`);
  }

  // TODO: Store event in database for analytics
  // await db.createEmailEvent({
  //   email_id: event.data.email_id,
  //   event_type: event.type,
  //   recipient: event.data.to,
  //   created_at: event.created_at,
  //   data: event.data
  // });
}