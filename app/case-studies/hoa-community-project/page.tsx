import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Calendar, DollarSign, Home, MapPin, CheckCircle, Clock, Users, TrendingUp } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'HOA Community Painting Case Study | 156-Home Development Project',
  description: 'See how we transformed an entire HOA community of 156 homes in 10 weeks. Coordinated scheduling, consistent quality, and happy homeowners. Volume pricing saved 30%.',
  keywords: 'HOA painting contractor, community painting project, HOA painter, neighborhood painting, bulk painting services',
  openGraph: {
    title: 'HOA Community Transformation - 156 Homes Painted',
    description: 'Complete case study of a large-scale HOA painting project. 156 homes transformed in 10 weeks with zero complaints.',
    type: 'article',
    images: [{
      url: '/case-studies/hoa-community-hero.jpg',
      width: 1200,
      height: 630,
      alt: 'HOA community painting project'
    }]
  },
  alternates: {
    canonical: '/case-studies/hoa-community-project'
  }
}

const projectDetails = {
  location: 'Scottsdale, AZ',
  totalHomes: '156 Homes',
  projectDuration: '10 Weeks',
  totalSquareFootage: '425,000 sq ft',
  dailyCrew: '24 Painters',
  colorSchemes: '5 Approved Schemes',
  investment: '$1,275,000'
}

const challenges = [
  {
    title: 'Resident Coordination',
    description: 'Scheduling 156 homes with minimal disruption to residents\' daily lives and maintaining access to properties.'
  },
  {
    title: 'Quality Consistency',
    description: 'Ensuring identical quality standards across all homes regardless of which crew completed the work.'
  },
  {
    title: 'Weather Windows',
    description: 'Arizona summer approaching meant completing before extreme heat would halt work.'
  },
  {
    title: 'HOA Requirements',
    description: 'Strict architectural guidelines, color approvals, and weekly progress reporting to the board.'
  }
]

const solutions = [
  {
    title: 'Zone-Based Scheduling',
    description: 'Divided community into 8 zones, completing one zone per week with dedicated crews.',
    impact: 'Minimized disruption'
  },
  {
    title: 'Quality Control Team',
    description: 'Dedicated QC inspector checked every home before crew moved to next property.',
    impact: '100% first-pass approval'
  },
  {
    title: 'Early Start Program',
    description: '5 AM starts to beat the heat, with silent prep work and spray application after 7 AM.',
    impact: 'Beat deadline by 5 days'
  },
  {
    title: 'Digital Progress Tracking',
    description: 'Custom app for real-time updates, photos, and homeowner sign-offs.',
    impact: 'Full transparency achieved'
  }
]

const weekByWeek = [
  { week: 'Week 1-2', homes: 32, zone: 'North Entrance', milestone: 'Process refinement' },
  { week: 'Week 3-4', homes: 34, zone: 'Lakeside Villas', milestone: 'Efficiency increased 15%' },
  { week: 'Week 5-6', homes: 30, zone: 'Desert Ridge', milestone: 'Zero weather delays' },
  { week: 'Week 7-8', homes: 38, zone: 'Mountain View', milestone: 'Ahead of schedule' },
  { week: 'Week 9-10', homes: 22, zone: 'Clubhouse Area', milestone: 'Project completed' }
]

const results = [
  { metric: 'Homes Completed', value: '156/156' },
  { metric: 'Resident Satisfaction', value: '98% Positive' },
  { metric: 'Cost Savings vs Individual', value: '30% Lower' },
  { metric: 'Warranty Claims (Year 1)', value: 'Only 3 Touch-ups' }
]

