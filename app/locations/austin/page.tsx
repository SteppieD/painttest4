import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Clock, Star, CheckCircle, Music, Building, Home, Calculator, Zap, BarChart } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Quote Software for Austin Contractors | PaintQuote Pro',
  description: 'AI-powered quoting software for Austin painting contractors. Create professional quotes in 10-15 minutes instead of hours. Win more jobs in the Live Music Capital. Free trial available.',
  keywords: 'painting quote software Austin, Austin contractor software, painting estimator Austin TX, quote generator Austin painters, contractor business software Austin',
  openGraph: {
    title: 'PaintQuote Pro - Painting Quote Software for Austin Contractors',
    description: 'Transform your Austin painting business. Quote in minutes, not hours. Win 40-60% more jobs with professional estimates.',
    type: 'website',
    images: [{
      url: '/og-austin-software.jpg',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro for Austin Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/austin'
  }
}

const serviceAreas = [
  'Austin', 'Round Rock', 'Cedar Park', 'Georgetown', 'Pflugerville', 'Leander',
  'Kyle', 'Buda', 'Manor', 'Hutto', 'Lakeway', 'Bee Cave',
  'West Lake Hills', 'Dripping Springs', 'Cedar Creek', 'Del Valle'
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
    withPaintQuote: '80-100',
    improvement: '3.6x more'
  },
  {
    metric: 'Win Rate',
    traditional: '23-30%',
    withPaintQuote: '47-62%',
    improvement: '+107% improvement'
  },
  {
    metric: 'Monthly Revenue',
    traditional: '$26,000',
    withPaintQuote: '$49,000',
    improvement: '+$23,000/month'
  }
]

