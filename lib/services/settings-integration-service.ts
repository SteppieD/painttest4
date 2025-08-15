/**
 * Settings Integration Service
 * 
 * Centralizes the management and integration of ALL company settings across:
 * - Database company settings
 * - Advanced pricing config
 * - Paint products
 * - Quote calculator
 * - AI assistant
 */

import { db, Company, PaintProduct } from '@/lib/database/adapter';
import { 
  CompanyPricingConfig, 
  PricingConfigManager,
  SeasonalPricing,
  LocationPricing,
  ProductGradePricing,
  BasePricingRates
} from '@/lib/config/pricing-config';

export interface ComprehensiveSettings {
  // Core company settings from database
  company: Company;
  
  // Paint products
  paintProducts: PaintProduct[];
  
  // Advanced pricing configuration
  pricingConfig: CompanyPricingConfig;
  
  // Computed settings for easy access
  computed: {
    // Labor settings
    hourlyRate: number;
    laborPercentage: number;
    
    // Material costs
    wallsPaintCost: number;
    ceilingsPaintCost: number;
    trimPaintCost: number;
    
    // Coverage rates
    paintCoverage: number;
    sundriesToPercentage: number;
    
    // Tax and markup
    taxRate: number;
    markupPercentage: number;
    overheadPercent: number;
    profitMargin: number;
    
    // Minimum pricing
    minimumJobPrice: number;
    
    // Seasonal and location adjustments
    currentSeasonMultiplier: number;
    defaultLocationMultiplier: number;
    
    // Preferred paint products by use case
    preferredProducts: {
      walls: PaintProduct | null;
      ceilings: PaintProduct | null;
      trim: PaintProduct | null;
      primer: PaintProduct | null;
    };
  };
}

export interface QuoteCalculatorSettings {
  // Labor rates
  hourlyRate: number;
  laborPercentage: number;
  
  // Paint costs (per gallon)
  wallsPaintCost: number;
  ceilingsPaintCost: number;
  trimPaintCost: number;
  primerCost: number;
  
  // Coverage rates (sq ft per gallon)
  wallsCoverage: number;
  ceilingsCoverage: number;
  primerCoverage: number;
  
  // Business costs
  taxRate: number;
  markupPercentage: number;
  overheadPercent: number;
  profitMargin: number;
  sundriesToPercentage: number;
  
  // Minimum pricing
  minimumJobPrice: number;
  
  // Adjustments
  seasonalMultiplier: number;
  locationMultiplier: number;
  rushJobMultiplier: number;
  
  // Paint products
  paintProducts: PaintProduct[];
}

export interface PricingOptions {
  productGrade?: 'economy' | 'standard' | 'premium' | 'luxury';
  locationType?: 'urban' | 'suburban' | 'rural';
  customLocation?: string;
  season?: keyof SeasonalPricing;
  isRushJob?: boolean;
  prepWork?: 'none' | 'light' | 'moderate' | 'heavy' | 'extreme';
  complexity?: 'simple' | 'standard' | 'detailed' | 'highDetail' | 'custom';
  ceilingHeight?: 'standard' | 'high' | 'veryHigh' | 'cathedral';
}

