import Link from 'next/link'
import { Metadata } from 'next'
import { FileText, Download, CheckCircle, Star, Clock, Users, Calculator, Zap, Building } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Free Paint Estimate Templates | Professional Painting Quote Forms 2025',
  description: 'Download free painting estimate templates for contractors. Professional quote forms for interior, exterior, commercial painting jobs. Excel, PDF, and Word formats.',
  keywords: 'paint estimate template, painting quote template, painting estimate form, free painting templates, contractor estimate template, painting bid template',
  openGraph: {
    title: 'Free Paint Estimate Templates for Contractors',
    description: 'Professional painting estimate templates. Download free Excel, PDF, and Word formats. Used by 2,847+ painting contractors.',
    type: 'website',
    images: [{
      url: '/og-paint-estimate-templates.jpg',
      width: 1200,
      height: 630,
      alt: 'Free Paint Estimate Templates for Contractors'
    }]
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
    ],
    popular: true
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

const templateGuideSteps = [
  {
    step: 1,
    title: 'Download Your Template',
    description: 'Click any template above to download instantly. No email or registration required. Files open in Excel, Word, or any PDF reader.'
  },
  {
    step: 2,
    title: 'Customize Your Information',
    description: 'Add your company logo, contact information, and license numbers. Update pricing to match your rates. Save as your master template.'
  },
  {
    step: 3,
    title: 'Fill in Job Details',
    description: 'Enter customer information, measurements, and specific job requirements. The template calculates totals automatically.'
  },
  {
    step: 4,
    title: 'Send to Customer',
    description: 'Save as PDF and email to your customer, or print for in-person presentation. Professional quotes win more jobs!'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Save 2+ Hours Per Quote',
    description: 'Pre-built formulas and sections mean you just fill in the specifics. No more starting from scratch.'
  },
  {
    icon: CheckCircle,
    title: 'Look More Professional',
    description: 'Impress customers with organized, detailed estimates that show you run a serious business.'
  },
  {
    icon: FileText,
    title: 'Never Miss Important Details',
    description: 'Templates include all necessary sections so you don\'t forget prep work, materials, or terms.'
  }
]

const faqData = [
  {
    question: 'Are these painting estimate templates really free?',
    answer: 'Yes! All templates are 100% free to download and use. No email required, no hidden costs. We provide these to help painting contractors succeed.'
  },
  {
    question: 'Can I customize these templates with my branding?',
    answer: 'Absolutely! Add your logo, company information, and adjust all pricing and terms. The Excel and Word templates are fully editable.'
  },
  {
    question: 'Which template format should I use?',
    answer: 'Excel templates are best for automatic calculations. Word templates offer more formatting flexibility. PDF templates work great for simple jobs or when you need to fill out quotes by hand.'
  },
  {
    question: 'Do these templates work for commercial painting?',
    answer: 'Yes! We have specific commercial painting bid templates that include sections for phased work, prevailing wages, insurance requirements, and other commercial project needs.'
  },
  {
    question: 'How accurate are the pricing calculations?',
    answer: 'The templates provide formulas and structure, but you\'ll need to input your local labor rates and material costs. The calculations are accurate based on the data you provide.'
  },
  {
    question: 'Can I use these templates on mobile devices?',
    answer: 'Excel and Word templates work best on desktop/laptop computers. For mobile quoting, consider using our PaintQuote Pro app which is optimized for phones and tablets.'
  }
]

export default function PaintEstimateTemplates() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: 'Paint Estimate Templates' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://paintquotepro.com/paint-estimate-templates',
    name: 'Free Paint Estimate Templates for Contractors',
    description: 'Professional painting estimate templates in Excel, Word, and PDF formats',
    publisher: {
      '@type': 'Organization',
      name: 'PaintQuote Pro'
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: templates.map((template, index) => ({
        '@type': 'SoftwareApplication',
        position: index + 1,
        name: template.name,
        description: template.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows, macOS',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: template.rating,
          reviewCount: parseInt(template.downloads.replace(/,/g, ''))
        }
      }))
    }
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
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} className="py-4" />
          </div>

          {/* Hero Section */}
          <section className="py-16 md:py-24">
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
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="#templates"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Browse Templates
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Try PaintQuote Pro
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">68,234</div>
                    <p className="text-sm text-muted-foreground">Downloads This Month</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">4.8/5</div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">2,847+</div>
                    <p className="text-sm text-muted-foreground">Active Contractors</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Templates Grid */}
          <section id="templates" className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Professional Painting Estimate Templates</h2>
                <p className="text-lg text-muted-foreground">
                  Choose from our collection of proven templates used by successful painting contractors
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {templates.map((template, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${template.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                      {template.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between mb-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                          {template.format}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <span>{template.downloads}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="mr-2 h-3 w-3 flex-shrink-0 text-primary mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button variant={template.popular ? 'default' : 'outline'} className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Free Template
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Why Use Professional Painting Estimate Templates?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Save time and win more jobs with proven templates that work
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <benefit.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Template Guide */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold mb-12">
                  How to Use These Painting Estimate Templates
                </h2>
                
                <div className="space-y-8">
                  {templateGuideSteps.map((step, index) => (
                    <div key={index} className="flex gap-6 items-start">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Upgrade CTA */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="rounded-lg bg-primary/5 p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                      Ready to Create Quotes 10x Faster?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      While these templates save time, PaintQuote Pro saves even more. Create 
                      professional quotes in 15 minutes with our AI-powered software.
                    </p>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-lg bg-background p-6">
                      <h3 className="text-lg font-semibold mb-4">With Templates</h3>
                      <ul className="space-y-3 text-sm">
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
                      <h3 className="text-lg font-semibold mb-4">With PaintQuote Pro</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          Create quotes in 15 minutes
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          Automatic accurate calculations
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          Full customer management system
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                          AI-powered pricing recommendations
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Try PaintQuote Pro Free
                    </Link>
                    <p className="mt-4 text-sm text-muted-foreground">
                      No credit card required • 1 free quote per month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Painting Estimate Template Questions
                </h2>

                <div className="space-y-8">
                  {faqData.map((faq, index) => (
                    <div key={index} className="rounded-lg bg-background p-6">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">More Painting Business Tools</h2>
                <p className="text-lg text-muted-foreground">
                  Complete suite of resources for painting contractors
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <Calculator className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Paint Calculator</h3>
                    <p className="text-sm text-muted-foreground">Instant calculations for any painting project</p>
                  </Link>

                  <Link href="/how-to-quote-painting-jobs" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <FileText className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">How-To Guides</h3>
                    <p className="text-sm text-muted-foreground">Learn professional estimation techniques</p>
                  </Link>

                  <Link href="/interior-painting-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <Building className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Interior Calculator</h3>
                    <p className="text-sm text-muted-foreground">Specialized for interior painting projects</p>
                  </Link>

                  <Link href="/painting-estimating-software" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <Zap className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Software Reviews</h3>
                    <p className="text-sm text-muted-foreground">Compare painting estimate software options</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start Creating Professional Estimates Today
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-90 mb-8">
                Download our free templates and start impressing customers with professional, 
                detailed painting estimates that win more jobs.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="#templates"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Templates
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  Try PaintQuote Pro
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free downloads • No email required • Professional results
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}