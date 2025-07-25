import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  HelpCircle,
  Search,
  MessageSquare,
  FileText,
  Video,
  Users,
  Settings,
  CreditCard,
  Calculator,
  Zap,
  BookOpen,
  Mail,
  Clock,
  ChevronRight,
  Sparkles,
  HeadphonesIcon,
  LifeBuoy,
  GraduationCap
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center | Support Documentation & Resources',
  description: 'Get help with PaintQuote Pro. Browse our knowledge base, watch video tutorials, and contact support. Find answers to common questions.',
  openGraph: {
    title: 'PaintQuote Pro Help Center',
    description: 'Support documentation, tutorials, and resources',
    images: ['/og-help.png'],
  },
}

export default function HelpPage() {
  const helpCategories = [
    {
      icon: Zap,
      title: 'Getting Started',
      description: 'Set up your account and create your first quote',
      articles: 12,
      popular: [
        'Quick start guide',
        'Setting up your company profile',
        'Creating your first quote',
        'Understanding the AI assistant'
      ]
    },
    {
      icon: Calculator,
      title: 'Quoting & Estimating',
      description: 'Master the quoting process and pricing strategies',
      articles: 24,
      popular: [
        'Using AI conversation mode',
        'Customizing pricing rates',
        'Adding materials and labor',
        'Quote templates'
      ]
    },
    {
      icon: CreditCard,
      title: 'Billing & Payments',
      description: 'Manage subscriptions and payment methods',
      articles: 8,
      popular: [
        'Subscription plans explained',
        'Updating payment methods',
        'Understanding invoices',
        'Cancellation policy'
      ]
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Customize your account and preferences',
      articles: 15,
      popular: [
        'Company branding setup',
        'User permissions',
        'Email notifications',
        'Data export options'
      ]
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Add team members and manage permissions',
      articles: 10,
      popular: [
        'Adding team members',
        'Setting user roles',
        'Team performance tracking',
        'Access controls'
      ]
    },
    {
      icon: Zap,
      title: 'Integrations',
      description: 'Connect with other tools and services',
      articles: 18,
      popular: [
        'QuickBooks integration',
        'Stripe setup guide',
        'API documentation',
        'Webhook configuration'
      ]
    }
  ]

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Start Chat'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      availability: '24-48 hour response',
      action: 'Send Email'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn with video guides',
      availability: '50+ videos available',
      action: 'Watch Videos'
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Detailed guides and articles',
      availability: 'Always available',
      action: 'Browse Docs'
    }
  ]

  const popularArticles = [
    {
      title: 'How to create your first quote with AI',
      category: 'Getting Started',
      readTime: '3 min',
      helpful: 2847
    },
    {
      title: 'Setting up QuickBooks integration',
      category: 'Integrations',
      readTime: '5 min',
      helpful: 1923
    },
    {
      title: 'Understanding pricing calculations',
      category: 'Quoting',
      readTime: '4 min',
      helpful: 1654
    },
    {
      title: 'Managing team permissions',
      category: 'Team',
      readTime: '3 min',
      helpful: 1432
    },
    {
      title: 'Customizing quote templates',
      category: 'Quoting',
      readTime: '6 min',
      helpful: 1298
    }
  ]

  const faqs = [
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel anytime from Account Settings > Subscription. Your access continues until the end of your billing period.'
    },
    {
      question: 'Can I import data from other software?',
      answer: 'Yes! We support CSV imports and have direct integrations with QuickBooks, Square, and other popular tools.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, PaintQuote Pro is available for iOS and Android. Download from the App Store or Google Play.'
    },
    {
      question: 'How accurate is the AI quoting?',
      answer: 'Our AI achieves 98.5% accuracy based on millions of quotes. You can always adjust the suggestions.'
    },
    {
      question: 'Do you offer training for my team?',
      answer: 'Yes! We offer free onboarding sessions and ongoing training webinars for all plans.'
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
              <LifeBuoy className="h-3 w-3 mr-1" />
              Help Center
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How Can We Help?
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers, watch tutorials, and get support for PaintQuote Pro
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#getting-started">
                <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-gray-800">
                  <Zap className="h-3 w-3 mr-1" />
                  Quick Start Guide
                </Badge>
              </Link>
              <Link href="#video-tutorials">
                <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-gray-800">
                  <Video className="h-3 w-3 mr-1" />
                  Video Tutorials
                </Badge>
              </Link>
              <Link href="/api-docs">
                <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-gray-800">
                  <FileText className="h-3 w-3 mr-1" />
                  API Docs
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Browse by Category
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="glass-card p-6 cursor-pointer hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <category.icon className="h-10 w-10 text-blue-400" />
                  <Badge variant="outline">{category.articles} articles</Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-gray-400 mb-4">{category.description}</p>
                
                <div className="space-y-2">
                  {category.popular.slice(0, 3).map((article, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <ChevronRight className="h-3 w-3 text-gray-500" />
                      {article}
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-4 text-blue-400 hover:text-blue-300">
                  View All Articles
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Most Popular Articles
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="glass-card p-6 cursor-pointer hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime} read</span>
                      <span>•</span>
                      <span className="text-green-400">{article.helpful.toLocaleString()} found helpful</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Support
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <option.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-2">{option.description}</p>
                <p className="text-sm text-gray-500 mb-4">{option.availability}</p>
                <Button variant="outline" className="w-full">
                  {option.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-300 ml-7">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <Card className="glass-card bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-12 text-center">
            <GraduationCap className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Free Training Sessions
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our weekly training webinars to master PaintQuote Pro
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Sparkles className="h-5 w-5 mr-2" />
                Register for Training
              </Button>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Watch Demo Videos
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Every Tuesday 2PM EST</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Live Q&A included</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <HeadphonesIcon className="h-16 w-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our support team is standing by to assist you
          </p>
          
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}