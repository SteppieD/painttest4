/**
 * Interior Painting Quote Calculator V2
 * Based on the Interior Painting Quote Model specifications
 */

export interface CalculatorInputV2 {
  // Measurements
  linearFeetWalls?: number;
  ceilingHeight?: number;
  ceilingSqft?: number;
  doors?: number;
  windows?: number;
  
  // Paint products with spread rates
  paintProducts?: {
    primer?: { 
      name: string; 
      spreadRate: number;  // typically 200-300 sqft/gal
      costPerGallon: number; 
    };
    walls?: { 
      name: string; 
      spreadRate: number;  // typically 350-400 sqft/gal
      costPerGallon: number; 
    };
    ceiling?: { 
      name: string; 
      spreadRate: number;  // typically ~350 sqft/gal
      costPerGallon: number; 
    };
    trim?: { 
      name: string;
      doorsPerGallon: number;  // typically 4-5 doors per gallon
      windowsPerGallon: number;  // typically 2-3 windows per gallon
      costPerGallon: number; 
    };
  };
  
  // What needs primer
  needsPrimer?: boolean;
  
  // User-defined pricing rates (completely variable based on preferences)
  pricingRates?: {
    wallsPerSqft?: number;      // Variable based on area, season, product grade
    ceilingsPerSqft?: number;   // Variable based on area, season, product grade
    doorsPerUnit?: number;      // Variable based on complexity, product grade
    windowsPerUnit?: number;    // Variable based on complexity, product grade
    primerPerSqft?: number;     // Variable based on product grade
    
    // Additional factors that affect pricing
    seasonalAdjustment?: number;  // e.g., 1.15 for busy season (15% increase)
    locationMultiplier?: number;  // e.g., 1.2 for high-cost areas
    productGradeMultiplier?: number; // e.g., 0.8 for budget, 1.0 for standard, 1.3 for premium
  };
  
  // Surfaces to paint
  surfaces?: {
    walls?: boolean;
    ceilings?: boolean;
    doors?: boolean;
    windows?: boolean;
    trim?: boolean;
  };
  
  // Overhead and markup
  overheadPercent?: number;
  markupPercent?: number;
  
  // Tax rate
  taxRate?: number;
}

export interface CalculatorOutputV2 {
  // Material calculations
  materials: {
    primer?: {
      sqft: number;
      gallons: number;
      cost: number;
      product: string;
    };
    wallPaint?: {
      sqft: number;
      gallons: number;
      cost: number;
      product: string;
    };
    ceilingPaint?: {
      sqft: number;
      gallons: number;
      cost: number;
      product: string;
    };
    trimPaint?: {
      doorsCount: number;
      windowsCount: number;
      gallons: number;
      cost: number;
      product: string;
    };
    totalMaterialCost: number;
  };
  
  // Labor calculations (based on pricing rates)
  labor: {
    walls?: {
      sqft: number;
      cost: number;
    };
    ceilings?: {
      sqft: number;
      cost: number;
    };
    doors?: {
      count: number;
      cost: number;
    };
    windows?: {
      count: number;
      cost: number;
    };
    primer?: {
      sqft: number;
      cost: number;
    };
    totalLaborCost: number;
  };
  
  // Totals
  subtotal: number;
  overhead: number;
  markup: number;
  taxAmount: number;
  total: number;
  
  // For internal review (can be hidden from customer)
  internalReview: {
    totalWithOverheadMarkup: number;
    profitMargin: number;
  };
}

export class QuoteCalculatorV2 {
  // Default spread rates
  private static readonly DEFAULT_PRIMER_SPREAD = 250;     // sqft/gal
  private static readonly DEFAULT_WALL_SPREAD = 375;       // sqft/gal
  private static readonly DEFAULT_CEILING_SPREAD = 350;    // sqft/gal
  private static readonly DEFAULT_DOORS_PER_GALLON = 4.5;  // doors/gal
  private static readonly DEFAULT_WINDOWS_PER_GALLON = 2.5; // windows/gal
  