export class SettingsIntegrationService {
  private static settingsCache = new Map<number, ComprehensiveSettings>();
  private static cacheExpiry = new Map<number, number>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Get all company settings - the main entry point
   */
  static async getCompanySettings(companyId: number): Promise<ComprehensiveSettings> {
    // Check cache first
    const cached = this.getCachedSettings(companyId);
    if (cached) {
      return cached;
    }

    console.log('[SettingsIntegrationService] Loading comprehensive settings for company:', companyId);

    try {
      // Fetch all settings in parallel for performance
      const [company, paintProducts, pricingConfig] = await Promise.all([
        this.fetchCompanyData(companyId),
        this.fetchPaintProducts(companyId),
        this.fetchPricingConfig(companyId)
      ]);

      const settings: ComprehensiveSettings = {
        company,
        paintProducts,
        pricingConfig,
        computed: this.computeSettings(company, paintProducts, pricingConfig)
      };

      // Cache the settings
      this.cacheSettings(companyId, settings);

      console.log('[SettingsIntegrationService] Settings loaded successfully:', {
        companyName: company.company_name,
        paintProductsCount: paintProducts.length,
        hourlyRate: settings.computed.hourlyRate,
        taxRate: settings.computed.taxRate
      });

      return settings;
    } catch (error) {
      console.error('[SettingsIntegrationService] Error loading settings:', error);
      throw new Error(`Failed to load company settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get settings optimized for quote calculator
   */
  static async getQuoteCalculatorSettings(companyId: number, options: PricingOptions = {}): Promise<QuoteCalculatorSettings> {
    const settings = await this.getCompanySettings(companyId);
    const { company, paintProducts, pricingConfig, computed } = settings;

    // Apply pricing adjustments based on options
    const baseRate = computed.hourlyRate;
    const adjustedRate = PricingConfigManager.calculateAdjustedRate(baseRate, pricingConfig, options);
    const rateMultiplier = adjustedRate / baseRate;

    return {
      // Labor rates (adjusted)
      hourlyRate: adjustedRate,
      laborPercentage: computed.laborPercentage,
      
      // Paint costs (adjusted by grade if specified)
      wallsPaintCost: this.getAdjustedPaintCost('wallPaint', options.productGrade || 'standard', pricingConfig),
      ceilingsPaintCost: this.getAdjustedPaintCost('ceilingPaint', options.productGrade || 'standard', pricingConfig),
      trimPaintCost: this.getAdjustedPaintCost('trimPaint', options.productGrade || 'standard', pricingConfig),
      primerCost: this.getAdjustedPaintCost('primer', options.productGrade || 'standard', pricingConfig),
      
      // Coverage rates
      wallsCoverage: computed.paintCoverage,
      ceilingsCoverage: computed.paintCoverage,
      primerCoverage: computed.paintCoverage * 0.8, // Primer typically covers less
      
      // Business costs
      taxRate: computed.taxRate,
      markupPercentage: computed.markupPercentage,
      overheadPercent: computed.overheadPercent,
      profitMargin: computed.profitMargin,
      sundriesToPercentage: computed.sundriesToPercentage,
      
      // Minimum pricing
      minimumJobPrice: computed.minimumJobPrice,
      
      // Adjustments
      seasonalMultiplier: computed.currentSeasonMultiplier,
      locationMultiplier: computed.defaultLocationMultiplier,
      rushJobMultiplier: pricingConfig.rushJobMultiplier,
      
      // Paint products
      paintProducts
    };
  }

  /**
   * Apply pricing multipliers to a base price
   */
  static applyPricingMultipliers(
    basePrice: number,
    settings: ComprehensiveSettings,
    options: PricingOptions = {}
  ): number {
    const { pricingConfig } = settings;
    return PricingConfigManager.calculateAdjustedRate(basePrice, pricingConfig, options);
  }

  /**
   * Calculate complete quote with all settings and multipliers
   */
  static async calculateQuoteWithSettings(
    quoteData: any,
    companyId: number,
    options: PricingOptions = {}
  ): Promise<any> {
    const calculatorSettings = await this.getQuoteCalculatorSettings(companyId, options);
    
    // Import calculator here to avoid circular dependencies
    const { QuoteCalculator } = await import('@/lib/calculators/quote-calculator');
    
    // Map our settings to calculator input format
    const calculatorInput = {
      surfaces: quoteData.surfaces || {},
      paintProducts: {
        walls: { 
          name: 'Wall Paint', 
          coverageRate: calculatorSettings.wallsCoverage,
          costPerGallon: calculatorSettings.wallsPaintCost
        },
        ceiling: { 
          name: 'Ceiling Paint', 
          coverageRate: calculatorSettings.ceilingsCoverage,
          costPerGallon: calculatorSettings.ceilingsPaintCost
        },
        trim: { 
          name: 'Trim Paint', 
          coverageRate: calculatorSettings.wallsCoverage * 0.5, // Trim spreads less
          costPerGallon: calculatorSettings.trimPaintCost
        },
        primer: { 
          name: 'Primer', 
          coverageRate: calculatorSettings.primerCoverage,
          costPerGallon: calculatorSettings.primerCost
        }
      },
      laborRate: calculatorSettings.hourlyRate,
      taxRate: calculatorSettings.taxRate,
      markupPercentage: calculatorSettings.markupPercentage,
      companyRates: {
        overheadPercent: calculatorSettings.overheadPercent,
        profitMargin: calculatorSettings.profitMargin
      },
      prepCondition: (() => {
        const prepMap: Record<string, 'good' | 'minor' | 'major'> = {
          'none': 'good',
          'light': 'good',
          'moderate': 'minor',
          'heavy': 'major',
          'extreme': 'major'
        };
        return options.prepWork ? prepMap[options.prepWork] || 'good' : 'good';
      })(),
      rushJob: options.isRushJob || false
    };

    return QuoteCalculator.calculate(calculatorInput);
  }

  /**
   * Get AI context string with all relevant settings
   */
  static async getAIContextString(companyId: number): Promise<string> {
    const settings = await this.getCompanySettings(companyId);
    const { company, paintProducts, computed, pricingConfig } = settings;

    const paintContext = paintProducts.length > 0 ? 
      paintProducts.map(p => 
        `${p.product_name} (${p.use_case}): $${p.cost_per_gallon}/gal, ${p.coverage_rate || computed.paintCoverage} sqft/gal`
      ).join('\n') : 'Using default product recommendations';

    return `
COMPANY SETTINGS:
Company: ${company.company_name}
Tax Rate: ${computed.taxRate}%
Labor Rate: $${computed.hourlyRate}/hour
Labor Percentage: ${computed.laborPercentage}%
Markup Percentage: ${computed.markupPercentage}%
Overhead: ${computed.overheadPercent}%
Profit Margin: ${computed.profitMargin}%
Paint Coverage: ${computed.paintCoverage} sqft/gal
Sundries: ${computed.sundriesToPercentage}%
Minimum Job: $${computed.minimumJobPrice}

SEASONAL PRICING:
Current Season Multiplier: ${computed.currentSeasonMultiplier}x
Spring: ${pricingConfig.seasonalPricing.spring}x
Summer: ${pricingConfig.seasonalPricing.summer}x
Fall: ${pricingConfig.seasonalPricing.fall}x
Winter: ${pricingConfig.seasonalPricing.winter}x

LOCATION PRICING:
Urban: ${pricingConfig.locationPricing.urban}x
Suburban: ${pricingConfig.locationPricing.suburban}x
Rural: ${pricingConfig.locationPricing.rural}x

PAINT PRODUCTS:
${paintContext}

PRICING ADJUSTMENTS:
Rush Job: ${pricingConfig.rushJobMultiplier}x
Prep Work - Light: ${pricingConfig.prepWorkMultipliers.light}x
Prep Work - Moderate: ${pricingConfig.prepWorkMultipliers.moderate}x
Prep Work - Heavy: ${pricingConfig.prepWorkMultipliers.heavy}x
Height - High: ${pricingConfig.heightMultipliers.high}x
Height - Very High: ${pricingConfig.heightMultipliers.veryHigh}x
Height - Cathedral: ${pricingConfig.heightMultipliers.cathedral}x

Use these settings for all quote calculations and recommendations.
    `.trim();
  }

  /**
   * Clear settings cache for a company (call when settings are updated)
   */
  static clearCache(companyId?: number): void {
    if (companyId) {
      this.settingsCache.delete(companyId);
      this.cacheExpiry.delete(companyId);
    } else {
      this.settingsCache.clear();
      this.cacheExpiry.clear();
    }
  }

  // Private helper methods

  private static getCachedSettings(companyId: number): ComprehensiveSettings | null {
    const expiry = this.cacheExpiry.get(companyId);
    if (!expiry || Date.now() > expiry) {
      this.settingsCache.delete(companyId);
      this.cacheExpiry.delete(companyId);
      return null;
    }
    return this.settingsCache.get(companyId) || null;
  }

  private static cacheSettings(companyId: number, settings: ComprehensiveSettings): void {
    this.settingsCache.set(companyId, settings);
    this.cacheExpiry.set(companyId, Date.now() + this.CACHE_DURATION);
  }

  private static async fetchCompanyData(companyId: number): Promise<Company> {
    const company = await db.getCompany(companyId);
    if (!company) {
      throw new Error(`Company not found: ${companyId}`);
    }
    return company;
  }

  private static async fetchPaintProducts(companyId: number): Promise<PaintProduct[]> {
    try {
      // Check if db has the paint products method
      const extendedDb = db as any;
      if (typeof extendedDb.getPaintProductsByCompanyId === 'function') {
        const products = await extendedDb.getPaintProductsByCompanyId(companyId);
        return products as PaintProduct[];
      }
      return [];
    } catch (error) {
      console.warn('[SettingsIntegrationService] Could not fetch paint products:', error);
      return [];
    }
  }

  private static async fetchPricingConfig(companyId: number): Promise<CompanyPricingConfig> {
    try {
      const config = await PricingConfigManager.prototype.loadConfig(companyId);
      return config || PricingConfigManager.createDefaultConfig(companyId);
    } catch (error) {
      console.warn('[SettingsIntegrationService] Could not fetch pricing config, using defaults:', error);
      return PricingConfigManager.createDefaultConfig(companyId);
    }
  }

  private static computeSettings(
    company: Company, 
    paintProducts: PaintProduct[], 
    pricingConfig: CompanyPricingConfig
  ) {
    // Get current season multiplier
    const currentSeason = PricingConfigManager.getCurrentSeason();
    const currentSeasonMultiplier = pricingConfig.seasonalPricing[currentSeason];

    // Find preferred products by use case
    const preferredProducts = {
      walls: paintProducts.find(p => p.use_case === 'walls' || p.use_case === 'wall') || null,
      ceilings: paintProducts.find(p => p.use_case === 'ceilings' || p.use_case === 'ceiling') || null,
      trim: paintProducts.find(p => p.use_case === 'trim') || null,
      primer: paintProducts.find(p => p.use_case === 'primer') || null,
    };

    return {
      // Labor settings
      hourlyRate: company.default_hourly_rate || 45.00,
      laborPercentage: company.default_labor_percentage || 30,
      
      // Material costs (use paint products if available, otherwise company defaults)
      wallsPaintCost: preferredProducts.walls?.cost_per_gallon || company.default_walls_paint_cost || 30.00,
      ceilingsPaintCost: preferredProducts.ceilings?.cost_per_gallon || company.default_ceilings_paint_cost || 25.00,
      trimPaintCost: preferredProducts.trim?.cost_per_gallon || company.default_trim_paint_cost || 35.00,
      
      // Coverage rates
      paintCoverage: company.default_paint_coverage || 350,
      sundriesToPercentage: company.default_sundries_percentage || 12,
      
      // Tax and markup
      taxRate: company.tax_rate || 0,
      markupPercentage: company.markup_percentage || pricingConfig.profitMargin,
      overheadPercent: company.overhead_percent || pricingConfig.overheadPercent,
      profitMargin: pricingConfig.profitMargin,
      
      // Minimum pricing
      minimumJobPrice: company.minimum_job_size || pricingConfig.minimumJobPrice,
      
      // Seasonal and location adjustments
      currentSeasonMultiplier,
      defaultLocationMultiplier: pricingConfig.locationPricing.suburban, // Default to suburban
      
      // Preferred products
      preferredProducts
    };
  }

  private static getAdjustedPaintCost(
    productType: keyof CompanyPricingConfig['paintSuppliers']['products'],
    grade: 'economy' | 'standard' | 'premium' | 'luxury',
    pricingConfig: CompanyPricingConfig
  ): number {
    const product = PricingConfigManager.getProductByGrade(pricingConfig, productType, grade);
    return product?.costPerGallon || 35; // Default cost
  }
}