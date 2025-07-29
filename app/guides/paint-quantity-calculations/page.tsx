import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Calculator,
  Droplets,
  Ruler,
  Package,
  AlertCircle,
  CheckCircle,
  FileText,
  ArrowRight,
  Sparkles,
  BarChart3,
  Info
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Paint Quantity Calculations: Professional Formulas & Charts [2024]',
  description: 'Master paint quantity calculations with professional formulas. Coverage rates, waste factors, and accurate estimating for every surface type.',
  keywords: 'paint quantity calculation, how much paint do I need, paint coverage formula, paint calculator formula',
  openGraph: {
    title: 'Paint Quantity Calculations: Professional Estimating Guide',
    description: 'Learn exact formulas for calculating paint quantities. Avoid costly mistakes with proper coverage rates and waste factors.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/paint-quantity-calculations'
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
        "@id": "https://paintquotepro.com/guides/paint-quantity-calculations"
      },
      "headline": "Paint Quantity Calculations: Professional Formulas and Methods",
      "description": "Comprehensive guide to calculating paint quantities accurately using professional formulas, coverage rates, and waste factors.",
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
          "name": "What is the formula for calculating paint quantity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The paint quantity formula is: (Total Square Footage ÷ Coverage Rate per Gallon) × Number of Coats × 1.1 (10% waste factor) = Gallons Needed. For example: (400 sq ft ÷ 350 sq ft/gallon) × 2 coats × 1.1 = 2.5 gallons."
          }
        },
        {
          "@type": "Question",
          "name": "How many square feet does a gallon of paint cover?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One gallon of paint typically covers 350-400 square feet with one coat on smooth surfaces. Coverage varies: Smooth walls: 350-400 sq ft, Textured walls: 250-350 sq ft, Rough surfaces: 150-250 sq ft, Primer: 200-300 sq ft per gallon."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Paint Quantity",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Measure the surface area",
          "text": "Calculate total square footage by measuring length × height for each surface"
        },
        {
          "@type": "HowToStep",
          "name": "Determine coverage rate",
          "text": "Check paint can for coverage rate or use 350 sq ft/gallon for smooth surfaces"
        },
        {
          "@type": "HowToStep",
          "name": "Apply the formula",
          "text": "Divide total area by coverage rate and multiply by number of coats"
        },
        {
          "@type": "HowToStep",
          "name": "Add waste factor",
          "text": "Multiply result by 1.1 (10% waste) or 1.15 (15% for textured surfaces)"
        },
        {
          "@type": "HowToStep",
          "name": "Round up",
          "text": "Always round up to the nearest whole gallon for purchasing"
        }
      ]
    }
  ]
}

