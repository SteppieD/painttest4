/**
 * Pricing Configuration System
 * Manages user-specific pricing preferences based on location, season, and product grades
 */

export interface SeasonalPricing {
  spring: number;  // multiplier, e.g., 1.1 for 10% increase
  summer: number;  // e.g., 1.15 for busy season
  fall: number;    // e.g., 1.05
  winter: number;  // e.g., 0.95 for slow season
}

export interface ProductGradePricing {
  economy: {
    name: string;
    multiplier: number;  // e.g., 0.8
    spreadRate: number;
    costPerGallon: number;
  };
  standard: {
    name: string;
    multiplier: number;  // e.g., 1.0
    spreadRate: number;
    costPerGallon: number;
  };
  premium: {
    name: string;
    multiplier: number;  // e.g., 1.3
    spreadRate: number;
    costPerGallon: number;
  };
  luxury: {
    name: string;
    multiplier: number;  // e.g., 1.6
    spreadRate: number;
    costPerGallon: number;
  };
}

export interface LocationPricing {
  // Base rates for different market areas
  urban: number;      // e.g., 1.2 multiplier
  suburban: number;   // e.g., 1.0
  rural: number;      // e.g., 0.85
  
  // Specific zip code or region overrides
  customAreas?: {
    [zipOrRegion: string]: number;
  };
}

export interface BasePricingRates {
  // These are the user's base rates before any adjustments
  wallsPerSqft: number;
  ceilingsPerSqft: number;
  doorsPerUnit: number;
  windowsPerUnit: number;
  primerPerSqft: number;
  trimPerLinearFt: number;
  
  // Special surface rates
  cabinetDoorsPerUnit?: number;
  stairwaySpindlesPerUnit?: number;
  deckPerSqft?: number;
  fencePerLinearFt?: number;
}

export interface PaintSupplierConfig {
  preferredSuppliers: string[];
  
  products: {
    primer: ProductGradePricing;
    wallPaint: ProductGradePricing;
    ceilingPaint: ProductGradePricing;
    trimPaint: ProductGradePricing;
    exteriorPaint?: ProductGradePricing;
    specialtyPaint?: ProductGradePricing;
  };
}

export interface CompanyPricingConfig {
  companyId: number;
  
  // Base pricing rates (user-defined)
  baseRates: BasePricingRates;
  
  // Seasonal adjustments
  seasonalPricing: SeasonalPricing;
  
  // Location-based pricing
  locationPricing: LocationPricing;
  
  // Paint supplier configuration
  paintSuppliers: PaintSupplierConfig;
  
  // Business costs and margins
  overheadPercent: number;
  profitMargin: number;
  
  // Minimum job pricing
  minimumJobPrice: number;
  
  // Rush job surcharge
  rushJobMultiplier: number;
  
  // Prep work adjustments
  prepWorkMultipliers: {
    none: number;     // e.g., 1.0
    light: number;    // e.g., 1.1
    moderate: number; // e.g., 1.25
    heavy: number;    // e.g., 1.5
    extreme: number;  // e.g., 1.75
  };
  
  // Complexity adjustments
  complexityMultipliers: {
    simple: number;      // e.g., 0.9
    standard: number;    // e.g., 1.0
    detailed: number;    // e.g., 1.2
    highDetail: number;  // e.g., 1.4
    custom: number;      // e.g., 1.6
  };
  
  // Height adjustments
  heightMultipliers: {
    standard: number;    // 8-10 ft, e.g., 1.0
    high: number;        // 10-12 ft, e.g., 1.1
    veryHigh: number;    // 12-16 ft, e.g., 1.25
    cathedral: number;   // 16+ ft, e.g., 1.5
  };
  
  // Last updated
  lastUpdated: Date;
}

export class PricingConfigManager {
  private configs: Map<number, CompanyPricingConfig> = new Map();
  
  /**
   * Get current season based on date
   */
  static getCurrentSeason(): keyof SeasonalPricing {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter';
  }
  
  /**
   * Calculate final rate with all adjustments
   */
  static calculateAdjustedRate(
    baseRate: number,
    config: CompanyPricingConfig,
    options: {
      productGrade?: 'economy' | 'standard' | 'premium' | 'luxury';
      locationType?: 'urban' | 'suburban' | 'rural';
      customLocation?: string;
      season?: keyof SeasonalPricing;
      isRushJob?: boolean;
      prepWork?: 'none' | 'light' | 'moderate' | 'heavy' | 'extreme';
      complexity?: 'simple' | 'standard' | 'detailed' | 'highDetail' | 'custom';
      ceilingHeight?: 'standard' | 'high' | 'veryHigh' | 'cathedral';
    } = {}
  ): number {
    let adjustedRate = baseRate;
    
    // Apply seasonal adjustment
    const season = options.season || this.getCurrentSeason();
    adjustedRate *= config.seasonalPricing[season];
    
    // Apply location adjustment
    if (options.customLocation && config.locationPricing.customAreas?.[options.customLocation]) {
      adjustedRate *= config.locationPricing.customAreas[options.customLocation];
    } else if (options.locationType) {
      adjustedRate *= config.locationPricing[options.locationType];
    }
    
    // Apply rush job surcharge
    if (options.isRushJob) {
      adjustedRate *= config.rushJobMultiplier;
    }
    
    // Apply prep work adjustment
    if (options.prepWork) {
      adjustedRate *= config.prepWorkMultipliers[options.prepWork];
    }
    
    // Apply complexity adjustment
    if (options.complexity) {
      adjustedRate *= config.complexityMultipliers[options.complexity];
    }
    
    // Apply height adjustment
    if (options.ceilingHeight) {
      adjustedRate *= config.heightMultipliers[options.ceilingHeight];
    }
    
    return adjustedRate;
  }
  
