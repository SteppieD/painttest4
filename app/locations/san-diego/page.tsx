import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Clock, Star, CheckCircle, Waves, Sun, Home, Calculator, Zap, BarChart } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Quote Software for San Diego Contractors | PaintQuote Pro',
  description: 'AI-powered quoting software for San Diego painting contractors. Create professional quotes in 10-15 minutes instead of hours. Win more jobs in Americas Finest City. Free trial available.',
  keywords: 'painting quote software San Diego, San Diego contractor software, painting estimator San Diego CA, quote generator San Diego painters, contractor business software San Diego',
  openGraph: {
    title: 'PaintQuote Pro - Painting Quote Software for San Diego Contractors',
    description: 'Transform your San Diego painting business. Quote in minutes, not hours. Win 40-60% more jobs with professional estimates.',
    type: 'website',
    images: [{
      url: '/og-san-diego-software.jpg',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro for San Diego Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/san-diego'
  }
}

const serviceAreas = [
  'San Diego', 'La Jolla', 'Pacific Beach', 'Mission Beach', 'Point Loma', 'Coronado',
  'Del Mar', 'Carlsbad', 'Encinitas', 'Chula Vista', 'La Mesa', 'El Cajon',
  'Poway', 'Rancho Santa Fe', 'Solana Beach', 'Imperial Beach'
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
    traditional: '22-28',
    withPaintQuote: '85-105',
    improvement: '3.8x more'
  },
  {
    metric: 'Win Rate',
    traditional: '24-32%',
    withPaintQuote: '48-62%',
    improvement: '+94% improvement'
  },
  {
    metric: 'Monthly Revenue',
    traditional: '$28,000',
    withPaintQuote: '$52,000',
    improvement: '+$24,000/month'
  }
]

export default function SanDiegoPaintingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://paintquotepro.com/locations/san-diego',
    name: 'PaintQuote Pro - San Diego Edition',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      eligibleRegion: {
        '@type': 'Place',
        name: 'San Diego, CA'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '567',
      bestRating: '5'
    },
    featureList: [
      'AI-powered quote generation',
      'San Diego market pricing data',
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
              { label: 'San Diego' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Painting Quote Software for San Diego Contractors
                  </h1>
                  <p className="mt-6 text-xl text-gray-200">
                    Join 280+ San Diego County painting contractors who&apos;ve transformed their business 
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
                      <div className="text-2xl font-bold text-primary">280+</div>
                      <p className="text-base text-gray-200">SD Contractors</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$3.8M</div>
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
                    <p className="text-xl font-bold">San Diego County</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* San Diego Market Stats */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">San Diego Painting Contractors Are Winning More Jobs</h2>
                <p className="mt-4 text-lg text-gray-200">
                  See how PaintQuote Pro transforms painting businesses in Americas Finest City
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

          {/* San Diego-Specific Features */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Built for San Diego&apos;s Unique Market</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Features designed specifically for San Diego County painting contractors
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Waves className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Coastal Pricing Calculator</h3>
                  <p className="mt-2 text-gray-200">
                    Built-in calculations for coastal properties. Automatically adds salt-air 
                    protection, marine-grade primers, and moisture barriers for beachfront 
                    homes from La Jolla to Imperial Beach.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Perfect Weather Scheduling</h3>
                  <p className="mt-2 text-gray-200">
                    With 266 sunny days, scheduling is flexible but marine layer matters. 
                    Includes afternoon application recommendations and quick-dry options 
                    for morning moisture challenges.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Historic & HOA Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Pre-built quotes for Gaslamp Victorian restorations and 500+ HOA 
                    communities. Includes preservation requirements and approved color 
                    palettes for each neighborhood.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Mobile-First Design</h3>
                  <p className="mt-2 text-gray-200">
                    Quote on-site from Rancho Santa Fe to Chula Vista. Works offline 
                    and syncs when connected. Perfect for San Diego&apos;s sprawling county 
                    from coastal to inland communities.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">San Diego Market Analytics</h3>
                  <p className="mt-2 text-gray-200">
                    Track win rates by neighborhood, see seasonal trends, and optimize 
                    pricing for different areas. Know exactly what works in La Jolla 
                    vs El Cajon.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Professional Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Stand out in San Diego&apos;s competitive market with professional quotes 
                    that build trust. Include your California license, insurance details, 
                    and customer testimonials automatically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Success Stories */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">San Diego Contractors Love PaintQuote Pro</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    &quot;Living near the coast, my clients expect fast, accurate quotes. Now I 
                    quote beachfront properties in 15 minutes with all the marine-grade 
                    specifications included. Revenue up $50,000 this year alone."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>David Kim</strong>
                    <p className="text-base text-gray-200">Coastal Pro Painters, La Jolla</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    &quot;The historic templates are amazing for Gaslamp Quarter projects. I can 
                    include all preservation requirements instantly. Won 4 major Victorian 
                    restorations this year - that&apos;s $280,000 in new business."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Maria Rodriguez</strong>
                    <p className="text-sm text-gray-200">Heritage Painting Co, Downtown</p>
                  </footer>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-4">Join 280+ San Diego contractors using PaintQuote Pro</p>
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
                  Your San Diego Painting Business ROI
                </h2>
                
                <div className="rounded-lg bg-background p-8 shadow-lg">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-4">Current Situation</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium">25</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium">28%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium">$4,500</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium">$31,500</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">With PaintQuote Pro</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium text-primary">90</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium text-primary">55%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium text-primary">$4,500</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium text-primary">$222,750</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-lg bg-green-50 dark:bg-green-950/20 p-6 text-center">
                    <p className="text-lg mb-2">Additional Monthly Revenue</p>
                    <p className="text-4xl font-bold text-green-600">+$191,250</p>
                    <p className="text-base text-gray-200 mt-2">
                      That&apos;s 3,980x return on your PaintQuote Pro investment
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
                <h2 className="text-3xl font-bold">Serving Painting Contractors Throughout San Diego County</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Wherever you operate in the San Diego area, PaintQuote Pro helps you win more jobs
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
                Ready to Transform Your San Diego Painting Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
                Join 280+ San Diego County contractors who quote faster, win more jobs, 
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
                <h2 className="text-2xl font-bold">Why San Diego Painting Contractors Choose PaintQuote Pro</h2>
                <div className="mt-6 space-y-4 text-gray-200">
                  <p>
                    San Diego&apos;s painting market is unique. With over 800 painting contractors 
                    serving San Diego County, standing out requires more than just quality work. 
                    The contractors winning the most jobs are those who respond fastest with 
                    professional quotes.
                  </p>
                  <p>
                    PaintQuote Pro was designed specifically for markets like San Diego where 
                    coastal conditions matter. Our AI understands California&apos;s diverse climate 
                    challenges, from salt air corrosion that affects beachfront properties to 
                    marine layer moisture that can impact paint adhesion. The software 
                    automatically factors these into your quotes.
                  </p>
                  <p>
                    Whether you&apos;re quoting an oceanfront estate in La Jolla, a historic 
                    Victorian in the Gaslamp Quarter, or a sprawling ranch in Rancho Santa Fe, 
                    PaintQuote Pro gives you the tools to create accurate, professional quotes 
                    in minutes. Join the 280+ San Diego area contractors who&apos;ve already 
                    transformed their business with our software.
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
                <h3 className="text-lg font-semibold">San Diego Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/locations/san-diego" className="hover:text-foreground">San Diego Overview</Link></li>
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