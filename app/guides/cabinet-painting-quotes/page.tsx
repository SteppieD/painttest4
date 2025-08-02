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
  Package,
  Wrench
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cabinet Painting Quotes: Professional Pricing Guide [2024]',
  description: 'Master cabinet painting quotes with our detailed guide. Learn pricing per door, spray vs brush methods, and kitchen transformation estimates.',
  keywords: 'cabinet painting quotes, kitchen cabinet painting cost, cabinet refinishing prices, cabinet painting estimate',
  openGraph: {
    title: 'Cabinet Painting Quotes: Complete Pricing Guide',
    description: 'Create accurate cabinet painting quotes with door counts, finish options, and professional techniques.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/cabinet-painting-quotes'
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
        "@id": "https://paintquotepro.com/guides/cabinet-painting-quotes"
      },
      "headline": "Cabinet Painting Quotes: Professional Pricing Guide",
      "description": "Comprehensive guide to quoting cabinet painting projects including pricing strategies, techniques, and material calculations.",
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
          "name": "How much does it cost to paint kitchen cabinets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kitchen cabinet painting costs average $75-150 per door or $3,000-6,000 for a typical kitchen with 30-40 doors and drawers. Prices vary based on cabinet condition, finish quality, and whether boxes are painted. Spray finishing costs 20-30% more but provides superior results."
          }
        },
        {
          "@type": "Question",
          "name": "What&apos;s included in cabinet painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Professional cabinet painting includes thorough cleaning and degreasing, sanding all surfaces, priming with bonding primer, applying 2-3 finish coats, and reinstalling hardware. Quality jobs also include filling grain on oak cabinets and fixing minor damage."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Quote Cabinet Painting Jobs",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Count doors and drawers",
          "text": "Count all cabinet doors, drawer fronts, and false panels. Note sizes as large doors may cost more."
        },
        {
          "@type": "HowToStep",
          "name": "Assess cabinet condition",
          "text": "Check for damage, previous paint layers, wood type, and existing finish that affects prep work."
        },
        {
          "@type": "HowToStep",
          "name": "Determine finish level",
          "text": "Quote for brush/roll application or spray finish. Include grain filling for smooth finish on oak."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate materials",
          "text": "Figure primer and paint needs based on door count. Add for boxes if painting cabinet frames."
        }
      ]
    }
  ]
}

