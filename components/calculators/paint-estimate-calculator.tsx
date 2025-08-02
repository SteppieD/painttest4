'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input' // TODO: Check if this import is needed
// import { Label } from '@/components/ui/label' // TODO: Check if this import is needed
// import { Button } from '@/components/ui/button' // TODO: Check if this import is needed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calculator, Info, DollarSign, Clock, Paintbrush } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
 // TODO: Check if this import is needed
interface CalculatorProps {
  className?: string
  variant?: 'default' | 'glass'
}

export function PaintEstimateCalculator({ className = '', variant = 'glass' }: CalculatorProps) {
  const [roomType, setRoomType] = useState<string>('bedroom')
  const [roomSize, setRoomSize] = useState<string>('')
  const [ceilingHeight, setCeilingHeight] = useState<string>('8')
  const [coats, setCoats] = useState<string>('2')
  const [paintQuality, setPaintQuality] = useState<string>('mid')
  const [laborRate, setLaborRate] = useState<string>('45')
  interface CalculationResults {
    roomType: string;
    sqft: number;
    wallArea: number;
    gallonsNeeded: number;
    paintCost: number;
    hoursNeeded: number;
    laborCost: number;
    materialsCost: number;
    subtotal: number;
    overhead: number;
    profit: number;
    total: number;
    pricePerSqft: string;
  }

  const [results, setResults] = useState<CalculationResults | null>(null)

  const roomDefaults: Record<string, { sqft: number; name: string }> = {
    bedroom: { sqft: 150, name: 'Bedroom' },
    bathroom: { sqft: 50, name: 'Bathroom' },
    kitchen: { sqft: 200, name: 'Kitchen' },
    livingroom: { sqft: 300, name: 'Living Room' },
    diningroom: { sqft: 200, name: 'Dining Room' },
    office: { sqft: 120, name: 'Office' },
    custom: { sqft: 0, name: 'Custom Size' }
  }

  const paintPrices: Record<string, number> = {
    economy: 25,
    mid: 40,
    premium: 60
  }

  const calculateEstimate = () => {
    const sqft = roomType === 'custom' ? parseInt(roomSize) || 0 : roomDefaults[roomType].sqft
    const height = parseFloat(ceilingHeight)
    const numCoats = parseInt(coats)
    const rate = parseFloat(laborRate)
    
    // Calculate wall area (perimeter × height - subtract for doors/windows)
    const perimeter = Math.sqrt(sqft) * 4 // Approximate for square room
    const wallArea = perimeter * height
    const paintableArea = wallArea * 0.85 // 15% reduction for doors/windows
    
    // Paint calculations
    const coveragePerGallon = 350 // sq ft per gallon
    const totalCoverage = paintableArea * numCoats
    const gallonsNeeded = Math.ceil(totalCoverage / coveragePerGallon)
    const paintCost = gallonsNeeded * paintPrices[paintQuality]
    
    // Labor calculations
    const sqftPerHour = 150 // Professional painter rate
    const hoursNeeded = (paintableArea * numCoats) / sqftPerHour
    const laborCost = hoursNeeded * rate
    
    // Materials (brushes, tape, drop cloths, etc.)
    const materialsCost = sqft * 0.50
    
    // Total
    const subtotal = paintCost + laborCost + materialsCost
    const overhead = subtotal * 0.20 // 20% overhead
    const profit = subtotal * 0.30 // 30% profit margin
    const total = subtotal + overhead + profit

    setResults({
      roomType: roomDefaults[roomType].name,
      sqft,
      wallArea: Math.round(paintableArea),
      gallonsNeeded,
      paintCost: Math.round(paintCost),
      hoursNeeded: Math.round(hoursNeeded * 10) / 10,
      laborCost: Math.round(laborCost),
      materialsCost: Math.round(materialsCost),
      subtotal: Math.round(subtotal),
      overhead: Math.round(overhead),
      profit: Math.round(profit),
      total: Math.round(total),
      pricePerSqft: (total / sqft).toFixed(2)
    })
  }

  const cardClass = variant === 'glass' ? 'glass-card' : ''

  return (
    <Card className={`${cardClass} ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calculator className="h-5 w-5" />
          Quick Paint Estimate Calculator
        </CardTitle>
        <CardDescription className="text-gray-100">
          Get instant estimates for your painting projects
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Room Type */}
          <div className="space-y-2">
            <Label className="text-white">Room Type</Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="glass-card border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bedroom">Bedroom (150 sq ft)</SelectItem>
                <SelectItem value="bathroom">Bathroom (50 sq ft)</SelectItem>
                <SelectItem value="kitchen">Kitchen (200 sq ft)</SelectItem>
                <SelectItem value="livingroom">Living Room (300 sq ft)</SelectItem>
                <SelectItem value="diningroom">Dining Room (200 sq ft)</SelectItem>
                <SelectItem value="office">Office (120 sq ft)</SelectItem>
                <SelectItem value="custom">Custom Size</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Size */}
          {roomType === 'custom' && (
            <div className="space-y-2">
              <Label className="text-white">Room Size (sq ft)</Label>
              <Input
                type="number"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                placeholder="Enter square footage"
                className="glass-card border-white/20 text-white placeholder:text-gray-200"
              />
            </div>
          )}

          {/* Ceiling Height */}
          <div className="space-y-2">
            <Label className="text-white">Ceiling Height (ft)</Label>
            <Select value={ceilingHeight} onValueChange={setCeilingHeight}>
              <SelectTrigger className="glass-card border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8 ft (Standard)</SelectItem>
                <SelectItem value="9">9 ft</SelectItem>
                <SelectItem value="10">10 ft</SelectItem>
                <SelectItem value="12">12 ft (Vaulted)</SelectItem>
                <SelectItem value="14">14 ft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Number of Coats */}
          <div className="space-y-2">
            <Label className="text-white">Number of Coats</Label>
            <Select value={coats} onValueChange={setCoats}>
              <SelectTrigger className="glass-card border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Coat (Touch-up)</SelectItem>
                <SelectItem value="2">2 Coats (Standard)</SelectItem>
                <SelectItem value="3">3 Coats (Color Change)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Paint Quality */}
          <div className="space-y-2">
            <Label className="text-white">Paint Quality</Label>
            <Select value={paintQuality} onValueChange={setPaintQuality}>
              <SelectTrigger className="glass-card border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy ($25/gal)</SelectItem>
                <SelectItem value="mid">Mid-Grade ($40/gal)</SelectItem>
                <SelectItem value="premium">Premium ($60/gal)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Labor Rate */}
          <div className="space-y-2">
            <Label className="text-white">Labor Rate ($/hour)</Label>
            <Input
              type="number"
              value={laborRate}
              onChange={(e) => setLaborRate(e.target.value)}
              className="glass-card border-white/20 text-white"
            />
          </div>
        </div>

        <Button 
          onClick={calculateEstimate}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          Calculate Estimate
        </Button>

        {/* Results */}
        {results && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white">Estimate Breakdown</h3>
            
            <div className="grid gap-3">
              {/* Room Info */}
              <div className="flex justify-between text-base">
                <span className="text-gray-200">Room Type:</span>
                <span className="text-white font-medium">{results.roomType}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-200">Total Square Footage:</span>
                <span className="text-white font-medium">{results.sqft} sq ft</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-200">Wall Area:</span>
                <span className="text-white font-medium">{results.wallArea} sq ft</span>
              </div>

              <div className="border-t border-white/10 pt-3 space-y-2">
                {/* Materials */}
                <div className="flex justify-between text-base">
                  <span className="text-gray-200 flex items-center gap-1">
                    <Paintbrush className="h-4 w-4" />
                    Paint ({results.gallonsNeeded} gallons):
                  </span>
                  <span className="text-white font-medium">${results.paintCost}</span>
                </div>
                
                {/* Labor */}
                <div className="flex justify-between text-base">
                  <span className="text-gray-200 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Labor ({results.hoursNeeded} hours):
                  </span>
                  <span className="text-white font-medium">${results.laborCost}</span>
                </div>
                
                {/* Materials */}
                <div className="flex justify-between text-base">
                  <span className="text-gray-200">Materials & Supplies:</span>
                  <span className="text-white font-medium">${results.materialsCost}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 space-y-2">
                <div className="flex justify-between text-base">
                  <span className="text-gray-200">Subtotal:</span>
                  <span className="text-white">${results.subtotal}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-200">Overhead (20%):</span>
                  <span className="text-white">${results.overhead}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-200">Profit (30%):</span>
                  <span className="text-white">${results.profit}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total Estimate:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-400">${results.total}</span>
                    <div className="text-base text-gray-200">${results.pricePerSqft}/sq ft</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-base text-gray-100 flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                This is an estimate only. Actual costs may vary based on wall condition, 
                prep work needed, trim complexity, and local market rates.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}