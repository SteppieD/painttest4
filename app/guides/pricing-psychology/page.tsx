import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Brain,
  DollarSign,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
  Heart,
  Eye
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing Psychology for Painters: Win More Jobs at Higher Prices [2024]',
  description: 'Master psychological pricing strategies for painting quotes. Learn anchoring, value framing, and presentation techniques that increase close rates by 40%.',
  keywords: 'painting pricing psychology, quote presentation tips, value-based pricing painting, psychological pricing strategies',
  openGraph: {
    title: 'Pricing Psychology: Win More Painting Jobs at Premium Prices',
    description: 'Proven psychological strategies to present quotes that convert at higher margins.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/pricing-psychology'
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
        "@id": "https://paintquotepro.com/guides/pricing-psychology"
      },
      "headline": "Pricing Psychology for Painting Contractors: Complete Guide",
      "description": "Master psychological pricing strategies to win more painting jobs at higher prices. Learn anchoring, framing, and presentation techniques.",
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
          "name": "What is psychological pricing in painting quotes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Psychological pricing uses behavioral science to present painting quotes in ways that increase perceived value and close rates. Key techniques include price anchoring (showing premium option first), charm pricing ($2,999 vs $3,000), and value bundling. Studies show these methods can increase acceptance rates by 20-40%."
          }
        },
        {
          "@type": "Question",
          "name": "How do you present a painting quote to maximize acceptance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Present painting quotes using the 3-option strategy: Good ($X), Better ($X+30%), Best ($X+60%). Start with the Best option to anchor high. Use visual elements, emphasize value over price, include social proof, and create urgency with limited-time offers. Always present in person when possible."
          }
        }
      ]
    }
  ]
}

