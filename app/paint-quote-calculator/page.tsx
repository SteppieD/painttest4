import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator, Clock, CheckCircle, Zap, DollarSign, Home, Building, Palette } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Paint Quote Calculator | Free Professional Painting Quote Generator',
  description: 'Calculate professional painting quotes instantly with our free paint quote calculator. Get accurate estimates for interior, exterior, and commercial painting projects in minutes.',
  keywords: 'paint quote calculator, painting quote calculator, free paint calculator, painting estimate calculator, paint cost calculator, professional painting quotes',
  openGraph: {
    title: 'Free Paint Quote Calculator - Generate Professional Painting Quotes',
    description: 'Calculate accurate painting quotes instantly. Our AI-powered paint quote calculator helps contractors create professional estimates in minutes.',
    type: 'website',
    images: [{
      url: '/og-paint-quote-calculator.jpg',
      width: 1200,
      height: 630,
      alt: 'Paint Quote Calculator'
    }]
  },
  alternates: {
    canonical: '/paint-quote-calculator'
  }
}

const calculatorSteps = [
  {
    step: 1,
    title: 'Measure Your Space',
    description: 'Enter room dimensions, ceiling height, and number of windows/doors',
    icon: Home
  },
  {
    step: 2,
    title: 'Select Paint Type',
    description: 'Choose interior, exterior, primer, or specialty paint requirements',
    icon: Palette
  },
  {
    step: 3,
    title: 'Add Labor & Materials',
    description: 'Calculator includes prep work, labor rates, and material costs',
    icon: DollarSign
  },
  {
    step: 4,
    title: 'Generate Professional Quote',
    description: 'Get a detailed, professional quote ready to send to clients',
    icon: CheckCircle
  }
]

const quoteTypes = [
  {
    type: 'Interior Painting',
    features: ['Wall preparation', 'Primer application', 'Paint coverage', 'Trim work', 'Cleanup'],
    avgCost: '$2-4/sq ft',
    timeEstimate: '1-3 days'
  },
  {
    type: 'Exterior Painting',
    features: ['Surface preparation', 'Weather protection', 'Multiple coats', 'Trim & details', 'Cleanup'],
    avgCost: '$3-6/sq ft',
    timeEstimate: '3-7 days'
  },
  {
    type: 'Commercial Projects',
    features: ['Volume pricing', 'Specialty coatings', 'Safety requirements', 'Timeline planning', 'Permits'],
    avgCost: '$2-5/sq ft',
    timeEstimate: '1-4 weeks'
  }
]

const faqData = [
  {
    question: 'How accurate is the paint quote calculator?',
    answer: 'Our paint quote calculator provides estimates within 10-15% of actual costs for standard projects. For complex jobs requiring specialty preparation or premium materials, we recommend using our full estimating software for maximum accuracy.'
  },
  {
    question: 'What factors affect painting quote calculations?',
    answer: 'Key factors include square footage, ceiling height, surface condition, paint quality, primer requirements, trim work, and local labor rates. Our calculator accounts for all standard variables.'
  },
  {
    question: 'Can I customize labor rates in the calculator?',
    answer: 'Yes! Professional contractors can adjust labor rates, markup percentages, and material costs to match their local market and business model.'
  },
  {
    question: 'Does the calculator include paint coverage calculations?',
    answer: 'Absolutely. The calculator automatically calculates paint coverage based on surface area, number of coats needed, and paint type to ensure accurate material estimates.'
  }
]

