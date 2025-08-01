import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Clock, Star, CheckCircle, Sun, Sparkles, Building2, Calculator, Zap, BarChart } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Quote Software for Las Vegas Contractors | PaintQuote Pro',
  description: 'AI-powered quoting software for Las Vegas painting contractors. Create professional quotes in 10-15 minutes instead of hours. Win more jobs in Entertainment Capital. Free trial available.',
  keywords: 'painting quote software Las Vegas, Las Vegas contractor software, painting estimator Las Vegas NV, quote generator Las Vegas painters, contractor business software Las Vegas',
  openGraph: {
    title: 'PaintQuote Pro - Painting Quote Software for Las Vegas Contractors',
    description: 'Transform your Las Vegas painting business. Quote in minutes, not hours. Win 40-60% more jobs with professional estimates.',
    type: 'website',
    images: [{
      url: '/og-las-vegas-software.jpg',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro for Las Vegas Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/las-vegas'
  }
}

const serviceAreas = [
  'Las Vegas', 'Henderson', 'North Las Vegas', 'Summerlin', 'Paradise', 'Spring Valley',
  'Enterprise', 'Sunrise Manor', 'Whitney', 'Winchester', 'Blue Diamond', 'Boulder City',
  'Anthem', 'Green Valley', 'Mountains Edge', 'Rhodes Ranch'
]

const localContractorStats = [
  {
    metric: 'Average Quote Time',
    traditional: '4-6 hours',
    withPaintQuote: '10-15 minutes',
    improvement: '96% faster'
  },
  {
    metric: 'Monthly Quotes',
    traditional: '18-24',
    withPaintQuote: '75-95',
    improvement: '4.2x more'
  },
  {
    metric: 'Win Rate',
    traditional: '22-28%',
    withPaintQuote: '45-60%',
    improvement: '+114% improvement'
  },
  {
    metric: 'Monthly Revenue',
    traditional: '$32,000',
    withPaintQuote: '$61,000',
    improvement: '+$29,000/month'
  }
]

export default function LasVegasPaintingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://paintquotepro.com/locations/las-vegas',
    name: 'PaintQuote Pro - Las Vegas Edition',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Las Vegas, NV'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '523',
      bestRating: '5'
    },
    featureList: [
      'AI-powered quote generation',
      'Las Vegas market pricing data',
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
              { label: 'Las Vegas' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Painting Quote Software for Las Vegas Contractors
                  </h1>
                  <p className="mt-6 text-xl text-gray-200">
                    Join 260+ Las Vegas Valley painting contractors who've transformed their business 
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
                      <div className="text-2xl font-bold text-primary">260+</div>
                      <p className="text-base text-gray-200">Vegas Contractors</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$3.5M</div>
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
                    <p className="text-xl font-bold">Las Vegas Valley</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Las Vegas Market Stats */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Las Vegas Painting Contractors Are Winning More Jobs</h2>
                <p className="mt-4 text-lg text-gray-200">
                  See how PaintQuote Pro transforms painting businesses in the Entertainment Capital
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

          {/* Las Vegas-Specific Features */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Built for Las Vegas's Unique Market</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Features designed specifically for Nevada painting contractors
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Desert Climate Pricing</h3>
                  <p className="mt-2 text-gray-200">
                    Built-in calculations for Vegas's extreme heat. Automatically includes 
                    heat-reflective coatings, UV protection, and dust-resistant finishes 
                    to handle 115°F+ summers and sandstorms.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Building2 className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">24/7 Commercial Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Pre-built quotes for casinos, hotels, and retail. Includes night-work 
                    pricing, low-odor product options, and fast-dry formulas for businesses 
                    that never close.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sparkles className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Luxury Property Specs</h3>
                  <p className="mt-2 text-gray-200">
                    Templates for high-end homes in Summerlin and The Ridges. Includes 
                    premium finish options, custom color matching, and detailed specifications 
                    Vegas luxury buyers expect.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Mobile-First Design</h3>
                  <p className="mt-2 text-gray-200">
                    Quote on-site from the Strip to Henderson. Works offline and syncs 
                    when connected. Perfect for Vegas's sprawling valley from Summerlin 
                    to Green Valley.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Vegas Market Analytics</h3>
                  <p className="mt-2 text-gray-200">
                    Track win rates by neighborhood, see seasonal trends, and optimize 
                    pricing for different areas. Know exactly what works on the Strip 
                    vs residential communities.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Professional Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Stand out in Vegas's competitive market with professional quotes 
                    that build trust. Include your Nevada license, insurance details, 
                    and customer testimonials automatically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Success Stories */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Las Vegas Contractors Love PaintQuote Pro</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Vegas never sleeps and neither does my business. Now I quote casino 
                    projects at 2 AM and have them signed by morning. Added $75,000 in 
                    commercial contracts this quarter alone."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Michael Rodriguez</strong>
                    <p className="text-base text-gray-200">Vegas Pro Painters, Downtown</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "The desert climate templates are game-changing. Every quote includes 
                    heat-reflective options automatically. Won 4 HOA contracts in Summerlin 
                    - that&apos;s $310,000 in guaranteed work."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Sandra Kim</strong>
                    <p className="text-base text-gray-200">Desert Shield Painting, Henderson</p>
                  </footer>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-4">Join 260+ Vegas contractors using PaintQuote Pro</p>
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
                  Your Las Vegas Painting Business ROI
                </h2>
                
                <div className="rounded-lg bg-background p-8 shadow-lg">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-4">Current Situation</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium">20</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium">25%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium">$6,400</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium">$32,000</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">With PaintQuote Pro</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium text-primary">85</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium text-primary">50%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium text-primary">$6,400</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium text-primary">$272,000</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-lg bg-green-50 dark:bg-green-950/20 p-6 text-center">
                    <p className="text-lg mb-2">Additional Monthly Revenue</p>
                    <p className="text-4xl font-bold text-green-600">+$240,000</p>
                    <p className="text-base text-gray-200 mt-2">
                      That's 5,000x return on your PaintQuote Pro investment
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
                <h2 className="text-3xl font-bold">Serving Painting Contractors Throughout Las Vegas Valley</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Wherever you operate in the Vegas area, PaintQuote Pro helps you win more jobs
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
                Ready to Transform Your Las Vegas Painting Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
                Join 260+ Las Vegas Valley contractors who quote faster, win more jobs, 
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
                <h2 className="text-2xl font-bold">Why Las Vegas Painting Contractors Choose PaintQuote Pro</h2>
                <div className="mt-6 space-y-4 text-gray-200">
                  <p>
                    Las Vegas's painting market is unique. With over 750 painting contractors 
                    serving the Las Vegas Valley, standing out requires more than just quality work. 
                    The contractors winning the most jobs are those who respond fastest with 
                    professional quotes.
                  </p>
                  <p>
                    PaintQuote Pro was designed specifically for markets like Las Vegas where 
                    extreme conditions and 24/7 operations matter. Our AI understands Nevada's 
                    desert challenges, from 115°F heat that can blister standard paint to 
                    sandstorms that require special protective coatings. The software 
                    automatically factors these into your quotes.
                  </p>
                  <p>
                    Whether you&apos;re quoting a casino on the Strip, a luxury home in Summerlin, 
                    or an HOA in Henderson, PaintQuote Pro gives you the tools to create 
                    accurate, professional quotes in minutes. Join the 260+ Las Vegas area 
                    contractors who&apos;ve already transformed their business with our software.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Save 4-6 Hours Per Quote
                    </h3>
                    <p className="mt-2 text-base text-gray-200">
                      Stop spending nights creating quotes. Finish them on-site in minutes.
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
                <h3 className="text-lg font-semibold">Las Vegas Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/locations/las-vegas" className="hover:text-foreground">Las Vegas Overview</Link></li>
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