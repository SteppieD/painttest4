import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { db } from '@/lib/database/adapter';

// Force dynamic rendering since we use request headers for auth
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await request.json();
    
    // Update company settings
    const updateData: any = {};
    
    if (settings.companyName) updateData.name = settings.companyName;
    if (settings.email) updateData.email = settings.email;
    if (settings.phone) updateData.phone = settings.phone;
    if (settings.taxRate !== undefined) updateData.tax_rate = settings.taxRate;
    if (settings.city) updateData.city = settings.city;
    if (settings.state) updateData.state = settings.state;
    if (settings.laborRate !== undefined) updateData.default_hourly_rate = settings.laborRate;
    if (settings.markupPercentage !== undefined) updateData.markup_percentage = settings.markupPercentage;
    if (settings.minimumJobSize !== undefined) updateData.minimum_job_size = settings.minimumJobSize;
    
    // Mark onboarding as complete
    updateData.onboarding_completed = true;
    
    await db.updateCompany(company.id, updateData);
    
    // Get updated company data
    const updatedCompany = await db.getCompany(company.id);
    
    return NextResponse.json({
      success: true,
      company: updatedCompany,
      message: 'Settings saved successfully'
    });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companyData = await db.getCompany(company.id);
    
    return NextResponse.json({
      settings: {
        companyName: companyData?.name || '',
        email: companyData?.email || '',
        phone: companyData?.phone || '',
        taxRate: companyData?.tax_rate || 8.25,
        city: companyData?.city || '',
        state: companyData?.state || '',
        laborRate: companyData?.default_hourly_rate || 45,
        markupPercentage: companyData?.markup_percentage || 30,
        minimumJobSize: companyData?.minimum_job_size || 500,
        onboardingCompleted: companyData?.onboarding_completed || false
      }
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}