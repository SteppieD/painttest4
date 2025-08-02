import { Metadata } from 'next'
import Link from 'next/link'
// import { Button } from '@/components/ui/button' // TODO: Check if this import is needed
// import { Card } from '@/components/ui/card' // TODO: Check if this import is needed
// import { Badge } from '@/components/ui/badge' // TODO: Check if this import is needed
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Building,
  Calculator,
  Clock,
  CheckCircle,
  FileText,
  ArrowRight,
  Ruler,
  Sparkles,
  Shield,
  AlertTriangle,
  Users,
  Calendar
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Commercial Painting Quotes: Large-Scale Project Guide [2024]',
  description: 'Master commercial painting estimates with our comprehensive guide. Square footage calculations, compliance requirements, and competitive bidding strategies.',
  keywords: 'commercial painting quotes, industrial painting estimates, office painting costs, commercial paint contractors',
  openGraph: {
    title: 'Commercial Painting Quotes: Professional Bidding Guide',
    description: 'Create winning commercial painting bids with accurate estimating, compliance requirements, and project management.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/commercial-painting-quotes'
  }
}

// Schema markup for featured snippets
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://paintquotepro.com/guides/commercial-painting-quotes"
      },
      "headline": "Commercial Painting Quotes: Complete Guide for Contractors",
      "description": "Comprehensive guide to bidding commercial painting projects including calculations, compliance, and winning strategies.",
      "datePublished": "2024-01-25",
      "dateModified": "2024-01-25",
      "author": {
        "@type": "Organization",
        "name": "PaintQuote Pro"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does commercial painting cost per square foot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Commercial painting costs average $1.50-4.00 per square foot for interior work and $2.00-5.00 for exterior. Prices vary based on surface type, height, project size, and special coatings. Large projects over 10,000 sq ft often receive volume discounts of 10-20%."
          }
        },
        {
          "@type": "Question",
          "name": "What&apos;s included in a commercial painting bid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Commercial painting bids include detailed scope of work, surface preparation specifications, product data sheets, project timeline with phases, insurance certificates, safety compliance plan, warranty terms, and payment schedule. Union requirements and prevailing wage rates may also apply."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Bid Commercial Painting Projects",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Review specifications",
          "text": "Carefully read bid documents, specs, and addendums. Note special requirements."
        },
        {
          "@type": "HowToStep",
          "name": "Conduct site visit",
          "text": "Walk the entire project, take measurements, photos, and note access challenges."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate quantities",
          "text": "Measure all surfaces, create detailed takeoffs, and verify against plans."
        },
        {
          "@type": "HowToStep",
          "name": "Price materials and labor",
          "text": "Get supplier quotes, calculate crew hours, and factor in equipment needs."
        },
        {
          "@type": "HowToStep",
          "name": "Add overhead and profit",
          "text": "Include insurance, bonds, supervision, and appropriate profit margins."
        }
      ]
    }
  ]
}

export default function CommercialPaintingQuotesGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-12">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-base">
              <ol className="flex items-center space-x-2 text-gray-200">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li>/</li>
                <li><Link href="/guides/how-to-quote-painting-jobs" className="hover:text-white">Quoting Guide</Link></li>
                <li>/</li>
                <li className="text-white">Commercial Painting</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Commercial Painting Quotes: Bidding Guide
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Master commercial painting bids with detailed takeoffs, compliance requirements, 
                and competitive pricing strategies. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600">
                    Try Commercial Calculator
                    <Calculator className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/guides/how-to-quote-painting-jobs">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Back to Main Guide
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Section for Featured Snippet */}
        <section className="py-8 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">How Much Does Commercial Painting Cost?</h2>
                <p className="text-lg text-gray-100">
                  Commercial painting costs average $1.50-4.00 per square foot for interior work and $2.00-5.00 
                  for exterior. Prices vary based on surface type, height, project size, and special coatings. 
                  Large projects over 10,000 sq ft often receive volume discounts of 10-20%.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Types and Pricing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Commercial Project Types & Pricing</h2>
              
              <div className="space-y-6">
                {/* Office Buildings */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Building className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Office Buildings</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">Typical Scope</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Interior walls and ceilings</li>
                            <li>• Common areas and lobbies</li>
                            <li>• After-hours work required</li>
                            <li>• Low-VOC paint mandatory</li>
                            <li>• Minimal business disruption</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Standard offices: $1.50-2.50/sq ft</li>
                            <li>• Executive suites: $2.50-3.50/sq ft</li>
                            <li>• Common areas: $2.00-3.00/sq ft</li>
                            <li>• After-hours work: +25-40%</li>
                            <li>• Weekend work: +35-50%</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                        <p className="text-base text-gray-100">
                          <strong className="text-blue-400">Pro Tip:</strong> Office buildings often require phased work 
                          to minimize disruption. Quote each phase separately and include move-in/move-out coordination.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Retail Spaces */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Building className="h-8 w-8 text-purple-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Retail & Restaurants</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">Special Requirements</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Fast turnaround essential</li>
                            <li>• Brand color matching</li>
                            <li>• Specialty finishes common</li>
                            <li>• Night/weekend work only</li>
                            <li>• Food-safe coatings (restaurants)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Retail stores: $2.00-3.50/sq ft</li>
                            <li>• Restaurants: $2.50-4.00/sq ft</li>
                            <li>• Kitchen areas: $3.50-5.00/sq ft</li>
                            <li>• Decorative finishes: +$1-3/sq ft</li>
                            <li>• Rush jobs: +30-50%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Industrial Facilities */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Building className="h-8 w-8 text-orange-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Industrial & Warehouses</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-orange-400 mb-3">Unique Challenges</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• High ceilings (30-50 ft)</li>
                            <li>• Specialty equipment needed</li>
                            <li>• Industrial coatings required</li>
                            <li>• Safety compliance critical</li>
                            <li>• Large surface areas</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Warehouse walls: $1.00-2.00/sq ft</li>
                            <li>• Ceilings/structure: $1.50-3.00/sq ft</li>
                            <li>• Epoxy floors: $3.00-7.00/sq ft</li>
                            <li>• Safety markings: $5-15/linear ft</li>
                            <li>• Equipment rental: +$500-2000/day</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Healthcare Facilities */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="h-8 w-8 text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Healthcare Facilities</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Compliance Requirements</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Antimicrobial coatings</li>
                            <li>• Zero-VOC mandatory</li>
                            <li>• Infection control protocols</li>
                            <li>• HIPAA compliance</li>
                            <li>• 24/7 facility operation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Patient rooms: $3.00-4.50/sq ft</li>
                            <li>• Operating areas: $4.50-6.00/sq ft</li>
                            <li>• Common areas: $2.50-3.50/sq ft</li>
                            <li>• Specialty coatings: +$1-2/sq ft</li>
                            <li>• Infection control: +20-30%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Bidding Process */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Commercial Bidding Process</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Pre-Bid Analysis</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Review bid invitation and specifications</li>
                        <li>• Attend mandatory pre-bid meetings</li>
                        <li>• Identify special requirements (bonds, insurance)</li>
                        <li>• Evaluate project fit and competition</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Site Visit & Takeoff</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Measure all surfaces accurately</li>
                        <li>• Document existing conditions with photos</li>
                        <li>• Note access restrictions and safety hazards</li>
                        <li>• Verify dimensions against provided plans</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Cost Estimation</h4>
                      <div className="bg-gray-900/50 rounded p-4 font-mono text-base mt-3">
                        <p className="text-green-400">Materials: Surface Area × Coverage × Price + 10% waste</p>
                        <p className="text-green-400">Labor: Hours × Rate × Crew Size × Productivity Factor</p>
                        <p className="text-green-400">Equipment: Daily Rate × Duration + Delivery/Setup</p>
                        <p className="text-green-400">Overhead: 25-35% of direct costs</p>
                        <p className="text-green-400">Profit: 10-20% based on competition</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Bid Submission</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Complete all required forms accurately</li>
                        <li>• Include insurance certificates and bonds</li>
                        <li>• Attach product data sheets and samples</li>
                        <li>• Submit before deadline (early is better)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Compliance Requirements */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Commercial Compliance Requirements</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Insurance Requirements</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• General Liability: $1-5 million</li>
                    <li>• Workers&apos; Comp: State required</li>
                    <li>• Commercial Auto: $1 million</li>
                    <li>• Umbrella Policy: $2-10 million</li>
                    <li>• Additional Insured endorsements</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-6 w-6 text-green-400" />
                    <h3 className="text-xl font-semibold text-white">Documentation</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Business license</li>
                    <li>• Contractor&apos;s license</li>
                    <li>• Safety certifications</li>
                    <li>• Union compliance (if applicable)</li>
                    <li>• Environmental permits</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Safety Requirements</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Written safety program</li>
                    <li>• OSHA 30-hour training</li>
                    <li>• Site-specific safety plan</li>
                    <li>• Daily safety meetings</li>
                    <li>• Incident reporting system</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">Labor Compliance</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Prevailing wage rates</li>
                    <li>• Certified payroll reports</li>
                    <li>• Union requirements</li>
                    <li>• Apprenticeship programs</li>
                    <li>• E-Verify compliance</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Commercial Quote */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Sample Commercial Quote Breakdown</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">50,000 sq ft Office Building - Interior Repaint</h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-indigo-400 mb-3">Project Scope</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• 40,000 sq ft walls</li>
                        <li>• 10,000 sq ft ceilings</li>
                        <li>• 3 floors, occupied</li>
                        <li>• After-hours work required</li>
                        <li>• 30-day completion</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400 mb-3">Material Requirements</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Primer: 40 gallons @ $40 = $1,600</li>
                        <li>• Wall paint: 125 gal @ $45 = $5,625</li>
                        <li>• Ceiling paint: 35 gal @ $40 = $1,400</li>
                        <li>• Supplies/sundries: $2,500</li>
                        <li>• Total Materials: $11,125</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">Labor Calculation</h4>
                    <div className="bg-gray-900/50 rounded p-4 font-mono text-base">
                      <p className="text-green-400">Prep/Protection: 160 hrs × $65/hr = $10,400</p>
                      <p className="text-green-400">Wall Painting: 400 hrs × $65/hr = $26,000</p>
                      <p className="text-green-400">Ceiling Painting: 200 hrs × $65/hr = $13,000</p>
                      <p className="text-green-400">Touch-up/Cleanup: 80 hrs × $65/hr = $5,200</p>
                      <p className="text-green-400">Supervision: 120 hrs × $85/hr = $10,200</p>
                      <p className="text-green-400">After-hours premium (30%): $19,440</p>
                      <p className="text-blue-400 mt-2">Total Labor: $84,240</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Complete Quote Summary</h4>
                    <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-100">Materials</span>
                          <span className="text-white">$11,125</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Labor</span>
                          <span className="text-white">$84,240</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Equipment Rental</span>
                          <span className="text-white">$3,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Insurance/Bonds</span>
                          <span className="text-white">$2,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Overhead (30%)</span>
                          <span className="text-white">$30,410</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Profit (15%)</span>
                          <span className="text-white">$19,766</span>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span className="text-white">Total Project Cost</span>
                            <span className="text-green-400">$151,541</span>
                          </div>
                          <div className="flex justify-between text-base mt-1">
                            <span className="text-gray-200">Price per sq ft</span>
                            <span className="text-gray-200">$3.03</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Winning Strategies */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Strategies for Winning Commercial Bids</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Competitive Advantages</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Detailed project scheduling with milestones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Strong safety record and EMR below 1.0</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>References from similar projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Value engineering alternatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Warranty beyond standard requirements</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Relationship Building</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Pre-qualify with major GCs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Attend industry networking events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Join construction associations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Build facility manager relationships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Maintain architect/designer contacts</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-indigo-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Win More Commercial Projects
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Create professional commercial bids in half the time. Our software handles complex takeoffs, 
                  compliance tracking, and generates detailed proposals that win.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600">
                      Try Commercial Features
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/guides/how-to-quote-painting-jobs">
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Read Complete Guide
                      <FileText className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Related Commercial Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Complete Quoting Guide
                    </h3>
                    <p className="text-base text-gray-200">
                      Master guide to all painting quotes
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/industrial-painting-quotes" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-orange-500/50 transition-all">
                    <Building className="h-8 w-8 text-orange-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 mb-2">
                      Industrial Painting
                    </h3>
                    <p className="text-base text-gray-200">
                      Specialty coatings and equipment
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/painting-business-guide" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Calculator className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Business Growth Guide
                    </h3>
                    <p className="text-base text-gray-200">
                      Scale to commercial projects
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ModernFooter />
    </>
  )
}