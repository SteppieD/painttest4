import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Zap,
  ArrowLeftRight,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
  FileText,
  Calculator,
  DollarSign,
  Users,
  Mail,
  MessageSquare,
  Calendar,
  BarChart3,
  Database,
  Cloud,
  Smartphone,
  CreditCard,
  Package,
  Palette,
  Settings,
  Globe,
  Lock
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrations - Connect Your Favorite Tools | PaintQuote Pro',
  description: 'Seamlessly integrate PaintQuote Pro with QuickBooks, Stripe, Google Calendar, and 20+ tools. Automate your painting business workflow.',
  openGraph: {
    title: 'PaintQuote Pro Integrations - Connect Your Business Tools',
    description: 'Integrate with QuickBooks, Stripe, Square, and more. Automate your workflow.',
    images: ['/og-integrations.png'],
  },
}

export default function IntegrationsPage() {
  const featuredIntegrations = [
    {
      name: 'QuickBooks',
      category: 'Accounting',
      icon: DollarSign,
      description: 'Sync quotes, invoices, and payments automatically',
      features: ['Auto-sync invoices', 'Payment tracking', 'Tax calculations', 'Customer sync'],
      status: 'Available'
    },
    {
      name: 'Stripe',
      category: 'Payments',
      icon: CreditCard,
      description: 'Accept payments and deposits directly from quotes',
      features: ['Online payments', 'Deposit collection', 'Payment plans', 'Auto receipts'],
      status: 'Available'
    },
    {
      name: 'Square',
      category: 'Payments',
      icon: Package,
      description: 'Process payments on-site with Square readers',
      features: ['Mobile payments', 'Card readers', 'Digital invoices', 'Instant deposits'],
      status: 'Available'
    },
    {
      name: 'Google Calendar',
      category: 'Scheduling',
      icon: Calendar,
      description: 'Sync job schedules and appointments automatically',
      features: ['Auto-scheduling', 'Team calendars', 'Job reminders', 'Route planning'],
      status: 'Available'
    }
  ]

  const integrationCategories = [
    {
      title: 'Accounting & Finance',
      icon: DollarSign,
      integrations: [
        { name: 'QuickBooks', status: 'Planned' },
        { name: 'Xero', status: 'Planned' },
        { name: 'FreshBooks', status: 'Planned' }
      ]
    },
    {
      title: 'Payment Processing',
      icon: CreditCard,
      integrations: [
        { name: 'Stripe', status: 'Available' }
      ]
    },
    {
      title: 'Communication',
      icon: MessageSquare,
      integrations: [
        { name: 'Email (Resend)', status: 'Available' },
        { name: 'Slack', status: 'Coming Soon' },
        { name: 'WhatsApp Business', status: 'Planned' }
      ]
    },
    {
      title: 'Scheduling & CRM',
      icon: Calendar,
      integrations: [
        { name: 'Calendar Integration', status: 'Planned' },
        { name: 'CRM Integration', status: 'Planned' }
      ]
    },
    {
      title: 'Project Management',
      icon: BarChart3,
      integrations: [
        { name: 'Project Management', status: 'Planned' }
      ]
    },
    {
      title: 'Storage & Files',
      icon: Cloud,
      integrations: [
        { name: 'Cloud Storage', status: 'Planned' }
      ]
    }
  ]

  const integrationBenefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Streamlined workflows when integrations are available'
    },
    {
      icon: Shield,
      title: 'Reduce Errors',
      description: 'Automatic syncing prevents costly mistakes'
    },
    {
      icon: ArrowLeftRight,
      title: 'Real-Time Sync',
      description: 'Changes update instantly across all platforms'
    },
    {
      icon: Lock,
      title: 'Bank-Level Security',
      description: 'OAuth 2.0 and encrypted connections'
    }
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
              <Zap className="h-3 w-3 mr-1" />
              20+ Integrations
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Connect Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Entire Business Stack
              </span>
            </h1>
            
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Seamlessly integrate PaintQuote Pro with your favorite tools. 
              Automate workflows, sync data, and run your painting business from one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  View API Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Most Popular Integrations
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Connect with the tools painting contractors use every day
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredIntegrations.map((integration, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <integration.icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{integration.name}</h3>
                      <p className="text-base text-gray-200">{integration.category}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {integration.status}
                  </Badge>
                </div>
                
                <p className="text-gray-100 mb-4">{integration.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {integration.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-base text-gray-200">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full" variant="outline">
                  Connect {integration.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Integrations by Category */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              All Integrations by Category
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationCategories.map((category, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.integrations.map((integration, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                      <span className="text-gray-100">{integration.name}</span>
                      <Badge 
                        variant="outline" 
                        className={
                          integration.status === 'Available' 
                            ? 'text-green-400 border-green-400' 
                            : integration.status === 'Coming Soon'
                            ? 'text-yellow-400 border-yellow-400'
                            : 'text-gray-200 border-gray-400'
                        }
                      >
                        {integration.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Integrate Your Tools?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrationBenefits.map((benefit, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <benefit.icon className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-200 text-base">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex p-3 bg-gray-800 rounded-lg mb-6">
                <Globe className="h-12 w-12 text-blue-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Build Custom Integrations
              </h2>
              
              <p className="text-xl text-gray-100 mb-6">
                Use our REST API to create custom integrations with any platform. 
                Full documentation and SDKs available.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/api-docs">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    View API Documentation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Contact Support
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>RESTful API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Webhooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>OAuth 2.0</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Connect Your Tools?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Start automating your workflow today with 20+ integrations
          </p>
          
          <Link href="/trial-signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Sparkles className="h-5 w-5 mr-2" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}