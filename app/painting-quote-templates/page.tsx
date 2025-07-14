import Link from 'next/link'
import { FileText, Download, CheckCircle, Zap, Shield, Award } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Painting Quote Templates | Professional Estimate Forms | PaintQuote Pro',
  description: 'Download free painting quote templates and estimate forms. Professional templates for residential and commercial painting contractors. Excel, PDF, and Word formats.',
  keywords: 'painting quote template, painting estimate template, free painting forms, painting contractor templates, painting bid template, painting proposal template',
  openGraph: {
    title: 'Free Painting Quote Templates - Download Now',
    description: 'Professional painting quote templates for contractors. Customizable forms in multiple formats.',
    type: 'website',
  },
}

export default function PaintingQuoteTemplates() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO-Optimized Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">PaintQuote Pro</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/painting-estimate-calculator-free" className="transition-colors hover:text-foreground/80">
              Calculator
            </Link>
            <Link href="/how-to-quote-painting-jobs" className="transition-colors hover:text-foreground/80">
              How to Quote
            </Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground/80">
              Pricing
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              Sign In
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
        {/* Hero Section with H1 */}
        <section className="relative py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Free Painting Quote Templates
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Professional painting estimate templates that win more jobs. Download customizable forms 
                for residential and commercial painting projects. Available in Excel, PDF, and Word.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="#templates"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Templates
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Try Digital Quotes
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-t py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Why Use Professional Quote Templates?
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Save Time</h3>
                <p className="mt-2 text-muted-foreground">
                  Stop creating quotes from scratch. Use proven templates that work
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Look Professional</h3>
                <p className="mt-2 text-muted-foreground">
                  Impress clients with polished, detailed quotes every time
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Win More Jobs</h3>
                <p className="mt-2 text-muted-foreground">
                  Clear, comprehensive quotes increase your close rate by 40%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="bg-muted/50 py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Download Free Painting Quote Templates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
              Choose from our collection of professional templates designed by painting contractors
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Template 1: Basic Residential */}
              <div className="rounded-lg border bg-background p-6">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Basic Residential Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Perfect for simple home painting projects. Includes room-by-room breakdown, 
                  materials list, and payment terms.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Excel format (.xlsx)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Auto-calculating totals
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Customizable branding
                  </li>
                </ul>
                <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Download Template
                </button>
              </div>

              {/* Template 2: Detailed Commercial */}
              <div className="rounded-lg border bg-background p-6">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Commercial Project Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Comprehensive template for commercial painting bids. Includes phases, 
                  milestones, and detailed scope of work.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Word format (.docx)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Project timeline section
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Insurance & warranty info
                  </li>
                </ul>
                <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Download Template
                </button>
              </div>

              {/* Template 3: Exterior Package */}
              <div className="rounded-lg border bg-background p-6">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Exterior Painting Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Specialized for exterior projects. Includes weather considerations, 
                  surface prep details, and material specifications.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    PDF format
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Surface measurement guide
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Paint coverage calculator
                  </li>
                </ul>
                <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Download Template
                </button>
              </div>

              {/* Template 4: Cabinet Refinishing */}
              <div className="rounded-lg border bg-background p-6">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Cabinet Painting Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Detailed template for kitchen cabinet refinishing. Includes door/drawer 
                  counts and finish options.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Excel format (.xlsx)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Unit pricing breakdown
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Process checklist
                  </li>
                </ul>
                <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Download Template
                </button>
              </div>

              {/* Template 5: Multi-Unit Residential */}
              <div className="rounded-lg border bg-background p-6">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Multi-Unit Residential</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  For apartments and HOA projects. Includes unit types, common areas, 
                  and phasing schedule.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Excel format (.xlsx)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Unit quantity multiplier
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    HOA compliance section
                  </li>
                </ul>
                <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Download Template
                </button>
              </div>

              {/* Template 6: New Construction */}
              <div className="rounded-lg border bg-background p-6">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">New Construction Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  For builders and new homes. Includes primer/finish coats, spray vs. 
                  brush pricing, and builder discounts.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Word format (.docx)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Volume pricing tiers
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Builder terms section
                  </li>
                </ul>
                <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Download Template
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              What's Included in Each Template
            </h2>
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold">Professional Elements</h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Company branding area</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Client information section</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Project details & scope</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Professional terms & conditions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Calculation Features</h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Automatic price calculations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Tax & discount fields</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Material quantity formulas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>Labor hour tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="bg-muted/50 py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              How to Use These Templates
            </h2>
            <div className="mx-auto mt-12 max-w-3xl">
              <ol className="space-y-8">
                <li className="flex">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Download Your Template</h3>
                    <p className="mt-2 text-muted-foreground">
                      Choose the template that best matches your project type. All templates are 
                      free and ready to use immediately.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Customize Your Branding</h3>
                    <p className="mt-2 text-muted-foreground">
                      Add your company logo, contact information, and license numbers. Adjust colors 
                      and fonts to match your brand.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Enter Project Details</h3>
                    <p className="mt-2 text-muted-foreground">
                      Fill in measurements, pricing, and scope details. The templates automatically 
                      calculate totals and taxes.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Send to Your Client</h3>
                    <p className="mt-2 text-muted-foreground">
                      Save as PDF and email to clients, or print for in-person presentations. 
                      Follow up within 3-5 days.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Template Tips Section */}
        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Pro Tips for Using Quote Templates
            </h2>
            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-semibold">Keep Multiple Versions</h3>
                <p className="mt-2 text-muted-foreground">
                  Create "Good, Better, Best" options using the same template. This gives clients 
                  choices and often leads to higher-value sales.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-semibold">Update Pricing Regularly</h3>
                <p className="mt-2 text-muted-foreground">
                  Review and update your template pricing every 3-6 months to account for material 
                  cost changes and market conditions.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-semibold">Include Photos</h3>
                <p className="mt-2 text-muted-foreground">
                  Add before/after photos or similar project examples to help clients visualize 
                  the results. This increases trust and close rates.
                </p>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-lg font-semibold">Be Specific About Scope</h3>
                <p className="mt-2 text-muted-foreground">
                  Clearly list what's included and excluded. This prevents scope creep and ensures 
                  both parties have matching expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA Section */}
        <section className="border-t py-12 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready for Something Better?
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                While templates are great, our AI-powered quoting tool creates professional quotes 
                in 90% less time with guaranteed accuracy.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-muted/50 p-6 text-left">
                  <h3 className="font-semibold">Traditional Templates</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <li>• Manual calculations</li>
                    <li>• Time-consuming to fill out</li>
                    <li>• Easy to make errors</li>
                    <li>• Limited customization</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-primary bg-primary/5 p-6 text-left">
                  <h3 className="font-semibold">PaintQuote Pro</h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>• AI-powered automation</li>
                    <li>• Create quotes in minutes</li>
                    <li>• Error-free calculations</li>
                    <li>• Unlimited customization</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                >
                  Try PaintQuote Pro Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 PaintQuote Pro. Free painting quote templates for professional contractors.
          </p>
        </div>
      </footer>
    </div>
  )
}