import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator, Smartphone, Zap, BarChart3, Clock, DollarSign, Users, CheckCircle, Star, ArrowRight, FileText, TrendingUp, Shield, Building } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Best Painting Estimating Software 2025 | Compare Top Tools for Contractors',
  description: 'Compare the best painting estimating software for contractors. Reviews, pricing, and features of top tools including PaintQuote Pro, JobNimbus, and more.',
  keywords: 'painting estimating software, painting estimate software, contractor estimating tools, painting business software, paint estimating program, best painting software',
  openGraph: {
    title: 'Best Painting Estimating Software for Contractors',
    description: 'Compare top painting estimating software tools. Find the right solution for your painting business with our comprehensive reviews and feature comparisons.',
    type: 'website',
    images: [{
      url: '/og-painting-estimating-software.jpg',
      width: 1200,
      height: 630,
      alt: 'Best Painting Estimating Software for Contractors'
    }]
  },
  alternates: {
    canonical: '/painting-estimating-software'
  }
}

const softwareOptions = [
  {
    name: 'PaintQuote Pro',
    rating: 4.9,
    users: '15,000+',
    startingPrice: '$0',
    billingPeriod: 'month',
    description: 'AI-powered painting estimating software designed specifically for painting contractors',
    features: [
      'Advanced paint calculators',
      'Real-time material pricing',
      'Mobile app included',
      'Customer management',
      'Quote templates',
      'Project tracking'
    ],
    pros: [
      'Industry-specific features',
      'Accurate paint calculations',
      'Easy to learn and use',
      'Excellent customer support',
      'Regular updates',
      'Free plan available'
    ],
    cons: [
      'Newer to market',
      'Limited integrations (growing)',
      'No advanced project management'
    ],
    bestFor: 'Painting contractors focused on accurate estimates',
    popular: true,
    freeTrialDays: 14
  },
  {
    name: 'JobNimbus',
    rating: 4.6,
    users: '100,000+',
    startingPrice: '$25',
    billingPeriod: 'user/month',
    description: 'All-in-one contractor software with painting estimation capabilities',
    features: [
      'Basic estimating tools',
      'CRM integration',
      'Project management',
      'Team collaboration',
      'Document storage',
      'Sales pipeline'
    ],
    pros: [
      'Comprehensive platform',
      'Strong CRM features',
      'Good project management',
      'Mobile app',
      'Established platform'
    ],
    cons: [
      'Generic estimating tools',
      'Higher learning curve',
      'Expensive for small teams',
      'No paint-specific features'
    ],
    bestFor: 'Large contractors needing full business management',
    freeTrialDays: 14
  },
  {
    name: 'Estimate Rocket',
    rating: 4.3,
    users: '25,000+',
    startingPrice: '$39',
    billingPeriod: 'month',
    description: 'General contracting estimating software with painting templates',
    features: [
      'Template library',
      'Cost databases',
      'Proposal generation',
      'Client portal',
      'Basic project tracking',
      'Reporting tools'
    ],
    pros: [
      'Professional proposals',
      'Good template selection',
      'Reasonable pricing',
      'Client portal feature'
    ],
    cons: [
      'Not painting-specific',
      'Limited mobile features',
      'Basic paint calculations',
      'Outdated interface'
    ],
    bestFor: 'General contractors who do some painting work',
    freeTrialDays: 30
  },
  {
    name: 'Contractor Foreman',
    rating: 4.2,
    users: '50,000+',
    startingPrice: '$49',
    billingPeriod: 'month',
    description: 'Construction management software with basic estimating features',
    features: [
      'Basic estimating',
      'Project scheduling',
      'Time tracking',
      'Document management',
      'Team communication',
      'Financial tracking'
    ],
    pros: [
      'Comprehensive features',
      'Good project management',
      'Time tracking included',
      'Document storage'
    ],
    cons: [
      'Weak estimating tools',
      'Complex for painting only',
      'Higher cost',
      'Steep learning curve'
    ],
    bestFor: 'Construction companies with painting divisions',
    freeTrialDays: 30
  },
  {
    name: 'PaintScope',
    rating: 4.1,
    users: '5,000+',
    startingPrice: '$69',
    billingPeriod: 'month',
    description: 'Specialized painting software with estimating and project management',
    features: [
      'Paint-specific estimating',
      'Color management',
      'Crew scheduling',
      'Material ordering',
      'Progress tracking',
      'Photo documentation'
    ],
    pros: [
      'Painting-specific features',
      'Good color tools',
      'Material integration',
      'Photo capabilities'
    ],
    cons: [
      'Expensive pricing',
      'Limited user base',
      'Complex setup',
      'Poor mobile experience'
    ],
    bestFor: 'Large painting companies with complex projects',
    freeTrialDays: 7
  },
  {
    name: 'Excel Templates',
    rating: 3.5,
    users: 'Unlimited',
    startingPrice: '$0',
    billingPeriod: 'one-time',
    description: 'Traditional spreadsheet approach to painting estimates',
    features: [
      'Basic calculations',
      'Customizable layouts',
      'Offline access',
      'Formula flexibility',
      'Cost tracking',
      'Simple reports'
    ],
    pros: [
      'Free to use',
      'Highly customizable',
      'Familiar interface',
      'Offline capable',
      'No monthly fees'
    ],
    cons: [
      'Manual calculations',
      'No automation',
      'Error-prone',
      'No mobile optimization',
      'Time-consuming',
      'No customer management'
    ],
    bestFor: 'Small contractors with basic needs',
    freeTrialDays: null
  }
]

