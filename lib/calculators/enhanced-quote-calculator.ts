/**
 * Enhanced Quote Calculator with Company Settings Integration
 * 
 * This calculator uses actual company settings instead of hardcoded values
 * and integrates with the advanced pricing configuration system.
 */

import { SettingsIntegrationService, QuoteCalculatorSettings, PricingOptions } from '@/lib/services/settings-integration-service';
import { PricingConfigManager } from '@/lib/config/pricing-config';

export interface EnhancedCalculatorInput {
  companyId: number;
  surfaces: {
    walls?: number;      // sqft
    ceilings?: number;   // sqft
    trim?: number;       // linear ft
    doors?: number;      // count
    windows?: number;    // count
    priming?: number;    // sqft needing primer
  };
  paintProducts?: {
    walls?: { name: string; coverageRate?: number; costPerGallon?: number };
    ceiling?: { name: string; coverageRate?: number; costPerGallon?: number };
    trim?: { name: string; coverageRate?: number; costPerGallon?: number };
    primer?: { name: string; coverageRate?: number; costPerGallon?: number };
  };
  projectDetails?: {
    paintQuality?: 'economy' | 'standard' | 'premium' | 'luxury';
    prepCondition?: 'good' | 'minor' | 'major';
    rushJob?: boolean;
    locationType?: 'urban' | 'suburban' | 'rural';
    customLocation?: string;
    complexity?: 'simple' | 'standard' | 'detailed' | 'highDetail' | 'custom';
    ceilingHeight?: 'standard' | 'high' | 'veryHigh' | 'cathedral';
    season?: 'spring' | 'summer' | 'fall' | 'winter';
  };
  overrides?: {
    laborRate?: number;
    taxRate?: number;
    markupPercentage?: number;
  };
}

export interface EnhancedCalculatorOutput {
  materials: {
    paint: number;
    primer: number;
    supplies: number;
    total: number;
  };
  labor: {
    hours: number;
    rate: number;
    baseTotal: number;
    adjustedTotal: number;
    adjustments: {
      seasonal: number;
      location: number;
      prep: number;
      complexity: number;
      height: number;
      rush: number;
    };
  };
  subtotal: number;
  overhead: number;
  profit: number;
  beforeTax: number;
  tax: number;
  total: number;
  timeline: string;
  adjustmentsSummary: {
    seasonalMultiplier: number;
    locationMultiplier: number;
    prepMultiplier: number;
    complexityMultiplier: number;
    heightMultiplier: number;
    rushMultiplier: number;
    totalMultiplier: number;
  };
  breakdown: {
    walls?: { sqft: number; gallons: number; cost: number };
    ceilings?: { sqft: number; gallons: number; cost: number };
    trim?: { linearFt: number; cost: number };
    doors?: { count: number; cost: number };
    windows?: { count: number; cost: number };
    primer?: { sqft: number; gallons: number; cost: number };
    supplies?: { description: string; cost: number };
    labor: {
      baseHours: number;
      adjustedHours: number;
      breakdown: {
        walls?: number;
        ceilings?: number;
        trim?: number;
        doors?: number;
        windows?: number;
        prep?: number;
      };
    };
  };
  usedSettings: {
    companyName: string;
    paintProducts: any[];
    laborRate: number;
    taxRate: number;
    overheadPercent: number;
    profitMargin: number;
  };
}

export class EnhancedQuoteCalculator {
  // Default productivity rates (sqft per hour or hours per unit)
  private static readonly PRODUCTIVITY_RATES = {
    walls: 150,      // sqft per hour
    ceilings: 100,   // sqft per hour  
    trim: 60,        // linear ft per hour
    doors: 2,        // hours per door
    windows: 3,      // hours per window
    priming: 200     // sqft per hour
  };
  
  // Material multipliers
  private static readonly GALLON_MULTIPLIER = 1.8; // account for multiple coats
  private static readonly SUPPLIES_PERCENTAGE = 0.12; // 12% of materials for sundries
  private static readonly SUPPLIES_BASE = 100; // base supplies cost

