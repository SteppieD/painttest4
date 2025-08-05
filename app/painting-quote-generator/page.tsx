import Link from 'next/link'
import { Metadata } from 'next'
import { Zap, Bot, FileText, Clock, CheckCircle, Star, Download, Send, MessageSquare } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'AI Painting Quote Generator | Free Professional Quote Generator',
  description: 'Generate professional painting quotes instantly with AI. Free painting quote generator creates detailed estimates for interior, exterior, and commercial projects in seconds.',
  keywords: 'painting quote generator, paint quote generator, free painting quote generator, AI quote generator, painting estimate generator, automatic quote generator, paint quote app',
  openGraph: {
    title: 'AI Painting Quote Generator - Create Professional Quotes in Seconds',
    description: 'Generate professional painting quotes instantly with our AI-powered quote generator. Free to use for contractors and homeowners.',
    type: 'website',
    images: [{
      url: '/og-painting-quote-generator.jpg',
      width: 1200,
      height: 630,
      alt: 'AI Painting Quote Generator'
    }]
  },
  alternates: {
    canonical: '/painting-quote-generator'
  }
}

const generatorFeatures = [
  {
    title: 'AI-Powered Generation',
    description: 'Advanced AI analyzes your project details and generates accurate quotes instantly',
    icon: Bot
  },
  {
    title: 'Professional Templates',
    description: 'Choose from industry-standard templates that impress clients',
    icon: FileText
  },
  {
    title: 'Instant Results',
    description: 'Generate complete quotes in under 30 seconds instead of hours',
    icon: Zap
  },
  {
    title: 'Smart Calculations',
    description: 'Automatically calculates materials, labor, and markup for accurate pricing',
    icon: CheckCircle
  }
]

const quoteExamples = [
  {
    projectType: 'Interior Living Room',
    details: '12x14 room, 9ft ceilings, premium paint',
    generatedQuote: '$1,285',
    timeToGenerate: '15 seconds',
    features: ['Material calculation', 'Labor estimation', 'Prep work included', 'Professional formatting']
  },
  {
    projectType: 'Exterior House',
    details: '2,400 sq ft home, 2 coats, trim included',
    generatedQuote: '$8,750',
    timeToGenerate: '25 seconds',
    features: ['Weather considerations', 'Multiple surfaces', 'Equipment rental', 'Timeline planning']
  },
  {
    projectType: 'Commercial Office',
    details: '5,000 sq ft office space, low-VOC paint',
    generatedQuote: '$12,500',
    timeToGenerate: '30 seconds',
    features: ['Volume pricing', 'Specialty coatings', 'After-hours work', 'Compliance requirements']
  }
]

const testimonials = [
  {
    name: 'Mike Chen',
    company: 'Chen Professional Painting',
    rating: 5,
    text: 'This quote generator is incredible. I went from spending 3 hours per quote to 30 seconds. My response time is now faster than any competitor.'
  },
  {
    name: 'Sarah Rodriguez',
    company: 'Rodriguez Coatings',
    rating: 5,
    text: 'The AI understands painting better than most contractors. It catches details I sometimes forget and the quotes are always professional.'
  },
  {
    name: 'David Thompson',
    company: 'Elite Painting Services',
    rating: 5,
    text: 'Generated over 200 quotes this month. My win rate increased 40% because I can respond to leads within minutes instead of days.'
  }
]

const faqData = [
  {
    question: 'How does the AI painting quote generator work?',
    answer: 'Our AI analyzes your project description using natural language processing and machine learning trained on thousands of painting projects. It considers factors like square footage, paint type, surface preparation, and local market rates to generate accurate quotes.'
  },
  {
    question: 'Is the painting quote generator really free?',
    answer: 'Yes! You can generate up to 5 quotes per month completely free. Professional contractors can upgrade for unlimited quotes and advanced features like custom branding and client management.'
  },
  {
    question: 'How accurate are the generated quotes?',
    answer: 'Our AI generates quotes within 10-15% accuracy for standard projects. The system learns from real contractor data and market pricing to provide reliable estimates that you can confidently present to clients.'
  },
  {
    question: 'Can I customize the generated quotes?',
    answer: 'Absolutely! You can edit any part of the generated quote, adjust pricing, add or remove line items, and customize the formatting to match your brand before sending to clients.'
  }
]

