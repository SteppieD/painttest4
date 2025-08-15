import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';
import { SettingsIntegrationService } from '@/lib/services/settings-integration-service';
import { 
  getCompanySettings,
  getAIContextString,
  quickPriceEstimate,
  calculateAdjustedRate,
  getPaintProductCosts,
  getLaborSettings,
  getTaxAndMarkupSettings,
  getCompanyLimits
} from '@/lib/helpers/settings-helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/companies/settings-integration
 * Returns comprehensive company settings for integration testing
 */
export async function GET(request: NextRequest) {
  try {
    // Get user session/company
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[SETTINGS-INTEGRATION] Getting comprehensive settings for company:', company.id);

    // Get all settings types
    const [
      comprehensiveSettings,
      aiContext,
      paintCosts,
      laborSettings,
      taxMarkupSettings,
      companyLimits
    ] = await Promise.all([
      getCompanySettings(company.id),
      getAIContextString(company.id),
      getPaintProductCosts(company.id),
      getLaborSettings(company.id),
      getTaxAndMarkupSettings(company.id),
      getCompanyLimits(company.id)
    ]);

    // Generate a quick estimate for demonstration
    const quickEstimate = await quickPriceEstimate(company.id, 1000, 300);

    // Calculate adjusted rates for different scenarios
    const adjustedRates = await Promise.all([
      calculateAdjustedRate(company.id, 1000, { 
        locationType: 'urban', 
        isRushJob: true, 
        complexity: 'detailed' 
      }),
      calculateAdjustedRate(company.id, 1000, { 
        locationType: 'rural', 
        prepWork: 'heavy', 
        ceilingHeight: 'cathedral' 
      }),
      calculateAdjustedRate(company.id, 1000, { 
        productGrade: 'premium', 
        season: 'summer' 
      })
    ]);

    const response = {
      company: {
        id: company.id,
        name: company.company_name,
        email: company.email,
        subscriptionTier: company.subscription_tier
      },
      
      // Core settings from database
      databaseSettings: {
        taxRate: comprehensiveSettings.company.tax_rate,
        defaultHourlyRate: comprehensiveSettings.company.default_hourly_rate,
        markupPercentage: comprehensiveSettings.company.markup_percentage,
        defaultWallsPaintCost: comprehensiveSettings.company.default_walls_paint_cost,
        defaultCeilingsPaintCost: comprehensiveSettings.company.default_ceilings_paint_cost,
        defaultTrimPaintCost: comprehensiveSettings.company.default_trim_paint_cost,
        defaultLaborPercentage: comprehensiveSettings.company.default_labor_percentage,
        defaultPaintCoverage: comprehensiveSettings.company.default_paint_coverage,
        defaultSundriesPercentage: comprehensiveSettings.company.default_sundries_percentage,
        overheadPercent: comprehensiveSettings.company.overhead_percent,
        minimumJobSize: comprehensiveSettings.company.minimum_job_size
      },
      
      // Advanced pricing configuration
      pricingConfig: {
        seasonalPricing: comprehensiveSettings.pricingConfig.seasonalPricing,
        locationPricing: comprehensiveSettings.pricingConfig.locationPricing,
        prepWorkMultipliers: comprehensiveSettings.pricingConfig.prepWorkMultipliers,
        complexityMultipliers: comprehensiveSettings.pricingConfig.complexityMultipliers,
        heightMultipliers: comprehensiveSettings.pricingConfig.heightMultipliers,
        rushJobMultiplier: comprehensiveSettings.pricingConfig.rushJobMultiplier,
        minimumJobPrice: comprehensiveSettings.pricingConfig.minimumJobPrice
      },
      
      // Paint products
      paintProducts: {
        count: comprehensiveSettings.paintProducts.length,
        products: comprehensiveSettings.paintProducts,
        preferred: comprehensiveSettings.computed.preferredProducts
      },
      
      // Computed settings (ready-to-use values)
      computed: comprehensiveSettings.computed,
      
      // Helper function results
      helpers: {
        paintCosts,
        laborSettings,
        taxMarkupSettings,
        companyLimits
      },
      
      // AI context string
      aiContext: {
        length: aiContext.length,
        preview: aiContext.substring(0, 500) + '...',
        full: aiContext
      },
      
      // Example calculations
      examples: {
        quickEstimate: {
          input: { wallSqft: 1000, ceilingSqft: 300, quality: 'standard' },
          result: quickEstimate
        },
        adjustedRates: [
          {
            scenario: 'Urban, Rush, Detailed',
            input: { locationType: 'urban', isRushJob: true, complexity: 'detailed' },
            result: adjustedRates[0]
          },
          {
            scenario: 'Rural, Heavy Prep, Cathedral Ceiling',
            input: { locationType: 'rural', prepWork: 'heavy', ceilingHeight: 'cathedral' },
            result: adjustedRates[1]
          },
          {
            scenario: 'Premium Paint, Summer Season',
            input: { productGrade: 'premium', season: 'summer' },
            result: adjustedRates[2]
          }
        ]
      },
      
      // Integration status
      integration: {
        status: 'active',
        featuresEnabled: [
          'Database Settings',
          'Advanced Pricing Config',
          'Paint Products',
          'Seasonal Adjustments',
          'Location Pricing',
          'Prep Work Multipliers',
          'Complexity Adjustments',
          'Height Adjustments',
          'Rush Job Surcharges',
          'AI Context Integration',
          'Quote Calculator Integration'
        ],
        cacheStatus: 'active',
        lastUpdated: new Date().toISOString()
      }
    };

    console.log('[SETTINGS-INTEGRATION] Settings retrieved successfully:', {
      companyId: company.id,
      paintProductsCount: comprehensiveSettings.paintProducts.length,
      aiContextLength: aiContext.length,
      quickEstimateTotal: quickEstimate.recommended
    });

    return NextResponse.json(response);

  } catch (error) {
    console.error('[SETTINGS-INTEGRATION] Error getting settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get settings integration data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

/**
 * POST /api/companies/settings-integration/calculate
 * Calculate a quote using the enhanced calculator with all settings
 */
export async function POST(request: NextRequest) {
  try {
    // Get user session/company
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestData = await request.json();
    
    console.log('[SETTINGS-INTEGRATION] Calculating quote with settings for company:', company.id);

    // Import the enhanced calculator
    const { EnhancedQuoteCalculator } = await import('@/lib/calculators/enhanced-quote-calculator');
    
    // Prepare calculator input
    const calculatorInput = {
      companyId: company.id,
      surfaces: requestData.surfaces || {},
      paintProducts: requestData.paintProducts,
      projectDetails: requestData.projectDetails || {},
      overrides: requestData.overrides
    };

    // Calculate the quote
    const quote = await EnhancedQuoteCalculator.calculate(calculatorInput);
    
    console.log('[SETTINGS-INTEGRATION] Quote calculated successfully:', {
      total: quote.total,
      adjustments: quote.adjustmentsSummary.totalMultiplier
    });

    return NextResponse.json({
      success: true,
      input: calculatorInput,
      quote,
      integration: {
        settingsUsed: quote.usedSettings,
        adjustmentsApplied: quote.adjustmentsSummary,
        calculatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[SETTINGS-INTEGRATION] Error calculating quote:', error);
    return NextResponse.json(
      { 
        error: 'Failed to calculate quote with settings',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}