export default function CabinetPaintingQuotesGuide() {
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Cabinet Painting</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Cabinet Painting Quotes: Pricing Guide
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Master the art of cabinet painting estimates with detailed pricing strategies, 
                finish options, and professional techniques. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    Try Cabinet Calculator
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
                <h2 className="text-2xl font-bold text-white mb-4">How Much Does Cabinet Painting Cost?</h2>
                <p className="text-lg text-gray-100">
                  Kitchen cabinet painting costs average $75-150 per door or $3,000-6,000 for a typical kitchen 
                  with 30-40 doors and drawers. Prices vary based on cabinet condition, finish quality, and whether 
                  boxes are painted. Spray finishing costs 20-30% more but provides superior results.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Methods */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Cabinet Painting Pricing Methods</h2>
              
              <div className="space-y-6">
                {/* Per Door Pricing */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Package className="h-8 w-8 text-amber-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Per Door/Drawer Pricing</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-amber-400 mb-3">Brush & Roll Method</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Standard door: $75-100</li>
                            <li>• Large/panel door: $100-125</li>
                            <li>• Drawer front: $40-60</li>
                            <li>• False panels: $30-50</li>
                            <li>• Inside boxes: +$500-800</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Spray Finish Method</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Standard door: $100-150</li>
                            <li>• Large/panel door: $125-175</li>
                            <li>• Drawer front: $50-75</li>
                            <li>• False panels: $40-60</li>
                            <li>• Inside boxes: +$700-1200</li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-amber-500/10 rounded-lg">
                        <p className="text-base text-gray-100">
                          <strong className="text-amber-400">Pro Tip:</strong> Always count doors and drawers during 
                          the estimate visit. Photos help ensure accurate counts. Add 10% for potential missed items.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Linear Foot Pricing */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Ruler className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Linear Foot Pricing</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">Upper Cabinets</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Basic finish: $125-175/ft</li>
                            <li>• Premium finish: $175-225/ft</li>
                            <li>• With crown molding: +$25/ft</li>
                            <li>• Glass doors: +$50/door</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Lower Cabinets</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Basic finish: $150-200/ft</li>
                            <li>• Premium finish: $200-275/ft</li>
                            <li>• Island/peninsula: +20%</li>
                            <li>• Toe kick painting: +$10/ft</li>
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

        {/* Finish Options and Pricing */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Finish Options & Pricing Tiers</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-bronze-400 mb-4">Basic Finish</h3>
                  <div className="text-2xl font-bold text-white mb-3">$75-100/door</div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Clean and degrease</li>
                    <li>• Light sanding</li>
                    <li>• One coat primer</li>
                    <li>• Two coats paint</li>
                    <li>• Brush/roll application</li>
                    <li>• 1-year warranty</li>
                  </ul>
                </Card>

                <Card className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-amber-500/50 p-6">
                  <Badge className="mb-2 bg-amber-500/20 text-amber-400 border-amber-500/30">Most Popular</Badge>
                  <h3 className="text-xl font-semibold text-amber-400 mb-4">Professional Finish</h3>
                  <div className="text-2xl font-bold text-white mb-3">$100-150/door</div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Thorough prep work</li>
                    <li>• Fill grain (oak)</li>
                    <li>• Premium primer</li>
                    <li>• 2-3 coats paint</li>
                    <li>• Spray application</li>
                    <li>• 3-year warranty</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Premium Finish</h3>
                  <div className="text-2xl font-bold text-white mb-3">$150-200/door</div>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Complete stripping</li>
                    <li>• Repair all defects</li>
                    <li>• High-end primer</li>
                    <li>• 3+ coats lacquer</li>
                    <li>• Factory-like finish</li>
                    <li>• 5-year warranty</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Process Breakdown */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Cabinet Painting Process & Time</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Day 1: Prep & Remove</h4>
                      <p className="text-gray-100 mb-2">Remove doors, drawers, and hardware. Clean and degrease all surfaces.</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-base text-green-400">
                        Time: 4-6 hours | Labor: 2 workers
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Day 2-3: Sanding & Priming</h4>
                      <p className="text-gray-100 mb-2">Sand all surfaces, fill grain/damage, apply bonding primer.</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-base text-green-400">
                        Time: 8-12 hours | Labor: 2 workers
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Day 4-5: Paint Application</h4>
                      <p className="text-gray-100 mb-2">Apply 2-3 coats of finish paint with proper drying between coats.</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-base text-green-400">
                        Time: 10-16 hours | Labor: 2 workers
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Day 6: Reinstall</h4>
                      <p className="text-gray-100 mb-2">Reinstall doors, drawers, and hardware. Final adjustments and cleanup.</p>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-base text-green-400">
                        Time: 4-6 hours | Labor: 2 workers
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-500/10 rounded-lg">
                  <p className="text-gray-100">
                    <strong className="text-amber-400">Total Project Time:</strong> 5-6 days typical | 
                    <strong className="text-amber-400"> Total Labor:</strong> 60-80 hours for average kitchen
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Materials and Calculations */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Material Calculations</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Average Kitchen (35 doors/drawers)</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-amber-400 mb-3">Material Requirements</h4>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Degreaser: 1 gallon @ $20</li>
                      <li>• Sandpaper: Various grits @ $40</li>
                      <li>• Wood filler: 2 tubes @ $30</li>
                      <li>• Primer: 2 gallons @ $100</li>
                      <li>• Paint: 3 gallons @ $180</li>
                      <li>• Brushes/supplies: $80</li>
                    </ul>
                    <div className="mt-3 p-3 bg-gray-900/50 rounded">
                      <p className="font-semibold text-green-400">Total Materials: $450</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">Coverage Formulas</h4>
                    <div className="space-y-3 text-gray-100">
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-base">
                        <p className="text-green-400">Primer needed:</p>
                        <p>Doors × 4 sq ft ÷ 300 = gallons</p>
                      </div>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-base">
                        <p className="text-green-400">Paint needed:</p>
                        <p>Doors × 4 sq ft × 2.5 coats ÷ 350 = gallons</p>
                      </div>
                      <div className="bg-gray-900/50 rounded p-3 font-mono text-base">
                        <p className="text-green-400">Add 20% for boxes if painting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Wood Types */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Pricing by Cabinet Wood Type</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-amber-400 mb-4">Oak Cabinets</h3>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Extensive grain filling required</li>
                    <li>• 2-3 coats grain filler @ $200-300</li>
                    <li>• Extra sanding between coats</li>
                    <li>• Add 20-30% to base price</li>
                    <li>• Best with spray application</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Maple/Cherry</h3>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Smooth surface, minimal grain</li>
                    <li>• Standard prep work sufficient</li>
                    <li>• Excellent paint adhesion</li>
                    <li>• Base pricing applies</li>
                    <li>• Great for any finish level</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Laminate/Thermofoil</h3>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Special bonding primer required</li>
                    <li>• Cannot sand aggressively</li>
                    <li>• Limited to light colors</li>
                    <li>• Reduce price by 10-15%</li>
                    <li>• Lower warranty period</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Previously Painted</h3>
                  <ul className="space-y-2 text-gray-100">
                    <li>• Check for lead paint (pre-1978)</li>
                    <li>• May need stripping</li>
                    <li>• Test adhesion carefully</li>
                    <li>• Add 10-40% for extra prep</li>
                    <li>• Document existing issues</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Quote */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Sample Cabinet Painting Quote</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Medium Kitchen - Oak Cabinets to White</h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-amber-400 mb-3">Cabinet Count</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Upper doors: 18 @ $125 = $2,250</li>
                        <li>• Lower doors: 10 @ $125 = $1,250</li>
                        <li>• Drawer fronts: 8 @ $65 = $520</li>
                        <li>• False panels: 2 @ $50 = $100</li>
                        <li>• Cabinet boxes: Included</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">Additional Work</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Grain filling (oak): $450</li>
                        <li>• Crown molding: $200</li>
                        <li>• Interior shelves: $300</li>
                        <li>• Hardware holes: $150</li>
                        <li>• Kitchen protection: $100</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Quote Summary</h4>
                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-100">Door/Drawer Painting</span>
                          <span className="text-white">$4,120</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Additional Work</span>
                          <span className="text-white">$1,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Materials</span>
                          <span className="text-white">$580</span>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span className="text-white">Total Investment</span>
                            <span className="text-green-400">$5,900</span>
                          </div>
                          <div className="flex justify-between text-base mt-1">
                            <span className="text-gray-200">vs. New Cabinets</span>
                            <span className="text-gray-200">Save $12,000+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <p className="text-gray-100">
                      <strong className="text-green-400">Value Proposition:</strong> Transform your kitchen for 30% of 
                      replacement cost. Professional spray finish, 3-year warranty, completed in one week.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Cabinet Quoting Best Practices</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Do&apos;s</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Always test existing finish adhesion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Take before photos for protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Explain spray vs brush differences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Offer sample doors when possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Include detailed warranty terms</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Don&apos;ts</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Never skip proper prep work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Don&apos;t promise unrealistic timelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Avoid painting over damage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Don&apos;t use wall paint on cabinets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Never guarantee exact color matches</span>
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
              <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Quote Cabinet Jobs with Confidence
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Our software calculates door counts, tracks finish options, and generates professional 
                  cabinet painting proposals that sell the value.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                      Try Cabinet Calculator
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Cabinet Painting Resources</h2>
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
                      Interior Painting
                    </h3>
                    <p className="text-base text-gray-200">
                      Room-by-room pricing guide
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/specialty-finishes" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Paintbrush className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Specialty Finishes
                    </h3>
                    <p className="text-base text-gray-200">
                      Advanced painting techniques
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