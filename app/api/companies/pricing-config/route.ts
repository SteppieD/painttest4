import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { pricingConfigManager, PricingConfigManager, CompanyPricingConfig } from '@/lib/config/pricing-config';
import { SettingsIntegrationService } from '@/lib/services/settings-integration-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get user session/company
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[PRICING-CONFIG] Getting configuration for company:', company.id);

    // Get pricing configuration
    const config = await pricingConfigManager.loadConfig(company.id);
    
    if (!config) {
      // Return default configuration
      const defaultConfig = PricingConfigManager.createDefaultConfig(company.id);
      return NextResponse.json({ config: defaultConfig });
    }

    return NextResponse.json({ config });

  } catch (error) {
    console.error('[PRICING-CONFIG] Error getting configuration:', error);
    return NextResponse.json(
      { error: 'Failed to get pricing configuration' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user session/company
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const configData = await request.json();
    
    console.log('[PRICING-CONFIG] Saving configuration for company:', company.id);

    // Validate the configuration data
    if (!configData || typeof configData !== 'object') {
      return NextResponse.json(
        { error: 'Invalid configuration data' }, 
        { status: 400 }
      );
    }

    // Ensure the company ID matches
    configData.companyId = company.id;
    configData.lastUpdated = new Date();

    // Save the configuration
    await pricingConfigManager.saveConfig(configData as CompanyPricingConfig);
    
    // Clear the settings cache so new settings are loaded
    SettingsIntegrationService.clearCache(company.id);
    
    console.log('[PRICING-CONFIG] Configuration saved successfully for company:', company.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Pricing configuration saved successfully' 
    });

  } catch (error) {
    console.error('[PRICING-CONFIG] Error saving configuration:', error);
    return NextResponse.json(
      { error: 'Failed to save pricing configuration' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Alias for POST
  return POST(request);
}