export interface CalculatorInput {
  surfaces: {
    walls?: number;      // sqft
    ceilings?: number;   // sqft
    trim?: number;       // linear ft
    doors?: number;      // count
    windows?: number;    // count
    priming?: number;    // sqft needing primer
  };
  paintProducts?: {
    walls?: { name: string; coverageRate: number; costPerGallon: number };
    ceiling?: { name: string; coverageRate: number; costPerGallon: number };
    trim?: { name: string; coverageRate: number; costPerGallon: number };
    primer?: { name: string; coverageRate: number; costPerGallon: number };
  };
  paintQuality?: 'good' | 'better' | 'best';
  laborRate?: number;  // per hour
  companyRates?: {
    paintingRate?: number;
    primingRate?: number;
    trimRate?: number;
    doorRate?: number;
    windowRate?: number;
    overheadPercent?: number;
    profitMargin?: number;
  };
  prepCondition?: 'good' | 'minor' | 'major';
  rushJob?: boolean;
  markupPercentage?: number;
  taxRate?: number;
}

interface Room {
  length?: number;
  width?: number;
  height?: number;
  doors?: number;
  windows?: number;
}

export interface CalculatorOutput {
  materials: {
    paint: number;
    supplies: number;
    total: number;
  };
  labor: {
    hours: number;
    rate: number;
    total: number;
  };
  subtotal: number;
  markup: number;
  tax: number;
  total: number;
  timeline: string;
  breakdown: {
    walls?: { sqft: number; cost: number };
    ceilings?: { sqft: number; cost: number };
    trim?: { linearFt: number; cost: number };
    doors?: { count: number; cost: number };
    windows?: { count: number; cost: number };
    primer?: { gallons: number; product: string; cost: number };
    wallPaint?: { gallons: number; product: string; cost: number };
    ceilingPaint?: { gallons: number; product: string; cost: number };
    supplies?: number;
    prepWork?: { hours: number; cost: number };
    painting?: { hours: number; cost: number };
  };
}

export class QuoteCalculator {
  // Default rates and constants
  private static readonly DEFAULT_COVERAGE = 350; // sqft per gallon
  private static readonly DEFAULT_LABOR_RATE = 45; // per hour
  private static readonly SUPPLIES_BASE = 100; // base supplies cost
  private static readonly SUPPLIES_PERCENTAGE = 0.12; // 12% of materials for sundries
  private static readonly GALLON_MULTIPLIER = 1.8; // account for multiple coats
  
  // Paint costs per gallon by quality (fallback if no products specified)
  private static readonly PAINT_COSTS = {
    good: 25,
    better: 35,
    best: 50
  };
  
  // Default productivity rates (sqft per hour)
  private static readonly PRODUCTIVITY_RATES = {
    walls: 150,      // sqft per hour
    ceilings: 100,   // sqft per hour
    trim: 60,        // linear ft per hour
    doors: 2,        // hours per door
    windows: 3,      // hours per window
    priming: 200     // sqft per hour
  };
  
  // Prep work adjustments
  private static readonly PREP_ADJUSTMENTS = {
    good: 0,      // no additional prep
    minor: 0.10,  // 10% additional labor
    major: 0.25   // 25% additional labor
  };
  
  // Rush job adjustment
  private static readonly RUSH_ADJUSTMENT = 0.15; // 15% additional labor

