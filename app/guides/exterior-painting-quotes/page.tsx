import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Home,
  Calculator,
  Paintbrush,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  ArrowRight,
  Ruler,
  Sparkles,
  Sun,
  CloudRain,
  Thermometer,
  Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Exterior Painting Quotes: Complete Pricing Guide [2024]',
  description: 'Master exterior painting quotes with our comprehensive guide. Learn pricing strategies, surface calculations, weather considerations. Win more exterior jobs.',
  keywords: 'exterior painting quotes, house painting estimates, exterior paint pricing, siding painting costs',
  openGraph: {
    title: 'Exterior Painting Quotes: Professional Pricing Guide',
    description: 'Create accurate exterior painting quotes with weather factors, surface types, and height calculations.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/exterior-painting-quotes'
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
        "@id": "https://paintquotepro.com/guides/exterior-painting-quotes"
      },
      "headline": "Exterior Painting Quotes: Complete Pricing Guide for Contractors",
      "description": "Comprehensive guide to creating accurate exterior painting quotes including surface calculations, weather factors, and pricing strategies.",
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
          "name": "What is the average cost to paint a house exterior?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Exterior house painting costs average $3-7 per square foot or $3,000-8,000 for a 2,000 sq ft home. Prices vary based on siding type, height, prep work needed, and paint quality. Multi-story homes cost 20-40% more due to equipment and safety requirements."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate exterior painting square footage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Calculate exterior square footage by measuring each wall&rsquo;s length × height, then subtract doors and windows. Add 10% for trim and details. For complex homes, use: (Perimeter × Average Height) + Gable Areas - Openings."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Quote Exterior Painting Jobs",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Assess the property",
          "text": "Walk around the entire property, noting siding type, height, condition, and access challenges."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate surface area",
          "text": "Measure each wall section, add gables and dormers, subtract doors and windows."
        },
        {
          "@type": "HowToStep",
          "name": "Evaluate prep work",
          "text": "Check for peeling paint, wood rot, caulking needs, and pressure washing requirements."
        },
        {
          "@type": "HowToStep",
          "name": "Factor in height and access",
          "text": "Add costs for ladders, scaffolding, or lifts for multi-story homes."
        },
        {
          "@type": "HowToStep",
          "name": "Include weather contingencies",
          "text": "Build in buffer time and costs for weather delays and seasonal considerations."
        }
      ]
    }
  ]
}

