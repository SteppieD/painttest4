import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Calculator,
  Star,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Calendar,
  Layers,
  Briefcase,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Commercial Painting Estimating Software | Large Project Bids',
  description: 'Professional quoting software for commercial painting contractors. Create detailed bids for offices, retail, industrial facilities in minutes. Win more RFPs.',
  openGraph: {
    title: 'PaintQuote Pro for Commercial Painters',
    description: 'Win more commercial bids with professional estimating software',
    images: ['/og-commercial.png'],
  },
}

export default function CommercialPage() {
  const commercialFeatures = [
    {
      icon: Building2,
      title: 'Multi-Building Projects',
      description: 'Handle complex facilities with multiple buildings and phases'
    },
    {
      icon: Layers,
      title: 'Detailed Scope Sheets',
      description: 'Break down by floors, areas, and specific requirements'
    },
    {
      icon: Calendar,
      title: 'Project Scheduling',
      description: 'Include timelines, phases, and crew allocations'
    },
    {
      icon: FileText,
      title: 'RFP-Ready Proposals',
      description: 'Professional bids that meet corporate requirements'
    },
    {
      icon: Shield,
      title: 'Compliance Docs',
      description: 'Include insurance, bonds, and certifications'
    },
    {
      icon: BarChart3,
      title: 'Competitive Analysis',
      description: 'Price strategically with market data insights'
    }
  ]

  const projectTypes = [
    {
      type: 'Office Buildings',
      size: '50,000+ sq ft',
      features: ['After-hours work', 'Minimal disruption', 'Phase planning'],
      typical: '$75K-250K'
    },
    {
      type: 'Retail Chains',
      size: 'Multi-location',
      features: ['Brand standards', 'Quick turnaround', 'Night work'],
      typical: '$25K-100K/location'
    },
    {
      type: 'Industrial Facilities',
      size: '100,000+ sq ft',
      features: ['Safety compliance', 'Special coatings', 'Downtime planning'],
      typical: '$150K-500K'
    },
    {
      type: 'Healthcare',
      size: 'Hospitals & clinics',
      features: ['Low-VOC requirements', 'Infection control', 'Phased approach'],
      typical: '$100K-400K'
    }
  ]

  const winRateStats = [
    { metric: '3x', description: 'Higher win rate', detail: 'vs. manual estimates' },
    { metric: '75%', description: 'Faster bidding', detail: 'Complete RFPs same day' },
    { metric: '$2.5M', description: 'Avg annual increase', detail: 'In commercial contracts' },
    { metric: '45%', description: 'Profit margin boost', detail: 'Better cost tracking' }
  ]

  const caseStudies = [
    {
      client: "Fortune 500 Tech Campus",
      contractor: "Elite Commercial Painting",
      challenge: "Quote 12 buildings in 48 hours for urgent RFP",
      solution: "Used PaintQuote Pro to create detailed phased proposal",
      result: "Won $1.2M contract",
      testimonial: "We beat 5 competitors because we could respond so quickly with such detail."
    },
    {
      client: "National Retail Chain",
      contractor: "ProCoat Commercial",
      challenge: "Standardize pricing across 50 locations",
      solution: "Created reusable templates for each store type",
      result: "Secured 3-year contract",
      testimonial: "The consistency and professionalism of our bids set us apart."
    },
    {
      client: "Hospital Network",
      contractor: "Healthcare Painting Specialists",
      challenge: "Complex compliance requirements and phasing",
      solution: "Built detailed scope sheets with all certifications",
      result: "Preferred vendor status",
      testimonial: "PaintQuote Pro helped us speak their language perfectly."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Building2 className="h-3 w-3 mr-1" />
                For Commercial Contractors
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Win More
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Commercial Bids
                </span>
              </h1>
              
              <p className="text-xl text-gray-100 mb-8">
                Professional estimating software for commercial painting contractors. 
                Create detailed proposals that win RFPs and impress facility managers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    See Commercial Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>500+ commercial painters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>RFP templates included</span>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Quick Bid Calculator</h3>
                  <p className="text-gray-200">See how fast you can bid commercial jobs</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4">
                    <label className="text-base text-gray-200">Project Type</label>
                    <select className="w-full bg-transparent text-white mt-1 p-2 border border-gray-600 rounded">
                      <option>Office Building</option>
                      <option>Retail Space</option>
                      <option>Industrial Facility</option>
                    </select>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4">
                    <label className="text-sm text-gray-200">Square Footage</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 50,000"
                      className="w-full bg-transparent text-white mt-1 p-2 border border-gray-600 rounded"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Generate Sample Bid
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built for Commercial Painting Scale
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Every feature designed to help you win and manage large commercial projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6">
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Specialized for Every Commercial Project
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projectTypes.map((project, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{project.type}</h3>
                    <p className="text-gray-200">{project.size}</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {project.typical}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-base text-gray-100">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Commercial Contractors See Real Results
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {winRateStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{stat.metric}</div>
                  <div className="text-white font-semibold mb-1">{stat.description}</div>
                  <div className="text-base text-gray-200">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Success Stories from Commercial Painters
            </h2>
          </div>

          <div className="space-y-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className="glass-card p-8">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{study.client}</h3>
                    <p className="text-gray-200 mb-2">By {study.contractor}</p>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {study.result}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-semibold text-gray-200 mb-2">CHALLENGE</h4>
                    <p className="text-gray-100 mb-4">{study.challenge}</p>
                    <h4 className="text-base font-semibold text-gray-200 mb-2">SOLUTION</h4>
                    <p className="text-gray-100">{study.solution}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div>
                      <Award className="h-8 w-8 text-yellow-400 mb-3" />
                      <p className="text-gray-100 italic">{['"']}{study.testimonial}{['"']}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Win More Commercial Contracts?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join 500+ commercial painters closing bigger deals faster
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Schedule Enterprise Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-base text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>RFP templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Volume pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Dedicated support</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}