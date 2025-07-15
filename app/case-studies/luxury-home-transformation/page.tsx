import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Calendar, DollarSign, Home, MapPin, CheckCircle, Clock, Star } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Luxury Home Transformation Case Study | $8.5M Estate Painting Project',
  description: 'See how we transformed a $8.5M luxury estate with premium painting services. Complete exterior renovation completed in 14 days with zero weather delays.',
  keywords: 'luxury home painting, estate painting, high-end painting contractor, mansion painting, premium paint services',
  openGraph: {
    title: 'Luxury Estate Transformation - Complete Painting Case Study',
    description: 'From weathered to wonderful: How we transformed an $8.5M estate with premium painting services.',
    type: 'article',
    images: [{
      url: '/case-studies/luxury-home-hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Luxury home painting transformation'
    }]
  },
  alternates: {
    canonical: '/case-studies/luxury-home-transformation'
  }
}

const projectDetails = {
  location: 'Paradise Valley, Arizona',
  propertyValue: '$8.5 Million',
  projectDuration: '14 Days',
  squareFootage: '12,500 sq ft',
  paintUsed: '187 Gallons',
  crew: '12 Professionals',
  investment: '$68,500'
}

const challenges = [
  {
    title: 'Extreme Weather Conditions',
    description: 'Arizona summer with temperatures exceeding 115°F required specialized scheduling and heat-resistant products.'
  },
  {
    title: 'Intricate Architectural Details',
    description: '200+ custom corbels, detailed stone work, and hand-carved wooden features required meticulous attention.'
  },
  {
    title: 'Color Matching Historic Elements',
    description: 'Matching existing natural stone colors while enhancing the overall aesthetic appeal.'
  },
  {
    title: 'Tight Timeline',
    description: 'Project needed completion before a major family event with zero room for delays.'
  }
]

const solutions = [
  {
    title: 'Temperature Management',
    description: 'Started work at 4 AM daily, used cooling tents, and applied specialized heat-resistant primers.',
    impact: 'Zero heat-related delays'
  },
  {
    title: 'Detail Work Specialists',
    description: 'Assigned master craftsmen specifically for intricate architectural elements.',
    impact: '100% detail preservation'
  },
  {
    title: 'Custom Color Development',
    description: 'Created 6 custom colors using spectrophotometer technology for perfect matches.',
    impact: 'Seamless color transitions'
  },
  {
    title: 'Project Management',
    description: 'Deployed 12-person crew with zone assignments and daily progress tracking.',
    impact: 'Completed 2 days early'
  }
]

const results = [
  { metric: 'Project Timeline', value: 'Completed 2 Days Early' },
  { metric: 'Client Satisfaction', value: '10/10 Rating' },
  { metric: 'Warranty Claims', value: 'Zero in 3 Years' },
  { metric: 'Property Value Impact', value: '+$450K Appraisal Increase' }
]