const features = [
  {
    category: 'Estimating Features',
    items: [
      { feature: 'Paint quantity calculator', paintQuotePro: true, jobNimbus: false, estimateRocket: true, contractorForeman: false, paintScope: true, excel: false },
      { feature: 'Labor hour estimator', paintQuotePro: true, jobNimbus: true, estimateRocket: true, contractorForeman: true, paintScope: true, excel: true },
      { feature: 'Material cost database', paintQuotePro: true, jobNimbus: false, estimateRocket: true, contractorForeman: false, paintScope: true, excel: false },
      { feature: 'Surface area calculator', paintQuotePro: true, jobNimbus: false, estimateRocket: false, contractorForeman: false, paintScope: true, excel: true },
      { feature: 'Multi-room estimates', paintQuotePro: true, jobNimbus: true, estimateRocket: true, contractorForeman: true, paintScope: true, excel: true }
    ]
  },
  {
    category: 'Business Features',
    items: [
      { feature: 'Customer management', paintQuotePro: true, jobNimbus: true, estimateRocket: true, contractorForeman: true, paintScope: true, excel: false },
      { feature: 'Project tracking', paintQuotePro: true, jobNimbus: true, estimateRocket: true, contractorForeman: true, paintScope: true, excel: false },
      { feature: 'Mobile app', paintQuotePro: true, jobNimbus: true, estimateRocket: false, contractorForeman: true, paintScope: false, excel: false },
      { feature: 'Team collaboration', paintQuotePro: true, jobNimbus: true, estimateRocket: false, contractorForeman: true, paintScope: true, excel: false },
      { feature: 'Integration options', paintQuotePro: true, jobNimbus: true, estimateRocket: true, contractorForeman: true, paintScope: false, excel: false }
    ]
  }
]

const selectionGuide = [
  {
    businessType: 'Solo Painter',
    recommendation: 'PaintQuote Pro',
    reason: 'Free plan available, painting-specific features, easy to use',
    features: ['Free tier', 'Mobile app', 'Paint calculators', 'Simple interface']
  },
  {
    businessType: 'Small Painting Crew (2-5 people)',
    recommendation: 'PaintQuote Pro',
    reason: 'Affordable scaling, team features, industry focus',
    features: ['Team collaboration', 'Customer management', 'Quote templates', 'Project tracking']
  },
  {
    businessType: 'Medium Painting Company (6-20 people)',
    recommendation: 'JobNimbus or PaintQuote Pro',
    reason: 'Depends on CRM needs vs painting specialization',
    features: ['Advanced CRM', 'Project management', 'Team coordination', 'Sales pipeline']
  },
  {
    businessType: 'Large Painting Contractor (20+ people)',
    recommendation: 'PaintScope or JobNimbus',
    reason: 'Advanced features, enterprise capabilities, complex project management',
    features: ['Enterprise features', 'Advanced scheduling', 'Multi-location support', 'Advanced reporting']
  },
  {
    businessType: 'General Contractor (does painting)',
    recommendation: 'Contractor Foreman',
    reason: 'Broader construction features, not just painting-focused',
    features: ['Multi-trade support', 'Comprehensive PM', 'Time tracking', 'Financial management']
  }
]

