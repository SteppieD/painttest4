import Link from 'next/link'
import { Metadata } from 'next'
import { CheckCircle, TrendingUp, Clock, Calculator, Shield, Users, BarChart, MessageSquare } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import ModernNavigation from '@/components/modern-navigation'

export const metadata: Metadata = {
  title: 'Painting Contractors Software | #1 Quote & Estimate Tool | PaintQuote Pro',
  description: 'Professional painting contractors software with AI-powered quoting. Create accurate estimates in minutes, win more jobs, and grow your painting business. Try free.',
  keywords: 'painting contractors, painting contractor software, painting business software, contractor estimating software, painting quote software, painting estimate tool',
  openGraph: {
    title: 'Painting Contractors Software - Professional Quoting & Estimating',
    description: 'The #1 software for painting contractors. AI-powered quotes, accurate estimates, and business management tools.',
    type: 'website',
  },
}

export default function PaintingContractors() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PaintQuote Pro',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      name: 'Free Trial',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2847',
      bestRating: '5',
      worstRating: '1',
    },
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
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Painting Contractors Software' }
            ]}
            className="container"
          />
          
          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                  Painting Contractors Software That Grows Your Business
                </h1>
                <p className="mt-6 text-xl text-gray-300">
                  Join 2,847+ painting contractors using PaintQuote Pro to create professional quotes 
                  in minutes, win more jobs, and increase profits by 40%.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/trial-signup"
                    className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-base font-medium text-white shadow-lg"
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center rounded-md glass-card border-white/20 px-8 py-3 text-base font-medium text-white hover:bg-white/10"
                  >
                    Watch Demo
                  </Link>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  No credit card required • 5 free quotes per month • Setup in 5 minutes
                </p>
              </div>
            </div>
          </section>

          {/* Social Proof Bar */}
          <section className="border-y border-white/10 bg-white/5 py-8">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 text-center md:grid-cols-4">
                <div>
                  <div className="text-3xl font-bold text-blue-400">2,847+</div>
                  <p className="text-sm text-gray-400">Active Contractors</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">186K</div>
                  <p className="text-sm text-gray-400">Quotes Created</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">87%</div>
                  <p className="text-sm text-gray-400">Time Saved</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">4.8/5</div>
                  <p className="text-sm text-gray-400">Average Rating</p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem/Solution Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Why Painting Contractors Choose PaintQuote Pro
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Stop losing jobs to faster competitors. Our AI-powered software helps painting 
                  contractors create accurate quotes 10x faster while ensuring profitable pricing.
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-2">
                {/* Problems */}
                <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-8">
                  <h3 className="text-xl font-semibold">Without PaintQuote Pro</h3>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start">
                      <span className="mr-3 text-destructive">✗</span>
                      <span>Spend 2-3 hours creating each quote manually</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-destructive">✗</span>
                      <span>Lose jobs to competitors who respond faster</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-destructive">✗</span>
                      <span>Pricing errors cost you $3-5K monthly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-destructive">✗</span>
                      <span>Inconsistent quotes confuse customers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-destructive">✗</span>
                      <span>No visibility into job profitability</span>
                    </li>
                  </ul>
                </div>

                {/* Solutions */}
                <div className="rounded-lg border border-primary/50 bg-primary/5 p-8">
                  <h3 className="text-xl font-semibold">With PaintQuote Pro</h3>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Create professional quotes in 15 minutes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Quote on-site and close deals immediately</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Accurate pricing ensures 15-30% profit margins</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Professional quotes win 40% more jobs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Analytics show exactly what's profitable</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Features for Painting Contractors */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Built Specifically for Painting Contractors
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Every feature designed to help painting contractors work smarter, not harder
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <MessageSquare className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">AI Quote Assistant</h3>
                  <p className="mt-2 text-muted-foreground">
                    Chat naturally about the job and our AI extracts all details. No more complex 
                    forms or missing information.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>• Understands painting terminology</li>
                    <li>• Captures all job specifications</li>
                    <li>• Suggests optimal pricing</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Calculator className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Smart Charge Rates</h3>
                  <p className="mt-2 text-muted-foreground">
                    Set your rates once, quote consistently forever. Automatic labor calculations 
                    ensure profitable pricing.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>• Interior & exterior rates</li>
                    <li>• Surface-specific pricing</li>
                    <li>• 30% labor calculation</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Clock className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Instant Professional Quotes</h3>
                  <p className="mt-2 text-muted-foreground">
                    Generate branded PDF quotes in seconds. Send directly to clients or print 
                    on-site for immediate signatures.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>• Custom branding</li>
                    <li>• Digital signatures</li>
                    <li>• Email automation</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <BarChart className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Business Analytics</h3>
                  <p className="mt-2 text-muted-foreground">
                    See which jobs make money and which don't. Track conversion rates, revenue 
                    trends, and customer patterns.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>• Profit margin analysis</li>
                    <li>• Job type performance</li>
                    <li>• Seasonal trends</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Customer Management</h3>
                  <p className="mt-2 text-muted-foreground">
                    Keep track of all customers, quotes, and job history. Never lose a lead or 
                    forget to follow up again.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>• Customer database</li>
                    <li>• Quote history</li>
                    <li>• Follow-up reminders</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Reliable & Secure</h3>
                  <p className="mt-2 text-muted-foreground">
                    Bank-level security protects your data. Automatic backups ensure you never 
                    lose important information.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>• SSL encryption</li>
                    <li>• Daily backups</li>
                    <li>• 99.9% uptime</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Success Story */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <div className="rounded-lg bg-primary/5 p-8 md:p-12">
                  <h2 className="text-3xl font-bold">Real Results for Painting Contractors</h2>
                  
                  <blockquote className="mt-8 border-l-4 border-primary pl-6">
                    <p className="text-xl italic">
                      "PaintQuote Pro transformed our painting business. We went from spending hours 
                      on quotes to creating them in 15 minutes. Our close rate increased by 40% and 
                      we're now doing $126K monthly, up from $80K."
                    </p>
                    <footer className="mt-4">
                      <strong>Mike Rodriguez</strong>
                      <span className="text-muted-foreground"> • Rodriguez Painting LLC, Phoenix AZ</span>
                    </footer>
                  </blockquote>

                  <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    <div>
                      <TrendingUp className="h-8 w-8 text-primary" />
                      <p className="mt-2 text-2xl font-bold">58%</p>
                      <p className="text-sm text-muted-foreground">Revenue increase</p>
                    </div>
                    <div>
                      <Clock className="h-8 w-8 text-primary" />
                      <p className="mt-2 text-2xl font-bold">91%</p>
                      <p className="text-sm text-muted-foreground">Time saved</p>
                    </div>
                    <div>
                      <Users className="h-8 w-8 text-primary" />
                      <p className="mt-2 text-2xl font-bold">2.5x</p>
                      <p className="text-sm text-muted-foreground">More quotes</p>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      Read more success stories →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Preview */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Pricing for Every Painting Contractor
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Start free and upgrade as you grow. No hidden fees, no contracts.
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="text-xl font-semibold">Free</h3>
                  <p className="mt-2 text-3xl font-bold">$0<span className="text-base font-normal">/mo</span></p>
                  <p className="mt-2 text-sm text-muted-foreground">Perfect for getting started</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li>1 quote per month</li>
                    <li>Basic features</li>
                    <li>Email support</li>
                  </ul>
                </div>

                <div className="rounded-lg border-2 border-primary bg-background p-6 text-center">
                  <div className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                    Most Popular
                  </div>
                  <h3 className="text-xl font-semibold">Professional</h3>
                  <p className="mt-2 text-3xl font-bold">$49<span className="text-base font-normal">/mo</span></p>
                  <p className="mt-2 text-sm text-muted-foreground">For growing contractors</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li>Unlimited quotes</li>
                    <li>AI assistant</li>
                    <li>Analytics & reports</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="text-xl font-semibold">Business</h3>
                  <p className="mt-2 text-3xl font-bold">$99<span className="text-base font-normal">/mo</span></p>
                  <p className="mt-2 text-sm text-muted-foreground">For established businesses</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li>Everything in Pro</li>
                    <li>API access</li>
                    <li>Priority support</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/pricing"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  View full pricing details →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                  Common Questions from Painting Contractors
                </h2>
                
                <div className="mt-12 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold">
                      How does PaintQuote Pro help painting contractors specifically?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      PaintQuote Pro is built exclusively for painting contractors. Our AI understands 
                      painting terminology, our pricing uses industry-standard charge rates, and every 
                      feature is designed around how painting contractors actually work. From interior 
                      walls to exterior siding, we handle all painting project types.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      How long does it take to create a quote?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Most painting contractors create detailed quotes in 10-15 minutes using our AI 
                      chat interface. Simply describe the job in natural language, review the extracted 
                      details, and generate a professional PDF. Compare that to 2-3 hours doing it manually!
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Can I use my own pricing and charge rates?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Absolutely! Set your own charge rates for each surface type (walls, ceilings, trim, 
                      etc.) and the system automatically calculates totals including the 30% labor component. 
                      You maintain full control over your pricing strategy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Does it work for both residential and commercial painting?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Yes! PaintQuote Pro handles all types of painting projects. Whether you're quoting 
                      a single room repaint or a multi-building commercial project, our software scales 
                      to meet your needs with appropriate pricing and scope management.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      What about customer management and follow-ups?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Every quote is saved with full customer information. Track quote status, set follow-up 
                      reminders, and see complete history for each customer. Never lose track of a potential 
                      job again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground md:py-24">
            <div className="container text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Join 2,847+ Painting Contractors Growing with PaintQuote Pro
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
                Start creating professional quotes in minutes, not hours. Win more jobs and 
                increase your profits with the #1 software for painting contractors.
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
                  Book a Demo
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                No credit card required • Free quote every month • Cancel anytime
              </p>
            </div>
          </section>

          {/* Related Pages */}
          <section className="py-16">
            <div className="container">
              <h2 className="text-center text-2xl font-bold">Explore More Resources</h2>
              <div className="mt-8 grid gap-4 text-center md:grid-cols-4">
                <Link href="/painting-estimate-software" className="text-primary hover:underline">
                  Estimate Software
                </Link>
                <Link href="/painting-estimating-software" className="text-primary hover:underline">
                  Estimating Tools
                </Link>
                <Link href="/paint-contractor-app" className="text-primary hover:underline">
                  Mobile App
                </Link>
                <Link href="/painting-business-software" className="text-primary hover:underline">
                  Business Software
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-lg font-semibold">Product</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/features" className="hover:text-foreground">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                  <li><Link href="/painting-estimate-calculator-free" className="hover:text-foreground">Free Calculator</Link></li>
                  <li><Link href="/painting-quote-templates" className="hover:text-foreground">Templates</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Solutions</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/painting-contractors" className="hover:text-foreground">For Contractors</Link></li>
                  <li><Link href="/commercial-painting-estimating-software" className="hover:text-foreground">Commercial</Link></li>
                  <li><Link href="/mobile-painting-estimate-app" className="hover:text-foreground">Mobile App</Link></li>
                  <li><Link href="/painting-business-software" className="hover:text-foreground">Business Tools</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/how-to-quote-painting-jobs" className="hover:text-foreground">How to Quote</Link></li>
                  <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                  <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                  <li><Link href="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
                  <li><Link href="/locations" className="hover:text-foreground">Locations</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro. The #1 software for painting contractors.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}