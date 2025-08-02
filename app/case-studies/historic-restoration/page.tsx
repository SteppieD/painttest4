import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Calendar, DollarSign, Building, MapPin, CheckCircle, Clock, Award, Shield } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Historic Building Restoration Case Study | 1890s Victorian Mansion',
  description: 'Learn how we restored a 130-year-old Victorian mansion to its original glory while adding modern protection. Lead-safe practices, period-accurate colors, and preservation expertise.',
  keywords: 'historic restoration, Victorian mansion painting, historic building restoration, preservation painting, lead-safe painting contractor',
  openGraph: {
    title: 'Historic Victorian Mansion Restoration - Painting Case Study',
    description: 'From deteriorating to distinguished: Complete restoration of an 1890s Victorian mansion with period-accurate finishes.',
    type: 'article',
    images: [{
      url: '/case-studies/historic-restoration-hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Historic Victorian mansion restoration'
    }]
  },
  alternates: {
    canonical: '/case-studies/historic-restoration'
  }
}

const projectDetails = {
  location: 'San Francisco, CA',
  buildingAge: '133 Years (Built 1891)',
  projectDuration: '8 Weeks',
  squareFootage: '7,800 sq ft',
  colorSchemes: '14 Historic Colors',
  crew: '8 Preservation Specialists',
  investment: '$142,000'
}

const challenges = [
  {
    title: 'Lead Paint Removal',
    description: '12 layers of lead-based paint requiring EPA RRP certified removal while preserving original millwork.'
  },
  {
    title: 'Historical Accuracy',
    description: 'Matching original 1890s color schemes and finishes based on paint archaeology and historic records.'
  },
  {
    title: 'Deteriorating Wood Elements',
    description: 'Extensive wood rot, damaged corbels, and failing window glazing requiring restoration.'
  },
  {
    title: 'Preservation Standards',
    description: 'Meeting strict Secretary of Interior Standards for historic preservation and local landmark requirements.'
  }
]

const solutions = [
  {
    title: 'Lead-Safe Protocols',
    description: 'Implemented full EPA RRP containment, HEPA filtration, and chemical stripping to safely remove lead paint.',
    impact: 'Zero lead exposure incidents'
  },
  {
    title: 'Paint Archaeology',
    description: 'Conducted microscopic paint analysis to identify original 1891 color palette and finishes.',
    impact: 'Discovered authentic 14-color scheme'
  },
  {
    title: 'Restoration Carpentry',
    description: 'Master craftsmen repaired and replicated damaged elements using traditional techniques.',
    impact: '100% original details preserved'
  },
  {
    title: 'Museum-Quality Finishes',
    description: 'Applied linseed oil primer and custom-mixed historic paints for authentic appearance and longevity.',
    impact: 'Approved by Preservation Society'
  }
]

const restorationPhases = [
  {
    phase: 'Phase 1: Assessment',
    duration: '1 Week',
    activities: 'Paint analysis, lead testing, structural evaluation, historic documentation',
    milestone: 'Preservation plan approved'
  },
  {
    phase: 'Phase 2: Lead Abatement',
    duration: '2 Weeks',
    activities: 'Containment setup, chemical stripping, HEPA vacuuming, clearance testing',
    milestone: 'EPA clearance achieved'
  },
  {
    phase: 'Phase 3: Wood Restoration',
    duration: '2 Weeks',
    activities: 'Rot repair, element replication, window glazing, consolidation',
    milestone: 'All millwork restored'
  },
  {
    phase: 'Phase 4: Priming',
    duration: '1 Week',
    activities: 'Linseed oil primer application, spot priming repairs, sealing',
    milestone: 'Surface preparation complete'
  },
  {
    phase: 'Phase 5: Historic Painting',
    duration: '2 Weeks',
    activities: 'Multiple color application, detail work, gold leaf accents, final coating',
    milestone: 'Period-accurate finish achieved'
  }
]

const results = [
  { metric: 'Historic Accuracy', value: '100% Period Correct' },
  { metric: 'Lead Clearance', value: 'EPA Certified Safe' },
  { metric: 'Preservation Award', value: 'City Landmark Honor' },
  { metric: 'Expected Lifespan', value: '30+ Years' }
]