  static calculate(input: CalculatorInput): CalculatorOutput {
    const breakdown: CalculatorOutput['breakdown'] = {};
    let materialsCost = 0;
    let laborHours = 0;
    
    // Calculate primer if needed
    if (input.surfaces.priming) {
      const primerCoverage = input.paintProducts?.primer?.coverageRate || this.DEFAULT_COVERAGE;
      const primerGallons = Math.ceil(input.surfaces.priming / primerCoverage);
      const primerCost = primerGallons * (input.paintProducts?.primer?.costPerGallon || 20);
      materialsCost += primerCost;
      breakdown.primer = {
        gallons: primerGallons,
        product: input.paintProducts?.primer?.name || 'Standard Primer',
        cost: primerCost
      };
      
      // Add priming labor
      laborHours += input.surfaces.priming / this.PRODUCTIVITY_RATES.priming;
    }
    
    // Calculate wall paint
    if (input.surfaces.walls) {
      const wallCoverage = input.paintProducts?.walls?.coverageRate || this.DEFAULT_COVERAGE;
      const wallGallons = Math.ceil((input.surfaces.walls / wallCoverage) * this.GALLON_MULTIPLIER);
      const wallPaintCost = wallGallons * (input.paintProducts?.walls?.costPerGallon || this.PAINT_COSTS[input.paintQuality || 'better']);
      materialsCost += wallPaintCost;
      breakdown.wallPaint = {
        gallons: wallGallons,
        product: input.paintProducts?.walls?.name || 'Wall Paint',
        cost: wallPaintCost
      };
      
      // Add wall painting labor
      laborHours += input.surfaces.walls / this.PRODUCTIVITY_RATES.walls;
    }
    
    // Calculate ceiling paint
    if (input.surfaces.ceilings) {
      const ceilingCoverage = input.paintProducts?.ceiling?.coverageRate || this.DEFAULT_COVERAGE;
      const ceilingGallons = Math.ceil((input.surfaces.ceilings / ceilingCoverage) * this.GALLON_MULTIPLIER);
      const ceilingPaintCost = ceilingGallons * (input.paintProducts?.ceiling?.costPerGallon || this.PAINT_COSTS[input.paintQuality || 'better']);
      materialsCost += ceilingPaintCost;
      breakdown.ceilingPaint = {
        gallons: ceilingGallons,
        product: input.paintProducts?.ceiling?.name || 'Ceiling Paint',
        cost: ceilingPaintCost
      };
      
      // Add ceiling painting labor
      laborHours += input.surfaces.ceilings / this.PRODUCTIVITY_RATES.ceilings;
    }
    
    // Add trim/door/window labor
    if (input.surfaces.trim) {
      laborHours += input.surfaces.trim / this.PRODUCTIVITY_RATES.trim;
    }
    if (input.surfaces.doors) {
      laborHours += input.surfaces.doors * this.PRODUCTIVITY_RATES.doors;
    }
    if (input.surfaces.windows) {
      laborHours += input.surfaces.windows * this.PRODUCTIVITY_RATES.windows;
    }
    
    // Calculate supplies
    const suppliesCost = this.SUPPLIES_BASE + (materialsCost * this.SUPPLIES_PERCENTAGE);
    breakdown.supplies = suppliesCost;
    materialsCost += suppliesCost;
    
    // Apply prep work adjustment
    let prepHours = 0;
    if (input.prepCondition && input.prepCondition !== 'good') {
      prepHours = laborHours * this.PREP_ADJUSTMENTS[input.prepCondition];
      breakdown.prepWork = {
        hours: Math.round(prepHours * 10) / 10,
        cost: prepHours * (input.laborRate || this.DEFAULT_LABOR_RATE)
      };
    }
    
    // Apply rush job adjustment
    if (input.rushJob) {
      laborHours += laborHours * this.RUSH_ADJUSTMENT;
    }
    
    // Calculate painting labor cost
    const paintingHours = laborHours;
    const laborRate = input.laborRate || this.DEFAULT_LABOR_RATE;
    const paintingLaborCost = paintingHours * laborRate;
    const prepLaborCost = prepHours * laborRate;
    const totalLaborCost = paintingLaborCost + prepLaborCost;
    
    breakdown.painting = {
      hours: Math.round(paintingHours * 10) / 10,
      cost: paintingLaborCost
    };
    
    // Add surface breakdown for reference
    if (input.surfaces.walls) {
      breakdown.walls = { sqft: input.surfaces.walls, cost: 0 };
    }
    if (input.surfaces.ceilings) {
      breakdown.ceilings = { sqft: input.surfaces.ceilings, cost: 0 };
    }
    if (input.surfaces.trim) {
      breakdown.trim = { linearFt: input.surfaces.trim, cost: 0 };
    }
    if (input.surfaces.doors) {
      breakdown.doors = { count: input.surfaces.doors, cost: 0 };
    }
    if (input.surfaces.windows) {
      breakdown.windows = { count: input.surfaces.windows, cost: 0 };
    }
    
    // Calculate totals with company rates
    const subtotal = materialsCost + totalLaborCost;
    const overheadPercent = input.companyRates?.overheadPercent || 15;
    const profitMargin = input.companyRates?.profitMargin || input.markupPercentage || 30;
    
    // Apply overhead and profit
    const overhead = subtotal * (overheadPercent / 100);
    const profit = subtotal * (profitMargin / 100);
    const markup = overhead + profit;
    
    const beforeTax = subtotal + markup;
    const taxRate = (input.taxRate || 0) / 100;
    const tax = beforeTax * taxRate;
    const total = beforeTax + tax;
    
    // Estimate timeline
    const totalHours = paintingHours + prepHours;
    const hoursPerDay = 8;
    const daysNeeded = Math.ceil(totalHours / hoursPerDay);
    let timeline = '';
    if (daysNeeded <= 1) {
      timeline = '1 day';
    } else if (daysNeeded <= 3) {
      timeline = `${daysNeeded} days`;
    } else if (daysNeeded <= 5) {
      timeline = '1 week';
    } else {
      timeline = `${Math.ceil(daysNeeded / 5)} weeks`;
    }
    
    return {
      materials: {
        paint: materialsCost - suppliesCost,
        supplies: suppliesCost,
        total: materialsCost
      },
      labor: {
        hours: Math.round((paintingHours + prepHours) * 10) / 10,
        rate: laborRate,
        total: totalLaborCost
      },
      subtotal,
      markup,
      tax,
      total,
      timeline,
      breakdown
    };
  }

  static estimateFromRooms(rooms: unknown[], paintQuality?: 'good' | 'better' | 'best'): CalculatorInput {
    let totalWalls = 0;
    let totalCeilings = 0;
    let totalDoors = 0;
    let totalWindows = 0;
    let totalTrim = 0;
    
    rooms.forEach((room) => {
      const r = room as Room;
      // Estimate wall area (perimeter * height)
      if (r.length && r.width && r.height) {
        const perimeter = 2 * (r.length + r.width);
        const wallArea = perimeter * r.height;
        totalWalls += wallArea;
        
        // Ceiling area
        const ceilingArea = r.length * r.width;
        totalCeilings += ceilingArea;
        
        // Estimate trim (baseboard)
        totalTrim += perimeter;
      }
      
      // Count doors and windows
      totalDoors += r.doors || 1;
      totalWindows += r.windows || 2;
    });
    
    // Subtract door and window area from walls
    const doorArea = totalDoors * 21; // 3x7 ft door
    const windowArea = totalWindows * 15; // 3x5 ft window
    totalWalls = Math.max(0, totalWalls - doorArea - windowArea);
    
    return {
      surfaces: {
        walls: Math.round(totalWalls),
        ceilings: Math.round(totalCeilings),
        trim: Math.round(totalTrim),
        doors: totalDoors,
        windows: totalWindows
      },
      paintQuality: paintQuality || 'better'
    };
  }
}

// Export singleton instance for convenience
export const calculator = new QuoteCalculator();