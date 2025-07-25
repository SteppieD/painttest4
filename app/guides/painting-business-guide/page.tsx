import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Award,
  Briefcase,
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Zap,
  ArrowRight,
  FileText,
  Calculator,
  Sparkles,
  Building,
  Truck,
  Settings,
  Phone
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Start & Grow a Painting Business: Complete 2024 Guide',
  description: 'Learn how to start, run, and scale a profitable painting business. From startup to $1M+ revenue, get proven strategies used by successful contractors.',
  keywords: 'painting business, how to start painting business, painting contractor guide, grow painting company, painting business plan',
  openGraph: {
    title: 'Complete Guide to Starting & Growing a Painting Business',
    description: 'Step-by-step guide to building a successful painting company. Learn pricing, marketing, operations, and scaling strategies.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
    authors: ['PaintQuote Pro Team'],
  },
  alternates: {
    canonical: '/guides/painting-business-guide'
  }
}

// Schema markup for rich snippets
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://paintquotepro.com/guides/painting-business-guide"
      },
      "headline": "How to Start and Grow a Painting Business: Complete Guide",
      "description": "Comprehensive guide to starting, running, and scaling a profitable painting business. From startup to $1M+ revenue with proven strategies.",
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
          "name": "How much does it cost to start a painting business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Starting a painting business costs $2,000-10,000. Basic startup: $2,000-5,000 (tools, insurance, license, marketing). Professional setup: $5,000-10,000 (van wrap, better equipment, working capital). Many start with under $3,000 and grow from profits."
          }
        },
        {
          "@type": "Question",
          "name": "How profitable is a painting business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Painting businesses typically achieve 30-50% profit margins. Solo painters: 40-50% margins on $100-200k revenue. Small crews: 35-45% on $300-600k. Larger companies: 25-35% on $1M+. Key is efficient operations and proper pricing."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a license to start a painting business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most states require a business license and contractor's license for painting. Requirements vary: some states need licensing for jobs over $500-1,000, others have no threshold. Always need general liability insurance ($1-2M minimum) and workers' comp if hiring employees."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Start a Painting Business",
      "description": "Step-by-step guide to launching a professional painting company",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "minValue": "2000",
        "maxValue": "10000"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Create a business plan",
          "text": "Define your target market, services, pricing strategy, and financial projections"
        },
        {
          "@type": "HowToStep",
          "name": "Register your business",
          "text": "Choose business structure (LLC recommended), register with state, get EIN from IRS"
        },
        {
          "@type": "HowToStep",
          "name": "Get licensed and insured",
          "text": "Obtain contractor's license, general liability insurance, and any required bonds"
        },
        {
          "@type": "HowToStep",
          "name": "Buy equipment and tools",
          "text": "Purchase quality brushes, rollers, ladders, drop cloths, and safety equipment"
        },
        {
          "@type": "HowToStep",
          "name": "Set up business systems",
          "text": "Implement quoting software, accounting system, and customer management tools"
        },
        {
          "@type": "HowToStep",
          "name": "Market your services",
          "text": "Create website, claim Google Business Profile, network locally, ask for referrals"
        }
      ]
    }
  ]
}

// Business stages data
const businessStages = [
  {
    stage: 'Startup',
    revenue: '$0-100k',
    icon: Briefcase,
    color: 'blue',
    challenges: ['Getting first customers', 'Setting prices', 'Basic operations']
  },
  {
    stage: 'Growth',
    revenue: '$100k-500k',
    icon: TrendingUp,
    color: 'green',
    challenges: ['Hiring first employees', 'Systems & processes', 'Cash flow']
  },
  {
    stage: 'Scale',
    revenue: '$500k-1M',
    icon: Users,
    color: 'purple',
    challenges: ['Managing crews', 'Quality control', 'Marketing ROI']
  },
  {
    stage: 'Enterprise',
    revenue: '$1M+',
    icon: Building,
    color: 'yellow',
    challenges: ['Multiple locations', 'Leadership team', 'Exit strategy']
  }
]

