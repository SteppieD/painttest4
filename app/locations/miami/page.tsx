import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Clock, Star, CheckCircle, Waves, Sun, Building2, Calculator, Zap, BarChart } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Quote Software for Miami Contractors | PaintQuote Pro',
  description: 'AI-powered quoting software for Miami painting contractors. Create professional quotes in 10-15 minutes instead of hours. Win more jobs in the Magic City. Free forever plan available.',
  keywords: 'painting quote software Miami, Miami contractor software, painting estimator Miami FL, quote generator Miami painters, contractor business software Miami',
  openGraph: {
    title: 'PaintQuote Pro - Painting Quote Software for Miami Contractors',
    description: 'Transform your Miami painting business. Quote in minutes, not hours. Win 40-60% more jobs with professional estimates.',
    type: 'website',
    images: [{
      url: '/og-miami-software.jpg',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro for Miami Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/miami'
  }
}

const serviceAreas = [
  'Miami', 'Miami Beach', 'Coral Gables', 'Coconut Grove', 'Key Biscayne', 'Aventura',
  'Brickell', 'Downtown Miami', 'Wynwood', 'Design District', 'Doral', 'Kendall',
  'Homestead', 'Pinecrest', 'Palmetto Bay', 'Cutler Bay'
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
    traditional: '19-25',
    withPaintQuote: '85-105',
    improvement: '4.3x more'
  },
  {
    metric: 'Win Rate',
    traditional: '20-26%',
    withPaintQuote: '48-63%',
    improvement: '+135% improvement'
  },
  {
    metric: 'Monthly Revenue',
    traditional: '$28,000',
    withPaintQuote: '$58,000',
    improvement: '+$30,000/month'
  }
]

