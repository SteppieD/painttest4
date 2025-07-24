import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

// POST - Complete onboarding
export async function POST(request: NextRequest) {
  let updateData: any = {};
  let company: any = null;
  
  try {
    company = getCompanyFromRequest(request);
    
    if (!company) {
      console.error('[ONBOARDING] No company in request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    console.log('[ONBOARDING] Company from request:', company);
    console.log('[ONBOARDING] Received data:', data);
    console.log('[ONBOARDING] Updating company:', company.id);
    
    // Verify company exists in database
    let existingCompany;
    try {
      existingCompany = await db.getCompany(company.id);
    } catch (dbError) {
      console.error('[ONBOARDING] Database error when getting company:', dbError);
      existingCompany = null;
    }
    
    if (!existingCompany) {
      console.error('[ONBOARDING] Company not found in database:', company.id);
      // Always create the company if it doesn't exist (for ephemeral companies)
      console.log('[ONBOARDING] Creating company in memory store');
      try {
        const newCompany = await db.createCompany({
          id: company.id,
          access_code: company.accessCode,
          company_name: data.companyName || company.name || 'Unknown Company',
          name: data.companyName || company.name || 'Unknown Company',
          email: data.email || company.email || '',
          phone: data.phone || '',
          onboarding_completed: false,
          onboarding_step: 0,
          tax_rate: 0,
          subscription_tier: 'free',
          monthly_quote_count: 0,
          monthly_quote_limit: 5
        });
        console.log('[ONBOARDING] Company created successfully:', newCompany);
      } catch (createError) {
        console.error('[ONBOARDING] Failed to create company:', createError);
        return NextResponse.json({ 
          error: 'Failed to create company', 
          details: createError instanceof Error ? createError.message : 'Unknown error' 
        }, { status: 500 });
      }
    }
    
    // Determine which adapter we're using
    const isMemoryAdapter = !process.env.SUPABASE_URL && (process.env.NODE_ENV === 'production' || process.env.VERCEL);
    
    // Prepare update data - ensure we use the provided data first, then fall back to company data
    updateData = {
      company_name: data.companyName || company.name || 'Unknown Company',
      email: data.email || company.email || '',
      phone: data.phone || '',
      tax_rate: data.taxRate !== undefined ? data.taxRate : 0,
      onboarding_completed: isMemoryAdapter ? true : 1, // Memory adapter uses boolean, SQLite uses 1
      onboarding_step: 4,
      setup_completed_at: new Date().toISOString()
    };
    
    // Also update additional fields if provided
    // Note: city and state columns don't exist in the current schema
    // Store them in the address field as a workaround
    if (data.city || data.state) {
      const cityState = [data.city, data.state].filter(Boolean).join(', ');
      if (cityState) updateData.address = cityState;
    }
    if (data.laborRate) updateData.default_hourly_rate = data.laborRate;
    if (data.markupPercentage) updateData.default_labor_percentage = data.markupPercentage;
    // Note: minimum_job_size column doesn't exist in current schema, skip it
    
    console.log('[ONBOARDING] Update data:', updateData);
    
    // Update the company with additional error handling
    let updatedCompany;
    try {
      updatedCompany = await db.updateCompany(company.id, updateData);
      console.log('[ONBOARDING] Company updated successfully:', updatedCompany);
    } catch (updateError) {
      console.error('[ONBOARDING] Failed to update company:', updateError);
      console.error('[ONBOARDING] Update error details:', {
        companyId: company.id,
        updateData,
        errorMessage: updateError instanceof Error ? updateError.message : 'Unknown error',
        errorStack: updateError instanceof Error ? updateError.stack : 'No stack'
      });
      
      // Try to recover by creating the company if update failed
      try {
        console.log('[ONBOARDING] Attempting to create company after update failure');
        const createData = {
          id: company.id,
          access_code: company.accessCode,
          ...updateData
        };
        updatedCompany = await db.createCompany(createData);
        console.log('[ONBOARDING] Company created as fallback:', updatedCompany);
      } catch (createError) {
        console.error('[ONBOARDING] Failed to create company as fallback:', createError);
        throw updateError; // Throw the original error
      }
    }

    return NextResponse.json({ 
      success: true,
      company: updatedCompany,
      message: 'Onboarding completed successfully'
    });

  } catch (error) {
    console.error('[ONBOARDING] Error completing onboarding:', error);
    console.error('[ONBOARDING] Error stack:', error instanceof Error ? error.stack : 'No stack');
    console.error('[ONBOARDING] Error details:', {
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      companyId: company?.id,
      updateData: updateData
    });
    
    // Return more detailed error info for debugging
    return NextResponse.json(
      { 
        error: 'Failed to complete onboarding',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown',
        // Include debugging info in development/Vercel
        debug: process.env.NODE_ENV !== 'production' || process.env.VERCEL ? {
          companyId: company?.id,
          errorStack: error instanceof Error ? error.stack?.split('\n').slice(0, 3).join('\n') : 'No stack'
        } : undefined
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