import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator, Ruler, PaintBucket, Clock, CheckCircle, Home, FileText, Zap, DollarSign, AlertTriangle } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'How to Estimate Interior Paint Jobs: Complete Guide for Contractors',
  description: 'Learn how to estimate interior painting jobs accurately. Step-by-step guide covering measurements, materials, labor costs, and pricing strategies for professional painters.',
  keywords: 'how to estimate interior paint jobs, interior painting estimate example, how to estimate interior house painting, painting job estimation, interior paint cost calculator',
  openGraph: {
    title: 'How to Estimate Interior Paint Jobs - Professional Contractor Guide',
    description: 'Complete guide to estimating interior painting jobs with examples, calculations, and professional tips for accurate quotes.',
    type: 'article',
    images: [{
      url: '/og-interior-paint-estimation.jpg',
      width: 1200,
      height: 630,
      alt: 'How to Estimate Interior Paint Jobs Guide'
    }]
  },
  alternates: {
    canonical: '/how-to-estimate-interior-paint-jobs'
  }
}

const estimationSteps = [
  {
    step: 1,
    title: 'Measure the Space',
    description: 'Calculate wall area by measuring length, width, and height of each room',
    details: ['Measure each wall separately', 'Account for ceiling height variations', 'Note architectural features'],
    icon: Ruler
  },
  {
    step: 2,
    title: 'Subtract Openings',
    description: 'Deduct windows, doors, and other non-paintable areas from total square footage',
    details: ['Standard door: 20 sq ft', 'Standard window: 15 sq ft', 'Built-ins and fixtures'],
    icon: Home
  },
  {
    step: 3,
    title: 'Calculate Paint Needed',
    description: 'Determine gallons required based on coverage rates and number of coats',
    details: ['1 gallon covers ~400 sq ft', 'Add 10% waste factor', 'Consider primer requirements'],
    icon: PaintBucket
  },
  {
    step: 4,
    title: 'Estimate Labor Time',
    description: 'Calculate work hours based on room complexity and surface preparation needs',
    details: ['Standard room: 6-8 hours', 'Add prep work time', 'Factor in drying time'],
    icon: Clock
  },
  {
    step: 5,
    title: 'Add Materials & Markup',
    description: 'Include all supplies, overhead costs, and profit margin in final quote',
    details: ['Brushes, rollers, drop cloths', '20-50% markup typical', 'Overhead and insurance'],
    icon: DollarSign
  }
]

const estimationExample = {
  roomType: 'Standard Living Room',
  dimensions: {
    length: 12,
    width: 14,
    height: 9,
    doors: 2,
    windows: 3
  },
  calculations: {
    wallArea: 468,
    openings: 85,
    paintableArea: 383,
    gallonsNeeded: 1.2,
    laborHours: 8,
    materialCost: 185,
    laborCost: 640,
    totalCost: 825,
    markup: 412,
    finalQuote: 1237
  }
}

const commonMistakes = [
  {
    mistake: 'Not measuring accurately',
    consequence: 'Under or overestimating materials',
    solution: 'Use a laser measuring tool and double-check calculations',
    icon: AlertTriangle
  },
  {
    mistake: 'Forgetting prep work',
    consequence: 'Unrealistic timeline and budget',
    solution: 'Always include 2-4 hours for surface preparation',
    icon: Clock
  },
  {
    mistake: 'Underestimating complexity',
    consequence: 'Job becomes unprofitable',
    solution: 'Add complexity multipliers for detailed work',
    icon: Calculator
  },
  {
    mistake: 'Not including all materials',
    consequence: 'Hidden costs reduce profit',
    solution: 'Create comprehensive material checklists',
    icon: FileText
  }
]

