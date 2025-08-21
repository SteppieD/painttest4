/**
 * Settings Helper Functions
 * 
 * Provides easy-to-use helper functions for accessing company settings
 * throughout the application. These functions abstract the complexity
 * of the settings integration service.
 */

import { SettingsIntegrationService, ComprehensiveSettings, PricingOptions } from '@/lib/services/settings-integration-service';
import { EnhancedQuoteCalculator, EnhancedCalculatorInput } from '@/lib/calculators/enhanced-quote-calculator';
import { PricingConfigManager } from '@/lib/config/pricing-config';

/**
 * Get all company settings
 */
export async function getCompanySettings(companyId: number): Promise<ComprehensiveSettings> {
  return SettingsIntegrationService.getCompanySettings(companyId);
}

/**
 * Apply pricing multipliers to a base price
 */
export async function applyPricingMultipliers(
  basePrice: number,
  companyId: number,
  options: PricingOptions = {}
): Promise<number> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return SettingsIntegrationService.applyPricingMultipliers(basePrice, settings, options);
}

/**
 * Calculate a complete quote using all company settings
 */
export async function calculateQuoteWithSettings(
  input: EnhancedCalculatorInput
): Promise<Record<string, unknown>> {
  return EnhancedQuoteCalculator.calculate(input);
}

/**
 * Get AI context string with all company settings
 */
export async function getAIContextString(companyId: number): Promise<string> {
  return SettingsIntegrationService.getAIContextString(companyId);
}

/**
 * Quick price estimate for simple quotes
 */
export async function quickPriceEstimate(
  companyId: number,
  wallSqft: number,
  ceilingSqft?: number,
  paintQuality: 'economy' | 'standard' | 'premium' | 'luxury' = 'standard'
): Promise<{ low: number; high: number; recommended: number }> {
  return EnhancedQuoteCalculator.quickEstimate(companyId, wallSqft, ceilingSqft, paintQuality);
}

/**
 * Get current season pricing multiplier
 */
export async function getCurrentSeasonMultiplier(companyId: number): Promise<number> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  const currentSeason = PricingConfigManager.getCurrentSeason();
  return settings.pricingConfig.seasonalPricing[currentSeason];
}

/**
 * Get location pricing multiplier
 */
export async function getLocationMultiplier(
  companyId: number,
  locationType: 'urban' | 'suburban' | 'rural'
): Promise<number> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return settings.pricingConfig.locationPricing[locationType];
}

/**
 * Get paint product costs for a company
 */
export async function getPaintProductCosts(companyId: number): Promise<{
  walls: number;
  ceilings: number;
  trim: number;
  primer: number;
}> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return {
    walls: settings.computed.wallsPaintCost,
    ceilings: settings.computed.ceilingsPaintCost,
    trim: settings.computed.trimPaintCost,
    primer: settings.computed.preferredProducts.primer?.cost_per_gallon || 25
  };
}

/**
 * Get company labor settings
 */
export async function getLaborSettings(companyId: number): Promise<{
  hourlyRate: number;
  laborPercentage: number;
}> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return {
    hourlyRate: settings.computed.hourlyRate,
    laborPercentage: settings.computed.laborPercentage
  };
}

/**
 * Get company tax and markup settings
 */
export async function getTaxAndMarkupSettings(companyId: number): Promise<{
  taxRate: number;
  markupPercentage: number;
  overheadPercent: number;
  profitMargin: number;
}> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return {
    taxRate: settings.computed.taxRate,
    markupPercentage: settings.computed.markupPercentage,
    overheadPercent: settings.computed.overheadPercent,
    profitMargin: settings.computed.profitMargin
  };
}

/**
 * Get minimum job price for a company
 */
export async function getMinimumJobPrice(companyId: number): Promise<number> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return settings.computed.minimumJobPrice;
}

/**
 * Check if a quote meets minimum requirements
 */
export async function checkMinimumQuoteRequirements(
  companyId: number,
  quoteTotal: number
): Promise<{ meetsMinimum: boolean; minimumPrice: number; adjustedTotal: number }> {
  const minimumPrice = await getMinimumJobPrice(companyId);
  const meetsMinimum = quoteTotal >= minimumPrice;
  const adjustedTotal = Math.max(quoteTotal, minimumPrice);
  
  return {
    meetsMinimum,
    minimumPrice,
    adjustedTotal
  };
}

/**
 * Get all paint products for a company
 */
export async function getCompanyPaintProducts(companyId: number) {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return settings.paintProducts;
}

/**
 * Get preferred paint products by use case
 */
export async function getPreferredPaintProducts(companyId: number) {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  return settings.computed.preferredProducts;
}

/**
 * Calculate adjusted rate for specific project conditions
 */
export async function calculateAdjustedRate(
  companyId: number,
  baseRate: number,
  options: PricingOptions
): Promise<{
  adjustedRate: number;
  multipliers: {
    seasonal: number;
    location: number;
    prep: number;
    complexity: number;
    height: number;
    rush: number;
    total: number;
  };
}> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  const adjustedRate = PricingConfigManager.calculateAdjustedRate(
    baseRate, 
    settings.pricingConfig, 
    options
  );

  // Calculate individual multipliers for transparency
  const currentSeason = options.season || PricingConfigManager.getCurrentSeason();
  const seasonal = settings.pricingConfig.seasonalPricing[currentSeason];
  const location = options.locationType ? settings.pricingConfig.locationPricing[options.locationType] : 1;
  const prep = options.prepWork ? settings.pricingConfig.prepWorkMultipliers[options.prepWork] : 1;
  const complexity = options.complexity ? settings.pricingConfig.complexityMultipliers[options.complexity] : 1;
  const height = options.ceilingHeight ? settings.pricingConfig.heightMultipliers[options.ceilingHeight] : 1;
  const rush = options.isRushJob ? settings.pricingConfig.rushJobMultiplier : 1;
  const total = seasonal * location * prep * complexity * height * rush;

  return {
    adjustedRate,
    multipliers: {
      seasonal,
      location,
      prep,
      complexity,
      height,
      rush,
      total
    }
  };
}

