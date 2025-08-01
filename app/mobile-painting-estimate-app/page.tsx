import Link from 'next/link'
import { Metadata } from 'next'
import { Smartphone, Camera, Calculator, Clock, MapPin, Cloud, Palette, Ruler, CheckCircle, ArrowRight, Download, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mobile Painting Estimate App | Create Quotes On-Site | PaintQuote Pro',
  description: 'Mobile painting estimate app for contractors. Create professional quotes on-site, calculate paint needs instantly, and close deals faster. iOS & Android.',
  keywords: 'mobile painting estimate app, painting estimate app, mobile estimating app, paint calculator app, contractor estimate app, painting quote app',
  openGraph: {
    title: 'Mobile Painting Estimate App - Quote Jobs From Anywhere',
    description: 'The fastest way to create painting estimates on-site. Professional quotes in minutes from your phone.',
    type: 'website',
  },
}

export default function MobilePaintingEstimateApp() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'PaintQuote Pro Mobile Estimate App',
    operatingSystem: 'iOS, Android',
    applicationCategory: 'BusinessApplication',
    description: 'Mobile app for creating professional painting estimates on-site with instant calculations and quotes.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2156',
    },
    featureList: [
      'On-site room measurements',
      'Instant paint calculations',
      'Photo documentation',
      'Digital signatures',
      'Offline mode',
      'Cloud sync',
      'Professional PDF quotes',
      'Customer database',
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
            <nav className="flex items-center space-x-6 text-base font-medium">
              <Link href="/paint-contractor-app" className="transition-colors hover:text-foreground/80">
                Contractor App
              </Link>
              <Link href="/features" className="transition-colors hover:text-foreground/80">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
              <Link href="/interior-painting-quote-calculator" className="transition-colors hover:text-foreground/80">
                Web Calculator
              </Link>
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <Link
                href="/demo"
                className="text-base font-medium transition-colors hover:text-foreground/80"
              >
                See Demo
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Try Free
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    The Mobile Painting Estimate App That Closes Deals On-Site
                  </h1>
                  <p className="mt-6 text-xl text-gray-200">
                    Create professional painting estimates in minutes from your phone. Measure rooms, 
                    calculate paint needs, and get signatures on the spot. No more back-and-forth.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="https://apps.apple.com/paintquote-pro"
                      className="inline-flex items-center rounded-md bg-black px-6 py-3 text-base font-medium text-white hover:bg-black/90"
                    >
                      <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      Get for iPhone
                    </Link>
                    <Link
                      href="https://play.google.com/paintquote-pro"
                      className="inline-flex items-center rounded-md border border-foreground px-6 py-3 text-base font-medium hover:bg-accent"
                    >
                      <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l13.69 8.5-13.69 8.5c-.5-.24-.84-.76-.84-1.35m16.81-8.16l-2.62 1.62-2.19-2.19v-.27l2.19-2.19 2.62 1.63c.84.52.84 1.37 0 1.89"/>
                      </svg>
                      Get for Android
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center space-x-6 text-base">
                    <div className="flex items-center">
                      <svg className="mr-1 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">4.8</span>
                      <span className="text-gray-200">(2,156 reviews)</span>
                    </div>
                    <span className="text-gray-200">Free to download</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative mx-auto max-w-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl"></div>
                    <div className="relative">
                      <div className="mx-auto w-64 rounded-[3rem] border-8 border-foreground/10 bg-background p-2 shadow-2xl">
                        <div className="aspect-[9/19.5] overflow-hidden rounded-[2.5rem] bg-muted">
                          <div className="flex h-full flex-col">
                            {/* App Header */}
                            <div className="border-b bg-background p-4">
                              <div className="flex items-center justify-between">
                                <h2 className="font-semibold">New Estimate</h2>
                                <button className="text-primary">Save</button>
                              </div>
                            </div>
                            
                            {/* Estimate Preview */}
                            <div className="flex-1 overflow-auto p-4">
                              <div className="space-y-3">
                                <div className="rounded-lg bg-background p-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-base font-medium">Living Room</span>
                                    <span className="text-base text-gray-200">450 sq ft</span>
                                  </div>
                                  <div className="mt-2 flex items-center space-x-2">
                                    <Camera className="h-4 w-4 text-primary" />
                                    <span className="text-base">3 photos</span>
                                  </div>
                                </div>
                                
                                <div className="rounded-lg bg-background p-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-base font-medium">Master Bedroom</span>
                                    <span className="text-base text-gray-200">380 sq ft</span>
                                  </div>
                                  <div className="mt-2 flex items-center space-x-2">
                                    <Camera className="h-4 w-4 text-primary" />
                                    <span className="text-base">2 photos</span>
                                  </div>
                                </div>
                                
                                <div className="rounded-lg bg-primary/10 p-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-base font-medium">Paint Calculator</span>
                                    <Calculator className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="mt-2 text-base">
                                    <div className="flex justify-between">
                                      <span>Total: 12 gallons</span>
                                      <span>$486</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Bottom Actions */}
                            <div className="border-t bg-background p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-base text-gray-200">Total Estimate</p>
                                  <p className="text-lg font-bold text-primary">$2,450</p>
                                </div>
                                <button className="rounded-full bg-primary px-4 py-2 text-base font-medium text-primary-foreground">
                                  Send Quote
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="border-t py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Everything You Need to Estimate On-Site
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Professional estimating tools designed for speed and accuracy in the field
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-lg border bg-card p-8">
                  <Ruler className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Quick Room Measurements</h3>
                  <p className="mt-2 text-gray-200">
                    Enter room dimensions quickly with our intuitive interface. Calculate 
                    wall, ceiling, and trim areas instantly.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Smart dimension entry
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Auto area calculation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Window/door deduction
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Calculator className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Instant Paint Calculations</h3>
                  <p className="mt-2 text-gray-200">
                    Calculate exact paint quantities based on surface type, texture, 
                    and number of coats. No more guesswork.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Coverage rates database
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Multi-coat calculations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Primer requirements
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Camera className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Photo Documentation</h3>
                  <p className="mt-2 text-gray-200">
                    Capture room photos, surface conditions, and color samples. 
                    Attach images directly to estimates.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Auto-organize by room
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Annotation tools
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Before/after tracking
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Palette className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Color Selection Tools</h3>
                  <p className="mt-2 text-gray-200">
                    Browse paint colors from major brands, match existing colors, 
                    and save customer preferences.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Brand color libraries
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Photo color matching
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Save color schemes
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Clock className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Labor Time Estimator</h3>
                  <p className="mt-2 text-gray-200">
                    Calculate accurate labor hours based on room size, surface condition, 
                    and job complexity. Factor in crew size.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Productivity rates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Prep time included
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Crew optimization
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Instant Professional Quotes</h3>
                  <p className="mt-2 text-gray-200">
                    Generate beautiful PDF quotes on the spot. Collect digital signatures 
                    and close deals immediately.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Professional templates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Digital signatures
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Email/text delivery
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Workflow */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  From Walk-Through to Signed Quote in Minutes
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Our mobile estimate app streamlines your entire quoting process
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Walk & Measure</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Walk through with the customer, measuring rooms and taking photos 
                    as you go. Everything saves automatically.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Calculate Instantly</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Our app calculates paint quantities, labor hours, and total costs 
                    automatically based on your measurements.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Review Together</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Show the customer a professional quote on your device. Make 
                    adjustments and answer questions in real-time.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    4
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Close the Deal</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Collect a digital signature and deposit right from the app. 
                    Schedule the job and you&apos;re done!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Offline & Sync */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Works Everywhere, Even Without Internet
                  </h2>
                  <p className="mt-4 text-lg text-gray-200">
                    Create estimates anywhere with full offline functionality. Everything syncs 
                    automatically when you&apos;re back online
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start">
                      <Cloud className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Automatic Cloud Sync</h3>
                        <p className="mt-1 text-gray-200">
                          All estimates backup to the cloud instantly. Access from any 
                          device and never lose your work.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">GPS Job Tracking</h3>
                        <p className="mt-1 text-gray-200">
                          Automatically tag estimates with location. Map all your quotes 
                          and optimize routes between appointments.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Smartphone className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Cross-Device Access</h3>
                        <p className="mt-1 text-gray-200">
                          Start an estimate on your phone, finish on your tablet. Everything 
                          stays in sync across all your devices.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/features#mobile"
                      className="inline-flex items-center font-medium text-primary hover:text-primary/80"
                    >
                      See all mobile features
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-lg bg-muted p-8">
                    <h3 className="text-xl font-semibold">Mobile Estimate Stats</h3>
                    <div className="mt-6 space-y-6">
                      <div>
                        <div className="flex justify-between text-base">
                          <span>Average time to create estimate</span>
                          <span className="font-semibold text-primary">8 minutes</span>
                        </div>
                        <div className="mt-2 text-base text-gray-200">
                          vs 45 minutes with traditional methods
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-base">
                          <span>Close rate for on-site estimates</span>
                          <span className="font-semibold text-primary">73%</span>
                        </div>
                        <div className="mt-2 text-base text-gray-200">
                          vs 31% for estimates sent later
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-base">
                          <span>Customer satisfaction</span>
                          <span className="font-semibold text-primary">4.9/5.0</span>
                        </div>
                        <div className="mt-2 text-base text-gray-200">
                          "Professional and fast" - most common feedback
                        </div>
                      </div>

                      <div className="rounded-lg border bg-background p-4">
                        <p className="text-base font-medium">
                          "The mobile estimate app paid for itself in the first week. 
                          I close 2x more jobs now." 
                        </p>
                        <p className="mt-2 text-base text-gray-200">
                          - David Park, Park Painting Services
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Integration */}
          <section className="border-t bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Free Mobile App with Every Plan
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  The mobile painting estimate app is included with all PaintQuote Pro subscriptions
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-8">
                  <h3 className="text-xl font-semibold">Starter</h3>
                  <p className="mt-2 text-3xl font-bold">$79<span className="text-lg font-normal">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Mobile estimate app included
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Up to 50 estimates/month
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Basic templates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      1 user
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border-2 border-primary bg-background p-8">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-base font-medium text-primary-foreground">
                    Most Popular
                  </div>
                  <h3 className="text-xl font-semibold">Professional</h3>
                  <p className="mt-2 text-3xl font-bold">$99<span className="text-lg font-normal">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Mobile estimate app included
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Unlimited estimates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Custom branding
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Up to 5 users
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-background p-8">
                  <h3 className="text-xl font-semibold">Business</h3>
                  <p className="mt-2 text-3xl font-bold">$199<span className="text-lg font-normal">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Mobile estimate app included
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Unlimited everything
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      API access
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Unlimited users
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/pricing"
                  className="inline-flex items-center font-medium text-primary hover:text-primary/80"
                >
                  View detailed pricing comparison
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* App Screenshots */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  See the Mobile Estimate App in Action
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Professional estimating has never been this easy
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="aspect-[9/16] rounded-lg bg-background"></div>
                  </div>
                  <h3 className="mt-4 font-semibold">Room Measurements</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Quick entry with smart calculations
                  </p>
                </div>

                <div className="text-center">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="aspect-[9/16] rounded-lg bg-background"></div>
                  </div>
                  <h3 className="mt-4 font-semibold">Paint Calculator</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Instant material calculations
                  </p>
                </div>

                <div className="text-center">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="aspect-[9/16] rounded-lg bg-background"></div>
                  </div>
                  <h3 className="mt-4 font-semibold">Professional Quote</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Beautiful quotes ready to send
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground md:px-12 md:py-16">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Start Creating Mobile Estimates Today
                </h2>
                <p className="mt-4 text-lg opacity-100">
                  Download the app and start closing more deals on the spot
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="https://apps.apple.com/paintquote-pro"
                    className="inline-flex items-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-background/90"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download for iOS
                  </Link>
                  <Link
                    href="https://play.google.com/paintquote-pro"
                    className="inline-flex items-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-8 py-3 text-base font-medium hover:bg-primary-foreground/20"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download for Android
                  </Link>
                </div>
                <p className="mt-6 text-base opacity-100">
                  Free with all PaintQuote Pro plans • Works offline • Syncs automatically
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-base font-semibold">Mobile Tools</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/paint-contractor-app" className="hover:text-foreground">Full Contractor App</Link></li>
                  <li><Link href="/features#offline" className="hover:text-foreground">Offline Features</Link></li>
                  <li><Link href="/features#photos" className="hover:text-foreground">Photo Tools</Link></li>
                  <li><Link href="/integrations" className="hover:text-foreground">Integrations</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Calculators</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/interior-painting-quote-calculator" className="hover:text-foreground">Interior Calculator</Link></li>
                  <li><Link href="/exterior-painting-estimate-calculator" className="hover:text-foreground">Exterior Calculator</Link></li>
                  <li><Link href="/paint-quantity-calculator" className="hover:text-foreground">Paint Quantity</Link></li>
                  <li><Link href="/labor-calculator" className="hover:text-foreground">Labor Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/mobile-estimating-guide" className="hover:text-foreground">Mobile Guide</Link></li>
                  <li><Link href="/tutorials/mobile" className="hover:text-foreground">Video Tutorials</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                  <li><Link href="/help/mobile" className="hover:text-foreground">Mobile Help</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
              <p>&copy; 2025 PaintQuote Pro. The fastest mobile painting estimate app for contractors.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}