  /**
   * Calculate quote using company settings and advanced pricing
   */
  static async calculate(input: EnhancedCalculatorInput): Promise<EnhancedCalculatorOutput> {
    console.log('[EnhancedQuoteCalculator] Starting calculation for company:', input.companyId);

    // Get pricing options from input
    const pricingOptions: PricingOptions = {
      productGrade: input.projectDetails?.paintQuality || 'standard',
      locationType: input.projectDetails?.locationType || 'suburban',
      customLocation: input.projectDetails?.customLocation,
      season: input.projectDetails?.season,
      isRushJob: input.projectDetails?.rushJob || false,
      prepWork: this.mapPrepCondition(input.projectDetails?.prepCondition),
      complexity: input.projectDetails?.complexity || 'standard',
      ceilingHeight: input.projectDetails?.ceilingHeight || 'standard'
    };

    // Get calculator settings with company data
    const settings = await SettingsIntegrationService.getQuoteCalculatorSettings(
      input.companyId, 
      pricingOptions
    );

    const comprehensiveSettings = await SettingsIntegrationService.getCompanySettings(input.companyId);

    console.log('[EnhancedQuoteCalculator] Using settings:', {
      hourlyRate: settings.hourlyRate,
      taxRate: settings.taxRate,
      paintProducts: settings.paintProducts.length
    });

    // Calculate materials
    const materialsResult = this.calculateMaterials(input, settings);
    
    // Calculate labor with all adjustments
    const laborResult = this.calculateLaborWithAdjustments(input, settings, comprehensiveSettings.pricingConfig);
    
    // Calculate totals
    const subtotal = materialsResult.total + laborResult.adjustedTotal;
    const overhead = subtotal * (settings.overheadPercent / 100);
    const profit = subtotal * (settings.profitMargin / 100);
    const beforeTax = subtotal + overhead + profit;
    const tax = beforeTax * (settings.taxRate / 100);
    const total = Math.max(beforeTax + tax, settings.minimumJobPrice);

    // Calculate timeline
    const timeline = this.calculateTimeline(laborResult.hours);

    // Build detailed breakdown
    const breakdown = this.buildBreakdown(input, settings, materialsResult, laborResult);

    // Calculate adjustment multipliers for transparency
    const adjustmentsSummary = this.calculateAdjustmentsSummary(
      comprehensiveSettings.pricingConfig, 
      pricingOptions
    );

    return {
      materials: materialsResult,
      labor: laborResult,
      subtotal,
      overhead,
      profit,
      beforeTax,
      tax,
      total,
      timeline,
      adjustmentsSummary,
      breakdown,
      usedSettings: {
        companyName: comprehensiveSettings.company.company_name,
        paintProducts: settings.paintProducts,
        laborRate: settings.hourlyRate,
        taxRate: settings.taxRate,
        overheadPercent: settings.overheadPercent,
        profitMargin: settings.profitMargin
      }
    };
  }

  /**
   * Quick estimate method for simple quotes
   */
  static async quickEstimate(
    companyId: number,
    wallSqft: number,
    ceilingSqft?: number,
    paintQuality: 'economy' | 'standard' | 'premium' | 'luxury' = 'standard'
  ): Promise<{ low: number; high: number; recommended: number }> {
    const input: EnhancedCalculatorInput = {
      companyId,
      surfaces: {
        walls: wallSqft,
        ceilings: ceilingSqft || 0
      },
      projectDetails: {
        paintQuality,
        prepCondition: 'good',
        complexity: 'standard'
      }
    };

    const result = await this.calculate(input);
    
    // Generate range based on complexity
    const base = result.total;
    return {
      low: Math.round(base * 0.85),
      high: Math.round(base * 1.25),
      recommended: Math.round(base)
    };
  }

  // Private helper methods

