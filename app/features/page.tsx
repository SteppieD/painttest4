import { Metadata } from 'next'
import Link from 'next/link'
import ModernNavigation from '@/components/modern-navigation'
import { 
  Calculator, 
  Palette, 
  Clock, 
  Users, 
  FileText, 
  BarChart3, 
  Shield, 
  Smartphone,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Layers,
  PaintBucket,
  Image,
  DollarSign,
  TrendingUp,
  Mail,
  Globe,
  Lock,
  Cpu,
  Cloud,
  Download,
  Eye,
  Wand2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Features - Professional Painting Estimating Software | PaintQuote Pro',
  description: 'Explore all features of PaintQuote Pro: AI-powered quotes, smart color matching from logos, advanced calculations, customer management, analytics, and more.',
  keywords: 'painting software features, painting estimator, quote calculator, paint color matching, logo color extraction, contractor tools',
}

const mainFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Quote Generation',
    description: 'Generate accurate, professional quotes in seconds using advanced AI that understands painting requirements.',
    benefits: [
      'Save 10+ hours per week',
      'Reduce errors by 95%',
      'Quote complex projects instantly'
    ]
  },
  {
    icon: Eye,
    title: 'Smart Logo Color Extraction',
    description: 'Automatically extract brand colors from customer logos to create perfectly branded, personalized quotes that match their visual identity.',
    benefits: [
      'Extract colors from any logo image',
      'Create on-brand proposals instantly',
      'Impress clients with customization'
    ],
    premium: true,
    highlight: true
  },
  {
    icon: Calculator,
    title: 'Advanced Calculations',
    description: 'Precise paint quantity calculations based on surface area, coverage rates, and number of coats.',
    benefits: [
      'Accurate material estimates',
      'Reduce waste and overages',
      'Include all surfaces automatically'
    ]
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Complete CRM system to track leads, customers, and job history in one place.',
    benefits: [
      'Never lose a lead',
      'Track customer preferences',
      'Build lasting relationships'
    ]
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights into your business performance, conversion rates, and profitability.',
    benefits: [
      'Track win/loss rates',
      'Identify profitable services',
      'Make data-driven decisions'
    ],
    premium: true
  },
  {
    icon: Wand2,
    title: 'Dynamic Theme Matching',
    description: 'Quotes automatically adapt their visual style to match customer branding for a cohesive, professional look.',
    benefits: [
      'Automatic color scheme adaptation',
      'Professional branded layouts',
      'Stand out from competitors'
    ],
    premium: true
  }
]

const additionalFeatures = [
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Create and send quotes from anywhere, on any device.',
  },
  {
    icon: Zap,
    title: 'Instant Quote Delivery',
    description: 'Send quotes via email or text message instantly.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Bank-level encryption and 99.9% uptime guarantee.',
  },
  {
    icon: Globe,
    title: 'Multi-Location Support',
    description: 'Manage multiple locations and territories from one account.',
    premium: true
  },
  {
    icon: Layers,
    title: 'Surface Detection',
    description: 'Automatically identify and calculate different surface types.',
  },
  {
    icon: PaintBucket,
    title: 'Paint Database',
    description: 'Access pricing for major paint brands and products.',
  },
  {
    icon: Image,
    title: 'Photo Attachments',
    description: 'Add project photos directly to quotes.',
  },
  {
    icon: DollarSign,
    title: 'Dynamic Pricing',
    description: 'Adjust margins and markups based on project type.',
    premium: true
  },
  {
    icon: TrendingUp,
    title: 'Growth Tracking',
    description: 'Monitor business growth and set targets.',
    premium: true
  },
  {
    icon: Mail,
    title: 'Email Automation',
    description: 'Automated follow-ups and reminders.',
    premium: true
  },
  {
    icon: Lock,
    title: 'Role-Based Access',
    description: 'Control team member permissions and access.',
    premium: true
  },
  {
    icon: Cpu,
    title: 'API Access',
    description: 'Integrate with your existing tools and workflows.',
    premium: true
  },
  {
    icon: Cloud,
    title: 'Cloud Backup',
    description: 'Never lose your data with automatic cloud backups.',
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Export quotes to PDF, Excel, or other formats.',
  }
]

const comparisonTable = [
  { feature: 'Quote Generation', free: '5/month', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'AI Assistant', free: '✓', pro: '✓', business: '✓ Advanced' },
  { feature: 'Customer Management', free: '10 customers', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'Logo Color Extraction', free: '✗', pro: '✓', business: '✓' },
  { feature: 'Dynamic Theme Matching', free: '✗', pro: '✓', business: '✓' },
  { feature: 'Analytics Dashboard', free: 'Basic', pro: 'Advanced', business: 'Advanced + Custom' },
  { feature: 'Team Members', free: '1', pro: '5', business: 'Unlimited' },
  { feature: 'API Access', free: '✗', pro: '✗', business: '✓' },
  { feature: 'White Label', free: '✗', pro: '✗', business: '✓' },
  { feature: 'Priority Support', free: '✗', pro: '✓', business: '✓ 24/7' },
  { feature: 'Custom Training', free: '✗', pro: '✗', business: '✓' },
]

export default function FeaturesPage() {
  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Everything You Need to Grow Your Painting Business
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Powerful Features for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> Modern Contractors</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                From AI-powered quote generation to smart color matching from customer logos, 
                PaintQuote Pro gives you the tools to work smarter, not harder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trial-signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 border-2 border-gray-300 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Core Features
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to streamline your quoting process
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`relative p-8 bg-white rounded-2xl border ${
                    feature.highlight 
                      ? 'border-purple-300 shadow-xl bg-gradient-to-br from-purple-50 to-white' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                  } transition-all duration-300`}
                >
                  {feature.premium && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                        PREMIUM
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-14 h-14 ${
                    feature.highlight 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-500'
                  } rounded-xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Plus Everything Else You Need
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive tools to run your entire painting business
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <feature.icon className="w-8 h-8 text-blue-500" />
                    {feature.premium && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded">
                        PRO
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Compare Plans
              </h2>
              <p className="text-xl text-gray-600">
                Choose the perfect plan for your business
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">
                      <span className="text-blue-600">Professional</span>
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-900">
                      <span className="text-purple-600">Business</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="text-center py-4 px-4 text-gray-600">{row.free}</td>
                      <td className="text-center py-4 px-4 text-gray-900 font-medium">{row.pro}</td>
                      <td className="text-center py-4 px-4 text-gray-900 font-medium">{row.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View Pricing Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Join thousands of painting contractors who are winning more jobs and saving time with PaintQuote Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trial-signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white hover:bg-white hover:text-blue-600 rounded-lg transition-all duration-200"
              >
                Contact Sales
              </Link>
            </div>
            <p className="mt-6 text-blue-100">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </div>
    </>
  )
}