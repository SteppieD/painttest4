import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Calculator, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Home, 
  Paintbrush, 
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  BookOpen,
  Target,
  Sparkles,
  BarChart3,
  Shield,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Quote Painting Jobs [2024]: Win 40% More Bids',
  description: 'Create painting quotes in 15 minutes that win 40% more jobs. Free calculator, templates & pricing formulas used by 2,000+ contractors. Start winning →',
  keywords: 'how to quote painting jobs, painting estimate guide, painting contractor pricing, house painting quotes, commercial painting estimates',
  openGraph: {
    title: 'How to Quote Painting Jobs: The Ultimate Guide',
    description: 'Master the art of painting estimates with our comprehensive guide. Learn pricing strategies, measurement techniques, and tools to win more jobs.',
    type: 'article',
    publishedTime: '2024-01-15T00:00:00.000Z',
    authors: ['PaintQuote Pro Team'],
  },
  alternates: {
    canonical: '/guides/how-to-quote-painting-jobs'
  }
}

// Table of Contents data
const tableOfContents = [
  { id: 'basics', title: '1. Understanding Painting Quotes', icon: BookOpen },
  { id: 'measurements', title: '2. Measuring & Calculating', icon: Calculator },
  { id: 'pricing', title: '3. Pricing Your Services', icon: DollarSign },
  { id: 'materials', title: '4. Estimating Materials', icon: Paintbrush },
  { id: 'labor', title: '5. Calculating Labor Costs', icon: Users },
  { id: 'creating', title: '6. Creating Professional Quotes', icon: FileText },
  { id: 'tools', title: '7. Tools & Software', icon: Zap },
  { id: 'winning', title: '8. Winning More Jobs', icon: TrendingUp },
]

