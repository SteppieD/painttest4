import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Calendar, DollarSign, Building2, MapPin, CheckCircle, Clock, Users } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Commercial Office Building Case Study | 15-Story Corporate Headquarters',
  description: 'How we completed a 15-story office building painting project without disrupting daily operations. 250,000 sq ft painted in 6 weeks with zero business interruption.',
  keywords: 'commercial painting, office building painting, corporate painting contractor, commercial painter case study',
  openGraph: {
    title: 'Commercial Office Building Transformation - Painting Case Study',
    description: 'Zero-disruption painting of a 15-story corporate headquarters. See how we worked nights and weekends to transform 250,000 sq ft.',
    type: 'article',
    images: [{
      url: '/case-studies/commercial-office-hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Commercial office building painting project'
    }]
  },
  alternates: {
    canonical: '/case-studies/commercial-office-building'
  }
}

const projectDetails = {
  location: 'Downtown Charlotte, NC',
  buildingSize: '15 Floors',
  projectDuration: '6 Weeks',
  squareFootage: '250,000 sq ft',
  employees: '1,200 Daily Workers',
  shifts: 'Nights & Weekends',
  investment: '$385,000'
}

const challenges = [
  {
    title: 'Zero Business Disruption',
    description: 'Paint 250,000 sq ft while 1,200 employees work daily without any interruption to operations.'
  },
  {
    title: 'Security & Access Control',
    description: 'Navigate complex security protocols, background checks, and restricted access areas.'
  },
  {
    title: 'VOC Compliance',
    description: 'Use only low-VOC products to maintain air quality for workers returning each morning.'
  },
  {
    title: 'Tight Schedule',
    description: 'Complete entire project before Q4 earnings calls and holiday season.'
  }
]

const solutions = [
  {
    title: 'Night & Weekend Shifts',
    description: 'Deployed 3 rotating crews working 7 PM - 5 AM weekdays and full weekends.',
    impact: 'Zero workday disruptions'
  },
  {
    title: 'Security Integration',
    description: 'All crew members underwent background checks and received security badges with escort protocols.',
    impact: 'Full compliance achieved'
  },
  {
    title: 'Low-VOC Product Selection',
    description: 'Used Sherwin-Williams ProMar 200 Zero VOC throughout, with 2-hour dry time.',
    impact: 'No odor complaints'
  },
  {
    title: 'Floor-by-Floor Strategy',
    description: 'Completed 2-3 floors per week with systematic progression and quality checks.',
    impact: 'Ahead of schedule'
  }
]

const timeline = [
  {
    week: 'Week 1',
    description: 'Floors 1-3: Lobby, reception, and public areas',
    milestone: 'Zero-odor achievement'
  },
  {
    week: 'Week 2',
    description: 'Floors 4-6: General office spaces and meeting rooms',
    milestone: 'First quality inspection passed'
  },
  {
    week: 'Week 3',
    description: 'Floors 7-9: Open office areas and break rooms',
    milestone: '40% completion milestone'
  },
  {
    week: 'Week 4',
    description: 'Floors 10-12: Executive offices and boardrooms',
    milestone: 'Executive approval received'
  },
  {
    week: 'Week 5',
    description: 'Floors 13-15: C-suite and private offices',
    milestone: '90% completion'
  },
  {
    week: 'Week 6',
    description: 'Touch-ups, final inspection, and sign-off',
    milestone: 'Project completed early'
  }
]

const results = [
  { metric: 'Business Disruption', value: 'Zero Days Lost' },
  { metric: 'Employee Complaints', value: 'Zero Reported' },
  { metric: 'Schedule Performance', value: '3 Days Early' },
  { metric: 'Safety Incidents', value: 'Zero Accidents' }
]

