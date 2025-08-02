import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Sparkles, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  CheckCircle,
  Star,
  Zap,
  Shield,
  Smartphone,
  FileText,
  Users,
  ArrowRight,
  Timer,
  Award,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Painting Quotes in Minutes - Paint Quote Pro',
  description: 'Create winning painting quotes in 10-15 minutes. Join 500+ contractors who win 40-60% more jobs with our AI-powered quoting software. Start free today.',
  openGraph: {
    title: 'Paint Quote Pro - Professional Painting Quotes in Minutes',
    description: 'Create winning painting quotes in 10-15 minutes. Join 500+ contractors who win 40-60% more jobs with our AI-powered quoting software.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paint Quote Pro - Professional Painting Quotes in Minutes',
    description: 'Create winning painting quotes in 10-15 minutes. Win 40-60% more jobs with our AI-powered quoting software.',
  },
  alternates: {
    canonical: '/',
  }
}

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Paint Quote Pro",
  "url": "https://paintquotepro.com",
  "logo": "https://paintquotepro.com/logo.png",
  "description": "Professional painting quote software that helps contractors create winning estimates in minutes.",
  "sameAs": [
    "https://twitter.com/paintquotepro",
    "https://www.facebook.com/paintquotepro",
    "https://www.linkedin.com/company/paintquotepro"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "Customer Service",
    "areaServed": "US",
    "availableLanguage": ["English"]
  }
}

