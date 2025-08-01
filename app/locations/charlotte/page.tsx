import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Clock, Star, CheckCircle, Cloud, TreePine, Building, Calculator, Zap, BarChart } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Quote Software for Charlotte Contractors | PaintQuote Pro',
  description: 'AI-powered quoting software for Charlotte painting contractors. Create professional quotes in 10-15 minutes instead of hours. Win more jobs in the Queen City. Free trial available.',
  keywords: 'painting quote software Charlotte, Charlotte contractor software, painting estimator Charlotte NC, quote generator Charlotte painters, contractor business software Charlotte',
  openGraph: {
    title: 'PaintQuote Pro - Painting Quote Software for Charlotte Contractors',
    description: 'Transform your Charlotte painting business. Quote in minutes, not hours. Win 40-60% more jobs with professional estimates.',
    type: 'website',
    images: [{
      url: '/og-charlotte-software.jpg',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro for Charlotte Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/charlotte'
  }
}

const serviceAreas = [
  'Charlotte', 'Matthews', 'Mint Hill', 'Pineville', 'Huntersville', 'Cornelius',
  'Davidson', 'Mooresville', 'Indian Trail', 'Weddington', 'Waxhaw', 'Fort Mill',
  'Rock Hill', 'Ballantyne', 'South Park', 'Myers Park'
]

const localContractorStats = [
  {
    metric: 'Average Quote Time',
    traditional: '3-5 hours',
    withPaintQuote: '10-15 minutes',
    improvement: '95% faster'
  },
  {
    metric: 'Monthly Quotes',
    traditional: '20-26',
    withPaintQuote: '82-102',
    improvement: '3.9x more'
  },
  {
    metric: 'Win Rate',
    traditional: '22-28%',
    withPaintQuote: '46-61%',
    improvement: '+118% improvement'
  },
  {
    metric: 'Monthly Revenue',
    traditional: '$24,000',
    withPaintQuote: '$47,000',
    improvement: '+$23,000/month'
  }
]

export default function CharlottePaintingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://paintquotepro.com/locations/charlotte',
    name: 'PaintQuote Pro - Charlotte Edition',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Charlotte, NC'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '423',
      bestRating: '5'
    },
    featureList: [
      'AI-powered quote generation',
      'Charlotte market pricing data',
      'Professional templates',
      'Mobile-friendly',
      'Customer management',
      'ROI tracking'
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
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Locations', href: '/locations' },
              { label: 'Charlotte' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Painting Quote Software for Charlotte Contractors
                  </h1>
                  <p className="mt-6 text-xl text-gray-200">
                    Join 220+ Queen City painting contractors who've transformed their business 
                    with AI-powered quotes. Quote jobs in 10-15 minutes instead of hours and 
                    win 40-60% more projects.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Start Free Trial
                    </Link>
                    <Link
                      href="/roi-calculator"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Calculate Your ROI
                    </Link>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">220+</div>
                      <p className="text-base text-gray-200">Charlotte Contractors</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$2.9M</div>
                      <p className="text-base text-gray-200">Quotes Generated</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-base text-gray-200">User Rating</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <div className="flex h-full items-center justify-center">
                      <Calculator className="h-12 w-12 text-gray-200" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-base font-medium">Trusted by contractors in</p>
                    <p className="text-xl font-bold">Greater Charlotte</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Charlotte Market Stats */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Charlotte Painting Contractors Are Winning More Jobs</h2>
                <p className="mt-4 text-lg text-gray-200">
                  See how PaintQuote Pro transforms painting businesses in the Queen City
                </p>
              </div>
              
              <div className="mt-12 overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-base font-medium">Metric</th>
                      <th className="px-6 py-4 text-left text-base font-medium">Traditional Method</th>
                      <th className="px-6 py-4 text-left text-base font-medium">With PaintQuote Pro</th>
                      <th className="px-6 py-4 text-left text-base font-medium">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {localContractorStats.map((stat, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 font-medium">{stat.metric}</td>
                        <td className="px-6 py-4 text-gray-200">{stat.traditional}</td>
                        <td className="px-6 py-4 font-semibold text-primary">{stat.withPaintQuote}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{stat.improvement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Charlotte-Specific Features */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Built for Charlotte's Unique Market</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Features designed specifically for Queen City painting contractors
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Cloud className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Humidity & Mildew Pricing</h3>
                  <p className="mt-2 text-gray-200">
                    Built-in calculations for Charlotte's 70% humidity. Automatically includes 
                    mildew-resistant primers, moisture barriers, and breathable topcoats 
                    to handle Carolina's humid climate.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <TreePine className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Pine Pollen Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Pre-built quotes for Charlotte's yellow pollen season. Includes 
                    pollen-resistant sealers, easy-clean surfaces, and strategic scheduling 
                    recommendations for optimal results.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Building className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Banking Center Specs</h3>
                  <p className="mt-2 text-gray-200">
                    Templates for Charlotte's corporate headquarters. Includes after-hours 
                    pricing, low-VOC products, security compliance, and minimal disruption 
                    strategies for busy offices.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Mobile-First Design</h3>
                  <p className="mt-2 text-gray-200">
                    Quote on-site from Myers Park to Ballantyne. Works offline and syncs 
                    when connected. Perfect for Charlotte's sprawling metro area from 
                    Lake Norman to Fort Mill.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Charlotte Market Analytics</h3>
                  <p className="mt-2 text-gray-200">
                    Track win rates by neighborhood, see seasonal trends, and optimize 
                    pricing for different areas. Know exactly what works in Dilworth 
                    vs Matthews.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Professional Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Stand out in Charlotte's competitive market with professional quotes 
                    that build trust. Include your NC license, insurance details, 
                    and customer testimonials automatically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Success Stories */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Charlotte Contractors Love PaintQuote Pro</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Charlotte's banking sector demands speed and professionalism. Now I 
                    quote Uptown offices in 15 minutes with all compliance specs included. 
                    Closed $85,000 in corporate contracts just this quarter."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Marcus Johnson</strong>
                    <p className="text-base text-gray-200">Queen City Pro Painters, Uptown</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "The humidity templates are perfect for Charlotte. Every quote includes 
                    proper mildew protection automatically. Won 5 Lake Norman estates this 
                    summer - that{'''}s $210,000 in guaranteed work."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Jennifer Davis</strong>
                    <p className="text-base text-gray-200">Carolina Elite Painting, Lake Norman</p>
                  </footer>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-4">Join 220+ Charlotte contractors using PaintQuote Pro</p>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Read More Success Stories
                </Link>
              </div>
            </div>
          </section>

          {/* ROI Calculator Preview */}
          <section className="bg-primary/5 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold mb-8">
                  Your Charlotte Painting Business ROI
                </h2>
                
                <div className="rounded-lg bg-background p-8 shadow-lg">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-4">Current Situation</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium">23</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium">25%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium">$4,200</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium">$24,150</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">With PaintQuote Pro</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium text-primary">92</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium text-primary">53%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium text-primary">$4,200</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium text-primary">$204,960</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-lg bg-green-50 dark:bg-green-950/20 p-6 text-center">
                    <p className="text-lg mb-2">Additional Monthly Revenue</p>
                    <p className="text-4xl font-bold text-green-600">+$180,810</p>
                    <p className="text-base text-gray-200 mt-2">
                      That's 3,767x return on your PaintQuote Pro investment
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <Link
                      href="/roi-calculator"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
                    >
                      Calculate Your Exact ROI
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Serving Painting Contractors Throughout Greater Charlotte</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Wherever you operate in the Charlotte area, PaintQuote Pro helps you win more jobs
                </p>
              </div>
              
              <div className="mt-12 grid gap-2 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {serviceAreas.map((area) => (
                  <div key={area} className="rounded-lg bg-muted/50 px-4 py-3 text-base font-medium">
                    <MapPin className="h-4 w-4 mx-auto mb-1 text-gray-200" />
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold">
                Ready to Transform Your Charlotte Painting Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
                Join 220+ Queen City contractors who quote faster, win more jobs, 
                and grow their revenue with PaintQuote Pro.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Start Your Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pricing Plans
                </Link>
              </div>
              <p className="mt-4 text-base opacity-100">
                No credit card required • 5 free quotes • Cancel anytime
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Charlotte Painting Contractors Choose PaintQuote Pro</h2>
                <div className="mt-6 space-y-4 text-gray-200">
                  <p>
                    Charlotte's painting market is unique. With over 700 painting contractors 
                    serving the Queen City, standing out requires more than just quality work. 
                    The contractors winning the most jobs are those who respond fastest with 
                    professional quotes.
                  </p>
                  <p>
                    PaintQuote Pro was designed specifically for markets like Charlotte where 
                    humidity and efficiency matter. Our AI understands Carolina's climate challenges, 
                    from 70% humidity that breeds mildew to the infamous yellow pollen season 
                    that can impact exterior paint jobs. The software automatically factors 
                    these into your quotes.
                  </p>
                  <p>
                    Whether you{'''}re quoting a bank tower in Uptown, a historic home in Dilworth, 
                    or a lakefront estate in Cornelius, PaintQuote Pro gives you the tools to 
                    create accurate, professional quotes in minutes. Join the 220+ Charlotte area 
                    contractors who{'''}ve already transformed their business with our software.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Save 3-5 Hours Per Quote
                    </h3>
                    <p className="mt-2 text-base text-gray-200">
                      Stop spending evenings creating quotes. Finish them on-site in minutes.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Win 40-60% More Jobs
                    </h3>
                    <p className="mt-2 text-base text-gray-200">
                      Fast, professional quotes dramatically increase your win rate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-lg font-semibold">PaintQuote Pro</h3>
                <p className="mt-4 text-base text-gray-200">
                  AI-powered quoting software for painting contractors. 
                  Quote in minutes, win more jobs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Charlotte Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/locations/charlotte" className="hover:text-foreground">Charlotte Overview</Link></li>
                  <li><Link href="/roi-calculator" className="hover:text-foreground">ROI Calculator</Link></li>
                  <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
                  <li><Link href="/pricing" className="hover:text-foreground">Pricing Plans</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Features</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li>AI Quote Generation</li>
                  <li>Mobile Estimating</li>
                  <li>Professional Templates</li>
                  <li>Analytics Dashboard</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Get Started</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/auth/signup" className="hover:text-foreground">Start Free Trial</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact Sales</Link></li>
                  <li><Link href="/support" className="hover:text-foreground">Support Center</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
              <p>&copy; 2025 PaintQuote Pro. Software for painting contractors.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}