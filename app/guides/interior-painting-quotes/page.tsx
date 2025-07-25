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
  Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Interior Painting Quotes: Room-by-Room Pricing Guide [2024]',
  description: 'Create accurate interior painting quotes with our room-by-room guide. Pricing formulas, paint calculations, and templates. Win more residential jobs.',
  keywords: 'interior painting quotes, room painting estimates, house painting pricing, residential painting quotes',
  openGraph: {
    title: 'Interior Painting Quotes: Complete Room-by-Room Guide',
    description: 'Master interior painting estimates with detailed pricing for every room type.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/interior-painting-quotes'
  }
}

// Schema markup for featured snippets
const structuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Quote Interior Painting Jobs",
  "description": "Step-by-step guide to creating accurate interior painting quotes for residential projects.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Measure the room",
      "text": "Calculate wall square footage by measuring length × height for each wall, then subtract doors and windows."
    },
    {
      "@type": "HowToStep",
      "name": "Determine paint needs",
      "text": "Divide total square footage by 350-400 (coverage per gallon) and multiply by number of coats needed."
    },
    {
      "@type": "HowToStep",
      "name": "Calculate labor hours",
      "text": "Use production rates: 180-250 sq ft per hour for rolling, 100-150 sq ft per hour for cutting in."
    },
    {
      "@type": "HowToStep",
      "name": "Add materials and markup",
      "text": "Include paint, supplies, overhead (30%), and profit margin (20-30%) for final quote."
    }
  ]
}