/**
 * Generate pricing breakdown for transparency
 */
export async function generatePricingBreakdown(
  companyId: number,
  basePrice: number,
  options: PricingOptions = {}
): Promise<{
  basePrice: number;
  adjustments: Array<{
    type: string;
    description: string;
    multiplier: number;
    adjustment: number;
    runningTotal: number;
  }>;
  finalPrice: number;
}> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  const { multipliers } = await calculateAdjustedRate(companyId, 1, options);
  
  const adjustments = [];
  let runningTotal = basePrice;
  
  if (multipliers.seasonal !== 1) {
    const adjustment = runningTotal * (multipliers.seasonal - 1);
    runningTotal += adjustment;
    adjustments.push({
      type: 'seasonal',
      description: `${PricingConfigManager.getCurrentSeason()} seasonal adjustment`,
      multiplier: multipliers.seasonal,
      adjustment,
      runningTotal
    });
  }
  
  if (multipliers.location !== 1) {
    const adjustment = runningTotal * (multipliers.location - 1);
    runningTotal += adjustment;
    adjustments.push({
      type: 'location',
      description: `${options.locationType || 'location'} pricing adjustment`,
      multiplier: multipliers.location,
      adjustment,
      runningTotal
    });
  }
  
  if (multipliers.prep !== 1) {
    const adjustment = runningTotal * (multipliers.prep - 1);
    runningTotal += adjustment;
    adjustments.push({
      type: 'prep',
      description: `${options.prepWork || 'prep'} work adjustment`,
      multiplier: multipliers.prep,
      adjustment,
      runningTotal
    });
  }
  
  if (multipliers.complexity !== 1) {
    const adjustment = runningTotal * (multipliers.complexity - 1);
    runningTotal += adjustment;
    adjustments.push({
      type: 'complexity',
      description: `${options.complexity || 'complexity'} adjustment`,
      multiplier: multipliers.complexity,
      adjustment,
      runningTotal
    });
  }
  
  if (multipliers.height !== 1) {
    const adjustment = runningTotal * (multipliers.height - 1);
    runningTotal += adjustment;
    adjustments.push({
      type: 'height',
      description: `${options.ceilingHeight || 'height'} adjustment`,
      multiplier: multipliers.height,
      adjustment,
      runningTotal
    });
  }
  
  if (multipliers.rush !== 1) {
    const adjustment = runningTotal * (multipliers.rush - 1);
    runningTotal += adjustment;
    adjustments.push({
      type: 'rush',
      description: 'Rush job surcharge',
      multiplier: multipliers.rush,
      adjustment,
      runningTotal
    });
  }
  
  return {
    basePrice,
    adjustments,
    finalPrice: runningTotal
  };
}

/**
 * Clear settings cache when settings are updated
 */
export function clearSettingsCache(companyId?: number): void {
  SettingsIntegrationService.clearCache(companyId);
}

/**
 * Validate quote input against company constraints
 */
export async function validateQuoteInput(
  companyId: number,
  input: Record<string, unknown>
): Promise<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  try {
    const settings = await SettingsIntegrationService.getCompanySettings(companyId);
    
    // Check required fields
    if (!input.surfaces || (!input.surfaces.walls && !input.surfaces.ceilings)) {
      errors.push('At least walls or ceilings must be specified');
    }
    
    // Check minimum values
    if (input.surfaces.walls && input.surfaces.walls < 50) {
      warnings.push('Wall area seems small, please verify measurements');
    }
    
    if (input.surfaces.ceilings && input.surfaces.ceilings < 50) {
      warnings.push('Ceiling area seems small, please verify measurements');
    }
    
    // Check against minimum job price
    const minimumPrice = settings.computed.minimumJobPrice;
    if (minimumPrice > 0) {
      warnings.push(`Company minimum job price is $${minimumPrice}`);
    }
    
  } catch (error) {
    errors.push('Could not validate against company settings');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get company subscription limits and usage
 */
export async function getCompanyLimits(companyId: number): Promise<{
  tier: string;
  monthlyQuoteLimit: number;
  monthlyQuoteCount: number;
  canCreateQuote: boolean;
  remainingQuotes: number;
}> {
  const settings = await SettingsIntegrationService.getCompanySettings(companyId);
  const { company } = settings;
  
  const monthlyQuoteLimit = company.monthly_quote_limit || 5;
  const monthlyQuoteCount = company.monthly_quote_count || 0;
  const canCreateQuote = monthlyQuoteCount < monthlyQuoteLimit;
  const remainingQuotes = Math.max(0, monthlyQuoteLimit - monthlyQuoteCount);
  
  return {
    tier: company.subscription_tier || 'free',
    monthlyQuoteLimit,
    monthlyQuoteCount,
    canCreateQuote,
    remainingQuotes
  };
}