export default function PaintQuantityCalculationsGuide() {
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Paint Calculations</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Paint Quantity Calculations: Pro Guide
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master the exact formulas and methods professionals use to calculate paint quantities. 
                Never run short or overbuy again. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                    Try Paint Calculator
                    <Calculator className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/guides/paint-calculator">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Free Calculator Tools
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
                <h2 className="text-2xl font-bold text-white mb-4">What is the Formula for Paint Quantity?</h2>
                <p className="text-lg text-gray-300">
                  The paint quantity formula is: (Total Square Footage ÷ Coverage Rate per Gallon) × Number of Coats × 1.1 
                  (10% waste factor) = Gallons Needed. For example: (400 sq ft ÷ 350 sq ft/gallon) × 2 coats × 1.1 = 2.5 gallons.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Master Formula Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">The Master Paint Calculation Formula</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg p-6 inline-block">
                    <div className="font-mono text-2xl text-cyan-400">
                      Gallons = (Area ÷ Coverage) × Coats × Waste Factor
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-4">Formula Components</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 text-cyan-400 mt-0.5" />
                        <div>
                          <strong>Area:</strong> Total square footage to paint
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Droplets className="h-5 w-5 text-cyan-400 mt-0.5" />
                        <div>
                          <strong>Coverage:</strong> Sq ft per gallon (varies by surface)
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Package className="h-5 w-5 text-cyan-400 mt-0.5" />
                        <div>
                          <strong>Coats:</strong> Number of paint applications
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-cyan-400 mt-0.5" />
                        <div>
                          <strong>Waste:</strong> 1.1 (10%) to 1.2 (20%) multiplier
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Example Calculation</h3>
                    <div className="bg-gray-900/50 rounded p-4 space-y-2 font-mono text-sm">
                      <p className="text-gray-400">{"// Living room walls"}</p>
                      <p className="text-green-400">Area: 385 sq ft</p>
                      <p className="text-green-400">Coverage: 350 sq ft/gal</p>
                      <p className="text-green-400">Coats: 2</p>
                      <p className="text-green-400">Waste: 1.1 (10%)</p>
                      <p className="text-gray-400">{"// Calculation"}</p>
                      <p className="text-yellow-400">(385 ÷ 350) × 2 × 1.1 = 2.42 gal</p>
                      <p className="text-cyan-400">Round up = 3 gallons</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Rates Table */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Paint Coverage Rates by Surface</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400">Surface Type</th>
                        <th className="text-center py-3 px-4 text-gray-400">Primer Coverage</th>
                        <th className="text-center py-3 px-4 text-gray-400">Paint Coverage</th>
                        <th className="text-center py-3 px-4 text-gray-400">Recommended Coats</th>
                        <th className="text-center py-3 px-4 text-gray-400">Waste Factor</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Smooth Drywall</td>
                        <td className="text-center">300-350 sq ft</td>
                        <td className="text-center">350-400 sq ft</td>
                        <td className="text-center">2</td>
                        <td className="text-center text-green-400">10%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Textured Walls</td>
                        <td className="text-center">250-300 sq ft</td>
                        <td className="text-center">300-350 sq ft</td>
                        <td className="text-center">2</td>
                        <td className="text-center text-yellow-400">15%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Stucco</td>
                        <td className="text-center">150-200 sq ft</td>
                        <td className="text-center">200-250 sq ft</td>
                        <td className="text-center">2-3</td>
                        <td className="text-center text-orange-400">20%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Brick</td>
                        <td className="text-center">125-175 sq ft</td>
                        <td className="text-center">150-200 sq ft</td>
                        <td className="text-center">2-3</td>
                        <td className="text-center text-orange-400">20%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Wood Siding</td>
                        <td className="text-center">250-300 sq ft</td>
                        <td className="text-center">300-350 sq ft</td>
                        <td className="text-center">2</td>
                        <td className="text-center text-yellow-400">15%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Concrete Block</td>
                        <td className="text-center">100-150 sq ft</td>
                        <td className="text-center">150-200 sq ft</td>
                        <td className="text-center">2-3</td>
                        <td className="text-center text-red-400">25%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Metal</td>
                        <td className="text-center">350-400 sq ft</td>
                        <td className="text-center">400-450 sq ft</td>
                        <td className="text-center">2</td>
                        <td className="text-center text-green-400">10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong className="text-cyan-400">Pro Tip:</strong> Always check the specific paint manufacturer's 
                    coverage rates as premium paints often cover more area. Spray application typically uses 30-40% more paint than brush/roll.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Special Calculations */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Special Surface Calculations</h2>
              
              <div className="space-y-6">
                {/* Ceilings */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Ceiling Calculations</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400 mb-3">Formula</h4>
                      <div className="bg-gray-900/50 rounded p-4 font-mono text-sm">
                        <p className="text-green-400">Ceiling Area = Length × Width</p>
                        <p className="text-gray-400 mt-2">// 12×15 room example</p>
                        <p className="text-yellow-400">12 × 15 = 180 sq ft</p>
                        <p className="text-yellow-400">180 ÷ 350 = 0.51 gal</p>
                        <p className="text-cyan-400">× 2 coats = 1.03 gallons</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Special Considerations</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Textured ceilings use 25% more paint</li>
                        <li>• White ceiling paint hides better</li>
                        <li>• Usually needs only 1-2 coats</li>
                        <li>• Add 5% for light fixtures/fans</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Trim and Doors */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Trim & Door Calculations</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Quick Estimates</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Standard door: 20 sq ft per side</li>
                        <li>• Door + frame: 30 sq ft total</li>
                        <li>• Window trim: 10-15 sq ft</li>
                        <li>• Baseboard: Height × 0.5 × Length</li>
                        <li>• Crown molding: Height × Length</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-3">Coverage Rates</h4>
                      <div className="bg-gray-900/50 rounded p-4">
                        <p className="text-gray-300 mb-2">Trim paint coverage:</p>
                        <p className="text-green-400">• 1 quart = 100 sq ft</p>
                        <p className="text-green-400">• 1 gallon = 400 sq ft</p>
                        <p className="text-gray-300 mt-3">Average room trim:</p>
                        <p className="text-yellow-400">• 150-200 sq ft total</p>
                        <p className="text-cyan-400">• Needs 2 quarts (2 coats)</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Color Changes */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Color Change Calculations</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-500/10 rounded p-4 text-center">
                      <h4 className="text-lg font-semibold text-green-400 mb-2">Light to Light</h4>
                      <p className="text-3xl font-bold text-white mb-2">2 coats</p>
                      <p className="text-sm text-gray-300">Standard calculation</p>
                    </div>
                    <div className="bg-yellow-500/10 rounded p-4 text-center">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">Dark to Light</h4>
                      <p className="text-3xl font-bold text-white mb-2">3-4 coats</p>
                      <p className="text-sm text-gray-300">Or use primer + 2 coats</p>
                    </div>
                    <div className="bg-orange-500/10 rounded p-4 text-center">
                      <h4 className="text-lg font-semibold text-orange-400 mb-2">Red/Dark Colors</h4>
                      <p className="text-3xl font-bold text-white mb-2">3+ coats</p>
                      <p className="text-sm text-gray-300">Tinted primer recommended</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Paint Calculation Mistakes to Avoid</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Common Errors</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Forgetting to multiply by number of coats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Using same coverage for all surfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Not accounting for surface porosity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Ignoring waste factor completely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Measuring room perimeter wrong</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Pro Best Practices</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Always round up to nearest gallon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Keep detailed notes on coverage rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Factor in primer separately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Add extra for touch-ups (5%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Document actual vs estimated usage</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border-cyan-500/30 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Quick Reference Cheat Sheet
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Room Sizes</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>Small bedroom: 1-2 gallons</li>
                      <li>Master bedroom: 2-3 gallons</li>
                      <li>Living room: 2-3 gallons</li>
                      <li>Open concept: 4-6 gallons</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">Quick Math</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>1 gallon = 350 sq ft</li>
                      <li>5 gallons = 1,750 sq ft</li>
                      <li>Average room = 300-400 sq ft</li>
                      <li>Always add 10% minimum</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">Sheen Coverage</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>Flat: Best coverage</li>
                      <li>Eggshell: -5% coverage</li>
                      <li>Satin: -10% coverage</li>
                      <li>Semi-gloss: -15% coverage</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border-cyan-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Stop Guessing Paint Quantities
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our AI-powered calculator handles all the formulas automatically. Get accurate paint quantities 
                  for any project in seconds, not minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                      Try Smart Calculator
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/guides/paint-calculator">
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Use Free Tools
                      <Calculator className="ml-2 h-5 w-5" />
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
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Complete Quoting Guide
                    </h3>
                    <p className="text-sm text-gray-400">
                      Master guide to all aspects of quoting
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/paint-calculator" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Calculator className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Paint Calculators
                    </h3>
                    <p className="text-sm text-gray-400">
                      Free online calculation tools
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/labor-cost-estimation" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <BarChart3 className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Labor Calculations
                    </h3>
                    <p className="text-sm text-gray-400">
                      Calculate crew hours and costs
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