  // NO DEFAULT RATES - must be provided by user based on their market
  // These are just fallbacks for testing/demo purposes
  private static readonly FALLBACK_WALL_RATE = 1.50;        // $/sqft
  private static readonly FALLBACK_CEILING_RATE = 1.25;     // $/sqft
  private static readonly FALLBACK_DOOR_RATE = 150;         // $/door
  private static readonly FALLBACK_WINDOW_RATE = 100;       // $/window
  private static readonly FALLBACK_PRIMER_RATE = 0.45;      // $/sqft
  
  // Default paint costs (if products not specified)
  private static readonly DEFAULT_PRIMER_COST = 25;        // $/gal
  private static readonly DEFAULT_WALL_PAINT_COST = 35;    // $/gal
  private static readonly DEFAULT_CEILING_PAINT_COST = 30; // $/gal
  private static readonly DEFAULT_TRIM_PAINT_COST = 40;    // $/gal
  
  // Two coats multiplier
  private static readonly TWO_COATS_MULTIPLIER = 1.8;
  
  static calculate(input: CalculatorInputV2): CalculatorOutputV2 {
    const output: CalculatorOutputV2 = {
      materials: {
        totalMaterialCost: 0
      },
      labor: {
        totalLaborCost: 0
      },
      subtotal: 0,
      overhead: 0,
      markup: 0,
      taxAmount: 0,
      total: 0,
      internalReview: {
        totalWithOverheadMarkup: 0,
        profitMargin: 0
      }
    };
    
    // 1. Calculate wall SQFT if we have linear feet and ceiling height
    let wallSqft = 0;
    if (input.linearFeetWalls && input.ceilingHeight) {
      wallSqft = input.linearFeetWalls * input.ceilingHeight;
    }
    
    // 2. PRIMER CALCULATION
    if (input.needsPrimer && wallSqft > 0) {
      const primerSpread = input.paintProducts?.primer?.spreadRate || this.DEFAULT_PRIMER_SPREAD;
      const primerGallons = Math.ceil(wallSqft / primerSpread);
      const primerCost = primerGallons * (input.paintProducts?.primer?.costPerGallon || this.DEFAULT_PRIMER_COST);
      
      output.materials.primer = {
        sqft: wallSqft,
        gallons: primerGallons,
        cost: primerCost,
        product: input.paintProducts?.primer?.name || 'Standard Primer'
      };
      
      // Primer labor - apply all pricing factors
      const basePrimerRate = input.pricingRates?.primerPerSqft || this.FALLBACK_PRIMER_RATE;
      const primerRate = this.applyPricingFactors(basePrimerRate, input.pricingRates);
      const primerLaborCost = wallSqft * primerRate;
      output.labor.primer = {
        sqft: wallSqft,
        cost: primerLaborCost
      };
      
      output.materials.totalMaterialCost += primerCost;
      output.labor.totalLaborCost += primerLaborCost;
    }
    
    // 3. WALLS CALCULATION
    if (input.surfaces?.walls && wallSqft > 0) {
      const wallSpread = input.paintProducts?.walls?.spreadRate || this.DEFAULT_WALL_SPREAD;
      // For two coats: multiply by 1.8
      const wallGallons = Math.ceil((wallSqft / wallSpread) * this.TWO_COATS_MULTIPLIER);
      const wallPaintCost = wallGallons * (input.paintProducts?.walls?.costPerGallon || this.DEFAULT_WALL_PAINT_COST);
      
      output.materials.wallPaint = {
        sqft: wallSqft,
        gallons: wallGallons,
        cost: wallPaintCost,
        product: input.paintProducts?.walls?.name || 'Wall Paint'
      };
      
      // Wall labor - apply all pricing factors
      const baseWallRate = input.pricingRates?.wallsPerSqft || this.FALLBACK_WALL_RATE;
      const wallRate = this.applyPricingFactors(baseWallRate, input.pricingRates);
      const wallLaborCost = wallSqft * wallRate;
      output.labor.walls = {
        sqft: wallSqft,
        cost: wallLaborCost
      };
      
      output.materials.totalMaterialCost += wallPaintCost;
      output.labor.totalLaborCost += wallLaborCost;
    }
    
    // 4. CEILINGS CALCULATION
    if (input.surfaces?.ceilings && input.ceilingSqft) {
      const ceilingSpread = input.paintProducts?.ceiling?.spreadRate || this.DEFAULT_CEILING_SPREAD;
      // For two coats: multiply by 1.8
      const ceilingGallons = Math.ceil((input.ceilingSqft / ceilingSpread) * this.TWO_COATS_MULTIPLIER);
      const ceilingPaintCost = ceilingGallons * (input.paintProducts?.ceiling?.costPerGallon || this.DEFAULT_CEILING_PAINT_COST);
      
      output.materials.ceilingPaint = {
        sqft: input.ceilingSqft,
        gallons: ceilingGallons,
        cost: ceilingPaintCost,
        product: input.paintProducts?.ceiling?.name || 'Ceiling Paint'
      };
      
      // Ceiling labor - apply all pricing factors
      const baseCeilingRate = input.pricingRates?.ceilingsPerSqft || this.FALLBACK_CEILING_RATE;
      const ceilingRate = this.applyPricingFactors(baseCeilingRate, input.pricingRates);
      const ceilingLaborCost = input.ceilingSqft * ceilingRate;
      output.labor.ceilings = {
        sqft: input.ceilingSqft,
        cost: ceilingLaborCost
      };
      
      output.materials.totalMaterialCost += ceilingPaintCost;
      output.labor.totalLaborCost += ceilingLaborCost;
    }
    
    // 5. TRIM, DOORS, AND WINDOWS CALCULATION
    const needsTrimPaint = (input.surfaces?.doors && input.doors) || (input.surfaces?.windows && input.windows);
    
    if (needsTrimPaint) {
      let trimGallons = 0;
      
      // Doors calculation
      if (input.surfaces?.doors && input.doors) {
        const doorsPerGallon = input.paintProducts?.trim?.doorsPerGallon || this.DEFAULT_DOORS_PER_GALLON;
        const doorsGallons = input.doors / doorsPerGallon;
        trimGallons += doorsGallons;
        
        // Door labor - apply all pricing factors
        const baseDoorRate = input.pricingRates?.doorsPerUnit || this.FALLBACK_DOOR_RATE;
        const doorRate = this.applyPricingFactors(baseDoorRate, input.pricingRates);
        const doorLaborCost = input.doors * doorRate;
        output.labor.doors = {
          count: input.doors,
          cost: doorLaborCost
        };
        output.labor.totalLaborCost += doorLaborCost;
      }
      
      // Windows calculation
      if (input.surfaces?.windows && input.windows) {
        const windowsPerGallon = input.paintProducts?.trim?.windowsPerGallon || this.DEFAULT_WINDOWS_PER_GALLON;
        const windowGallons = input.windows / windowsPerGallon;
        trimGallons += windowGallons;
        
        // Window labor - apply all pricing factors
        const baseWindowRate = input.pricingRates?.windowsPerUnit || this.FALLBACK_WINDOW_RATE;
        const windowRate = this.applyPricingFactors(baseWindowRate, input.pricingRates);
        const windowLaborCost = input.windows * windowRate;
        output.labor.windows = {
          count: input.windows,
          cost: windowLaborCost
        };
        output.labor.totalLaborCost += windowLaborCost;
      }
      
      // Round up trim gallons
      trimGallons = Math.ceil(trimGallons);
      const trimPaintCost = trimGallons * (input.paintProducts?.trim?.costPerGallon || this.DEFAULT_TRIM_PAINT_COST);
      
      output.materials.trimPaint = {
        doorsCount: input.doors || 0,
        windowsCount: input.windows || 0,
        gallons: trimGallons,
        cost: trimPaintCost,
        product: input.paintProducts?.trim?.name || 'Trim Paint'
      };
      
      output.materials.totalMaterialCost += trimPaintCost;
    }
    
    // 6. CALCULATE TOTALS
    // Note: In the spec, labor rates include paint cost, but we're calculating separately for clarity
    // In production, you might want to subtract material costs from labor if they're included
    output.subtotal = output.materials.totalMaterialCost + output.labor.totalLaborCost;
    
    // Apply overhead and markup
    const overheadPercent = input.overheadPercent || 10;
    const markupPercent = input.markupPercent || 20;
    
    output.overhead = output.subtotal * (overheadPercent / 100);
    output.markup = output.subtotal * (markupPercent / 100);
    
    // Internal review total (with overhead and markup)
    output.internalReview.totalWithOverheadMarkup = output.subtotal + output.overhead + output.markup;
    output.internalReview.profitMargin = output.overhead + output.markup;
    
    // Calculate tax
    const taxRate = input.taxRate || 0;
    output.taxAmount = output.internalReview.totalWithOverheadMarkup * (taxRate / 100);
    
    // Final total
    output.total = output.internalReview.totalWithOverheadMarkup + output.taxAmount;
    
    return output;
  }
  
