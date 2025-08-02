import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  XCircle,
  AlertTriangle,
  DollarSign,
  Clock,
  FileText,
  Users,
  TrendingDown,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Calculator,
  Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: '15 Painting Quote Mistakes That Cost You Jobs [2024 Guide]',
  description: 'Avoid costly painting quote mistakes. Learn what kills deals and how to fix common estimating errors that cost contractors 40% of potential jobs.',
  keywords: 'painting quote mistakes, estimating errors painting, common quoting mistakes',
  openGraph: {
    title: 'Common Painting Quote Mistakes That Kill Deals',
    description: 'Fix the estimating errors costing you 40% of potential painting jobs.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/common-quoting-mistakes'
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
        "@id": "https://paintquotepro.com/guides/common-quoting-mistakes"
      },
      "headline": "Common Painting Quote Mistakes: What&apos;s Costing You Jobs",
      "description": "Identify and fix the quoting mistakes that cause painters to lose 40% of potential jobs. Expert solutions included.",
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
          "name": "What are the most common painting quote mistakes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The top painting quote mistakes are: 1) Not itemizing costs (loses 35% of jobs), 2) Forgetting prep work in estimates (causes 40% of profit loss), 3) Generic one-size-fits-all quotes, 4) Taking too long to deliver quotes (48hr+ loses 60% of jobs), and 5) Poor presentation and formatting."
          }
        },
        {
          "@type": "Question",
          "name": "How do you avoid underquoting painting jobs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid underquoting by: Always measuring accurately (never eyeball), including 20-30% for prep work, factoring in material waste (10-15%), adding proper labor burden (30-40%), including travel and setup time, and building in a 10-15% contingency for unknowns."
          }
        }
      ]
    }
  ]
}