export default function InteriorPaintingQuotesGuide() {
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
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li>/</li>
                <li><Link href="/guides/how-to-quote-painting-jobs" className="hover:text-white">Quoting Guide</Link></li>
                <li>/</li>
                <li className="text-white">Interior Painting</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Interior Painting Quotes: Room-by-Room Guide
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master the art of quoting interior painting projects with specific pricing strategies, 
                calculations, and tips for every room type. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
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
                <h2 className="text-2xl font-bold text-white mb-4">What is the Average Cost for Interior Painting?</h2>
                <p className="text-lg text-gray-300">
                  Interior painting costs average $2-6 per square foot or $200-750 per room. A typical 2,000 sq ft home 
                  costs $2,000-6,000 to paint entirely. Prices vary based on paint quality, wall condition, ceiling height, 
                  and regional labor rates.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Room-by-Room Pricing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Room-by-Room Pricing Breakdown</h2>
              
              <div className="space-y-6">
                {/* Living Room */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Home className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Living Room</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">Typical Specifications</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Size: 200-400 sq ft</li>
                            <li>• Walls: 350-600 sq ft surface</li>
                            <li>• Ceiling: Optional (+$150-300)</li>
                            <li>• Trim: 100-150 linear ft</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Basic (1 color): $400-600</li>
                            <li>• Standard (2 colors): $500-800</li>
                            <li>• Premium (accent walls): $600-1,000</li>
                            <li>• With ceiling: +$150-300</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                        <p className="text-sm text-gray-300">
                          <strong className="text-blue-400">Pro Tip:</strong> Living rooms often have high ceilings and large windows. 
                          Add 10-15% for rooms over 9ft height and factor in extra cutting-in time around windows.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Bedroom */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Home className="h-8 w-8 text-purple-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Bedroom</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">Typical Specifications</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Size: 100-200 sq ft</li>
                            <li>• Walls: 300-400 sq ft surface</li>
                            <li>• Ceiling: Usually included</li>
                            <li>• Closet: Add $75-150</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Small bedroom: $300-450</li>
                            <li>• Medium bedroom: $400-600</li>
                            <li>• Master bedroom: $500-750</li>
                            <li>• With walk-in closet: +$100-200</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Kitchen */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Home className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Kitchen</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-yellow-400 mb-3">Special Considerations</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Extensive prep work needed</li>
                            <li>• Grease/stain blocking primer</li>
                            <li>• Semi-gloss or satin finish</li>
                            <li>• Cabinet painting separate</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Walls only: $350-550</li>
                            <li>• Walls + ceiling: $450-700</li>
                            <li>• Cabinet painting: $1,500-3,500</li>
                            <li>• Complete kitchen: $2,000-4,500</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Bathroom */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Home className="h-8 w-8 text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Bathroom</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Special Requirements</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Moisture-resistant paint</li>
                            <li>• Mildew-resistant primer</li>
                            <li>• Extra prep for humidity damage</li>
                            <li>• Careful work around fixtures</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Range</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Half bath: $200-300</li>
                            <li>• Full bath: $300-500</li>
                            <li>• Master bath: $400-700</li>
                            <li>• With cabinet painting: +$300-600</li>
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

        {/* Calculation Methods */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">How to Calculate Interior Painting Costs</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Step-by-Step Calculation Method</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Measure Wall Square Footage</h4>
                      <p className="text-gray-300 mb-2">Wall SF = (Room Perimeter × Wall Height) - (Doors + Windows)</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-sm text-green-400">
                        Example: (50ft × 8ft) - 45 sq ft = 355 sq ft
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Calculate Paint Needed</h4>
                      <p className="text-gray-300 mb-2">Gallons = (Total SF ÷ Coverage Rate) × Coats + 10% waste</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-sm text-green-400">
                        Example: (355 ÷ 350) × 2 × 1.1 = 2.2 gallons
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Estimate Labor Hours</h4>
                      <p className="text-gray-300 mb-2">Hours = (Prep Time + Paint Time + Cleanup) × Difficulty Factor</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-sm text-green-400">
                        Example: (2 + 4 + 0.5) × 1.0 = 6.5 hours
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Calculate Total Price</h4>
                      <p className="text-gray-300 mb-2">Price = (Labor Cost + Material Cost) × (1 + Overhead + Profit)</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-sm text-green-400">
                        Example: ($325 + $110) × 1.5 = $652.50
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Production Rates Table */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Interior Painting Production Rates</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400">Task</th>
                        <th className="text-center py-3 px-4 text-gray-400">Sq Ft/Hour</th>
                        <th className="text-center py-3 px-4 text-gray-400">Hours/Room</th>
                        <th className="text-center py-3 px-4 text-gray-400">Difficulty</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Wall prep (patching, sanding)</td>
                        <td className="text-center">150-200</td>
                        <td className="text-center">1-2</td>
                        <td className="text-center text-yellow-400">Medium</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Priming (when needed)</td>
                        <td className="text-center">200-250</td>
                        <td className="text-center">1.5-2</td>
                        <td className="text-center text-green-400">Easy</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Rolling walls</td>
                        <td className="text-center">180-250</td>
                        <td className="text-center">1.5-2.5</td>
                        <td className="text-center text-green-400">Easy</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Cutting in edges</td>
                        <td className="text-center">100-150</td>
                        <td className="text-center">1-2</td>
                        <td className="text-center text-orange-400">Hard</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Trim painting</td>
                        <td className="text-center">50-75 linear ft</td>
                        <td className="text-center">2-3</td>
                        <td className="text-center text-orange-400">Hard</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Ceiling painting</td>
                        <td className="text-center">150-200</td>
                        <td className="text-center">1-1.5</td>
                        <td className="text-center text-yellow-400">Medium</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Common Interior Quoting Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Mistakes to Avoid</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Forgetting to subtract openings from square footage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Not accounting for ceiling height over 8 feet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Underestimating prep work for older homes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Using same price for all paint sheens</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Best Practices</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Always measure each room individually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Include detailed prep work in quotes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Specify exact paint products and sheens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Add 10-15% contingency for unknowns</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Create Professional Interior Quotes in Minutes
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Stop spending hours on calculations. Our software handles room measurements, paint quantities, 
                  and pricing automatically.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
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
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Related Interior Painting Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Complete Quoting Guide
                    </h3>
                    <p className="text-sm text-gray-400">
                      Master guide to all painting quotes
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/paint-calculator" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Calculator className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Paint Calculator
                    </h3>
                    <p className="text-sm text-gray-400">
                      Free tools for accurate estimates
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/cabinet-painting-quotes" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Paintbrush className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Cabinet Painting Guide
                    </h3>
                    <p className="text-sm text-gray-400">
                      Specialty interior painting quotes
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