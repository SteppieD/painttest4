import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Code,
  FileText,
  Zap,
  Lock,
  Globe,
  Terminal,
  Book,
  ChevronRight,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Database,
  Shield,
  Clock,
  GitBranch
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'API Documentation | PaintQuote Pro Developer Resources',
  description: 'Complete API documentation for PaintQuote Pro. RESTful endpoints, authentication, code examples, and SDKs for integrating painting quotes into your application.',
  openGraph: {
    title: 'PaintQuote Pro API Documentation',
    description: 'Build custom integrations with our RESTful API',
    images: ['/og-api-docs.png'],
  },
}

export default function ApiDocsPage() {
  const apiFeatures = [
    {
      icon: Zap,
      title: 'RESTful API',
      description: 'Simple, predictable REST endpoints'
    },
    {
      icon: Lock,
      title: 'OAuth 2.0',
      description: 'Secure authentication flow'
    },
    {
      icon: Globe,
      title: 'Webhooks',
      description: 'Real-time event notifications'
    },
    {
      icon: Clock,
      title: 'Rate Limiting',
      description: '1000 requests/hour per API key'
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'TLS 1.3 encryption for all requests'
    },
    {
      icon: Database,
      title: 'Batch Operations',
      description: 'Process multiple quotes efficiently'
    }
  ]

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/quotes',
      description: 'List all quotes',
      auth: true
    },
    {
      method: 'POST',
      path: '/api/v1/quotes',
      description: 'Create a new quote',
      auth: true
    },
    {
      method: 'GET',
      path: '/api/v1/quotes/{id}',
      description: 'Get quote details',
      auth: true
    },
    {
      method: 'PUT',
      path: '/api/v1/quotes/{id}',
      description: 'Update a quote',
      auth: true
    },
    {
      method: 'POST',
      path: '/api/v1/quotes/{id}/send',
      description: 'Send quote to customer',
      auth: true
    },
    {
      method: 'GET',
      path: '/api/v1/customers',
      description: 'List customers',
      auth: true
    }
  ]

  const codeExamples = [
    {
      language: 'JavaScript',
      sdk: 'npm install @paintquotepro/sdk'
    },
    {
      language: 'Python',
      sdk: 'pip install paintquotepro'
    },
    {
      language: 'PHP',
      sdk: 'composer require paintquotepro/sdk'
    },
    {
      language: 'Ruby',
      sdk: 'gem install paintquotepro'
    }
  ]

  const useCases = [
    {
      title: 'CRM Integration',
      description: 'Sync quotes with your customer management system',
      example: 'Automatically create quotes when new leads arrive'
    },
    {
      title: 'Accounting Sync',
      description: 'Push approved quotes to your accounting software',
      example: 'Create invoices in QuickBooks when quotes are accepted'
    },
    {
      title: 'Custom Workflows',
      description: 'Build approval chains and automation',
      example: 'Route high-value quotes for manager approval'
    },
    {
      title: 'Mobile Apps',
      description: 'Create custom mobile experiences',
      example: 'Build a branded app for your painting crews'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Code className="h-3 w-3 mr-1" />
              API v1.0
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              API Documentation
            </h1>
            
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Build powerful integrations with PaintQuote Pro&apos;s RESTful API. 
              Create quotes, manage customers, and automate your workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Sparkles className="h-5 w-5 mr-2" />
                Get API Key
              </Button>
              <Link href="#quick-start">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Quick Start Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Developer-Friendly API
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6">
                <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Quick Start
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Get up and running with the PaintQuote Pro API in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Step 1 */}
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
                  1
                </Badge>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Get Your API Key</h3>
                  <p className="text-gray-200 mb-4">
                    Sign in to your dashboard and navigate to Settings → API Keys
                  </p>
                  <div className="bg-gray-800 rounded-lg p-4 font-mono text-base">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-100">pk_live_Jk3n2KJHasdf8923hjkKJH32</span>
                      <Button size="default" variant="ghost" className="text-gray-200 hover:text-white">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
                  2
                </Badge>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Install SDK (Optional)</h3>
                  <p className="text-gray-200 mb-4">
                    Use our official SDKs for faster integration
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {codeExamples.map((example, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4">
                        <div className="text-base text-gray-200 mb-2">{example.language}</div>
                        <code className="text-base text-gray-100 font-mono">{example.sdk}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
              <div className="flex items-start gap-4">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1">
                  3
                </Badge>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Make Your First Request</h3>
                  <p className="text-gray-200 mb-4">
                    Create a quote using our REST API
                  </p>
                  <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-base text-gray-100 font-mono">
{`curl -X POST https://api.paintquotepro.com/v1/quotes \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_name": "John Smith",
    "address": "123 Main St",
    "rooms": ["living_room", "bedroom"],
    "sqft": 1200
  }'`}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              API Endpoints
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Core Endpoints</h3>
              </div>
              
              <div className="divide-y divide-gray-700">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="p-6 hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge 
                          className={`font-mono ${
                            endpoint.method === 'GET' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                            endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                            'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-gray-100 font-mono">{endpoint.path}</code>
                      </div>
                      {endpoint.auth && (
                        <Lock className="h-4 w-4 text-gray-200" />
                      )}
                    </div>
                    <p className="text-gray-200 mt-2 ml-20">{endpoint.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-800/50">
                <Link href="#full-reference">
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                    View Full API Reference
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Common Use Cases
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-200 mb-4">{useCase.description}</p>
                <div className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-base text-gray-100">{useCase.example}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Authentication
              </h2>
            </div>

            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
              <div className="flex items-start gap-4 mb-6">
                <Lock className="h-8 w-8 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Bearer Token Authentication</h3>
                  <p className="text-gray-100">
                    All API requests must include your API key in the Authorization header:
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <code className="text-base text-gray-100 font-mono">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-100">
                      <span className="font-semibold text-white">Keep your API key secure.</span> Never expose it in client-side code or public repositories.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-100">
                      <span className="font-semibold text-white">Use environment variables</span> to store your API key in production applications.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-100">
                      <span className="font-semibold text-white">Rotate keys regularly</span> and revoke unused keys from your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Developer Resources
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 text-center">
              <Book className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Full Reference</h3>
              <p className="text-gray-200 mb-4">Complete API documentation with examples</p>
              <Button variant="outline" className="w-full">
                View Reference
              </Button>
            </Card>

            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 text-center">
              <GitBranch className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SDKs & Libraries</h3>
              <p className="text-gray-200 mb-4">Official client libraries for all platforms</p>
              <Button variant="outline" className="w-full">
                Browse SDKs
              </Button>
            </Card>

            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 text-center">
              <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Postman Collection</h3>
              <p className="text-gray-200 mb-4">Import our API collection for testing</p>
              <Button variant="outline" className="w-full">
                Download Collection
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Start integrating PaintQuote Pro into your application today
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Get API Key
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Contact Support
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-base text-gray-200">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>1000 requests/hour</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>99.9% uptime</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}