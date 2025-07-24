import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = parseInt(params.id);
    
    if (isNaN(companyId)) {
      return NextResponse.json({ error: 'Invalid company ID' }, { status: 400 });
    }
    
    const company = await db.getCompany(companyId);
    
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true,
      company: company
    });
    
  } catch (error) {
    console.error('[API] Error fetching company:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch company',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}