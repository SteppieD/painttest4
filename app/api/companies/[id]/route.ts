import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { validateCompanyId } from '@/lib/validation/schemas';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate and sanitize the company ID parameter
    let validatedCompanyId: number;
    try {
      validatedCompanyId = validateCompanyId(params.id);
    } catch (error) {
      return NextResponse.json({ 
        error: 'Invalid company ID',
        details: error instanceof Error ? error.message : 'Company ID must be a positive integer'
      }, { status: 400 });
    }
    
    const company = await db.getCompany(validatedCompanyId);
    
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      company: company
    });
    
  } catch (error) {
    console.error('[API] Error fetching company:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      companyId: params.id
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch company',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}