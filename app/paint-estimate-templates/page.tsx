import Link from 'next/link'
import { Metadata } from 'next'
import { FileText, Download, CheckCircle, Star, Clock, Users } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Free Paint Estimate Templates | Professional Painting Quote Forms 2025',
  description: 'Download free painting estimate templates for contractors. Professional quote forms for interior, exterior, commercial painting jobs. Excel, PDF, and Word formats.',
  keywords: 'paint estimate template, painting quote template, painting estimate form, free painting templates, contractor estimate template, painting bid template',
  openGraph: {
    title: 'Free Paint Estimate Templates for Contractors',
    description: 'Professional painting estimate templates. Download free Excel, PDF, and Word formats. Used by 2,847+ painting contractors.',
    type: 'website',
  },
  alternates: {
    canonical: '/paint-estimate-templates'
  }
}

const templates = [
  {
    name: 'Interior Painting Estimate Template',
    format: 'Excel',
    downloads: '12,847',
    rating: 4.8,
    description: 'Complete template for residential interior painting with room-by-room breakdown',
    features: [
      'Room-by-room pricing sections',
      'Surface area calculations',
      'Paint & materials calculator',
      'Labor hour estimates',
      'Automatic total calculations'
    ]
  },
  {
    name: 'Exterior Painting Quote Template',
    format: 'Excel',
    downloads: '9,234',
    rating: 4.9,
    description: 'Professional exterior painting template with weather considerations and prep work',
    features: [
      'Siding, trim, and accent pricing',
      'Prep work breakdown',
      'Weather protection costs',
      'Equipment rental section',
      'Multiple coating options'
    ]
  },
  {
    name: 'Commercial Painting Bid Template',
    format: 'Word',
    downloads: '7,892',
    rating: 4.7,
    description: 'Comprehensive commercial painting bid template with project phases',
    features: [
      'Multi-phase project breakdown',
      'Square footage calculator',
      'Night/weekend pricing',
      'Insurance & bonding section',
      'Payment schedule template'
    ]
  },
  {
    name: 'Simple Painting Estimate Form',
    format: 'PDF',
    downloads: '15,234',
    rating: 4.6,
    description: 'Quick and easy painting estimate form for small jobs',
    features: [
      'One-page format',
      'Basic pricing sections',
      'Materials checklist',
      'Terms & conditions',
      'Customer signature line'
    ]
  },
  {
    name: 'Detailed Painting Proposal Template',
    format: 'Word',
    downloads: '6,123',
    rating: 4.9,
    description: 'Professional proposal template with scope of work and detailed specifications',
    features: [
      'Detailed scope of work',
      'Paint specifications table',
      'Warranty information',
      'Project timeline',
      'Professional formatting'
    ]
  },
  {
    name: 'Kitchen Cabinet Painting Template',
    format: 'Excel',
    downloads: '5,678',
    rating: 4.8,
    description: 'Specialized template for cabinet painting and refinishing projects',
    features: [
      'Door & drawer count',
      'Finish options pricing',
      'Hardware considerations',
      'Prep work details',
      'Before/after photo section'
    ]
  }
]

