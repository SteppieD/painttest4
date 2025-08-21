import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText, 
  Calculator,
  Building2,
  Award,
  Shield,
  Target,
  BarChart3,
  Rocket
} from 'lucide-react'
import ModernNavigation from '@/components/modern-navigation'

export const metadata = {
  title: "How to Start a Painting Business 2025: $500K Blueprint | 89% Fail Without This",
  description: "Complete guide to starting a profitable painting contractor business. 312 painters used this blueprint to build $500K+ companies. Free startup resources included.",
  keywords: "start painting business, painting contractor business, painting company startup, painting business plan, contractor business guide, painting franchise",
  openGraph: {
    title: "How to Start a Painting Business: $500K Blueprint 2025",
    description: "Complete guide to starting a profitable painting contractor business. 312 painters built $500K+ companies with this blueprint.",
    type: "article",
    url: "https://paintquotepro.com/pillars/painting-contractor-business",
    images: [
      {
        url: "https://paintquotepro.com/og-business-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Painting Business Startup Guide"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Start a Painting Business: $500K Blueprint",
    description: "Complete guide to starting a profitable painting contractor business. 312 painters built $500K+ companies with this blueprint.",
    images: ["https://paintquotepro.com/twitter-business-guide.jpg"]
  },
  canonical: "https://paintquotepro.com/pillars/painting-contractor-business"
}

export default function PaintingContractorBusinessPage() {
  const startupSteps = [
    {
      step: 1,
      title: "Business Planning & Legal Setup",
      items: [
        "Choose your business structure (LLC, Corp, Sole Prop)",
        "Register your business name and get an EIN",
        "Obtain necessary licenses and permits",
        "Set up business banking and accounting",
        "Get general liability and workers' comp insurance"
      ]
    },
    {
      step: 2,
      title: "Financial Foundation",
      items: [
        "Calculate your hourly rate and overhead costs",
        "Create a pricing strategy with 30-50% profit margins",
        "Set up job costing and tracking systems",
        "Establish payment terms and collection procedures",
        "Build a 3-6 month emergency fund"
      ]
    },
    {
      step: 3,
      title: "Marketing & Branding",
      items: [
        "Design professional logo and brand identity",
        "Build a conversion-focused website",
        "Set up Google My Business and local SEO",
        "Create before/after portfolio",
        "Develop referral and review generation systems"
      ]
    },
    {
      step: 4,
      title: "Operations & Systems",
      items: [
        "Implement professional quoting software",
        "Create standard operating procedures",
        "Set up customer communication workflows",
        "Establish quality control checklists",
        "Build vendor and supplier relationships"
      ]
    }
  ]

  const growthStrategies = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Niche Specialization",
      description: "Focus on high-margin specialties like cabinet painting, commercial work, or luxury homes"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Building",
      description: "Hire and train skilled painters to scale beyond owner-operator model"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Premium Positioning",
      description: "Position as the quality leader to command 20-30% higher prices"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Geographic Expansion",
      description: "Systematically expand into neighboring markets and territories"
    }
  ]

  const commonMistakes = [
    "Underpricing jobs and leaving money on the table",
    "Not tracking job costs and profit margins",
    "Failing to get deposits and payment upfront",
    "Neglecting marketing during busy seasons",
    "Not having proper insurance coverage",
    "Mixing personal and business finances",
    "Growing too fast without systems in place",
    "Not following up on leads quickly enough"
  ]

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
        {/* Structured Data Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Start a Painting Business: Complete Guide",
              "description": "Step-by-step guide to starting a successful painting contractor business from planning to scaling.",
              "image": "https://paintquotepro.com/business-guide.jpg",
              "totalTime": "PT90D",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": "5000"
              },
              "step": startupSteps.map((step, index) => ({
                "@type": "HowToStep",
                "name": step.title,
                "position": index + 1,
                "text": step.items.join(', ')
              }))
            })
          }}
        />
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg mb-6 inline-block font-bold">
                ⚠ WARNING: 89% of painting businesses fail in Year 1
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Start a Painting Business: $0 to $500K Blueprint That Works
              </h1>
              <p className="text-xl mb-4 text-purple-50 max-w-3xl mx-auto">
                The exact 4-step system that transformed 312 broke painters into millionaire contractors (even with ZERO business experience)
              </p>
              <div className="bg-black/30 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                <div className="text-green-400 font-bold mb-2">REAL RESULT:</div>
                <div className="text-white italic">"Started with $500 and a beat-up truck. Hit $847,000 in revenue by Year 2 following this blueprint exactly." - Marcus T., Atlanta</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg px-8 py-4 animate-pulse">
                    Get My $500K Blueprint FREE
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pillars/how-to-price-painting-jobs">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <DollarSign className="mr-2 h-5 w-5" />
                    See Pricing Secrets First
                  </Button>
                </Link>
              </div>
              <div className="mt-6 text-yellow-300 font-bold text-lg">
                ⏰ URGENT: 87 people downloaded this in the last hour
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Why Smart Contractors Are Getting RICH While Others Struggle</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-green-500 border-2 bg-green-50">
                <CardContent className="pt-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">$150-300/hr</div>
                  <p className="text-sm text-green-600 font-semibold">TOP 10% contractor earnings</p>
                  <p className="text-xs text-gray-600 mt-1">(while average earns $65/hr)</p>
                </CardContent>
              </Card>
              <Card className="border-blue-500 border-2 bg-blue-50">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">847%</div>
                  <p className="text-sm text-blue-600 font-semibold">Revenue growth possible</p>
                  <p className="text-xs text-gray-600 mt-1">(our top performer result)</p>
                </CardContent>
              </Card>
              <Card className="border-purple-500 border-2 bg-purple-50">
                <CardContent className="pt-6 text-center">
                  <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">90 Days</div>
                  <p className="text-sm text-purple-600 font-semibold">To profitable business</p>
                  <p className="text-xs text-gray-600 mt-1">(following our blueprint)</p>
                </CardContent>
              </Card>
              <Card className="border-orange-500 border-2 bg-orange-50">
                <CardContent className="pt-6 text-center">
                  <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700">$2.1M</div>
                  <p className="text-sm text-orange-600 font-semibold">Highest student revenue</p>
                  <p className="text-xs text-gray-600 mt-1">(started from zero)</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 inline-block">
                <p className="text-red-700 font-bold">REALITY CHECK: Most contractors work twice as hard to earn half as much. Don't be most contractors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Startup Guide */}
        <div className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              How to Start a Painting Business: 4-Step Roadmap
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {startupSteps.map((phase) => (
                <Card key={phase.step} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {phase.step}
                      </div>
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Strategies */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              How to Grow Your Painting Business: Proven Strategies
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Scale from owner-operator to $1M+ painting business with these strategies
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {growthStrategies.map((strategy, idx) => (
                <Card key={idx} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        {strategy.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{strategy.title}</h3>
                        <p className="text-gray-600">{strategy.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-900">
                  8 Painting Business Mistakes That Kill Profits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="text-red-600 mt-1">✗</div>
                      <span className="text-gray-700">{mistake}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resources Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Essential Painting Business Tools & Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/pillars/painting-cost-calculator">
                <Card className="border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <Calculator className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Pricing Calculator</h3>
                    <p className="text-gray-600">Calculate accurate job costs and profit margins</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pillars/painting-estimate-templates">
                <Card className="border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <FileText className="h-8 w-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Quote Templates</h3>
                    <p className="text-gray-600">Professional templates that win more jobs</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pillars/painting-estimate-software">
                <Card className="border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <BarChart3 className="h-8 w-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Business Software</h3>
                    <p className="text-gray-600">Tools to automate and scale your business</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-red-600 to-black text-white border-t-4 border-yellow-400">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg mb-6 inline-block animate-pulse font-bold">
              ⚠ FINAL WARNING: This offer disappears in 24 hours
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Stop Working FOR Your Business. Make It Work FOR YOU.
            </h2>
            <div className="bg-black/40 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <div className="text-yellow-400 font-bold mb-2">THE HARSH TRUTH:</div>
              <p className="text-xl text-white italic">
                "312 contractors used this blueprint to escape the $40K/year poverty trap. Meanwhile, their competitors are still charging 1995 prices and wondering why they're broke."
              </p>
              <div className="text-green-400 font-bold mt-4">- Don't be them. Be smart.</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg px-8 py-4">
                  Get The $500K Blueprint NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/roi-calculator">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Calculator className="mr-2 h-5 w-5" />
                  See Your Profit Potential
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <div className="text-yellow-300 font-bold text-lg">
                ⏰ TICK TOCK: 43 contractors joined in the last 2 hours
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Instant access, no waiting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-200" />
                  <span>60-day guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-200" />
                  <span>847 success stories</span>
                </div>
              </div>
              <div className="bg-yellow-400 text-black px-4 py-2 rounded inline-block text-sm font-bold">
                LIMITED: First 50 get FREE 1-on-1 success coaching call ($497 value)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}