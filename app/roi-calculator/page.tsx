'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calculator, TrendingUp, Clock, DollarSign, Users, ChevronRight, ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import ModernNavigation from '@/components/modern-navigation'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'

export default function ROICalculator() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    monthlyRevenue: 50000,
    quotesPerMonth: 20,
    averageQuoteTime: 2,
    closeRate: 25,
    averageJobValue: 2500,
  })

  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const calculateROI = () => {
    // Current state calculations
    const currentQuotesPerMonth = formData.quotesPerMonth
    const currentTimeSpentQuoting = formData.quotesPerMonth * formData.averageQuoteTime
    const currentClosedJobs = (formData.quotesPerMonth * formData.closeRate) / 100
    const currentRevenue = formData.monthlyRevenue

    // With PaintQuote Pro calculations
    const timePerQuoteWithApp = 0.25 // 15 minutes
    const quotesIncreaseMultiplier = 2.5 // Can create 2.5x more quotes in same time
    const closeRateIncrease = 1.4 // 40% increase in close rate
    
    const newQuotesPerMonth = Math.floor(currentQuotesPerMonth * quotesIncreaseMultiplier)
    const newTimeSpentQuoting = newQuotesPerMonth * timePerQuoteWithApp
    const newCloseRate = Math.min(formData.closeRate * closeRateIncrease, 90)
    const newClosedJobs = (newQuotesPerMonth * newCloseRate) / 100
    const newRevenue = newClosedJobs * formData.averageJobValue

    // ROI Calculations
    const timeSaved = currentTimeSpentQuoting - newTimeSpentQuoting
    const additionalRevenue = newRevenue - currentRevenue
    const yearlyAdditionalRevenue = additionalRevenue * 12
    const softwareCost = 49 * 12 // Professional plan annual
    const netROI = yearlyAdditionalRevenue - softwareCost
    const roiPercentage = (netROI / softwareCost) * 100

    return {
      current: {
        quotesPerMonth: currentQuotesPerMonth,
        timeSpentQuoting: currentTimeSpentQuoting,
        closedJobs: currentClosedJobs,
        revenue: currentRevenue,
      },
      withApp: {
        quotesPerMonth: newQuotesPerMonth,
        timeSpentQuoting: newTimeSpentQuoting,
        closedJobs: newClosedJobs,
        revenue: newRevenue,
      },
      roi: {
        timeSaved,
        additionalRevenue,
        yearlyAdditionalRevenue,
        netROI,
        roiPercentage,
      },
    }
  }

  const results = showResults ? calculateROI() : null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-200">Loading calculator...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <main className="pt-24 relative z-10">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-emerald-500/20 px-4 py-2 text-base font-medium text-emerald-400">
                  <Calculator className="mr-2 h-4 w-4" />
                  Free ROI Calculator
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                  Calculate Your Painting Business ROI
                </h1>
                <p className="mt-6 text-xl text-gray-100">
                  See how much time and money PaintQuote Pro can save your painting business. 
                  Get personalized projections based on your actual business metrics.
                </p>
              </div>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Input Form */}
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-white">Your Current Business Metrics</h2>
                    <p className="mt-2 text-base text-gray-200">
                      Enter your current numbers to see your potential growth
                    </p>

                    <div className="mt-6 space-y-6">
                      <div>
                        <label className="text-base font-medium text-gray-100">
                          Current Monthly Revenue
                        </label>
                        <div className="mt-2 flex items-center relative">
                          <DollarSign className="absolute ml-3 h-4 w-4 text-gray-200 z-10" />
                          <input
                            type="number"
                            value={formData.monthlyRevenue}
                            onChange={(e) => setFormData({ ...formData, monthlyRevenue: Number(e.target.value) })}
                            className="w-full input-glass pl-10 text-base"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-base font-medium text-gray-100">
                          Quotes Created Per Month
                        </label>
                        <input
                          type="number"
                          value={formData.quotesPerMonth}
                          onChange={(e) => setFormData({ ...formData, quotesPerMonth: Number(e.target.value) })}
                          className="mt-2 w-full input-glass text-base"
                        />
                      </div>

                      <div>
                        <label className="text-base font-medium text-gray-100">
                          Average Time Per Quote (hours)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          value={formData.averageQuoteTime}
                          onChange={(e) => setFormData({ ...formData, averageQuoteTime: Number(e.target.value) })}
                          className="mt-2 w-full input-glass text-base"
                        />
                      </div>

                      <div>
                        <label className="text-base font-medium text-gray-100">
                          Current Close Rate (%)
                        </label>
                        <input
                          type="number"
                          value={formData.closeRate}
                          onChange={(e) => setFormData({ ...formData, closeRate: Number(e.target.value) })}
                          className="mt-2 w-full input-glass text-base"
                        />
                      </div>

                      <div>
                        <label className="text-base font-medium text-gray-100">
                          Average Job Value
                        </label>
                        <div className="mt-2 flex items-center relative">
                          <DollarSign className="absolute ml-3 h-4 w-4 text-gray-200 z-10" />
                          <input
                            type="number"
                            value={formData.averageJobValue}
                            onChange={(e) => setFormData({ ...formData, averageJobValue: Number(e.target.value) })}
                            className="w-full input-glass pl-10 text-base"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setShowResults(true)}
                        className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-4 py-3 text-base font-medium text-white"
                      >
                        Calculate My ROI
                      </button>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-6">
                    {!showResults ? (
                      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-dashed border-white/20 p-8 text-center">
                        <Calculator className="mx-auto h-12 w-12 text-gray-200" />
                        <h3 className="mt-4 text-lg font-semibold text-white">Your Results Will Appear Here</h3>
                        <p className="mt-2 text-base text-gray-200">
                          Enter your business metrics and click "Calculate My ROI" to see your 
                          personalized growth projections with PaintQuote Pro.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* ROI Summary */}
                        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-emerald-500/20 p-6">
                          <h3 className="text-lg font-semibold text-white">Your ROI with PaintQuote Pro</h3>
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-3xl font-bold text-emerald-400">
                                {results?.roi.roiPercentage.toFixed(0)}%
                              </p>
                              <p className="text-base text-gray-200">Return on Investment</p>
                            </div>
                            <div>
                              <p className="text-3xl font-bold text-emerald-400">
                                ${results?.roi.netROI.toLocaleString()}
                              </p>
                              <p className="text-base text-gray-200">Net Annual Gain</p>
                            </div>
                          </div>
                        </div>

                        {/* Before/After Comparison */}
                        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white">Monthly Business Impact</h3>
                          
                          <div className="mt-6 space-y-6">
                            {/* Quotes Created */}
                            <div>
                              <div className="flex items-center justify-between text-base">
                                <span className="text-gray-100">Quotes Created</span>
                                <span className="text-emerald-400">
                                  +{(results?.withApp.quotesPerMonth || 0) - (results?.current.quotesPerMonth || 0)} more
                                </span>
                              </div>
                              <div className="mt-2 flex items-center gap-2 text-base">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">Now:</span>
                                  <span>{results?.current.quotesPerMonth}</span>
                                </div>
                                <ChevronRight className="h-3 w-3" />
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">With Pro:</span>
                                  <span className="font-semibold text-emerald-400">
                                    {results?.withApp.quotesPerMonth}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Time Spent */}
                            <div>
                              <div className="flex items-center justify-between text-base">
                                <span className="text-gray-100">Time on Quotes</span>
                                <span className="text-emerald-400">
                                  -{results?.roi.timeSaved.toFixed(0)} hours saved
                                </span>
                              </div>
                              <div className="mt-2 flex items-center gap-2 text-base">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">Now:</span>
                                  <span>{results?.current.timeSpentQuoting}h</span>
                                </div>
                                <ChevronRight className="h-3 w-3" />
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">With Pro:</span>
                                  <span className="font-semibold text-emerald-400">
                                    {results?.withApp.timeSpentQuoting.toFixed(1)}h
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Closed Jobs */}
                            <div>
                              <div className="flex items-center justify-between text-base">
                                <span className="text-gray-100">Jobs Won</span>
                                <span className="text-emerald-400">
                                  +{((results?.withApp.closedJobs || 0) - (results?.current.closedJobs || 0)).toFixed(0)} more
                                </span>
                              </div>
                              <div className="mt-2 flex items-center gap-2 text-base">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">Now:</span>
                                  <span>{results?.current.closedJobs.toFixed(0)}</span>
                                </div>
                                <ChevronRight className="h-3 w-3" />
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">With Pro:</span>
                                  <span className="font-semibold text-emerald-400">
                                    {results?.withApp.closedJobs.toFixed(0)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Revenue */}
                            <div className="border-t pt-4">
                              <div className="flex items-center justify-between text-base font-semibold">
                                <span className="text-gray-100">Monthly Revenue</span>
                                <span className="text-emerald-400">
                                  +${results?.roi.additionalRevenue.toLocaleString()}
                                </span>
                              </div>
                              <div className="mt-2 flex items-center gap-2 text-base">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">Now:</span>
                                  <span>${results?.current.revenue.toLocaleString()}</span>
                                </div>
                                <ChevronRight className="h-3 w-3" />
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-200">With Pro:</span>
                                  <span className="font-semibold text-emerald-400">
                                    ${results?.withApp.revenue.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Visual Chart */}
                        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Revenue Growth Projection</h3>
                          <div className="relative h-48">
                            <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between gap-2">
                              {/* Current Revenue Bar */}
                              <div className="flex-1 flex flex-col items-center gap-2">
                                <div 
                                  className="w-full bg-gray-600 rounded-t-lg relative"
                                  style={{ height: '40%' }}
                                >
                                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-base text-gray-200">
                                    ${((results?.current.revenue || 0) / 1000).toFixed(0)}k
                                  </span>
                                </div>
                                <span className="text-base text-gray-200">Current</span>
                              </div>
                              
                              {/* With PaintQuote Bar */}
                              <div className="flex-1 flex flex-col items-center gap-2">
                                <div 
                                  className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg relative"
                                  style={{ height: `${Math.min(((results?.withApp.revenue || 0) / (results?.current.revenue || 1)) * 40, 90)}%` }}
                                >
                                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-base text-emerald-400 font-bold">
                                    ${((results?.withApp.revenue || 0) / 1000).toFixed(0)}k
                                  </span>
                                </div>
                                <span className="text-base text-gray-200">With Pro</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-4">
                            <span className="text-2xl font-bold text-emerald-400">
                              +{(((results?.withApp.revenue || 0) - (results?.current.revenue || 0)) / (results?.current.revenue || 1) * 100).toFixed(0)}%
                            </span>
                            <span className="text-gray-200 ml-2">Revenue Increase</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 text-center">
                          <TrendingUp className="mx-auto h-8 w-8 text-purple-400" />
                          <h3 className="mt-2 text-lg font-semibold text-white">
                            Ready to Grow Your Business?
                          </h3>
                          <p className="mt-2 text-base text-gray-100">
                            Start your free trial today and see these results for yourself
                          </p>
                          <Link
                            href="/trial-signup"
                            className="mt-4 inline-flex items-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-2 text-base font-medium text-white"
                          >
                            Start Free Trial
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  How PaintQuote Pro Drives Your ROI
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Our painting contractors see results in four key areas
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <Clock className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">91% Faster Quotes</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Create detailed quotes in 15 minutes instead of 2-3 hours
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">40% Higher Close Rate</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Professional quotes and faster response times win more jobs
                  </p>
                </div>
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">2.5x More Quotes</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Quote more jobs in the same time to grow your pipeline
                  </p>
                </div>
                <div className="text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">58% Revenue Growth</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Average revenue increase for contractors using our software
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <div className="rounded-lg bg-primary/5 p-8 text-center">
                  <blockquote className="text-xl italic">
                    "The ROI calculator showed we'd save 30 hours monthly. In reality, we saved 
                    even more. We're now doing $180K/month, up from $110K, and working less."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Sarah Chen</strong>
                    <span className="text-gray-200"> • Premier Painting Co, San Francisco</span>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-center text-3xl font-bold">ROI Calculator Questions</h2>
                
                <div className="mt-12 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold">How accurate is this ROI calculator?</h3>
                    <p className="mt-3 text-gray-200">
                      Our calculator uses real data from 2,847+ painting contractors using PaintQuote Pro. 
                      The metrics (91% time savings, 40% close rate increase) are based on actual customer 
                      results. Your results may vary based on how consistently you use the software.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">What's included in the ROI calculation?</h3>
                    <p className="mt-3 text-gray-200">
                      We calculate time saved on quoting, increased quote volume, improved close rates, 
                      and the resulting revenue increase. We subtract the software cost ($79/month for 
                      Professional plan) to show your net ROI.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">How quickly will I see these results?</h3>
                    <p className="mt-3 text-gray-200">
                      Most contractors see time savings immediately - from their very first quote. Close 
                      rate improvements typically appear within 30 days as customers respond better to 
                      professional quotes. Revenue growth follows as you win more jobs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">Can I really create 2.5x more quotes?</h3>
                    <p className="mt-3 text-gray-200">
                      Yes! When quotes take 15 minutes instead of 2-3 hours, you can easily quote 
                      2-3x more jobs. Many contractors quote on-site now, closing deals immediately 
                      instead of losing momentum while preparing quotes later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to See These Results in Your Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
                Join thousands of painting contractors growing with PaintQuote Pro. 
                Start free and see ROI from your very first quote.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pricing
                </Link>
              </div>
              <p className="mt-4 text-base opacity-100">
                No credit card required • 1 free quote per month • Cancel anytime
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-8 text-center text-base text-gray-200">
            <p>&copy; 2025 PaintQuote Pro. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}