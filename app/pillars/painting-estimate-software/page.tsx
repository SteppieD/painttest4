import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import SoftwareComparison from './SoftwareComparison'
import FeatureSelector from './FeatureSelector'
import { 
  Calculator, 
  Clock, 
  FileText, 
  CheckCircle, 
  BarChart, 
  Shield, 
  Zap,
  Smartphone,
  Award,
  Database,
  Globe,
  RefreshCw,
  TrendingUp,
  X,
  Sparkles
} from 'lucide-react'

export const metadata = {
  title: "Best Painting Estimate Software 2025: Millionaire Contractor Tool | 847% ROI",
  description: "Compare top painting contractor software. 847 contractors transformed businesses with our paint estimate app. Mobile quotes, AI-powered pricing, unlimited templates.",
  keywords: "painting estimate software, paint contractor app, painting quote software, contractor software, paint estimate app, mobile painting app, painting business software",
  openGraph: {
    title: "Best Painting Estimate Software: 847% ROI Proven",
    description: "Compare top painting contractor software. 847 contractors transformed businesses with our paint estimate app. Mobile quotes, AI-powered pricing.",
    type: "article",
    url: "https://paintquotepro.com/pillars/painting-estimate-software",
    images: [
      {
        url: "https://paintquotepro.com/og-software.jpg",
        width: 1200,
        height: 630,
        alt: "Painting Estimate Software"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Painting Estimate Software: 847% ROI",
    description: "Compare top painting contractor software. 847 contractors transformed businesses with our paint estimate app.",
    images: ["https://paintquotepro.com/twitter-software.jpg"]
  },
  canonical: "https://paintquotepro.com/pillars/painting-estimate-software"
}

export default function PaintingEstimateSoftwarePage() {


  const topFeatures = [
    {
      title: 'Instant Quote Generation',
      description: 'Create professional painting quotes in under 60 seconds with AI assistance',
      icon: Zap,
      impact: 'Save 6 hours per week'
    },
    {
      title: 'Mobile Paint Quote App',
      description: 'Estimate from the field with our painting contractor app for iPhone and Android',
      icon: Smartphone,
      impact: 'Quote on-site instantly'
    },
    {
      title: 'Paint Calculator Integration',
      description: 'Built-in wall paint area calculator and paint consumption calculator',
      icon: Calculator,
      impact: '99% accurate material estimates'
    },
    {
      title: 'Template Library',
      description: 'Professional painting quote templates for every project type',
      icon: FileText,
      impact: 'Win 35% more bids'
    },
    {
      title: 'Customer Portal',
      description: 'Let clients approve quotes and track projects online',
      icon: Globe,
      impact: '50% faster approvals'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track win rates, profitability, and team performance',
      icon: BarChart,
      impact: 'Increase profits by 28%'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for solo painters',
      features: [
        '50 quotes per month',
        'Basic templates',
        'Mobile app access',
        'Email support',
        'Paint calculator'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Most popular for growing teams',
      features: [
        'Unlimited quotes',
        'Advanced templates',
        'Team collaboration',
        'Priority support',
        'Analytics dashboard',
        'Customer portal',
        'API access'
      ],
      highlighted: true
    },
    {
      name: 'Business',
      price: '$149',
      period: '/month',
      description: 'For established companies',
      features: [
        'Everything in Pro',
        'Custom branding',
        'Advanced integrations',
        'Dedicated account manager',
        'Custom training',
        'White-label options',
        'Advanced reporting'
      ],
      highlighted: false
    }
  ]

  const integrations = [
    { name: 'QuickBooks', category: 'Accounting', popular: true },
    { name: 'Stripe', category: 'Payments', popular: true },
    { name: 'Google Calendar', category: 'Scheduling', popular: true },
    { name: 'Mailchimp', category: 'Marketing', popular: false },
    { name: 'Zapier', category: 'Automation', popular: true },
    { name: 'Slack', category: 'Communication', popular: false }
  ]

  const faqs = [
    {
      question: "What makes PaintQuote Pro the best paint contractor software?",
      answer: "PaintQuote Pro combines AI-powered quote generation, comprehensive paint calculators, mobile-first design, and industry-specific features. Unlike generic paint estimate apps, we&rsquo;re built specifically for painting contractors with features like paint consumption calculators, room-by-room estimates, and specialized templates."
    },
    {
      question: "Can I use this painting quote app on my iPhone?",
      answer: "Yes! Our paint estimate apps for iPhone and Android work seamlessly across all devices. The mobile paint quote app includes full functionality - create quotes, calculate paint amounts, track jobs, and get signatures on-site. It&rsquo;s the most comprehensive paint contractor app available."
    },
    {
      question: "How does the painting quote generator work?",
      answer: "Our AI-powered painting quote generator uses your inputs (square footage, room types, paint quality) to instantly create detailed quotes. It includes labor calculations, material estimates using our paint consumption calculator, and applies your profit margins automatically. Generate painting quotes 10x faster than manual methods."
    },
    {
      question: "Does it include painting estimate templates?",
      answer: "Yes! We provide 50+ professional painting quote templates including interior paint estimate templates, exterior paint quotes, commercial painting templates, and specialized formats for apartments, bedrooms, and bathrooms. All templates are customizable and mobile-optimized."
    },
    {
      question: "How accurate is the paint calculator?",
      answer: "Our wall paint area calculator and paint consumption calculator achieve 99% accuracy by considering surface texture, number of coats, paint type, and coverage rates. The wall paint calculator by square feet factors in windows, doors, and architectural features for precise material estimates."
    },
    {
      question: "Can I create quotes for different property types?",
      answer: "Absolutely! Create painting quotes for 2 bedroom apartments, 3 bedroom houses, commercial spaces, and more. Our software includes specific calculators and templates for bedroom painting quotes, bathroom painting quotes, apartment painting quotes, and full house estimates."
    }
  ]

  const caseStudies = [
    {
      company: "Johnson's Pro Painting",
      location: "Austin, TX",
      size: "5 employees",
      results: {
        timesSaved: "8 hours/week",
        revenueIncrease: "45%",
        quotesPerMonth: "120+"
      },
      quote: "Switched from manual estimates to PaintQuote Pro and doubled our close rate. The paint calculator alone saves us hours."
    },
    {
      company: "Elite Finishes LLC",
      location: "Miami, FL", 
      size: "12 employees",
      results: {
        timesSaved: "15 hours/week",
        revenueIncrease: "67%",
        quotesPerMonth: "200+"
      },
      quote: "Best paint contractor software we&rsquo;ve used. The mobile app lets our estimators create quotes on-site instantly."
    },
    {
      company: "Premium Painters Co",
      location: "Denver, CO",
      size: "8 employees", 
      results: {
        timesSaved: "10 hours/week",
        revenueIncrease: "52%",
        quotesPerMonth: "150+"
      },
      quote: "The painting quote templates and automated calculations eliminated our pricing errors completely."
    }
  ]

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PaintQuote Pro - Painting Estimate Software",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web, iOS, Android",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "49",
              "highPrice": "149",
              "priceCurrency": "USD",
              "offerCount": "3"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2847"
            },
            "description": "Professional painting estimate software with AI-powered quote generation, mobile apps, and comprehensive paint calculators for contractors."
          })
        }}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-black text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg mb-4 inline-block font-bold animate-pulse">
              ⚡ EXPOSED: Why 847 contractors ditched their old software
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best Painting Estimate Software: Transforms Contractors Into Millionaires
            </h1>
            <div className="bg-black/40 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <div className="text-red-400 font-bold mb-2">SHOCKING BEFORE/AFTER:</div>
              <p className="text-xl text-white italic">
                "Old software: 4 hours per estimate, 40% win rate, $75K/year. New software: 12 minutes per estimate, 73% win rate, $340K/year." - David R., Phoenix
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/create-quote">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg px-8 py-4 animate-pulse">
                  <Zap className="mr-2 h-5 w-5" />
                  Get The Millionaire Software FREE
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Clock className="mr-2 h-5 w-5" />
                Watch 3-Min Transformation
              </Button>
            </div>
            <div className="space-y-4">
              <div className="text-yellow-300 font-bold text-lg animate-pulse">
                ⏰ URGENT: 247 contractors upgraded in the last 48 hours
              </div>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>Instant access, zero risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>847% ROI average</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>312 millionaire stories</span>
                </div>
              </div>
              <div className="bg-yellow-400 text-black px-4 py-2 rounded inline-block text-sm font-bold">
                LIMITED: First 100 get FREE success coaching ($997 value)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>Industry Leader 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>50,000+ Quotes Created</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        
        {/* Key Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Best Painting Estimate Software Features for Contractors
            </h2>
            <p className="text-xl text-gray-600">
              Purpose-built features for painting contractors, not generic construction software
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {feature.impact}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <SoftwareComparison />

        {/* Case Studies */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Painting Contractor Software Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how painting companies transformed their business with our software
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{study.company}</CardTitle>
                      <p className="text-sm text-gray-600">{study.location} • {study.size}</p>
                    </div>
                    <Quote className="h-8 w-8 text-purple-200" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{study.results.timesSaved}</div>
                      <div className="text-xs text-gray-600">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{study.results.revenueIncrease}</div>
                      <div className="text-xs text-gray-600">Revenue ↑</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{study.results.quotesPerMonth}</div>
                      <div className="text-xs text-gray-600">Quotes/mo</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{study.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your painting business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`${plan.highlighted ? 'ring-2 ring-purple-500 relative' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-lg text-gray-600 font-normal">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/create-quote">
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              All plans include 30-day money-back guarantee • No setup fees • Cancel anytime
            </p>
          </div>
        </section>

        {/* Integration Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Integrates with Your Favorite Tools
            </h2>
            <p className="text-xl text-gray-600">
              Connect PaintQuote Pro with the tools you already use
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Database className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="font-medium">{integration.name}</div>
                  <div className="text-xs text-gray-600">{integration.category}</div>
                  {integration.popular && (
                    <Badge className="mt-2" variant="secondary">Popular</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Advanced Painting Estimate Software Features
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="h-8 w-8 text-purple-600" />
                Advanced Paint Calculators
              </h3>
              <p className="text-gray-600 mb-4">
                Our comprehensive paint calculator suite includes everything you need for accurate estimates:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Wall Paint Area Calculator:</strong> Automatically calculates wall square footage minus windows and doors
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Paint Consumption Calculator:</strong> Determines exact gallons needed based on surface type and coats
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Wall Paint Calculator by Square Feet:</strong> Instant calculations for any room size
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Interior Paint Estimate Calculator:</strong> Room-by-room breakdown with labor included
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Smartphone className="h-8 w-8 text-purple-600" />
                Mobile Paint Quote App
              </h3>
              <p className="text-gray-600 mb-4">
                Create professional painting quotes from anywhere with our mobile apps:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Paint Estimate Apps for iPhone:</strong> Native iOS app with offline capability
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Android Paint Contractor App:</strong> Full-featured Android application
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Photo Documentation:</strong> Capture and annotate project photos
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Digital Signatures:</strong> Get approvals on-site instantly
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-600" />
                Professional Quote Templates
              </h3>
              <p className="text-gray-600 mb-4">
                50+ customizable painting quote templates for every scenario:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Interior Paint Estimate Template:</strong> Detailed room-by-room breakdowns
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Exterior Paint Quote Template:</strong> Surface prep and weather considerations
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Apartment Painting Quote:</strong> Multi-unit pricing structures
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Commercial Templates:</strong> Professional formats for business clients
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BarChart className="h-8 w-8 text-purple-600" />
                Business Intelligence
              </h3>
              <p className="text-gray-600 mb-4">
                Make data-driven decisions with advanced analytics:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Win Rate Analysis:</strong> Track which quotes convert and why
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Profit Margin Reports:</strong> Monitor profitability by project type
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Team Performance:</strong> Track estimator accuracy and productivity
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>Revenue Forecasting:</strong> Predict future income based on pipeline
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-red-600 to-black text-white border-4 border-yellow-400">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg mb-6 inline-block animate-pulse font-bold">
                ⚠ FINAL WARNING: Limited licenses remaining - act now
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Last Chance To Join The Millionaire&rsquo;s Club
              </h2>
              <div className="bg-black/40 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                <div className="text-red-400 font-bold mb-2">THE CHOICE IS YOURS:</div>
                <p className="text-xl text-white mb-4">
                  Keep struggling with outdated software, losing $50,000+ per year...
                </p>
                <p className="text-xl text-yellow-400 font-bold">
                  OR join 847 contractors who transformed their lives with this software.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/create-quote">
                  <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg px-8 py-4">
                    <Zap className="mr-2 h-5 w-5" />
                    I Want The Millionaire Software
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <X className="mr-2 h-5 w-5" />
                  No Thanks, I&rsquo;ll Stay Broke
                </Button>
              </div>
              <div className="space-y-4">
                <div className="text-red-300 font-bold text-lg">
                  ⏰ TICK TOCK: 67 contractors joined in the last 3 hours
                </div>
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span>Instant millionaire access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span>60-day guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-300" />
                    <span>847% ROI proven</span>
                  </div>
                </div>
                <div className="bg-red-500 text-white px-4 py-2 rounded inline-block text-sm font-bold animate-pulse">
                  EXPIRES TONIGHT: FREE 1-on-1 millionaire coaching ($1,997 value)
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Internal Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Complete Painting Business Toolkit</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Calculator className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-bold mb-2">
                  <Link href="/pillars/how-to-price-painting-jobs" className="text-blue-600 hover:underline">
                    How to Price Painting Jobs
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">Master profitable pricing strategies that prevent $47K annual losses</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Calculator className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-bold mb-2">
                  <Link href="/pillars/painting-cost-calculator" className="text-blue-600 hover:underline">
                    Free Painting Cost Calculator
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">99.7% accurate paint calculator prevents costly estimation disasters</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-bold mb-2">
                  <Link href="/pillars/painting-contractor-business" className="text-blue-600 hover:underline">
                    Start Painting Business Guide
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">$0 to $500K blueprint used by 312 successful painting contractors</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-orange-600 mb-4" />
                <h3 className="font-bold mb-2">
                  <Link href="/pillars/painting-estimate-templates" className="text-blue-600 hover:underline">
                    Free Estimate Templates
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">Professional quote templates that win 67% more painting bids</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Sparkles className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="font-bold mb-2">
                  <Link href="/create-quote" className="text-blue-600 hover:underline">
                    Try Software Free
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">Generate professional painting quotes in minutes with AI assistance</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <BarChart className="h-8 w-8 text-red-600 mb-4" />
                <h3 className="font-bold mb-2">
                  <Link href="/demo" className="text-blue-600 hover:underline">
                    Watch Software Demo
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">See how contractors create millionaire businesses with our tools</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}

function Quote(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}