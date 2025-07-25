import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Paintbrush,
  Calculator,
  Droplets,
  Layers,
  Home,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
  BarChart3,
  Info
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Paint Coverage Rates & Spread Rates by Surface [2024 Guide]',
  description: 'Complete paint coverage guide: sq ft per gallon by surface type, texture, and paint quality. Professional formulas for accurate paint calculations.',
  keywords: 'paint coverage rates, paint spread rate, sq ft per gallon paint, paint coverage calculator',
  openGraph: {
    title: 'Professional Paint Coverage Rates Guide',
    description: 'Calculate exact paint needs with coverage rates for every surface type and condition.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/paint-coverage-rates'
  }
}

// Schema markup
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://paintquotepro.com/guides/paint-coverage-rates"
      },
      "headline": "Paint Coverage Rates: Professional Guide to Spread Rates",
      "description": "Comprehensive guide to paint coverage rates by surface type, texture, and paint quality. Professional formulas included.",
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
          "name": "How many square feet does a gallon of paint cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A gallon of paint typically covers 350-400 sq ft on smooth surfaces with one coat. Coverage varies by surface: Smooth drywall (350-400 sq ft), textured walls (250-350 sq ft), brick/masonry (150-200 sq ft), wood siding (300-350 sq ft), and stucco (200-250 sq ft). Premium paints generally provide 10-15% better coverage."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate paint coverage for textured walls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For textured walls, reduce standard coverage rates: Light texture reduces coverage by 10-15%, medium texture by 20-30%, and heavy texture by 30-50%. For example, if smooth walls need 1 gallon per 400 sq ft, medium textured walls need 1 gallon per 280-320 sq ft."
          }
        }
      ]
    }
  ]
}