export default function HOACommunityProjectCaseStudy() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'HOA Community Painting Project: 156 Homes Transformed',
    description: 'Case study of a large-scale HOA painting project completing 156 homes in 10 weeks.',
    image: 'https://paintquotepro.com/case-studies/hoa-community-hero.jpg',
    datePublished: '2024-10-20',
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
              { label: 'HOA Community Project' }
            ]}
            className="container"
          />

          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Users className="mr-2 h-4 w-4" />
                  HOA Community Case Study
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  156-Home HOA Community Transformation
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  How we coordinated painting 156 homes in 10 weeks with zone-based scheduling, 
                  consistent quality control, and digital progress tracking that kept every 
                  homeowner informed and satisfied.
                </p>
              </div>

              {/* Before/After Hero Image */}
              <div className="mt-12 overflow-hidden rounded-lg bg-muted">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground">Community Transformation Overview</span>
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
                  <Home className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Total Homes</p>
                  <p className="text-lg font-semibold">{projectDetails.totalHomes}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Daily Crew Size</p>
                  <p className="text-lg font-semibold">{projectDetails.dailyCrew}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Completion Time</p>
                  <p className="text-lg font-semibold">{projectDetails.projectDuration}</p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Volume Savings</p>
                  <p className="text-lg font-semibold">30% vs Individual</p>
                </div>
              </div>

              {/* Key Stats Banner */}
              <div className="mt-12 bg-primary text-primary-foreground rounded-lg p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="text-3xl font-bold">425,000</p>
                    <p className="text-sm opacity-90">Square Feet Painted</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">$1,275,000</p>
                    <p className="text-sm opacity-90">Total Investment</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">5 Days</p>
                    <p className="text-sm opacity-90">Ahead of Schedule</p>
                  </div>
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
                  Desert Winds HOA needed all 156 homes painted before the brutal Arizona summer. 
                  The challenge wasn't just the scale - it was coordinating with residents, 
                  maintaining consistent quality across multiple crews, and meeting strict HOA 
                  architectural standards while staying on budget.
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
                  We developed a comprehensive project management system specifically for this 
                  HOA community. Our approach combined military-precision scheduling with 
                  resident-friendly communication and uncompromising quality standards.
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

          {/* Zone-by-Zone Progress */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Zone-by-Zone Execution</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our systematic approach divided the community into manageable zones, allowing 
                  residents to know exactly when their home would be painted.
                </p>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Timeline</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Homes</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Zone</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Milestone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {weekByWeek.map((week, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4">{week.week}</td>
                          <td className="px-6 py-4 font-semibold">{week.homes}</td>
                          <td className="px-6 py-4">{week.zone}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{week.milestone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Process Innovation */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Process Innovation</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Resident App</h3>
                    <p className="text-muted-foreground">
                      Custom mobile app allowed residents to track progress, view schedules, 
                      approve colors, and communicate directly with project managers.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Quality Checkpoints</h3>
                    <p className="text-muted-foreground">
                      156-point inspection checklist for each home ensured consistent quality. 
                      Digital documentation with photos for every completed property.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Clock className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Speed Systems</h3>
                    <p className="text-muted-foreground">
                      Assembly-line approach with specialized teams: prep crew, spray crew, 
                      detail crew, and cleanup crew maximized efficiency.
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
                      <p className="text-sm text-muted-foreground mb-2">{result.metric}</p>
                      <p className="text-2xl font-bold text-primary">{result.value}</p>
                    </div>
                  ))}
                </div>

                {/* HOA Board Testimonial */}
                <div className="bg-primary/5 rounded-lg p-8 mb-8">
                  <blockquote className="text-lg italic mb-4">
                    "Managing a painting project of this scale seemed impossible, but PaintQuote Pro 
                    made it seamless. Their zone-based approach meant residents always knew what to 
                    expect. The quality was consistent from the first home to the 156th. Most 
                    impressively, they finished early and under budget. Our community looks brand new, 
                    and property values have already increased."
                  </blockquote>
                  <footer>
                    <strong>Richard Chen</strong>
                    <p className="text-sm text-muted-foreground">HOA Board President, Desert Winds Community</p>
                  </footer>
                </div>

                {/* Resident Testimonial */}
                <div className="bg-primary/5 rounded-lg p-8">
                  <blockquote className="text-lg italic mb-4">
                    "I was skeptical about having painters while working from home, but they were 
                    incredibly professional. The app notifications kept me informed, they worked 
                    around my schedule, and the results are stunning. Best HOA decision ever!"
                  </blockquote>
                  <footer>
                    <strong>Sarah Mitchell</strong>
                    <p className="text-sm text-muted-foreground">Desert Winds Resident</p>
                  </footer>
                </div>

                {/* Cost Savings Highlight */}
                <div className="mt-12 bg-primary text-primary-foreground rounded-lg p-8 text-center">
                  <DollarSign className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Volume Pricing Benefit</h3>
                  <p className="text-lg opacity-90">
                    Homeowners saved an average of $2,450 per home compared to individual quotes - 
                    a total community savings of $382,200
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Key Takeaways for HOAs</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-xl font-semibold mb-3">Volume Pricing Power</h3>
                    <p className="text-muted-foreground">
                      Bulk contracting saved 30% versus individual homeowner quotes while 
                      ensuring consistent quality and warranty coverage for all properties.
                    </p>
                  </div>
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-xl font-semibold mb-3">Communication is Key</h3>
                    <p className="text-muted-foreground">
                      Digital tools and proactive updates prevented 95% of typical project 
                      complaints and created a positive experience for all residents.
                    </p>
                  </div>
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-xl font-semibold mb-3">Zone-Based Efficiency</h3>
                    <p className="text-muted-foreground">
                      Systematic zone progression allowed crews to perfect their process, 
                      increasing speed 15% by Week 3 without sacrificing quality.
                    </p>
                  </div>
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-xl font-semibold mb-3">Property Value Impact</h3>
                    <p className="text-muted-foreground">
                      Post-project appraisals showed an average 4.5% increase in home values, 
                      far exceeding the painting investment for each property.
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
                  Planning an HOA Painting Project?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Let's discuss how we can transform your community with volume pricing, 
                  seamless coordination, and guaranteed satisfaction for every homeowner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow hover:bg-background/90"
                  >
                    Get HOA Proposal
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
                  Professional painting contractors specializing in large-scale HOA and 
                  community projects with volume pricing advantages.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">HOA Services</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Community-Wide Projects</li>
                  <li>Volume Pricing Programs</li>
                  <li>Digital Progress Tracking</li>
                  <li>Resident Communication</li>
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
                  <li>hoa@paintquotepro.com</li>
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