'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Calculator, ChevronRight, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ROIWidgetProps {
  companyName?: string
  avgQuoteValue?: number
  quotesPerMonth?: number
}

export function ROIWidget({ 
  companyName = "Your Company",
  avgQuoteValue = 2500,
  quotesPerMonth = 10
}: ROIWidgetProps) {
  const [expanded, setExpanded] = useState(false)
  
  // Quick ROI calculations based on typical improvements
  const timePerQuoteNow = 2 // hours
  const timePerQuoteWithApp = 0.25 // 15 minutes
  const quotesIncreaseMultiplier = 2.5
  const closeRateIncrease = 1.4 // 40% increase
  
  const timeSavedPerMonth = (quotesPerMonth * timePerQuoteNow) - (quotesPerMonth * timePerQuoteWithApp)
  const additionalQuotes = Math.floor(quotesPerMonth * (quotesIncreaseMultiplier - 1))
  const potentialExtraRevenue = additionalQuotes * avgQuoteValue * 0.3 // Assuming 30% close rate
  
  const yearlyExtraRevenue = potentialExtraRevenue * 12
  const softwareCost = 49 * 12 // Professional plan
  const netROI = yearlyExtraRevenue - softwareCost
  const roiPercentage = (netROI / softwareCost) * 100

  return (
    <Card className="glass-card border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-green-500/10">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">
                Your Potential ROI with PaintQuote Pro
              </h3>
              
              {!expanded ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">
                        {roiPercentage > 0 ? `${roiPercentage.toFixed(0)}%` : 'Calculate'}
                      </p>
                      <p className="text-xs text-gray-400">Annual ROI</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">
                        {timeSavedPerMonth.toFixed(0)} hrs
                      </p>
                      <p className="text-xs text-gray-400">Saved Monthly</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => setExpanded(true)}
                  >
                    See Full Breakdown
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-3xl font-bold text-emerald-400">
                        {roiPercentage.toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-400">Annual ROI</p>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-3xl font-bold text-emerald-400">
                        ${netROI.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">Net Annual Gain</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Time Saved Monthly</span>
                      <span className="text-white font-medium">{timeSavedPerMonth.toFixed(0)} hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Additional Quotes/Month</span>
                      <span className="text-white font-medium">+{additionalQuotes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Extra Revenue Potential</span>
                      <span className="text-emerald-400 font-medium">+${potentialExtraRevenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-gray-300">Software Investment</span>
                      <span className="text-gray-400">$49/month</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Link href="/roi-calculator" className="flex-1">
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                      >
                        <Calculator className="mr-2 h-4 w-4" />
                        Full Calculator
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => setExpanded(false)}
                    >
                      Collapse
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {!expanded && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-gray-400">Based on your current metrics</span>
            <Link href="/roi-calculator" className="text-xs text-emerald-400 hover:text-emerald-300">
              Get detailed analysis →
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}