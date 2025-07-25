import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export const dynamic = 'force-dynamic';

// GET company settings
export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get full company data including tax_rate
    const companyData = await db.getCompany(company.id);
    
    if (!companyData) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      company: {
        id: companyData.id,
        company_name: companyData.company_name || companyData.name,
        email: companyData.email,
        phone: companyData.phone,
        tax_rate: companyData.tax_rate || 0
      }
    });

  } catch (error) {
    console.error('Error fetching company settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update company settings
export async function PUT(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();
    
    // Prepare update data
    const updateData: any = {};
    
    if (updates.company_name !== undefined) {
      updateData.company_name = updates.company_name;
      updateData.name = updates.company_name; // Also update name field for compatibility
    }
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.tax_rate !== undefined) updateData.tax_rate = updates.tax_rate;
    
    // Update the company
    const updatedCompany = await db.updateCompany(company.id, updateData);

    return NextResponse.json({ 
      success: true,
      company: updatedCompany,
      message: 'Settings updated successfully'
    });

  } catch (error) {
    console.error('Error updating company settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update settings',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}