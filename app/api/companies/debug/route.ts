import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'No company in request' }, { status: 401 });
    }

    // Get company from database
    const dbCompany = await db.getCompany(company.id);
    
    // Get all companies to debug
    const allCompanies = await db.getAllCompanies();
    
    return NextResponse.json({
      requestCompany: company,
      databaseCompany: dbCompany,
      companyExists: !!dbCompany,
      allCompaniesCount: allCompanies.length,
      allCompanyIds: allCompanies.map(c => ({ id: c.id, accessCode: c.access_code, name: c.company_name }))
    });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Debug failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'No company in request' }, { status: 401 });
    }

    const body = await request.json();
    
    // Try to create a test company
    if (body.action === 'create') {
      const created = await db.createCompany({
        id: company.id,
        access_code: company.accessCode,
        company_name: body.name || 'Test Company',
        name: body.name || 'Test Company',
        email: body.email || 'test@example.com',
        phone: body.phone || '555-1234'
      });
      
      return NextResponse.json({
        message: 'Company created',
        company: created
      });
    }
    
    // Try to update the company
    if (body.action === 'update') {
      const updated = await db.updateCompany(company.id, {
        company_name: body.name || 'Updated Company',
        email: body.email || 'updated@example.com',
        phone: body.phone || '555-5678'
      });
      
      return NextResponse.json({
        message: 'Company updated',
        company: updated
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Debug operation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}