export default function LuxuryHomeTransformation() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Luxury Home Transformation: $8.5M Estate Painting Project',
    description: 'Complete case study of a high-end residential painting project in Paradise Valley, Arizona.',
    image: 'https://paintquotepro.com/case-studies/luxury-home-hero.jpg',
    datePublished: '2024-06-15',
    author: {
      '@type': 'Organization',
      name: 'PaintQuote Pro'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PaintQuote Pro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://paintquotepro.com/logo.png'
      }
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
              <Link href="/services" className="transition-colors hover:text-foreground/80">
                Services
              </Link>
              <Link href="/case-studies" className="transition-colors hover:text-foreground/80">
                Case Studies
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="/contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
            <div className="ml-auto">
              <Link
                href="/quote"
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Get Free Quote
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case Studies', href: '/case-studies' },
              { label: 'Luxury Home Transformation' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Home className="mr-2 h-4 w-4" />
                  Residential Case Study
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Luxury Estate Transformation
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  How we transformed a $8.5M Paradise Valley estate with premium painting 
                  services, completing the project 2 days ahead of schedule despite extreme heat.
                </p>
              </div>

              {/* Before/After Hero Image */}
              <div className="mt-12 overflow-hidden rounded-lg bg-muted">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground">Before & After Comparison</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Overview */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Project Overview</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                <div className="bg-background rounded-lg p-6 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-lg font-semibold">{projectDetails.location}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Home className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Property Size</p>
                  <p className="text-lg font-semibold">{projectDetails.squareFootage}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="text-lg font-semibold">{projectDetails.projectDuration}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Investment</p>
                  <p className="text-lg font-semibold">{projectDetails.investment}</p>
                </div>
              </div>
            </div>
          </section>

          {/* The Challenge */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  This Paradise Valley estate presented unique challenges that required our 
                  most experienced team and innovative solutions. The combination of extreme 
                  weather, intricate architectural details, and a non-negotiable deadline 
                  demanded flawless execution.
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  {challenges.map((challenge, index) => (
                    <div key={index} className="rounded-lg border bg-card p-6">
                      <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
                      <p className="text-muted-foreground">{challenge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Our Solution */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Our Solution</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We developed a comprehensive strategy that addressed each challenge with 
                  precision. Our approach combined advanced technology, expert craftsmanship, 
                  and meticulous project management.
                </p>
                <div className="space-y-6">
                  {solutions.map((solution, index) => (
                    <div key={index} className="rounded-lg bg-background p-6">
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                          <p className="text-muted-foreground mb-2">{solution.description}</p>
                          <p className="text-sm font-medium text-primary">
                            Result: {solution.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Process Timeline */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Project Timeline</h2>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        1
                      </div>
                      <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-semibold mb-2">Days 1-2: Preparation & Protection</h3>
                      <p className="text-muted-foreground">
                        Extensive masking, pressure washing, and surface preparation. Protected 
                        landscaping and installed cooling systems for crew.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        2
                      </div>
                      <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-semibold mb-2">Days 3-5: Primer Application</h3>
                      <p className="text-muted-foreground">
                        Applied specialized heat-resistant primer across all surfaces. Extra 
                        attention to stucco and wood transitions.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        3
                      </div>
                      <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-semibold mb-2">Days 6-10: Primary Coating</h3>
                      <p className="text-muted-foreground">
                        Applied custom-matched paint colors with airless sprayers and hand-brushed 
                        all detailed architectural elements.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        4
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Days 11-12: Detail & Touch-ups</h3>
                      <p className="text-muted-foreground">
                        Final detail work, quality inspection, and client walkthrough. Completed 
                        2 days ahead of schedule.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">Project Results</h2>
                <div className="grid gap-6 md:grid-cols-2 mb-12">
                  {results.map((result, index) => (
                    <div key={index} className="bg-background rounded-lg p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">{result.metric}</p>
                      <p className="text-2xl font-bold text-primary">{result.value}</p>
                    </div>
                  ))}
                </div>

                {/* Client Testimonial */}
                <div className="bg-primary/5 rounded-lg p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "The PaintQuote Pro team exceeded every expectation. They managed the extreme 
                    heat professionally, treated our home with incredible care, and the attention 
                    to detail was extraordinary. The custom color matching on our stone work is 
                    perfect. We've received countless compliments, and our property value increased 
                    significantly. This was an investment that paid for itself."
                  </blockquote>
                  <footer>
                    <strong>Robert & Jennifer Morrison</strong>
                    <p className="text-sm text-muted-foreground">Paradise Valley Homeowners</p>
                  </footer>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Key Takeaways</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Time Management</h3>
                    <p className="text-muted-foreground">
                      Strategic scheduling and crew deployment can overcome weather challenges 
                      and tight deadlines.
                    </p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Quality Focus</h3>
                    <p className="text-muted-foreground">
                      Attention to architectural details and custom color matching creates 
                      exceptional results.
                    </p>
                  </div>
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Value Creation</h3>
                    <p className="text-muted-foreground">
                      Professional painting is an investment that enhances property value 
                      and curb appeal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Transform Your Luxury Property?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Let's discuss how we can enhance your home's beauty and value with our 
                  premium painting services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow hover:bg-background/90"
                  >
                    Get Your Free Quote
                  </Link>
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                  >
                    View More Case Studies
                    <ArrowRight className="ml-2 h-4 w-4" />
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
                <h3 className="text-lg font-semibold mb-4">About PaintQuote Pro</h3>
                <p className="text-sm text-muted-foreground">
                  Professional painting contractors specializing in high-end residential 
                  and commercial projects across the United States.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Interior Painting</li>
                  <li>Exterior Painting</li>
                  <li>Cabinet Refinishing</li>
                  <li>Commercial Painting</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Case Studies</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/case-studies/luxury-home-transformation" className="hover:text-foreground">Luxury Home</Link></li>
                  <li><Link href="/case-studies/commercial-office-building" className="hover:text-foreground">Office Building</Link></li>
                  <li><Link href="/case-studies/historic-restoration" className="hover:text-foreground">Historic Restoration</Link></li>
                  <li><Link href="/case-studies/hoa-community-project" className="hover:text-foreground">HOA Community</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>1-800-PAINT-PRO</li>
                  <li>info@paintquotepro.com</li>
                  <li><Link href="/quote" className="hover:text-foreground">Get Free Quote</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 PaintQuote Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}