export default function PaintingQuoteGenerator() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://paintquotepro.com/painting-quote-generator',
    name: 'AI Painting Quote Generator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    description: 'AI-powered painting quote generator for professional contractors',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1247',
      bestRating: '5'
    },
    featureList: [
      'AI-powered quote generation',
      'Professional templates',
      'Instant calculations',
      'Custom branding',
      'Client management'
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">
        <SharedNavigation />

        <main className="pt-14">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-base font-medium text-primary">
                  <Bot className="mr-2 h-4 w-4" />
                  AI-Powered Quote Generation
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Painting Quote Generator
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  Generate professional painting quotes in seconds with AI. Simply describe your project 
                  and get detailed, accurate estimates instantly. Free for contractors and homeowners.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Quotes Now
                  </Link>
                  <Link
                    href="#demo"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    See Demo
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">30 sec</div>
                    <p className="text-base text-gray-200">Average Generation</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">97%</div>
                    <p className="text-base text-gray-200">Accuracy Rate</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">125K+</div>
                    <p className="text-base text-gray-200">Quotes Generated</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Demo Section */}
          <section id="demo" className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Watch the AI Generate Your Quote
                </h2>
                
                <div className="rounded-lg border bg-background p-8 shadow-lg">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-6 flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                        Describe Your Project
                      </h3>
                      
                      <div className="rounded-lg bg-muted/50 p-6">
                        <div className="space-y-4">
                          <div className="text-base font-medium text-gray-200">Project Description:</div>
                          <div className="rounded-lg bg-background p-4 border text-base">
                            &quot;I need to paint the interior of a 12x14 living room with 9-foot ceilings. 
                            There are 2 windows and 1 door. The walls are currently white and in good 
                            condition. I want to use premium paint in a light gray color. Include primer 
                            and all prep work."
                          </div>
                          
                          <div className="flex items-center gap-2 text-base text-gray-200">
                            <Clock className="h-4 w-4" />
                            <span>AI processing...</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-base">Project details analyzed</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Square footage calculated</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-base">Materials estimated</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-base">Labor costs calculated</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-6 flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        Generated Professional Quote
                      </h3>
                      
                      <div className="rounded-lg bg-primary/5 p-6">
                        <div className="text-lg font-bold mb-4">Painting Quote #PQ-2024-001</div>
                        
                        <div className="space-y-3 text-base">
                          <div className="flex justify-between">
                            <span>Project: Interior Living Room</span>
                            <span>324 sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Premium Paint (2 coats):</span>
                            <span>$185</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Primer & Supplies:</span>
                            <span>$95</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Surface Preparation:</span>
                            <span>$150</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor (8 hours):</span>
                            <span>$640</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Equipment & Tools:</span>
                            <span>$75</span>
                          </div>
                          <hr className="border-muted" />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-primary">$1,145</span>
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <Button size="default" className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button size="default" variant="outline" className="flex-1">
                            <Send className="mr-2 h-4 w-4" />
                            Send to Client
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <div className="text-base text-gray-200">
                          Generated in <span className="font-medium text-primary">18 seconds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Use Our AI Quote Generator?</h2>
                <p className="text-lg text-gray-200">
                  Advanced AI technology meets professional painting expertise
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {generatorFeatures.map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-base text-gray-200">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Quote Examples Section */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Real Quote Examples</h2>
                <p className="text-lg text-gray-200">
                  See how our AI generates quotes for different project types
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {quoteExamples.map((example, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <h3 className="text-lg font-semibold mb-2">{example.projectType}</h3>
                      <p className="text-base text-gray-200 mb-4">{example.details}</p>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary">{example.generatedQuote}</div>
                        <div className="text-base text-gray-200">Generated in {example.timeToGenerate}</div>
                      </div>

                      <ul className="space-y-1">
                        {example.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-base">
                            <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Contractors Say</h2>
                <p className="text-lg text-gray-200">
                  Join thousands of painters using our quote generator
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <blockquote className="mb-4">{['"']}{testimonial.text}{['"']}</blockquote>
                      <footer>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-base text-gray-200">{testimonial.company}</div>
                      </footer>
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
                  Quote Generator FAQ
                </h2>
                
                <div className="space-y-8">
                  {faqData.map((faq, index) => (
                    <div key={index} className="rounded-lg bg-background p-6">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-gray-200">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">More Quoting Tools</h2>
                <p className="text-lg text-gray-200">
                  Complete suite of tools for painting professionals
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Paint Quote Calculator</h3>
                    <p className="text-base text-gray-200">Manual calculations with detailed breakdowns</p>
                  </Link>

                  <Link href="/painting-quote-templates" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Quote Templates</h3>
                    <p className="text-base text-gray-200">Professional templates for all project types</p>
                  </Link>

                  <Link href="/painting-estimating-software" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Estimating Software</h3>
                    <p className="text-base text-gray-200">Complete business management platform</p>
                  </Link>

                  <Link href="/roi-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">ROI Calculator</h3>
                    <p className="text-base text-gray-200">Calculate your business growth potential</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Start Generating AI-Powered Quotes Today
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-100 mb-8">
                Join the AI revolution in painting. Generate professional quotes in seconds, 
                impress clients, and win more jobs than ever before.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Generate Your First Quote
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pricing Plans
                </Link>
              </div>
              <p className="mt-4 text-base opacity-100">
                Free forever plan • 5 quotes per month • No credit card required
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}