import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getAuthContext } from '@/lib/auth/middleware';

// GET - Get company information
export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const companyId = searchParams.get('id');

    // If specific company ID requested
    if (companyId) {
      // Admin can view any company
      if (auth.type === 'admin') {
        const company = await db.query(
          'SELECT * FROM companies WHERE id = ?',
          [parseInt(companyId)]
        );
        
        if (company.length === 0) {
          return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
        
        return NextResponse.json({ company: company[0] });
      }
      
      // Company users can only view their own company
      if (auth.type === 'company' && auth.company?.id === parseInt(companyId)) {
        const company = await db.query(
          'SELECT * FROM companies WHERE id = ?',
          [parseInt(companyId)]
        );
        
        if (company.length === 0) {
          return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }
        
        return NextResponse.json({ company: company[0] });
      }
      
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get current company for authenticated user
    if (auth.type === 'company') {
      const company = await db.query(
        'SELECT * FROM companies WHERE id = ?',
        [auth.company!.id]
      );
      
      if (company.length === 0) {
        return NextResponse.json({ error: 'Company not found' }, { status: 404 });
      }
      
      return NextResponse.json({ company: company[0] });
    }

    // Admin can get all companies
    if (auth.type === 'admin') {
      const companies = await db.query('SELECT * FROM companies ORDER BY company_name');
      return NextResponse.json({ companies });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company information' },
      { status: 500 }
    );
  }
}

// PUT - Update company information
export async function PUT(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, updates } = await request.json();

    if (!id || !updates) {
      return NextResponse.json(
        { error: 'Company ID and updates are required' },
        { status: 400 }
      );
    }

    // Company users can only update their own company
    if (auth.type === 'company' && auth.company?.id !== id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update the company
    const result = await db.updateCompany(id, updates);

    return NextResponse.json({
      success: true,
      company: result
    });

  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { error: 'Failed to update company' },
      { status: 500 }
    );
  }
}

// POST - Create new company (admin only)
export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthContext(request);
    if (!auth || auth.type !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.access_code || !data.company_name) {
      return NextResponse.json(
        { error: 'Access code and company name are required' },
        { status: 400 }
      );
    }

    // Check if access code already exists
    const existing = await db.getCompanyByAccessCode(data.access_code);
    if (existing) {
      return NextResponse.json(
        { error: 'Access code already exists' },
        { status: 409 }
      );
    }

    // Create the company
    const company = await db.createCompany({
      access_code: data.access_code.toUpperCase(),
      company_name: data.company_name,
      phone: data.phone || null,
      email: data.email || null,
      is_trial: data.is_trial || false,
      quote_limit: data.quote_limit || null
    });

    return NextResponse.json({
      success: true,
      company
    });

  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    );
  }
}