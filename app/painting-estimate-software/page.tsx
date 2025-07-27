import Link from 'next/link'
import { Metadata } from 'next'
import { Zap, Calculator, FileText, TrendingUp, Shield, Clock, CheckCircle, BarChart, Star } from 'lucide-react'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import ModernNavigation from '@/components/modern-navigation'
import { PaintEstimateCalculator } from '@/components/calculators/paint-estimate-calculator'
import { ROICalculator } from '@/components/calculators/roi-calculator'

export const metadata: Metadata = {
  title: 'Painting Estimate Software | Fast & Accurate Quotes | PaintQuote Pro',
  description: 'Professional painting estimate software with AI-powered accuracy. Create detailed estimates in minutes, track costs, and win more painting jobs. Free trial available.',
  keywords: 'painting estimate software, painting estimating software, painting quote software, estimate painting jobs, painting calculator software, contractor estimate software',
  openGraph: {
    title: 'Painting Estimate Software - Create Accurate Quotes in Minutes',
    description: 'The most advanced painting estimate software for contractors. AI-powered, accurate, and professional.',
    type: 'website',
  },
}

export default function PaintingEstimateSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PaintQuote Pro Painting Estimate Software',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '99',
      priceCurrency: 'USD',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2847',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Mike Rodriguez',
        },
        reviewBody: 'Best painting estimate software I\'ve used. Saves hours on every quote.',
      }
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <main className="pt-24 relative z-10">
          {/* Hero Section */}
          
          {/* Hero Section */}
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                    Painting Estimate Software That Wins More Jobs
                  </h1>
                  <p className="mt-6 text-xl text-gray-300">
                    Create professional painting estimates in minutes with AI-powered accuracy. 
                    Track costs, manage quotes, and grow your painting business faster.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/trial-signup"
                      className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 text-base font-medium text-white shadow-lg"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Link>
                    <Link
                      href="/painting-estimate-calculator-free"
                      className="inline-flex items-center justify-center rounded-md glass-card border-white/20 px-6 py-3 text-base font-medium text-white hover:bg-white/10"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Try Free Calculator
                    </Link>
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted" />
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-400">
                          Trusted by 2,847+ painting contractors
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="glass-card p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <h3 className="text-lg font-semibold text-white">Quick Estimate Preview</h3>
                        <span className="text-sm text-gray-400">Generated in 15 min</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-300">
                          <span>Interior Walls (2,400 sq ft)</span>
                          <span className="font-medium text-white">$6,000</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Ceilings (800 sq ft)</span>
                          <span className="font-medium text-white">$2,400</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Trim & Baseboards (320 ln ft)</span>
                          <span className="font-medium text-white">$1,120</span>
                        </div>
                        <div className="border-t border-white/10 pt-3">
                          <div className="flex justify-between text-lg font-semibold">
                            <span className="text-white">Total Estimate</span>
                            <span className="text-blue-400">$9,520</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">
                            Includes materials (70%) and labor (30%)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="border-y border-white/10 bg-white/5 py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">87%</div>
                  <p className="text-sm text-muted-foreground">Faster Quotes</p>
                </div>
                <div className="hidden md:block">•</div>
                <div>
                  <div className="text-2xl font-bold text-primary">42%</div>
                  <p className="text-sm text-muted-foreground">More Jobs Won</p>
                </div>
                <div className="hidden md:block">•</div>
                <div>
                  <div className="text-2xl font-bold text-primary">$47M+</div>
                  <p className="text-sm text-muted-foreground">Quoted Work</p>
                </div>
                <div className="hidden md:block">•</div>
                <div>
                  <div className="text-2xl font-bold text-primary">4.8/5</div>
                  <p className="text-sm text-muted-foreground">User Rating</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Everything You Need in Painting Estimate Software
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Professional tools designed specifically for painting contractors to create 
                  accurate estimates and win more profitable jobs.
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
                  <Calculator className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Smart Estimate Calculator</h3>
                  <p className="mt-2 text-muted-foreground">
                    Automatically calculate costs based on surface area, paint type, and labor. 
                    Our charge rate system ensures profitable pricing every time.
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Square foot pricing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Linear foot calculations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Auto labor calculations
                    </li>
                  </ul>
                </div>

                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
                  <FileText className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Professional Quote Templates</h3>
                  <p className="mt-2 text-muted-foreground">
                    Generate beautiful, branded quotes that impress clients. Include photos, 
                    detailed scope, and professional terms automatically.
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Custom branding
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      PDF generation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Digital signatures
                    </li>
                  </ul>
                </div>

                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
                  <TrendingUp className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Profit Tracking</h3>
                  <p className="mt-2 text-muted-foreground">
                    Know exactly which jobs make money. Track estimated vs actual costs, analyze 
                    profit margins, and optimize your pricing.
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Job cost tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Margin analysis
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Revenue reports
                    </li>
                  </ul>
                </div>

                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
                  <Clock className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Lightning Fast Estimates</h3>
                  <p className="mt-2 text-muted-foreground">
                    Create detailed estimates in 15 minutes instead of hours. Our AI understands 
                    painting terminology and extracts all details automatically.
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      AI-powered chat
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Voice input support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Smart suggestions
                    </li>
                  </ul>
                </div>

                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Accurate Every Time</h3>
                  <p className="mt-2 text-muted-foreground">
                    Eliminate costly errors with built-in validation and industry-standard pricing. 
                    Never underbid or overprice a job again.
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Error checking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Price validation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Scope verification
                    </li>
                  </ul>
                </div>

                <div className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Business Intelligence</h3>
                  <p className="mt-2 text-muted-foreground">
                    Make data-driven decisions with comprehensive analytics. See conversion rates, 
                    average job values, and seasonal trends.
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Quote analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Win/loss tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Customer insights
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  How Our Painting Estimate Software Works
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  From site visit to signed contract in three simple steps
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-3">
                <div className="relative">
                  <div className="absolute left-8 top-12 hidden h-full w-0.5 bg-border md:block" />
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Describe the Job</h3>
                  <p className="mt-2 text-muted-foreground">
                    Simply chat with our AI about the painting project. Describe rooms, surfaces, 
                    and any special requirements in natural language.
                  </p>
                  <div className="mt-4 rounded-lg border bg-background p-4">
                    <p className="text-sm italic">
                      "3 bedroom house, all interior walls and ceilings, light prep work needed, 
                      customer wants premium paint"
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-8 top-12 hidden h-full w-0.5 bg-border md:block" />
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Review & Adjust</h3>
                  <p className="mt-2 text-muted-foreground">
                    AI extracts all details and calculates costs using your charge rates. Review 
                    the estimate and make any adjustments needed.
                  </p>
                  <div className="mt-4 rounded-lg border bg-background p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Walls: 2,400 sq ft</span>
                        <span className="font-medium">✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ceilings: 800 sq ft</span>
                        <span className="font-medium">✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Send Quote</h3>
                  <p className="mt-2 text-muted-foreground">
                    Generate a professional PDF quote with your branding. Send directly to the 
                    client or print for on-site signing.
                  </p>
                  <div className="mt-4 rounded-lg border bg-background p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quote #2024-1547</span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                        Sent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Compare Painting Estimate Software Options
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  See why contractors choose PaintQuote Pro over alternatives
                </p>
              </div>

              <div className="mt-12 overflow-x-auto">
                <table className="mx-auto w-full max-w-4xl">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">Feature</th>
                      <th className="px-4 py-3 text-center">
                        <div className="font-semibold">PaintQuote Pro</div>
                        <div className="text-sm font-normal text-muted-foreground">$49/mo</div>
                      </th>
                      <th className="px-4 py-3 text-center">
                        <div className="font-semibold">Competitor A</div>
                        <div className="text-sm font-normal text-muted-foreground">$89/mo</div>
                      </th>
                      <th className="px-4 py-3 text-center">
                        <div className="font-semibold">Manual Process</div>
                        <div className="text-sm font-normal text-muted-foreground">$0/mo</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3">Time to Create Quote</td>
                      <td className="px-4 py-3 text-center font-medium text-primary">15 minutes</td>
                      <td className="px-4 py-3 text-center">45 minutes</td>
                      <td className="px-4 py-3 text-center">2-3 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">AI-Powered</td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle className="mx-auto h-5 w-5 text-primary" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-muted-foreground">✗</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-muted-foreground">✗</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Painting-Specific</td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle className="mx-auto h-5 w-5 text-primary" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-muted-foreground">Partial</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-muted-foreground">✗</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Mobile App</td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle className="mx-auto h-5 w-5 text-primary" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle className="mx-auto h-5 w-5 text-primary" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-muted-foreground">✗</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Error Rate</td>
                      <td className="px-4 py-3 text-center font-medium text-primary">&lt;1%</td>
                      <td className="px-4 py-3 text-center">5-10%</td>
                      <td className="px-4 py-3 text-center">15-20%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Analytics & Reporting</td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle className="mx-auto h-5 w-5 text-primary" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-muted-foreground">Basic</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-muted-foreground">✗</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Customer Success */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                  Painting Contractors Love Our Estimate Software
                </h2>
                
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  <div className="rounded-lg border bg-background p-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="mt-4">
                      <p className="text-muted-foreground">
                        "Switched from manual estimates to PaintQuote Pro 6 months ago. We're now 
                        sending 3x more quotes and our close rate went from 20% to 35%. The AI 
                        chat feature is incredible - it understands painting terminology perfectly."
                      </p>
                      <footer className="mt-4">
                        <strong>Sarah Chen</strong>
                        <p className="text-sm text-muted-foreground">Premier Coatings Inc, Seattle</p>
                      </footer>
                    </blockquote>
                  </div>

                  <div className="rounded-lg border bg-background p-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="mt-4">
                      <p className="text-muted-foreground">
                        "As a solo contractor, time is everything. PaintQuote Pro lets me create 
                        estimates on-site in 15 minutes. Clients are impressed by the professional 
                        quotes and I'm booking 50% more jobs."
                      </p>
                      <footer className="mt-4">
                        <strong>Tom Martinez</strong>
                        <p className="text-sm text-muted-foreground">Tom's Quality Painting, Chicago</p>
                      </footer>
                    </blockquote>
                  </div>

                  <div className="rounded-lg border bg-background p-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="mt-4">
                      <p className="text-muted-foreground">
                        "The profit tracking alone is worth the price. We discovered we were 
                        underpricing commercial jobs by 20%. Fixed our rates and added $15K 
                        monthly revenue without working more hours."
                      </p>
                      <footer className="mt-4">
                        <strong>James Wilson</strong>
                        <p className="text-sm text-muted-foreground">Wilson & Sons Painting, Atlanta</p>
                      </footer>
                    </blockquote>
                  </div>

                  <div className="rounded-lg border bg-background p-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="mt-4">
                      <p className="text-muted-foreground">
                        "Game changer for our 15-person crew. Everyone can create consistent quotes 
                        using the same pricing. No more confusion or underpricing. ROI in first month."
                      </p>
                      <footer className="mt-4">
                        <strong>Robert Lee</strong>
                        <p className="text-sm text-muted-foreground">Elite Finishes, Denver</p>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Calculators */}
          <section className="py-16 md:py-24 bg-gray-900/50">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold md:text-4xl text-white mb-4">
                    Free Estimation Tools
                  </h2>
                  <p className="text-lg text-gray-300">
                    Try our calculators to see how painting estimate software can transform your business
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <PaintEstimateCalculator variant="glass" />
                  <ROICalculator variant="glass" />
                </div>
                
                <div className="mt-12 text-center">
                  <p className="text-gray-300 mb-6">
                    Ready to create professional estimates for your actual painting jobs?
                  </p>
                  <Link href="/trial-signup" className="btn-primary inline-flex items-center gap-2">
                    Start Your Free Trial
                    <Zap className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground md:py-24">
            <div className="container text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Start Creating Better Painting Estimates Today
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Join thousands of painting contractors who save time, win more jobs, and 
                increase profits with professional estimate software.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  Schedule Demo
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free trial • No credit card • 5-minute setup
              </p>
            </div>
          </section>

          {/* Related Software Pages */}
          <section className="py-12">
            <div className="container">
              <h2 className="text-center text-2xl font-bold">Related Painting Software Solutions</h2>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/painting-estimating-software" className="text-primary hover:underline">
                  Estimating Software
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/painting-business-software" className="text-primary hover:underline">
                  Business Software
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/paint-contractor-app" className="text-primary hover:underline">
                  Mobile App
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/commercial-painting-estimating-software" className="text-primary hover:underline">
                  Commercial Estimating
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/interior-painting-quote-calculator" className="text-primary hover:underline">
                  Interior Calculator
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/exterior-painting-estimate-calculator" className="text-primary hover:underline">
                  Exterior Calculator
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-5">
              <div>
                <h3 className="text-lg font-semibold">Software</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/painting-estimate-software" className="hover:text-foreground">Estimate Software</Link></li>
                  <li><Link href="/painting-estimating-software" className="hover:text-foreground">Estimating Tools</Link></li>
                  <li><Link href="/painting-business-software" className="hover:text-foreground">Business Suite</Link></li>
                  <li><Link href="/mobile-painting-estimate-app" className="hover:text-foreground">Mobile App</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Calculators</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/painting-estimate-calculator-free" className="hover:text-foreground">Free Calculator</Link></li>
                  <li><Link href="/interior-painting-quote-calculator" className="hover:text-foreground">Interior Calculator</Link></li>
                  <li><Link href="/exterior-painting-estimate-calculator" className="hover:text-foreground">Exterior Calculator</Link></li>
                  <li><Link href="/house-painting-cost-calculator" className="hover:text-foreground">House Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/how-to-quote-painting-jobs" className="hover:text-foreground">How to Quote</Link></li>
                  <li><Link href="/painting-quote-templates" className="hover:text-foreground">Quote Templates</Link></li>
                  <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                  <li><Link href="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
                  <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Support</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
                  <li><Link href="/tutorials" className="hover:text-foreground">Tutorials</Link></li>
                  <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
                  <li><Link href="/demo" className="hover:text-foreground">Book Demo</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro. The leading painting estimate software for contractors.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}