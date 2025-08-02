'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input' // TODO: Check if this import is needed
// import { Label } from '@/components/ui/label' // TODO: Check if this import is needed
// import { Button } from '@/components/ui/button' // TODO: Check if this import is needed
import { TrendingUp, DollarSign, Clock, Users, Calculator } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
 // TODO: Check if this import is needed
interface ROICalculatorProps {
  className?: string
  variant?: 'default' | 'glass'
}

export function ROICalculator({ className = '', variant = 'glass' }: ROICalculatorProps) {
  const [quotesPerMonth, setQuotesPerMonth] = useState<string>('20')
  const [currentWinRate, setCurrentWinRate] = useState<string>('35')
  const [avgJobValue, setAvgJobValue] = useState<string>('2800')
  const [hoursPerQuote, setHoursPerQuote] = useState<string>('3')
  interface ROIResults {
    current: {
      jobsWon: number;
      revenue: number;
      hoursSpent: number;
      winRate: string;
    };
    improved: {
      jobsWon: number;
      revenue: number;
      hoursSpent: number;
      winRate: string;
    };
    savings: {
      additionalJobs: number;
      additionalRevenue: number;
      hoursSaved: number;
      timeSavingsValue: number;
      totalBenefit: number;
      monthlyROI: number;
      yearlyROI: number;
      roiPercentage: number;
      paybackDays: number;
    };
  }

  const [results, setResults] = useState<ROIResults | null>(null)

  const calculateROI = () => {
    const quotes = parseInt(quotesPerMonth) || 0
    const winRate = parseFloat(currentWinRate) / 100 || 0
    const jobValue = parseFloat(avgJobValue) || 0
    const hours = parseFloat(hoursPerQuote) || 0
    
    // Current situation
    const currentJobsWon = quotes * winRate
    const currentRevenue = currentJobsWon * jobValue
    const currentHoursSpent = quotes * hours
    
    // With PaintQuote Pro (based on customer data)
    const improvedWinRate = Math.min(winRate + 0.15, 0.65) // 15% improvement, max 65%
    const improvedJobsWon = quotes * improvedWinRate
    const improvedRevenue = improvedJobsWon * jobValue
    const improvedHoursPerQuote = 0.25 // 15 minutes with our system
    const improvedHoursSpent = quotes * improvedHoursPerQuote
    
    // Time savings
    const hoursSaved = currentHoursSpent - improvedHoursSpent
    const hourlyRate = 50 // Assumed hourly value
    const timeSavingsValue = hoursSaved * hourlyRate
    
    // Additional revenue
    const additionalJobs = improvedJobsWon - currentJobsWon
    const additionalRevenue = improvedRevenue - currentRevenue
    
    // Software cost (Professional plan)
    const monthlyCost = 79
    const yearlyROI = (additionalRevenue + timeSavingsValue - monthlyCost) * 12
    const paybackDays = monthlyCost / (additionalRevenue / 30)

    setResults({
      current: {
        jobsWon: Math.round(currentJobsWon * 10) / 10,
        revenue: Math.round(currentRevenue),
        hoursSpent: Math.round(currentHoursSpent),
        winRate: (winRate * 100).toFixed(0)
      },
      improved: {
        jobsWon: Math.round(improvedJobsWon * 10) / 10,
        revenue: Math.round(improvedRevenue),
        hoursSpent: Math.round(improvedHoursSpent),
        winRate: (improvedWinRate * 100).toFixed(0)
      },
      savings: {
        additionalJobs: Math.round(additionalJobs * 10) / 10,
        additionalRevenue: Math.round(additionalRevenue),
        hoursSaved: Math.round(hoursSaved),
        timeSavingsValue: Math.round(timeSavingsValue),
        totalBenefit: Math.round(additionalRevenue + timeSavingsValue),
        monthlyROI: Math.round((additionalRevenue + timeSavingsValue - monthlyCost)),
        yearlyROI: Math.round(yearlyROI),
        roiPercentage: Math.round((yearlyROI / (monthlyCost * 12)) * 100),
        paybackDays: Math.round(paybackDays)
      }
    })
  }

  const cardClass = variant === 'glass' ? 'glass-card' : ''

  return (
    <Card className={`${cardClass} ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="h-5 w-5" />
          ROI Calculator
        </CardTitle>
        <CardDescription className="text-gray-100">
          See how much you could save with PaintQuote Pro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-white">Quotes per Month</Label>
            <Input
              type="number"
              value={quotesPerMonth}
              onChange={(e) => setQuotesPerMonth(e.target.value)}
              className="glass-card border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Current Win Rate (%)</Label>
            <Input
              type="number"
              value={currentWinRate}
              onChange={(e) => setCurrentWinRate(e.target.value)}
              className="glass-card border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Average Job Value ($)</Label>
            <Input
              type="number"
              value={avgJobValue}
              onChange={(e) => setAvgJobValue(e.target.value)}
              className="glass-card border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Hours per Quote (Currently)</Label>
            <Input
              type="number"
              step="0.5"
              value={hoursPerQuote}
              onChange={(e) => setHoursPerQuote(e.target.value)}
              className="glass-card border-white/20 text-white"
            />
          </div>
        </div>

        <Button 
          onClick={calculateROI}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          Calculate ROI
        </Button>

        {results && (
          <div className="space-y-6 pt-4 border-t border-white/10">
            {/* Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Current State */}
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h4 className="font-semibold text-white mb-3">Current Situation</h4>
                <div className="space-y-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-200">Win Rate:</span>
                    <span className="text-white">{results.current.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-200">Jobs Won:</span>
                    <span className="text-white">{results.current.jobsWon}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-200">Monthly Revenue:</span>
                    <span className="text-white font-semibold">${results.current.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-200">Time on Quotes:</span>
                    <span className="text-white">{results.current.hoursSpent} hours</span>
                  </div>
                </div>
              </div>

              {/* With PaintQuote Pro */}
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="font-semibold text-white mb-3">With PaintQuote Pro</h4>
                <div className="space-y-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-200">Win Rate:</span>
                    <span className="text-emerald-400 font-semibold">{results.improved.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-200">Jobs Won:</span>
                    <span className="text-emerald-400 font-semibold">{results.improved.jobsWon}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-200">Monthly Revenue:</span>
                    <span className="text-emerald-400 font-semibold">${results.improved.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-200">Time on Quotes:</span>
                    <span className="text-emerald-400 font-semibold">{results.improved.hoursSpent} hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Summary */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <h4 className="font-semibold text-white mb-3">Your ROI Summary</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                    <span className="text-base text-gray-200">Additional Revenue:</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">
                    +${results.savings.additionalRevenue.toLocaleString()}/mo
                  </p>
                  <p className="text-base text-gray-200">
                    {results.savings.additionalJobs} more jobs won
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-base text-gray-200">Time Saved:</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">
                    {results.savings.hoursSaved} hrs/mo
                  </p>
                  <p className="text-base text-gray-200">
                    Worth ${results.savings.timeSavingsValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-200">Total Monthly Benefit:</span>
                  <span className="text-xl font-semibold text-white">
                    ${results.savings.totalBenefit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-200">PaintQuote Pro Cost:</span>
                  <span className="text-white">-$79</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-white font-semibold">Net Monthly ROI:</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    +${results.savings.monthlyROI.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-400">
                    {results.savings.roiPercentage}%
                  </p>
                  <p className="text-base text-gray-200">Annual ROI</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">
                    {results.savings.paybackDays}
                  </p>
                  <p className="text-base text-gray-200">Days to Payback</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">
                    ${(results.savings.yearlyROI / 1000).toFixed(1)}k
                  </p>
                  <p className="text-base text-gray-200">Yearly Benefit</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}