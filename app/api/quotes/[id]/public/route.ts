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
      surfaces: quote.surfaces,
      measurements: quote.measurements,
      pricing: quote.pricing,
      labor_cost: quote.labor_cost,
      material_cost: quote.material_cost,
      total_cost: quote.total_cost,
      created_at: quote.created_at,
      status: quote.status,
      timeline: quote.timeline,
      special_requests: quote.special_requests,
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