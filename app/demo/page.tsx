import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Play,
  Clock,
  CheckCircle,
  Sparkles,
  Calculator,
  MessageSquare,
  FileText,
  Zap,
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: '2-Minute Demo: See PaintQuote Pro in Action | AI Painting Estimator',
  description: 'Watch how painting contractors create professional quotes in 60 seconds with AI. See real examples, ROI calculations, and customer success stories.',
  openGraph: {
    title: 'Watch 2-Min Demo: AI-Powered Painting Quotes',
    description: 'See how contractors save 6+ hours per week with instant AI quotes',
    images: ['/og-demo.png'],
  },
}

export default function DemoPage() {
  const demoFeatures = [
    {
      icon: MessageSquare,
      title: 'AI Conversation',
      description: 'Natural language quote creation',
      time: '0:00 - 0:30'
    },
    {
      icon: Calculator,
      title: 'Instant Calculations',
      description: 'Automatic pricing & materials',
      time: '0:30 - 1:00'
    },
    {
      icon: FileText,
      title: 'Professional Quotes',
      description: 'Branded PDF generation',
      time: '1:00 - 1:30'
    },
    {
      icon: Zap,
      title: 'One-Click Send',
      description: 'Email & text delivery',
      time: '1:30 - 2:00'
    }
  ]

  const testimonials = [
    {
      name: 'Mike Thompson',
      company: 'Premier Painting Co.',
      quote: 'Cut my quoting time from 45 minutes to 2 minutes. Game changer!',
      rating: 5,
      savings: '20 hours/week'
    },
    {
      name: 'Sarah Chen',
      company: 'Colorful Spaces LLC',
      quote: 'The AI understands painting terminology perfectly. Like having an expert assistant.',
      rating: 5,
      savings: '15 hours/week'
    },
    {
      name: 'David Martinez',
      company: 'Pro Paint Solutions',
      quote: 'Increased my close rate by 40% with professional instant quotes.',
      rating: 5,
      savings: '25 hours/week'
    }
  ]

  const demoStats = [
    { label: 'Average Time to Quote', value: '60 seconds', comparison: 'vs 45 minutes' },
    { label: 'Accuracy Rate', value: '98.5%', comparison: 'Industry-leading' },
    { label: 'Customer Response', value: '3x faster', comparison: 'Same-day quotes' },
    { label: 'Close Rate Increase', value: '+40%', comparison: 'Professional presentation' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Clock className="h-3 w-3 mr-1" />
              2-Minute Demo
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              See AI Quotes in Action
            </h1>
            
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Watch how painting contractors create professional quotes in 60 seconds. 
              No typing, no calculations, just natural conversation.
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-2 max-w-4xl mx-auto mb-12">
            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Play className="h-6 w-6 mr-2" />
                  Play Demo Video
                </Button>
              </div>
              {/* Placeholder for video thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            </div>
          </div>

          {/* Demo Timeline */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {demoFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <feature.icon className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-base text-gray-200 mb-2">{feature.description}</p>
                <Badge variant="outline" className="text-xs">
                  {feature.time}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Try It Yourself - Live Demo
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Experience the AI quote assistant right now. No signup required.
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Start a Sample Quote Conversation
              </h3>
              <p className="text-gray-200 mb-6">
                Click below to see how our AI handles real painting scenarios
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 cursor-pointer hover:border-blue-500 transition-colors">
                <h4 className="font-semibold text-white mb-2">Interior Home Painting</h4>
                <p className="text-base text-gray-200 mb-4">
                  3-bedroom house, 2,000 sq ft, walls and ceilings
                </p>
                <Button className="w-full" variant="outline">
                  Try This Scenario
                </Button>
              </Card>

              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 cursor-pointer hover:border-blue-500 transition-colors">
                <h4 className="font-semibold text-white mb-2">Commercial Office</h4>
                <p className="text-base text-gray-200 mb-4">
                  5,000 sq ft office space, after-hours work
                </p>
                <Button className="w-full" variant="outline">
                  Try This Scenario
                </Button>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Try Live Demo Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Real Results from Real Contractors
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {demoStats.map((stat, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-base text-gray-200">{stat.comparison}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What Contractors Say After the Demo
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-100 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t border-gray-700 pt-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-base text-gray-200">{testimonial.company}</div>
                  <Badge className="mt-2 bg-green-500/20 text-green-300 border-green-500/30">
                    Saves {testimonial.savings}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Quoting Process?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join 2,000+ contractors saving 6+ hours per week
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-base text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>5 free quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}