export default function PaintCoverageRatesGuide() {
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
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li>/</li>
                <li><Link href="/guides/paint-calculator" className="hover:text-white">Paint Calculator</Link></li>
                <li>/</li>
                <li className="text-white">Coverage Rates</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Paint Coverage Rates by Surface Type
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master accurate paint calculations with professional coverage rates for every surface. 
                Never over-order or run short again. Part of our comprehensive 
                <Link href="/guides/paint-calculator" className="text-blue-400 hover:text-blue-300"> paint calculator guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
                    Try Coverage Calculator
                    <Calculator className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/guides/paint-calculator">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Back to Calculator Guide
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Section */}
        <section className="py-8 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">How Many Sq Ft Does a Gallon Cover?</h2>
                <p className="text-lg text-gray-300">
                  A gallon of paint typically covers 350-400 sq ft on smooth surfaces with one coat. 
                  Coverage varies by surface: Smooth drywall (350-400 sq ft), textured walls (250-350 sq ft), 
                  brick/masonry (150-200 sq ft), wood siding (300-350 sq ft), and stucco (200-250 sq ft). 
                  Premium paints generally provide 10-15% better coverage than standard paints.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Master Coverage Table */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Paint Coverage Rates by Surface</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700 bg-gray-900/50">
                        <th className="text-left py-4 px-6 text-gray-400">Surface Type</th>
                        <th className="text-center py-4 px-4 text-gray-400">1st Coat<br/><span className="text-xs">(sq ft/gal)</span></th>
                        <th className="text-center py-4 px-4 text-gray-400">2nd Coat<br/><span className="text-xs">(sq ft/gal)</span></th>
                        <th className="text-center py-4 px-4 text-gray-400">Primer<br/><span className="text-xs">(sq ft/gal)</span></th>
                        <th className="text-center py-4 px-4 text-gray-400">Loss Factor</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Smooth Drywall (New)</td>
                        <td className="text-center text-green-400">400-450</td>
                        <td className="text-center text-green-400">450-500</td>
                        <td className="text-center">350-400</td>
                        <td className="text-center text-yellow-400">5-10%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Smooth Drywall (Previously Painted)</td>
                        <td className="text-center text-green-400">350-400</td>
                        <td className="text-center text-green-400">400-450</td>
                        <td className="text-center text-gray-500">N/A</td>
                        <td className="text-center text-yellow-400">5-10%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Light Texture (Orange Peel)</td>
                        <td className="text-center text-yellow-400">300-350</td>
                        <td className="text-center text-yellow-400">350-400</td>
                        <td className="text-center">300-350</td>
                        <td className="text-center text-yellow-400">10-15%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Medium Texture (Knockdown)</td>
                        <td className="text-center text-yellow-400">250-300</td>
                        <td className="text-center text-yellow-400">300-350</td>
                        <td className="text-center">250-300</td>
                        <td className="text-center text-orange-400">15-20%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Heavy Texture (Popcorn)</td>
                        <td className="text-center text-orange-400">200-250</td>
                        <td className="text-center text-orange-400">250-300</td>
                        <td className="text-center">200-250</td>
                        <td className="text-center text-red-400">20-30%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Brick/Concrete Block</td>
                        <td className="text-center text-red-400">150-200</td>
                        <td className="text-center text-orange-400">200-250</td>
                        <td className="text-center">150-200</td>
                        <td className="text-center text-red-400">25-35%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Wood Siding (Smooth)</td>
                        <td className="text-center text-yellow-400">300-350</td>
                        <td className="text-center text-yellow-400">350-400</td>
                        <td className="text-center">250-300</td>
                        <td className="text-center text-yellow-400">10-15%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Wood Siding (Rough)</td>
                        <td className="text-center text-orange-400">250-300</td>
                        <td className="text-center text-orange-400">300-350</td>
                        <td className="text-center">200-250</td>
                        <td className="text-center text-orange-400">15-20%</td>
                      </tr>
                      <tr className="border-b border-gray-800 hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Stucco</td>
                        <td className="text-center text-orange-400">200-250</td>
                        <td className="text-center text-orange-400">250-300</td>
                        <td className="text-center">175-225</td>
                        <td className="text-center text-orange-400">20-25%</td>
                      </tr>
                      <tr className="hover:bg-gray-800/20">
                        <td className="py-4 px-6 font-medium">Metal Surfaces</td>
                        <td className="text-center text-green-400">400-450</td>
                        <td className="text-center text-green-400">450-500</td>
                        <td className="text-center">350-400</td>
                        <td className="text-center text-yellow-400">5-10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 bg-indigo-500/10 border-t border-gray-700">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-300">
                      <strong className="text-indigo-400">Pro Tip:</strong> Always order 10-15% extra paint beyond calculated needs. 
                      This accounts for touch-ups, future repairs, and ensures color matching from the same batch.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Paint Quality Impact */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Paint Quality Impact on Coverage</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="text-center mb-4">
                    <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-white">Economy Paint</h3>
                    <p className="text-3xl font-bold text-gray-400 mt-2">300-350</p>
                    <p className="text-sm text-gray-500">sq ft/gallon</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Lower solids content (25-35%)</li>
                    <li>• More coats needed</li>
                    <li>• Higher overall cost</li>
                    <li>• Shorter lifespan</li>
                  </ul>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border-indigo-500/30 p-6">
                  <div className="text-center mb-4">
                    <Droplets className="h-12 w-12 text-indigo-400 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-white">Premium Paint</h3>
                    <p className="text-3xl font-bold text-indigo-400 mt-2">400-450</p>
                    <p className="text-sm text-gray-400">sq ft/gallon</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="text-green-400">• High solids content (35-45%)</li>
                    <li className="text-green-400">• Better hide in 1 coat</li>
                    <li className="text-green-400">• Lower total cost</li>
                    <li className="text-green-400">• 10+ year durability</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="text-center mb-4">
                    <Droplets className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-white">Specialty Paint</h3>
                    <p className="text-3xl font-bold text-purple-400 mt-2">Varies</p>
                    <p className="text-sm text-gray-500">by type</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Elastomeric: 50-100 sq ft/gal</li>
                    <li>• Anti-mold: 350-400 sq ft/gal</li>
                    <li>• Textured: 150-200 sq ft/gal</li>
                    <li>• Epoxy: 300-400 sq ft/gal</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Calculation Formula */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Professional Coverage Calculation</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-lg p-6 inline-block">
                    <div className="font-mono text-xl text-indigo-400">
                      Paint Needed = (Total Sq Ft ÷ Coverage Rate) × Coats × (1 + Loss Factor)
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-violet-400 mb-4">Example: 2,000 sq ft Room</h3>
                    <div className="bg-gray-900/50 rounded p-4 font-mono text-sm space-y-2">
                      <p className="text-gray-400">// Smooth walls, 2 coats</p>
                      <p className="text-green-400">Area: 2,000 sq ft</p>
                      <p className="text-green-400">Coverage: 400 sq ft/gal</p>
                      <p className="text-green-400">Coats: 2</p>
                      <p className="text-green-400">Loss: 10%</p>
                      <p className="text-gray-400">// Calculation</p>
                      <p className="text-yellow-400">(2,000 ÷ 400) × 2 × 1.1</p>
                      <p className="text-cyan-400 font-bold">= 11 gallons needed</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-indigo-400 mb-4">Adjustment Factors</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <strong>Color change:</strong> Add 10-20%
                          <p className="text-sm text-gray-400">Dark to light needs more</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <strong>Porosity:</strong> Add 15-25%
                          <p className="text-sm text-gray-400">New drywall, bare wood</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <strong>Application method:</strong>
                          <p className="text-sm text-gray-400">Spray: -10%, Brush: +10%</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Special Considerations */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Special Surface Considerations</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Home className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Interior Surfaces</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-indigo-400 font-semibold mb-2">Ceilings</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Flat paint: 400-450 sq ft/gal</li>
                        <li>• Usually needs only 1 coat</li>
                        <li>• Add 20% for popcorn texture</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-indigo-400 font-semibold mb-2">Trim & Doors</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Coverage: 350-400 sq ft/gal</li>
                        <li>• Multiple thin coats best</li>
                        <li>• Factor in both sides of doors</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Layers className="h-8 w-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Exterior Surfaces</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">Weather Impact</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Wind overspray: +10-15%</li>
                        <li>• Hot surfaces: +5-10%</li>
                        <li>• High humidity: Better coverage</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">Surface Prep</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Pressure washed: -5% coverage</li>
                        <li>• Chalky surface: +20-30%</li>
                        <li>• Primed properly: Standard rates</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Tips */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Pro Tips for Accurate Estimates</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Best Practices</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Measure actual surface area, not floor space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Test coverage on small area first</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Document coverage rates by job type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Consider primer coverage separately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Account for windows/doors properly</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Common Mistakes</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Using manufacturer's max coverage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Ignoring surface texture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Forgetting touch-up paint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Same rate for all colors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Not tracking actual usage</span>
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
              <Card className="bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border-indigo-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Calculate Paint Needs Instantly
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Stop guessing paint quantities. Our calculator uses real-world coverage rates and 
                  automatically adjusts for surface type, texture, and paint quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600">
                      Try Paint Calculator
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/guides/paint-calculator">
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Complete Calculator Guide
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Calculation Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/paint-calculator" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <Calculator className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Paint Calculator Guide
                    </h3>
                    <p className="text-sm text-gray-400">
                      Complete calculation system
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/paint-quantity-calculations" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <BarChart3 className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Quantity Calculations
                    </h3>
                    <p className="text-sm text-gray-400">
                      Advanced formulas & methods
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/measurement-techniques" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Layers className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Measurement Guide
                    </h3>
                    <p className="text-sm text-gray-400">
                      Accurate measuring techniques
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