import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

// POST - Complete onboarding
export async function POST(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    console.log('[ONBOARDING] Received data:', data);
    console.log('[ONBOARDING] Updating company:', company.id);
    
    // Prepare update data
    const updateData: any = {
      company_name: data.companyName || company.name,
      email: data.email || company.email,
      phone: data.phone || '',
      tax_rate: data.taxRate || 0,
      onboarding_completed: true,
      onboarding_step: 4,
      setup_completed_at: new Date().toISOString()
    };
    
    // Also update additional fields if provided
    if (data.city) updateData.city = data.city;
    if (data.state) updateData.state = data.state;
    if (data.laborRate) updateData.default_hourly_rate = data.laborRate;
    if (data.markupPercentage) updateData.default_labor_percentage = data.markupPercentage;
    if (data.minimumJobSize) updateData.minimum_job_size = data.minimumJobSize;
    
    console.log('[ONBOARDING] Update data:', updateData);
    
    // Update the company
    const updatedCompany = await db.updateCompany(company.id, updateData);
    
    console.log('[ONBOARDING] Company updated successfully');

    return NextResponse.json({ 
      success: true,
      company: updatedCompany,
      message: 'Onboarding completed successfully'
    });

  } catch (error) {
    console.error('[ONBOARDING] Error completing onboarding:', error);
    console.error('[ONBOARDING] Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { 
        error: 'Failed to complete onboarding',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown'
      },
      { status: 500 }
    );
  }
}

// GET - Get onboarding status
export async function GET(request: NextRequest) {
  try {
    const company = getCompanyFromRequest(request);
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyData = await db.getCompany(company.id);
    
    return NextResponse.json({ 
      success: true,
      onboarding: {
        completed: companyData?.onboarding_completed || false,
        step: companyData?.onboarding_step || 0
      }
    });

  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch onboarding status' },
      { status: 500 }
    );
  }
}