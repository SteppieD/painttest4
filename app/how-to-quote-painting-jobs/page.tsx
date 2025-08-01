import Link from 'next/link'
import { Metadata } from 'next'
import { BookOpen, ArrowRight, CheckCircle, TrendingUp, Users, FileText, Calculator, Clock, DollarSign, AlertTriangle, Ruler, PaintBucket, Zap } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'How to Quote Painting Jobs: Complete 2025 Guide for Professional Contractors',
  description: 'Learn how to quote painting jobs professionally. Complete step-by-step guide covering pricing, measurements, labor costs, and winning more contracts. Used by 3,000+ contractors.',
  keywords: 'how to quote painting jobs, painting estimate guide, painting contractor pricing, painting quote tutorial, how to price painting work, painting business quotes',
  openGraph: {
    title: 'How to Quote Painting Jobs - Complete Professional Guide',
    description: 'Master the art of quoting painting jobs. Learn professional techniques to price jobs accurately and win more contracts.',
    type: 'article',
    images: [{
      url: '/og-how-to-quote-painting-jobs.jpg',
      width: 1200,
      height: 630,
      alt: 'How to Quote Painting Jobs Guide'
    }]
  },
  alternates: {
    canonical: '/how-to-quote-painting-jobs'
  }
}

const quoteSteps = [
  {
    step: 1,
    title: 'Taking Accurate Measurements',
    icon: Ruler,
    description: 'Learn to measure interior and exterior surfaces correctly',
    time: '15-30 min'
  },
  {
    step: 2,
    title: 'Understanding Charge Rates',
    icon: DollarSign,
    description: 'Master modern pricing with combined material and labor rates',
    time: '10 min'
  },
  {
    step: 3,
    title: 'Calculating Labor Costs',
    icon: Clock,
    description: 'Estimate labor hours and apply appropriate hourly rates',
    time: '15 min'
  },
  {
    step: 4,
    title: 'Material Requirements',
    icon: PaintBucket,
    description: 'Calculate paint, primer, and supplies needed accurately',
    time: '10 min'
  },
  {
    step: 5,
    title: 'Adding Profit Margins',
    icon: TrendingUp,
    description: 'Build in proper markups for sustainable business growth',
    time: '5 min'
  },
  {
    step: 6,
    title: 'Professional Presentation',
    icon: FileText,
    description: 'Present quotes that win jobs and build trust',
    time: '10 min'
  }
]

const chargRates = [
  { surface: 'Interior Walls', unit: 'per sq ft', low: '$1.50', average: '$2.50', high: '$4.00' },
  { surface: 'Ceilings', unit: 'per sq ft', low: '$1.75', average: '$3.00', high: '$5.00' },
  { surface: 'Baseboards/Trim', unit: 'per linear ft', low: '$2.00', average: '$3.50', high: '$5.00' },
  { surface: 'Exterior Siding', unit: 'per sq ft', low: '$2.00', average: '$3.50', high: '$6.00' },
  { surface: 'Kitchen Cabinets', unit: 'per door', low: '$75', average: '$125', high: '$200' }
]

const commonMistakes = [
  {
    mistake: 'Underestimating prep work',
    consequence: 'Jobs become unprofitable, timeline overruns',
    solution: 'Always inspect surfaces carefully and price 30-50% of time for prep work',
    icon: AlertTriangle
  },
  {
    mistake: 'Forgetting overhead costs',
    consequence: 'No money left for insurance, equipment, or business growth',
    solution: 'Include 15-25% for overhead in every quote (insurance, vehicles, equipment)',
    icon: Calculator
  },
  {
    mistake: 'Racing to lowest price',
    consequence: 'Attracts bad clients, kills industry standards',
    solution: 'Compete on value, quality, and service - not just price',
    icon: TrendingUp
  },
  {
    mistake: 'Vague scope of work',
    consequence: 'Disputes, change orders, unhappy customers',
    solution: 'Be extremely specific about what is and isn\'t included',
    icon: FileText
  }
]

const faqData = [
  {
    question: 'How long should a painting quote be valid?',
    answer: 'Most contractors make quotes valid for 30 days. This gives customers time to decide while protecting you from material price increases. Always include the expiration date clearly on your quote.'
  },
  {
    question: 'Should I charge for estimates?',
    answer: 'For basic residential jobs, most contractors provide free estimates. For large commercial projects or complex jobs requiring detailed specifications, charging $100-500 for estimates is common and professional.'
  },
  {
    question: 'How do I handle change orders?',
    answer: 'Always get change orders in writing before starting additional work. Price changes at your normal rates plus a 10-20% premium for disrupting workflow. Clear communication prevents disputes.'
  },
  {
    question: 'What if my quote is much higher than competitors?',
    answer: 'Don\'t automatically lower your price. Instead, emphasize your value: quality materials, insurance, warranties, and professional service. Some customers will pay more for peace of mind.'
  },
  {
    question: 'How detailed should my quote breakdown be?',
    answer: 'Provide enough detail to show professionalism but not so much that customers can shop your pricing to competitors. Room-by-room or surface-type breakdowns work well.'
  },
  {
    question: 'When should I follow up on quotes?',
    answer: 'Follow up within 3-5 days with a friendly check-in. If no response, try again after a week. After that, move on unless they contact you. Persistence pays, but don\'t be pushy.'
  }
]