  private static calculateMaterials(input: EnhancedCalculatorInput, settings: QuoteCalculatorSettings) {
    let paintCost = 0;
    let primerCost = 0;
    let totalGallons = 0;

    // Calculate wall paint
    if (input.surfaces.walls) {
      const coverage = input.paintProducts?.walls?.coverageRate || settings.wallsCoverage;
      const cost = input.paintProducts?.walls?.costPerGallon || settings.wallsPaintCost;
      const gallons = Math.ceil((input.surfaces.walls / coverage) * this.GALLON_MULTIPLIER);
      paintCost += gallons * cost;
      totalGallons += gallons;
    }

    // Calculate ceiling paint
    if (input.surfaces.ceilings) {
      const coverage = input.paintProducts?.ceiling?.coverageRate || settings.ceilingsCoverage;
      const cost = input.paintProducts?.ceiling?.costPerGallon || settings.ceilingsPaintCost;
      const gallons = Math.ceil((input.surfaces.ceilings / coverage) * this.GALLON_MULTIPLIER);
      paintCost += gallons * cost;
      totalGallons += gallons;
    }

    // Calculate primer
    if (input.surfaces.priming) {
      const coverage = input.paintProducts?.primer?.coverageRate || settings.primerCoverage;
      const cost = input.paintProducts?.primer?.costPerGallon || settings.primerCost;
      const gallons = Math.ceil(input.surfaces.priming / coverage);
      primerCost += gallons * cost;
      totalGallons += gallons;
    }

    // Calculate supplies
    const suppliesCost = this.SUPPLIES_BASE + ((paintCost + primerCost) * (settings.sundriesToPercentage / 100));

    return {
      paint: paintCost,
      primer: primerCost,
      supplies: suppliesCost,
      total: paintCost + primerCost + suppliesCost
    };
  }

  private static calculateLaborWithAdjustments(
    input: EnhancedCalculatorInput, 
    settings: QuoteCalculatorSettings,
    pricingConfig: any
  ) {
    // Calculate base labor hours
    let baseHours = 0;
    const hourBreakdown: any = {};

    if (input.surfaces.walls) {
      const hours = input.surfaces.walls / this.PRODUCTIVITY_RATES.walls;
      baseHours += hours;
      hourBreakdown.walls = hours;
    }

    if (input.surfaces.ceilings) {
      const hours = input.surfaces.ceilings / this.PRODUCTIVITY_RATES.ceilings;
      baseHours += hours;
      hourBreakdown.ceilings = hours;
    }

    if (input.surfaces.trim) {
      const hours = input.surfaces.trim / this.PRODUCTIVITY_RATES.trim;
      baseHours += hours;
      hourBreakdown.trim = hours;
    }

    if (input.surfaces.doors) {
      const hours = input.surfaces.doors * this.PRODUCTIVITY_RATES.doors;
      baseHours += hours;
      hourBreakdown.doors = hours;
    }

    if (input.surfaces.windows) {
      const hours = input.surfaces.windows * this.PRODUCTIVITY_RATES.windows;
      baseHours += hours;
      hourBreakdown.windows = hours;
    }

    if (input.surfaces.priming) {
      const hours = input.surfaces.priming / this.PRODUCTIVITY_RATES.priming;
      baseHours += hours;
      hourBreakdown.prep = hours;
    }

    // Apply all adjustments
    const adjustments = {
      seasonal: settings.seasonalMultiplier || 1,
      location: settings.locationMultiplier || 1,
      prep: this.getPrepMultiplier(input.projectDetails?.prepCondition, pricingConfig),
      complexity: this.getComplexityMultiplier(input.projectDetails?.complexity, pricingConfig),
      height: this.getHeightMultiplier(input.projectDetails?.ceilingHeight, pricingConfig),
      rush: input.projectDetails?.rushJob ? (settings.rushJobMultiplier || 1.25) : 1
    };

    const totalMultiplier = Object.values(adjustments).reduce((acc, mult) => acc * mult, 1);
    const adjustedHours = baseHours * totalMultiplier;
    
    const baseTotal = baseHours * settings.hourlyRate;
    const adjustedTotal = adjustedHours * settings.hourlyRate;

    return {
      hours: adjustedHours,
      rate: settings.hourlyRate,
      baseTotal,
      adjustedTotal,
      adjustments,
      hourBreakdown
    };
  }