export default function HowToQuotePaintingJobsGuide() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://paintquotepro.com/guides/how-to-quote-painting-jobs"
        },
        "headline": "How to Quote Painting Jobs [2024]: Win 40% More Bids",
        "description": "Create painting quotes in 15 minutes that win 40% more jobs. Free calculator, templates & pricing formulas used by 2,000+ contractors.",
        "image": [
          "https://paintquotepro.com/images/painting-quote-hero.jpg",
          "https://paintquotepro.com/images/quote-example.jpg",
          "https://paintquotepro.com/images/pricing-calculator.jpg"
        ],
        "datePublished": "2024-01-15",
        "dateModified": "2024-01-25",
        "author": {
          "@type": "Organization",
          "name": "PaintQuote Pro",
          "url": "https://paintquotepro.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "PaintQuote Pro",
          "logo": {
            "@type": "ImageObject",
            "url": "https://paintquotepro.com/logo.png"
          }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long should it take to create a painting quote?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With modern quoting software, professional painting quotes can be created in 10-15 minutes. Traditional methods typically take 2-3 hours per quote."
            }
          },
          {
            "@type": "Question",
            "name": "What's the average cost to paint a house interior?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Interior painting typically costs $2-6 per square foot, or $2,000-6,000 for a 2,000 sq ft home. Factors include paint quality, wall condition, and regional labor rates."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate paint quantities needed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide total square footage by the coverage rate (typically 350-400 sq ft per gallon), then add 10-15% for touch-ups and waste. Our free calculator automates this process."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Create a Professional Painting Quote",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Measure the Space",
            "text": "Accurately measure all surfaces to be painted, including walls, ceilings, and trim."
          },
          {
            "@type": "HowToStep",
            "name": "Calculate Materials",
            "text": "Determine paint quantities based on surface area and coverage rates."
          },
          {
            "@type": "HowToStep",
            "name": "Estimate Labor",
            "text": "Calculate labor hours based on project complexity and crew size."
          },
          {
            "@type": "HowToStep",
            "name": "Add Overhead and Profit",
            "text": "Include business overhead costs and target profit margin."
          },
          {
            "@type": "HowToStep",
            "name": "Present Professionally",
            "text": "Create a detailed, branded quote document with all specifications."
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li>/</li>
                <li className="text-white">How to Quote Painting Jobs</li>
              </ol>
            </nav>

            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                How to Quote Painting Jobs: The Complete Guide
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master the art of creating painting quotes that win jobs. Learn professional techniques, 
                pricing strategies, and tools used by successful contractors.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">15 min</div>
                  <div className="text-sm text-gray-400">Reading time</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">40%+</div>
                  <div className="text-sm text-gray-400">Higher win rate</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">2024</div>
                  <div className="text-sm text-gray-400">Updated guide</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Try PaintQuote Pro Free
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/paint-quote-calculator">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Free Quote Calculator
                    <Calculator className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gray-800/50 border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  Table of Contents
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
                    >
                      <item.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
                      <span className="text-gray-300 group-hover:text-white">{item.title}</span>
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Section 1: Understanding Painting Quotes */}
            <section id="basics" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">What is a Professional Painting Quote?</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  A professional painting quote is a detailed document that includes scope of work, material specifications with quantities, 
                  labor costs, project timeline, payment terms, and warranty information. It serves as both a pricing tool and a contract 
                  foundation that sets clear expectations between contractor and client.
                </p>

                <Card className="bg-gray-800/30 border-gray-700 p-6 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Essential Components of a Painting Quote</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Detailed Scope of Work:</strong>
                        <span className="text-gray-300"> Specific areas to be painted, preparation work, and number of coats</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Materials List:</strong>
                        <span className="text-gray-300"> Paint brands, primers, and supplies with quantities</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Labor Breakdown:</strong>
                        <span className="text-gray-300"> Hours required and labor rates</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Timeline:</strong>
                        <span className="text-gray-300"> Start date, duration, and completion date</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-white">Terms & Conditions:</strong>
                        <span className="text-gray-300"> Payment terms, warranty, and policies</span>
                      </div>
                    </li>
                  </ul>
                </Card>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">Pro Tip</h4>
                  <p className="text-gray-300">
                    Professional contractors using <Link href="/features" className="text-blue-400 hover:text-blue-300">painting estimate software</Link> create 
                    quotes 6x faster while maintaining accuracy and professionalism.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Measuring & Calculating */}
            <section id="measurements" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">Measuring & Calculating Square Footage</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  Accurate measurements are the foundation of profitable painting quotes. Here's how to measure 
                  different surfaces correctly:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <Home className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">Interior Walls</h3>
                    <ol className="space-y-2 text-gray-300">
                      <li>1. Measure wall height and width</li>
                      <li>2. Multiply to get square footage</li>
                      <li>3. Subtract doors (21 sq ft) and windows (15 sq ft)</li>
                      <li>4. Add 10% for touch-ups and waste</li>
                    </ol>
                    <div className="mt-4 p-3 bg-gray-900/50 rounded">
                      <code className="text-sm text-green-400">
                        Wall SF = (Height × Width) - Openings + 10%
                      </code>
                    </div>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <Home className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">Exterior Siding</h3>
                    <ol className="space-y-2 text-gray-300">
                      <li>1. Measure perimeter of building</li>
                      <li>2. Multiply by height to eaves</li>
                      <li>3. Add gable ends separately</li>
                      <li>4. Subtract large openings only</li>
                    </ol>
                    <div className="mt-4 p-3 bg-gray-900/50 rounded">
                      <code className="text-sm text-green-400">
                        Siding SF = (Perimeter × Height) + Gables
                      </code>
                    </div>
                  </Card>
                </div>

                <Card className="bg-yellow-500/10 border-yellow-500/30 p-6 mb-8">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-3">Quick Reference: Coverage Rates</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
                    <div>
                      <strong className="text-white">Smooth Walls:</strong>
                      <div>350-400 sq ft/gallon</div>
                    </div>
                    <div>
                      <strong className="text-white">Textured Walls:</strong>
                      <div>250-350 sq ft/gallon</div>
                    </div>
                    <div>
                      <strong className="text-white">Primer:</strong>
                      <div>200-300 sq ft/gallon</div>
                    </div>
                    <div>
                      <strong className="text-white">Ceiling Paint:</strong>
                      <div>350-400 sq ft/gallon</div>
                    </div>
                  </div>
                </Card>

                <div className="text-center">
                  <Link href="/paint-quote-calculator">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Try Our Free Paint Calculator
                      <Calculator className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 3: Pricing Your Services */}
            <section id="pricing" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">Pricing Your Painting Services</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  Setting the right price is crucial for profitability and competitiveness. Here are the most 
                  common pricing methods used by successful painting contractors:
                </p>

                <div className="space-y-6 mb-8">
                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <div className="flex items-start gap-4">
                      <DollarSign className="h-8 w-8 text-green-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Square Foot Pricing</h3>
                        <p className="text-gray-300 mb-3">
                          The most common method for residential painting. Prices typically range:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Interior walls: $1.50 - $3.50 per sq ft</li>
                          <li>• Ceilings: $1.00 - $2.50 per sq ft</li>
                          <li>• Exterior siding: $1.50 - $4.00 per sq ft</li>
                          <li>• Trim & detail work: $2.00 - $6.00 per linear ft</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <div className="flex items-start gap-4">
                      <Clock className="h-8 w-8 text-blue-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Hourly Rate Pricing</h3>
                        <p className="text-gray-300 mb-3">
                          Best for complex or unique projects. Industry standards:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Solo painter: $50 - $80 per hour</li>
                          <li>• Two-person crew: $85 - $120 per hour</li>
                          <li>• Specialized work: $100 - $150 per hour</li>
                          <li>• Include setup/cleanup time in estimates</li>
                        </ul>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <div className="flex items-start gap-4">
                      <Target className="h-8 w-8 text-purple-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Room-Based Pricing</h3>
                        <p className="text-gray-300 mb-3">
                          Simple for customers to understand. Average rates:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Bedroom: $300 - $750</li>
                          <li>• Living room: $400 - $1,000</li>
                          <li>• Kitchen: $350 - $850</li>
                          <li>• Bathroom: $200 - $500</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Regional Price Variations</h3>
                  <p className="text-gray-300 mb-4">
                    Painting prices vary significantly by location. Use our <Link href="/guides/painting-contractors-by-city" className="text-blue-400 hover:text-blue-300">city-specific pricing guides</Link> for 
                    accurate local rates.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Northeast</div>
                      <div className="text-lg font-semibold text-white">+15-25%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">West Coast</div>
                      <div className="text-lg font-semibold text-white">+20-30%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Midwest</div>
                      <div className="text-lg font-semibold text-white">Baseline</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">South</div>
                      <div className="text-lg font-semibold text-white">-5-15%</div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Section 4: Estimating Materials */}
            <section id="materials" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">Estimating Paint & Materials</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  Accurate material estimation prevents costly overruns and ensures profitability. Here's how 
                  to calculate exactly what you need:
                </p>

                <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Paint Calculation Formula</h3>
                  <div className="bg-gray-900/50 rounded-lg p-6 font-mono text-sm">
                    <div className="text-green-400 mb-2">// Basic Paint Calculation</div>
                    <div className="text-gray-300">Total Square Feet ÷ Coverage Rate = Gallons Needed</div>
                    <div className="text-gray-300 mt-4">Example: 2,000 sq ft ÷ 350 sq ft/gal = 5.7 gallons</div>
                    <div className="text-gray-300">Round up to 6 gallons + 10% = 7 gallons total</div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <Paintbrush className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">Paint Requirements by Surface</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 text-gray-400">Surface</th>
                          <th className="text-right py-2 text-gray-400">Coats</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-800">
                          <td className="py-2">New drywall</td>
                          <td className="text-right">1 primer + 2 paint</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2">Previously painted</td>
                          <td className="text-right">1-2 paint</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2">Dark to light color</td>
                          <td className="text-right">1 primer + 2-3 paint</td>
                        </tr>
                        <tr>
                          <td className="py-2">Stained wood</td>
                          <td className="text-right">1-2 primer + 2 paint</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <Shield className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">Additional Materials Checklist</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Drop cloths (1 per 100 sq ft)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Painter's tape (1 roll per room)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Brushes & rollers (10% replacement)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Primer (60-70% of paint amount)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Caulk & spackle (1 tube per 3 rooms)
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </section>

            {/* Section 5: Labor Costs */}
            <section id="labor" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">Calculating Labor Costs</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  Labor typically accounts for 70-85% of a painting project's cost. Accurate labor estimation 
                  is critical for profitability.
                </p>

                <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Production Rates by Task</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 text-gray-400">Task</th>
                          <th className="text-right py-3 text-gray-400">Sq Ft/Hour</th>
                          <th className="text-right py-3 text-gray-400">Hours/1000 sq ft</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Wall prep (minor)</td>
                          <td className="text-right">150-200</td>
                          <td className="text-right">5-7</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Priming</td>
                          <td className="text-right">120-180</td>
                          <td className="text-right">6-8</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Rolling walls</td>
                          <td className="text-right">180-250</td>
                          <td className="text-right">4-6</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Cutting in</td>
                          <td className="text-right">100-150</td>
                          <td className="text-right">7-10</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Trim painting</td>
                          <td className="text-right">50-75 linear ft</td>
                          <td className="text-right">N/A</td>
                        </tr>
                        <tr>
                          <td className="py-3">Cleanup</td>
                          <td className="text-right">300-400</td>
                          <td className="text-right">2.5-3</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-blue-500/10 border-blue-500/30 p-6">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Labor Cost Formula</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="font-mono text-sm bg-gray-900/50 p-3 rounded">
                        Total Hours × Hourly Rate × Burden Rate = Labor Cost
                      </div>
                      <p className="text-sm">
                        <strong>Burden Rate:</strong> 1.3-1.5x to cover taxes, insurance, overhead
                      </p>
                      <p className="text-sm">
                        <strong>Example:</strong> 40 hours × $30/hr × 1.4 = $1,680 labor cost
                      </p>
                    </div>
                  </Card>

                  <Card className="bg-purple-500/10 border-purple-500/30 p-6">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">Efficiency Factors</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• <strong>Height:</strong> Add 10-20% for work above 8 ft</li>
                      <li>• <strong>Furniture:</strong> Add 15-25% for occupied spaces</li>
                      <li>• <strong>Detail work:</strong> Add 30-50% for intricate trim</li>
                      <li>• <strong>Surface condition:</strong> Add 20-40% for repairs</li>
                      <li>• <strong>Multiple colors:</strong> Add 10-15% per color</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </section>

            {/* Section 6: Creating Professional Quotes */}
            <section id="creating" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">Creating Professional Quotes</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  A professional quote is your sales tool. It should be clear, detailed, and instill confidence 
                  in your expertise.
                </p>

                <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Professional Quote Template Structure</h3>
                  <ol className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <div>
                        <strong className="text-white">Header & Branding</strong>
                        <p className="text-sm mt-1">Company logo, contact info, quote number, and date</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <div>
                        <strong className="text-white">Customer Information</strong>
                        <p className="text-sm mt-1">Name, address, phone, email, and project location</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <div>
                        <strong className="text-white">Detailed Scope of Work</strong>
                        <p className="text-sm mt-1">Room-by-room breakdown with specific tasks</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                      <div>
                        <strong className="text-white">Materials & Colors</strong>
                        <p className="text-sm mt-1">Paint brands, sheens, color codes, and quantities</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                      <div>
                        <strong className="text-white">Pricing Breakdown</strong>
                        <p className="text-sm mt-1">Labor, materials, and total with payment options</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                      <div>
                        <strong className="text-white">Terms & Conditions</strong>
                        <p className="text-sm mt-1">Timeline, warranty, payment terms, and policies</p>
                      </div>
                    </li>
                  </ol>
                </Card>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 text-center">
                    <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Build Trust</h3>
                    <p className="text-sm text-gray-300">
                      Include insurance info, licenses, and testimonials
                    </p>
                  </Card>
                  <Card className="bg-gray-800/30 border-gray-700 p-6 text-center">
                    <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Stand Out</h3>
                    <p className="text-sm text-gray-300">
                      Use professional templates and clear formatting
                    </p>
                  </Card>
                  <Card className="bg-gray-800/30 border-gray-700 p-6 text-center">
                    <Clock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Be Timely</h3>
                    <p className="text-sm text-gray-300">
                      Deliver quotes within 24 hours of site visit
                    </p>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Quote Presentation Tips</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <span>Present quotes in person when possible—it doubles your close rate</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <span>Offer 2-3 pricing options (good, better, best) to increase average job size</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <span>Include photos of similar completed projects</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <span>Follow up within 48 hours with a call or email</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* Section 7: Tools & Software */}
            <section id="tools" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">Quoting Tools & Software</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  The right tools can transform your quoting process from hours to minutes while improving 
                  accuracy and professionalism.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Traditional Tools</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-red-400">✗</span>
                        <div>
                          <strong>Pen & Paper:</strong> Slow, error-prone, unprofessional appearance
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400">~</span>
                        <div>
                          <strong>Excel Spreadsheets:</strong> Better but still time-consuming, no automation
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-400">~</span>
                        <div>
                          <strong>Generic Invoicing Apps:</strong> Not designed for painting estimates
                        </div>
                      </li>
                    </ul>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      <Link href="/features" className="hover:text-blue-400 transition-colors">
                        Modern Painting Software
                      </Link>
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <div>
                          <strong>AI-Powered:</strong> Instant calculations and smart suggestions
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <div>
                          <strong>Professional Templates:</strong> Customizable, branded quotes
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-400">✓</span>
                        <div>
                          <strong>Mobile-First:</strong> Create quotes on-site from any device
                        </div>
                      </li>
                    </ul>
                  </Card>
                </div>

                <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    PaintQuote Pro vs Traditional Methods
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 text-gray-400">Feature</th>
                          <th className="text-center py-3 text-gray-400">Traditional</th>
                          <th className="text-center py-3 text-gray-400">
                            <Link href="/" className="text-blue-400 hover:text-blue-300">PaintQuote Pro</Link>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Time to create quote</td>
                          <td className="text-center">2-3 hours</td>
                          <td className="text-center text-green-400 font-semibold">10-15 minutes</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Accuracy rate</td>
                          <td className="text-center">70-80%</td>
                          <td className="text-center text-green-400 font-semibold">95%+</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Professional appearance</td>
                          <td className="text-center">Basic</td>
                          <td className="text-center text-green-400 font-semibold">Premium</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Win rate improvement</td>
                          <td className="text-center">Baseline</td>
                          <td className="text-center text-green-400 font-semibold">+40-60%</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3">Monthly cost</td>
                          <td className="text-center">$0 (+ lost jobs)</td>
                          <td className="text-center text-green-400 font-semibold">$79</td>
                        </tr>
                        <tr>
                          <td className="py-3">ROI</td>
                          <td className="text-center">N/A</td>
                          <td className="text-center text-green-400 font-semibold">283x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <div className="text-center">
                  <p className="text-lg text-gray-300 mb-6">
                    Join 2,000+ painting contractors saving 6+ hours per week
                  </p>
                  <Link href="/trial-signup">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Start Free 14-Day Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 8: Winning More Jobs */}
            <section id="winning" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-white mb-6">Strategies for Winning More Jobs</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 mb-6">
                  Creating accurate quotes is just the first step. Here's how top contractors convert more 
                  quotes into paying customers:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <BarChart3 className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">Speed Wins Jobs</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between items-center">
                        <span>Quote within 24 hours:</span>
                        <span className="text-green-400 font-semibold">50% win rate</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Quote within 48 hours:</span>
                        <span className="text-yellow-400 font-semibold">35% win rate</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Quote after 72 hours:</span>
                        <span className="text-red-400 font-semibold">15% win rate</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gray-800/30 border-gray-700 p-6">
                    <Users className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">Follow-Up Formula</h3>
                    <ol className="space-y-2 text-gray-300">
                      <li>1. Send quote within 24 hours</li>
                      <li>2. Follow up call after 48 hours</li>
                      <li>3. Email check-in at 1 week</li>
                      <li>4. Final follow-up at 2 weeks</li>
                      <li>5. Add to nurture campaign</li>
                    </ol>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Pro Tips from Top Contractors</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-yellow-400 mb-3">Presentation</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Always include before/after photos</li>
                        <li>• Offer virtual color consultations</li>
                        <li>• Provide 3D room visualizations</li>
                        <li>• Include customer testimonials</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-orange-400 mb-3">Closing Techniques</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• Create urgency with booking calendars</li>
                        <li>• Offer same-day signing discounts</li>
                        <li>• Provide flexible payment options</li>
                        <li>• Include satisfaction guarantees</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Common Mistakes to Avoid</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">✗</span>
                      <div>
                        <strong>Underpricing:</strong> Competing on price alone leads to unprofitable jobs
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">✗</span>
                      <div>
                        <strong>Vague scope:</strong> Unclear details lead to disputes and scope creep
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">✗</span>
                      <div>
                        <strong>No differentiation:</strong> Failing to highlight what makes you unique
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400">✗</span>
                      <div>
                        <strong>Poor follow-up:</strong> 80% of sales require 5+ touchpoints
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="mt-16">
              <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Quoting Process?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of painting contractors who create professional quotes in minutes, 
                  not hours. Start your free trial today.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">2 min</div>
                    <div className="text-sm text-gray-400">Average quote time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">40%+</div>
                    <div className="text-sm text-gray-400">Higher win rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">283x</div>
                    <div className="text-sm text-gray-400">Average ROI</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Start Free 14-Day Trial
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Watch 2-Min Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  No credit card required • 5 free quotes • Setup in 2 minutes
                </p>
              </Card>
            </section>

            {/* Related Resources */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Related Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/interior-painting-estimator" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <Home className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Interior Painting Calculator
                    </h3>
                    <p className="text-sm text-gray-400">
                      Room-by-room pricing guide with material calculations
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/painting-estimate-software" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Zap className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Best Painting Software 2024
                    </h3>
                    <p className="text-sm text-gray-400">
                      Compare top painting estimate software solutions
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/painting-business-guide" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <TrendingUp className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Grow Your Painting Business
                    </h3>
                    <p className="text-sm text-gray-400">
                      Strategies to scale from $100k to $1M+ revenue
                    </p>
                  </Card>
                </Link>
              </div>
            </section>

            {/* Schema.org FAQ Section */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    How long should it take to create a painting quote?
                  </h3>
                  <p className="text-gray-300">
                    With modern quoting software, professional painting quotes can be created in 10-15 minutes. 
                    Traditional methods typically take 2-3 hours per quote.
                  </p>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    What's the average cost to paint a house interior?
                  </h3>
                  <p className="text-gray-300">
                    Interior painting typically costs $2-6 per square foot, or $2,000-6,000 for a 2,000 sq ft home. 
                    Factors include paint quality, wall condition, and regional labor rates.
                  </p>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    How do I calculate paint quantities needed?
                  </h3>
                  <p className="text-gray-300">
                    Divide total square footage by the coverage rate (typically 350-400 sq ft per gallon), 
                    then add 10-15% for touch-ups and waste. Our free calculator automates this process.
                  </p>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
      <ModernFooter />
    </>
  )
}