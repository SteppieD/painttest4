import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Smartphone,
  Camera,
  MapPin,
  Clock,
  Cloud,
  Shield,
  Zap,
  CheckCircle,
  Download,
  Apple,
  Play,
  QrCode,
  Sparkles,
  Calculator,
  FileText,
  Send,
  Users,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mobile Painting Estimate App | Quote On-Site in 60 Seconds',
  description: 'Create professional painting quotes from your phone. Take photos, measure rooms, and send quotes instantly. Available for iOS and Android.',
  openGraph: {
    title: 'PaintQuote Pro Mobile App - Quote Anywhere, Anytime',
    description: 'Professional painting estimates from your phone in 60 seconds',
    images: ['/og-mobile-app.png'],
  },
}

export default function MobilePage() {
  const mobileFeatures = [
    {
      icon: Camera,
      title: 'Photo Measurements',
      description: 'Take photos to automatically calculate square footage'
    },
    {
      icon: MapPin,
      title: 'GPS Job Tracking',
      description: 'Track job locations and optimize your route'
    },
    {
      icon: Calculator,
      title: 'Instant Calculations',
      description: 'AI-powered pricing right on your device'
    },
    {
      icon: FileText,
      title: 'Professional PDFs',
      description: 'Generate branded quotes on-site'
    },
    {
      icon: Send,
      title: 'One-Tap Send',
      description: 'Email or text quotes immediately'
    },
    {
      icon: Cloud,
      title: 'Cloud Sync',
      description: 'Access quotes from any device'
    }
  ]

  const useCases = [
    {
      title: 'On-Site Estimates',
      description: 'Walk through homes and create quotes in real-time',
      icon: Smartphone,
      benefits: ['Close deals on the spot', 'No follow-up needed', 'Impress homeowners']
    },
    {
      title: 'Quick Measurements',
      description: 'Use your camera to measure rooms instantly',
      icon: Camera,
      benefits: ['AR measurement tools', 'Auto-calculate sqft', 'Photo documentation']
    },
    {
      title: 'Field Updates',
      description: 'Adjust quotes based on new discoveries',
      icon: Zap,
      benefits: ['Change orders', 'Add-on services', 'Real-time pricing']
    }
  ]

  const appStats = [
    { value: '50K+', label: 'Downloads' },
    { value: '4.8', label: 'App Store Rating' },
    { value: '60 sec', label: 'Average Quote Time' },
    { value: '98%', label: 'Accuracy Rate' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Smartphone className="h-3 w-3 mr-1" />
                iOS & Android App
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Quote Paint Jobs
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  From Your Phone
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Professional estimates in 60 seconds. Take photos, calculate costs, 
                and send quotes on-site. No laptop needed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Apple className="h-5 w-5 mr-2" />
                  Download for iOS
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  <Play className="h-5 w-5 mr-2" />
                  Get for Android
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Free to download</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Works offline</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 text-center">
                <Smartphone className="h-64 w-32 mx-auto text-gray-600" />
                <p className="text-gray-400 mt-4">App screenshot placeholder</p>
              </div>
              {/* Floating feature badges */}
              <Badge className="absolute -top-4 -right-4 bg-green-500/20 text-green-300 border-green-500/30">
                <Star className="h-3 w-3 mr-1" />
                4.8 Rating
              </Badge>
              <Badge className="absolute -bottom-4 -left-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Clock className="h-3 w-3 mr-1" />
                60 sec quotes
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything You Need On-Site
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Professional quoting tools designed for painting contractors on the go
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mobileFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6">
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built for How You Work
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="glass-card p-8">
                <useCase.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">{useCase.title}</h3>
                <p className="text-gray-400 mb-6">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Stats */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {appStats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Download */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Download Now with QR Code
              </h2>
              <p className="text-gray-300 mb-8">
                Scan with your phone camera to download instantly
              </p>
              
              <div className="bg-white p-8 rounded-lg inline-block mb-8">
                <QrCode className="h-48 w-48 text-gray-900" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#">
                  <Badge className="px-6 py-3 bg-black text-white hover:bg-gray-900 cursor-pointer">
                    <Apple className="h-5 w-5 mr-2" />
                    App Store
                  </Badge>
                </Link>
                <Link href="#">
                  <Badge className="px-6 py-3 bg-black text-white hover:bg-gray-900 cursor-pointer">
                    <Play className="h-5 w-5 mr-2" />
                    Google Play
                  </Badge>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Quote Faster?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of contractors creating quotes in 60 seconds
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trial-signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Watch Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}