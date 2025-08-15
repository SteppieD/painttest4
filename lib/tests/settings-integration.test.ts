/**
 * Settings Integration Test Suite
 * 
 * Comprehensive tests to verify the integration between:
 * - Database company settings
 * - Advanced pricing configuration
 * - Paint products
 * - Quote calculator
 * - AI assistant
 * - Helper functions
 */

import { 
  SettingsIntegrationService,
  ComprehensiveSettings,
  QuoteCalculatorSettings 
} from '../services/settings-integration-service';

import {
  getCompanySettings,
  calculateQuoteWithSettings,
  getAIContextString,
  quickPriceEstimate,
  applyPricingMultipliers,
  getCurrentSeasonMultiplier,
  getLocationMultiplier,
  validateQuoteInput
} from '../helpers/settings-helpers';

import { EnhancedQuoteCalculator } from '../calculators/enhanced-quote-calculator';
import { PricingConfigManager } from '../config/pricing-config';

// Mock test data
const MOCK_COMPANY_ID = 1;

// Test company settings data structure
interface TestResults {
  settingsIntegration: boolean;
  quoteCalculator: boolean;
  helperFunctions: boolean;
  aiContext: boolean;
  pricingAdjustments: boolean;
  errors: string[];
  warnings: string[];
  performance: {
    settingsLoadTime: number;
    calculationTime: number;
    totalTestTime: number;
  };
}

/**
 * Run comprehensive integration tests
 */
export async function runSettingsIntegrationTests(companyId: number = MOCK_COMPANY_ID): Promise<TestResults> {
  console.log('[INTEGRATION-TEST] Starting comprehensive settings integration tests...');
  
  const startTime = Date.now();
  const results: TestResults = {
    settingsIntegration: false,
    quoteCalculator: false,
    helperFunctions: false,
    aiContext: false,
    pricingAdjustments: false,
    errors: [],
    warnings: [],
    performance: {
      settingsLoadTime: 0,
      calculationTime: 0,
      totalTestTime: 0
    }
  };

  try {
    // Test 1: Settings Integration Service
    console.log('[INTEGRATION-TEST] Testing Settings Integration Service...');
    const settingsStart = Date.now();
    
    const comprehensiveSettings = await testSettingsIntegration(companyId);
    results.performance.settingsLoadTime = Date.now() - settingsStart;
    results.settingsIntegration = true;
    
    console.log('[INTEGRATION-TEST] ✓ Settings Integration Service test passed');

    // Test 2: Helper Functions
    console.log('[INTEGRATION-TEST] Testing Helper Functions...');
    await testHelperFunctions(companyId);
    results.helperFunctions = true;
    
    console.log('[INTEGRATION-TEST] ✓ Helper Functions test passed');

    // Test 3: Enhanced Quote Calculator
    console.log('[INTEGRATION-TEST] Testing Enhanced Quote Calculator...');
    const calcStart = Date.now();
    
    await testEnhancedQuoteCalculator(companyId);
    results.performance.calculationTime = Date.now() - calcStart;
    results.quoteCalculator = true;
    
    console.log('[INTEGRATION-TEST] ✓ Enhanced Quote Calculator test passed');

    // Test 4: AI Context Generation
    console.log('[INTEGRATION-TEST] Testing AI Context Generation...');
    await testAIContextGeneration(companyId);
    results.aiContext = true;
    
    console.log('[INTEGRATION-TEST] ✓ AI Context Generation test passed');

    // Test 5: Pricing Adjustments
    console.log('[INTEGRATION-TEST] Testing Pricing Adjustments...');
    await testPricingAdjustments(companyId, comprehensiveSettings);
    results.pricingAdjustments = true;
    
    console.log('[INTEGRATION-TEST] ✓ Pricing Adjustments test passed');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    results.errors.push(errorMessage);
    console.error('[INTEGRATION-TEST] Test failed:', errorMessage);
  }

  results.performance.totalTestTime = Date.now() - startTime;
  
  console.log('[INTEGRATION-TEST] Integration tests completed:', {
    settingsIntegration: results.settingsIntegration,
    quoteCalculator: results.quoteCalculator,
    helperFunctions: results.helperFunctions,
    aiContext: results.aiContext,
    pricingAdjustments: results.pricingAdjustments,
    errors: results.errors.length,
    warnings: results.warnings.length,
    performance: results.performance
  });

  return results;
}

/**
 * Test Settings Integration Service
 */
