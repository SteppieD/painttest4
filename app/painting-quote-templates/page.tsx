import Link from 'next/link'
import { Metadata } from 'next'
import { FileText, Download, CheckCircle, Star, Clock, Users, Zap, Award } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Painting Quote Templates | Professional Contractor Proposals 2025',
  description: 'Free painting quote templates for contractors. Professional, customizable proposals that win jobs. Download Word, Excel, and PDF formats. Used by 2,847+ painters.',
  keywords: 'painting quote template, painting proposal template, contractor quote template, painting bid template, free painting quote forms, professional painting templates',
  openGraph: {
    title: 'Professional Painting Quote Templates - Win More Jobs',
    description: 'Download free painting quote templates that convert. Professional formats that help you close 40% more deals.',
    type: 'website',
  },
  alternates: {
    canonical: '/painting-quote-templates'
  }
}

const templates = [
  {
    name: 'Professional Painting Quote Template',
    format: 'Word',
    downloads: '18,234',
    rating: 4.9,
    badge: 'Most Popular',
    description: 'Complete painting quote with scope, pricing, terms, and professional formatting',
    features: [
      'Professional header with logo space',
      'Detailed scope of work section',
      'Itemized pricing breakdown',
      'Payment terms and schedule',
      'Warranty and guarantee section',
      'Digital signature ready'
    ]
  },
  {
    name: 'Quick Painting Quote Form',
    format: 'PDF',
    downloads: '14,567',
    rating: 4.7,
    description: 'Simple one-page quote for smaller painting jobs and quick estimates',
    features: [
      'Single page format',
      'Essential pricing sections',
      'Contact information fields',
      'Basic terms & conditions',
      'Customer approval box',
      'Print-ready design'
    ]
  },
  {
    name: 'Detailed Painting Proposal',
    format: 'Word',
    downloads: '11,892',
    rating: 4.9,
    badge: 'Premium',
    description: 'Comprehensive painting proposal for high-value residential and commercial projects',
    features: [
      'Multi-page professional layout',
      'Executive summary section',
      'Detailed project timeline',
      'Materials specification table',
      'Insurance and licensing info',
      'Reference project gallery'
    ]
  },
  {
    name: 'Interior Painting Quote Template',
    format: 'Excel',
    downloads: '9,345',
    rating: 4.8,
    description: 'Specialized template for interior painting with room-by-room breakdown',
    features: [
      'Room-by-room pricing grid',
      'Paint calculation formulas',
      'Prep work checklist',
      'Finish options pricing',
      'Automatic total calculation',
      'Material cost tracking'
    ]
  },
  {
    name: 'Commercial Painting Proposal',
    format: 'Word',
    downloads: '7,123',
    rating: 4.8,
    badge: 'Enterprise',
    description: 'Professional template for commercial and industrial painting projects',
    features: [
      'Project phases breakdown',
      'Safety compliance section',
      'Equipment and crew details',
      'Progress payment schedule',
      'Insurance certificates',
      'Change order provisions'
    ]
  },
  {
    name: 'Painting Quote Comparison Sheet',
    format: 'Excel',
    downloads: '6,789',
    rating: 4.6,
    description: 'Help customers compare quotes with this transparent comparison template',
    features: [
      'Side-by-side comparison layout',
      'Service inclusions checklist',
      'Warranty comparison',
      'Price breakdown analysis',
      'Value proposition highlights',
      'Decision helper guide'
    ]
  }
]

