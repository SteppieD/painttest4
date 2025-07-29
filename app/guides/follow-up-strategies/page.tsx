import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
  Calendar,
  Target
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Quote Follow-up Strategies: Close 73% More Deals [2024]',
  description: 'Master the art of quote follow-up. Proven templates, timing strategies, and automation tips that convert pending quotes into signed contracts.',
  keywords: 'painting quote follow up, quote conversion strategies, follow up templates painting',
  openGraph: {
    title: 'Follow-up Strategies That Close More Painting Jobs',
    description: 'Convert pending quotes into signed contracts with proven follow-up techniques.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/follow-up-strategies'
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
        "@id": "https://paintquotepro.com/guides/follow-up-strategies"
      },
      "headline": "Painting Quote Follow-up Strategies: Complete Guide",
      "description": "Master follow-up techniques that convert pending painting quotes into signed contracts. Templates and timing strategies included.",
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
          "name": "When should you follow up on a painting quote?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Follow up on painting quotes using the 2-2-2 rule: 2 days after sending (quick check-in), 2 weeks later (address concerns), and 2 months later (seasonal reminder). Studies show 80% of sales require 5+ follow-ups, but most contractors stop after 2."
          }
        },
        {
          "@type": "Question",
          "name": "What's the best way to follow up on quotes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mix communication channels: 1st follow-up via text (90% open rate), 2nd via email with added value, 3rd via phone call. Always provide new information or value in each follow-up, not just 'checking in'."
          }
        }
      ]
    }
  ]
}

