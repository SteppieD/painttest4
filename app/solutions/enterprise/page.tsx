import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Building2,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  FileText,
  Shield,
  Sparkles,
  ArrowRight,
  Zap,
  BarChart3,
  Globe,
  Settings,
  Lock,
  Database,
  Cloud,
  Layers,
  HeadphonesIcon,
  Award,
  LineChart,
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Enterprise Painting Software | Large Contractor Solutions',
  description: 'Enterprise-grade quoting platform for large painting contractors. Custom workflows, API access, dedicated support, and unlimited scalability.',
  openGraph: {
    title: 'PaintQuote Pro Enterprise - Built for Scale',
    description: 'Enterprise painting estimating software with custom integrations',
    images: ['/og-enterprise.png'],
  },
}

export default function EnterprisePage() {
  const enterpriseFeatures = [
    {
      icon: Globe,
      title: 'Multi-Region Support',
      description: 'Manage teams across multiple states with localized pricing'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with SSO, audit logs, and data encryption'
    },
    {
      icon: Layers,
      title: 'Custom Workflows',
      description: 'Tailor approval chains and processes to your operations'
    },
    {
      icon: Database,
      title: 'API & Integrations',
      description: 'Connect with your ERP, CRM, and accounting systems'
    },
    {
      icon: HeadphonesIcon,
      title: 'Dedicated Support',
      description: '24/7 priority support with dedicated success manager'
    },
    {
      icon: LineChart,
      title: 'Advanced Analytics',
      description: 'Custom dashboards and predictive insights'
    }
  ]

  const enterpriseBenefits = [
    {
      category: 'Scale & Performance',
      benefits: [
        'Handle 10,000+ quotes per month',
        'Sub-second response times',
        '99.9% uptime SLA',
        'Unlimited users and data'
      ]
    },
    {
      category: 'Customization',
      benefits: [
        'White-label options',
        'Custom pricing models',
        'Branded client portals',
        'Tailored workflows'
      ]
    },
    {
      category: 'Control & Compliance',
      benefits: [
        'Role-based permissions',
        'Audit trail tracking',
        'Data residency options',
        'Compliance certifications'
      ]
    },
    {
      category: 'Support & Success',
      benefits: [
        'Dedicated account team',
        'Quarterly business reviews',
        'Custom training programs',
        'Priority feature requests'
      ]
    }
  ]

  const enterpriseClients = [
    {
      company: 'National Painting Corp',
      size: '500+ painters',
      challenge: 'Standardize quoting across 15 states',
      solution: 'Custom regional pricing with centralized control',
      result: '35% increase in profit margins',
      quote: 'PaintQuote Pro transformed how we operate at scale.'
    },
    {
      company: 'Premier Commercial Group',
      size: '300+ employees',
      challenge: 'Integration with existing Salesforce CRM',
      solution: 'Full API integration with bi-directional sync',
      result: '$5M more in won contracts',
      quote: 'The seamless integration saved us 20 hours per week.'
    },
    {
      company: 'Elite Coating Systems',
      size: '200+ crew members',
      challenge: 'Complex approval workflows for large projects',
      solution: 'Custom multi-tier approval system',
      result: '60% faster bid turnaround',
      quote: 'Finally, software that adapts to how we work.'
    }
  ]

  const comparisonTable = [
    { feature: 'Users', standard: 'Up to 50', enterprise: 'Unlimited' },
    { feature: 'Monthly Quotes', standard: '1,000', enterprise: 'Unlimited' },
    { feature: 'API Access', standard: 'Basic', enterprise: 'Full Access' },
    { feature: 'Support', standard: 'Email', enterprise: '24/7 Priority' },
    { feature: 'Training', standard: 'Self-serve', enterprise: 'Custom Program' },
    { feature: 'Integrations', standard: 'Standard', enterprise: 'Custom Development' },
    { feature: 'SLA', standard: 'Best effort', enterprise: '99.9% Uptime' },
    { feature: 'Account Team', standard: 'Shared', enterprise: 'Dedicated' }
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
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Building2 className="h-3 w-3 mr-1" />
                Enterprise Solution
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Built for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Enterprise Scale
                </span>
              </h1>
              
              <p className="text-xl text-gray-100 mb-8">
                The most powerful quoting platform for large painting contractors. 
                Custom workflows, unlimited scale, and white-glove support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Schedule Enterprise Demo
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Download Enterprise Guide
                </Button>
              </div>

              <div className="flex items-center gap-6 text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>99.9% SLA</span>
                </div>
              </div>
            </div>

            <div>
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
                <div className="mb-6">
                  <Award className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Enterprise Readiness</h3>
                  <p className="text-gray-200">Everything large contractors need</p>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Security</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      SOC 2 Type II
                    </Badge>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Uptime</span>
                    <span className="text-green-400 font-semibold">99.95%</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Response Time</span>
                    <span className="text-green-400 font-semibold">&lt;200ms</span>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-3">
                    <span className="text-gray-100">Data Centers</span>
                    <span className="text-green-400 font-semibold">Global</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500">
                  Request Custom Demo
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Built from the ground up for large painting contractors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((feature, index) => (
              <Card key={index} className="glass-card p-6">
                <feature.icon className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Enterprises Choose PaintQuote Pro
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseBenefits.map((category, index) => (
              <Card key={index} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-base text-gray-100">
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Enterprise Success Stories
            </h2>
          </div>

          <div className="space-y-6">
            {enterpriseClients.map((client, index) => (
              <Card key={index} className="glass-card p-8">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{client.company}</h3>
                    <p className="text-gray-200 mb-3">{client.size}</p>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {client.result}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <h4 className="text-base font-semibold text-gray-200 mb-1">CHALLENGE</h4>
                      <p className="text-gray-100">{client.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-200 mb-1">SOLUTION</h4>
                      <p className="text-gray-100">{client.solution}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div>
                      <p className="text-gray-100 italic mb-2">"{client.quote}"</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Enterprise vs Standard
            </h2>
          </div>

          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-gray-200">Feature</th>
                  <th className="text-center p-4 text-gray-200">Standard</th>
                  <th className="text-center p-4 text-white bg-purple-500/10">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-4 text-gray-100">{row.feature}</td>
                    <td className="p-4 text-center text-gray-200">{row.standard}</td>
                    <td className="p-4 text-center text-white bg-purple-500/5">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-purple-500/10 to-blue-500/10 p-12">
            <div className="text-center mb-8">
              <Shield className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Enterprise Security & Compliance
              </h2>
              <p className="text-gray-100 max-w-2xl mx-auto">
                Your data is protected by industry-leading security measures
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Lock className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Data Encryption</h3>
                <p className="text-base text-gray-200">256-bit AES encryption at rest and in transit</p>
              </div>
              <div>
                <Database className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Data Residency</h3>
                <p className="text-base text-gray-200">Choose where your data is stored globally</p>
              </div>
              <div>
                <Shield className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Compliance</h3>
                <p className="text-base text-gray-200">SOC 2, GDPR, CCPA compliant</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-purple-500/10 to-blue-500/10 p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for Enterprise-Scale Quoting?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Let's discuss how PaintQuote Pro can transform your operations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Schedule Enterprise Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Download ROI Calculator
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-base text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Custom pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Dedicated team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>SLA guarantee</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}