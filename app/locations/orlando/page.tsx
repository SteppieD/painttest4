import Link from 'next/link'
import { Metadata } from 'next'
import { MapPin, Clock, Star, CheckCircle, Droplets, Sun, Home, Calculator, Zap, BarChart } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Quote Software for Orlando Contractors | PaintQuote Pro',
  description: 'AI-powered quoting software for Orlando painting contractors. Create professional quotes in 10-15 minutes instead of hours. Win more jobs in Central Florida. Free trial available.',
  keywords: 'painting quote software Orlando, Orlando contractor software, painting estimator Orlando FL, quote generator Orlando painters, contractor business software Orlando',
  openGraph: {
    title: 'PaintQuote Pro - Painting Quote Software for Orlando Contractors',
    description: 'Transform your Orlando painting business. Quote in minutes, not hours. Win 40-60% more jobs with professional estimates.',
    type: 'website',
    images: [{
      url: '/og-orlando-software.jpg',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro for Orlando Contractors'
    }]
  },
  alternates: {
    canonical: '/locations/orlando'
  }
}

const serviceAreas = [
  'Orlando', 'Winter Park', 'Kissimmee', 'Windermere', 'Lake Nona', 'Dr. Phillips',
  'Altamonte Springs', 'Maitland', 'Winter Garden', 'Oviedo', 'Sanford', 'Lake Mary',
  'Celebration', 'Winter Springs', 'Casselberry', 'Apopka'
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
    traditional: '20-25',
    withPaintQuote: '75-95',
    improvement: '4x more'
  },
  {
    metric: 'Win Rate',
    traditional: '22-28%',
    withPaintQuote: '42-58%',
    improvement: '+107% improvement'
  },
  {
    metric: 'Monthly Revenue',
    traditional: '$25,000',
    withPaintQuote: '$48,000',
    improvement: '+$23,000/month'
  }
]