  private static buildBreakdown(
    input: EnhancedCalculatorInput,
    settings: QuoteCalculatorSettings,
    materials: any,
    labor: any
  ) {
    const breakdown: any = {
      labor: {
        baseHours: labor.hours / Object.values(labor.adjustments).reduce((acc: number, mult: any) => acc * mult, 1),
        adjustedHours: labor.hours,
        breakdown: labor.hourBreakdown
      }
    };

    // Add surface breakdowns
    if (input.surfaces.walls) {
      const coverage = input.paintProducts?.walls?.coverageRate || settings.wallsCoverage;
      const gallons = Math.ceil((input.surfaces.walls / coverage) * this.GALLON_MULTIPLIER);
      breakdown.walls = {
        sqft: input.surfaces.walls,
        gallons,
        cost: gallons * (input.paintProducts?.walls?.costPerGallon || settings.wallsPaintCost)
      };
    }

    if (input.surfaces.ceilings) {
      const coverage = input.paintProducts?.ceiling?.coverageRate || settings.ceilingsCoverage;
      const gallons = Math.ceil((input.surfaces.ceilings / coverage) * this.GALLON_MULTIPLIER);
      breakdown.ceilings = {
        sqft: input.surfaces.ceilings,
        gallons,
        cost: gallons * (input.paintProducts?.ceiling?.costPerGallon || settings.ceilingsPaintCost)
      };
    }

    if (input.surfaces.trim) {
      breakdown.trim = {
        linearFt: input.surfaces.trim,
        cost: 0 // Trim cost is included in labor typically
      };
    }

    if (input.surfaces.doors) {
      breakdown.doors = {
        count: input.surfaces.doors,
        cost: 0 // Door cost is included in labor
      };
    }

    if (input.surfaces.windows) {
      breakdown.windows = {
        count: input.surfaces.windows,
        cost: 0 // Window cost is included in labor
      };
    }

    if (input.surfaces.priming) {
      const coverage = input.paintProducts?.primer?.coverageRate || settings.primerCoverage;
      const gallons = Math.ceil(input.surfaces.priming / coverage);
      breakdown.primer = {
        sqft: input.surfaces.priming,
        gallons,
        cost: gallons * (input.paintProducts?.primer?.costPerGallon || settings.primerCost)
      };
    }

    breakdown.supplies = {
      description: 'Brushes, rollers, drop cloths, tape, etc.',
      cost: materials.supplies
    };

    return breakdown;
  }

  private static calculateAdjustmentsSummary(pricingConfig: any, options: PricingOptions) {
    const seasonal = pricingConfig.seasonalPricing[options.season || PricingConfigManager.getCurrentSeason()];
    const location = options.locationType ? pricingConfig.locationPricing[options.locationType] : 1;
    const prep = this.getPrepMultiplier(options.prepWork, pricingConfig);
    const complexity = this.getComplexityMultiplier(options.complexity, pricingConfig);
    const height = this.getHeightMultiplier(options.ceilingHeight, pricingConfig);
    const rush = options.isRushJob ? pricingConfig.rushJobMultiplier : 1;

    return {
      seasonalMultiplier: seasonal,
      locationMultiplier: location,
      prepMultiplier: prep,
      complexityMultiplier: complexity,
      heightMultiplier: height,
      rushMultiplier: rush,
      totalMultiplier: seasonal * location * prep * complexity * height * rush
    };
  }

  private static calculateTimeline(totalHours: number): string {
    const hoursPerDay = 8;
    const daysNeeded = Math.ceil(totalHours / hoursPerDay);
    
    if (daysNeeded <= 1) return '1 day';
    if (daysNeeded <= 3) return `${daysNeeded} days`;
    if (daysNeeded <= 5) return '1 week';
    return `${Math.ceil(daysNeeded / 5)} weeks`;
  }

  // Helper methods for multipliers
  private static mapPrepCondition(condition?: string): 'none' | 'light' | 'moderate' | 'heavy' | 'extreme' {
    switch (condition) {
      case 'good': return 'none';
      case 'minor': return 'light';
      case 'major': return 'heavy';
      default: return 'light';
    }
  }

  private static getPrepMultiplier(prepWork?: string, pricingConfig?: any): number {
    if (!prepWork || !pricingConfig?.prepWorkMultipliers) return 1;
    return pricingConfig.prepWorkMultipliers[prepWork] || 1;
  }

  private static getComplexityMultiplier(complexity?: string, pricingConfig?: any): number {
    if (!complexity || !pricingConfig?.complexityMultipliers) return 1;
    return pricingConfig.complexityMultipliers[complexity] || 1;
  }

  private static getHeightMultiplier(height?: string, pricingConfig?: any): number {
    if (!height || !pricingConfig?.heightMultipliers) return 1;
    return pricingConfig.heightMultipliers[height] || 1;
  }
}

// Export for convenience
export const enhancedCalculator = EnhancedQuoteCalculator;