export default function HistoricRestorationCaseStudy() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Historic Victorian Mansion Restoration: 1890s Preservation Project',
    description: 'Case study of a complete historic restoration of a 133-year-old Victorian mansion.',
    image: 'https://paintquotepro.com/case-studies/historic-restoration-hero.jpg',
    datePublished: '2024-09-15',
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
              { label: 'Historic Restoration' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-base font-medium text-primary">
                  <Building className="mr-2 h-4 w-4" />
                  Historic Restoration Case Study
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Victorian Mansion Restoration
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  How we brought a deteriorating 1891 Victorian mansion back to its original 
                  splendor using period-accurate techniques and lead-safe practices while 
                  meeting strict preservation standards.
                </p>
              </div>

              {/* Before/After Hero Image */}
              <div className="mt-12 overflow-hidden rounded-lg bg-muted">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-200">Historic Mansion Before & After</span>
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
                  <Building className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-base text-gray-200">Building Age</p>
                  <p className="text-lg font-semibold">{projectDetails.buildingAge}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-base text-gray-200">Historic Colors</p>
                  <p className="text-lg font-semibold">{projectDetails.colorSchemes}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-base text-gray-200">Project Duration</p>
                  <p className="text-lg font-semibold">{projectDetails.projectDuration}</p>
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
                  This Queen Anne Victorian mansion, a designated city landmark, had suffered 
                  133 years of weathering and multiple inappropriate paint jobs. The building 
                  required complete restoration while adhering to the Secretary of Interior&apos;s 
                  Standards for the Treatment of Historic Properties.
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
                  We assembled a team of preservation specialists and implemented museum-quality 
                  restoration techniques. Our approach balanced historical authenticity with 
                  modern protective technologies to ensure another century of beauty.
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

          {/* Restoration Phases */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">8-Week Restoration Timeline</h2>
                <div className="space-y-6">
                  {restorationPhases.map((phase, index) => (
                    <div key={index} className="rounded-lg border bg-card p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold">{phase.phase}</h3>
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-base font-medium text-primary">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-gray-200 mb-2">{phase.activities}</p>
                      <p className="text-base text-primary font-medium">
                        <CheckCircle className="inline h-4 w-4 mr-1" />
                        {phase.milestone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Preservation Techniques */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Preservation Techniques</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <div>
                    <Award className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Paint Archaeology</h3>
                    <p className="text-gray-200">
                      Microscopic analysis revealed 12 paint layers, allowing us to identify 
                      the original 1891 color scheme of sage green, cream, burgundy, and gold.
                    </p>
                  </div>
                  <div>
                    <Shield className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Lead-Safe Practices</h3>
                    <p className="text-gray-200">
                      Full EPA RRP containment with negative air pressure, HEPA filtration, 
                      and chemical stripping protected workers and neighbors from lead exposure.
                    </p>
                  </div>
                  <div>
                    <Clock className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Traditional Methods</h3>
                    <p className="text-gray-200">
                      Hand-mixed linseed oil paints, traditional brushwork, and gold leaf 
                      application recreated authentic 19th-century finishes.
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
                    &quot;The transformation is breathtaking. They uncovered colors we never knew 
                    existed and brought our family&apos;s Victorian mansion back to life. The lead 
                    abatement was handled flawlessly, and their attention to historical detail 
                    was extraordinary. The city preservation society called it the best 
                    restoration they&apos;ve seen in 20 years. This team saved a piece of history."
                  </blockquote>
                  <footer>
                    <strong>Margaret Whitmore</strong>
                    <p className="text-base text-gray-200">4th Generation Owner</p>
                  </footer>
                </div>

                {/* Additional Achievement */}
                <div className="mt-12 bg-primary text-primary-foreground rounded-lg p-8 text-center">
                  <Award className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">City Preservation Award Winner</h3>
                  <p className="text-lg opacity-100">
                    &quot;Excellence in Historic Restoration - San Francisco Landmarks Preservation Advisory Board
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Historical Details */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Historical Discoveries</h2>
                <div className="prose prose-lg mx-auto">
                  <p className="text-gray-200">
                    During our paint archaeology, we discovered fascinating details about the 
                    mansion&apos;s history. The original 1891 paint scheme featured 14 different 
                    colors, far more elaborate than the monochrome white applied in the 1950s. 
                    We found evidence of gold leaf on the tower finial and hand-painted 
                    faux wood graining on the porch ceiling.
                  </p>
                  <p className="text-gray-200 mt-4">
                    Most remarkably, we uncovered the builder&apos;s signature and date hidden 
                    beneath 12 layers of paint on a protected section of trim. This discovery 
                    allowed us to precisely date the original construction and identify the 
                    craftsmen who built this architectural treasure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Have a Historic Property That Needs Expert Restoration?
                </h2>
                <p className="text-xl mb-8 opacity-100">
                  Let&apos;s discuss how we can preserve your building&apos;s heritage while providing 
                  modern protection. Our preservation specialists are ready to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow hover:bg-background/90"
                  >
                    Get Restoration Consultation
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
                  Professional painting contractors specializing in historic restoration 
                  and preservation of architectural treasures.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Preservation Services</h3>
                <ul className="space-y-2 text-base text-gray-200">
                  <li>Lead-Safe Practices</li>
                  <li>Paint Archaeology</li>
                  <li>Wood Restoration</li>
                  <li>Historic Color Matching</li>
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
                  <li>historic@paintquotepro.com</li>
                  <li><Link href="/quote" className="hover:text-foreground">Get Free Quote</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-base text-gray-200">
              <p>&copy; 2025 PaintQuote Pro. All rights reserved. EPA RRP Certified.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}