import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quote = await db.getQuote(params.id);
    
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Get company information
    const company = await db.getCompany(quote.company_id);

    // Return sanitized quote data for public viewing
    return NextResponse.json({
      id: quote.id,
      quote_id: quote.quote_id,
      customer_name: quote.customer_name,
      customer_email: quote.customer_email,
      customer_phone: quote.customer_phone,
      address: quote.address,
      project_type: quote.project_type,
      rooms: quote.rooms,
      total_revenue: quote.total_revenue,
      final_price: quote.final_price,
      base_cost: quote.base_cost,
      total_materials: quote.total_materials,
      projected_labor: quote.projected_labor,
      markup_percentage: quote.markup_percentage,
      created_at: quote.created_at,
      status: quote.status,
      walls_sqft: quote.walls_sqft,
      paint_quality: quote.paint_quality,
      timeline: quote.timeline,
      special_requests: quote.special_requests,
      conversation_summary: quote.conversation_summary,
      paint_cost: quote.paint_cost,
      sundries_cost: quote.sundries_cost,
      tax_rate: quote.tax_rate,
      tax_amount: quote.tax_amount,
      subtotal: quote.subtotal,
      company: company ? {
        name: company.name || company.company_name,
        email: company.email,
        phone: company.phone
      } : null
    });

  } catch (error) {
    console.error('Error fetching public quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}