  /**
   * Get product details based on grade
   */
  static getProductByGrade(
    config: CompanyPricingConfig,
    productType: keyof PaintSupplierConfig['products'],
    grade: 'economy' | 'standard' | 'premium' | 'luxury'
  ) {
    const product = config.paintSuppliers.products[productType];
    if (!product) return null;
    
    return product[grade];
  }
  
  /**
   * Create default pricing config for new users
   */
  static createDefaultConfig(companyId: number): CompanyPricingConfig {
    return {
      companyId,
      baseRates: {
        wallsPerSqft: 1.50,
        ceilingsPerSqft: 1.25,
        doorsPerUnit: 150,
        windowsPerUnit: 100,
        primerPerSqft: 0.45,
        trimPerLinearFt: 2.50,
        cabinetDoorsPerUnit: 75,
        stairwaySpindlesPerUnit: 25,
        deckPerSqft: 2.00,
        fencePerLinearFt: 3.00
      },
      seasonalPricing: {
        spring: 1.05,
        summer: 1.15,
        fall: 1.05,
        winter: 0.95
      },
      locationPricing: {
        urban: 1.2,
        suburban: 1.0,
        rural: 0.85
      },
      paintSuppliers: {
        preferredSuppliers: ['Sherwin-Williams', 'Benjamin Moore', 'Behr'],
        products: {
          primer: {
            economy: { name: 'Basic Primer', multiplier: 0.8, spreadRate: 200, costPerGallon: 20 },
            standard: { name: 'Standard Primer', multiplier: 1.0, spreadRate: 250, costPerGallon: 25 },
            premium: { name: 'Premium Primer', multiplier: 1.3, spreadRate: 300, costPerGallon: 35 },
            luxury: { name: 'Luxury Primer', multiplier: 1.6, spreadRate: 350, costPerGallon: 45 }
          },
          wallPaint: {
            economy: { name: 'Budget Paint', multiplier: 0.8, spreadRate: 300, costPerGallon: 25 },
            standard: { name: 'Standard Paint', multiplier: 1.0, spreadRate: 350, costPerGallon: 35 },
            premium: { name: 'Premium Paint', multiplier: 1.3, spreadRate: 400, costPerGallon: 50 },
            luxury: { name: 'Designer Paint', multiplier: 1.6, spreadRate: 450, costPerGallon: 75 }
          },
          ceilingPaint: {
            economy: { name: 'Ceiling White', multiplier: 0.8, spreadRate: 350, costPerGallon: 20 },
            standard: { name: 'Ceiling Paint', multiplier: 1.0, spreadRate: 350, costPerGallon: 30 },
            premium: { name: 'Premium Ceiling', multiplier: 1.3, spreadRate: 400, costPerGallon: 40 },
            luxury: { name: 'Luxury Ceiling', multiplier: 1.6, spreadRate: 450, costPerGallon: 55 }
          },
          trimPaint: {
            economy: { name: 'Basic Trim', multiplier: 0.8, spreadRate: 150, costPerGallon: 30 },
            standard: { name: 'Trim Paint', multiplier: 1.0, spreadRate: 175, costPerGallon: 40 },
            premium: { name: 'Premium Trim', multiplier: 1.3, spreadRate: 200, costPerGallon: 55 },
            luxury: { name: 'Luxury Trim', multiplier: 1.6, spreadRate: 225, costPerGallon: 70 }
          }
        }
      },
      overheadPercent: 15,
      profitMargin: 30,
      minimumJobPrice: 500,
      rushJobMultiplier: 1.25,
      prepWorkMultipliers: {
        none: 1.0,
        light: 1.1,
        moderate: 1.25,
        heavy: 1.5,
        extreme: 1.75
      },
      complexityMultipliers: {
        simple: 0.9,
        standard: 1.0,
        detailed: 1.2,
        highDetail: 1.4,
        custom: 1.6
      },
      heightMultipliers: {
        standard: 1.0,
        high: 1.1,
        veryHigh: 1.25,
        cathedral: 1.5
      },
      lastUpdated: new Date()
    };
  }
  
  /**
   * Save config to database
   */
  async saveConfig(config: CompanyPricingConfig): Promise<void> {
    // This would save to your database
    this.configs.set(config.companyId, config);
    // await db.savePricingConfig(config);
  }
  
  /**
   * Load config from database
   */
  async loadConfig(companyId: number): Promise<CompanyPricingConfig | null> {
    // This would load from your database
    return this.configs.get(companyId) || null;
    // return await db.getPricingConfig(companyId);
  }
}

// Export singleton
export const pricingConfigManager = new PricingConfigManager();