async function testSettingsIntegration(companyId: number): Promise<ComprehensiveSettings> {
  // Test getting comprehensive settings
  const settings = await getCompanySettings(companyId);
  
  // Validate structure
  if (!settings.company) {
    throw new Error('Company data missing from comprehensive settings');
  }
  
  if (!settings.pricingConfig) {
    throw new Error('Pricing config missing from comprehensive settings');
  }
  
  if (!settings.computed) {
    throw new Error('Computed settings missing from comprehensive settings');
  }
  
  // Validate computed values are reasonable
  if (settings.computed.hourlyRate <= 0 || settings.computed.hourlyRate > 200) {
    throw new Error(`Invalid hourly rate: ${settings.computed.hourlyRate}`);
  }
  
  if (settings.computed.taxRate < 0 || settings.computed.taxRate > 20) {
    throw new Error(`Invalid tax rate: ${settings.computed.taxRate}`);
  }
  
  if (settings.computed.paintCoverage <= 0 || settings.computed.paintCoverage > 500) {
    throw new Error(`Invalid paint coverage: ${settings.computed.paintCoverage}`);
  }
  
  console.log('[INTEGRATION-TEST] Settings validation passed:', {
    companyName: settings.company.company_name,
    hourlyRate: settings.computed.hourlyRate,
    taxRate: settings.computed.taxRate,
    paintProducts: settings.paintProducts.length
  });
  
  return settings;
}

/**
 * Test Helper Functions
 */
async function testHelperFunctions(companyId: number): Promise<void> {
  // Test quick price estimate
  const estimate = await quickPriceEstimate(companyId, 1000, 300);
  
  if (!estimate.low || !estimate.high || !estimate.recommended) {
    throw new Error('Quick price estimate missing required fields');
  }
  
  if (estimate.low >= estimate.high) {
    throw new Error('Quick price estimate range invalid');
  }
  
  if (estimate.recommended < estimate.low || estimate.recommended > estimate.high) {
    throw new Error('Quick price estimate recommended value out of range');
  }
  
  // Test seasonal multiplier
  const seasonMultiplier = await getCurrentSeasonMultiplier(companyId);
  if (seasonMultiplier <= 0 || seasonMultiplier > 2) {
    throw new Error(`Invalid seasonal multiplier: ${seasonMultiplier}`);
  }
  
  // Test location multiplier
  const locationMultiplier = await getLocationMultiplier(companyId, 'suburban');
  if (locationMultiplier <= 0 || locationMultiplier > 2) {
    throw new Error(`Invalid location multiplier: ${locationMultiplier}`);
  }
  
  // Test pricing multipliers
  const adjustedPrice = await applyPricingMultipliers(1000, companyId, {
    locationType: 'urban',
    isRushJob: true,
    complexity: 'detailed'
  });
  
  if (adjustedPrice <= 1000) {
    throw new Error('Pricing multipliers not applied correctly');
  }
  
  // Test input validation
  const validation = await validateQuoteInput(companyId, {
    surfaces: { walls: 1000, ceilings: 300 }
  });
  
  if (!validation.isValid && validation.errors.length > 0) {
    throw new Error('Input validation failed for valid input');
  }
  
  console.log('[INTEGRATION-TEST] Helper functions validation passed:', {
    estimate,
    seasonMultiplier,
    locationMultiplier,
    adjustedPrice,
    validationPassed: validation.isValid
  });
}

/**
 * Test Enhanced Quote Calculator
 */
async function testEnhancedQuoteCalculator(companyId: number): Promise<void> {
  const input = {
    companyId,
    surfaces: {
      walls: 1200,
      ceilings: 400,
      trim: 200,
      doors: 2,
      windows: 4
    },
    projectDetails: {
      paintQuality: 'premium' as const,
      prepCondition: 'minor' as const,
      complexity: 'detailed' as const,
      locationType: 'urban' as const,
      rushJob: true
    }
  };
  
  const quote = await EnhancedQuoteCalculator.calculate(input);
  
  // Validate quote structure
  if (!quote.materials || !quote.labor || !quote.total) {
    throw new Error('Quote missing required fields');
  }
  
  if (quote.total <= 0) {
    throw new Error('Quote total must be positive');
  }
  
  if (quote.materials.total <= 0) {
    throw new Error('Materials cost must be positive');
  }
  
  if (quote.labor.adjustedTotal <= 0) {
    throw new Error('Labor cost must be positive');
  }
  
  // Validate adjustments were applied
  if (quote.adjustmentsSummary.totalMultiplier <= 1) {
    throw new Error('Adjustments should have increased the price');
  }
  
  // Validate breakdown exists
  if (!quote.breakdown || !quote.breakdown.labor) {
    throw new Error('Quote breakdown missing');
  }
  
  // Validate settings were used
  if (!quote.usedSettings || !quote.usedSettings.companyName) {
    throw new Error('Used settings missing from quote');
  }
  
  console.log('[INTEGRATION-TEST] Enhanced calculator validation passed:', {
    total: quote.total,
    adjustments: quote.adjustmentsSummary.totalMultiplier,
    timeline: quote.timeline,
    companyUsed: quote.usedSettings.companyName
  });
}