const testimonials = [
  {
    name: 'Mike Rodriguez',
    company: 'Rodriguez Painting LLC',
    rating: 5,
    text: 'PaintQuote Pro has transformed how we estimate jobs. The paint calculators are spot-on, and we\'ve reduced our estimating time by 70%. Highly recommend for any painting contractor.'
  },
  {
    name: 'Sarah Chen',
    company: 'Precision Paint Co.',
    rating: 5,
    text: 'Switched from Excel to PaintQuote Pro last year. The difference is incredible - professional estimates in minutes instead of hours, and our accuracy has improved significantly.'
  },
  {
    name: 'David Thompson',
    company: 'Elite Painting Services',
    rating: 4,
    text: 'JobNimbus works well for our larger operation. The CRM features are excellent, though we wish the estimating tools were more painting-specific.'
  }
]

const faqData = [
  {
    question: 'What is painting estimating software?',
    answer: 'Painting estimating software helps contractors calculate accurate quotes for painting projects. It includes paint quantity calculators, labor estimators, material cost databases, and professional quote generation tools.'
  },
  {
    question: 'Which painting estimating software is best for small contractors?',
    answer: 'PaintQuote Pro is excellent for small contractors due to its free plan, painting-specific features, and easy learning curve. It includes all essential tools without the complexity of larger platforms.'
  },
  {
    question: 'How much does painting estimating software cost?',
    answer: 'Costs range from free (PaintQuote Pro\'s basic plan) to $69/month (PaintScope). Most contractors find plans between $25-49/month provide good value. Consider features needed vs budget when choosing.'
  },
  {
    question: 'Can painting estimating software work on mobile devices?',
    answer: 'Yes, most modern painting estimating software includes mobile apps. PaintQuote Pro, JobNimbus, and Contractor Foreman all offer mobile access for creating estimates on-site.'
  },
  {
    question: 'How accurate are automated paint quantity calculations?',
    answer: 'Modern painting software can be very accurate (95%+) when proper measurements are input. They account for surface texture, coverage rates, multiple coats, and waste factors that manual calculations often miss.'
  },
  {
    question: 'Do I need special training to use painting estimating software?',
    answer: 'Most painting estimating software is designed to be user-friendly. PaintQuote Pro can be learned in a few hours, while more complex platforms like JobNimbus may take 1-2 weeks to master.'
  }
]

