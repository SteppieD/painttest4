import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, MapPin, DollarSign, User } from 'lucide-react'

export default function CommercialOfficeBuildingCaseStudy() {
  const projectDetails = [
    { label: 'Project Type', value: 'Commercial Office Building', icon: MapPin },
    { label: 'Size', value: '15-story headquarters (250,000 sq ft)', icon: DollarSign },
    { label: 'Timeline', value: '8 weeks (nights only)', icon: Calendar },
    { label: 'Client', value: 'Fortune 500 Financial Services', icon: User }
  ]

  const challenges = [
    {
      title: 'Zero Downtime Requirements',
      description: 'Complete exterior painting without disrupting daily operations of 2,000+ employees',
      solution: 'Night-only work schedule with specialized soundproofing equipment'
    },
    {
      title: 'Weather Constraints',
      description: 'Limited window of favorable weather conditions in downtown Seattle',
      solution: 'Advanced weather monitoring and flexible crew scheduling'
    },
    {
      title: 'Safety Compliance',
      description: 'Strict safety requirements for high-rise work in busy financial district',
      solution: 'OSHA-certified teams with specialized high-rise safety protocols'
    },
    {
      title: 'Color Matching',
      description: 'Exact match to existing corporate brand colors across all surfaces',
      solution: 'Custom color formulation and extensive testing procedures'
    }
  ]

  const results = [
    {
      metric: 'Timeline',
      achievement: 'Completed 1 week early',
      details: 'Finished in 7 weeks instead of scheduled 8 weeks'
    },
    {
      metric: 'Budget',
      achievement: '12% under budget',
      details: 'Efficient planning reduced material waste and overtime costs'
    },
    {
      metric: 'Quality Score',
      achievement: '98% client satisfaction',
      details: 'Based on post-completion quality assessment'
    },
    {
      metric: 'Safety Record',
      achievement: '0 incidents',
      details: 'Perfect safety record throughout entire project'
    }
  ]

  const timeline = [
    {
      phase: 'Pre-Planning & Assessment',
      duration: '2 weeks',
      activities: [
        'Detailed building assessment and measurements',
        'Safety protocol development',
        'Color matching and material procurement',
        'City permits and coordination with building management'
      ]
    },
    {
      phase: 'Surface Preparation',
      duration: '3 weeks',
      activities: [
        'Power washing and surface cleaning',
        'Crack repair and caulking',
        'Primer application to prepared surfaces',
        'Window and fixture protection'
      ]
    },
    {
      phase: 'Primary Painting',
      duration: '3 weeks',
      activities: [
        'Base coat application using spray equipment',
        'Detail work around windows and architectural features',
        'Quality control inspections',
        'Touch-up and corrections'
      ]
    },
    {
      phase: 'Final Inspection & Cleanup',
      duration: '1 week',
      activities: [
        'Comprehensive quality inspection',
        'Client walkthrough and approval',
        'Equipment removal and site cleanup',
        'Documentation and warranty provision'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Downtown Seattle High-Rise Transformation
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              How PaintQuote Pro completed a massive 15-story office building exterior 
              painting project without disrupting business operations for a single day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {projectDetails.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2">
                  <detail.icon className="h-5 w-5" />
                  <span className="font-medium">{detail.label}:</span>
                  <span>{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                When a Fortune 500 financial services company needed to refresh their 
                downtown Seattle headquarters, they faced a unique challenge: how to 
                completely repaint a 15-story building without impacting their 24/7 
                trading operations.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The existing paint had deteriorated after 12 years of Pacific Northwest 
                weather exposure, creating both aesthetic and protective concerns. The 
                client required the work to be completed with zero operational disruption 
                and strict adherence to their corporate brand colors.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Requirements</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Night-only work schedule (8 PM - 6 AM)</li>
                <li>• Zero noise complaints from neighboring buildings</li>
                <li>• Exact color match to corporate brand standards</li>
                <li>• Premium materials for 15+ year durability</li>
                <li>• OSHA compliance for high-rise work</li>
                <li>• Minimal environmental impact with low-VOC products</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Challenges & Solutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">{challenge.title}</h3>
                <p className="text-gray-700 mb-4"><strong>Challenge:</strong> {challenge.description}</p>
                <p className="text-green-700"><strong>Solution:</strong> {challenge.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Project Timeline</h2>
          <div className="space-y-6">
            {timeline.map((phase, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold text-blue-900">{phase.phase}</h3>
                  <span className="ml-4 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {phase.duration}
                  </span>
                </div>
                <ul className="space-y-1 text-gray-700">
                  {phase.activities.map((activity, activityIndex) => (
                    <li key={activityIndex}>• {activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Project Results</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">{result.metric}</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">{result.achievement}</div>
                <p className="text-sm text-gray-600">{result.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Methods & Techniques */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Methods & Techniques Used</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Surface Preparation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• High-pressure washing with eco-friendly detergents</li>
                <li>• Mechanical scraping of loose paint</li>
                <li>• Caulking of all joints and gaps</li>
                <li>• Primer application for optimal adhesion</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-900">Application Methods</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Airless spray application for efficiency</li>
                <li>• Brush and roller detail work</li>
                <li>• Multi-coat system for durability</li>
                <li>• Color-coded quality control system</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-900">Safety & Equipment</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Suspended scaffold systems</li>
                <li>• Fall protection harnesses and anchors</li>
                <li>• Sound dampening equipment</li>
                <li>• Environmental containment systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Before/After Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Transformation Results</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-900">Before: Major Issues</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Severe paint chalking and fading on south-facing walls
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Multiple areas of paint peeling and flaking
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Visible rust stains from metal fixtures
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Inconsistent color due to patch repairs
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    Caulking failures around windows and joints
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-900">After: Complete Transformation</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Uniform, vibrant color matching corporate brand exactly
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Premium coating system with 15-year warranty
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    All rust completely removed and treated
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Professional-grade caulking throughout
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Enhanced weather protection for Pacific Northwest climate
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Materials & Cost Breakdown */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Materials & Investment</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Premium Materials Used</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Base Coating System</h4>
                  <p className="text-gray-600">High-build acrylic primer for optimal adhesion and corrosion protection</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Finish Coating</h4>
                  <p className="text-gray-600">100% acrylic latex with advanced fade resistance and dirt pickup resistance</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">Specialty Products</h4>
                  <p className="text-gray-600">Metal primers, elastomeric sealants, and architectural caulking compounds</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Investment Breakdown</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Materials (40%)</span>
                    <span className="font-semibold">$180,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor (45%)</span>
                    <span className="font-semibold">$202,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment & Safety (10%)</span>
                    <span className="font-semibold">$45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project Management (5%)</span>
                    <span className="font-semibold">$22,500</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Project Investment</span>
                    <span>$450,000</span>
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    *Final cost was $396,000 (12% under original budget)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Key Lessons & Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">What Worked Exceptionally Well</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Night-only schedule eliminated all operational disruption</li>
                <li>• Advanced weather monitoring prevented delays</li>
                <li>• Custom color matching exceeded client expectations</li>
                <li>• Proactive communication kept all stakeholders informed</li>
                <li>• Safety protocols resulted in zero incidents</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-900">Improvements for Future Projects</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Earlier pre-positioning of equipment reduces setup time</li>
                <li>• Additional sound dampening for ultra-quiet operations</li>
                <li>• Expanded crew size could reduce timeline further</li>
                <li>• Digital progress tracking for real-time updates</li>
                <li>• Enhanced lighting systems for better night visibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Client Testimonial */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-8">Client Testimonial</h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-xl italic mb-6">
                &ldquo;PaintQuote Pro delivered exactly what they promised - a complete transformation 
                of our 15-story headquarters without a single disruption to our operations. 
                Their night crews were professional, quiet, and left each floor immaculate 
                for our morning arrivals. The low-VOC products meant no complaints about odors, 
                and the quality is exceptional. They finished early and under budget. This is 
                how commercial painting should be done.&rdquo;
              </blockquote>
              <footer>
                <strong className="text-xl">David Thompson</strong>
                <p className="text-blue-200 mt-2">VP of Facilities, Fortune 500 Financial Services</p>
              </footer>
            </div>
          </div>
        </section>

        {/* Similar Projects CTA */}
        <section className="text-center">
          <div className="bg-gray-50 p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Need Similar Results for Your Commercial Building?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you have a high-rise office building, retail complex, or industrial facility, 
              PaintQuote Pro has the expertise and resources to deliver exceptional results without 
              disrupting your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/create-quote">Get Your Commercial Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/case-studies">View More Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}