  /**
   * Apply pricing factors (seasonal, location, product grade) to base rate
   */
  private static applyPricingFactors(
    baseRate: number, 
    pricingRates?: CalculatorInputV2['pricingRates']
  ): number {
    let adjustedRate = baseRate;
    
    if (pricingRates?.seasonalAdjustment) {
      adjustedRate *= pricingRates.seasonalAdjustment;
    }
    
    if (pricingRates?.locationMultiplier) {
      adjustedRate *= pricingRates.locationMultiplier;
    }
    
    if (pricingRates?.productGradeMultiplier) {
      adjustedRate *= pricingRates.productGradeMultiplier;
    }
    
    return adjustedRate;
  }
  
  /**
   * Helper method to format output for display
   */
  static formatForCustomer(output: CalculatorOutputV2, hideInternalDetails: boolean = true): string {
    let result = '=== PAINTING QUOTE ===\n\n';
    
    // Materials section
    if (output.materials.primer) {
      result += `PRIMER:\n`;
      result += `  Area: ${output.materials.primer.sqft} sq ft\n`;
      result += `  Product: ${output.materials.primer.product}\n`;
      result += `  Gallons: ${output.materials.primer.gallons}\n\n`;
    }
    
    if (output.materials.wallPaint) {
      result += `WALLS:\n`;
      result += `  Area: ${output.materials.wallPaint.sqft} sq ft\n`;
      result += `  Product: ${output.materials.wallPaint.product}\n`;
      result += `  Gallons: ${output.materials.wallPaint.gallons} (two coats)\n\n`;
    }
    
    if (output.materials.ceilingPaint) {
      result += `CEILINGS:\n`;
      result += `  Area: ${output.materials.ceilingPaint.sqft} sq ft\n`;
      result += `  Product: ${output.materials.ceilingPaint.product}\n`;
      result += `  Gallons: ${output.materials.ceilingPaint.gallons} (two coats)\n\n`;
    }
    
    if (output.materials.trimPaint) {
      result += `TRIM/DOORS/WINDOWS:\n`;
      if (output.materials.trimPaint.doorsCount > 0) {
        result += `  Doors: ${output.materials.trimPaint.doorsCount}\n`;
      }
      if (output.materials.trimPaint.windowsCount > 0) {
        result += `  Windows: ${output.materials.trimPaint.windowsCount}\n`;
      }
      result += `  Product: ${output.materials.trimPaint.product}\n`;
      result += `  Gallons: ${output.materials.trimPaint.gallons}\n\n`;
    }
    
    // Pricing section
    result += `PRICING:\n`;
    result += `  Materials: $${output.materials.totalMaterialCost.toFixed(2)}\n`;
    result += `  Labor: $${output.labor.totalLaborCost.toFixed(2)}\n`;
    result += `  Subtotal: $${output.subtotal.toFixed(2)}\n`;
    
    if (!hideInternalDetails) {
      result += `  Overhead (${output.overhead}): $${output.overhead.toFixed(2)}\n`;
      result += `  Markup: $${output.markup.toFixed(2)}\n`;
    }
    
    if (output.taxAmount > 0) {
      result += `  Tax: $${output.taxAmount.toFixed(2)}\n`;
    }
    
    result += `\nTOTAL: $${output.total.toFixed(2)}\n`;
    
    if (!hideInternalDetails) {
      result += `\n=== INTERNAL REVIEW ===\n`;
      result += `Total with Overhead/Markup: $${output.internalReview.totalWithOverheadMarkup.toFixed(2)}\n`;
      result += `Profit Margin: $${output.internalReview.profitMargin.toFixed(2)}\n`;
    }
    
    return result;
  }
}

// Export singleton for convenience
export const calculatorV2 = new QuoteCalculatorV2();