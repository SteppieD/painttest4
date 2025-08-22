import Link from 'next/link'
import { Metadata } from 'next'
import { Smartphone, Camera, MapPin, Cloud, Bell, Shield, Download, Zap, CheckCircle, ArrowRight, Users, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Paint Contractor App | Mobile Estimating & Job Management | PaintQuote Pro',
  description: 'Mobile app for painting contractors. Create estimates on-site, manage jobs, track crews, and invoice from your phone. Available for iOS and Android. Try free.',
  keywords: 'paint contractor app, painting contractor mobile app, painting estimate app, contractor app, mobile painting software, painting business app',
  openGraph: {
    title: 'Paint Contractor App - Estimate & Manage Jobs On The Go',
    description: 'The #1 mobile app for painting contractors. Create quotes, manage jobs, and run your business from anywhere.',
    type: 'website',
  },
}

export default function PaintContractorApp() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'PaintQuote Pro Mobile App',
    operatingSystem: 'iOS, Android',
    applicationCategory: 'BusinessApplication',
    description: 'Mobile app for painting contractors to create estimates, manage jobs, and run their business on the go.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1843',
    },
    screenshot: [
      {
        '@type': 'ImageObject',
        url: '/images/app-screenshot-estimate.jpg',
        caption: 'Create estimates on-site',
      },
      {
        '@type': 'ImageObject',
        url: '/images/app-screenshot-schedule.jpg',
        caption: 'Manage job schedules',
      },
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
              <Link href="/painting-contractors" className="transition-colors hover:text-foreground/80">
                For Contractors
              </Link>
              <Link href="/features" className="transition-colors hover:text-foreground/80">
                Features
              </Link>
              <Link href="/pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
              <Link href="/mobile-painting-estimate-app" className="transition-colors hover:text-foreground/80">
                Mobile Estimating
              </Link>
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <Link
                href="/demo"
                className="text-base font-medium transition-colors hover:text-foreground/80"
              >
                Book Demo
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Get Started Free
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
                    The Paint Contractor App That Goes Where You Go
                  </h1>
                  <p className="mt-6 text-xl text-gray-200">
                    Create professional estimates on-site, manage jobs from the field, and run your 
                    entire painting business from your phone. Works offline and syncs automatically.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="https://apps.apple.com/paintquote-pro"
                      className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download for iOS
                    </Link>
                    <Link
                      href="https://play.google.com/paintquote-pro"
                      className="inline-flex items-center rounded-md border px-6 py-3 text-base font-medium hover:bg-accent"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download for Android
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center space-x-6 text-base">
                    <div className="flex items-center">
                      <svg className="mr-1 h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">4.9</span>
                      <span className="text-gray-200">(1,843 reviews)</span>
                    </div>
                    <span className="text-gray-200">50K+ downloads</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative mx-auto max-w-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl"></div>
                    <div className="relative rounded-3xl border bg-background p-8 shadow-2xl">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-base font-medium">PaintQuote Pro</span>
                        <div className="flex space-x-1">
                          <div className="h-1 w-1 rounded-full bg-foreground"></div>
                          <div className="h-1 w-1 rounded-full bg-foreground"></div>
                          <div className="h-1 w-1 rounded-full bg-foreground"></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-lg bg-muted p-4">
                          <h3 className="font-semibold">New Estimate</h3>
                          <p className="mt-1 text-base text-gray-200">Johnson Residence - Interior</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">$3,450</span>
                            <button className="rounded-md bg-primary px-3 py-1 text-base text-primary-foreground">
                              Send
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="flex flex-col items-center rounded-lg border p-3 hover:bg-accent">
                            <Camera className="h-6 w-6 text-primary" />
                            <span className="mt-1 text-base">Take Photo</span>
                          </button>
                          <button className="flex flex-col items-center rounded-lg border p-3 hover:bg-accent">
                            <MapPin className="h-6 w-6 text-primary" />
                            <span className="mt-1 text-base">Job Map</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Mobile Features */}
          <section className="border-t py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Everything You Need in a Paint Contractor App
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Powerful features designed specifically for painting contractors on the move
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-lg border bg-card p-8">
                  <Smartphone className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">On-Site Estimating</h3>
                  <p className="mt-2 text-gray-200">
                    Create accurate estimates while walking the job site. Measure rooms, 
                    calculate paint needs, and send quotes instantly.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Room measurement tools
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Photo attachments
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Digital signatures
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Camera className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Photo Documentation</h3>
                  <p className="mt-2 text-gray-200">
                    Capture before/after photos, document job progress, and build a visual 
                    portfolio of your work automatically.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Progress photos
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Auto-organization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Client sharing
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <MapPin className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">GPS Job Tracking</h3>
                  <p className="mt-2 text-gray-200">
                    Track crew locations, optimize routes between jobs, and provide accurate 
                    arrival times to customers.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Real-time tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Route optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Time logging
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Cloud className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Offline Mode</h3>
                  <p className="mt-2 text-gray-200">
                    Work without internet connection. Create estimates, take photos, and 
                    manage jobs offline - everything syncs when connected.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Full offline access
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Auto-sync
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Conflict resolution
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Bell className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Smart Notifications</h3>
                  <p className="mt-2 text-gray-200">
                    Stay on top of your business with intelligent alerts for new leads, 
                    schedule changes, and payment updates.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Lead alerts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Schedule reminders
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Payment notifications
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Enterprise Security</h3>
                  <p className="mt-2 text-gray-200">
                    Bank-level encryption, biometric login, and role-based access keep 
                    your business data secure on any device.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      256-bit encryption
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Face/Touch ID
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Remote wipe
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
                  Your Complete Mobile Workflow
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  From first contact to final payment, manage everything from your phone
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Capture Lead</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Add new leads instantly from calls, texts, or in-person meetings. 
                    Never miss an opportunity.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Create Estimate</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Build detailed estimates on-site with measurements, photos, and 
                    material calculations.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Manage Crew</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Assign jobs, track progress, and communicate with your team 
                    all from the app.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Get Paid</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Send invoices and collect payments right from your phone. 
                    Track payment status instantly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Integration Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Seamlessly Syncs with Your Office
                  </h2>
                  <p className="mt-4 text-lg text-gray-200">
                    The paint contractor app works perfectly with our web platform, keeping 
                    your entire team in sync
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start">
                      <Cloud className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Real-Time Sync</h3>
                        <p className="mt-1 text-gray-200">
                          Changes made in the field instantly appear in the office. 
                          Estimates, photos, and updates sync automatically.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Team Collaboration</h3>
                        <p className="mt-1 text-gray-200">
                          Office staff see field updates immediately. Crews get schedule 
                          changes and job details pushed to their phones.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Shield className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Role-Based Access</h3>
                        <p className="mt-1 text-gray-200">
                          Control what each team member can see and do. Crew leaders, 
                          painters, and office staff get customized access.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/features"
                      className="inline-flex items-center font-medium text-primary hover:text-primary/80"
                    >
                      Explore all features
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted p-6">
                      <h4 className="font-semibold">Field Updates</h4>
                      <ul className="mt-3 space-y-2 text-base text-gray-200">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          Job started at 8:47 AM
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          Photos uploaded (12)
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          Materials list updated
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-muted p-6">
                      <h4 className="font-semibold">Office Actions</h4>
                      <ul className="mt-3 space-y-2 text-base text-gray-200">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          Invoice sent to client
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          Tomorrow{"'"}s jobs assigned
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                          Supply order placed
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg border bg-card p-6 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Today&rsquo;s Dashboard</h4>
                        <span className="text-base text-gray-200">Live</span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">6</div>
                          <p className="text-base text-gray-200">Active Jobs</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">18</div>
                          <p className="text-base text-gray-200">Crew Members</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">$24.5k</div>
                          <p className="text-base text-gray-200">Invoiced</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="border-t bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Painting Contractors Love Our Mobile App
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  See how contractors are transforming their business with mobile technology
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-gray-200">
                    {"\"The app changed everything. I create estimates right at the customer"}s 
                    house and close deals on the spot. Doubled my close rate!"
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Carlos Mendez</p>
                    <p className="text-base text-gray-200">Mendez Painting LLC</p>
                  </div>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-gray-200">
                    "Managing 3 crews from my phone seemed impossible until PaintQuote Pro. 
                    Now I know where everyone is and what they&apos;re working on."
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Angela Foster</p>
                    <p className="text-base text-gray-200">Foster & Sons Painting</p>
                  </div>
                </div>

                <div className="rounded-lg border bg-background p-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-gray-200">
                    "The offline mode is a lifesaver. I work in rural areas with no signal 
                    and everything still works perfectly. Syncs when I get back to town."
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Tom Bradley</p>
                    <p className="text-base text-gray-200">Bradley Professional Painting</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* App Stats */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  The Numbers Speak for Themselves
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Join thousands of contractors already using our mobile app
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">50K+</div>
                  <p className="mt-2 text-lg font-semibold">Downloads</p>
                  <p className="mt-1 text-base text-gray-200">
                    Across iOS and Android
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">4.9★</div>
                  <p className="mt-2 text-lg font-semibold">App Rating</p>
                  <p className="mt-1 text-base text-gray-200">
                    From 1,843 reviews
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">2M+</div>
                  <p className="mt-2 text-lg font-semibold">Estimates Created</p>
                  <p className="mt-1 text-base text-gray-200">
                    From mobile devices
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">99.9%</div>
                  <p className="mt-2 text-lg font-semibold">Uptime</p>
                  <p className="mt-1 text-base text-gray-200">
                    Reliable when you need it
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
                  Download the Paint Contractor App Today
                </h2>
                <p className="mt-4 text-lg opacity-100">
                  Join thousands of painting contractors who run their business from anywhere
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="https://apps.apple.com/paintquote-pro"
                    className="inline-flex items-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-background/90"
                  >
                    <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Download for iOS
                  </Link>
                  <Link
                    href="https://play.google.com/paintquote-pro"
                    className="inline-flex items-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-8 py-3 text-base font-medium hover:bg-primary-foreground/20"
                  >
                    <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l13.69 8.5-13.69 8.5c-.5-.24-.84-.76-.84-1.35m16.81-8.16l-2.62 1.62-2.19-2.19v-.27l2.19-2.19 2.62 1.63c.84.52.84 1.37 0 1.89"/>
                    </svg>
                    Download for Android
                  </Link>
                </div>
                <p className="mt-6 text-base opacity-100">
                  Free to download • Works with all PaintQuote Pro plans
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
                <h3 className="text-base font-semibold">Mobile Features</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/mobile-painting-estimate-app" className="hover:text-foreground">Mobile Estimating</Link></li>
                  <li><Link href="/features#offline" className="hover:text-foreground">Offline Mode</Link></li>
                  <li><Link href="/features#gps" className="hover:text-foreground">GPS Tracking</Link></li>
                  <li><Link href="/features#photos" className="hover:text-foreground">Photo Management</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Software</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/painting-estimating-software" className="hover:text-foreground">Estimating Software</Link></li>
                  <li><Link href="/painting-business-software" className="hover:text-foreground">Business Software</Link></li>
                  <li><Link href="/commercial-painting-estimating-software" className="hover:text-foreground">Commercial Software</Link></li>
                  <li><Link href="/integrations" className="hover:text-foreground">Integrations</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Support</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/help/mobile" className="hover:text-foreground">Mobile Help</Link></li>
                  <li><Link href="/tutorials" className="hover:text-foreground">Video Tutorials</Link></li>
                  <li><Link href="/release-notes" className="hover:text-foreground">Release Notes</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact Support</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link href="/security" className="hover:text-foreground">Security</Link></li>
                  <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
              <p>&copy; 2025 PaintQuote Pro. The #1 mobile app for painting contractors.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}