export default function FollowUpStrategiesGuide() {
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
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Follow-up Strategies</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Quote Follow-up Strategies That Close Deals
              </h1>
              <p className="text-xl text-gray-100 mb-8">
                Turn pending quotes into signed contracts with proven follow-up techniques. 
                Learn the perfect timing, messaging, and automation strategies. Part of our 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> complete quoting guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Automate Follow-ups
                    <MessageSquare className="ml-2 h-5 w-5" />
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
                <h2 className="text-2xl font-bold text-white mb-4">When Should You Follow Up on Painting Quotes?</h2>
                <p className="text-lg text-gray-100">
                  Follow up using the 2-2-2 rule: 2 days after sending (quick check-in), 2 weeks later 
                  (address concerns), and 2 months later (seasonal reminder). Studies show 80% of sales 
                  require 5+ follow-ups, but most contractors stop after 2. Mix channels: text first 
                  (90% open rate), then email with value, then phone call.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* The 2-2-2 Follow-up System */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">The 2-2-2 Follow-up System</h2>
              
              <div className="space-y-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">2 Days: Quick Check-in</h3>
                      <p className="text-gray-100 mb-4">
                        Confirm receipt and offer to answer questions while you're top of mind.
                      </p>
                      <div className="bg-gray-900/50 rounded p-6">
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Text Template (90% open rate):</h4>
                        <p className="text-gray-100 italic mb-4">
                          "Hi [Name], just making sure you received the quote I sent Tuesday for your 
                          [project type]. Happy to answer any questions! - [Your name]"
                        </p>
                        <div className="mt-4 p-3 bg-blue-500/10 rounded">
                          <p className="text-base text-blue-400">
                            <strong>Success tip:</strong> Send between 10am-2pm for best response rates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">2 Weeks: Value-Add Email</h3>
                      <p className="text-gray-100 mb-4">
                        Provide additional value and address common concerns proactively.
                      </p>
                      <div className="bg-gray-900/50 rounded p-6">
                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Email Template:</h4>
                        <div className="space-y-3 text-gray-100">
                          <p><strong>Subject:</strong> Color trends + your painting quote</p>
                          <p>Hi [Name],</p>
                          <p>
                            I wanted to share this year's trending colors that would look great on your [project]. 
                            [Attach color guide or link]
                          </p>
                          <p>
                            Also, I noticed our quote is set to expire next week. If you'd like to lock in 
                            current pricing, just let me know. Happy to adjust anything based on your needs.
                          </p>
                          <p>
                            P.S. We have 2 spots open in [month] if you'd like to get this done before [season/event].
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">2 Months: Seasonal Reminder</h3>
                      <p className="text-gray-100 mb-4">
                        Re-engage with seasonal relevance and special offers.
                      </p>
                      <div className="bg-gray-900/50 rounded p-6">
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Phone Script:</h4>
                        <div className="space-y-3 text-gray-100">
                          <p>
                            "Hi [Name], this is [Your name] from [Company]. I quoted your [project] back in 
                            [month] and wanted to check if you're still planning to move forward."
                          </p>
                          <p>
                            "We're booking [upcoming season] projects now and I remembered your home. 
                            I can honor the original price if you'd like to schedule."
                          </p>
                          <p>
                            "Also, we're offering [specific incentive] for projects booked this month. 
                            Would that help with your decision?"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Channel Strategy */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Multi-Channel Follow-up Strategy</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Phone className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Text Messaging</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">90%</div>
                  <p className="text-gray-200 mb-4">Open Rate</p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li>• Best for: Quick check-ins</li>
                    <li>• Timing: 10am-2pm weekdays</li>
                    <li>• Keep under 160 characters</li>
                    <li>• Include clear CTA</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Mail className="h-8 w-8 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Email</h3>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">23%</div>
                  <p className="text-gray-200 mb-4">Open Rate</p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li>• Best for: Detailed info</li>
                    <li>• Timing: Tue-Thu mornings</li>
                    <li>• Include visuals</li>
                    <li>• Mobile-optimized</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Phone className="h-8 w-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Phone Calls</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">75%</div>
                  <p className="text-gray-200 mb-4">Connect Rate</p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li>• Best for: Closing deals</li>
                    <li>• Timing: 4-6pm best</li>
                    <li>• Leave voicemail</li>
                    <li>• Follow with text</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Value-Add Ideas */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Value-Add Follow-up Content</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <p className="text-lg text-gray-100 mb-6">
                  Never just "check in" - always provide value to stay relevant and helpful.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-4">Educational Content</h3>
                    <ul className="space-y-3 text-gray-100">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span>Color trend reports for their style</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span>Maintenance tips for current paint</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span>Before/after photos of similar homes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span>Seasonal painting advantages</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-4">Incentive Ideas</h3>
                    <ul className="space-y-3 text-gray-100">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <span>Early booking discounts (5-10%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <span>Free add-on services (power wash)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <span>Extended warranty offers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <span>Neighbor referral programs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Automation Tips */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Follow-up Automation</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400 mb-4">What to Automate</h3>
                    <ul className="space-y-3 text-gray-100">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <strong>Initial acknowledgment</strong>
                          <p className="text-base text-gray-200">Auto-send within 1 hour</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <strong>2-day check-in text</strong>
                          <p className="text-base text-gray-200">Schedule when sending quote</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <strong>Educational emails</strong>
                          <p className="text-base text-gray-200">Weekly value content</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-4">Keep Personal</h3>
                    <ul className="space-y-3 text-gray-100">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div>
                          <strong>Phone calls</strong>
                          <p className="text-base text-gray-200">Always make personally</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div>
                          <strong>Objection handling</strong>
                          <p className="text-base text-gray-200">Requires human touch</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div>
                          <strong>Price negotiations</strong>
                          <p className="text-base text-gray-200">Build trust in person</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">Automation Success Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">73%</div>
                      <p className="text-base text-gray-200">Higher close rate</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">2.3x</div>
                      <p className="text-base text-gray-200">More touchpoints</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">85%</div>
                      <p className="text-base text-gray-200">Time saved</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">45%</div>
                      <p className="text-base text-gray-200">Faster response</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Common Objections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Handling Common Objections</h2>
              
              <div className="space-y-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">"We're getting other quotes"</h3>
                  <div className="bg-gray-900/50 rounded p-4">
                    <p className="text-gray-100 mb-3"><strong>Response:</strong></p>
                    <p className="text-gray-100 italic">
                      "That's smart! While you're comparing, here's what to look for: [share comparison checklist]. 
                      I'm confident our value stands out, but I want you to make the best decision. 
                      May I follow up next week to see if you have questions after reviewing other options?"
                    </p>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">"The price is too high"</h3>
                  <div className="bg-gray-900/50 rounded p-4">
                    <p className="text-gray-100 mb-3"><strong>Response:</strong></p>
                    <p className="text-gray-100 italic">
                      "I understand price is important. Let me show you where the value is: [break down what's included]. 
                      We could also look at adjusting the scope or offer payment plans. 
                      What's your ideal budget so I can create an option that works?"
                    </p>
                  </div>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">"We need to think about it"</h3>
                  <div className="bg-gray-900/50 rounded p-4">
                    <p className="text-gray-100 mb-3"><strong>Response:</strong></p>
                    <p className="text-gray-100 italic">
                      "Of course! It's a big decision. What specific concerns can I address to help you decide? 
                      I'll send over our project gallery and warranty details. 
                      When would be a good time to reconnect - maybe early next week?"
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Automate Your Follow-up System
                </h2>
                <p className="text-lg text-gray-100 mb-6">
                  Set up automated follow-ups that convert. Our system sends perfectly timed messages 
                  while you focus on painting. Close 73% more deals with less effort.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                      Start Free Trial
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      Complete Quoting Guide
                    </h3>
                    <p className="text-base text-gray-200">
                      Master the entire quoting process
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/pricing-psychology" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Target className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Pricing Psychology
                    </h3>
                    <p className="text-base text-gray-200">
                      Price for higher conversions
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/quote-presentation-tips" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <TrendingUp className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Presentation Tips
                    </h3>
                    <p className="text-base text-gray-200">
                      Present quotes that convert
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