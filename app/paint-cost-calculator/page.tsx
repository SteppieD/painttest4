import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator, DollarSign, PaintBucket, Home, Clock, TrendingUp, CheckCircle, AlertCircle, Zap } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
 // TODO: Check if this import is needed
export const metadata: Metadata = {
  title: 'Paint Cost Calculator | Calculate Total Painting Costs & Budget',
  description: 'Calculate total painting costs with our free paint cost calculator. Get accurate estimates for paint, materials, and labor costs for interior and exterior painting projects.',
  keywords: 'paint cost calculator, how much does paint cost, calculate paint costs, paint budget calculator, painting cost estimator, paint project cost',
  openGraph: {
    title: 'Free Paint Cost Calculator - Budget Your Painting Project',
    description: 'Calculate total painting costs including paint, materials, and labor. Get accurate budget estimates for your painting project.',
    type: 'website',
    url: 'https://paintquotepro.com/paint-cost-calculator',
    images: [{
      url: '/og-paint-cost-calculator.jpg',
      width: 1200,
      height: 630,
      alt: 'Paint Cost Calculator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Paint Cost Calculator',
    description: 'Calculate total painting costs including paint, materials, and labor. Get accurate budget estimates.',
    images: ['/og-paint-cost-calculator.jpg']
  },
  alternates: {
    canonical: '/paint-cost-calculator'
  }
}

const costFactors = [
  {
    category: 'Paint Costs',
    description: 'Quality and quantity of paint needed',
    factors: ['Paint grade (basic, premium, luxury)', 'Square footage coverage', 'Number of coats required', 'Primer requirements'],
    averageCost: '$30-70 per gallon',
    icon: PaintBucket
  },
  {
    category: 'Labor Costs',
    description: 'Professional contractor rates',
    factors: ['Regional labor rates', 'Project complexity', 'Timeline requirements', 'Crew size needed'],
    averageCost: '$40-80 per hour',
    icon: Clock
  },
  {
    category: 'Material Costs', 
    description: 'Supplies and equipment needed',
    factors: ['Brushes and rollers', 'Drop cloths and tape', 'Sandpaper and scrapers', 'Cleaning supplies'],
    averageCost: '$50-150 per project',
    icon: Home
  },
  {
    category: 'Preparation Costs',
    description: 'Surface prep and repair work',
    factors: ['Wall washing and repairs', 'Hole filling and sanding', 'Trim and window caulking', 'Primer application'],
    averageCost: '$1-3 per sq ft',
    icon: CheckCircle
  }
]

const paintGrades = [
  {
    grade: 'Basic Paint',
    priceRange: '$25-35 per gallon',
    coverage: '350-400 sq ft',
    bestFor: 'Low-traffic areas, rental properties',
    features: ['Good coverage', 'Standard durability', 'Limited color selection', 'Basic stain resistance'],
    lifespan: '3-5 years'
  },
  {
    grade: 'Premium Paint',
    priceRange: '$40-55 per gallon', 
    coverage: '400-450 sq ft',
    bestFor: 'Main living areas, family homes',
    features: ['Better coverage', 'Enhanced durability', 'Wide color range', 'Good stain resistance'],
    lifespan: '7-10 years',
    popular: true
  },
  {
    grade: 'Luxury Paint',
    priceRange: '$60-80+ per gallon',
    coverage: '450-500 sq ft', 
    bestFor: 'High-end homes, commercial projects',
    features: ['Superior coverage', 'Maximum durability', 'Unlimited colors', 'Excellent stain resistance'],
    lifespan: '10-15 years'
  }
]

const costBreakdownExample = {
  projectType: 'Interior House (2,000 sq ft)',
  breakdown: {
    paint: { cost: 850, description: '15 gallons premium paint @ $55/gallon' },
    primer: { cost: 120, description: '4 gallons primer @ $30/gallon' },
    supplies: { cost: 180, description: 'Brushes, rollers, drop cloths, tape' },
    labor: { cost: 2400, description: '40 hours @ $60/hour' },
    prep: { cost: 400, description: 'Surface preparation and repairs' }
  },
  total: 3950,
  perSqFt: 1.98
}

const regionalPricing = [
  { region: 'Northeast (NY, MA, CT)', laborRate: '$65-85/hr', paintCost: '$35-75/gal', totalRange: '$3.50-6.00/sq ft' },
  { region: 'Southeast (FL, GA, NC)', laborRate: '$45-65/hr', paintCost: '$30-65/gal', totalRange: '$2.50-4.50/sq ft' },
  { region: 'Midwest (IL, OH, MI)', laborRate: '$50-70/hr', paintCost: '$32-70/gal', totalRange: '$2.75-5.00/sq ft' },
  { region: 'Southwest (TX, AZ, NV)', laborRate: '$55-75/hr', paintCost: '$33-68/gal', totalRange: '$3.00-5.25/sq ft' },
  { region: 'West Coast (CA, WA, OR)', laborRate: '$70-90/hr', paintCost: '$38-80/gal', totalRange: '$4.00-6.50/sq ft' }
]

const budgetTips = [
  {
    tip: 'Buy paint in bulk',
    savings: '10-20%',
    description: 'Purchasing 5+ gallons often qualifies for contractor pricing'
  },
  {
    tip: 'Choose mid-grade paint',
    savings: '25-40%',
    description: 'Premium paint offers best value vs luxury options'
  },
  {
    tip: 'DIY preparation work',
    savings: '30-50%',
    description: 'Handle cleaning, minor repairs, and moving furniture yourself'
  },
  {
    tip: 'Paint during off-season',
    savings: '15-25%',
    description: 'Fall and winter often have lower contractor rates'
  },
  {
    tip: 'Get multiple quotes',
    savings: '20-30%',
    description: 'Compare at least 3 professional contractor bids'
  }
]

const faqData = [
  {
    question: 'How much does it cost to paint a room?',
    answer: 'A standard 12x12 room typically costs $600-1,200 including materials and labor. Factors include paint quality, wall condition, and local labor rates.'
  },
  {
    question: 'How much paint do I need for a 2000 sq ft house?',
    answer: 'A 2000 sq ft house typically needs 12-15 gallons of paint for interior walls, plus 3-5 gallons of primer. Exterior painting requires 8-12 gallons depending on siding type.'
  },
  {
    question: 'What affects painting costs the most?',
    answer: 'Labor costs are typically 60-80% of total project cost. Paint quality, surface preparation needs, and project complexity are other major factors.'
  },
  {
    question: 'Is expensive paint worth the cost?',
    answer: 'Premium paint often provides better coverage, durability, and appearance. While more expensive upfront, it can save money long-term through longer lifespan and fewer coats needed.'
  },
  {
    question: 'How can I reduce painting costs?',
    answer: 'Do your own prep work, buy paint during sales, choose quality mid-grade paint, get multiple contractor quotes, and consider DIY for simple projects.'
  }
]

export default function PaintCostCalculator() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Paint Cost Calculator' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://paintquotepro.com/paint-cost-calculator',
    name: 'Paint Cost Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web-based',
    description: 'Calculate total painting costs including paint, materials, and labor for any project',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Paint cost calculation',
      'Labor cost estimation',
      'Material cost breakdown',
      'Regional pricing data',
      'Budget planning tools'
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        <SharedNavigation />

        <main className="pt-14">
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} className="py-4" />
          </div>

          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Paint Cost Calculator
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  Calculate the total cost of your painting project including paint, materials, and labor. 
                  Get accurate budget estimates and save money with professional insights.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Your Costs
                  </Link>
                  <Link
                    href="#cost-breakdown"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    See Cost Breakdown
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">$2-6</div>
                    <p className="text-base text-gray-200">Per Sq Ft Average</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">60-80%</div>
                    <p className="text-base text-gray-200">Labor Cost Share</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">25%</div>
                    <p className="text-base text-gray-200">Potential Savings</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Calculator */}
          <section className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Interactive Paint Cost Calculator
                </h2>
                
                <div className="rounded-lg border bg-background p-8 shadow-lg">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-6">Project Details</h3>
                      
                      <div className="space-y-6">
                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Home className="h-5 w-5 mr-2 text-primary" />
                            Room Information
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-sm font-medium">Square Footage</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">1,200</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Room Type</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Living Areas</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Paint Quality</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Premium</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Your Location</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">National Avg</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <PaintBucket className="h-5 w-5 mr-2 text-primary" />
                            Paint Specifications
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-base">Paint needed:</span>
                              <span className="text-base font-medium">3.5 gallons</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base">Primer needed:</span>
                              <span className="text-base font-medium">1 gallon</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base">Number of coats:</span>
                              <span className="text-base font-medium">2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-6">Cost Breakdown</h3>
                      
                      <div className="rounded-lg bg-primary/5 p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Paint (3.5 gal @ $50):</span>
                            <span className="font-medium">$175</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Primer (1 gal @ $30):</span>
                            <span className="font-medium">$30</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Supplies & materials:</span>
                            <span className="font-medium">$85</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor (24 hours @ $60):</span>
                            <span className="font-medium">$1,440</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Surface preparation:</span>
                            <span className="font-medium">$240</span>
                          </div>
                          <hr className="border-muted" />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Project Cost:</span>
                            <span className="text-primary">$1,970</span>
                          </div>
                          <div className="text-base text-gray-200">
                            Cost per sq ft: $1.64
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button className="w-full">
                            Get Professional Quote
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-base text-gray-200">
                          <Link href="/auth/signup" className="text-primary hover:underline">
                            Sign up free
                          </Link> to save and customize calculations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Factors */}
          <section id="cost-breakdown" className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Affects Painting Costs?</h2>
                <p className="text-lg text-gray-200">
                  Understanding these factors helps you budget accurately and make informed decisions
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {costFactors.map((factor, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <factor.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{factor.category}</h3>
                          <p className="text-base text-gray-200 mb-4">{factor.description}</p>
                          
                          <ul className="space-y-1 mb-4">
                            {factor.factors.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-center text-base">
                                <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          
                          <div className="text-base font-medium text-primary">
                            Average: {factor.averageCost}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Paint Grades Comparison */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Paint Grade Comparison</h2>
                <p className="text-lg text-gray-200">
                  Choose the right paint grade for your project and budget
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {paintGrades.map((grade, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${grade.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                      {grade.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-base font-medium text-primary-foreground">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{grade.grade}</h3>
                      <div className="text-2xl font-bold text-primary mb-1">{grade.priceRange}</div>
                      <div className="text-base text-gray-200 mb-4">
                        Coverage: {grade.coverage}
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-base font-medium mb-2">Best for:</div>
                        <div className="text-base text-gray-200">{grade.bestFor}</div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {grade.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-base">
                            <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="text-base">
                        <span className="font-medium">Lifespan:</span> {grade.lifespan}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Regional Pricing */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Regional Pricing Differences</h2>
                <p className="text-lg text-gray-200">
                  Painting costs vary significantly by location due to labor rates and material costs
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-muted rounded-lg">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-muted p-4 text-left">Region</th>
                        <th className="border border-muted p-4 text-left">Labor Rate</th>
                        <th className="border border-muted p-4 text-left">Paint Cost</th>
                        <th className="border border-muted p-4 text-left">Total Range/Sq Ft</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionalPricing.map((region, index) => (
                        <tr key={index} className="hover:bg-muted/25">
                          <td className="border border-muted p-4 font-medium">{region.region}</td>
                          <td className="border border-muted p-4">{region.laborRate}</td>
                          <td className="border border-muted p-4">{region.paintCost}</td>
                          <td className="border border-muted p-4 font-medium text-primary">{region.totalRange}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Budget Tips */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Money-Saving Tips</h2>
                <p className="text-lg text-gray-200">
                  Professional strategies to reduce your painting project costs
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {budgetTips.map((tip, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{tip.tip}</h3>
                          <div className="text-lg font-bold text-green-600 mb-2">Save {tip.savings}</div>
                          <p className="text-base text-gray-200">{tip.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Example Cost Breakdown */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Real Project Cost Example</h2>
                <p className="text-lg text-gray-200">
                  See how costs break down for a typical {costBreakdownExample.projectType}
                </p>
              </div>

              <div className="mx-auto max-w-3xl">
                <div className="rounded-lg border bg-background p-8">
                  <h3 className="text-xl font-semibold mb-6 text-center">{costBreakdownExample.projectType}</h3>
                  
                  <div className="space-y-4">
                    {Object.entries(costBreakdownExample.breakdown).map(([key, item]) => (
                      <div key={key} className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium capitalize">{key}:</div>
                          <div className="text-base text-gray-200">{item.description}</div>
                        </div>
                        <div className="text-lg font-bold">${item.cost.toLocaleString()}</div>
                      </div>
                    ))}
                    
                    <hr className="border-muted my-6" />
                    
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total Project Cost:</span>
                      <span className="text-primary">${costBreakdownExample.total.toLocaleString()}</span>
                    </div>
                    
                    <div className="text-center text-base text-gray-200">
                      Cost per square foot: ${costBreakdownExample.perSqFt}
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Button>Calculate Your Project Cost</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Paint Cost Calculator FAQ
                </h2>
                
                <div className="space-y-8">
                  {faqData.map((faq, index) => (
                    <div key={index} className="rounded-lg bg-background p-6">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-gray-200">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">More Painting Calculators</h2>
                <p className="text-lg text-gray-200">
                  Complete suite of tools for painting project planning
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Paint Quote Calculator</h3>
                    <p className="text-base text-gray-200">Generate professional quotes with detailed breakdowns</p>
                  </Link>

                  <Link href="/interior-painting-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Interior Calculator</h3>
                    <p className="text-base text-gray-200">Specialized for interior painting projects</p>
                  </Link>

                  <Link href="/painting-quote-generator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">AI Quote Generator</h3>
                    <p className="text-base text-gray-200">AI-powered instant quote generation</p>
                  </Link>

                  <Link href="/how-to-estimate-interior-paint-jobs" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Estimation Guide</h3>
                    <p className="text-base text-gray-200">Learn professional estimation techniques</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start Planning Your Paint Budget Today
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-100 mb-8">
                Get accurate cost estimates, compare options, and save money on your painting project 
                with our professional-grade calculators.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started Free
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pro Features
                </Link>
              </div>
              <p className="mt-4 text-base opacity-100">
                No credit card required • Professional results guaranteed
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}