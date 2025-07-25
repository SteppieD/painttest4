import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { DebugLogger } from '@/lib/debug-logger';

export const dynamic = 'force-dynamic';

// POST - Complete onboarding
export async function POST(request: NextRequest) {
  const logger = new DebugLogger('ONBOARDING_API');
  let updateData: any = {};
  let company: any = null;
  
  try {
    logger.checkpoint('Starting onboarding process');
    company = getCompanyFromRequest(request);
    logger.info('Retrieved company from request', { companyId: company?.id, hasCompany: !!company });
    
    if (!company) {
      logger.error('No company in request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    logger.checkpoint('Parsing request body');
    const data = await request.json();
    logger.info('Received form data', { 
      fields: Object.keys(data),
      hasCompanyName: !!data.companyName,
      hasEmail: !!data.email,
      taxRate: data.taxRate 
    });
    
    // Verify company exists in database
    logger.checkpoint('Checking if company exists in database');
    let existingCompany;
    try {
      existingCompany = await db.getCompany(company.id);
      logger.info('Company lookup result', { 
        found: !!existingCompany,
        companyId: company.id 
      });
    } catch (dbError) {
      logger.error('Database error when getting company', dbError);
      existingCompany = null;
    }
    
    if (!existingCompany) {
      logger.warn('Company not found in database, creating new one', { companyId: company.id });
      try {
        const createData = {
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
        };
        logger.info('Creating company with data', createData);
        const newCompany = await db.createCompany(createData);
        logger.success('Company created successfully', { companyId: newCompany.id });
      } catch (createError) {
        logger.error('Failed to create company', createError);
        logger.printSummary();
        return NextResponse.json({ 
          error: 'Failed to create company', 
          details: createError instanceof Error ? createError.message : 'Unknown error',
          debugSummary: logger.getSummary()
        }, { status: 500 });
      }
    }
    
    // Determine which adapter we're using
    const isMemoryAdapter = !process.env.SUPABASE_URL && (process.env.NODE_ENV === 'production' || process.env.VERCEL);
    logger.info('Database adapter type', { 
      isMemoryAdapter, 
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      nodeEnv: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL
    });
    
    // Prepare update data - ensure we use the provided data first, then fall back to company data
    logger.checkpoint('Preparing update data');
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
    
    logger.info('Prepared update data', updateData);
    
    // Update the company with additional error handling
    logger.checkpoint('Updating company');
    let updatedCompany;
    try {
      updatedCompany = await db.updateCompany(company.id, updateData);
      logger.success('Company updated successfully', { 
        companyId: updatedCompany.id,
        onboardingCompleted: updatedCompany.onboarding_completed 
      });
    } catch (updateError) {
      logger.error('Failed to update company', updateError);
      
      // Try to recover by creating the company if update failed
      logger.warn('Attempting to create company after update failure');
      try {
        const createData = {
          id: company.id,
          access_code: company.accessCode,
          ...updateData
        };
        logger.info('Fallback create data', createData);
        updatedCompany = await db.createCompany(createData);
        logger.success('Company created as fallback', { companyId: updatedCompany.id });
      } catch (createError) {
        logger.error('Failed to create company as fallback', createError);
        logger.printSummary();
        throw updateError; // Throw the original error
      }
    }

    logger.checkpoint('Onboarding completed successfully');
    logger.printSummary();
    
    return NextResponse.json({ 
      success: true,
      company: updatedCompany,
      message: 'Onboarding completed successfully',
      debugSummary: logger.getSummary()
    });

  } catch (error) {
    logger.error('Error completing onboarding', error);
    logger.printSummary();
    
    // For now, if database update fails, return success anyway
    // This allows users to complete onboarding even if there's a database issue
    // The client will update localStorage which is used for auth
    if (company && company.id) {
      logger.warn('Database update failed, but returning success for client-side completion');
      
      return NextResponse.json({ 
        success: true,
        company: {
          id: company.id,
          access_code: company.accessCode,
          company_name: updateData.company_name || company.name,
          email: updateData.email || company.email,
          phone: updateData.phone || '',
          tax_rate: updateData.tax_rate || 0,
          onboarding_completed: true,
          onboarding_step: 4
        },
        message: 'Onboarding completed (client-side)',
        warning: 'Database update failed but you can continue using the app',
        debugSummary: logger.getSummary()
      });
    }
    
    // Return more detailed error info for debugging
    return NextResponse.json(
      { 
        error: 'Failed to complete onboarding',
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.name : 'Unknown',
        debugSummary: logger.getSummary(),
        // Include debugging info in development/Vercel
        debug: process.env.NODE_ENV !== 'production' || process.env.VERCEL ? {
          companyId: company?.id,
          updateData: updateData,
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