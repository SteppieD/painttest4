import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Calendar, DollarSign, Building, CheckCircle, Clock, Award, Shield } from 'lucide-react'
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
    headline: 'Historic Victorian Mansion Restoration Case Study',
    description: 'Complete restoration of an 1890s Victorian mansion with period-accurate finishes and lead-safe practices',
    image: '/case-studies/historic-restoration-hero.jpg',
    datePublished: '2024-03-15',
    dateModified: '2024-08-07',
    author: {
      '@type': 'Organization',
      name: 'Professional Painting Services'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Professional Painting Services'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="bg-background min-h-screen">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Historic Restoration', href: '/case-studies/historic-restoration' }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Historic Victorian Mansion Restoration
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                From deteriorating to distinguished: How we brought a 133-year-old Victorian mansion back to its original glory while meeting modern preservation standards.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>8 Week Project</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>7,800 sq ft</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>$142,000 Investment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details Grid */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Project Overview</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(projectDetails).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-muted-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-8">Historic Preservation Challenges</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Restoring a 133-year-old Victorian mansion required overcoming significant challenges while maintaining historical integrity and meeting modern safety standards.
                </p>
                
                <div className="space-y-6">
                  {challenges.map((challenge, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground font-semibold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{challenge.title}</h3>
                        <p className="text-muted-foreground">{challenge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6">Key Constraints</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <span>EPA RRP Lead-Safe Work Practices Required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-primary mt-0.5" />
                    <span>Secretary of Interior Standards Compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <span>Historic Landmark Commission Approval</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <span>Limited Weather Windows for Exterior Work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Preservation Solutions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-600">{solution.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Restoration Timeline</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2 md:-translate-x-px"></div>
              
              <div className="space-y-12">
                {restorationPhases.map((phase, index) => (
                  <div key={index} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-8 w-4 h-4 bg-primary rounded-full md:left-1/2 md:-translate-x-2"></div>
                    
                    <div className="flex-1 md:w-1/2">
                      <div className="ml-16 md:ml-0">
                        <div className={`bg-card p-6 rounded-lg shadow-sm ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold">{phase.phase}</h3>
                            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                              {phase.duration}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">{phase.activities}</p>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">{phase.milestone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Outstanding Results</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              The restoration exceeded all expectations, earning recognition from preservation societies and setting a new standard for historic paint restoration in the region.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {results.map((result, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary mb-2">{result.value}</div>
                  <div className="text-muted-foreground">{result.metric}</div>
                </div>
              ))}
            </div>
            
            <blockquote className="text-lg italic text-muted-foreground max-w-4xl mx-auto mb-8">
              <p>
                &quot;The transformation is breathtaking. They uncovered colors we never knew 
                existed and brought our family&apos;s Victorian mansion back to life. The lead 
                abatement was handled flawlessly, and their attention to historical detail 
                was extraordinary. The city preservation society called it the best 
                restoration they&apos;ve seen in 20 years. This team saved a piece of history.&quot;
              </p>
              <cite className="block mt-4 font-medium">
                — Margaret Chen, Property Owner & Historic Preservation Advocate
              </cite>
            </blockquote>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need Historic Building Restoration?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Our certified preservation specialists bring decades of experience in historic 
              building restoration, lead-safe practices, and period-accurate finishes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-quote" 
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Get Historic Restoration Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/case-studies" 
                className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}