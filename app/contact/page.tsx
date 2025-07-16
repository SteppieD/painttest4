import Link from 'next/link'
import { Metadata } from 'next'
import { CheckCircle, Zap, Clock, Calculator, Users, Shield, ArrowRight, Mail, MessageSquare, Phone } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

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
    title: 'Advanced Paint Calculators',
    description: 'Get exact paint quantities and material costs for any project size'
  },
  {
    icon: Clock,
    title: 'Save 10+ Hours Per Week',
    description: 'Create professional estimates in minutes instead of hours'
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Track leads, quotes, and customer communications in one place'
  },
  {
    icon: Shield,
    title: 'Proven by 15,000+ Contractors',
    description: 'Join thousands of successful painting contractors using PaintQuote Pro'
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
    <div className="min-h-screen bg-background">
      <SharedNavigation />

      <main className="pt-14">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} className="py-4" />
        </div>

        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Zap className="mr-2 h-4 w-4" />
                  No Credit Card Required
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Start Your Free 14-Day Trial
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Transform your painting business with professional estimating software. 
                  Try PaintQuote Pro completely free for 14 days - no credit card required.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Start Free Trial Now
                  </Link>
                  <Link
                    href="/paint-quote-calculator"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Try Free Calculator
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">14 Days</div>
                    <p className="text-sm text-muted-foreground">Free Trial</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">No CC</div>
                    <p className="text-sm text-muted-foreground">Required</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">15,000+</div>
                    <p className="text-sm text-muted-foreground">Happy Users</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trial Benefits */}
          <section className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Everything You Need to Grow Your Business</h2>
                <p className="text-lg text-muted-foreground">
                  Get full access to all professional features during your trial
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {trialBenefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <benefit.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Trial Features List */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">
                      Full Access to All Features
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      Your 14-day trial includes every premium feature. No limitations, 
                      no hidden restrictions - just the complete PaintQuote Pro experience.
                    </p>
                    
                    <div className="grid gap-3 sm:grid-cols-2">
                      {trialFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Link
                        href="/auth/signup"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                      >
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="rounded-lg bg-muted p-8">
                      <h3 className="text-xl font-semibold mb-6">Trial Statistics</h3>
                      <div className="space-y-6">
                        <div className="rounded-md bg-background p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Trial Conversion Rate</span>
                            <span className="text-2xl font-bold text-primary">89%</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Most contractors continue after their trial
                          </div>
                        </div>
                        <div className="rounded-md bg-background p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Average Time to First Quote</span>
                            <span className="text-2xl font-bold text-primary">18 min</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            From signup to professional estimate
                          </div>
                        </div>
                        <div className="rounded-md bg-background p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Support Response Time</span>
                            <span className="text-2xl font-bold text-primary">&lt; 2 hrs</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Fast help when you need it
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Success Stories */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Success Stories from Your Trial</h2>
                <p className="text-lg text-muted-foreground">
                  Real results from painting contractors who started with our free trial
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="mb-4">
                        <div className="text-lg font-bold text-primary">{testimonial.savings}</div>
                        <p className="text-sm text-muted-foreground">In first 30 days</p>
                      </div>
                      <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Support Options */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Get Help During Your Trial</h2>
                <p className="text-lg text-muted-foreground">
                  Our support team is here to help you succeed from day one
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {supportOptions.map((option, index) => (
                    <div key={index} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <option.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                      <p className="text-sm font-medium text-primary">{option.availability}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Free Trial Questions
                </h2>

                <div className="space-y-8">
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-lg font-semibold mb-3">What happens after my 14-day trial?</h3>
                    <p className="text-muted-foreground">
                      You can continue with a paid plan or your account will be paused. All your data stays safe and you can reactivate anytime.
                    </p>
                  </div>
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-lg font-semibold mb-3">Do I need a credit card to start?</h3>
                    <p className="text-muted-foreground">
                      No! Start your trial immediately with just your email address. No credit card required.
                    </p>
                  </div>
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-lg font-semibold mb-3">Can I create unlimited quotes during the trial?</h3>
                    <p className="text-muted-foreground">
                      Yes! There are no limits on quotes, customers, or projects during your trial period.
                    </p>
                  </div>
                  <div className="rounded-lg bg-background p-6">
                    <h3 className="text-lg font-semibold mb-3">Is support included in the trial?</h3>
                    <p className="text-muted-foreground">
                      Absolutely! You get full access to our support team via live chat, email, and phone during your trial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Painting Business?
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-90 mb-8">
                Join 15,000+ painting contractors who trust PaintQuote Pro to grow their business. 
                Start your free trial today - no credit card required.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pricing Plans
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
        </section>
      </main>
    </div>
  )
}