import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Rocket,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Calculator,
  Star,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Target,
  Lightbulb,
  Heart,
  BookOpen,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Business Startup Software | New Contractor Tools',
  description: 'Everything new painting contractors need to start strong. Professional quotes from day one, pricing guidance, and tools to compete with established companies.',
  openGraph: {
    title: 'PaintQuote Pro for New Painting Contractors',
    description: 'Launch your painting business with professional quoting tools',
    images: ['/og-startups.png'],
  },
}

export default function StartupsPage() {
  const startupFeatures = [
    {
      icon: Rocket,
      title: 'Quick Start Templates',
      description: 'Pre-built pricing for common jobs to get you started fast'
    },
    {
      icon: Calculator,
      title: 'Pricing Guidance',
      description: 'Regional pricing data so you quote competitively'
    },
    {
      icon: FileText,
      title: 'Professional Image',
      description: 'Look established with branded, professional quotes'
    },
    {
      icon: BookOpen,
      title: 'Business Resources',
      description: 'Guides, templates, and best practices included'
    },
    {
      icon: Shield,
      title: 'Confidence Builder',
      description: 'Quote accurately without years of experience'
    },
    {
      icon: Heart,
      title: 'Startup Support',
      description: 'Direct access to our success team'
    }
  ]

  const startupJourney = [
    {
      week: 'Week 1',
      milestone: 'First Professional Quote',
      description: 'Set up your brand and create your first quote in minutes',
      icon: FileText
    },
    {
      week: 'Week 2',
      milestone: 'Win First Job',
      description: 'Land your first customer with professional proposals',
      icon: Award
    },
    {
      week: 'Month 1',
      milestone: 'Establish Pricing',
      description: 'Dial in your rates based on local market data',
      icon: Target
    },
    {
      week: 'Month 3',
      milestone: 'Scale Operations',
      description: 'Handle multiple quotes daily with confidence',
      icon: TrendingUp
    }
  ]

  const startupPackages = [
    {
      name: 'Essential Templates',
      items: [
        'Interior room pricing guide',
        'Exterior home checklist',
        'Material calculation sheets',
        'Professional quote templates'
      ]
    },
    {
      name: 'Business Builders',
      items: [
        'Contractor license guide',
        'Insurance requirement docs',
        'Customer contract templates',
        'Follow-up email scripts'
      ]
    },
    {
      name: 'Growth Tools',
      items: [
        'Marketing material templates',
        'Referral program setup',
        'Review request automation',
        'Upsell opportunity guides'
      ]
    }
  ]

  const successStories = [
    {
      name: 'Carlos Mendez',
      company: 'Fresh Start Painting',
      story: 'Started with zero experience. Now booking $15K/month after 6 months.',
      key: 'Professional quotes gave me instant credibility',
      timeline: '0 to $180K annual revenue'
    },
    {
      name: 'Ashley Thompson',
      company: 'Precision Paint Co',
      story: 'Left corporate job to start painting business. Profitable in month 2.',
      key: 'The pricing guidance saved me from costly mistakes',
      timeline: 'Replaced corporate salary in 4 months'
    },
    {
      name: 'Marcus Johnson',
      company: 'MJ Professional Painting',
      story: 'Side hustle became full-time business thanks to efficient quoting.',
      key: 'I can quote jobs during lunch breaks',
      timeline: 'Quit day job after 5 months'
    }
  ]

  const pricingOptions = [
    {
      name: 'Startup Monthly',
      price: '$79/month',
      description: 'Perfect for testing the waters',
      features: ['5 quotes/month', 'All templates', 'Email support', 'Cancel anytime']
    },
    {
      name: 'Growth Monthly',
      price: '$149/month',
      description: 'For serious new contractors',
      features: ['Unlimited quotes', 'Priority support', 'Advanced features', 'Training videos'],
      popular: true
    },
    {
      name: 'Annual Saver',
      price: '$1490/year',
      description: 'Best value - save $298',
      features: ['Everything in Growth', '2 months free', 'Success coaching call', 'Exclusive resources']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
                <Rocket className="h-3 w-3 mr-1" />
                For New Contractors
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Start Your Painting Business
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  The Right Way
                </span>
              </h1>
              
              <p className="text-xl text-gray-100 mb-8">
                Professional quoting tools for new painting contractors. 
                Look established, quote confidently, and grow faster from day one.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/guides/painting-business-guide">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Free Startup Guide
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No experience needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>30-day money back</span>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
                <div className="text-center mb-6">
                  <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Your Success Checklist</h3>
                  <p className="text-gray-200">Everything you need to launch</p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center gap-3 p-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-100">Professional quoting system</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center gap-3 p-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-100">Pricing templates & guides</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center gap-3 p-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-100">Business document templates</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center gap-3 p-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-100">Marketing materials</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center gap-3 p-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-100">Direct support access</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Startups */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built to Help New Contractors Succeed
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Every tool and resource you need to build a thriving painting business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startupFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6">
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Journey Timeline */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Your First 90 Days to Success
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Follow our proven path from startup to profitable business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {startupJourney.map((stage, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <stage.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <div className="text-sm text-gray-200 mb-2">{stage.week}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{stage.milestone}</h3>
                <p className="text-sm text-gray-200">{stage.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Included Resources */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything Included to Launch Strong
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {startupPackages.map((package_, index) => (
              <Card key={index} className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-400" />
                  {package_.name}
                </h3>
                <ul className="space-y-2">
                  {package_.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-100">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              New Contractors Crushing It
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Real stories from painters who started with zero experience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1">{story.name}</h3>
                <p className="text-gray-200 mb-3">{story.company}</p>
                
                <p className="text-gray-100 mb-3">{story.story}</p>
                
                <p className="text-base text-gray-200 italic mb-3">"{story.key}"</p>
                
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  {story.timeline}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Startup-Friendly Pricing
            </h2>
            <p className="text-gray-100">Start small, scale as you grow</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {pricingOptions.map((option, index) => (
              <Card key={index} className={`glass-card p-8 ${option.popular ? 'border-blue-500' : ''}`}>
                {option.popular && (
                  <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                    Most Popular
                  </Badge>
                )}
                
                <h3 className="text-2xl font-semibold text-white mb-2">{option.name}</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">{option.price}</div>
                <p className="text-gray-200 mb-6">{option.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-100">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full" variant={option.popular ? 'default' : 'outline'}>
                  Get Started Free
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Launch Your Painting Business?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join hundreds of successful contractors who started here
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/guides/painting-business-guide">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Read Startup Guide
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-base text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>30-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Success support</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}