export default function ExteriorPaintingQuotesGuide() {
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Exterior Painting</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Exterior Painting Quotes: Complete Guide
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Master exterior painting estimates with detailed calculations, weather considerations, 
                and pricing strategies for every surface type. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                    Try Quote Calculator
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
                <h2 className="text-2xl font-bold text-white mb-4">What is the Average Cost to Paint a House Exterior?</h2>
                <p className="text-lg text-gray-100">
                  Exterior house painting costs average $3-7 per square foot or $3,000-8,000 for a 2,000 sq ft home. 
                  Prices vary based on siding type, height, prep work needed, and paint quality. Multi-story homes 
                  cost 20-40% more due to equipment and safety requirements.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Surface Type Pricing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Exterior Surface Pricing Guide</h2>
              
              <div className="space-y-6">
                {/* Wood Siding */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Home className="h-8 w-8 text-amber-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Wood Siding</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-amber-400 mb-3">Characteristics</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Requires extensive prep work</li>
                            <li>• May need sanding/scraping</li>
                            <li>• Prime all bare wood</li>
                            <li>• 2-3 coats typical</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing per Sq Ft</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Good condition: $3.50-4.50</li>
                            <li>• Minor repairs: $4.50-6.00</li>
                            <li>• Major prep: $6.00-8.00</li>
                            <li>• Historic restoration: $8.00+</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-amber-500/10 rounded-lg">
                        <p className="text-base text-gray-100">
                          <strong className="text-amber-400">Pro Tip:</strong> Always test for lead paint on homes built before 1978. 
                          RRP certification required for lead paint removal, adding $0.50-1.00 per sq ft.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Vinyl Siding */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Vinyl Siding</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">Characteristics</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Minimal prep required</li>
                            <li>• Must use vinyl-safe paint</li>
                            <li>• Light colors only</li>
                            <li>• 1-2 coats typical</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing per Sq Ft</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Standard vinyl: $2.50-3.50</li>
                            <li>• Textured vinyl: $3.00-4.00</li>
                            <li>• With repairs: $3.50-5.00</li>
                            <li>• Color change: +$0.50-1.00</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Stucco */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Home className="h-8 w-8 text-purple-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Stucco</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">Characteristics</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Patch cracks first</li>
                            <li>• Elastomeric paint recommended</li>
                            <li>• Higher paint consumption</li>
                            <li>• Spray application best</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing per Sq Ft</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Smooth stucco: $3.00-4.00</li>
                            <li>• Textured stucco: $3.50-5.00</li>
                            <li>• With repairs: $4.50-6.50</li>
                            <li>• Elastomeric coating: $5.00-7.00</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Brick */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Home className="h-8 w-8 text-red-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Brick</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-red-400 mb-3">Characteristics</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Requires masonry primer</li>
                            <li>• Tuckpointing may be needed</li>
                            <li>• Breathable paint essential</li>
                            <li>• Limewash option available</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing per Sq Ft</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Standard painting: $3.50-5.00</li>
                            <li>• Limewash finish: $2.50-4.00</li>
                            <li>• With tuckpointing: $6.00-10.00</li>
                            <li>• Stain application: $2.00-3.50</li>
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

        {/* Height and Access Factors */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Height and Access Pricing Factors</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-200">Height/Access Type</th>
                        <th className="text-center py-3 px-4 text-gray-200">Equipment Needed</th>
                        <th className="text-center py-3 px-4 text-gray-200">Cost Multiplier</th>
                        <th className="text-center py-3 px-4 text-gray-200">Safety Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-100">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Single Story (8-12 ft)</td>
                        <td className="text-center">Step ladders</td>
                        <td className="text-center text-green-400">1.0x base</td>
                        <td className="text-center">Standard PPE</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Two Story (13-25 ft)</td>
                        <td className="text-center">Extension ladders</td>
                        <td className="text-center text-yellow-400">1.2-1.4x</td>
                        <td className="text-center">Fall protection</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Three Story (26-35 ft)</td>
                        <td className="text-center">Scaffolding/Lift</td>
                        <td className="text-center text-orange-400">1.5-1.8x</td>
                        <td className="text-center">Harnesses required</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Steep Slopes</td>
                        <td className="text-center">Roof brackets</td>
                        <td className="text-center text-orange-400">1.3-1.5x</td>
                        <td className="text-center">Specialized training</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Limited Access</td>
                        <td className="text-center">Boom lift</td>
                        <td className="text-center text-red-400">1.5-2.0x</td>
                        <td className="text-center">Certified operators</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg">
                  <p className="text-base text-gray-100">
                    <strong className="text-blue-400">Equipment Costs:</strong> Scaffolding: $15-20/day per section | 
                    40ft Ladder: $200-300 | Boom Lift: $300-500/day | Safety Equipment: $50-100/worker
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Weather Considerations */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Weather and Seasonal Factors</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sun className="h-6 w-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Ideal Conditions</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Temperature: 50-85°F</li>
                    <li>• Humidity: 40-70%</li>
                    <li>• No rain for 24 hours</li>
                    <li>• Mild wind (under 15 mph)</li>
                    <li>• No direct sun on wet paint</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-500/10 rounded">
                    <p className="text-base text-green-400">Standard pricing applies</p>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CloudRain className="h-6 w-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Challenging Conditions</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Temperature: Below 50°F</li>
                    <li>• High humidity: Over 85%</li>
                    <li>• Rainy season work</li>
                    <li>• Extreme heat: Over 90°F</li>
                    <li>• High winds: Over 20 mph</li>
                  </ul>
                  <div className="mt-4 p-3 bg-orange-500/10 rounded">
                    <p className="text-base text-orange-400">Add 15-25% to pricing</p>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Thermometer className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-white">Seasonal Pricing</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Spring (High demand): +10-15%</li>
                    <li>• Summer (Peak season): +15-20%</li>
                    <li>• Fall (Good weather): Standard</li>
                    <li>• Winter (Off-season): -10-20%</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-green-400" />
                    <h3 className="text-xl font-semibold text-white">Weather Delays</h3>
                  </div>
                  <p className="text-gray-100 mb-3">
                    Build in contingency time:
                  </p>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Spring: +20% time buffer</li>
                    <li>• Summer: +10% time buffer</li>
                    <li>• Fall: +15% time buffer</li>
                    <li>• Include rain day clause</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Calculation Example */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Complete Exterior Quote Example</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Two-Story Colonial Home</h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">Property Details</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• 2,400 sq ft siding area</li>
                        <li>• Wood siding, good condition</li>
                        <li>• 300 linear ft trim</li>
                        <li>• 6 shutters</li>
                        <li>• 2 story, 22 ft peak</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Materials Needed</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Primer: 8 gallons @ $35 = $280</li>
                        <li>• Siding paint: 16 gal @ $45 = $720</li>
                        <li>• Trim paint: 3 gal @ $50 = $150</li>
                        <li>• Supplies: $250</li>
                        <li>• Total Materials: $1,400</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">Labor Calculation</h4>
                    <div className="bg-gray-900/50 rounded p-4 font-mono text-base">
                      <p className="text-green-400">Prep Work: 16 hours @ $50/hr = $800</p>
                      <p className="text-green-400">Priming: 20 hours @ $50/hr = $1,000</p>
                      <p className="text-green-400">Painting: 32 hours @ $50/hr = $1,600</p>
                      <p className="text-green-400">Trim Work: 12 hours @ $50/hr = $600</p>
                      <p className="text-green-400">Height Factor (1.3x): $1,200</p>
                      <p className="text-blue-400 mt-2">Total Labor: $5,200</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Final Quote Breakdown</h4>
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-100">Materials</span>
                          <span className="text-white">$1,400</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Labor</span>
                          <span className="text-white">$5,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Equipment Rental</span>
                          <span className="text-white">$300</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Overhead (30%)</span>
                          <span className="text-white">$2,070</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Profit (20%)</span>
                          <span className="text-white">$1,794</span>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span className="text-white">Total Quote</span>
                            <span className="text-green-400">$10,764</span>
                          </div>
                          <div className="flex justify-between text-base mt-1">
                            <span className="text-gray-200">Price per sq ft</span>
                            <span className="text-gray-200">$4.49</span>
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

        {/* Common Mistakes */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Exterior Quoting Mistakes to Avoid</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Common Mistakes</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Not inspecting for lead paint on older homes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Underestimating paint for textured surfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Forgetting to price equipment rental</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Not including weather contingencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Missing hidden areas (soffits, fascia)</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Best Practices</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Always do a complete walk-around inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Take photos of all sides for reference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Test surface adhesion before quoting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Include detailed warranty information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Specify exact products and colors</span>
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
              <Card className="bg-gradient-to-r from-blue-500/20 to-green-500/20 border-blue-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Quote Exterior Jobs 3x Faster
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Our software calculates surface areas, adjusts for height factors, and generates professional 
                  quotes with weather contingencies built in.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                      Try Free Calculator
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Exterior Painting Resources</h2>
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

                <Link href="/guides/interior-painting-quotes" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Home className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Interior Painting Guide
                    </h3>
                    <p className="text-base text-gray-200">
                      Room-by-room pricing strategies
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/commercial-painting-quotes" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Calculator className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Commercial Quotes
                    </h3>
                    <p className="text-base text-gray-200">
                      Large-scale project pricing
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