/**
 * Test AI Context Generation
 */
async function testAIContextGeneration(companyId: number): Promise<void> {
  const aiContext = await getAIContextString(companyId);
  
  if (!aiContext || aiContext.length < 100) {
    throw new Error('AI context too short or missing');
  }
  
  // Check for required sections
  const requiredSections = [
    'COMPANY SETTINGS',
    'SEASONAL PRICING',
    'LOCATION PRICING',
    'PAINT PRODUCTS',
    'PRICING ADJUSTMENTS'
  ];
  
  for (const section of requiredSections) {
    if (!aiContext.includes(section)) {
      throw new Error(`AI context missing required section: ${section}`);
    }
  }
  
  // Check for dynamic content
  if (!aiContext.includes('Tax Rate:') || !aiContext.includes('Labor Rate:')) {
    throw new Error('AI context missing dynamic company data');
  }
  
  console.log('[INTEGRATION-TEST] AI context validation passed:', {
    length: aiContext.length,
    sectionsFound: requiredSections.length
  });
}

/**
 * Test Pricing Adjustments
 */
async function testPricingAdjustments(companyId: number, settings: ComprehensiveSettings): Promise<void> {
  const basePrice = 1000;
  
  // Test different scenarios
  const scenarios = [
    { locationType: 'urban' as const, expected: 'increase' },
    { locationType: 'rural' as const, expected: 'decrease' },
    { isRushJob: true, expected: 'increase' },
    { complexity: 'custom' as const, expected: 'increase' },
    { prepWork: 'heavy' as const, expected: 'increase' },
    { ceilingHeight: 'cathedral' as const, expected: 'increase' }
  ];
  
  for (const scenario of scenarios) {
    const adjustedPrice = await applyPricingMultipliers(basePrice, companyId, scenario);
    
    if (scenario.expected === 'increase' && adjustedPrice <= basePrice) {
      throw new Error(`Scenario ${JSON.stringify(scenario)} should increase price but didn't`);
    }
    
    if (scenario.expected === 'decrease' && adjustedPrice >= basePrice) {
      throw new Error(`Scenario ${JSON.stringify(scenario)} should decrease price but didn't`);
    }
  }
  
  // Test seasonal adjustments
  const seasons = ['spring', 'summer', 'fall', 'winter'] as const;
  for (const season of seasons) {
    const adjustedPrice = await applyPricingMultipliers(basePrice, companyId, { season });
    
    if (adjustedPrice <= 0) {
      throw new Error(`Seasonal adjustment for ${season} produced invalid price`);
    }
  }
  
  console.log('[INTEGRATION-TEST] Pricing adjustments validation passed for all scenarios');
}

/**
 * Performance benchmark test
 */
export async function benchmarkSettingsIntegration(companyId: number, iterations: number = 10): Promise<any> {
  console.log(`[BENCHMARK] Running performance benchmark with ${iterations} iterations...`);
  
  const results = {
    settingsLoad: [] as number[],
    calculation: [] as number[],
    aiContext: [] as number[]
  };
  
  for (let i = 0; i < iterations; i++) {
    // Clear cache to test fresh loads
    SettingsIntegrationService.clearCache();
    
    // Benchmark settings loading
    const settingsStart = Date.now();
    await getCompanySettings(companyId);
    results.settingsLoad.push(Date.now() - settingsStart);
    
    // Benchmark calculation
    const calcStart = Date.now();
    await quickPriceEstimate(companyId, 1000, 300);
    results.calculation.push(Date.now() - calcStart);
    
    // Benchmark AI context
    const aiStart = Date.now();
    await getAIContextString(companyId);
    results.aiContext.push(Date.now() - aiStart);
  }
  
  const stats = {
    settingsLoad: {
      avg: results.settingsLoad.reduce((a, b) => a + b, 0) / iterations,
      min: Math.min(...results.settingsLoad),
      max: Math.max(...results.settingsLoad)
    },
    calculation: {
      avg: results.calculation.reduce((a, b) => a + b, 0) / iterations,
      min: Math.min(...results.calculation),
      max: Math.max(...results.calculation)
    },
    aiContext: {
      avg: results.aiContext.reduce((a, b) => a + b, 0) / iterations,
      min: Math.min(...results.aiContext),
      max: Math.max(...results.aiContext)
    }
  };
  
  console.log('[BENCHMARK] Performance results:', stats);
  return stats;
}

// Export for use in applications
export { TestResults };