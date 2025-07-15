import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Home, Building2, Award, Users } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SharedNavigation from '@/components/shared-navigation'

export const metadata: Metadata = {
  title: 'Painting Project Portfolio | Our Work | PaintQuote Pro',
  description: 'Explore our painting project portfolio. From luxury homes to commercial buildings, see real transformations by professional painting contractors.',
  keywords: 'painting portfolio, painting projects, painting before after, contractor work examples, painting transformations',
  openGraph: {
    title: 'Painting Project Portfolio - Real Transformations',
    description: 'See our work: luxury homes, commercial buildings, historic restorations, and HOA communities painted to perfection.',
    type: 'website',
    images: [{
      url: '/og-painting-projects.jpg',
      width: 1200,
      height: 630,
      alt: 'PaintQuote Pro Project Portfolio'
    }]
  },
  alternates: {
    canonical: '/painting-projects'
  }
}

const caseStudies = [
  {
    icon: Home,
    category: 'Residential',
    title: 'Luxury Estate Transformation',
    description: '$8.5M Paradise Valley estate painted in extreme heat. Custom color matching, 14-day completion, zero weather delays.',
    location: 'Paradise Valley, AZ',
    projectValue: '$68,500',
    keyMetric: '2 Days Early',
    link: '/case-studies/luxury-home-transformation',
    featured: true
  },
  {
    icon: Building2,
    category: 'Commercial',
    title: '15-Story Office Building',
    description: '250,000 sq ft painted without disrupting 1,200 daily workers. Night shifts, low-VOC products, zero business interruption.',
    location: 'Charlotte, NC',
    projectValue: '$385,000',
    keyMetric: 'Zero Disruption',
    link: '/case-studies/commercial-office-building',
    featured: true
  },
  {
    icon: Award,
    category: 'Historic Restoration',
    title: '1891 Victorian Mansion',
    description: '133-year-old landmark restored to original glory. Lead-safe practices, paint archaeology, preservation award winner.',
    location: 'San Francisco, CA',
    projectValue: '$142,000',
    keyMetric: 'Preservation Award',
    link: '/case-studies/historic-restoration',
    featured: false
  },
  {
    icon: Users,
    category: 'HOA Community',
    title: '156-Home Development',
    description: 'Entire HOA community transformed in 10 weeks. Zone-based scheduling, digital tracking, 30% volume savings.',
    location: 'Scottsdale, AZ',
    projectValue: '$1,275,000',
    keyMetric: '98% Satisfaction',
    link: '/case-studies/hoa-community-project',
    featured: false
  }
]

export default function PaintingProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Painting Project Portfolio',
    description: 'Portfolio of professional painting projects',
    url: 'https://paintquotepro.com/painting-projects',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: caseStudies.map((study, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: study.title,
          description: study.description,
          url: `https://paintquotepro.com${study.link}`
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
        <SharedNavigation />

        <main>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Our Work' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Our Painting Project Portfolio
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Real projects, real results. Explore our portfolio of successful painting 
                  transformations from luxury estates to commercial complexes.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Case Studies */}
          <section className="pb-16">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {caseStudies.filter(study => study.featured).map((study, index) => {
                  const Icon = study.icon
                  return (
                    <div key={index} className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow">
                      <Link href={study.link} className="block p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-primary/10 p-3">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-primary">{study.category}</p>
                              <h3 className="text-2xl font-bold">{study.title}</h3>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">
                          {study.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-semibold">{study.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Project Value</p>
                            <p className="font-semibold">{study.projectValue}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Key Result</p>
                            <p className="font-semibold text-primary">{study.keyMetric}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                          View Full Project Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* All Case Studies */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">All Projects</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {caseStudies.map((study, index) => {
                  const Icon = study.icon
                  return (
                    <div key={index} className="rounded-lg bg-background p-6 hover:shadow-md transition-shadow">
                      <Link href={study.link} className="block">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2">
                              <span className="text-sm font-medium text-primary">{study.category}</span>
                              <h3 className="text-xl font-semibold">{study.title}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">
                              {study.description}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{study.location}</span>
                              <span className="text-primary font-medium flex items-center">
                                View Details
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Results Summary */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">Combined Project Impact</h2>
                <div className="grid gap-6 md:grid-cols-4 text-center">
                  <div className="rounded-lg bg-muted p-6">
                    <p className="text-3xl font-bold text-primary">$1.87M</p>
                    <p className="text-sm text-muted-foreground mt-2">Total Project Value</p>
                  </div>
                  <div className="rounded-lg bg-muted p-6">
                    <p className="text-3xl font-bold text-primary">687K+</p>
                    <p className="text-sm text-muted-foreground mt-2">Square Feet Painted</p>
                  </div>
                  <div className="rounded-lg bg-muted p-6">
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground mt-2">On-Time Delivery</p>
                  </div>
                  <div className="rounded-lg bg-muted p-6">
                    <p className="text-3xl font-bold text-primary">4.9/5</p>
                    <p className="text-sm text-muted-foreground mt-2">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">What Sets Our Projects Apart</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Award className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Proven Excellence</h3>
                    <p className="text-muted-foreground">
                      Award-winning work recognized by preservation societies, HOA boards, 
                      and commercial property managers nationwide.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Client-Centric Approach</h3>
                    <p className="text-muted-foreground">
                      From luxury homeowners to Fortune 500 facilities managers, we adapt 
                      our process to exceed every client's unique needs.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Building2 className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Scale & Expertise</h3>
                    <p className="text-muted-foreground">
                      Whether it's a single estate or 156 homes, we have the resources 
                      and systems to deliver consistent quality at any scale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contractor CTA Section */}
          <section className="py-16 bg-primary/5">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Are You a Painting Contractor?
                </h2>
                <p className="text-xl mb-8 text-muted-foreground">
                  Join thousands of contractors using PaintQuote Pro to create professional 
                  quotes in minutes and win more jobs like these.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
                  >
                    See Contractor Success Stories
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Property Owner CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Need Professional Painting Services?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Get your free quote today and discover why property owners trust us 
                  for exceptional results, on time and on budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow hover:bg-background/90"
                  >
                    Get Your Free Quote
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                  >
                    Schedule Consultation
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
                  Professional painting contractors and software solutions for the painting industry.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">For Property Owners</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/painting-projects" className="hover:text-foreground">View Our Work</Link></li>
                  <li><Link href="/locations" className="hover:text-foreground">Service Areas</Link></li>
                  <li><Link href="/quote" className="hover:text-foreground">Get Free Quote</Link></li>
                  <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">For Contractors</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/case-studies" className="hover:text-foreground">Success Stories</Link></li>
                  <li><Link href="/painting-estimate-software" className="hover:text-foreground">Quoting Software</Link></li>
                  <li><Link href="/roi-calculator" className="hover:text-foreground">ROI Calculator</Link></li>
                  <li><Link href="/auth/signup" className="hover:text-foreground">Start Free Trial</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/how-to-quote-painting-jobs" className="hover:text-foreground">How to Quote</Link></li>
                  <li><Link href="/paint-estimate-templates" className="hover:text-foreground">Templates</Link></li>
                  <li><Link href="/painting-contractors" className="hover:text-foreground">Find Contractors</Link></li>
                  <li>1-800-PAINT-PRO</li>
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