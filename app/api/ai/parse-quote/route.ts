import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';
import { quoteAssistant } from '@/lib/ai/quote-assistant';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text, conversationHistory } = await request.json();

    if (!text && !conversationHistory) {
      return NextResponse.json(
        { error: 'Text or conversation history is required' },
        { status: 400 }
      );
    }

    // Build conversation text
    let conversationText = text || '';
    
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationText = conversationHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
    }

    // Parse the quote information
    const parsedInfo = await quoteAssistant.parseQuoteInformation(conversationText);

    // Validate and clean parsed data
    const cleanedInfo = {
      customerName: parsedInfo.customerName || null,
      customerEmail: parsedInfo.customerEmail || null,
      customerPhone: parsedInfo.customerPhone || null,
      address: parsedInfo.address || null,
      projectType: parsedInfo.projectType || 'interior',
      surfaces: Array.isArray(parsedInfo.surfaces) ? parsedInfo.surfaces : [],
      rooms: Array.isArray(parsedInfo.rooms) ? parsedInfo.rooms : [],
      measurements: {
        wallSqft: parsedInfo.measurements?.wallSqft || 0,
        ceilingSqft: parsedInfo.measurements?.ceilingSqft || 0,
        trimLinearFt: parsedInfo.measurements?.trimLinearFt || 0,
        doors: parsedInfo.measurements?.doors || 0,
        windows: parsedInfo.measurements?.windows || 0
      },
      paintQuality: parsedInfo.paintQuality || null,
      prepWork: parsedInfo.prepWork || null,
      timeline: parsedInfo.timeline || null,
      specialRequests: parsedInfo.specialRequests || null
    };

    // Calculate confidence score based on completeness
    const requiredFields = ['customerName', 'address', 'projectType'];
    
    let score = 0;
    let maxScore = 0;
    
    requiredFields.forEach(field => {
      maxScore += 2;
      if (cleanedInfo[field as keyof typeof cleanedInfo]) score += 2;
    });
    
    if (cleanedInfo.surfaces.length > 0) score += 1;
    if (cleanedInfo.measurements.wallSqft > 0) score += 1;
    maxScore += 2;
    
    const confidence = Math.round((score / maxScore) * 100);

    return NextResponse.json({
      success: true,
      parsedData: cleanedInfo,
      confidence,
      isComplete: confidence >= 70
    });

  } catch (error) {
    console.error('Quote parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to parse quote information' },
      { status: 500 }
    );
  }
}