export default function PricingPsychologyGuide() {
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Pricing Psychology</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pricing Psychology for Painters
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master the psychological strategies that help you win more jobs at premium prices. 
                Learn proven techniques that increase close rates by 40%. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Try Smart Pricing Tools
                    <Brain className="ml-2 h-5 w-5" />
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
                <h2 className="text-2xl font-bold text-white mb-4">What is Psychological Pricing?</h2>
                <p className="text-lg text-gray-300">
                  Psychological pricing uses behavioral science to present painting quotes in ways that increase 
                  perceived value and close rates. Key techniques include price anchoring (showing premium option first), 
                  charm pricing ($2,999 vs $3,000), and value bundling. Studies show these methods can increase 
                  acceptance rates by 20-40%.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Core Psychological Principles</h2>
              
              <div className="space-y-6">
                {/* Anchoring */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Target className="h-8 w-8 text-purple-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">1. Price Anchoring</h3>
                      <p className="text-gray-300 mb-4">
                        The first price customers see sets their expectation. Always present your premium option first.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-500/10 rounded p-4">
                          <h4 className="text-lg font-semibold text-red-400 mb-2">❌ Wrong Way</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>Basic: $2,000</li>
                            <li>Standard: $2,600</li>
                            <li>Premium: $3,200</li>
                          </ul>
                          <p className="text-sm text-gray-400 mt-2">Customer anchors on low price</p>
                        </div>
                        <div className="bg-green-500/10 rounded p-4">
                          <h4 className="text-lg font-semibold text-green-400 mb-2">✓ Right Way</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>Premium: $3,200</li>
                            <li>Standard: $2,600</li>
                            <li>Basic: $2,000</li>
                          </ul>
                          <p className="text-sm text-gray-400 mt-2">$2,600 now seems reasonable</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Loss Aversion */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">2. Loss Aversion</h3>
                      <p className="text-gray-300 mb-4">
                        People fear losing value more than they enjoy gaining it. Frame your offer around what they'll lose without you.
                      </p>
                      <div className="bg-gray-900/50 rounded p-6">
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Effective Loss Framing:</h4>
                        <ul className="space-y-3 text-gray-300">
                          <li>• "Without proper prep, paint fails in 2-3 years instead of 7-10"</li>
                          <li>• "Cheap paint costs 3x more over 10 years due to repainting"</li>
                          <li>• "DIY mistakes can reduce home value by $5,000-10,000"</li>
                          <li>• "This price is only valid for 7 days due to material costs"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Social Proof */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Heart className="h-8 w-8 text-pink-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">3. Social Proof</h3>
                      <p className="text-gray-300 mb-4">
                        People follow the actions of others. Show that neighbors and similar homeowners choose you.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-pink-500/10 rounded p-4">
                          <h4 className="text-pink-400 font-semibold mb-2">Quote Inclusions:</h4>
                          <ul className="text-sm space-y-2 text-gray-300">
                            <li>• "Trusted by 127 homeowners in [neighborhood]"</li>
                            <li>• "82% of our customers upgrade to premium"</li>
                            <li>• Include 2-3 relevant testimonials</li>
                            <li>• Show before/after photos</li>
                          </ul>
                        </div>
                        <div className="bg-purple-500/10 rounded p-4">
                          <h4 className="text-purple-400 font-semibold mb-2">Trust Signals:</h4>
                          <ul className="text-sm space-y-2 text-gray-300">
                            <li>• Licensed & insured badges</li>
                            <li>• Years in business</li>
                            <li>• Professional associations</li>
                            <li>• Warranty information</li>
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

        {/* 3-Option Strategy */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">The Power of 3-Option Pricing</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <p className="text-lg text-gray-300 mb-6">
                  Research shows that presenting 3 options increases sales by 30% and average transaction value by 20%.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-700/30 rounded-lg p-6 relative">
                    <h3 className="text-xl font-bold text-white mb-3">Good</h3>
                    <div className="text-3xl font-bold text-gray-400 mb-4">$2,000</div>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>✓ Basic prep work</li>
                      <li>✓ Standard paint</li>
                      <li>✓ 2-year warranty</li>
                      <li className="text-gray-500">✗ Premium features</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-4">20% choose this</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 relative border-2 border-purple-500/50">
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                      Most Popular
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-3">Better</h3>
                    <div className="text-3xl font-bold text-purple-400 mb-4">$2,600</div>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>✓ Thorough prep work</li>
                      <li>✓ Premium paint</li>
                      <li>✓ 5-year warranty</li>
                      <li>✓ Color consultation</li>
                    </ul>
                    <p className="text-xs text-purple-400 mt-4">65% choose this</p>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-6 relative">
                    <h3 className="text-xl font-bold text-white mb-3">Best</h3>
                    <div className="text-3xl font-bold text-pink-400 mb-4">$3,200</div>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>✓ Complete restoration</li>
                      <li>✓ Designer paint</li>
                      <li>✓ 7-year warranty</li>
                      <li>✓ All extras included</li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-4">15% choose this</p>
                  </div>
                </div>

                <div className="bg-purple-500/10 rounded p-6">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Why This Works:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Compromise Effect:</strong> Middle option seems like the smart choice</li>
                    <li>• <strong>Anchoring:</strong> High price makes middle seem affordable</li>
                    <li>• <strong>Choice Architecture:</strong> Guides customer to profitable option</li>
                    <li>• <strong>Value Clarity:</strong> Easy comparison highlights benefits</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Value Framing */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Value Framing Techniques</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Cost Per Day Framing</h3>
                  <p className="text-gray-300 mb-4">Break down large costs into daily amounts:</p>
                  <div className="bg-gray-900/50 rounded p-4 font-mono text-sm">
                    <p className="text-gray-400">// $3,000 over 5 years</p>
                    <p className="text-green-400">$3,000 ÷ (5 × 365) = $1.64/day</p>
                    <p className="text-yellow-400 mt-3">"For less than a cup of coffee per day..."</p>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">ROI Positioning</h3>
                  <p className="text-gray-300 mb-4">Show paint as an investment:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• "Adds $5,000-8,000 to home value"</li>
                    <li>• "267% average ROI on curb appeal"</li>
                    <li>• "Protects your $400,000 investment"</li>
                    <li>• "Saves $10,000 in siding repairs"</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Bundle Psychology</h3>
                  <p className="text-gray-300 mb-4">Make individual items seem free:</p>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="line-through text-gray-500">Power washing: $300</p>
                      <p className="line-through text-gray-500">Minor repairs: $200</p>
                      <p className="line-through text-gray-500">Premium paint: $400</p>
                      <p className="text-purple-400 font-semibold mt-2">All included in premium package!</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Urgency Creation</h3>
                  <p className="text-gray-300 mb-4">Ethical ways to encourage decisions:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• "Material prices increasing next month"</li>
                    <li>• "Schedule filling - 3 spots left in April"</li>
                    <li>• "Spring special ends Friday"</li>
                    <li>• "Lock in 2024 rates now"</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Presentation Tips */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Quote Presentation Psychology</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">The Perfect Presentation Flow</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Build Rapport (5 min)</h4>
                      <p className="text-gray-300">Connect personally, find common ground, establish trust before talking price.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Diagnose Problems (10 min)</h4>
                      <p className="text-gray-300">Show expertise by pointing out issues they hadn't noticed. Create value before price.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Present Solutions (10 min)</h4>
                      <p className="text-gray-300">Focus on benefits and outcomes, not features. Paint a picture of the result.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Reveal Price (5 min)</h4>
                      <p className="text-gray-300">Start with premium option. Be confident. Silence after stating price is powerful.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Handle Objections (5 min)</h4>
                      <p className="text-gray-300">Prepared responses, empathy first, reframe to value, offer payment options.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Close the Deal (5 min)</h4>
                      <p className="text-gray-300">Assumptive close: "When would you like us to start?" Create urgency ethically.</p>
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
              <h2 className="text-3xl font-bold text-white mb-8">Psychological Pricing Mistakes</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">Mistakes to Avoid</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Leading with price instead of value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Apologizing for your prices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Offering discounts too quickly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Not differentiating from competitors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Focusing on features over benefits</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Best Practices</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Build value before revealing price</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Be confident in your pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Use silence as a closing tool</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Focus on transformation, not task</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Always present multiple options</span>
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
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Start Winning More Jobs at Higher Prices
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our quote software automatically applies psychological pricing principles. Create compelling 
                  3-option quotes that convert 40% better than traditional estimates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Try Smart Pricing
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Pricing Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Complete Quoting Guide
                    </h3>
                    <p className="text-sm text-gray-400">
                      Master all aspects of quoting
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/quote-presentation-tips" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Eye className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Presentation Tips
                    </h3>
                    <p className="text-sm text-gray-400">
                      Perfect your quote delivery
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/follow-up-strategies" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <TrendingUp className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Follow-up Strategies
                    </h3>
                    <p className="text-sm text-gray-400">
                      Close more deals with follow-up
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