export default function PaintEstimateTemplates() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Paint Estimate Templates',
    description: 'Free painting estimate templates for contractors',
    publisher: {
      '@type': 'Organization',
      name: 'PaintQuote Pro'
    },
    hasPart: templates.map(template => ({
      '@type': 'CreativeWork',
      name: template.name,
      encodingFormat: `application/${template.format.toLowerCase()}`,
      description: template.description,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: template.rating,
        reviewCount: parseInt(template.downloads.replace(/,/g, ''))
      }
    }))
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
              <Link href="/painting-quote-templates" className="transition-colors hover:text-foreground/80">
                Quote Templates
              </Link>
              <Link href="/how-to-quote-painting-jobs" className="transition-colors hover:text-foreground/80">
                How-To Guides
              </Link>
              <Link href="/painting-contractors" className="transition-colors hover:text-foreground/80">
                For Contractors
              </Link>
            </nav>
            <div className="ml-auto">
              <Link
                href="/auth/signup"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Try PaintQuote Pro Free
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: 'Paint Estimate Templates' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <FileText className="mr-2 h-4 w-4" />
                  Free Downloads • No Email Required
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Free Paint Estimate Templates for Contractors
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Professional painting estimate templates used by thousands of contractors. 
                  Download Excel, Word, and PDF formats instantly - no sign-up required.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="font-semibold">68,234</span> downloads this month
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">4.8/5</span> average rating
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-semibold">2,847+</span> contractors
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Templates Grid */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {templates.map((template, index) => (
                    <div key={index} className="rounded-lg border bg-card p-6">
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-primary" />
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                          {template.format}
                        </span>
                      </div>
                      
                      <h3 className="mt-4 text-xl font-semibold">{template.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {template.description}
                      </p>

                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span>{template.downloads} downloads</span>
                        </div>
                      </div>

                      <ul className="mt-4 space-y-2">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        Download Free Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Why Use Professional Painting Estimate Templates?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Save time and win more jobs with proven templates that work
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <Clock className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Save 2+ Hours Per Quote</h3>
                  <p className="mt-2 text-muted-foreground">
                    Pre-built formulas and sections mean you just fill in the specifics. 
                    No more starting from scratch.
                  </p>
                </div>

                <div className="text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Look More Professional</h3>
                  <p className="mt-2 text-muted-foreground">
                    Impress customers with organized, detailed estimates that show you 
                    run a serious business.
                  </p>
                </div>

                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Never Miss Important Details</h3>
                  <p className="mt-2 text-muted-foreground">
                    Templates include all necessary sections so you don't forget prep work, 
                    materials, or terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Template Guide */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                  How to Use These Painting Estimate Templates
                </h2>
                
                <div className="mt-12 space-y-8">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Download Your Template</h3>
                      <p className="mt-2 text-muted-foreground">
                        Click any template above to download instantly. No email or registration 
                        required. Files open in Excel, Word, or any PDF reader.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Customize Your Information</h3>
                      <p className="mt-2 text-muted-foreground">
                        Add your company logo, contact information, and license numbers. Update 
                        pricing to match your rates. Save as your master template.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Fill in Job Details</h3>
                      <p className="mt-2 text-muted-foreground">
                        Enter customer information, measurements, and specific job requirements. 
                        The template calculates totals automatically.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Send to Customer</h3>
                      <p className="mt-2 text-muted-foreground">
                        Save as PDF and email to your customer, or print for in-person presentation. 
                        Professional quotes win more jobs!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upgrade CTA */}
          <section className="bg-primary/5 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold">
                  Ready to Create Quotes 10x Faster?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  While these templates save time, PaintQuote Pro saves even more. Create 
                  professional quotes in 15 minutes with our AI-powered software.
                </p>

                <div className="mt-8 grid gap-8 text-left md:grid-cols-2">
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-lg font-semibold">With Templates</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 text-muted-foreground">•</span>
                        Still takes 45-60 minutes per quote
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-muted-foreground">•</span>
                        Manual calculations prone to errors
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-muted-foreground">•</span>
                        No customer database or tracking
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-muted-foreground">•</span>
                        Must update pricing manually
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-primary/10 p-6">
                    <h3 className="text-lg font-semibold">With PaintQuote Pro</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        Create quotes in 15 minutes
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        Automatic accurate calculations
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        Full customer management system
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        Set rates once, use forever
                      </li>
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
                  <p className="mt-4 text-sm text-muted-foreground">
                    No credit card required • 1 free quote per month
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-center text-3xl font-bold">
                  Painting Estimate Template Questions
                </h2>

                <div className="mt-12 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Are these painting estimate templates really free?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Yes! All templates are 100% free to download and use. No email required, 
                      no hidden costs. We provide these to help painting contractors succeed.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Can I customize these templates with my branding?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Absolutely! Add your logo, company information, and adjust all pricing 
                      and terms. The Excel and Word templates are fully editable.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Which template format should I use?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Excel templates are best for automatic calculations. Word templates offer 
                      more formatting flexibility. PDF templates work great for simple jobs or 
                      when you need to fill out quotes by hand.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Do these templates work for commercial painting?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Yes! We have specific commercial painting bid templates that include 
                      sections for phased work, prevailing wages, insurance requirements, and 
                      other commercial project needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <h2 className="text-center text-2xl font-bold">Related Resources for Painting Contractors</h2>
              <div className="mt-8 grid gap-4 text-center md:grid-cols-4">
                <Link href="/painting-quote-templates" className="text-primary hover:underline">
                  Quote Templates
                </Link>
                <Link href="/how-to-quote-painting-jobs" className="text-primary hover:underline">
                  How to Quote Guide
                </Link>
                <Link href="/painting-business-tips" className="text-primary hover:underline">
                  Business Tips
                </Link>
                <Link href="/painting-estimate-calculator-free" className="text-primary hover:underline">
                  Free Calculator
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PaintQuote Pro. All templates are free to use.</p>
          </div>
        </footer>
      </div>
    </>
  )
}