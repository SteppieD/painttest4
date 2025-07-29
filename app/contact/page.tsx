import Link from 'next/link'
import { Metadata } from 'next'
import { CheckCircle, Zap, Clock, Calculator, Users, Shield, ArrowRight, Mail, MessageSquare, Phone } from 'lucide-react'
import ModernNavigation from '@/components/modern-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Start Your Free Trial | PaintQuote Pro - Professional Painting Estimating Software',
  description: 'Get started with PaintQuote Pro today! Start your free 14-day trial of professional painting estimating software. No credit card required.',
  keywords: 'free trial, painting estimating software, painting contractor software, paint quote calculator, free painting software trial',
  openGraph: {
    title: 'Start Your Free Trial - PaintQuote Pro',
    description: 'Try PaintQuote Pro free for 14 days. Professional painting estimating software with no credit card required.',
    type: 'website',
    images: [{
      url: '/og-free-trial.jpg',
      width: 1200,
      height: 630,
      alt: 'Start Your Free Trial - PaintQuote Pro'
    }]
  },
  alternates: {
    canonical: '/contact'
  }
}

const trialBenefits = [
  {
    icon: Calculator,
    title: 'Create Professional Quotes',
    description: 'Generate accurate, detailed painting quotes in minutes instead of hours'
  },
  {
    icon: Clock,
    title: 'Save 10+ Hours Weekly',
    description: 'Automated calculations and templates eliminate manual work'
  },
  {
    icon: Users,
    title: 'Win More Jobs',
    description: 'Professional presentation helps you close 30% more quotes'
  },
  {
    icon: Shield,
    title: 'Risk-Free Trial',
    description: 'Full access for 14 days with no credit card required'
  }
]

const trialFeatures = [
  'Unlimited paint quantity calculations',
  'Professional quote templates',
  'Customer database management',
  'Mobile app access',
  'Real-time material pricing',
  'Project tracking dashboard',
  'Email quote delivery',
  'Basic reporting tools'
]

const testimonials = [
  {
    name: 'Mike Rodriguez',
    company: 'Rodriguez Painting LLC',
    text: 'PaintQuote Pro has been a game-changer for our business. We\'ve increased our quote accuracy by 40% and reduced estimating time by 75%.',
    savings: 'Saves 12 hours/week'
  },
  {
    name: 'Sarah Johnson',
    company: 'Professional Paint Co.',
    text: 'The trial convinced me immediately. Within the first week, I had already created 8 professional quotes that would have taken me days before.',
    savings: 'Won 3 new jobs'
  },
  {
    name: 'David Chen',
    company: 'Elite Painting Services',
    text: 'Best investment we\'ve made for our painting business. The paint calculators are incredibly accurate and the customer management features are excellent.',
    savings: 'Increased profits 25%'
  }
]

const supportOptions = [
  {
    icon: MessageSquare,
    title: 'Live Chat Support',
    description: 'Get instant help during your trial',
    availability: 'Mon-Fri 9AM-6PM EST'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Detailed help and guidance',
    availability: 'support@paintquotepro.com'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak with our team directly',
    availability: '1-800-PAINT-PRO'
  }
]

export default function ContactFreeTrial() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Start Free Trial' }
  ]

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <main className="relative z-10">
          {/* Breadcrumbs */}
          <div className="pt-24 pb-8">
            <div className="container mx-auto px-4">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          </div>

          {/* Hero Section */}
          <section className="pb-20">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Start Your <span className="text-gradient-modern">14-Day Free Trial</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join 15,000+ painting contractors who create professional quotes 10x faster. 
                  No credit card required. Cancel anytime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Link
                    href="/trial-signup"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Start Free Trial Now
                  </Link>
                  <Link
                    href="/painting-contractor-software"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/20 hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <p className="text-sm text-gray-400">
                  ✓ No credit card required &nbsp;&nbsp; ✓ Full feature access &nbsp;&nbsp; ✓ Cancel anytime
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                What You Get With Your Free Trial
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {trialBenefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="glass-card p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm">{benefit.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="glass-card p-12 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-8">
                  Full Access to All Features During Your Trial
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {trialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                What Contractors Say About Their Trial Experience
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="glass-card p-6">
                    <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.company}</p>
                      </div>
                      <span className="text-sm font-medium text-emerald-400">{testimonial.savings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                How Your Free Trial Works
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Sign Up in 30 Seconds</h3>
                      <p className="text-gray-300">
                        Enter your company name and email. No credit card or lengthy forms required.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Get Full Access Immediately</h3>
                      <p className="text-gray-300">
                        Access all features instantly. Create quotes, manage customers, and explore the platform.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Decide After 14 Days</h3>
                      <p className="text-gray-300">
                        If you love it, choose a plan. If not, no worries - no charges, no hassle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section className="py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                We&apos;re Here to Help During Your Trial
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon
                  return (
                    <div key={index} className="glass-card p-6 text-center">
                      <Icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{option.description}</p>
                      <p className="text-blue-400 text-sm font-medium">{option.availability}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                Trial Questions? We Have Answers
              </h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Do I need to enter credit card details?
                  </h3>
                  <p className="text-gray-300">
                    No! Your trial is completely free with no credit card required. We only ask for payment if you decide to continue after 14 days.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    What happens after my trial ends?
                  </h3>
                  <p className="text-gray-300">
                    You&apos;ll receive a reminder email before your trial expires. If you don&apos;t choose a plan, your account will be paused but your data will be saved for 30 days.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Can I cancel during the trial?
                  </h3>
                  <p className="text-gray-300">
                    Absolutely! You can cancel anytime during your trial with no charges or penalties. Simply let your trial expire or contact support.
                  </p>
                </div>
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Is support included in the trial?
                  </h3>
                  <p className="text-gray-300">
                    Yes! You get full access to our support team via live chat, email, and phone during your trial period.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 border-t border-white/10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Painting Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join 15,000+ painting contractors who trust PaintQuote Pro to grow their business. 
                Start your free trial today - no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trial-signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/20 hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  View Pricing Plans
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-400">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}