const pricingFactors = [
  {
    factor: 'Surface Condition',
    impact: 'Good: +0% | Fair: +15% | Poor: +30%',
    description: 'Existing paint condition affects prep time'
  },
  {
    factor: 'Room Complexity',
    impact: 'Simple: +0% | Average: +20% | Complex: +40%',
    description: 'Trim, built-ins, and details increase labor'
  },
  {
    factor: 'Paint Quality',
    impact: 'Basic: $30-40/gal | Premium: $50-70/gal',
    description: 'Higher quality paint costs more but covers better'
  },
  {
    factor: 'Local Market Rate',
    impact: '$40-80 per hour for labor',
    description: 'Regional variations in contractor rates'
  },
  {
    factor: 'Project Size',
    impact: 'Single room: +20% | Whole house: -10%',
    description: 'Economies of scale for larger projects'
  }
]

const faqData = [
  {
    question: 'How do I calculate square footage for interior painting?',
    answer: 'Measure the length and width of each wall, multiply to get area, then subtract windows and doors. For a 12x14 room with 9ft ceilings: (12+14+12+14) × 9 = 468 sq ft of wall area.'
  },
  {
    question: 'How much paint do I need for an interior room?',
    answer: 'One gallon typically covers 350-400 square feet with one coat. For a 400 sq ft room needing 2 coats, you\'d need about 2-2.5 gallons plus primer if needed.'
  },
  {
    question: 'What should I include in my interior painting estimate?',
    answer: 'Include materials (paint, primer, supplies), labor costs, surface preparation, cleanup, overhead, and profit margin. Don\'t forget to account for move-in/move-out time.'
  },
  {
    question: 'How long does it take to paint an interior room?',
    answer: 'A standard 12x12 room typically takes 6-8 hours including prep, priming, and two coats. Complex rooms with lots of trim can take 10-12 hours.'
  },
  {
    question: 'What\'s a typical markup for interior painting jobs?',
    answer: 'Most contractors add 25-50% markup to cover overhead, insurance, and profit. The exact percentage depends on local market conditions and business expenses.'
  }
]

