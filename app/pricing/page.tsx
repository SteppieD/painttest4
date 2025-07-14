'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const plans = {
  free: {
    name: 'Free',
    description: 'Perfect for trying out PaintQuote Pro',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '1 quote per month',
      'Basic calculator',
      'Customer management',
      'Email support',
      'Basic templates'
    ],
    limitations: [
      'No AI assistant',
      'No custom branding',
      'No analytics',
      'No team members',
      'No API access'
    ]
  },
  professional: {
    name: 'Professional',
    description: 'For growing painting businesses',
    monthlyPrice: 49,
    yearlyPrice: 490, // 2 months free
    features: [
      'Unlimited quotes',
      'AI-powered assistant',
      'Custom branding',
      'Analytics dashboard',
      '3 team members',
      'Priority email support',
      'Quote templates',
      'Customer portal',
      'Mobile app access'
    ],
    limitations: [
      'No API access',
      'Limited integrations'
    ],
    popular: true
  },
  business: {
    name: 'Business',
    description: 'For established contractors',
    monthlyPrice: 99,
    yearlyPrice: 990, // 2 months free
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'API access',
      'QuickBooks integration',
      'Advanced analytics',
      'Custom workflows',
      'Phone support',
      'Training sessions',
      'Data export',
      'Multi-location support'
    ],
    limitations: []
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Choose the perfect plan for your painting business
          </p>
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
  )
}