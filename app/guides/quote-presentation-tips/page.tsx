import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Presentation,
  Eye,
  FileText,
  MessageSquare,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Users,
  Smartphone,
  Video
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quote Presentation Tips: How to Present Painting Estimates [2024]',
  description: 'Master the art of presenting painting quotes. Learn professional techniques, body language tips, and closing strategies that increase acceptance rates.',
  keywords: 'quote presentation tips, how to present painting estimates, painting sales techniques, close painting jobs',
  openGraph: {
    title: 'Quote Presentation Tips for Painting Contractors',
    description: 'Professional techniques to present painting quotes that convert. Increase close rates with proven strategies.',
    type: 'article',
    publishedTime: '2024-01-25T00:00:00.000Z',
  },
  alternates: {
    canonical: '/guides/quote-presentation-tips'
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
        "@id": "https://paintquotepro.com/guides/quote-presentation-tips"
      },
      "headline": "Quote Presentation Tips for Painting Contractors",
      "description": "Master the art of presenting painting quotes with professional techniques, closing strategies, and communication tips.",
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
          "name": "How should you present a painting quote?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Present painting quotes in person when possible. Use a professional folder with your branding, walk through each section explaining value not just price, start with the scope of work before revealing price, use visual aids like color samples and photos, and always offer three options to guide decision-making."
          }
        },
        {
          "@type": "Question",
          "name": "What increases painting quote acceptance rates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Increase acceptance rates by: presenting within 24-48 hours while interest is high, using professional branded materials, including testimonials and portfolio photos, offering multiple payment options, creating appropriate urgency, and following up within 2-3 days. Professional presentation can increase close rates by 30-50%."
          }
        }
      ]
    }
  ]
}