export default function OrlandoPaintingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://paintquotepro.com/locations/orlando',
    name: 'PaintQuote Pro - Orlando Edition',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Orlando, FL'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '423',
      bestRating: '5'
    },
    featureList: [
      'AI-powered quote generation',
      'Orlando market pricing data',
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
              { label: 'Orlando' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Painting Quote Software for Orlando Contractors
                  </h1>
                  <p className="mt-6 text-xl text-gray-200">
                    Join 220+ Central Florida painting contractors who've transformed their business 
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
                      <p className="text-base text-gray-200">Orlando Contractors</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">$3.1M</div>
                      <p className="text-base text-gray-200">Quotes Generated</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.8/5</div>
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
                    <p className="text-xl font-bold">Central Florida</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Orlando Market Stats */}
          <section className="border-t py-16">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Orlando Painting Contractors Are Winning More Jobs</h2>
                <p className="mt-4 text-lg text-gray-200">
                  See how PaintQuote Pro transforms painting businesses in Central Florida
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

          {/* Orlando-Specific Features */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold">Built for Orlando's Unique Market</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Features designed specifically for Central Florida painting contractors
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <Droplets className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Humidity & Mold Calculations</h3>
                  <p className="mt-2 text-gray-200">
                    Built-in pricing for Orlando's 75% humidity. Automatically includes 
                    anti-microbial treatments, moisture barriers, and extended drying time 
                    calculations for Florida's tropical climate.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Sun className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Weather Window Scheduling</h3>
                  <p className="mt-2 text-gray-200">
                    Smart scheduling around Orlando's daily afternoon storms. Includes 
                    quick-dry product options and rain delay calculations to keep 
                    projects on track May through October.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Home className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Resort & HOA Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Pre-built quotes for theme park area resorts and 1,800+ HOA 
                    communities. Includes compliance requirements, bulk pricing, 
                    and guest accommodation scheduling.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Mobile-First Design</h3>
                  <p className="mt-2 text-gray-200">
                    Quote on-site from Lake Nona to Windermere. Works offline and 
                    syncs when connected. Perfect for Orlando's spread-out service 
                    areas from Apopka to Kissimmee.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Orlando Market Analytics</h3>
                  <p className="mt-2 text-gray-200">
                    Track win rates by neighborhood, see seasonal trends, and optimize 
                    pricing for different areas. Know exactly what works in Winter Park 
                    vs Celebration.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Professional Templates</h3>
                  <p className="mt-2 text-gray-200">
                    Stand out in Orlando's competitive market with professional quotes 
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
              <h2 className="text-center text-3xl font-bold">Orlando Contractors Love PaintQuote Pro</h2>
              
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Florida weather used to kill my productivity. Now I quote between 
                    rain storms and close deals before competitors even show up. Added 
                    $40,000 in revenue last quarter from faster quotes alone."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Miguel Santos</strong>
                    <p className="text-base text-gray-200">Santos Painting Solutions, Winter Park</p>
                  </footer>
                </div>

                <div className="rounded-lg bg-muted/50 p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "The HOA templates save me hours. I can quote entire communities with 
                    accurate bulk pricing instantly. Won 5 HOA contracts in Celebration 
                    this year - that{'''}s $220,000 in new business."
                  </blockquote>
                  <footer className="mt-4">
                    <strong>Jennifer Walsh</strong>
                    <p className="text-base text-gray-200">Central Florida Coatings, Lake Nona</p>
                  </footer>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-4">Join 220+ Orlando contractors using PaintQuote Pro</p>
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
                  Your Orlando Painting Business ROI
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
                          <span className="font-medium">25%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium">$3,500</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium">$19,250</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">With PaintQuote Pro</h3>
                      <ul className="space-y-3 text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-200">Quotes per month:</span>
                          <span className="font-medium text-primary">80</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Win rate:</span>
                          <span className="font-medium text-primary">45%</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Average job value:</span>
                          <span className="font-medium text-primary">$3,500</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-200">Monthly revenue:</span>
                          <span className="font-medium text-primary">$126,000</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 rounded-lg bg-green-50 dark:bg-green-950/20 p-6 text-center">
                    <p className="text-lg mb-2">Additional Monthly Revenue</p>
                    <p className="text-4xl font-bold text-green-600">+$106,750</p>
                    <p className="text-base text-gray-200 mt-2">
                      That's 2,220x return on your PaintQuote Pro investment
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
                <h2 className="text-3xl font-bold">Serving Painting Contractors Throughout Central Florida</h2>
                <p className="mt-4 text-lg text-gray-200">
                  Wherever you operate in the Orlando area, PaintQuote Pro helps you win more jobs
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
                Ready to Transform Your Orlando Painting Business?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-100">
                Join 220+ Central Florida contractors who quote faster, win more jobs, 
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
                <h2 className="text-2xl font-bold">Why Orlando Painting Contractors Choose PaintQuote Pro</h2>
                <div className="mt-6 space-y-4 text-gray-200">
                  <p>
                    Orlando's painting market is unique. With over 700 painting contractors 
                    serving Central Florida, standing out requires more than just quality work. 
                    The contractors winning the most jobs are those who respond fastest with 
                    professional quotes.
                  </p>
                  <p>
                    PaintQuote Pro was designed specifically for markets like Orlando where 
                    humidity and weather matter. Our AI understands Florida's climate challenges, 
                    from 75% average humidity that requires mold-resistant products to daily 
                    afternoon thunderstorms that can delay projects. The software automatically 
                    factors these into your quotes.
                  </p>
                  <p>
                    Whether you{'''}re quoting a resort near the theme parks, an HOA in Celebration, 
                    or a medical facility in Lake Nona, PaintQuote Pro gives you the tools to 
                    create accurate, professional quotes in minutes. Join the 220+ Orlando area 
                    contractors who{'''}ve already transformed their business with our software.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Save 4-6 Hours Per Quote
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
                <h3 className="text-lg font-semibold">Orlando Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/locations/orlando" className="hover:text-foreground">Orlando Overview</Link></li>
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