export default function HowToEstimateInteriorPaintJobs() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
    { label: 'How to Estimate Interior Paint Jobs' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://paintquotepro.com/how-to-estimate-interior-paint-jobs',
    headline: 'How to Estimate Interior Paint Jobs: Complete Guide for Contractors',
    description: 'Step-by-step guide to estimating interior painting jobs with calculations, examples, and professional tips.',
    author: {
      '@type': 'Organization',
      name: 'PaintQuote Pro'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PaintQuote Pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://paintquotepro.com/logo.png'
      }
    },
    articleSection: 'Painting Guides',
    wordCount: 2500,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://paintquotepro.com/how-to-estimate-interior-paint-jobs'
    }
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
                  How to Estimate Interior Paint Jobs
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Complete step-by-step guide to accurate interior painting estimates. Learn professional 
                  techniques, avoid common mistakes, and price jobs profitably with real examples.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/paint-quote-calculator"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Use Our Calculator
                  </Link>
                  <Link
                    href="#estimation-steps"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Start Learning
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">5 Steps</div>
                    <p className="text-sm text-muted-foreground">To Accurate Estimates</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">15 min</div>
                    <p className="text-sm text-muted-foreground">With Our System</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Estimation Steps */}
          <section id="estimation-steps" className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">5-Step Interior Paint Estimation Process</h2>
                <p className="text-lg text-muted-foreground">
                  Follow this proven method used by professional contractors to create accurate estimates
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="space-y-12">
                  {estimationSteps.map((step, index) => (
                    <div key={index} className="flex gap-8 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <step.icon className="h-8 w-8" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-4">
                          {step.description}
                        </p>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center">
                              <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Example Calculation */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Interior Painting Estimate Example</h2>
                <p className="text-lg text-muted-foreground">
                  Real calculation for a {estimationExample.roomType}
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="rounded-lg border bg-background p-8">
                    <h3 className="text-xl font-semibold mb-6">Project Details</h3>
                    
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted/50 p-6">
                        <h4 className="font-medium mb-4">Room Dimensions</h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex justify-between">
                            <span>Length:</span>
                            <span className="font-medium">{estimationExample.dimensions.length} ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Width:</span>
                            <span className="font-medium">{estimationExample.dimensions.width} ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Height:</span>
                            <span className="font-medium">{estimationExample.dimensions.height} ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Openings:</span>
                            <span className="font-medium">{estimationExample.dimensions.doors + estimationExample.dimensions.windows}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-6">
                        <h4 className="font-medium mb-4">Measurements Breakdown</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Wall perimeter:</span>
                            <span>({estimationExample.dimensions.length}+{estimationExample.dimensions.width}) × 2 = {(estimationExample.dimensions.length + estimationExample.dimensions.width) * 2} ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wall area:</span>
                            <span>{(estimationExample.dimensions.length + estimationExample.dimensions.width) * 2} × {estimationExample.dimensions.height} = {estimationExample.calculations.wallArea} sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Doors & windows:</span>
                            <span>-{estimationExample.calculations.openings} sq ft</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Paintable area:</span>
                            <span>{estimationExample.calculations.paintableArea} sq ft</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-primary/5 p-8">
                    <h3 className="text-xl font-semibold mb-6">Cost Breakdown</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Materials</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Paint needed:</span>
                            <span>{estimationExample.calculations.gallonsNeeded} gallons</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Paint & supplies:</span>
                            <span>${estimationExample.calculations.materialCost}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-4">Labor</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Estimated hours:</span>
                            <span>{estimationExample.calculations.laborHours} hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor cost:</span>
                            <span>${estimationExample.calculations.laborCost}</span>
                          </div>
                        </div>
                      </div>

                      <hr className="border-muted" />

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${estimationExample.calculations.totalCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Markup (50%):</span>
                          <span>${estimationExample.calculations.markup}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Final Quote:</span>
                          <span className="text-primary">${estimationExample.calculations.finalQuote}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Price per sq ft: ${(estimationExample.calculations.finalQuote / estimationExample.calculations.paintableArea).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Common Estimation Mistakes to Avoid</h2>
                <p className="text-lg text-muted-foreground">
                  Learn from these frequent errors that cost contractors money
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {commonMistakes.map((mistake, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <mistake.icon className="h-8 w-8 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{mistake.mistake}</h3>
                          <p className="text-sm text-red-600 mb-3">
                            <strong>Consequence:</strong> {mistake.consequence}
                          </p>
                          <p className="text-sm text-green-700">
                            <strong>Solution:</strong> {mistake.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Factors */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Factors That Affect Interior Paint Job Pricing</h2>
                <p className="text-lg text-muted-foreground">
                  Understanding these variables helps you create more accurate estimates
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="space-y-6">
                  {pricingFactors.map((factor, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="grid gap-4 md:grid-cols-3 md:items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{factor.factor}</h3>
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </div>
                        <div className="md:text-center">
                          <div className="text-sm font-medium text-primary">{factor.impact}</div>
                        </div>
                        <div className="md:text-right">
                          <Button variant="outline" size="sm">
                            Calculate Impact
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Interior Paint Estimation FAQ
                </h2>
                
                <div className="space-y-8">
                  {faqData.map((faq, index) => (
                    <div key={index} className="rounded-lg bg-background p-6">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
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
                <h2 className="text-3xl font-bold mb-4">Tools to Speed Up Your Estimates</h2>
                <p className="text-lg text-muted-foreground">
                  Professional tools that make estimation faster and more accurate
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Paint Quote Calculator</h3>
                    <p className="text-sm text-muted-foreground">Instant calculations for any interior project</p>
                  </Link>

                  <Link href="/interior-painting-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Interior Calculator</h3>
                    <p className="text-sm text-muted-foreground">Specialized for interior painting estimates</p>
                  </Link>

                  <Link href="/painting-quote-generator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">AI Quote Generator</h3>
                    <p className="text-sm text-muted-foreground">Generate estimates in seconds with AI</p>
                  </Link>

                  <Link href="/paint-estimate-templates" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Quote Templates</h3>
                    <p className="text-sm text-muted-foreground">Professional templates for all projects</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Professional Estimates?
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-90 mb-8">
                Stop spending hours on manual calculations. Use our professional tools to create 
                accurate estimates in minutes and win more jobs.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
                <Link
                  href="/paint-quote-calculator"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  Try Calculator Now
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                No credit card required • Professional results guaranteed
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}