export default function HowToQuotePaintingJobs() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
    { label: 'How to Quote Painting Jobs' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://paintquotepro.com/how-to-quote-painting-jobs',
    headline: 'How to Quote Painting Jobs: Complete 2025 Guide for Professional Contractors',
    description: 'Complete step-by-step guide to creating professional painting quotes that win more jobs and increase profits.',
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
    articleSection: 'Business Guides',
    wordCount: 3500,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://paintquotepro.com/how-to-quote-painting-jobs'
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
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-base font-medium text-primary">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Complete Professional Guide
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  How to Quote Painting Jobs Like a Pro
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  The complete guide to creating accurate, professional painting quotes that win more jobs 
                  and increase your profits. Learn the techniques successful contractors use.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/paint-quote-calculator"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Try Our Quote Tool
                  </Link>
                  <Link
                    href="#guide-overview"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Read the Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">6 Steps</div>
                    <p className="text-base text-gray-200">To Professional Quotes</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">3,000+</div>
                    <p className="text-base text-gray-200">Contractors Trained</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">85 min</div>
                    <p className="text-base text-gray-200">Complete Guide</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Guide Overview */}
          <section id="guide-overview" className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">6-Step Professional Quoting Process</h2>
                <p className="text-lg text-gray-200">
                  Follow this proven system used by successful painting contractors nationwide
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {quoteSteps.map((step, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {step.step}
                        </div>
                        <span className="text-base text-gray-200">{step.time}</span>
                      </div>
                      
                      <step.icon className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-base text-gray-200">{step.description}</p>
                      
                      <Button variant="outline" size="default" className="w-full mt-4">
                        <Link href={`#step-${step.step}`} className="w-full">
                          Learn Step {step.step}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <article className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl space-y-16">
                
                {/* Step 1: Measurements */}
                <section id="step-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Taking Accurate Measurements</h2>
                      <p className="text-gray-200">Foundation of profitable quotes</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-8">
                    Accurate measurements are the foundation of profitable painting quotes. Here's how to measure 
                    different surfaces correctly:
                  </p>
                  
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Ruler className="h-5 w-5 mr-2 text-primary" />
                        Interior Measurements
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div className="text-base">
                            <strong>Walls:</strong> Measure height × width for each wall. Subtract doors and windows 
                            over 15 sq ft. Don't forget closets and hallways.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div className="text-base">
                            <strong>Ceilings:</strong> Length × width of the room. Add 10% for textured ceilings 
                            that require more paint.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div className="text-base">
                            <strong>Trim & Baseboards:</strong> Measure linear feet. Include door frames, window 
                            casings, and crown molding separately.
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Ruler className="h-5 w-5 mr-2 text-primary" />
                        Exterior Measurements
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div className="text-base">
                            <strong>Siding:</strong> Measure each side of the house. Height × width, accounting for 
                            gables and architectural features.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div className="text-base">
                            <strong>Fascia & Soffits:</strong> Linear feet for fascia boards, square feet for 
                            soffits. Don't forget to check accessibility.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div className="text-base">
                            <strong>Windows & Doors:</strong> Measure frames and shutters separately. 
                            Note prep work needed for each.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 rounded-lg bg-primary/5 p-6">
                    <h4 className="font-semibold text-primary mb-2">Pro Tip: The 15% Rule</h4>
                    <p className="text-base">
                      Always add a 10-15% waste factor to your measurements. This covers touch-ups, overspray, 
                      and ensures you don&apos;t run short on materials. Better to have leftover paint than an angry customer.
                    </p>
                  </div>
                </section>

                {/* Step 2: Pricing */}
                <section id="step-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Understanding Charge Rates and Pricing</h2>
                      <p className="text-gray-200">Modern pricing that includes materials and labor</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-8">
                    Modern painting contractors use charge rates - a single price per unit that includes both 
                    materials and labor. This simplifies quoting and improves accuracy.
                  </p>

                  <h3 className="text-xl font-semibold mb-6">2025 Industry Charge Rates</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg border bg-background">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border p-4 text-left font-semibold">Surface Type</th>
                          <th className="border p-4 text-left font-semibold">Unit</th>
                          <th className="border p-4 text-left font-semibold">Low End</th>
                          <th className="border p-4 text-left font-semibold">Average</th>
                          <th className="border p-4 text-left font-semibold">High End</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chargRates.map((rate, index) => (
                          <tr key={index}>
                            <td className="border p-4 font-medium">{rate.surface}</td>
                            <td className="border p-4 text-base text-gray-200">{rate.unit}</td>
                            <td className="border p-4">{rate.low}</td>
                            <td className="border p-4 font-medium">{rate.average}</td>
                            <td className="border p-4">{rate.high}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border bg-background p-6">
                      <h4 className="font-semibold mb-4">Factors That Increase Rates</h4>
                      <ul className="space-y-2 text-base">
                        <li>• Premium paint or specialty finishes</li>
                        <li>• Extensive prep work needed</li>
                        <li>• Difficult access (ladders, scaffolding)</li>
                        <li>• Custom color matching</li>
                        <li>• Tight deadlines or rush jobs</li>
                      </ul>
                    </div>
                    
                    <div className="rounded-lg border bg-background p-6">
                      <h4 className="font-semibold mb-4">Geographic Adjustments</h4>
                      <ul className="space-y-2 text-base">
                        <li>• Major cities: +25-50% higher rates</li>
                        <li>• Rural areas: -15-25% lower rates</li>
                        <li>• Coastal regions: +20-30% higher</li>
                        <li>• Local competition level</li>
                        <li>• Cost of living adjustments</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Step 3: Labor */}
                <section id="step-3">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Calculating Labor Costs</h2>
                      <p className="text-gray-200">Accurate time estimates and proper rates</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-8">
                    Labor typically represents 25-35% of your total project cost. Here's how to calculate it accurately:
                  </p>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4">The 30% Rule (Simple Method)</h3>
                      <p className="mb-4 text-base">A quick approach many contractors use:</p>
                      <div className="space-y-2 text-base">
                        <div className="flex justify-between">
                          <span>Total project charge:</span>
                          <span className="font-medium">$5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Labor cost (30%):</span>
                          <span className="font-medium">$1,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Materials & overhead (70%):</span>
                          <span className="font-medium">$3,500</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4">Detailed Calculation Method</h3>
                      <div className="space-y-4 text-base">
                        <div>
                          <p className="font-medium mb-2">1. Production Rates (per hour):</p>
                          <ul className="space-y-1 ml-4">
                            <li>• Walls: 150-200 sq ft</li>
                            <li>• Ceilings: 100-150 sq ft</li>
                            <li>• Trim: 50-75 linear ft</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium mb-2">2. Add prep time: 20-40% of painting time</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">3. Hourly rates: $25-$75 (location dependent)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Step 4: Materials */}
                <section id="step-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Estimating Material Requirements</h2>
                      <p className="text-gray-200">Paint, primer, and supplies calculation</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-8">
                    Accurate material estimates prevent costly overruns and ensure profitability.
                  </p>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <PaintBucket className="h-5 w-5 mr-2 text-primary" />
                        Paint Coverage Guidelines
                      </h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Standard paint:</strong> 350-400 sq ft per gallon
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Primer:</strong> 200-300 sq ft per gallon
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Textured surfaces:</strong> Reduce coverage by 25-30%
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4">Additional Materials Checklist</h3>
                      <ul className="space-y-2 text-base">
                        <li>• Primer (when needed)</li>
                        <li>• Brushes and roller covers</li>
                        <li>• Drop cloths and plastic sheeting</li>
                        <li>• Painter's tape and masking supplies</li>
                        <li>• Caulk and patching compounds</li>
                        <li>• Sandpaper and prep materials</li>
                        <li>• Cleaning supplies and rags</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 rounded-lg bg-primary/5 p-6">
                    <h4 className="font-semibold text-primary mb-2">Material Cost Formula</h4>
                    <p className="text-base font-mono bg-background p-3 rounded border">
                      (Total Square Feet ÷ Coverage per Gallon) × Cost per Gallon × Number of Coats = Paint Cost
                    </p>
                  </div>
                </section>

                {/* Step 5: Profit */}
                <section id="step-5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      5
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Adding Profit Margins</h2>
                      <p className="text-gray-200">Building sustainable business growth</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-8">
                    Your quote must include adequate profit to sustain and grow your business. Don't work for free!
                  </p>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Industry Standard Markups</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="rounded-lg border bg-background p-6 text-center">
                        <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Materials</h4>
                        <div className="text-2xl font-bold text-primary mb-2">20-50%</div>
                        <p className="text-base text-gray-200">Mark up from wholesale cost</p>
                      </div>
                      
                      <div className="rounded-lg border bg-background p-6 text-center">
                        <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Labor</h4>
                        <div className="text-2xl font-bold text-primary mb-2">15-25%</div>
                        <p className="text-base text-gray-200">Profit after overhead costs</p>
                      </div>
                      
                      <div className="rounded-lg border bg-background p-6 text-center">
                        <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Overall Project</h4>
                        <div className="text-2xl font-bold text-primary mb-2">20-40%</div>
                        <p className="text-base text-gray-200">Net profit margin target</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-lg bg-orange-50 border border-orange-200 p-6">
                    <h4 className="font-semibold text-orange-800 mb-2">⚠️ Don't Race to the Bottom</h4>
                    <p className="text-base text-orange-700">
                      Charging too little hurts the entire industry and makes it impossible to provide quality service. 
                      Price for value, not just to win jobs. Quality customers will pay for professional work.
                    </p>
                  </div>
                </section>

                {/* Step 6: Presentation */}
                <section id="step-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      6
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Presenting Your Quote Professionally</h2>
                      <p className="text-gray-200">Win more jobs with professional presentation</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-200 mb-8">
                    A professional presentation can be the difference between winning and losing a job.
                  </p>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4">Essential Quote Elements</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex items-start">
                          <FileText className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Company branding:</strong> Logo, license number, insurance details
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Detailed scope:</strong> Exactly what&apos;s included (and what&apos;s not)
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Itemized pricing:</strong> Break down by room or surface type
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Timeline:</strong> Start date, duration, and completion date
                          </div>
                        </li>
                        <li className="flex items-start">
                          <FileText className="mr-3 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          <div>
                            <strong>Terms:</strong> Payment schedule, warranty, and conditions
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border bg-background p-6">
                      <h3 className="text-xl font-semibold mb-4">Professional Tips</h3>
                      <ul className="space-y-2 text-base">
                        <li>• Deliver quotes within 24-48 hours</li>
                        <li>• Use professional quote software or templates</li>
                        <li>• Include photos from the site visit</li>
                        <li>• Offer multiple options (good, better, best)</li>
                        <li>• Follow up within 3-5 days if no response</li>
                        <li>• Include customer testimonials or references</li>
                        <li>• Clearly state quote expiration date</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Common Mistakes */}
                <section id="common-mistakes">
                  <h2 className="text-3xl font-bold mb-8">Common Quoting Mistakes to Avoid</h2>
                  <div className="space-y-6">
                    {commonMistakes.map((mistake, index) => (
                      <div key={index} className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
                        <div className="flex items-start gap-4">
                          <mistake.icon className="h-8 w-8 text-destructive flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-semibold text-destructive mb-2">❌ {mistake.mistake}</h3>
                            <p className="text-base text-destructive/80 mb-3">
                              <strong>Consequence:</strong> {mistake.consequence}
                            </p>
                            <p className="text-base text-green-700">
                              <strong>✅ Solution:</strong> {mistake.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </article>

          {/* FAQ Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Frequently Asked Questions
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

          {/* CTA Section */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <div className="rounded-lg bg-primary/5 p-8 text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Create Professional Quotes?</h2>
                  <p className="text-lg text-gray-200 mb-8">
                    Mastering painting quotes takes practice, but with the right tools and knowledge, you can 
                    create accurate, profitable quotes that win more jobs and grow your business.
                  </p>
                  
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Try PaintQuote Pro Free
                    </Link>
                    <Link
                      href="/paint-estimate-templates"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Download Quote Templates
                    </Link>
                  </div>
                  
                  <p className="mt-4 text-base text-gray-200">
                    Join 3,000+ contractors creating professional quotes with our tools
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Related Painting Business Resources</h2>
                <p className="text-lg text-gray-200">
                  More tools and guides to help grow your painting business
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <Calculator className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                      Quote Calculator
                    </h3>
                    <p className="text-base text-gray-200">
                      Calculate painting costs instantly with our professional tool
                    </p>
                  </Link>

                  <Link href="/paint-estimate-templates" className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <FileText className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                      Quote Templates
                    </h3>
                    <p className="text-base text-gray-200">
                      Professional templates to create winning quotes faster
                    </p>
                  </Link>

                  <Link href="/how-to-estimate-interior-paint-jobs" className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <BookOpen className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                      Estimation Guide
                    </h3>
                    <p className="text-base text-gray-200">
                      Learn professional estimation techniques with examples
                    </p>
                  </Link>

                  <Link href="/painting-estimating-software" className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <Zap className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                      Software Reviews
                    </h3>
                    <p className="text-base text-gray-200">
                      Compare the best painting estimate software options
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}