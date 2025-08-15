'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ModernNavigation from '@/components/modern-navigation'

interface PlanFeatures {
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  features: string[];
  limitations: string[];
  popular?: boolean;
  highlight?: string;
}

// Business tier removed - focusing on Free and Professional with future add-ons
// See PRICING_STRATEGY.md for future plans
const plans: Record<string, PlanFeatures> = {
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

  const handleSelectPlan = async (planKey: string) => {
    if (planKey === 'free') {
      router.push('/access-code')
    } else if (planKey === 'enterprise') {
      router.push('/contact?interest=enterprise')
    } else if (planKey === 'professional') {
      try {
        // Get company data from localStorage for authentication
        const companyData = typeof window !== 'undefined' ? localStorage.getItem('paintquote_company') : null;
        if (!companyData) {
          // Redirect to access code page if not authenticated
          router.push('/access-code')
          return;
        }

        // Call secure API endpoint to get payment link
        const response = await fetch('/api/stripe/get-payment-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-company-data': companyData
          },
          body: JSON.stringify({
            plan: planKey,
            billingPeriod: billingPeriod
          })
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to access code page if unauthorized
            router.push('/access-code');
            return;
          }
          throw new Error('Failed to get payment link');
        }

        const data = await response.json();
        
        if (data.success && data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          throw new Error('Invalid response from payment link API');
        }
      } catch (error) {
        console.error('Error getting payment link:', error);
        // Fallback to access code page on error
        router.push('/access-code');
      }
    }
  }

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
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
            <p className="mt-4 text-xl text-gray-200 font-medium">
              Join 15,000+ contractors who save 4 hours per quote and win 30% more jobs.
            </p>
            <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
              Get your first 5 professional quotes free – no credit card required. Start creating winning quotes in under 2 minutes.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-base">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-100 font-medium">Quote in 10-15 minutes vs 3-6 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-100 font-medium">Respond within 24 hours (73% win rate)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-100 font-medium">Professional quotes = 40-60% higher close rate</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Tabs value={billingPeriod} onValueChange={(v) => setBillingPeriod(v as 'monthly' | 'yearly')} className="w-fit">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-1">
                <TabsTrigger value="monthly" className="text-gray-100 font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white">Monthly</TabsTrigger>
                <TabsTrigger value="yearly" className="text-gray-100 font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Yearly
                  <span className="ml-2 rounded-full bg-emerald-500/30 px-2 py-0.5 text-sm font-bold text-emerald-300">
                    Save 17%
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto justify-center">
            {Object.entries(plans).map(([key, plan]) => (
              <Card 
                key={key} 
                className={`relative flex flex-col bg-slate-800/90 backdrop-blur-sm border ${
                  plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-105' : 'border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-base font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-300 text-base mb-4">{plan.description}</CardDescription>
                  <div className="mb-4">
                    {plan.monthlyPrice !== null ? (
                      <div>
                        <span className="text-5xl font-bold text-white">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : Math.round((plan.yearlyPrice || 0) / 12)}
                        </span>
                        <span className="text-gray-200 ml-1 text-lg">/month</span>
                        {billingPeriod === 'yearly' && plan.yearlyPrice && plan.yearlyPrice > 0 && (
                          <p className="mt-1 text-sm text-emerald-400 font-medium">
                            Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice} annually
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-white">Custom Pricing</div>
                    )}
                  </div>
                  {plan.highlight && (
                    <p className="text-base font-medium text-blue-400 bg-blue-900/30 rounded-lg p-3">
                      {plan.highlight}
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1">

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-100 mb-3 uppercase tracking-wider">Features included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="mr-2 h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                            <span className="text-sm text-gray-200">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-100 mb-3 uppercase tracking-wider">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start">
                              <X className="mr-2 h-4 w-4 shrink-0 text-gray-400 mt-0.5" />
                              <span className="text-sm text-gray-400 line-through">{limitation}</span>
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
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg' 
                        : 'bg-slate-700 hover:bg-slate-600 text-white font-medium border border-slate-600'
                    }`}
                    onClick={() => handleSelectPlan(key)}
                    size="lg"
                  >
                    {key === 'free' ? 'Get 5 Free Quotes' : key === 'enterprise' ? 'Contact Sales' : 'Start Winning More Jobs'}
                  </Button>
                  {key === 'free' && (
                    <p className="text-sm text-gray-400 text-center mt-2">
                      Forever free plan • Join 15K+ contractors
                    </p>
                  )}
                  {key === 'professional' && (
                    <p className="text-sm text-gray-400 text-center mt-2">
                      Start winning more jobs today – your first 5 quotes are on us
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* ROI Calculator Section */}
          <div className="bg-slate-800/90 backdrop-filter backdrop-blur-md mt-16 rounded-xl border border-slate-700 p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Your ROI Calculator</h2>
            
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 mb-8">
                <div className="bg-slate-900/80 backdrop-filter backdrop-blur-md rounded-lg border border-slate-700 p-6">
                  <h3 className="font-semibold mb-4 text-white">Current Situation</h3>
                  <ul className="space-y-3 text-base">
                    <li className="flex justify-between">
                      <span className="text-gray-300">Quotes per month:</span>
                      <span className="font-medium text-white">20</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Current win rate:</span>
                      <span className="font-medium text-white">35% (7 jobs)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Average job value:</span>
                      <span className="font-medium text-white">$2,800</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Monthly revenue:</span>
                      <span className="font-medium text-white">$19,600</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/80 backdrop-filter backdrop-blur-md rounded-lg border-2 border-blue-500 shadow-lg shadow-blue-500/20 p-6">
                  <h3 className="font-semibold mb-4 text-white">With PaintQuote Pro</h3>
                  <ul className="space-y-3 text-base">
                    <li className="flex justify-between">
                      <span className="text-gray-300">Quotes per month:</span>
                      <span className="font-medium text-blue-400">20</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Improved win rate:</span>
                      <span className="font-medium text-blue-400">50% (10 jobs)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Average job value:</span>
                      <span className="font-medium text-blue-400">$2,800</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-300">Monthly revenue:</span>
                      <span className="font-medium text-blue-400">$28,000</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="rounded-lg bg-emerald-500/20 backdrop-blur-sm border-2 border-emerald-500 shadow-lg shadow-emerald-500/20 p-6 text-center">
                <p className="text-lg mb-2 text-gray-200 font-semibold">Your Additional Monthly Revenue</p>
                <p className="text-4xl font-bold text-emerald-400 mb-4">+$8,400</p>
                <p className="text-base text-gray-200 mb-4">
                  That&apos;s a <strong className="text-white">100x return</strong> on your PaintQuote Pro investment
                </p>
                <p className="text-sm text-gray-300">
                  Based on research showing 40-60% win rate improvement from faster response times 
                  and professional presentation
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-700 pt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
            
            <div className="mx-auto max-w-3xl space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Can I change plans anytime?</h3>
                <p className="text-gray-300">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we&apos;ll prorate any payments.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">What payment methods do you accept?</h3>
                <p className="text-gray-300">
                  We accept all major credit cards, debit cards, and ACH transfers for annual plans. Enterprise customers can also pay by invoice.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Is there a setup fee?</h3>
                <p className="text-gray-300">
                  No setup fees! You can start using PaintQuote Pro immediately after signing up.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">What happens if I exceed my quote limit?</h3>
                <p className="text-gray-300">
                  Free plan users will be prompted to upgrade when they reach their monthly limit. Paid plans have unlimited quotes.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Do you offer discounts for annual billing?</h3>
                <p className="text-gray-300">
                  Yes! Annual billing saves you 17% compared to monthly billing - that&apos;s 2 months free every year.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg font-semibold mb-4 text-white">Still have questions?</p>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white font-medium border border-slate-600 px-6 py-3" onClick={() => router.push('/contact')}>
              Contact Our Sales Team
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}