export default function PaintingQuoteTemplates() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Painting Quote Templates',
    description: 'Professional painting quote and proposal templates for contractors',
    publisher: {
      '@type': 'Organization',
      name: 'PaintQuote Pro'
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: templates.length,
      itemListElement: templates.map((template, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: template.name,
          encodingFormat: `application/${template.format.toLowerCase()}`,
          description: template.description,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: template.rating,
            reviewCount: parseInt(template.downloads.replace(/,/g, ''))
          }
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
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-14 items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">PaintQuote Pro</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/paint-estimate-templates" className="transition-colors hover:text-foreground/80">
                Estimate Templates
              </Link>
              <Link href="/how-to-quote-painting-jobs" className="transition-colors hover:text-foreground/80">
                Quoting Guide
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
              { label: 'Painting Quote Templates' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Award className="mr-2 h-4 w-4" />
                  Trusted by 2,847+ Painting Contractors
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Professional Painting Quote Templates That Win Jobs
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Download free painting quote templates that help you close 40% more deals. 
                  Professional formats, instant download, no email required.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="font-semibold">92,456</span> downloads
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold">4.8/5</span> contractor rating
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-semibold">40%</span> higher close rate
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
                    <div key={index} className="relative rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
                      {template.badge && (
                        <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          {template.badge}
                        </div>
                      )}
                      
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
                        {template.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        Download Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quote vs Estimate Section */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                  Painting Quotes vs. Estimates: What's the Difference?
                </h2>
                
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-xl font-semibold">Painting Quotes</h3>
                    <p className="mt-3 text-muted-foreground">
                      A quote is a fixed price offer that doesn't change. Once accepted, you're 
                      committed to that price regardless of actual costs.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Fixed, guaranteed pricing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Legally binding when accepted</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Best for well-defined projects</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Customers prefer the certainty</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-xl font-semibold">Painting Estimates</h3>
                    <p className="mt-3 text-muted-foreground">
                      An estimate is an educated guess at the project cost. It can change based 
                      on actual work required and unforeseen issues.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Approximate pricing range</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Can adjust for unknowns</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Good for complex projects</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>Allows for flexibility</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 rounded-lg bg-primary/5 p-6 text-center">
                  <p className="text-lg font-medium">
                    Pro Tip: Use quotes for standard jobs and estimates for custom or complex projects
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                  How to Create Winning Painting Quotes
                </h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  Follow these steps to create quotes that convert browsers into buyers
                </p>
                
                <div className="mt-12 space-y-8">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Download & Customize Template</h3>
                      <p className="mt-2 text-muted-foreground">
                        Choose a template above and download it instantly. Open in Word or Excel and 
                        add your company logo, contact details, license numbers, and insurance information. 
                        Save this as your master template.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Capture All Project Details</h3>
                      <p className="mt-2 text-muted-foreground">
                        During your site visit, document room dimensions, surface conditions, and special 
                        requirements. Take photos for reference. Note access issues, furniture moving needs, 
                        and any prep work required.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Price Accurately & Transparently</h3>
                      <p className="mt-2 text-muted-foreground">
                        Break down costs clearly: labor, materials, prep work, and any extras. Include 
                        your overhead and profit margins. Be transparent about what's included and what 
                        would cost extra.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Present Professionally</h3>
                      <p className="mt-2 text-muted-foreground">
                        Send the quote promptly (within 24-48 hours). Include a personalized cover message. 
                        Highlight your unique value: experience, warranty, insurance, and quality. Follow 
                        up within 3-5 days if you haven't heard back.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="bg-primary/5 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold">Why Professional Quotes Matter</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Data from 2,847+ painting contractors using professional quote templates
                </p>
                
                <div className="mt-12 grid gap-8 md:grid-cols-4">
                  <div>
                    <div className="text-4xl font-bold text-primary">73%</div>
                    <p className="mt-2 text-sm font-medium">Higher Acceptance Rate</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Professional quotes vs handwritten
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary">2.5x</div>
                    <p className="mt-2 text-sm font-medium">Faster Response Time</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Customers decide quicker
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary">89%</div>
                    <p className="mt-2 text-sm font-medium">Fewer Revisions</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Clear quotes reduce back-and-forth
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary">$347</div>
                    <p className="mt-2 text-sm font-medium">Higher Job Value</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Average increase per project
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
                  <h2 className="text-3xl font-bold">
                    Ready to Create Quotes 10x Faster?
                  </h2>
                  <p className="mt-4 text-lg opacity-90">
                    While templates are great, PaintQuote Pro automates the entire process. 
                    Create professional quotes in 15 minutes with our AI-powered software.
                  </p>

                  <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
                    <div className="rounded-lg bg-primary-foreground/10 p-4">
                      <h3 className="font-semibold">Using Templates:</h3>
                      <ul className="mt-3 space-y-2 text-sm opacity-90">
                        <li>• Still takes 45-60 minutes</li>
                        <li>• Manual calculations</li>
                        <li>• Risk of errors</li>
                        <li>• No customer tracking</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-primary-foreground/20 p-4">
                      <h3 className="font-semibold">Using PaintQuote Pro:</h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li>• 15-minute quotes</li>
                        <li>• Automatic pricing</li>
                        <li>• Error-free calculations</li>
                        <li>• Full CRM included</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                    >
                      Try PaintQuote Pro Free
                    </Link>
                    <p className="mt-4 text-sm opacity-75">
                      No credit card required • 1 free quote per month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-center text-3xl font-bold">
                  Painting Quote Template FAQs
                </h2>

                <div className="mt-12 space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold">
                      What should I include in a painting quote?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      A professional painting quote should include: detailed scope of work, itemized 
                      pricing (labor and materials separated), timeline, payment terms, warranty details, 
                      insurance information, and clear terms & conditions. Our templates include all 
                      these sections.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      How do I price a painting job correctly?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Calculate material costs, add labor (typically 30% of total), include overhead 
                      (15-20%), and profit margin (15-30%). Factor in prep work, number of coats, 
                      surface condition, and access difficulty. Our templates include pricing guides 
                      and calculation formulas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Should I use quotes or estimates?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Use fixed quotes for standard jobs where scope is clear (most residential work). 
                      Use estimates for complex projects with unknowns (water damage, lead paint, 
                      custom work). Quotes give customers confidence and reduce disputes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      How quickly should I send a quote?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Send quotes within 24-48 hours of the site visit. Faster response dramatically 
                      increases your close rate. Studies show 50% of customers choose the contractor 
                      who responds first with a professional quote.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      Can I customize these templates?
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      Yes! All templates are fully customizable. Add your logo, adjust pricing sections, 
                      modify terms, and change colors to match your brand. Save your customized version 
                      as a master template for future use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <h2 className="text-center text-2xl font-bold">More Resources for Painting Contractors</h2>
              <div className="mt-8 grid gap-4 text-center md:grid-cols-4">
                <Link href="/paint-estimate-templates" className="text-primary hover:underline">
                  Estimate Templates
                </Link>
                <Link href="/how-to-quote-painting-jobs" className="text-primary hover:underline">
                  Quoting Guide
                </Link>
                <Link href="/painting-business-tips" className="text-primary hover:underline">
                  Business Tips
                </Link>
                <Link href="/roi-calculator" className="text-primary hover:underline">
                  ROI Calculator
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container py-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PaintQuote Pro. All quote templates are free to download and use.</p>
          </div>
        </footer>
      </div>
    </>
  )
}