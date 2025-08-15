import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Home,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  MessageSquare,
  FileText,
  Calculator,
  Star,
  Sparkles,
  ArrowRight,
  Paintbrush,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Software for Residential Contractors | House Painters',
  description: 'Specialized quoting software for residential painting contractors. Create professional estimates for homes in 60 seconds. Trusted by 1,000+ house painters.',
  openGraph: {
    title: 'PaintQuote Pro for Residential Painters',
    description: 'Quote homes 20x faster with AI-powered residential painting software',
    images: ['/og-residential.png'],
  },
}

export default function ResidentialPage() {
  const residentialFeatures = [
    {
      icon: Home,
      title: 'Room-by-Room Quotes',
      description: 'Pre-built templates for every room type with accurate measurements'
    },
    {
      icon: Calculator,
      title: 'Homeowner-Friendly Pricing',
      description: 'Clear breakdowns that build trust and close more deals'
    },
    {
      icon: MessageSquare,
      title: 'Natural Language Input',
      description: 'Describe the job in plain English - AI handles the calculations'
    },
    {
      icon: FileText,
      title: 'Professional Proposals',
      description: 'Beautiful PDFs with your branding that impress homeowners'
    },
    {
      icon: Clock,
      title: '60-Second Quotes',
      description: 'Create detailed estimates while still at the house'
    },
    {
      icon: Shield,
      title: 'Insurance & Warranties',
      description: 'Include your certifications to stand out from competitors'
    }
  ]

  const commonJobs = [
    {
      type: 'Full Interior',
      rooms: '3BR/2BA home',
      sqft: '1,800 sq ft',
      time: '45 seconds',
      price: '$3,200-4,500'
    },
    {
      type: 'Exterior Siding',
      rooms: 'Two-story colonial',
      sqft: '2,400 sq ft',
      time: '50 seconds',
      price: '$4,800-6,200'
    },
    {
      type: 'Kitchen & Bath',
      rooms: 'Cabinet refinishing',
      sqft: '35 cabinets',
      time: '30 seconds',
      price: '$2,100-3,500'
    },
    {
      type: 'Single Room',
      rooms: 'Master bedroom',
      sqft: '400 sq ft',
      time: '20 seconds',
      price: '$450-650'
    }
  ]

  const successMetrics = [
    { metric: '40%', description: 'Higher close rate', detail: 'Professional quotes win more jobs' },
    { metric: '3x', description: 'Faster responses', detail: 'Quote while touring the home' },
    { metric: '$12K', description: 'More revenue/month', detail: 'Average contractor increase' },
    { metric: '20hrs', description: 'Saved weekly', detail: 'On quoting and follow-ups' }
  ]

  const testimonials = [
    {
      quote: "Game changer for residential work. I quote entire homes in the time it used to take for one room.",
      author: "Mike Rodriguez",
      company: "Premier Home Painting",
      rating: 5,
      results: "Doubled my close rate"
    },
    {
      quote: "Homeowners love getting professional quotes on the spot. It sets us apart from everyone else.",
      author: "Sarah Johnson",
      company: "Colorful Homes LLC",
      rating: 5,
      results: "30% more jobs booked"
    },
    {
      quote: "The room templates are perfect. Just walk through, tap rooms, and send. So simple.",
      author: "David Chen",
      company: "Chen's Quality Painting",
      rating: 5,
      results: "Cut quote time by 95%"
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
                <Home className="h-3 w-3 mr-1" />
                For House Painters
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Quote Homes
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  20x Faster
                </span>
              </h1>
              
              <p className="text-xl text-gray-100 mb-8">
                Professional painting estimates for residential contractors. 
                Walk through homes, tap rooms, and send quotes in 60 seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Watch 2-Min Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>1,000+ house painters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>5 free quotes</span>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
                <div className="text-center mb-6">
                  <Paintbrush className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Try It Now</h3>
                  <p className="text-gray-200">Describe a room to see instant pricing</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4 cursor-pointer hover:border-blue-500 transition-colors">
                    <p className="text-white font-medium">Master bedroom, 12x14, walls only</p>
                    <p className="text-base text-gray-200">Click to generate quote →</p>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4 cursor-pointer hover:border-blue-500 transition-colors">
                    <p className="text-white font-medium">Full house exterior, vinyl siding</p>
                    <p className="text-base text-gray-200">Click to generate quote →</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built for Residential Painting Contractors
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Every feature designed to help you quote homes faster and win more jobs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {residentialFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6">
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Jobs Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Quote Any Residential Job in Seconds
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Pre-configured templates for the most common house painting projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {commonJobs.map((job, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{job.type}</h3>
                    <p className="text-gray-200">{job.rooms} • {job.sqft}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <Clock className="h-3 w-3 mr-1" />
                    {job.time}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-400">{job.price}</span>
                  <Button size="default" variant="outline">
                    Try This Quote
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Real Results for House Painters
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {successMetrics.map((item, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">{item.metric}</div>
                <div className="text-white font-semibold mb-1">{item.description}</div>
                <div className="text-base text-gray-200">{item.detail}</div>
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
              Trusted by 1,000+ Residential Painters
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-100 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t border-gray-700 pt-4">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-base text-gray-200">{testimonial.company}</div>
                  <Badge className="mt-2 bg-green-500/20 text-green-300 border-green-500/30">
                    {testimonial.results}
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
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Residential Painting Business?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join 1,000+ house painters creating professional quotes in 60 seconds
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/roi-calculator">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Calculate Your ROI
                  <ArrowRight className="h-5 w-5 ml-2" />
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
                <span>60-day guarantee</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}