// Software Application structured data
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Paint Quote Pro",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan with 5 quotes per month"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "500"
  }
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Urgency Badge */}
            <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
              <Timer className="h-3 w-3 mr-1" />
              Every day of delay costs you 15-25% win probability
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Quote in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Minutes</span>,
              Not Hours
            </h1>
            
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              While your competitors take 3-6 hours to create quotes, you{"'"}ll deliver professional estimates in 10-15 minutes. 
              <span className="text-white font-semibold"> Win 40-60% more jobs</span> with speed and professionalism.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg">
                  Start Free Trial
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/roi-calculator">
                <Button size="lg" variant="ghost" className="border border-white/20 text-white hover:bg-gray-900/70 bg-transparent px-8 py-6 text-lg">
                  Calculate Your ROI
                  <DollarSign className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 text-gray-200">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>500+ Contractors</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>10,000+ Quotes Created</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stop Losing Jobs to Faster Competitors
            </h2>
            <p className="text-xl text-gray-200">
              Industry research shows these are the top reasons contractors lose jobs:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-red-500/20 rounded-lg p-6">
              <div className="text-red-400 text-3xl font-bold mb-2">40-60%</div>
              <h3 className="text-white font-semibold mb-2">Lost to Slow Response</h3>
              <p className="text-gray-200 text-base">Jobs lost because quotes take too long to deliver</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-orange-500/20 rounded-lg p-6">
              <div className="text-orange-400 text-3xl font-bold mb-2">25-35%</div>
              <h3 className="text-white font-semibold mb-2">Unprofessional Look</h3>
              <p className="text-gray-200 text-base">Lost due to handwritten or basic quotes</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-yellow-500/20 rounded-lg p-6">
              <div className="text-yellow-400 text-3xl font-bold mb-2">30-40%</div>
              <h3 className="text-white font-semibold mb-2">Poor Follow-up</h3>
              <p className="text-gray-200 text-base">Jobs lost from inconsistent communication</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-purple-500/20 rounded-lg p-6">
              <div className="text-purple-400 text-3xl font-bold mb-2">20-30%</div>
              <h3 className="text-white font-semibold mb-2">Pricing Errors</h3>
              <p className="text-gray-200 text-base">Lost from calculation mistakes</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              PaintQuote Pro Solves Every Pain Point
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>10-15 min quotes</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>Professional templates</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>Automated follow-up</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>AI-powered accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Win More Jobs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg group hover:border-blue-500/50 transition-all p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Speed</h3>
                <p className="text-gray-200">Create accurate quotes in minutes with our intelligent assistant that understands painting projects</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg group hover:border-purple-500/50 transition-all p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quote On-Site</h3>
                <p className="text-gray-200">Mobile-first design lets you create and deliver quotes before leaving the customer{"'"}s property</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg group hover:border-green-500/50 transition-all p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Professional Templates</h3>
                <p className="text-gray-200">Branded, professional quotes that make you look like a $10M company</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg group hover:border-orange-500/50 transition-all p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Beat the 24hr Window</h3>
                <p className="text-gray-200">Respond to leads while they{"'"}re hot - quote delivery in minutes, not days</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg group hover:border-yellow-500/50 transition-all p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Track Win Rates</h3>
                <p className="text-gray-200">See which quotes convert and optimize your pricing for maximum profit</p>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg group hover:border-cyan-500/50 transition-all p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Never Lose Data</h3>
                <p className="text-gray-200">Cloud storage ensures your quotes are always accessible and never lost</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg max-w-4xl mx-auto p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Your ROI with PaintQuote Pro
                </h2>
                <p className="text-xl text-gray-200">
                  Based on industry averages for painting contractors
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Before PaintQuote Pro</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-200">
                      <span>Quotes per month:</span>
                      <span className="text-white">20</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Win rate:</span>
                      <span className="text-white">35%</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Jobs won:</span>
                      <span className="text-white">7</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Avg job value:</span>
                      <span className="text-white">$2,800</span>
                    </div>
                    <div className="flex justify-between text-gray-200 font-semibold pt-2 border-t border-white/10">
                      <span>Monthly revenue:</span>
                      <span className="text-white">$19,600</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">After PaintQuote Pro</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-200">
                      <span>Quotes per month:</span>
                      <span className="text-green-400">30+</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Win rate:</span>
                      <span className="text-green-400">50%+</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Jobs won:</span>
                      <span className="text-green-400">15+</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                      <span>Avg job value:</span>
                      <span className="text-white">$2,800</span>
                    </div>
                    <div className="flex justify-between text-gray-200 font-semibold pt-2 border-t border-white/10">
                      <span>Monthly revenue:</span>
                      <span className="text-green-400">$42,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  +$22,400/month
                </div>
                <p className="text-white">Additional revenue with PaintQuote Pro</p>
                <p className="text-gray-200 text-base mt-2">
                  That{"'"}s a 283x ROI on our $79/month Pro plan
                </p>
              </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contractors Love PaintQuote Pro
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-100 mb-4">
                  {"\"My closing rate has skyrocketed. Being able to deliver professional quotes on-site makes all the difference.\""}
                </p>
                <div className="text-base text-gray-200">
                  <div className="font-semibold text-white">Mike Johnson</div>
                  <div>Johnson Painting Co.</div>
                </div>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-100 mb-4">
                  {"\"Our quotation rate increased from 50 to over 200 per month. Game changer for our business.\""}
                </p>
                <div className="text-base text-gray-200">
                  <div className="font-semibold text-white">Sarah Chen</div>
                  <div>Premier Paint Solutions</div>
                </div>
            </div>

            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-100 mb-4">
                  {"\"I receive compliments on how professional my estimates look. Worth every penny.\""}
                </p>
                <div className="text-base text-gray-200">
                  <div className="font-semibold text-white">David Martinez</div>
                  <div>DM Professional Painting</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-200">
              Start free, upgrade when you see the value
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                  <div className="text-4xl font-bold text-white mb-2">$0</div>
                  <p className="text-gray-200">Perfect for getting started</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>5 quotes per month</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>AI-powered quote creation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Mobile access</span>
                  </li>
                </ul>
                <Link href="/trial-signup" className="block">
                  <Button className="w-full" variant="outline">
                    Start Free
                  </Button>
                </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-blue-500/50 rounded-lg relative p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  Most Popular
                </Badge>
              </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-white mb-2">$79</div>
                  <p className="text-gray-200">For growing contractors</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Unlimited quotes</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Professional templates</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Analytics & insights</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/trial-signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Start 14-Day Trial
                  </Button>
                </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-white mb-2">Custom</div>
                  <p className="text-gray-200">For large teams</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Multiple users</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg max-w-3xl mx-auto border-gradient p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Win More Jobs?
              </h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Join 500+ painting contractors who are closing more deals with professional quotes delivered in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <p className="text-gray-200 text-base mt-4">
                No credit card required • 5 free quotes • Setup in 2 minutes
              </p>
          </div>
        </div>
      </section>
      </main>
      <ModernFooter />
    </>
  )
}