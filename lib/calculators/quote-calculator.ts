export interface CalculatorInput {
  surfaces: {
    walls?: number;      // sqft
    ceilings?: number;   // sqft
    trim?: number;       // linear ft
    doors?: number;      // count
    windows?: number;    // count
  };
  paintQuality?: 'good' | 'better' | 'best';
  laborRate?: number;  // per sqft
  markupPercentage?: number;
  taxRate?: number;
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
  breakdown: {
    walls?: { sqft: number; cost: number };
    ceilings?: { sqft: number; cost: number };
    trim?: { linearFt: number; cost: number };
    doors?: { count: number; cost: number };
    windows?: { count: number; cost: number };
  };
}

export class QuoteCalculator {
  // Default rates and constants
  private static readonly COVERAGE_PER_GALLON = 350; // sqft
  private static readonly DEFAULT_LABOR_RATE = 45; // per hour
  private static readonly SUPPLIES_PERCENTAGE = 0.15; // 15% of paint cost
  
  // Paint costs per gallon by quality
  private static readonly PAINT_COSTS = {
    good: 35,
    better: 55,
    best: 75
  };
  
  // Labor rates per sqft/unit
  private static readonly LABOR_RATES = {
    walls: 1.50,
    ceilings: 2.00,
    trim: 0.25, // per linear ft
    doors: 50,   // per door
    windows: 35  // per window
  };

  static calculate(input: CalculatorInput): CalculatorOutput {
    // Calculate paint needs
    const totalSqft = (input.surfaces.walls || 0) + (input.surfaces.ceilings || 0);
    const gallonsNeeded = Math.ceil(totalSqft / this.COVERAGE_PER_GALLON);
    const paintCostPerGallon = this.PAINT_COSTS[input.paintQuality || 'better'];
    const paintCost = gallonsNeeded * paintCostPerGallon;
    
    // Calculate supplies
    const suppliesCost = paintCost * this.SUPPLIES_PERCENTAGE;
    
    // Calculate labor
    let laborCost = 0;
    const breakdown: any = {};
    
    if (input.surfaces.walls) {
      const cost = input.surfaces.walls * this.LABOR_RATES.walls;
      laborCost += cost;
      breakdown.walls = { sqft: input.surfaces.walls, cost };
    }
    
    if (input.surfaces.ceilings) {
      const cost = input.surfaces.ceilings * this.LABOR_RATES.ceilings;
      laborCost += cost;
      breakdown.ceilings = { sqft: input.surfaces.ceilings, cost };
    }
    
    if (input.surfaces.trim) {
      const cost = input.surfaces.trim * this.LABOR_RATES.trim;
      laborCost += cost;
      breakdown.trim = { linearFt: input.surfaces.trim, cost };
    }
    
    if (input.surfaces.doors) {
      const cost = input.surfaces.doors * this.LABOR_RATES.doors;
      laborCost += cost;
      breakdown.doors = { count: input.surfaces.doors, cost };
    }
    
    if (input.surfaces.windows) {
      const cost = input.surfaces.windows * this.LABOR_RATES.windows;
      laborCost += cost;
      breakdown.windows = { count: input.surfaces.windows, cost };
    }
    
    // Calculate totals
    const materialTotal = paintCost + suppliesCost;
    const subtotal = materialTotal + laborCost;
    const markupRate = (input.markupPercentage || 30) / 100;
    const markup = subtotal * markupRate;
    const beforeTax = subtotal + markup;
    const taxRate = (input.taxRate || 0) / 100;
    const tax = beforeTax * taxRate;
    const total = beforeTax + tax;
    
    // Estimate labor hours
    const laborHours = laborCost / (input.laborRate || this.DEFAULT_LABOR_RATE);
    
    return {
      materials: {
        paint: paintCost,
        supplies: suppliesCost,
        total: materialTotal
      },
      labor: {
        hours: Math.round(laborHours * 10) / 10,
        rate: input.laborRate || this.DEFAULT_LABOR_RATE,
        total: laborCost
      },
      subtotal,
      markup,
      tax,
      total,
      breakdown
    };
  }

  static estimateFromRooms(rooms: any[], paintQuality?: 'good' | 'better' | 'best'): CalculatorInput {
    let totalWalls = 0;
    let totalCeilings = 0;
    let totalDoors = 0;
    let totalWindows = 0;
    let totalTrim = 0;
    
    rooms.forEach(room => {
      // Estimate wall area (perimeter * height)
      if (room.length && room.width && room.height) {
        const perimeter = 2 * (room.length + room.width);
        const wallArea = perimeter * room.height;
        totalWalls += wallArea;
        
        // Ceiling area
        const ceilingArea = room.length * room.width;
        totalCeilings += ceilingArea;
        
        // Estimate trim (baseboard)
        totalTrim += perimeter;
      }
      
      // Count doors and windows
      totalDoors += room.doors || 1;
      totalWindows += room.windows || 2;
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
export const calculator = QuoteCalculator;