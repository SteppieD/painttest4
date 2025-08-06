import { NextRequest, NextResponse } from 'next/server';
import { db, UpdateCompanyData, CreateCompanyData } from '@/lib/database/adapter';
import { getCompanyFromRequest, CompanyAuth } from '@/lib/auth/simple-auth';
import { DebugLogger } from '@/lib/debug-logger';

export const dynamic = 'force-dynamic';

// POST - Complete onboarding
export async function POST(request: NextRequest) {
  const logger = new DebugLogger('ONBOARDING_API');
  let updateData: UpdateCompanyData = {};
  let company: CompanyAuth | null = null;
  
  try {
    logger.checkpoint('Starting onboarding process');
    company = getCompanyFromRequest(request);
    logger.info('Retrieved company from request', { companyId: company?.id, hasCompany: !!company });
    
    if (!company || !company.access_code || company.access_code === 'DEMO2024') {
      logger.error('No valid company in request or using demo account');
      return NextResponse.json({ error: 'Unauthorized - Please sign up for a new account' }, { status: 401 });
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
      // First try to find by ID
      existingCompany = await db.getCompany(company.id);
      logger.info('Company lookup by ID result', { 
        found: !!existingCompany,
        companyId: company.id 
      });
      
      // If not found by ID, try to find by access code
      if (!existingCompany && company.access_code) {
        logger.info('Company not found by ID, trying access code lookup');
        const allCompanies = await db.getAllCompanies();
        existingCompany = allCompanies.find(c => c.access_code === company.access_code);
        if (existingCompany) {
          logger.info('Company found by access code', { 
            companyId: existingCompany.id,
            accessCode: company.access_code 
          });
        }
      }
    } catch (dbError) {
      logger.warn('Error during company lookup', { 
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
        companyId: company.id 
      });
      existingCompany = null;
    }
    
    if (!existingCompany) {
      logger.warn('Company not found in database, will create or update', { companyId: company.id });
      // For memory adapter or when company doesn't exist, we'll try to create it
      // If that fails, we'll continue anyway since the client has the company data
      try {
        const createData: CreateCompanyData = {
          access_code: company.access_code,
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
        logger.info('Attempting to create company with data', createData);
        const newCompany = await db.createCompany(createData);
        logger.success('Company created successfully', { companyId: newCompany.id });
        existingCompany = newCompany;
      } catch (createError) {
        logger.warn('Could not create company in database', { 
          error: createError instanceof Error ? createError.message : 'Unknown error'
        });
        // Continue anyway - we'll handle this gracefully
      }
    }
    
    // Determine which adapter we're using
    const isMemoryAdapter = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.DATABASE_ADAPTER === 'memory';
    logger.info('Database adapter type', { 
      isMemoryAdapter, 
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      databaseAdapter: process.env.DATABASE_ADAPTER,
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
    
    // Update the company if it exists, otherwise create it
    logger.checkpoint('Updating or creating company');
    let updatedCompany;
    
    if (existingCompany) {
      // Company exists, update it using the actual database ID
      const companyIdToUpdate = existingCompany.id;
      try {
        updatedCompany = await db.updateCompany(companyIdToUpdate, updateData);
        logger.success('Company updated successfully', { 
          companyId: updatedCompany.id,
          onboardingCompleted: updatedCompany.onboarding_completed 
        });
      } catch (updateError) {
        logger.error('Failed to update company', updateError);
        // Continue with client-side data
      }
    } else {
      // Company doesn't exist, try to create it with onboarding data
      try {
        const createData: CreateCompanyData = {
          access_code: company.access_code,
          company_name: updateData.company_name || data.companyName || company.name || 'Unknown Company',
          name: updateData.name || data.companyName || company.name || 'Unknown Company',
          email: updateData.email || data.email || company.email || '',
          phone: updateData.phone || data.phone || '',
          tax_rate: updateData.tax_rate || data.taxRate || 0,
          onboarding_completed: updateData.onboarding_completed || (isMemoryAdapter ? true : 1),
          onboarding_step: updateData.onboarding_step || 4,
          subscription_tier: 'free',
          monthly_quote_count: 0,
          monthly_quote_limit: 10
        };
        logger.info('Creating company with onboarding data', createData);
        updatedCompany = await db.createCompany(createData);
        logger.success('Company created with onboarding data', { companyId: updatedCompany.id });
      } catch (createError) {
        logger.error('Failed to create company with onboarding data', createError);
        // Continue anyway with client-side data
      }
    }

    logger.checkpoint('Onboarding process completed');
    logger.printSummary();
    
    // Return success even if database operations failed
    // The client will update localStorage which is sufficient for the app to work
    const responseCompany = updatedCompany || existingCompany || {
      id: existingCompany?.id || company.id,
      access_code: company.access_code,
      company_name: updateData.company_name || data.companyName || company.name,
      name: updateData.name || data.companyName || company.name,
      email: updateData.email || data.email || company.email,
      phone: updateData.phone || data.phone || '',
      tax_rate: updateData.tax_rate || data.taxRate || 0,
      onboarding_completed: true,
      onboarding_step: 4
    };
    
    return NextResponse.json({ 
      success: true,
      company: responseCompany,
      message: updatedCompany ? 'Onboarding completed successfully' : 'Onboarding completed (client-side)',
      warning: !updatedCompany ? 'Database update skipped but you can continue using the app' : undefined,
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
          access_code: company.access_code,
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