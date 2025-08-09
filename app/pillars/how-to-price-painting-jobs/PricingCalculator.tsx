'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'

export default function PricingCalculator() {
  const [sqft, setSqft] = useState('')
  const [laborRate, setLaborRate] = useState('45')
  const [paintCost, setPaintCost] = useState('35')
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  useEffect(() => {
    if (sqft && laborRate && paintCost) {
      const area = parseFloat(sqft)
      const labor = parseFloat(laborRate)
      const paint = parseFloat(paintCost)
      
      // Professional pricing formula
      const laborHours = area / 350 * 8 // 350 sqft per day, 8 hours
      const laborCost = laborHours * labor
      const paintGallons = area / 350 // 1 gallon per 350 sqft
      const materialCost = paintGallons * paint
      const overhead = (laborCost + materialCost) * 0.20
      const profit = (laborCost + materialCost + overhead) * 0.35
      
      const total = laborCost + materialCost + overhead + profit
      setEstimatedPrice(Math.round(total))
    }
  }, [sqft, laborRate, paintCost])

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 ring-2 ring-yellow-400">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">HOT</span>
        <span className="text-yellow-300 text-sm">847 contractors used this today</span>
      </div>
      <h3 className="text-2xl font-bold mb-6">The $47K Calculator That Changes Everything</h3>
      <div className="space-y-4">
        <div>
          <Label className="text-white mb-2">Square Footage</Label>
          <Input
            type="number"
            placeholder="Enter square feet"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
          />
        </div>
        <div>
          <Label className="text-white mb-2">Hourly Labor Rate</Label>
          <Input
            type="number"
            value={laborRate}
            onChange={(e) => setLaborRate(e.target.value)}
            className="bg-white/20 border-white/30 text-white"
          />
        </div>
        {estimatedPrice > 0 && (
          <div className="bg-green-500/20 border-2 border-green-400 rounded-lg p-4 mt-4">
            <div className="text-sm text-green-100 mb-1">Your Professional Quote</div>
            <div className="text-3xl font-bold text-green-100">${estimatedPrice.toLocaleString()}</div>
            <div className="text-xs text-green-200 mt-2">⬆ This includes proper profit margins (most contractors miss this)</div>
            <Button className="w-full mt-3 bg-green-500 hover:bg-green-600 text-black font-bold" size="sm">
              Get This Quote as PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}