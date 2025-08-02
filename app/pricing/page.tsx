'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ModernNavigation from '@/components/modern-navigation'

const plans = {
  free: {
    name: 'Free Forever',
    description: 'Perfect for solo painters getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '5 quotes per month',
      'Professional quote templates',
      '📱 Mobile-optimized interface',
      'Basic customer management',
      'Quote response time tracking',
      '24-hour quote delivery',
      'Basic calculator with all surfaces',
      'Email support'
    ],
    limitations: [
      'No AI quote assistant',
      'No custom branding',
      'Limited to 1 user',
      'No analytics dashboard',
      'No customer portal'
    ]
  },
  professional: {
    name: 'Professional',
    description: 'Win 40-60% more jobs with speed',
    monthlyPrice: 79,
    yearlyPrice: 790, // 2 months free
    features: [
      'Unlimited quotes',
      'AI-powered instant quoting',
      'Quote in 10-15 minutes vs 3-6 hours',
      'Custom branding & templates',
      'Win rate analytics dashboard',
      'Response time tracking',
      'Customer portal for instant acceptance',
      '3 team members',
      'Priority support',
      '📱 Mobile & offline access',
      'Automated follow-up reminders',
      'Digital signatures'
    ],
    limitations: [
      'No QuickBooks integration',
      'No API access'
    ],
    popular: true,
    highlight: 'ROI: Win 3 more jobs = $8,400+ revenue per month'
  },
  business: {
    name: 'Business',
    description: 'Scale your painting empire',
    monthlyPrice: 149,
    yearlyPrice: 1490, // 2 months free
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'QuickBooks & Xero integration',
      'Advanced win/loss analytics',
      'Quote conversion insights',
      'Custom workflows & approval chains',
      'Phone & chat support',
      'Weekly training sessions',
      'Bulk quote creation',
      'Multi-location support',
      'API access',
      'White-label customer portal',
      'Priority feature requests'
    ],
    limitations: [],
    highlight: 'High-volume teams see $25,000+ monthly revenue gains'
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      'Everything in Business',
      'Custom integrations',
      'Dedicated account manager',
      'Custom training',
      'SLA guarantee',
      'Custom features',
      'White-label options',
      'On-premise deployment',
      'Advanced security',
      'Custom reporting'
    ],
    limitations: []
  }
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const router = useRouter()

  const handleSelectPlan = (_planKey: string) => {
    if (planKey === 'free') {
      router.push('/auth/signup?plan=free')
    } else if (planKey === 'enterprise') {
      router.push('/contact?interest=enterprise')
    } else {
      router.push(`/auth/signup?plan=${planKey}&billing=${billingPeriod}`)
    }
  }

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
              Your $8,400/Month Revenue Opportunity
            </h1>
            <p className="mt-4 text-xl text-gray-100">
              Based on our research: Win 3 more jobs per month (from 7 to 10 out of 20 quotes) 
              at $2,800 average = $8,400 additional revenue monthly
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-base">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-100">Quote in 10-15 minutes vs 3-6 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-100">Respond within 24 hours (73% win rate)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-100">Professional quotes = 40-60% higher close rate</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as 'monthly' | 'yearly')} className="w-fit">
              <TabsList className="grid w-full grid-cols-2 glass-card p-1">
                <TabsTrigger value="monthly" className="text-white data-[state=active]:bg-white/20">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="text-white data-[state=active]:bg-white/20">
                  Yearly
                  <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-base font-medium text-emerald-400">
                    Save 17%
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-4">
            {Object.entries(plans).map(([key, plan]) => (
              <Card 
                key={key} 
                className={`relative flex flex-col glass-card ${
                  (plan as unknown).popular ? 'border-blue-500/50 shadow-lg scale-105' : 'border-white/10'
                }`}
              >
                {(plan as unknown).popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-base font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-100">{plan.description}</CardDescription>
                  {(plan as unknown).highlight && (
                    <p className="mt-2 text-base font-medium text-blue-400">
                      {(plan as unknown).highlight}
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-8">
                    {plan.monthlyPrice !== null ? (
                      <div>
                        <span className="text-4xl font-bold text-white">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12)}
                        </span>
                        <span className="text-gray-200">/month</span>
                        {billingPeriod === 'yearly' && plan.yearlyPrice > 0 && (
                          <p className="mt-1 text-base text-gray-200">
                            ${plan.yearlyPrice} billed annually
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-white">Custom Pricing</div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-medium text-gray-200 mb-3">Features included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                            <span className="text-base text-gray-100">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="text-base font-medium text-gray-200 mb-3">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start">
                              <X className="mr-2 h-4 w-4 shrink-0 text-gray-200 mt-0.5" />
                              <span className="text-base text-gray-200">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      (plan as unknown).popular 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white' 
                        : 'glass-card border-white/20 text-white hover:bg-gray-900/70'
                    }`}
                    onClick={() => handleSelectPlan(key)}
                  >
                    {key === 'free' ? 'Start Free' : key === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* ROI Calculator Section */}
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md mt-16 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Your ROI Calculator</h2>
            
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-white">Current Situation</h3>
                  <ul className="space-y-3 text-base">
                    <li className="flex justify-between">
                      <span className="text-gray-200">Quotes per month:</span>
                      <span className="font-medium text-white">20</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-200">Current win rate:</span>
                      <span className="font-medium text-white">35% (7 jobs)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-200">Average job value:</span>
                      <span className="font-medium text-white">$2,800</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-200">Monthly revenue:</span>
                      <span className="font-medium text-white">$19,600</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md rounded-lg border border-blue-500/30 p-6">
                  <h3 className="font-semibold mb-4 text-white">With PaintQuote Pro</h3>
                  <ul className="space-y-3 text-base">
                    <li className="flex justify-between">
                      <span className="text-gray-200">Quotes per month:</span>
                      <span className="font-medium text-blue-400">20</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-200">Improved win rate:</span>
                      <span className="font-medium text-blue-400">50% (10 jobs)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-200">Average job value:</span>
                      <span className="font-medium text-blue-400">$2,800</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-200">Monthly revenue:</span>
                      <span className="font-medium text-blue-400">$28,000</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-lg bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 p-6 text-center">
                <p className="text-lg mb-2 text-gray-100">Your Additional Monthly Revenue</p>
                <p className="text-4xl font-bold text-emerald-400 mb-4">+$8,400</p>
                <p className="text-base text-gray-100 mb-4">
                  That{"'"}s a <strong className="text-white">100x return</strong> on your PaintQuote Pro investment
                </p>
                <p className="text-base text-gray-200">
                  Based on research showing 40-60% win rate improvement from faster response times 
                  and professional presentation
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
            
            <div className="mx-auto max-w-3xl space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Can I change plans anytime?</h3>
                <p className="text-gray-100">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we&apos;ll prorate any payments.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">What payment methods do you accept?</h3>
                <p className="text-gray-100">
                  We accept all major credit cards, debit cards, and ACH transfers for annual plans. Enterprise customers can also pay by invoice.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Is there a setup fee?</h3>
                <p className="text-gray-100">
                  No setup fees! You can start using PaintQuote Pro immediately after signing up.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">What happens if I exceed my quote limit?</h3>
                <p className="text-gray-100">
                  Free plan users will be prompted to upgrade when they reach their monthly limit. Paid plans have unlimited quotes.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Do you offer discounts for annual billing?</h3>
                <p className="text-gray-100">
                  Yes! Annual billing saves you 17% compared to monthly billing - that&apos;s 2 months free every year.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg font-semibold mb-4 text-white">Still have questions?</p>
            <Button className="btn-secondary-modern" onClick={() => router.push('/contact')}>
              Contact Our Sales Team
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}