export default function AustinPaintingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://paintquotepro.com/locations/austin',
    name: 'PaintQuote Pro - Austin Edition',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Austin, TX'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '387',
      bestRating: '5'
    },
    featureList: [
      'AI-powered quote generation',
      'Austin market pricing data',
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
              { label: 'Austin' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Painting Quote Software for Austin Contractors
                  </h1>
                  <p className="mt-6 text-xl text-muted-foreground">
                    Join 210+ Austin area painting contractors who've transformed their business 
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
                      <div className="text-2xl font-bold text-primary">210+</div>
                      <p className="text-sm text-muted-foreground">Austin Contractors</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$2.8M</div>
                      <p className="text-sm text-muted-foreground">Quotes Generated</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <p className="text-sm text-muted-foreground">User Rating</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                    <div className="flex h-full items-center justify-center">
                      <Calculator className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
                    <p className="text-sm font-medium">Trusted by contractors in</p>
                    <p className="text-xl font-bold">Greater Austin</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Austin Market Stats */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Austin Painting Contractors Are Winning More Jobs</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  See how PaintQuote Pro transforms painting businesses in the Live Music Capital
                </p>
              </div>
              
              <div className="mt-12 overflow-hidden rounded-lg border">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium">Metric</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Traditional Method</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">With PaintQuote Pro</th>
                      <th className="px-6 py-4 text-left text-sm font-medium">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {localContractorStats.map((stat, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 font-medium">{stat.metric}</td>
                        <td className="px-6 py-4 text-muted-foreground">{stat.traditional}</td>
                        <td className="px-6 py-4 font-semibold text-primary">{stat.withPaintQuote}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">{stat.improvement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Austin-Specific Features */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Built for Austin's Unique Market</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Features designed specifically for Central Texas painting contractors
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Music className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Tech Hub Pricing</h3>
                  <p className="mt-2 text-muted-foreground">
                    Built-in pricing for Austin's booming tech sector. Includes templates 
                    for modern offices, startup spaces, and high-end residential properties 
                    in areas like Domain and Downtown.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Building className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">New Construction Templates</h3>
                  <p className="mt-2 text-muted-foreground">
                    With Austin's rapid growth, quote new builds quickly. Pre-loaded 
                    templates for tract homes, custom builds, and multi-family developments 
                    throughout Travis and Williamson counties.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Historic & Modern Mix</h3>
                  <p className="mt-2 text-muted-foreground">
                    Templates for both historic homes in Hyde Park and modern builds 
                    in Mueller. Includes preservation requirements and contemporary 
                    finish options popular in Austin.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Mobile-First Design</h3>
                  <p className="mt-2 text-muted-foreground">
                    Quote on-site from Lakeway to Manor. Works offline and syncs 
                    when connected. Perfect for Austin's growing metro area from 
                    Cedar Park to Buda.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Austin Market Analytics</h3>
                  <p className="mt-2 text-muted-foreground">
                    Track win rates by neighborhood, see seasonal trends, and optimize 
                    pricing for different areas. Know exactly what works in West Lake 
                    vs East Austin.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Professional Templates</h3>
                  <p className="mt-2 text-muted-foreground">
                    Stand out in Austin's competitive market with professional quotes 
                    that build trust. Include your Texas license, insurance details, 
                    and customer testimonials automatically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Success Stories */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Austin Contractors Love PaintQuote Pro</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Austin's growth means competition. Now I can quote tech office 
                    repaints in 15 minutes with all the right specs. Closed $65,000 
                    in Domain area projects last quarter from faster quotes."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>James Wilson</strong>
                    <p className="text-sm text-muted-foreground">ATX Pro Painters, North Austin</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "The new construction templates are perfect for Austin's building boom. 
                    I can quote entire subdivisions accurately. Won 3 major builder contracts 
                    in Round Rock - that's $240,000 in steady work."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Sarah Chen</strong>
                    <p className="text-sm text-muted-foreground">Lone Star Painting, Cedar Park</p>
                  </footer>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-4">Join 210+ Austin contractors using PaintQuote Pro</p>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
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
                  Your Austin Painting Business ROI
                </h2>
                
                <div className="rounded-lg bg-background p-8 shadow-lg">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-4">Current Situation</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Quotes per month:</span>
                          <span className="font-medium">25</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Win rate:</span>
                          <span className="font-medium">26%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Average job value:</span>
                          <span className="font-medium">$4,000</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Monthly revenue:</span>
                          <span className="font-medium">$26,000</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">With PaintQuote Pro</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Quotes per month:</span>
                          <span className="font-medium text-primary">85</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Win rate:</span>
                          <span className="font-medium text-primary">52%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Average job value:</span>
                          <span className="font-medium text-primary">$4,000</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Monthly revenue:</span>
                          <span className="font-medium text-primary">$176,800</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-lg bg-green-50 dark:bg-green-950/20 p-6 text-center">
                    <p className="text-lg mb-2">Additional Monthly Revenue</p>
                    <p className="text-4xl font-bold text-green-600">+$150,800</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      That's 3,141x return on your PaintQuote Pro investment
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
                <h2 className="text-3xl font-bold">Serving Painting Contractors Throughout Greater Austin</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Wherever you operate in the Austin area, PaintQuote Pro helps you win more jobs
                </p>
              </div>
              
              <div className="mt-12 grid gap-2 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {serviceAreas.map((area) => (
                  <div key={area} className="rounded-lg bg-muted/50 px-4 py-3 text-sm font-medium">
                    <MapPin className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
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
                Ready to Transform Your Austin Painting Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Join 210+ Austin area contractors who quote faster, win more jobs, 
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
              <p className="mt-4 text-sm opacity-75">
                No credit card required • 5 free quotes • Cancel anytime
              </p>
            </div>
          </section>

          {/* Local SEO Content */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold">Why Austin Painting Contractors Choose PaintQuote Pro</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Austin's painting market is unique. With over 650 painting contractors 
                    serving the Greater Austin area, standing out requires more than just quality work. 
                    The contractors winning the most jobs are those who respond fastest with 
                    professional quotes.
                  </p>
                  <p>
                    PaintQuote Pro was designed specifically for markets like Austin where 
                    growth and efficiency matter. Our AI understands Texas market dynamics, 
                    from new construction pricing in rapidly growing suburbs to historic 
                    preservation requirements in established neighborhoods. The software 
                    automatically factors these into your quotes.
                  </p>
                  <p>
                    Whether you're quoting a tech office in the Domain, a historic home in 
                    Hyde Park, or a new subdivision in Round Rock, PaintQuote Pro gives you 
                    the tools to create accurate, professional quotes in minutes. Join the 
                    210+ Austin area contractors who've already transformed their business 
                    with our software.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Save 3-5 Hours Per Quote
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Stop spending evenings creating quotes. Finish them on-site in minutes.
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Win 40-60% More Jobs
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
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
                <p className="mt-4 text-sm text-muted-foreground">
                  AI-powered quoting software for painting contractors. 
                  Quote in minutes, win more jobs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Austin Resources</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/locations/austin" className="hover:text-foreground">Austin Overview</Link></li>
                  <li><Link href="/roi-calculator" className="hover:text-foreground">ROI Calculator</Link></li>
                  <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
                  <li><Link href="/pricing" className="hover:text-foreground">Pricing Plans</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Features</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>AI Quote Generation</li>
                  <li>Mobile Estimating</li>
                  <li>Professional Templates</li>
                  <li>Analytics Dashboard</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Get Started</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/auth/signup" className="hover:text-foreground">Start Free Trial</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact Sales</Link></li>
                  <li><Link href="/support" className="hover:text-foreground">Support Center</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro. Software for painting contractors.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}