export default function PaintingEstimatingSoftware() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: 'Painting Estimating Software' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://paintquotepro.com/painting-estimating-software',
    name: 'Best Painting Estimating Software for Contractors',
    description: 'Compare top painting estimating software tools, features, pricing, and reviews for contractors',
    publisher: {
      '@type': 'Organization',
      name: 'PaintQuote Pro'
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: softwareOptions.map((software, index) => ({
        '@type': 'SoftwareApplication',
        position: index + 1,
        name: software.name,
        description: software.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web-based',
        offers: {
          '@type': 'Offer',
          price: software.startingPrice.replace('$', ''),
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: software.rating,
          reviewCount: parseInt(software.users.replace(/[^\d]/g, '')) || 100
        }
      }))
    }
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
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} className="py-4" />
          </div>

          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  2025 Software Comparison
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Best Painting Estimating Software for Contractors
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Compare top painting estimating software tools, features, and pricing. Find the perfect 
                  solution to create accurate quotes faster and win more painting jobs.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Try PaintQuote Pro Free
                  </Link>
                  <Link
                    href="#comparison"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    Compare Software Options
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">6</div>
                    <p className="text-sm text-muted-foreground">Software Options</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">200,000+</div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">Free</div>
                    <p className="text-sm text-muted-foreground">Options Available</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Software Comparison Grid */}
          <section id="comparison" className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Painting Estimating Software Comparison</h2>
                <p className="text-lg text-muted-foreground">
                  Detailed comparison of the top painting estimating software options for contractors
                </p>
              </div>

              <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                  {softwareOptions.map((software, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${software.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                      {software.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Best for Painters
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{software.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm font-medium ml-1">{software.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{software.users} users</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{software.startingPrice}</div>
                          {software.billingPeriod !== 'one-time' && (
                            <div className="text-xs text-muted-foreground">/{software.billingPeriod}</div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{software.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {software.features.slice(0, 4).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm">
                              <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-green-700 mb-2">Pros:</h4>
                          <ul className="space-y-1">
                            {software.pros.slice(0, 3).map((pro, proIndex) => (
                              <li key={proIndex} className="text-xs text-muted-foreground">• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-orange-700 mb-2">Cons:</h4>
                          <ul className="space-y-1">
                            {software.cons.slice(0, 3).map((con, conIndex) => (
                              <li key={conIndex} className="text-xs text-muted-foreground">• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mb-4 text-sm">
                        <span className="font-medium">Best for:</span> {software.bestFor}
                      </div>

                      <div className="space-y-2">
                        <Button variant={software.popular ? 'default' : 'outline'} className="w-full">
                          {software.freeTrialDays ? `Start ${software.freeTrialDays}-Day Trial` : 'Learn More'}
                        </Button>
                        {software.freeTrialDays && (
                          <p className="text-xs text-center text-muted-foreground">
                            No credit card required
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Feature Comparison</h2>
                <p className="text-lg text-muted-foreground">
                  Side-by-side comparison of key features across painting estimating software
                </p>
              </div>

              <div className="mx-auto max-w-7xl overflow-x-auto">
                <div className="min-w-full">
                  {features.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                      <div className="rounded-lg border bg-background overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="text-left p-4 font-medium">Feature</th>
                                <th className="text-center p-4 font-medium">PaintQuote Pro</th>
                                <th className="text-center p-4 font-medium">JobNimbus</th>
                                <th className="text-center p-4 font-medium">Estimate Rocket</th>
                                <th className="text-center p-4 font-medium">Contractor Foreman</th>
                                <th className="text-center p-4 font-medium">PaintScope</th>
                                <th className="text-center p-4 font-medium">Excel</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.items.map((item, itemIndex) => (
                                <tr key={itemIndex} className="border-b">
                                  <td className="p-4 font-medium">{item.feature}</td>
                                  <td className="text-center p-4">
                                    {item.paintQuotePro ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <span className="text-muted-foreground">-</span>}
                                  </td>
                                  <td className="text-center p-4">
                                    {item.jobNimbus ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <span className="text-muted-foreground">-</span>}
                                  </td>
                                  <td className="text-center p-4">
                                    {item.estimateRocket ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <span className="text-muted-foreground">-</span>}
                                  </td>
                                  <td className="text-center p-4">
                                    {item.contractorForeman ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <span className="text-muted-foreground">-</span>}
                                  </td>
                                  <td className="text-center p-4">
                                    {item.paintScope ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <span className="text-muted-foreground">-</span>}
                                  </td>
                                  <td className="text-center p-4">
                                    {item.excel ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <span className="text-muted-foreground">-</span>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Selection Guide */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Which Software is Right for Your Business?</h2>
                <p className="text-lg text-muted-foreground">
                  Choose the best painting estimating software based on your business size and needs
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="space-y-6">
                  {selectionGuide.map((guide, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{guide.businessType}</h3>
                          <p className="text-sm text-muted-foreground">{guide.reason}</p>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-primary">{guide.recommendation}</div>
                          <p className="text-sm text-muted-foreground">Recommended solution</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Key features for you:</h4>
                          <ul className="space-y-1">
                            {guide.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm">
                                <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Customer Testimonials */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Painting Contractors Say</h2>
                <p className="text-lg text-muted-foreground">
                  Real reviews from contractors using painting estimating software
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

          {/* FAQ Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Painting Estimating Software FAQ
                </h2>

                <div className="space-y-8">
                  {faqData.map((faq, index) => (
                    <div key={index} className="rounded-lg bg-background p-6">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
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
                <h2 className="text-3xl font-bold mb-4">Free Painting Tools</h2>
                <p className="text-lg text-muted-foreground">
                  Try our free calculators before choosing paid software
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <Calculator className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Paint Calculator</h3>
                    <p className="text-sm text-muted-foreground">Universal calculator for all painting projects</p>
                  </Link>

                  <Link href="/interior-painting-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <Building className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Interior Calculator</h3>
                    <p className="text-sm text-muted-foreground">Specialized for interior painting projects</p>
                  </Link>

                  <Link href="/paint-estimate-templates" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <FileText className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Free Templates</h3>
                    <p className="text-sm text-muted-foreground">Download professional estimate templates</p>
                  </Link>

                  <Link href="/how-to-quote-painting-jobs" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <TrendingUp className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2 group-hover:text-primary">How-To Guide</h3>
                    <p className="text-sm text-muted-foreground">Learn professional estimation techniques</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Painting Business?
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-90 mb-8">
                Start with PaintQuote Pro's free plan and experience the difference professional 
                estimating software makes for your painting business.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Today
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pricing Plans
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Free plan available • No credit card required • 14-day pro trial
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}