// Revenue benchmarks
const revenueBenchmarks = {
  solo: { monthly: '$8,000-15,000', yearly: '$96,000-180,000', margin: '40-50%' },
  small: { monthly: '$25,000-50,000', yearly: '$300,000-600,000', margin: '35-45%' },
  medium: { monthly: '$50,000-100,000', yearly: '$600,000-1.2M', margin: '30-40%' },
  large: { monthly: '$100,000+', yearly: '$1.2M+', margin: '25-35%' }
}

export default function PaintingBusinessGuide() {
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
            <div className="absolute top-20 left-10 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Painting Business Guide</li>
              </ol>
            </nav>

            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                Complete Business Guide
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                How to Build a Successful Painting Business
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                From startup to $1M+ revenue. Learn the proven strategies, systems, and tools 
                used by successful painting contractors to build profitable businesses.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">$2.5M</div>
                  <div className="text-sm text-gray-400">Avg 5-year revenue</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">87%</div>
                  <div className="text-sm text-gray-400">5-year survival rate</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">35%</div>
                  <div className="text-sm text-gray-400">Avg profit margin</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#getting-started">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/trial-signup">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Get the Right Tools
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Business Stages Overview */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Your Painting Business Journey
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {businessStages.map((stage, index) => (
                  <Card key={stage.stage} className="bg-gray-800/30 border-gray-700 p-6 relative">
                    {index < businessStages.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                    <stage.icon className={`h-12 w-12 text-${stage.color}-400 mb-4`} />
                    <h3 className="text-xl font-bold text-white mb-2">{stage.stage}</h3>
                    <div className="text-lg font-semibold text-green-400 mb-3">{stage.revenue}</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {stage.challenges.map((challenge) => (
                        <li key={challenge}>• {challenge}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-500/10 border-blue-500/30 p-8">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Where Are You Now?</h3>
                <p className="text-gray-300 mb-4">
                  This guide covers every stage of building a painting business. Whether you're just 
                  starting out or looking to scale beyond $1M, you'll find actionable strategies for 
                  your current situation.
                </p>
                <div className="flex gap-4">
                  <Link href="#getting-started">
                    <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                      I'm Starting Out
                    </Button>
                  </Link>
                  <Link href="#scaling">
                    <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                      I Want to Scale
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section id="getting-started" className="py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Starting Your Painting Business: The First 90 Days
              </h2>
              
              <div className="space-y-8">
                {/* Legal & Setup */}
                <Card className="bg-gray-800/30 border-gray-700 p-8">
                  <div className="flex items-start gap-4">
                    <Shield className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">Week 1-2: Legal Foundation</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">Business Structure</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Register LLC ($100-500)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Get EIN from IRS (free)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Open business bank account</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Set up accounting system</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Insurance & Licensing</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>General liability ($600-1200/yr)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Contractor's license (varies)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Business license ($50-400)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>Workers comp (if hiring)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Tools & Equipment */}
                <Card className="bg-gray-800/30 border-gray-700 p-8">
                  <div className="flex items-start gap-4">
                    <Settings className="h-8 w-8 text-purple-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">Week 3-4: Tools & Systems</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">Essential Equipment</h4>
                          <table className="w-full text-sm">
                            <tbody className="text-gray-300">
                              <tr className="border-b border-gray-800">
                                <td className="py-2">Quality brushes/rollers</td>
                                <td className="text-right">$200-300</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-2">Ladders (various sizes)</td>
                                <td className="text-right">$400-800</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-2">Drop cloths & tape</td>
                                <td className="text-right">$150-250</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-2">Sprayer (optional)</td>
                                <td className="text-right">$300-3000</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-semibold">Total Investment</td>
                                <td className="text-right font-semibold text-white">$1,050-4,350</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-yellow-400 mb-3">Business Software</h4>
                          <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-2">
                              <Zap className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-white">
                                  <Link href="/features" className="hover:text-blue-400">Estimating Software</Link>
                                </strong>
                                <div className="text-sm">Create professional quotes in minutes</div>
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <DollarSign className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-white">Accounting Software</strong>
                                <div className="text-sm">QuickBooks or similar</div>
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-white">Business Phone</strong>
                                <div className="text-sm">Dedicated number & voicemail</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-2">Pro Tip: Start Lean</h4>
                        <p className="text-gray-300 text-sm">
                          You don't need everything on day one. Start with essential tools and quality 
                          <Link href="/guides/painting-estimate-software" className="text-blue-400 hover:text-blue-300"> estimating software</Link> to 
                          look professional. Reinvest profits into better equipment as you grow.
                        </p>
                      </Card>
                    </div>
                  </div>
                </Card>

                {/* First Customers */}
                <Card className="bg-gray-800/30 border-gray-700 p-8">
                  <div className="flex items-start gap-4">
                    <Users className="h-8 w-8 text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">Week 5-12: Landing First Customers</h3>
                      
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <Card className="bg-green-500/10 border-green-500/30 p-4">
                          <h4 className="text-lg font-semibold text-green-400 mb-2">Friends & Family</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Offer discount for testimonials</li>
                            <li>• Document before/after photos</li>
                            <li>• Ask for 3 referrals each</li>
                          </ul>
                        </Card>
                        
                        <Card className="bg-blue-500/10 border-blue-500/30 p-4">
                          <h4 className="text-lg font-semibold text-blue-400 mb-2">Online Presence</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Google My Business profile</li>
                            <li>• Facebook business page</li>
                            <li>• Nextdoor neighborhood app</li>
                          </ul>
                        </Card>
                        
                        <Card className="bg-purple-500/10 border-purple-500/30 p-4">
                          <h4 className="text-lg font-semibold text-purple-400 mb-2">Local Marketing</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Door hangers in target areas</li>
                            <li>• Partner with realtors</li>
                            <li>• Join BNI or chambers</li>
                          </ul>
                        </Card>
                      </div>

                      <div className="bg-gray-900/50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-3">Your First Month Goals</h4>
                        <div className="grid md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-400">10-15</div>
                            <div className="text-sm text-gray-400">Quotes delivered</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-400">3-5</div>
                            <div className="text-sm text-gray-400">Jobs completed</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-400">$5-8k</div>
                            <div className="text-sm text-gray-400">Revenue target</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-yellow-400">5★</div>
                            <div className="text-sm text-gray-400">Review average</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Strategy Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Pricing for Profit: The Foundation of Success
              </h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Pricing Formula That Works</h3>
                
                <div className="bg-gray-900/50 rounded-lg p-6 mb-6 font-mono text-sm">
                  <div className="text-green-400 mb-2">// Profitable Pricing Formula</div>
                  <div className="text-gray-300">Labor Cost + Material Cost + Overhead (30%) + Profit (20-30%) = Quote Price</div>
                  <div className="text-gray-300 mt-4">Example: $1,000 + $400 + $420 + $546 = $2,366</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">Common Pricing Mistakes</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>Racing to the bottom on price</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>Not tracking actual job costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>Forgetting overhead expenses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>Pricing based on competition only</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Pricing Best Practices</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Know your true hourly cost</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Track every job's profitability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Price for your target market</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Increase prices 5-10% yearly</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-500/10 border-blue-500/30 p-6">
                  <Calculator className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Know Your Numbers</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Direct labor cost/hour:</span>
                      <span className="text-white font-semibold">$25-35</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Burden rate (taxes, insurance):</span>
                      <span className="text-white font-semibold">1.3-1.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>True labor cost/hour:</span>
                      <span className="text-white font-semibold">$32-52</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span>Charge rate/hour:</span>
                      <span className="text-green-400 font-semibold">$65-100</span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/30 p-6">
                  <Target className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Target Margins</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Materials markup:</span>
                      <span className="text-white font-semibold">20-50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gross profit margin:</span>
                      <span className="text-white font-semibold">50-60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net profit margin:</span>
                      <span className="text-white font-semibold">15-25%</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span>Industry average:</span>
                      <span className="text-yellow-400 font-semibold">8-12%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Growing Your Business */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Growing to $100k+: Systems & Processes
              </h2>
              
              <div className="space-y-8">
                <Card className="bg-gray-800/30 border-gray-700 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">The 4 Pillars of Growth</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-blue-500/10 border-blue-500/30 p-6">
                      <BarChart3 className="h-8 w-8 text-blue-400 mb-3" />
                      <h4 className="text-xl font-semibold text-white mb-3">1. Lead Generation</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Google Ads: $500-1500/mo → 20-40 leads</li>
                        <li>• SEO & content marketing</li>
                        <li>• Referral program (10% kickback)</li>
                        <li>• Strategic partnerships</li>
                      </ul>
                      <div className="mt-4 p-3 bg-gray-900/50 rounded">
                        <div className="text-xs text-gray-400">Target metrics:</div>
                        <div className="text-sm text-white">50+ leads/month @ $50-100/lead</div>
                      </div>
                    </Card>

                    <Card className="bg-green-500/10 border-green-500/30 p-6">
                      <TrendingUp className="h-8 w-8 text-green-400 mb-3" />
                      <h4 className="text-xl font-semibold text-white mb-3">2. Conversion Rate</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Professional quotes in 24hrs</li>
                        <li>• Follow-up system (5 touches)</li>
                        <li>• Financing options</li>
                        <li>• Social proof & reviews</li>
                      </ul>
                      <div className="mt-4 p-3 bg-gray-900/50 rounded">
                        <div className="text-xs text-gray-400">Target metrics:</div>
                        <div className="text-sm text-white">35-50% close rate</div>
                      </div>
                    </Card>

                    <Card className="bg-purple-500/10 border-purple-500/30 p-6">
                      <DollarSign className="h-8 w-8 text-purple-400 mb-3" />
                      <h4 className="text-xl font-semibold text-white mb-3">3. Average Job Value</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Upsell premium paints</li>
                        <li>• Bundle multiple rooms</li>
                        <li>• Add-on services</li>
                        <li>• Good/better/best options</li>
                      </ul>
                      <div className="mt-4 p-3 bg-gray-900/50 rounded">
                        <div className="text-xs text-gray-400">Target metrics:</div>
                        <div className="text-sm text-white">$3,500+ average job</div>
                      </div>
                    </Card>

                    <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
                      <Users className="h-8 w-8 text-yellow-400 mb-3" />
                      <h4 className="text-xl font-semibold text-white mb-3">4. Customer Lifetime Value</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Annual maintenance programs</li>
                        <li>• Exterior/interior cycles</li>
                        <li>• Referral rewards</li>
                        <li>• Email marketing</li>
                      </ul>
                      <div className="mt-4 p-3 bg-gray-900/50 rounded">
                        <div className="text-xs text-gray-400">Target metrics:</div>
                        <div className="text-sm text-white">$10,000+ LTV</div>
                      </div>
                    </Card>
                  </div>
                </Card>

                {/* Hiring First Employees */}
                <Card className="bg-gray-800/30 border-gray-700 p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Hiring Your First Crew</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-4">When to Hire</h4>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Consistently booked 2-3 weeks out</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Turning down profitable work</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>$15-20k monthly revenue</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Systems documented</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-purple-400 mb-4">Compensation Structure</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 text-gray-400">Position</th>
                            <th className="text-right py-2 text-gray-400">Pay Range</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-800">
                            <td className="py-2">Helper/Apprentice</td>
                            <td className="text-right">$15-20/hr</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-2">Journeyman Painter</td>
                            <td className="text-right">$20-30/hr</td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-2">Crew Leader</td>
                            <td className="text-right">$25-35/hr</td>
                          </tr>
                          <tr>
                            <td className="py-2">Subcontractor</td>
                            <td className="text-right">50-60% of job</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Card className="bg-red-500/10 border-red-500/30 p-6 mt-6">
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Critical: Protect Your Business</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Workers' comp insurance is mandatory in most states</li>
                      <li>• Proper classification (W2 vs 1099) to avoid penalties</li>
                      <li>• Written agreements and quality standards</li>
                      <li>• Background checks and references</li>
                    </ul>
                  </Card>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Scaling to $1M+ */}
        <section id="scaling" className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Scaling to $1M+: Building a Real Business
              </h2>
              
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">The $1M Revenue Breakdown</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-4">Monthly Targets</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-300">
                        <span>Revenue needed:</span>
                        <span className="text-white font-semibold">$83,333/month</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Average job value:</span>
                        <span className="text-white font-semibold">$5,000</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Jobs needed:</span>
                        <span className="text-white font-semibold">17/month</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Close rate @ 40%:</span>
                        <span className="text-white font-semibold">43 quotes</span>
                      </div>
                      <div className="flex justify-between text-gray-300 pt-2 border-t border-gray-700">
                        <span>Crew size needed:</span>
                        <span className="text-green-400 font-semibold">6-8 painters</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-pink-400 mb-4">Profit Projections</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-300">
                        <span>Gross revenue:</span>
                        <span className="text-white font-semibold">$1,000,000</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Direct costs (50%):</span>
                        <span className="text-white font-semibold">-$500,000</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Overhead (30%):</span>
                        <span className="text-white font-semibold">-$300,000</span>
                      </div>
                      <div className="flex justify-between text-gray-300 pt-2 border-t border-gray-700">
                        <span>Net profit (20%):</span>
                        <span className="text-green-400 font-semibold">$200,000</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Owner salary included:</span>
                        <span className="text-gray-400">$80-120k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Building className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Organizational Structure</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Owner/CEO (strategy)</li>
                    <li>• Operations Manager</li>
                    <li>• Sales/Estimator</li>
                    <li>• 2-3 Crew Leaders</li>
                    <li>• 4-5 Painters</li>
                    <li>• Part-time admin</li>
                  </ul>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <BarChart3 className="h-12 w-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Key Metrics to Track</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Lead cost: &lt;$100</li>
                    <li>• Close rate: &gt;40%</li>
                    <li>• Avg job: &gt;$5,000</li>
                    <li>• Gross margin: &gt;50%</li>
                    <li>• Customer acquisition cost</li>
                    <li>• Employee retention rate</li>
                  </ul>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Zap className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Systems Required</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• CRM for lead tracking</li>
                    <li>• <Link href="/" className="text-blue-400 hover:text-blue-300">Professional estimating</Link></li>
                    <li>• Project management</li>
                    <li>• Quality control checklists</li>
                    <li>• Employee training program</li>
                    <li>• Financial reporting</li>
                  </ul>
                </Card>
              </div>

              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">The Owner's Evolution</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">$0-250k: Painter Who Owns a Business</h4>
                      <p className="text-gray-300">You're doing the work, managing jobs, and handling sales. Working IN the business 80% of the time.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">$250-500k: Manager of Painters</h4>
                      <p className="text-gray-300">You're estimating, managing crews, and handling customer issues. Painting occasionally.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">$500k-1M: Business Owner</h4>
                      <p className="text-gray-300">You're focused on strategy, marketing, and systems. Others handle daily operations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">$1M+: CEO</h4>
                      <p className="text-gray-300">You're working ON the business: vision, culture, and growth. Business runs without you.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Strategies */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">
                Advanced Growth Strategies
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Award className="h-8 w-8 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Commercial Contracts</h3>
                  <p className="text-gray-300 mb-4">
                    Commercial work provides steady revenue and larger projects:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Property management companies</li>
                    <li>• HOA repainting contracts</li>
                    <li>• Retail & office buildings</li>
                    <li>• New construction partnerships</li>
                  </ul>
                  <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg">
                    <p className="text-sm text-yellow-400">
                      Commercial typically offers 20-30% margins but provides predictable cash flow
                    </p>
                  </div>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Truck className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">Service Expansion</h3>
                  <p className="text-gray-300 mb-4">
                    Add complementary services to increase revenue per customer:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Cabinet refinishing ($2-5k jobs)</li>
                    <li>• Deck staining/sealing</li>
                    <li>• Drywall repair services</li>
                    <li>• Pressure washing</li>
                    <li>• Wallpaper removal/installation</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-sm text-blue-400">
                      Each service can add $50-100k annual revenue with existing customers
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technology & Tools */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 p-12">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  Technology: Your Competitive Advantage
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 text-center">
                  The right tools can 10x your efficiency and professionalism. Here's what 
                  successful painting businesses use:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      <Link href="/guides/painting-estimate-software" className="hover:text-blue-400">
                        Estimating Software
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-400">
                      Create quotes 6x faster with 95% accuracy
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Users className="h-12 w-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">CRM System</h3>
                    <p className="text-sm text-gray-400">
                      Never lose a lead or forget to follow up
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                    <p className="text-sm text-gray-400">
                      Track what works and optimize for profit
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">ROI of Technology Investment</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Time saved on quotes (6 hrs/week @ $75/hr):</span>
                      <span className="text-green-400 font-semibold">+$1,800/month</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Increased win rate (25% → 40%):</span>
                      <span className="text-green-400 font-semibold">+$8,000/month</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Professional appearance premium:</span>
                      <span className="text-green-400 font-semibold">+$2,000/month</span>
                    </div>
                    <div className="flex justify-between text-gray-300 pt-3 border-t border-gray-700">
                      <span className="font-semibold">Total monthly value:</span>
                      <span className="text-green-400 font-bold text-xl">$11,800</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg text-gray-300 mb-6">
                    Join 2,000+ painting contractors using modern tools to grow faster
                  </p>
                  <Link href="/trial-signup">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Start Your Free Trial
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-400 mt-4">
                    14 days free • No credit card required • 5 minutes to set up
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Checklist */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Your Success Checklist
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Foundation (Months 1-3)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Register business & get insurance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Set up business bank account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Create Google My Business profile</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Implement estimating software</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Complete first 10 jobs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Get 5+ five-star reviews</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Growth (Months 4-12)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Hire first employee/helper</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Launch Google Ads campaign</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Document all processes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Reach $20k/month revenue</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Build email list (100+ contacts)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Establish referral program</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Scale (Year 2+)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Build second crew</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Hire operations manager</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Add commercial accounts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Implement CRM system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Launch service agreements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Reach $50k/month revenue</span>
                    </li>
                  </ul>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Optimize (Ongoing)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Track job profitability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">A/B test marketing channels</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Refine pricing annually</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Build company culture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Plan exit strategy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <input type="checkbox" className="rounded mt-1" />
                      <span className="text-gray-300">Give back to community</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Build Your Painting Empire?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Success in the painting business comes down to systems, consistency, and the right tools. 
                Start with professional estimating software that makes you look like a million-dollar company 
                from day one.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                <div>
                  <Star className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Look Professional</h3>
                  <p className="text-sm text-gray-400">
                    Branded quotes that win premium jobs
                  </p>
                </div>
                <div>
                  <Clock className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Save Time</h3>
                  <p className="text-sm text-gray-400">
                    10-minute quotes instead of 2 hours
                  </p>
                </div>
                <div>
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Grow Faster</h3>
                  <p className="text-sm text-gray-400">
                    Win 40% more jobs with speed
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Start Your Free Trial
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/roi-calculator">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Calculate Your ROI
                    <Calculator className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-gray-400 mt-4">
                Join 2,000+ painting contractors building better businesses
              </p>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Essential Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      How to Quote Jobs
                    </h3>
                    <p className="text-sm text-gray-400">
                      Master professional quoting techniques
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
                      Free tools for accurate estimates
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/painting-estimate-software" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Zap className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Best Software Tools
                    </h3>
                    <p className="text-sm text-gray-400">
                      Technology to scale your business
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive FAQ Section with Schema Markup */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Painting Business FAQs</h2>
              
              {/* FAQ Schema.org structured data */}
              <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "How much money do I need to start a painting business?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "You can start a painting business with $3,000-$10,000. Essential startup costs include: basic equipment ($1,500-3,000), insurance ($1,200-2,500/year), business license ($200-800), marketing ($500-1,500), and working capital ($2,000-5,000). Many successful painters started with less by focusing on residential work first."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How much can painting business owners make?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Painting business owner income varies by scale: Solo painters earn $40,000-$80,000/year, small crews (2-5 painters) generate $80,000-$150,000, established businesses (5-10 painters) make $150,000-$300,000, and large operations (10+ painters) can exceed $300,000-$1M+. Profit margins typically range from 15-35%."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Do I need a license to start a painting business?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Licensing requirements vary by location. Most states require a business license ($50-400) and contractor's license for jobs over $500-5,000. Some states require specific painting contractor licenses. Always check your state and local requirements. Insurance is essential regardless of licensing - general liability ($1M minimum) and workers' comp if you have employees."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How do I get painting customers when starting out?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Start with: 1) Friends and family referrals, 2) Door hangers in target neighborhoods ($200/1000), 3) Google My Business listing (free), 4) Facebook community groups, 5) Partner with real estate agents, 6) Yard signs at job sites, 7) Before/after photos on social media. Focus on residential first - easier to land and builds portfolio quickly."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "What's the best business structure for a painting company?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "LLC (Limited Liability Company) is best for most painting businesses - provides personal asset protection, tax flexibility, and professional credibility. Sole proprietorship works for starting out but offers no liability protection. S-Corp becomes beneficial around $60,000+ net profit for tax savings. Consult a business attorney for your specific situation."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How do I price painting jobs to make profit?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Use this formula: Labor (hours × rate) + Materials (paint, supplies) + Overhead (30% of labor+materials) + Profit margin (20-35%) = Total price. Example: 40 hours × $30 = $1,200 labor, $400 materials, $480 overhead (30%), $520 profit (25%) = $2,600 total. Track actual costs to refine pricing over time."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Should I hire employees or use subcontractors?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Start with subcontractors (1099) for flexibility and lower costs. Switch to employees (W2) when you need consistent quality and availability. Employees cost 20-30% more but provide better control, training retention, and customer consistency. Many successful painters use a hybrid model with core employees and overflow subs."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "What insurance does a painting business need?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Essential insurance includes: General Liability ($1-2M minimum, costs $800-2,000/year), Commercial Auto ($1,500-3,000/year per vehicle), Workers' Compensation (required with employees, 3-8% of payroll), and Tools/Equipment coverage ($500-1,000/year). Many commercial clients require $2M+ liability. Bundle policies for savings."
                        }
                      }
                    ]
                  })
                }}
              />
              
              <div className="space-y-4">
                {/* Startup costs - most searched */}
                <Card className="bg-gradient-to-r from-gray-800/40 to-gray-800/20 border-green-500/30 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <DollarSign className="h-5 w-5 text-green-400 mr-2" />
                    How much money do I need to start a painting business?
                  </h3>
                  <p className="text-gray-300 mb-3">
                    You can start a painting business with $3,000-$10,000:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-gray-300">
                    <div className="space-y-2">
                      <div><strong>Equipment:</strong> $1,500-3,000</div>
                      <div><strong>Insurance:</strong> $1,200-2,500/year</div>
                      <div><strong>License/Permits:</strong> $200-800</div>
                      <div><strong>Marketing:</strong> $500-1,500</div>
                    </div>
                    <div className="space-y-2">
                      <div><strong>Vehicle/Gas:</strong> $500-2,000</div>
                      <div><strong>Software:</strong> $50-150/month</div>
                      <div><strong>Working Capital:</strong> $2,000-5,000</div>
                      <div><strong>Total Minimum:</strong> ~$3,000</div>
                    </div>
                  </div>
                </Card>

                {/* Income potential */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-400 mr-2" />
                    How much can painting business owners make?
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong>Solo painter:</strong> $40,000-$80,000/year</div>
                    <div><strong>Small crew (2-5):</strong> $80,000-$150,000/year</div>
                    <div><strong>Established (5-10):</strong> $150,000-$300,000/year</div>
                    <div><strong>Large operation (10+):</strong> $300,000-$1M+/year</div>
                    <p className="text-gray-400 text-sm mt-3">
                      Profit margins typically 15-35% after all expenses.
                    </p>
                  </div>
                </Card>

                {/* Licensing requirements */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Shield className="h-5 w-5 text-purple-400 mr-2" />
                    Do I need a license to start a painting business?
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Licensing varies by location but typically includes:
                  </p>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li>• Business license ($50-400)</li>
                    <li>• Contractor's license (jobs over $500-5,000)</li>
                    <li>• Some states require painting-specific licenses</li>
                    <li>• General liability insurance (always required)</li>
                    <li>• Workers' comp (if you have employees)</li>
                  </ul>
                  <p className="text-gray-400 text-sm mt-3">
                    Check your state and local requirements before starting.
                  </p>
                </Card>

                {/* Getting customers */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Users className="h-5 w-5 text-green-400 mr-2" />
                    How do I get painting customers when starting out?
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Proven methods for new painting businesses:
                  </p>
                  <ol className="space-y-2 text-gray-300 ml-4">
                    <li><strong>1.</strong> Friends/family referrals (quickest start)</li>
                    <li><strong>2.</strong> Door hangers in target areas ($200/1000)</li>
                    <li><strong>3.</strong> Google My Business (free, essential)</li>
                    <li><strong>4.</strong> Facebook community groups</li>
                    <li><strong>5.</strong> Partner with realtors/property managers</li>
                    <li><strong>6.</strong> Yard signs at every job</li>
                    <li><strong>7.</strong> Before/after photos on social media</li>
                  </ol>
                </Card>

                {/* Business structure */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Building className="h-5 w-5 text-blue-400 mr-2" />
                    What's the best business structure for a painting company?
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong>LLC (Recommended):</strong> Personal asset protection + tax flexibility</div>
                    <div><strong>Sole Proprietorship:</strong> Simple but no liability protection</div>
                    <div><strong>S-Corp:</strong> Tax savings at $60k+ profit</div>
                    <div><strong>Corporation:</strong> Only for large operations</div>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">
                    Most painters choose LLC for protection and simplicity.
                  </p>
                </Card>

                {/* Pricing formula */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Calculator className="h-5 w-5 text-purple-400 mr-2" />
                    How do I price painting jobs to make profit?
                  </h3>
                  <p className="text-gray-300 mb-3">
                    <strong>Profitable pricing formula:</strong>
                  </p>
                  <div className="bg-gray-900/50 p-4 rounded text-gray-300 space-y-1">
                    <div>Labor: 40 hours × $30/hr = $1,200</div>
                    <div>Materials: Paint + supplies = $400</div>
                    <div>Overhead: 30% × $1,600 = $480</div>
                    <div>Profit: 25% markup = $520</div>
                    <div className="border-t border-gray-700 pt-2">
                      <strong>Total Quote: $2,600</strong>
                    </div>
                  </div>
                </Card>

                {/* Employees vs subs */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Users className="h-5 w-5 text-green-400 mr-2" />
                    Should I hire employees or use subcontractors?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <strong className="text-white">Subcontractors (1099):</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li>✓ Lower costs</li>
                        <li>✓ Flexibility</li>
                        <li>✓ No payroll taxes</li>
                        <li>✗ Less control</li>
                        <li>✗ Quality varies</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-white">Employees (W2):</strong>
                      <ul className="mt-1 space-y-1 text-sm">
                        <li>✓ Better control</li>
                        <li>✓ Consistent quality</li>
                        <li>✓ Build company culture</li>
                        <li>✗ 20-30% more cost</li>
                        <li>✗ More paperwork</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Insurance needs */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Shield className="h-5 w-5 text-amber-400 mr-2" />
                    What insurance does a painting business need?
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Essential painting business insurance:
                  </p>
                  <div className="space-y-2 text-gray-300">
                    <div><strong>General Liability:</strong> $1-2M minimum ($800-2,000/year)</div>
                    <div><strong>Commercial Auto:</strong> Per vehicle ($1,500-3,000/year)</div>
                    <div><strong>Workers' Comp:</strong> If employees (3-8% of payroll)</div>
                    <div><strong>Tools/Equipment:</strong> Theft/damage ($500-1,000/year)</div>
                    <div><strong>Umbrella Policy:</strong> Extra protection ($500-1,500/year)</div>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">
                    Many commercial clients require $2M+ liability coverage.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ModernFooter />
    </>
  )
}