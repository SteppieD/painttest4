import Link from 'next/link'
import { Metadata } from 'next'
import { Briefcase, Calendar, CreditCard, FileText, Users, TrendingUp, Shield, BarChart, CheckCircle, ArrowRight, Clock, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Business Software | All-in-One Management Solution | PaintQuote Pro',
  description: 'Complete painting business software for contractors. Manage quotes, schedule jobs, track expenses, invoice clients, and grow your painting business. Try free.',
  keywords: 'painting business software, painting contractor business software, painting company software, painting business management software, contractor business software',
  openGraph: {
    title: 'Painting Business Software - Complete Management Solution',
    description: 'All-in-one software to run your painting business. Quotes, scheduling, invoicing, and business insights.',
    type: 'website',
  },
}

export default function PaintingBusinessSoftware() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PaintQuote Pro Painting Business Software',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: 'Comprehensive painting business management software with CRM, scheduling, invoicing, and analytics.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '49',
      highPrice: '149',
      priceCurrency: 'USD',
    },
    featureList: [
      'Quote and estimate management',
      'Job scheduling and calendar',
      'Customer relationship management',
      'Invoice and payment processing',
      'Expense tracking',
      'Team management',
      'Business analytics',
      'Mobile app access',
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
              <Link href="/case-studies" className="transition-colors hover:text-foreground/80">
                Success Stories
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
                  Painting Business Software That Runs Your Entire Operation
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  All-in-one painting business management software. Handle quotes, scheduling, invoicing, 
                  and team management from one powerful platform. Built for growing painting contractors.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center rounded-md border px-8 py-3 text-base font-medium hover:bg-accent"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    See How It Works
                  </Link>
                </div>
                <p className="mt-4 text-base text-gray-200">
                  No credit card required • Full access • Cancel anytime
                </p>
              </div>
            </div>
          </section>

          {/* Core Business Features */}
          <section className="border-t py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Everything You Need to Run a Profitable Painting Business
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  Streamline operations, increase efficiency, and grow your painting company
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-lg border bg-card p-8">
                  <FileText className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Quote & Estimate Management</h3>
                  <p className="mt-2 text-gray-200">
                    Create professional quotes in minutes. Track status, follow up automatically, 
                    and convert more estimates to jobs.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Professional templates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      E-signature collection
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Automated follow-ups
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Calendar className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Job Scheduling & Calendar</h3>
                  <p className="mt-2 text-gray-200">
                    Visual scheduling for your entire team. Drag-and-drop jobs, manage crew 
                    assignments, and optimize routes.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Team calendar sync
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      GPS job tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Weather integration
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <CreditCard className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Invoicing & Payments</h3>
                  <p className="mt-2 text-gray-200">
                    Get paid faster with professional invoices. Accept credit cards, ACH, 
                    and track all payments in one place.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Online payment portal
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Automatic reminders
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Payment tracking
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Customer Management (CRM)</h3>
                  <p className="mt-2 text-gray-200">
                    Build lasting customer relationships. Track job history, preferences, 
                    and automate marketing to past clients.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Complete job history
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Automated marketing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Review management
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <TrendingUp className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Business Analytics</h3>
                  <p className="mt-2 text-gray-200">
                    Real-time insights into your business performance. Track revenue, 
                    profitability, and growth opportunities.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Revenue dashboards
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Job profitability
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Lead source tracking
                    </li>
                  </ul>
                </div>

                <div className="relative rounded-lg border bg-card p-8">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Team Management</h3>
                  <p className="mt-2 text-gray-200">
                    Manage your crew efficiently. Track hours, assign roles, and monitor 
                    performance across all teams.
                  </p>
                  <ul className="mt-4 space-y-2 text-base">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Time tracking
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Performance metrics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Payroll integration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Your Complete Painting Business Workflow
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  From first contact to final payment, manage every step seamlessly
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Lead Capture</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Capture leads from your website, calls, or referrals. Automatically organize 
                    and prioritize opportunities.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Quote & Close</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Create professional estimates quickly. Present options, collect signatures, 
                    and win more jobs.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Execute Jobs</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Schedule crews, track progress, and manage job sites. Keep customers informed 
                    automatically.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    4
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Get Paid</h3>
                  <p className="mt-2 text-base text-gray-200">
                    Send invoices, collect payments, and track cash flow. Automated reminders 
                    ensure timely payment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Success Metrics */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl">
                    Grow Your Painting Business with Data-Driven Insights
                  </h2>
                  <p className="mt-4 text-lg text-gray-200">
                    Make informed decisions with real-time business intelligence and performance tracking
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start">
                      <BarChart className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Revenue Analytics</h3>
                        <p className="mt-1 text-gray-200">
                          Track revenue by job type, crew, or time period. Identify your most 
                          profitable services and optimize pricing.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Time & Efficiency Tracking</h3>
                        <p className="mt-1 text-gray-200">
                          Monitor job completion times and crew efficiency. Improve estimates 
                          and scheduling accuracy over time.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <DollarSign className="mr-4 h-6 w-6 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Profit Margin Analysis</h3>
                        <p className="mt-1 text-gray-200">
                          Understand true job profitability. Track material costs, labor hours, 
                          and overhead to maximize margins.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-lg bg-muted p-8">
                    <h3 className="text-xl font-semibold">Business Growth Dashboard</h3>
                    <div className="mt-6 space-y-6">
                      <div>
                        <div className="flex justify-between text-base">
                          <span>Monthly Revenue</span>
                          <span className="font-semibold text-primary">$127,450</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-background">
                          <div className="h-2 w-[85%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-base">
                          <span>Jobs Completed</span>
                          <span className="font-semibold">42 / 48</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-background">
                          <div className="h-2 w-[87%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-base">
                          <span>Average Job Value</span>
                          <span className="font-semibold text-green-600">↑ $3,035</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-background">
                          <div className="h-2 w-[92%] rounded-full bg-green-600"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-base">
                          <span>Customer Satisfaction</span>
                          <span className="font-semibold">4.8 / 5.0</span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-background">
                          <div className="h-2 w-[96%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="border-t bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Painting Contractors Love Our Business Software
                </h2>
                <p className="mt-4 text-lg text-gray-200">
                  See how painting businesses are transforming their operations
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
                    "PaintQuote Pro transformed how we run our business. We're more organized, 
                    efficient, and profitable than ever before."
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Robert Chen</p>
                    <p className="text-base text-gray-200">Chen{'s} Quality Painting</p>
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
                    "The scheduling and invoicing features alone save me 10+ hours per week. 
                    Best investment I{"'"}ve made in my business.{"\""}
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">Lisa Martinez</p>
                    <p className="text-base text-gray-200">Martinez Pro Painters</p>
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
                    "Went from 5 to 15 crews in 2 years using PaintQuote Pro. The software 
                    scales perfectly as you grow."
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">James Thompson</p>
                    <p className="text-base text-gray-200">Thompson Painting Group</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground md:px-12 md:py-16">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Ready to Transform Your Painting Business?
                </h2>
                <p className="mt-4 text-lg opacity-100">
                  Join thousands of painting contractors who run their entire business with PaintQuote Pro
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground hover:bg-background/90"
                  >
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-8 py-3 text-base font-medium hover:bg-primary-foreground/20"
                  >
                    Schedule Live Demo
                  </Link>
                </div>
                <p className="mt-4 text-base opacity-100">
                  Full access • No credit card required • Cancel anytime
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
                <h3 className="text-base font-semibold">Business Tools</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/painting-estimating-software" className="hover:text-foreground">Estimating Software</Link></li>
                  <li><Link href="/paint-contractor-app" className="hover:text-foreground">Mobile App</Link></li>
                  <li><Link href="/commercial-painting-estimating-software" className="hover:text-foreground">Commercial Software</Link></li>
                  <li><Link href="/integrations" className="hover:text-foreground">Integrations</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/painting-business-tips" className="hover:text-foreground">Business Tips</Link></li>
                  <li><Link href="/painting-business-profit-guide" className="hover:text-foreground">Profit Guide</Link></li>
                  <li><Link href="/scale-painting-business" className="hover:text-foreground">Scaling Guide</Link></li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Support</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
                  <li><Link href="/tutorials" className="hover:text-foreground">Video Tutorials</Link></li>
                  <li><Link href="/api" className="hover:text-foreground">API Docs</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact Support</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-base text-gray-200">
                  <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                  <li><Link href="/partners" className="hover:text-foreground">Partners</Link></li>
                  <li><Link href="/security" className="hover:text-foreground">Security</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
              <p>&copy; 2025 PaintQuote Pro. Complete painting business management software.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}