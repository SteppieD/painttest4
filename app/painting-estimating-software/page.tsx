import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator, Palette, FileSpreadsheet, BarChart3, Clock, DollarSign, Users, Smartphone, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Estimating Software | Professional Contractor Tools | PaintQuote Pro',
  description: 'Advanced painting estimating software for contractors. Calculate material costs, labor hours, and profit margins accurately. Create professional estimates in minutes.',
  keywords: 'painting estimating software, paint estimating software, painting cost estimator software, contractor estimating tools, painting estimate program',
  openGraph: {
    title: 'Professional Painting Estimating Software - Accurate Cost Calculations',
    description: 'The complete painting estimating solution for contractors. Material calculators, labor tracking, and instant professional quotes.',
    type: 'website',
  },
}

export default function PaintingEstimatingSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PaintQuote Pro Painting Estimating Software',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: 'Professional painting estimating software with advanced calculators, material databases, and labor tracking.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Paint quantity calculator',
      'Labor hour estimator',
      'Material cost database',
      'Profit margin calculator',
      'Surface area measurement',
      'Multi-room estimating',
      'Quote generation',
      'Customer management',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-14 items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">PaintQuote Pro</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/painting-estimate-software" className="transition-colors hover:text-foreground/80">
                Estimate Software
              </Link>
              <Link href="/painting-business-software" className="transition-colors hover:text-foreground/80">
                Business Software
              </Link>
              <Link href="/features" className="transition-colors hover:text-foreground/80">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <Link
                href="/demo"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Book Demo
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Start Free Trial
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Painting Estimating Software That Gets Every Number Right
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Professional painting estimating software with built-in calculators, material databases, 
                  and labor tracking. Create accurate estimates 10x faster than spreadsheets.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/interior-painting-quote-calculator"
                    className="inline-flex items-center rounded-md border px-8 py-3 text-base font-medium hover:bg-accent"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Try Free Calculator
                  </Link>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          </section>

          {/* Core Estimating Features */}
          <section className="border-t py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Advanced Painting Estimating Tools
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Everything you need to create accurate painting estimates quickly and professionally
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-lg border bg-card p-8">
                  <Calculator className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Paint Quantity Calculator</h3>
                  <p className="mt-2 text-muted-foreground">
                    Automatically calculate paint needed based on surface area, texture, and coverage rates. 
                    Includes primer and multiple coat calculations.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Surface texture adjustments
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Window/door deductions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Waste factor calculations
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Clock className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Labor Hour Estimator</h3>
                  <p className="mt-2 text-muted-foreground">
                    Calculate accurate labor hours based on room complexity, surface conditions, 
                    and crew size. Factors in prep work automatically.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Prep work calculations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Crew size optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Height factor adjustments
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <DollarSign className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Material Cost Database</h3>
                  <p className="mt-2 text-muted-foreground">
                    Up-to-date pricing for major paint brands and supplies. Automatically calculates 
                    total material costs with local supplier integration.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Real-time price updates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Supplier integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Bulk discount tracking
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <FileSpreadsheet className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Surface Measurement Tools</h3>
                  <p className="mt-2 text-muted-foreground">
                    Quick and accurate surface area calculations for walls, ceilings, trim, 
                    and specialty surfaces. Visual room builders included.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Room dimension calculator
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Trim linear footage
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Complex shape tools
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <BarChart3 className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Profit Margin Calculator</h3>
                  <p className="mt-2 text-muted-foreground">
                    Set and track profit margins across all estimates. Adjust markup by job type, 
                    client, or project complexity automatically.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Variable markup rules
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Overhead allocation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Profit tracking
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Palette className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Color & Finish Selection</h3>
                  <p className="mt-2 text-muted-foreground">
                    Digital color libraries from major brands. Track finish types, sheen levels, 
                    and specialty coatings with automatic pricing adjustments.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Brand color libraries
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Finish recommendations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Color matching tools
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Estimating Process */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Create Accurate Estimates in 4 Simple Steps
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our painting estimating software streamlines your entire quoting process
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Measure Surfaces</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Input room dimensions or use our visual builder. Automatically calculates walls, 
                    ceilings, and trim areas.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Select Materials</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Choose paint products from our database. System calculates quantities and costs 
                    automatically.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Add Labor Hours</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    AI estimates labor based on job complexity. Adjust for crew size and experience 
                    level.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    4
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Generate Quote</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Professional estimate ready in seconds. Send directly to clients or download 
                    as PDF.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Integration Features */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Integrates with Your Existing Tools
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Our painting estimating software works seamlessly with the tools you already use
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start">
                      <Users className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">CRM Integration</h3>
                        <p className="mt-1 text-muted-foreground">
                          Sync estimates with your customer database. Track leads, follow-ups, 
                          and conversion rates automatically.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FileSpreadsheet className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Accounting Software</h3>
                        <p className="mt-1 text-muted-foreground">
                          Export estimates to QuickBooks, Xero, or other accounting platforms. 
                          Track job costs vs estimates automatically.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Smartphone className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Mobile Apps</h3>
                        <p className="mt-1 text-muted-foreground">
                          Create estimates on-site with our iOS and Android apps. Sync across 
                          all devices in real-time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/integrations"
                      className="inline-flex items-center font-medium text-primary hover:text-primary/80"
                    >
                      View all integrations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-lg bg-muted p-8">
                    <h3 className="text-xl font-semibold">Painting Estimate Example</h3>
                    <div className="mt-6 space-y-4">
                      <div className="rounded-md bg-background p-4">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Master Bedroom</span>
                          <span>850 sq ft walls</span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          2 coats premium paint, 1 coat primer
                        </div>
                      </div>
                      <div className="rounded-md bg-background p-4">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Materials</span>
                          <span>$486.50</span>
                        </div>
                        <div className="mt-1 flex justify-between text-sm">
                          <span className="font-medium">Labor (8 hours)</span>
                          <span>$640.00</span>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total Estimate</span>
                          <span className="text-primary">$1,126.50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ROI Section */}
          <section className="border-t bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Painting Estimating Software That Pays for Itself
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Save hours on every estimate and win more jobs with professional, accurate quotes
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">75%</div>
                  <p className="mt-2 text-lg font-semibold">Time Saved</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create estimates in minutes instead of hours
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">32%</div>
                  <p className="mt-2 text-lg font-semibold">More Accurate</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reduce costly estimation errors
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">2.4x</div>
                  <p className="mt-2 text-lg font-semibold">More Quotes</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Send more estimates and win more jobs
                  </p>
                </div>
              </div>

              <div className="mt-12 rounded-lg bg-background p-8 text-center">
                <h3 className="text-2xl font-bold">
                  Ready to Transform Your Estimating Process?
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Join thousands of painting contractors using our estimating software to grow their business
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center rounded-md border px-6 py-3 text-base font-medium hover:bg-accent"
                  >
                    Schedule Demo
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold">Estimating Tools</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/interior-painting-quote-calculator" className="hover:text-foreground">Interior Calculator</Link></li>
                  <li><Link href="/exterior-painting-estimate-calculator" className="hover:text-foreground">Exterior Calculator</Link></li>
                  <li><Link href="/painting-estimate-calculator-free" className="hover:text-foreground">Free Calculator</Link></li>
                  <li><Link href="/paint-quantity-calculator" className="hover:text-foreground">Paint Quantity Tool</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Software</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/painting-estimate-software" className="hover:text-foreground">Estimate Software</Link></li>
                  <li><Link href="/painting-business-software" className="hover:text-foreground">Business Software</Link></li>
                  <li><Link href="/paint-contractor-app" className="hover:text-foreground">Mobile App</Link></li>
                  <li><Link href="/features" className="hover:text-foreground">All Features</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/how-to-estimate-painting-jobs" className="hover:text-foreground">Estimating Guide</Link></li>
                  <li><Link href="/painting-estimate-templates" className="hover:text-foreground">Free Templates</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                  <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                  <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                  <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro. Professional painting estimating software for contractors.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}