export default function CommercialOfficeBuildingCaseStudy() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Commercial Office Building Transformation: 15-Story Corporate Headquarters',
    description: 'Case study of a zero-disruption commercial painting project for a 250,000 sq ft office building.',
    image: 'https://paintquotepro.com/case-studies/commercial-office-hero.jpg',
    datePublished: '2024-08-22',
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
            <nav className="flex items-center space-x-6 text-base font-medium">
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
                className="inline-flex h-9 items-center rounded-md bg-primary px-4 py-2 text-base font-medium text-primary-foreground shadow hover:bg-primary/90"
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
              { label: 'Commercial Office Building' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-base font-medium text-primary">
                  <Building2 className="mr-2 h-4 w-4" />
                  Commercial Case Study
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  15-Story Office Building Transformation
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  How we painted 250,000 sq ft of corporate offices without disrupting a 
                  single workday for 1,200 employees through strategic night and weekend scheduling.
                </p>
              </div>

              {/* Before/After Hero Image */}
              <div className="mt-12 overflow-hidden rounded-lg bg-muted">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-200">Building Transformation Image</span>
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
                  <p className="text-base text-gray-200">Location</p>
                  <p className="text-lg font-semibold">{projectDetails.location}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-base text-gray-200">Building Size</p>
                  <p className="text-lg font-semibold">{projectDetails.squareFootage}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-base text-gray-200">Work Schedule</p>
                  <p className="text-lg font-semibold">{projectDetails.shifts}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-base text-gray-200">Investment</p>
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
                <p className="text-lg text-gray-200 mb-8">
                  This Fortune 500 corporate headquarters required a complete interior refresh 
                  without any disruption to their 24/7 operations. With 1,200 employees working 
                  daily and sensitive areas requiring special clearance, this project demanded 
                  military-level precision in planning and execution.
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  {challenges.map((challenge, index) => (
                    <div key={index} className="rounded-lg border bg-card p-6">
                      <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
                      <p className="text-gray-200">{challenge.description}</p>
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
                <p className="text-lg text-gray-200 mb-8">
                  We developed a comprehensive strategy that prioritized business continuity 
                  while maintaining the highest quality standards. Our approach combined 
                  specialized scheduling, security compliance, and low-impact products.
                </p>
                <div className="space-y-6">
                  {solutions.map((solution, index) => (
                    <div key={index} className="rounded-lg bg-background p-6">
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                          <p className="text-gray-200 mb-2">{solution.description}</p>
                          <p className="text-base font-medium text-primary">
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

          {/* Week-by-Week Timeline */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">6-Week Project Timeline</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {timeline.map((week, index) => (
                    <div key={index} className="rounded-lg border bg-card p-6">
                      <div className="mb-3">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-base font-medium text-primary">
                          {week.week}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{week.description}</h3>
                      <p className="text-base text-gray-200">
                        <CheckCircle className="inline h-4 w-4 text-green-600 mr-1" />
                        {week.milestone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Key Strategies */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Key Success Strategies</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <div>
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">3-Crew Rotation</h3>
                    <p className="text-gray-200">
                      Rotating crews ensured fresh workers each shift, maintaining quality 
                      and safety standards throughout night work.
                    </p>
                  </div>
                  <div>
                    <Clock className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Time Management</h3>
                    <p className="text-gray-200">
                      Precise scheduling allowed completion of 2-3 floors weekly while 
                      ensuring areas were ready for morning business.
                    </p>
                  </div>
                  <div>
                    <CheckCircle className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Quality Control</h3>
                    <p className="text-gray-200">
                      Daily inspections and sign-offs ensured consistent quality across 
                      all 15 floors despite challenging conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">Project Results</h2>
                <div className="grid gap-6 md:grid-cols-2 mb-12">
                  {results.map((result, index) => (
                    <div key={index} className="bg-muted rounded-lg p-6 text-center">
                      <p className="text-base text-gray-200 mb-2">{result.metric}</p>
                      <p className="text-2xl font-bold text-primary">{result.value}</p>
                    </div>
                  ))}
                </div>

                {/* Client Testimonial */}
                <div className="bg-primary/5 rounded-lg p-8">
                  <blockquote className="text-lg italic mb-4">
                    &quot;PaintQuote Pro delivered exactly what they promised - a complete transformation 
                    of our 15-story headquarters without a single disruption to our operations. 
                    Their night crews were professional, quiet, and left each floor immaculate 
                    for our morning arrivals. The low-VOC products meant no complaints about odors, 
                    and the quality is exceptional. They finished early and under budget. This is 
                    how commercial painting should be done.how commercial painting should be done.how commercial painting should be done."quot;quot;
                  </blockquote>
                  <footer>
                    <strong>David Thompson</strong>
                    <p className="text-base text-gray-200">VP of Facilities, Fortune 500 Financial Services</p>
                  </footer>
                </div>

                {/* Additional Stats */}
                <div className="mt-12 grid gap-6 md:grid-cols-3 text-center">
                  <div>
                    <p className="text-4xl font-bold text-primary">1,200</p>
                    <p className="text-gray-200">Employees Unaffected</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-primary">168</p>
                    <p className="text-gray-200">Night Shift Hours</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-primary">100%</p>
                    <p className="text-gray-200">On-Time Completion</p>
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
                  Need Zero-Disruption Commercial Painting?
                </h2>
                <p className="text-xl mb-8 opacity-100">
                  Let&apos;s discuss how we can transform your commercial space without impacting 
                  your business operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow hover:bg-background/90"
                  >
                    Schedule Consultation
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
                <p className="text-base text-gray-200">
                  Professional painting contractors specializing in zero-disruption commercial 
                  projects and high-end residential properties.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Commercial Services</h3>
                <ul className="space-y-2 text-base text-gray-200">
                  <li>Office Buildings</li>
                  <li>Retail Spaces</li>
                  <li>Healthcare Facilities</li>
                  <li>Educational Institutions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Case Studies</h3>
                <ul className="space-y-2 text-base text-gray-200">
                  <li><Link href="/case-studies/luxury-home-transformation" className="hover:text-foreground">Luxury Home</Link></li>
                  <li><Link href="/case-studies/commercial-office-building" className="hover:text-foreground">Office Building</Link></li>
                  <li><Link href="/case-studies/historic-restoration" className="hover:text-foreground">Historic Restoration</Link></li>
                  <li><Link href="/case-studies/hoa-community-project" className="hover:text-foreground">HOA Community</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-base text-gray-200">
                  <li>1-800-PAINT-PRO</li>
                  <li>commercial@paintquotepro.com</li>
                  <li><Link href="/quote" className="hover:text-foreground">Get Free Quote</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
              <p>&copy; 2025 PaintQuote Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}