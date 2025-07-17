'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SharedNavigation from '@/components/shared-navigation'

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
    monthlyPrice: 47,
    yearlyPrice: 470, // 2 months free
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
    monthlyPrice: 97,
    yearlyPrice: 970, // 2 months free
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

  const handleSelectPlan = (planKey: string) => {
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
      <SharedNavigation />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-14">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Your $8,400/Month Revenue Opportunity
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Based on our research: Win 3 more jobs per month (from 7 to 10 out of 20 quotes) 
              at $2,800 average = $8,400 additional revenue monthly
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Quote in 10-15 minutes vs 3-6 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Respond within 24 hours (73% win rate)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Professional quotes = 40-60% higher close rate</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as 'monthly' | 'yearly')} className="w-fit">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">
                  Yearly
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
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
                className={`relative flex flex-col ${
                  (plan as any).popular ? 'border-primary shadow-lg scale-105' : ''
                }`}
              >
                {(plan as any).popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  {(plan as any).highlight && (
                    <p className="mt-2 text-sm font-medium text-primary">
                      {(plan as any).highlight}
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-8">
                    {plan.monthlyPrice !== null ? (
                      <div>
                        <span className="text-4xl font-bold">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12)}
                        </span>
                        <span className="text-muted-foreground">/month</span>
                        {billingPeriod === 'yearly' && plan.yearlyPrice > 0 && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            ${plan.yearlyPrice} billed annually
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-3xl font-bold">Custom Pricing</div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Features included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start">
                              <X className="mr-2 h-4 w-4 shrink-0 text-muted-foreground/50 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={(plan as any).popular ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(key)}
                  >
                    {key === 'free' ? 'Start Free' : key === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* ROI Calculator Section */}
          <div className="mt-16 rounded-lg bg-muted/50 p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Your ROI Calculator</h2>
            
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="rounded-lg bg-background p-6 border">
                  <h3 className="font-semibold mb-4">Current Situation</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Quotes per month:</span>
                      <span className="font-medium">20</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Current win rate:</span>
                      <span className="font-medium">35% (7 jobs)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Average job value:</span>
                      <span className="font-medium">$2,800</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Monthly revenue:</span>
                      <span className="font-medium">$19,600</span>
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-lg bg-primary/10 p-6 border border-primary/20">
                  <h3 className="font-semibold mb-4">With PaintQuote Pro</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Quotes per month:</span>
                      <span className="font-medium text-primary">20</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Improved win rate:</span>
                      <span className="font-medium text-primary">50% (10 jobs)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Average job value:</span>
                      <span className="font-medium text-primary">$2,800</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Monthly revenue:</span>
                      <span className="font-medium text-primary">$28,000</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-6 text-center">
                <p className="text-lg mb-2">Your Additional Monthly Revenue</p>
                <p className="text-4xl font-bold text-green-600 mb-4">+$8,400</p>
                <p className="text-sm text-muted-foreground mb-4">
                  That's a <strong>100x return</strong> on your PaintQuote Pro investment
                </p>
                <p className="text-xs text-muted-foreground">
                  Based on research showing 40-60% win rate improvement from faster response times 
                  and professional presentation
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t pt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="mx-auto max-w-3xl space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any payments.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, debit cards, and ACH transfers for annual plans. Enterprise customers can also pay by invoice.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Is there a setup fee?</h3>
                <p className="text-muted-foreground">
                  No setup fees! You can start using PaintQuote Pro immediately after signing up.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens if I exceed my quote limit?</h3>
                <p className="text-muted-foreground">
                  Free plan users will be prompted to upgrade when they reach their monthly limit. Paid plans have unlimited quotes.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer discounts for annual billing?</h3>
                <p className="text-muted-foreground">
                  Yes! Annual billing saves you 17% compared to monthly billing - that's 2 months free every year.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg font-semibold mb-4">Still have questions?</p>
            <Button variant="outline" onClick={() => router.push('/contact')}>
              Contact Our Sales Team
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}