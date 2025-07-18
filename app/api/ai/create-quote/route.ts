import { NextRequest, NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth/middleware';
import { quoteAssistant } from '@/lib/ai/quote-assistant';
import { calculator } from '@/lib/calculators/quote-calculator';
import { db } from '@/lib/database/adapter';
import { generateQuoteNumber } from '@/lib/quote-number-generator';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { conversationHistory, context, surfaces } = await request.json();

    if (!conversationHistory && !context) {
      return NextResponse.json(
        { error: 'Conversation history or context is required' },
        { status: 400 }
      );
    }

    // Parse quote information from conversation
    let quoteContext = context || {};
    
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const conversationText = conversationHistory
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');
      
      const parsedInfo = await quoteAssistant.parseQuoteInformation(conversationText);
      quoteContext = { ...quoteContext, ...parsedInfo };
    }

    // Ensure we have minimum required information
    if (!quoteContext.customerName) {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      );
    }

    // Calculate quote pricing
    let calculatorInput;
    
    if (surfaces) {
      // Use provided surfaces
      calculatorInput = {
        surfaces,
        paintQuality: quoteContext.paintQuality || 'better'
      };
    } else if (quoteContext.rooms && quoteContext.rooms.length > 0) {
      // Estimate from rooms
      calculatorInput = calculator.estimateFromRooms(
        quoteContext.rooms,
        quoteContext.paintQuality
      );
    } else if (quoteContext.measurements) {
      // Use direct measurements
      calculatorInput = {
        surfaces: {
          walls: quoteContext.measurements.wallSqft,
          ceilings: quoteContext.measurements.ceilingSqft,
          trim: quoteContext.measurements.trimLinearFt,
          doors: quoteContext.measurements.doors,
          windows: quoteContext.measurements.windows
        },
        paintQuality: quoteContext.paintQuality || 'better'
      };
    } else {
      return NextResponse.json(
        { error: 'Surface measurements or room dimensions are required' },
        { status: 400 }
      );
    }

    // Get company settings for markup and tax
    const company = await db.query(
      'SELECT default_labor_percentage, tax_rate FROM companies WHERE id = ?',
      [auth.company!.id]
    );
    
    if (company.length > 0) {
      calculatorInput.markupPercentage = company[0].default_labor_percentage || 30;
      calculatorInput.taxRate = company[0].tax_rate || 0;
    }

    // Calculate the quote
    const calculation = calculator.calculate(calculatorInput);

    // Generate quote summary
    const summary = await quoteAssistant.generateQuoteSummary(
      quoteContext,
      calculation
    );

    // Create the quote
    const quoteId = generateQuoteNumber();
    
    const quote = {
      company_id: auth.company!.id,
      quote_id: quoteId,
      customer_name: quoteContext.customerName,
      customer_email: quoteContext.customerEmail || null,
      customer_phone: quoteContext.customerPhone || null,
      address: quoteContext.address || null,
      project_type: quoteContext.projectType || 'interior',
      rooms: JSON.stringify(quoteContext.rooms || []),
      room_count: quoteContext.rooms?.length || 0,
      paint_quality: quoteContext.paintQuality || 'better',
      prep_work: quoteContext.prepWork || null,
      timeline: quoteContext.timeline || null,
      special_requests: quoteContext.specialRequests || null,
      walls_sqft: calculatorInput.surfaces.walls || 0,
      ceilings_sqft: calculatorInput.surfaces.ceilings || 0,
      trim_sqft: calculatorInput.surfaces.trim || 0,
      doors_count: calculatorInput.surfaces.doors || 0,
      windows_count: calculatorInput.surfaces.windows || 0,
      total_revenue: calculation.total,
      total_materials: calculation.materials.total,
      projected_labor: calculation.labor.total,
      base_cost: calculation.subtotal,
      markup_percentage: calculatorInput.markupPercentage || 30,
      final_price: calculation.total,
      conversation_summary: JSON.stringify(conversationHistory || []),
      status: 'draft'
    };

    // Save to database
    const result = await db.createQuote(quote);

    return NextResponse.json({
      success: true,
      quoteId,
      quote: {
        ...quote,
        id: result.id,
        summary,
        calculation
      }
    });

  } catch (error) {
    console.error('Error creating quote from conversation:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}