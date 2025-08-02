import { Metadata } from 'next'
import Link from 'next/link'
// import { Button } from '@/components/ui/button' // TODO: Check if this import is needed
// import { Card } from '@/components/ui/card' // TODO: Check if this import is needed
// import { Badge } from '@/components/ui/badge' // TODO: Check if this import is needed
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Building,
  CheckCircle,
  Clock,
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
  Globe,
  Settings,
  Award,
  Target,
  Layers,
  Lock
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Franchise Software | Multi-Location Quoting System',
  description: 'Centralized quoting software for painting franchises. Maintain brand consistency, track franchisee performance, and scale your painting franchise network.',
  openGraph: {
    title: 'PaintQuote Pro for Painting Franchises',
    description: 'Unified quoting system for multi-location painting franchises',
    images: ['/og-franchise.png'],
  },
}

export default function FranchisePage() {
  const franchiseFeatures = [
    {
      icon: Globe,
      title: 'Multi-Location Management',
      description: 'Centralized control with local flexibility for each franchise'
    },
    {
      icon: Shield,
      title: 'Brand Consistency',
      description: 'Standardized pricing and professional branded proposals'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track metrics across all locations in real-time'
    },
    {
      icon: Settings,
      title: 'Customizable Permissions',
      description: 'Control what franchisees can modify vs. corporate standards'
    },
    {
      icon: Users,
      title: 'Training & Onboarding',
      description: 'Built-in tutorials get new franchisees productive fast'
    },
    {
      icon: Lock,
      title: 'Data Security',
      description: 'Keep franchisee data separate while maintaining oversight'
    }
  ]

  const franchiseBenefits = [
    {
      stakeholder: 'For Franchisors',
      benefits: [
        'Maintain pricing consistency across territories',
        'Monitor franchisee performance and quote quality',
        'Enforce brand standards automatically',
        'Scale onboarding for new locations',
        'Aggregate data for better negotiations'
      ]
    },
    {
      stakeholder: 'For Franchisees',
      benefits: [
        'Professional quotes from day one',
        'Proven pricing that maximizes profit',
        'Focus on sales, not estimating',
        'Access to corporate best practices',
        'Compete with established contractors'
      ]
    }
  ]

  const successMetrics = [
    { metric: '87%', description: 'Faster franchisee ramp-up', detail: 'Productive in days, not months' },
    { metric: '45%', description: 'Higher close rates', detail: 'Across all franchise locations' },
    { metric: '3x', description: 'Revenue growth', detail: 'Average first-year increase' },
    { metric: '92%', description: 'Brand compliance', detail: 'Consistent pricing & presentation' }
  ]

  const franchisePartners = [
    {
      name: 'ColorCraft Painting Franchise',
      locations: '127 locations',
      testimonial: 'PaintQuote Pro solved our biggest challenge - getting new franchisees profitable quickly.',
      results: 'New locations profitable 3x faster',
      author: 'Jennifer Martinez, COO'
    },
    {
      name: 'Premium Paint Pros Network',
      locations: '85 locations',
      testimonial: 'The consistency across all our locations has transformed our brand reputation.',
      results: '40% increase in system-wide revenue',
      author: 'Robert Chen, Founder'
    },
    {
      name: 'Fresh Coat Franchise Group',
      locations: '200+ locations',
      testimonial: 'Finally, a system that scales with us. Onboarding new franchisees is seamless.',
      results: 'Reduced training time by 75%',
      author: 'Michael Thompson, VP Operations'
    }
  ]

  const pricingTiers = [
    {
      name: 'Starter Network',
      locations: '1-10 locations',
      price: '$299/month',
      features: ['All core features', 'Basic analytics', 'Email support']
    },
    {
      name: 'Growth Network',
      locations: '11-50 locations',
      price: '$799/month',
      features: ['Advanced analytics', 'Custom branding', 'Priority support', 'API access']
    },
    {
      name: 'Enterprise Network',
      locations: '50+ locations',
      price: 'Custom pricing',
      features: ['White-label options', 'Dedicated success manager', 'Custom integrations', 'SLA guarantee']
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
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Building className="h-3 w-3 mr-1" />
                For Painting Franchises
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Scale Your Franchise
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  With Unified Quoting
                </span>
              </h1>
              
              <p className="text-xl text-gray-100 mb-8">
                The only quoting platform built for painting franchises. 
                Maintain brand standards while empowering franchisees to succeed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start Free Pilot
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Schedule Franchise Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>20+ franchise systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>500+ locations</span>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
                <div className="text-center mb-6">
                  <Target className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Franchise Success Dashboard</h3>
                  <p className="text-gray-200">See how PaintQuote Pro drives franchise growth</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Avg. Quote Time</span>
                    <span className="text-green-400 font-semibold">2 minutes</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Close Rate Increase</span>
                    <span className="text-green-400 font-semibold">+45%</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Franchisee Satisfaction</span>
                    <span className="text-green-400 font-semibold">4.9/5</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Training Time Saved</span>
                    <span className="text-green-400 font-semibold">75%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built for Franchise Success
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Every feature designed to help franchisors scale and franchisees succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {franchiseFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6">
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits by Stakeholder */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Benefits for Your Entire Franchise System
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {franchiseBenefits.map((group, index) => (
              <Card key={index} className="glass-card p-8">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Award className="h-6 w-6 text-blue-400" />
                  {group.stakeholder}
                </h3>
                <ul className="space-y-3">
                  {group.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-100">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Proven Franchise Performance
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {successMetrics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">{stat.metric}</div>
                  <div className="text-white font-semibold mb-1">{stat.description}</div>
                  <div className="text-base text-gray-200">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Partners */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Leading Painting Franchises
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {franchisePartners.map((partner, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
                  <p className="text-gray-200">{partner.locations}</p>
                </div>
                
                <p className="text-gray-100 mb-4 italic">"{partner.testimonial}"</p>
                
                <div className="border-t border-gray-700 pt-4">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-2">
                    {partner.results}
                  </Badge>
                  <p className="text-base text-gray-200">- {partner.author}</p>
                </div>
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
              Franchise-Friendly Pricing
            </h2>
            <p className="text-gray-100">Volume discounts that scale with your growth</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`glass-card p-8 ${index === 1 ? 'border-blue-500' : ''}`}>
                {index === 1 && (
                  <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                    Most Popular
                  </Badge>
                )}
                
                <h3 className="text-2xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-200 mb-4">{tier.locations}</p>
                <div className="text-3xl font-bold text-blue-400 mb-6">{tier.price}</div>
                
                <ul className="space-y-2 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-100">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                  {index === 2 ? 'Contact Sales' : 'Get Started'}
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
              Ready to Empower Your Franchise Network?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join 20+ painting franchises using PaintQuote Pro to scale faster
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Schedule Franchise Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/trial-signup">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Start Pilot Program
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-base text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Multi-location ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Volume pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>White-label available</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}