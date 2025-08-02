import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Clock,
  Users,
  DollarSign,
  Calculator,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  ArrowRight,
  Sparkles,
  BarChart3,
  Wrench
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Labor Cost Estimation for Painting: Calculate Crew Hours & Rates [2024]',
  description: 'Master labor cost estimation for painting projects. Production rates, crew sizing, and pricing formulas. Calculate accurate labor costs in minutes.',
  keywords: 'painting labor cost, labor estimation painting, crew hour calculation, painting production rates',
  openGraph: {
    title: 'Labor Cost Estimation: Professional Painting Calculator',
    description: 'Calculate exact labor costs for painting projects with production rates and crew optimization strategies.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/labor-cost-estimation'
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
        "@id": "https://paintquotepro.com/guides/labor-cost-estimation"
      },
      "headline": "Labor Cost Estimation for Painting Projects: Complete Guide",
      "description": "Comprehensive guide to calculating labor costs for painting projects including production rates, crew sizing, and pricing strategies.",
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
          "name": "How do you calculate labor cost for painting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Calculate painting labor cost by: (Square Footage ÷ Production Rate per Hour) × Hourly Rate × Crew Size. For example: 2,000 sq ft ÷ 200 sq ft/hour = 10 hours × $50/hour × 2 workers = $1,000 labor cost. Add 20-30% for prep work and cleanup."
          }
        },
        {
          "@type": "Question",
          "name": "What is the average hourly rate for painters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Painter hourly rates average: Employee painters $20-35/hour, Skilled painters $35-50/hour, Lead painters $45-65/hour, Subcontractors $50-80/hour. Rates vary by region, with major cities 20-40% higher than rural areas."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Estimate Painting Labor Costs",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Calculate total work hours",
          "text": "Divide square footage by production rate to get base hours needed"
        },
        {
          "@type": "HowToStep",
          "name": "Add prep and cleanup time",
          "text": "Add 20-30% to base hours for preparation and cleanup work"
        },
        {
          "@type": "HowToStep",
          "name": "Determine crew size",
          "text": "Choose optimal crew size based on project timeline and efficiency"
        },
        {
          "@type": "HowToStep",
          "name": "Apply hourly rates",
          "text": "Multiply total hours by hourly rate including burden costs"
        },
        {
          "@type": "HowToStep",
          "name": "Add contingency",
          "text": "Include 10-15% contingency for unexpected issues"
        }
      ]
    }
  ]
}