export default function MiamiPaintingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://paintquotepro.com/locations/miami',
    name: 'PaintQuote Pro - Miami Edition',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Miami, FL'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '520',
      bestRating: '5'
    },
    featureList: [
      'AI-powered quote generation',
      'Miami market pricing data',
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
              { label: 'Miami' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Painting Quote Software for Miami Contractors
                  </h1>
                  <p className="mt-6 text-xl text-gray-200">
                    Join 280+ Magic City painting contractors who&apos;ve transformed their business 
                    with AI-powered quotes. Quote jobs in 10-15 minutes instead of hours and 
                    win 40-60% more projects.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Get Started Free
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
                      <p className="text-base text-gray-200">Miami Contractors</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$3.4M</div>
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
                    <p className="text-xl font-bold">Greater Miami</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Miami Market Stats */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Miami Painting Contractors Are Winning More Jobs</h2>
                <p className="mt-4 text-lg text-gray-200">
                  See how PaintQuote Pro transforms painting businesses in the Magic City
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

          {/* Miami-Specific Features */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Built for Miami&apos;s Unique Market</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Features designed specifically for Magic City painting contractors
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Waves className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Hurricane-Grade Pricing</h3>
                  <p className="mt-2 text-gray-200">
                    Built-in calculations for Category 5 hurricane protection. Automatically includes 
                    Miami-Dade approved products, storm-rated adhesion, and 180+ mph wind resistance 
                    coatings for maximum storm protection.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Tropical Climate Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Pre-built quotes for Miami&apos;s tropical conditions. Includes UV-resistant 
                    formulas, salt-air protection, and heat-reflective technology to handle 
                    year-round 85°F heat and ocean exposure.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Building2 className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Art Deco & High-Rise Specs</h3>
                  <p className="mt-2 text-gray-200">
                    Templates for Miami&apos;s unique architecture. Includes historic preservation 
                    requirements for South Beach, high-rise safety protocols for Brickell, 
                    and luxury finishes for waterfront properties.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Mobile-First Design</h3>
                  <p className="mt-2 text-gray-200">
                    Quote on-site from Key Biscayne to Aventura. Works offline and syncs 
                    when connected. Perfect for Miami&apos;s sprawling metro area from 
                    Homestead to Doral.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Miami Market Analytics</h3>
                  <p className="mt-2 text-gray-200">
                    Track win rates by neighborhood, see seasonal trends, and optimize 
                    pricing for different areas. Know exactly what works in Coral Gables 
                    vs Wynwood.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Professional Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Stand out in Miami&apos;s competitive market with professional quotes 
                    that build trust. Include your Florida license, insurance details, 
                    and customer testimonials automatically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Local Success Stories */}
          <section className="py-16 md:py-24">
            <div className="container">
              <h2 className="text-center text-3xl font-bold">Miami Contractors Love PaintQuote Pro</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    &quot;After Hurricane Irma, everyone needed hurricane-grade repainting. With 
                    Miami-Dade approved templates built-in, I quoted 50 oceanfront condos 
                    in a week. Closed $320,000 in storm-resistant coating work."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Carlos Rodriguez</strong>
                    <p className="text-base text-gray-200">Miami Beach Pro Painting, South Beach</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    &quot;The Art Deco templates are perfect for Ocean Drive projects. Every quote 
                    includes proper historic preservation specs automatically. Won 8 boutique 
                    hotels this year - that&apos;s $425,000 in heritage work."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Isabella Fernandez</strong>
                    <p className="text-base text-gray-200">Tropical Elite Coatings, Coral Gables</p>
                  </footer>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-4">Join 280+ Miami contractors using PaintQuote Pro</p>
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
                  Your Miami Painting Business ROI
                </h2>
                
                <div className="rounded-lg bg-background p-8 shadow-lg">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-4">Current Situation</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium">22</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium">23%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium">$5,500</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium">$27,830</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">With PaintQuote Pro</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium text-primary">95</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium text-primary">55%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium text-primary">$5,500</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium text-primary">$287,375</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-lg bg-green-50 dark:bg-green-950/20 p-6 text-center">
                    <p className="text-lg mb-2">Additional Monthly Revenue</p>
                    <p className="text-4xl font-bold text-green-600">+$259,545</p>
                    <p className="text-base text-gray-200 mt-2">
                      That&apos;s 5,407x return on your PaintQuote Pro investment
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
                <h2 className="text-3xl font-bold">Serving Painting Contractors Throughout Greater Miami</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Wherever you operate in the Miami area, PaintQuote Pro helps you win more jobs
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
                Ready to Transform Your Miami Painting Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
                Join 280+ Magic City contractors who quote faster, win more jobs, 
                and grow their revenue with PaintQuote Pro.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  Get Started Free Today
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
                <h2 className="text-2xl font-bold">Why Miami Painting Contractors Choose PaintQuote Pro</h2>
                <div className="mt-6 space-y-4 text-gray-200">
                  <p>
                    Miami&apos;s painting market is unique. With over 900 painting contractors 
                    serving Greater Miami, standing out requires more than just quality work. 
                    The contractors winning the most jobs are those who respond fastest with 
                    professional quotes.
                  </p>
                  <p>
                    PaintQuote Pro was designed specifically for markets like Miami where 
                    tropical conditions and efficiency matter. Our AI understands Florida&apos;s 
                    challenges, from Category 5 hurricanes that test every coating to salt air 
                    corrosion and year-round UV exposure that can destroy inferior paints. 
                    The software automatically factors these into your quotes.
                  </p>
                  <p>
                    Whether you&apos;re quoting a luxury condo in Brickell, an Art Deco restoration 
                    on Ocean Drive, or a waterfront estate in Key Biscayne, PaintQuote Pro gives 
                    you the tools to create accurate, professional quotes in minutes. Join the 
                    280+ Miami area contractors who&apos;ve already transformed their business with 
                    our software.
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
                <h3 className="text-lg font-semibold">Miami Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/locations/miami" className="hover:text-foreground">Miami Overview</Link></li>
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
                  <li><Link href="/auth/signup" className="hover:text-foreground">Get Started Free</Link></li>
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