export default function PaintQuoteCalculator() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://paintquotepro.com/paint-quote-calculator',
    name: 'Paint Quote Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web-based',
    description: 'Free professional painting quote calculator for contractors and homeowners',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Square footage calculator',
      'Paint coverage estimation',
      'Labor cost calculation',
      'Material cost estimation',
      'Professional quote generation'
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
          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Free Paint Quote Calculator
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  Generate professional painting quotes instantly. Calculate accurate costs for interior, 
                  exterior, and commercial painting projects with our AI-powered calculator.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Start Calculating Quotes
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    See How It Works
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <p className="text-base text-gray-200">Accuracy Rate</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">2 min</div>
                    <p className="text-base text-gray-200">Quote Generation</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <p className="text-base text-gray-200">Quotes Generated</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculator Demo Section */}
          <section className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Professional Paint Quote Calculator
                </h2>
                
                <div className="rounded-lg border bg-background p-8 shadow-lg">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-6">Calculate Your Quote</h3>
                      
                      <div className="space-y-6">
                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Home className="h-5 w-5 mr-2 text-primary" />
                            Project Details
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-base font-medium">Room Length (ft)</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">12</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Room Width (ft)</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">10</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Ceiling Height (ft)</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">9</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Doors & Windows</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">3</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Palette className="h-5 w-5 mr-2 text-primary" />
                            Paint Specifications
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-base">Paint Type:</span>
                              <span className="text-base font-medium">Premium Interior</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base">Primer Needed:</span>
                              <span className="text-base font-medium">Yes</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base">Coats Required:</span>
                              <span className="text-base font-medium">2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-6">Quote Breakdown</h3>
                      
                      <div className="rounded-lg bg-primary/5 p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Total Square Footage:</span>
                            <span className="font-medium">324 sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Paint & Materials:</span>
                            <span className="font-medium">$285</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor Cost:</span>
                            <span className="font-medium">$648</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Preparation Work:</span>
                            <span className="font-medium">$162</span>
                          </div>
                          <hr className="border-muted" />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Quote:</span>
                            <span className="text-primary">$1,095</span>
                          </div>
                          <div className="text-base text-gray-200">
                            Price per sq ft: $3.38
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button className="w-full">
                            Generate Professional Quote
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-base text-gray-200">
                          <Link href="/auth/signup" className="text-primary hover:underline">
                            Sign up free
                          </Link> to customize rates and save quotes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold mb-4">How the Paint Quote Calculator Works</h2>
                <p className="text-lg text-gray-200 mb-12">
                  Generate accurate painting quotes in 4 simple steps
                </p>
              </div>

              <div className="mx-auto max-w-5xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {calculatorSteps.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <step.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Step {step.step}: {step.title}
                      </h3>
                      <p className="text-base text-gray-200">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quote Types Section */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Calculate Quotes for Any Project Type</h2>
                <p className="text-lg text-gray-200">
                  Our calculator handles residential, commercial, and specialty painting projects
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {quoteTypes.map((type, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4">{type.type}</h3>
                      
                      <ul className="space-y-2 mb-6">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="mr-2 h-4 w-4 shrink-0 text-primary mt-0.5" />
                            <span className="text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-2">
                        <div className="flex justify-between text-base">
                          <span className="text-gray-200">Average Cost:</span>
                          <span className="font-medium">{type.avgCost}</span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span className="text-gray-200">Time Estimate:</span>
                          <span className="font-medium">{type.timeEstimate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Use Our Paint Quote Calculator?</h2>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <div className="text-center">
                    <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
                    <p className="text-gray-200">
                      Generate professional quotes in under 2 minutes instead of hours of manual calculations.
                    </p>
                  </div>

                  <div className="text-center">
                    <Calculator className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Accurate Calculations</h3>
                    <p className="text-gray-200">
                      Built-in formulas account for paint coverage, prep work, and local labor rates.
                    </p>
                  </div>

                  <div className="text-center">
                    <DollarSign className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Maximize Profits</h3>
                    <p className="text-gray-200">
                      Ensure proper markup and avoid underpricing jobs with built-in profit margins.
                    </p>
                  </div>

                  <div className="text-center">
                    <Clock className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Save Time</h3>
                    <p className="text-gray-200">
                      Respond to quote requests faster and win more jobs with quick turnaround times.
                    </p>
                  </div>

                  <div className="text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Professional Output</h3>
                    <p className="text-gray-200">
                      Generate branded, detailed quotes that impress clients and win more business.
                    </p>
                  </div>

                  <div className="text-center">
                    <Building className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Project Types</h3>
                    <p className="text-gray-200">
                      Handle residential, commercial, interior, and exterior projects with one tool.
                    </p>
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
                  Paint Quote Calculator FAQ
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
                <h2 className="text-3xl font-bold mb-4">More Painting Tools</h2>
                <p className="text-lg text-gray-200">
                  Explore our complete suite of painting business tools
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/interior-painting-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Interior Quote Calculator</h3>
                    <p className="text-base text-gray-200">Specialized calculator for interior painting projects</p>
                  </Link>

                  <Link href="/exterior-painting-estimate-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Exterior Cost Calculator</h3>
                    <p className="text-base text-gray-200">Calculate exterior painting estimates with weather factors</p>
                  </Link>

                  <Link href="/paint-estimate-templates" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Quote Templates</h3>
                    <p className="text-base text-gray-200">Professional templates for all project types</p>
                  </Link>

                  <Link href="/painting-business-software" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Business Software</h3>
                    <p className="text-base text-gray-200">Complete business management for painting contractors</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start Generating Professional Paint Quotes Today
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-100 mb-8">
                Join thousands of painters using our calculator to create accurate quotes, 
                win more jobs, and grow their business.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Start Free Quote Calculator
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View All Features
                </Link>
              </div>
              <p className="mt-4 text-base opacity-100">
                No credit card required • Generate unlimited quotes • Cancel anytime
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}