export default function LaborCostEstimationGuide() {
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Labor Costs</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Labor Cost Estimation for Painting
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Master accurate labor cost calculations with production rates, crew optimization, 
                and real-world pricing formulas. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Try Labor Calculator
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

        {/* Quick Answer Section */}
        <section className="py-8 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">How Do You Calculate Painting Labor Cost?</h2>
                <p className="text-lg text-gray-100">
                  Calculate painting labor cost by: (Square Footage ÷ Production Rate per Hour) × Hourly Rate × Crew Size. 
                  For example: 2,000 sq ft ÷ 200 sq ft/hour = 10 hours × $50/hour × 2 workers = $1,000 labor cost. 
                  Add 20-30% for prep work and cleanup.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Master Formula */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">The Labor Cost Formula</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-6 inline-block">
                    <div className="font-mono text-2xl text-emerald-400">
                      Labor Cost = (Hours × Rate × Crew) + Burden + Contingency
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">Formula Components</h3>
                    <ul className="space-y-3 text-gray-100">
                      <li className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-emerald-400 mt-0.5" />
                        <div>
                          <strong>Hours:</strong> Total work hours needed
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-400 mt-0.5" />
                        <div>
                          <strong>Rate:</strong> Hourly wage per worker
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-emerald-400 mt-0.5" />
                        <div>
                          <strong>Crew:</strong> Number of workers
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-400 mt-0.5" />
                        <div>
                          <strong>Burden:</strong> Taxes, insurance (30-40%)
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Example Calculation</h3>
                    <div className="bg-gray-900/50 rounded p-4 space-y-2 font-mono text-base">
                      <p className="text-gray-200">{"// 2,500 sq ft interior"}</p>
                      <p className="text-green-400">Production: 200 sq ft/hour</p>
                      <p className="text-green-400">Hours: 2,500 ÷ 200 = 12.5</p>
                      <p className="text-green-400">Rate: $30/hour base</p>
                      <p className="text-green-400">Crew: 2 painters</p>
                      <p className="text-gray-200">{"// Calculation"}</p>
                      <p className="text-yellow-400">12.5 × $30 × 2 = $750</p>
                      <p className="text-yellow-400">+ 35% burden = $262.50</p>
                      <p className="text-cyan-400">Total Labor: $1,012.50</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Production Rates */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Standard Production Rates</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-200">Task</th>
                        <th className="text-center py-3 px-4 text-gray-200">Sq Ft/Hour</th>
                        <th className="text-center py-3 px-4 text-gray-200">Skill Level</th>
                        <th className="text-center py-3 px-4 text-gray-200">Quality</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-100">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Interior Wall Rolling</td>
                        <td className="text-center">180-250</td>
                        <td className="text-center text-green-400">Entry</td>
                        <td className="text-center">Standard</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Interior Cutting In</td>
                        <td className="text-center">100-150</td>
                        <td className="text-center text-yellow-400">Skilled</td>
                        <td className="text-center">High</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Exterior Siding</td>
                        <td className="text-center">150-200</td>
                        <td className="text-center text-yellow-400">Skilled</td>
                        <td className="text-center">Standard</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Trim/Detail Work</td>
                        <td className="text-center">50-75</td>
                        <td className="text-center text-orange-400">Expert</td>
                        <td className="text-center">Premium</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Ceiling Painting</td>
                        <td className="text-center">150-200</td>
                        <td className="text-center text-yellow-400">Skilled</td>
                        <td className="text-center">Standard</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">Cabinet Spraying</td>
                        <td className="text-center">20-30 doors</td>
                        <td className="text-center text-orange-400">Expert</td>
                        <td className="text-center">Premium</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Prep Work (general)</td>
                        <td className="text-center">100-150</td>
                        <td className="text-center text-green-400">Entry</td>
                        <td className="text-center">Critical</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg">
                  <p className="text-base text-gray-100">
                    <strong className="text-emerald-400">Pro Tip:</strong> Adjust production rates based on surface condition 
                    (-20% for poor condition), height factors (-15% for high ceilings), and crew experience level.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Hourly Rates by Region */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Painter Hourly Rates by Region</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">High Cost Regions</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex justify-between">
                      <span>San Francisco/NYC:</span>
                      <span className="text-green-400 font-semibold">$45-80/hr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Seattle/Boston:</span>
                      <span className="text-green-400 font-semibold">$40-70/hr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Los Angeles/DC:</span>
                      <span className="text-green-400 font-semibold">$38-65/hr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Chicago/Denver:</span>
                      <span className="text-green-400 font-semibold">$35-60/hr</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Average Cost Regions</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex justify-between">
                      <span>Phoenix/Atlanta:</span>
                      <span className="text-yellow-400 font-semibold">$30-50/hr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dallas/Houston:</span>
                      <span className="text-yellow-400 font-semibold">$28-48/hr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Orlando/Tampa:</span>
                      <span className="text-yellow-400 font-semibold">$25-45/hr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Rural Areas:</span>
                      <span className="text-yellow-400 font-semibold">$20-40/hr</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 p-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Labor Burden Breakdown</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-emerald-400 font-semibold mb-2">Employee Costs (30-40%)</h4>
                    <ul className="text-base text-gray-100 space-y-1">
                      <li>• Payroll taxes: 7.65%</li>
                      <li>• Workers comp: 8-15%</li>
                      <li>• Unemployment: 3-6%</li>
                      <li>• Benefits: 5-15%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-teal-400 font-semibold mb-2">Subcontractor Markup</h4>
                    <ul className="text-base text-gray-100 space-y-1">
                      <li>• Base rate: $40-60/hr</li>
                      <li>• Your markup: 15-25%</li>
                      <li>• No burden costs</li>
                      <li>• 1099 filing required</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-cyan-400 font-semibold mb-2">Hidden Costs</h4>
                    <ul className="text-base text-gray-100 space-y-1">
                      <li>• Drive time pay</li>
                      <li>• Tool allowance</li>
                      <li>• Training time</li>
                      <li>• Callbacks/warranty</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Crew Optimization */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Crew Size Optimization</h2>
              
              <div className="space-y-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Optimal Crew Configurations</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-emerald-400 mb-3">Residential Projects</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• <strong>1 Painter:</strong> Small rooms, touch-ups (&lt; 500 sq ft)</li>
                        <li>• <strong>2 Painters:</strong> Standard rooms, efficiency sweet spot</li>
                        <li>• <strong>3-4 Painters:</strong> Whole house, tight deadlines</li>
                        <li>• <strong>Lead + Helper:</strong> Quality focus, training</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">Commercial Projects</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• <strong>2-3 Painters:</strong> Small offices (&lt; 5,000 sq ft)</li>
                        <li>• <strong>4-6 Painters:</strong> Medium buildings</li>
                        <li>• <strong>8+ Painters:</strong> Large projects, phases</li>
                        <li>• <strong>Spray + Back-roll:</strong> Maximum efficiency</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Efficiency Factors</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-500/10 rounded p-4 text-center">
                      <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold text-green-400 mb-2">2-Person Crew</h4>
                      <p className="text-2xl font-bold text-white mb-1">100%</p>
                      <p className="text-base text-gray-100">Peak efficiency</p>
                    </div>
                    <div className="bg-yellow-500/10 rounded p-4 text-center">
                      <Users className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold text-yellow-400 mb-2">3-4 Person Crew</h4>
                      <p className="text-2xl font-bold text-white mb-1">85-90%</p>
                      <p className="text-base text-gray-100">Good for speed</p>
                    </div>
                    <div className="bg-orange-500/10 rounded p-4 text-center">
                      <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold text-orange-400 mb-2">5+ Person Crew</h4>
                      <p className="text-2xl font-bold text-white mb-1">70-80%</p>
                      <p className="text-base text-gray-100">Coordination issues</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Labor Calculation Examples */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Real-World Labor Examples</h2>
              
              <div className="space-y-6">
                <Card className="bg-gray-800/30 border-gray-700 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Example 1: 3-Bedroom House Interior</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-emerald-400 mb-3">Project Details</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Total area: 1,800 sq ft walls</li>
                        <li>• Ceilings: 1,200 sq ft</li>
                        <li>• Condition: Good, minor prep</li>
                        <li>• Paint: 2 coats, 3 colors</li>
                        <li>• Timeline: 3 days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Labor Breakdown</h4>
                      <div className="bg-gray-900/50 rounded p-4 font-mono text-base">
                        <p className="text-green-400">Prep: 8 hours × 2 = 16 hrs</p>
                        <p className="text-green-400">Walls: 1,800 ÷ 200 = 9 hrs</p>
                        <p className="text-green-400">Ceilings: 1,200 ÷ 180 = 7 hrs</p>
                        <p className="text-green-400">Trim: 6 hours</p>
                        <p className="text-yellow-400">Total: 38 hrs × $35 = $1,330</p>
                        <p className="text-yellow-400">+ 35% burden = $465</p>
                        <p className="text-cyan-400 font-bold">Total Labor: $1,795</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Example 2: Commercial Office Repaint</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-3">Project Details</h4>
                      <ul className="space-y-2 text-gray-100">
                        <li>• Total area: 8,000 sq ft</li>
                        <li>• After-hours work required</li>
                        <li>• Low-VOC paint mandatory</li>
                        <li>• 4-person crew</li>
                        <li>• Timeline: 5 nights</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-3">Labor Breakdown</h4>
                      <div className="bg-gray-900/50 rounded p-4 font-mono text-base">
                        <p className="text-green-400">Base hours: 8,000 ÷ 220 = 36</p>
                        <p className="text-green-400">4-person crew ÷ 0.85 = 42 hrs</p>
                        <p className="text-green-400">Night shift premium: +25%</p>
                        <p className="text-yellow-400">42 hrs × $45 × 1.25 = $2,363</p>
                        <p className="text-yellow-400">× 4 workers = $9,450</p>
                        <p className="text-yellow-400">+ 30% burden = $2,835</p>
                        <p className="text-cyan-400 font-bold">Total Labor: $12,285</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Labor Estimation Best Practices</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Do&apos;s</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Track actual vs estimated hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Include setup/cleanup time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Factor in crew experience levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Add contingency for unknowns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Consider project complexity</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Don&apos;ts</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Use same rates for all tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Forget labor burden costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Ignore travel time between sites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Assume perfect conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Cut rates to win jobs</span>
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
              <Card className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Calculate Labor Costs Instantly
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Stop guessing labor hours. Our AI-powered calculator uses real production rates and 
                  automatically factors in crew size, project complexity, and regional rates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                      Try Labor Calculator
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/guides/how-to-quote-painting-jobs">
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Complete Quote Guide
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Labor Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Complete Quoting Guide
                    </h3>
                    <p className="text-base text-gray-200">
                      Master guide to all quoting aspects
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/paint-quantity-calculations" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Calculator className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Paint Calculations
                    </h3>
                    <p className="text-base text-gray-200">
                      Material quantity formulas
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/pricing-psychology" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <TrendingUp className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Pricing Psychology
                    </h3>
                    <p className="text-base text-gray-200">
                      Win more jobs with smart pricing
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