export default function CommonQuotingMistakesGuide() {
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Common Mistakes</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Painting Quote Mistakes Costing You Jobs
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Stop losing 40% of potential jobs to preventable quoting errors. Learn the 
                critical mistakes and exactly how to fix them. Part of our 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> complete quoting guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                    Fix Your Quotes
                    <Shield className="ml-2 h-5 w-5" />
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
                <h2 className="text-2xl font-bold text-white mb-4">What Are the Most Common Painting Quote Mistakes?</h2>
                <p className="text-lg text-gray-100">
                  The top painting quote mistakes are: Not itemizing costs (loses 35% of jobs), forgetting 
                  prep work in estimates (causes 40% profit loss), generic one-size-fits-all quotes, taking 
                  too long to deliver (48hr+ loses 60% of jobs), and poor presentation. These mistakes 
                  cost average contractors $75,000+ annually in lost business.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Critical Mistakes Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">The 5 Deal-Killing Mistakes</h2>
              
              <div className="space-y-6">
                {/* Mistake 1 */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <XCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        1. Not Itemizing Costs
                      </h3>
                      <div className="mb-4">
                        <span className="text-red-400 font-semibold">Impact: Lose 35% of jobs</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-red-500/10 rounded p-4">
                          <h4 className="text-lg font-semibold text-red-400 mb-3">❌ Wrong Way</h4>
                          <div className="bg-gray-900/50 rounded p-3 font-mono text-base">
                            <p className="text-gray-100">Interior Painting: $3,500</p>
                            <p className="text-gray-200 mt-2">&quot;What does this include?&quot;</p>
                          </div>
                        </div>
                        <div className="bg-green-500/10 rounded p-4">
                          <h4 className="text-lg font-semibold text-green-400 mb-3">✓ Right Way</h4>
                          <div className="bg-gray-900/50 rounded p-3 text-base space-y-1">
                            <p className="text-gray-100">Prep & Repairs: $800</p>
                            <p className="text-gray-100">Labor (32 hrs): $1,600</p>
                            <p className="text-gray-100">Premium Paint: $700</p>
                            <p className="text-gray-100">Supplies: $200</p>
                            <p className="text-gray-100">Protection: $200</p>
                            <p className="text-green-400 font-semibold pt-2 border-t border-gray-700">Total: $3,500</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Mistake 2 */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        2. Forgetting Prep Work
                      </h3>
                      <div className="mb-4">
                        <span className="text-red-400 font-semibold">Impact: 40% profit loss</span>
                      </div>
                      
                      <div className="bg-gray-900/50 rounded p-6">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-4">Commonly Forgotten Prep Items:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <ul className="space-y-2 text-gray-100">
                            <li>• Patching nail holes (2-4 hrs)</li>
                            <li>• Caulking gaps (3-5 hrs)</li>
                            <li>• Sanding rough spots (2-3 hrs)</li>
                            <li>• Priming stains (1-2 hrs)</li>
                          </ul>
                          <ul className="space-y-2 text-gray-100">
                            <li>• Moving furniture (1-2 hrs)</li>
                            <li>• Extensive masking (2-3 hrs)</li>
                            <li>• Cleaning surfaces (1-2 hrs)</li>
                            <li>• Minor drywall repair (3-5 hrs)</li>
                          </ul>
                        </div>
                        <div className="mt-4 p-3 bg-yellow-500/10 rounded">
                          <p className="text-base text-yellow-400">
                            <strong>Rule:</strong> Add 20-30% of painting time for prep on good surfaces, 40-50% for poor condition
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Mistake 3 */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        3. Generic One-Size-Fits-All Quotes
                      </h3>
                      <div className="mb-4">
                        <span className="text-red-400 font-semibold">Impact: 50% lower close rate</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-red-400 mb-3">Generic Quote Signs:</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 mt-1" />
                              <span>No customer name</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 mt-1" />
                              <span>Copy-paste descriptions</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 mt-1" />
                              <span>No specific colors mentioned</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <XCircle className="h-4 w-4 text-red-400 mt-1" />
                              <span>Missing unique concerns</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Personalization Wins:</h4>
                          <ul className="space-y-2 text-gray-100">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                              <span>Reference their style</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                              <span>Note specific concerns</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                              <span>Include home photos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 mt-1" />
                              <span>Custom color suggestions</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Mistake 4 */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        4. Taking Too Long to Quote
                      </h3>
                      <div className="mb-4">
                        <span className="text-red-400 font-semibold">Impact: 60% loss after 48 hours</span>
                      </div>
                      
                      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Quote Delivery Timeline Impact:</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-100">Within 24 hours</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-700 rounded-full h-4">
                                <div className="bg-green-500 h-4 rounded-full" style={{width: '75%'}}></div>
                              </div>
                              <span className="text-green-400 font-semibold">75% close rate</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-100">24-48 hours</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-700 rounded-full h-4">
                                <div className="bg-yellow-500 h-4 rounded-full" style={{width: '45%'}}></div>
                              </div>
                              <span className="text-yellow-400 font-semibold">45% close rate</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-100">3-7 days</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-700 rounded-full h-4">
                                <div className="bg-orange-500 h-4 rounded-full" style={{width: '25%'}}></div>
                              </div>
                              <span className="text-orange-400 font-semibold">25% close rate</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-100">Over 7 days</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-700 rounded-full h-4">
                                <div className="bg-red-500 h-4 rounded-full" style={{width: '15%'}}></div>
                              </div>
                              <span className="text-red-400 font-semibold">15% close rate</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Mistake 5 */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <TrendingDown className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        5. Poor Presentation & Formatting
                      </h3>
                      <div className="mb-4">
                        <span className="text-red-400 font-semibold">Impact: 40% lower perceived value</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-500/10 rounded p-4">
                          <h4 className="text-lg font-semibold text-red-400 mb-3">Unprofessional Signs:</h4>
                          <ul className="space-y-2 text-gray-100 text-base">
                            <li>• Handwritten on napkins</li>
                            <li>• Spelling/grammar errors</li>
                            <li>• No company branding</li>
                            <li>• Unclear formatting</li>
                            <li>• Missing contact info</li>
                            <li>• No terms & conditions</li>
                          </ul>
                        </div>
                        <div className="bg-green-500/10 rounded p-4">
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Professional Elements:</h4>
                          <ul className="space-y-2 text-gray-100 text-base">
                            <li>• Clean PDF format</li>
                            <li>• Company logo/branding</li>
                            <li>• Clear section headers</li>
                            <li>• Visual elements/photos</li>
                            <li>• Digital signature ready</li>
                            <li>• Mobile optimized</li>
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

        {/* Additional Costly Mistakes */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">10 More Profit-Killing Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-orange-400 mb-4">Pricing Mistakes</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-1" />
                      <div>
                        <strong>Forgetting labor burden</strong>
                        <p className="text-base text-gray-200">Add 30-40% to wages</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-1" />
                      <div>
                        <strong>No material waste factor</strong>
                        <p className="text-base text-gray-200">Include 10-15% waste</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-1" />
                      <div>
                        <strong>Ignoring travel time</strong>
                        <p className="text-base text-gray-200">Bill portal-to-portal</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-1" />
                      <div>
                        <strong>No contingency buffer</strong>
                        <p className="text-base text-gray-200">Add 10-15% cushion</p>
                      </div>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Process Mistakes</h3>
                  <ul className="space-y-3 text-gray-100">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-1" />
                      <div>
                        <strong>Not measuring properly</strong>
                        <p className="text-base text-gray-200">Never estimate by eye</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-1" />
                      <div>
                        <strong>Skipping the walkthrough</strong>
                        <p className="text-base text-gray-200">Always inspect in person</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-1" />
                      <div>
                        <strong>No photos for reference</strong>
                        <p className="text-base text-gray-200">Document everything</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-1" />
                      <div>
                        <strong>Verbal quotes only</strong>
                        <p className="text-base text-gray-200">Always put in writing</p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30 p-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">The Real Cost of These Mistakes</h3>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-red-400">$75K</div>
                    <p className="text-base text-gray-200">Annual revenue lost</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-400">40%</div>
                    <p className="text-base text-gray-200">Lower close rate</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">25%</div>
                    <p className="text-base text-gray-200">Profit margin loss</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-400">2.5x</div>
                    <p className="text-base text-gray-200">More callbacks</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Fixes */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Quick Fixes for Immediate Results</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <CheckCircle className="h-8 w-8 text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Today: Template It</h3>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li>• Create quote template</li>
                    <li>• Add itemization sections</li>
                    <li>• Include all standard items</li>
                    <li>• Set up digital delivery</li>
                  </ul>
                </Card>

                <Card className="bg-blue-500/10 border-blue-500/30 p-6">
                  <Clock className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">This Week: Speed Up</h3>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li>• Measure during visit</li>
                    <li>• Quote same day</li>
                    <li>• Set up automation</li>
                    <li>• Track delivery times</li>
                  </ul>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/30 p-6">
                  <Calculator className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">This Month: Refine</h3>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li>• Audit win/loss reasons</li>
                    <li>• Update pricing formulas</li>
                    <li>• A/B test presentations</li>
                    <li>• Implement follow-ups</li>
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
              <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Stop Losing Jobs to Preventable Mistakes
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Our quote software eliminates these mistakes automatically. Professional templates, 
                  instant delivery, perfect calculations every time. Win 40% more jobs starting today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                      Fix Your Quotes Now
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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Master Every Aspect of Quoting</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Complete Quoting Guide
                    </h3>
                    <p className="text-base text-gray-200">
                      Master the entire process
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/quote-presentation-tips" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Users className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Presentation Tips
                    </h3>
                    <p className="text-base text-gray-200">
                      Present quotes professionally
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/follow-up-strategies" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <TrendingDown className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Follow-up Strategies
                    </h3>
                    <p className="text-base text-gray-200">
                      Convert more quotes
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