export default function QuotePresentationTipsGuide() {
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
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
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
                <li className="text-white">Presentation Tips</li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                Cluster Content
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Quote Presentation Tips
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master the art of presenting painting quotes that convert. Learn professional techniques, 
                communication strategies, and closing methods. Part of our comprehensive 
                <Link href="/guides/how-to-quote-painting-jobs" className="text-blue-400 hover:text-blue-300"> painting quote guide</Link>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trial-signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                    Professional Quote Tools
                    <Presentation className="ml-2 h-5 w-5" />
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
                <h2 className="text-2xl font-bold text-white mb-4">How Should You Present a Painting Quote?</h2>
                <p className="text-lg text-gray-300">
                  Present painting quotes in person when possible. Use a professional folder with your branding, 
                  walk through each section explaining value not just price, start with the scope of work before 
                  revealing price, use visual aids like color samples and photos, and always offer three options 
                  to guide decision-making.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Presentation Methods */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Quote Presentation Methods</h2>
              
              <div className="space-y-6">
                {/* In-Person */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Users className="h-8 w-8 text-green-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">In-Person Presentation (Best)</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Advantages</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• 65% close rate average</li>
                            <li>• Build personal connection</li>
                            <li>• Read body language</li>
                            <li>• Handle objections immediately</li>
                            <li>• Show samples and portfolio</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">Best Practices</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Schedule within 24-48 hours</li>
                            <li>• Bring professional materials</li>
                            <li>• Dress professionally</li>
                            <li>• Arrive 5 minutes early</li>
                            <li>• Follow structured agenda</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Video Call */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Video className="h-8 w-8 text-blue-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Video Call Presentation</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">When to Use</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Customer prefers remote</li>
                            <li>• 45% close rate average</li>
                            <li>• Good for busy clients</li>
                            <li>• Screen sharing capability</li>
                            <li>• Record for reference</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-yellow-400 mb-3">Video Tips</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Test technology beforehand</li>
                            <li>• Professional background</li>
                            <li>• Good lighting essential</li>
                            <li>• Share screen for visuals</li>
                            <li>• Send materials in advance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Email/Digital */}
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <div className="flex items-start gap-4">
                    <Smartphone className="h-8 w-8 text-purple-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">Email/Digital Presentation</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">Reality Check</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• 25% close rate average</li>
                            <li>• Easy to ignore/delay</li>
                            <li>• Price shopping risk</li>
                            <li>• No personal connection</li>
                            <li>• Use only if required</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Optimization Tips</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li>• Professional PDF design</li>
                            <li>• Video walkthrough link</li>
                            <li>• Clear call-to-action</li>
                            <li>• Follow up within 24hrs</li>
                            <li>• Online acceptance option</li>
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

        {/* Perfect Presentation Structure */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">The Perfect Presentation Structure</h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Opening & Rapport (3-5 min)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Thank them for their time</li>
                        <li>• Recap their project goals</li>
                        <li>• Set agenda for meeting</li>
                        <li>• "Any questions before we begin?"</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Company Credentials (2-3 min)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Years in business</li>
                        <li>• Insurance and licensing</li>
                        <li>• Recent similar projects</li>
                        <li>• 2-3 relevant testimonials</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Scope Review (5-7 min)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Walk through each area</li>
                        <li>• Explain prep work needed</li>
                        <li>• Discuss color choices</li>
                        <li>• Timeline and process</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Investment Options (5-7 min)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Present 3 options (always)</li>
                        <li>• Start with premium</li>
                        <li>• Explain differences clearly</li>
                        <li>• Focus on value, not price</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">Questions & Close (5-10 min)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• "What questions do you have?"</li>
                        <li>• Address concerns</li>
                        <li>• Assumptive close</li>
                        <li>• Next steps clear</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-500/10 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">Timing is Everything</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">30 min</p>
                      <p className="text-sm text-gray-400">Ideal total time</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">70%</p>
                      <p className="text-sm text-gray-400">You listening</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">30%</p>
                      <p className="text-sm text-gray-400">You talking</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Professional Materials */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Professional Presentation Materials</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Physical Materials</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Professional folder with logo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Printed quote on quality paper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Business card attached</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Color samples/swatches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Portfolio book/tablet</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Digital Elements</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <span>Interactive PDF quote</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <span>Before/after gallery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <span>Video testimonials ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <span>Online scheduling link</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <span>Payment options sheet</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30 p-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quote Document Must-Haves</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2">Header Section</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Your logo & branding</li>
                      <li>• Quote number & date</li>
                      <li>• Customer information</li>
                      <li>• Property address</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-indigo-400 font-semibold mb-2">Body Content</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Detailed scope of work</li>
                      <li>• Materials specified</li>
                      <li>• Timeline/schedule</li>
                      <li>• Payment terms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2">Footer Elements</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Terms & conditions</li>
                      <li>• Warranty information</li>
                      <li>• Insurance details</li>
                      <li>• Acceptance signature</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Body Language & Communication */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Body Language & Communication</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Positive Body Language</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <Eye className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Maintain appropriate eye contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Open posture, lean in slightly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Smile genuinely and nod</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Mirror customer's energy level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                      <span>Confident handshake</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Power Phrases</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• "Based on what you've told me..."</li>
                    <li>• "Many of your neighbors chose..."</li>
                    <li>• "To protect your investment..."</li>
                    <li>• "The smart choice would be..."</li>
                    <li>• "When would you like to start?"</li>
                    <li>• "I'm confident we can..."</li>
                    <li>• "You'll love how this looks..."</li>
                  </ul>
                </Card>
              </div>

              <Card className="bg-gray-800/30 border-gray-700 p-6 mt-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Reading Customer Signals</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-green-400 font-semibold mb-3">Buying Signals</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Asking about timing/schedule</li>
                      <li>• Discussing payment options</li>
                      <li>• Mentioning color preferences</li>
                      <li>• Leaning forward, engaged</li>
                      <li>• "We" language instead of "you"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-semibold mb-3">Resistance Signals</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Arms crossed, leaning back</li>
                      <li>• "We need to think about it"</li>
                      <li>• Focusing only on price</li>
                      <li>• Checking phone frequently</li>
                      <li>• Short, closed answers</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Handling Objections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Handling Common Objections</h2>
              
              <div className="space-y-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">"Your price is too high"</h3>
                  <p className="text-gray-300 mb-3">Response framework:</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>1. "I understand price is important. Can you help me understand what you were expecting?"</li>
                    <li>2. Reframe to value: "Let me show you what's included that others might skip..."</li>
                    <li>3. Offer middle option: "Would the standard package work better for your budget?"</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">"We need to get other quotes"</h3>
                  <p className="text-gray-300 mb-3">Response framework:</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>1. "That's smart - you should compare. What will you be looking for in other quotes?"</li>
                    <li>2. "While you're comparing, make sure they include [unique value you offer]"</li>
                    <li>3. "I can hold this price for 7 days. After that, material costs may change."</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">"We need to think about it"</h3>
                  <p className="text-gray-300 mb-3">Response framework:</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>1. "Of course! What specific aspects would you like to think through?"</li>
                    <li>2. Address specific concerns they mention</li>
                    <li>3. "When would be a good time for me to follow up? I want to make sure your questions are answered."</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Techniques */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Professional Closing Techniques</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-500/10 border-green-500/30 p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Assumptive Close</h3>
                  <p className="text-gray-300 mb-3">Act as if they've already decided:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• "Which option works best for you?"</li>
                    <li>• "When would you like us to start?"</li>
                    <li>• "Would morning or afternoon work better?"</li>
                    <li>• "I'll get you on the schedule for..."</li>
                  </ul>
                </Card>

                <Card className="bg-blue-500/10 border-blue-500/30 p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Alternative Close</h3>
                  <p className="text-gray-300 mb-3">Give them control with limits:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• "Would April 15th or 22nd work better?"</li>
                    <li>• "Do you prefer the 5 or 7-year warranty?"</li>
                    <li>• "Will you use our financing or pay upfront?"</li>
                    <li>• "Should we start with interior or exterior?"</li>
                  </ul>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/30 p-6">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Urgency Close</h3>
                  <p className="text-gray-300 mb-3">Create ethical urgency:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• "This price is good for 7 days"</li>
                    <li>• "We have 2 spots left this month"</li>
                    <li>• "Spring schedule is filling fast"</li>
                    <li>• "Material prices increase May 1st"</li>
                  </ul>
                </Card>

                <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Summary Close</h3>
                  <p className="text-gray-300 mb-3">Recap value before asking:</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Summarize all included value</li>
                    <li>• Remind them of their goals</li>
                    <li>• Highlight unique benefits</li>
                    <li>• "Does this cover everything you need?"</li>
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
              <Card className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30 p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Create Professional Quotes That Convert
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our software creates stunning, branded quotes with built-in psychology that helps you present 
                  like a pro. Interactive options, digital signatures, and follow-up automation included.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                      Try Professional Quotes
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Presentation Resources</h2>
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

                <Link href="/guides/pricing-psychology" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <MessageSquare className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Pricing Psychology
                    </h3>
                    <p className="text-sm text-gray-400">
                      Price for profit and value
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/follow-up-strategies" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Target className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Follow-up Strategies
                    </h3>
                    <p className="text-sm text-gray-400">
                      Close deals after presentation
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