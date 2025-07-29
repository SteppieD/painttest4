import Link from 'next/link'
import { Metadata } from 'next'
import { Building, Calculator, Clock, CheckCircle, Home, Users, Zap, FileText, TrendingUp } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Apartment Painting Quote Calculator | Rental Property Paint Estimates',
  description: 'Get accurate apartment painting quotes and cost estimates. Specialized calculator for studio, 1BR, 2BR, and 3BR apartments. Perfect for landlords and tenants.',
  keywords: 'apartment painting quote, paint apartment cost, apartment interior painting, rental property painting, apartment paint estimate calculator',
  openGraph: {
    title: 'Apartment Painting Quote Calculator - Fast & Accurate Estimates',
    description: 'Calculate apartment painting costs instantly. Specialized for rental properties with quick turnaround and budget-friendly options.',
    type: 'website',
    images: [{
      url: '/og-apartment-painting.jpg',
      width: 1200,
      height: 630,
      alt: 'Apartment Painting Quote Calculator'
    }]
  },
  alternates: {
    canonical: '/apartment-painting-quote'
  }
}

const apartmentTypes = [
  {
    type: 'Studio Apartment',
    sqft: '300-500 sq ft',
    rooms: '1 main room + bathroom',
    avgCost: '$400-800',
    timeframe: '1-2 days',
    features: ['Compact space efficiency', 'Minimal prep work', 'Quick turnaround', 'Budget-friendly options'],
    paintNeeded: '1-2 gallons'
  },
  {
    type: '1 Bedroom',
    sqft: '500-800 sq ft', 
    rooms: 'Bedroom, living room, kitchen, bathroom',
    avgCost: '$800-1,400',
    timeframe: '2-3 days',
    features: ['Standard apartment size', 'Room-by-room pricing', 'Flexible scheduling', 'Tenant-friendly colors'],
    paintNeeded: '2-3 gallons',
    popular: true
  },
  {
    type: '2 Bedroom',
    sqft: '800-1,200 sq ft',
    rooms: '2 bedrooms, living room, kitchen, bathroom(s)',
    avgCost: '$1,200-2,200',
    timeframe: '3-4 days',
    features: ['Multiple room coordination', 'Color scheme planning', 'Furniture protection', 'Move-in ready finish'],
    paintNeeded: '3-4 gallons'
  },
  {
    type: '3+ Bedroom',
    sqft: '1,200+ sq ft',
    rooms: '3+ bedrooms, multiple common areas',
    avgCost: '$2,000-3,500',
    timeframe: '4-6 days',
    features: ['Large space management', 'Extended timeline', 'Premium finishes available', 'Full-service options'],
    paintNeeded: '4-6 gallons'
  }
]

const apartmentSpecialConsiderations = [
  {
    consideration: 'Lease Requirements',
    description: 'Check lease agreement for approved colors and painting restrictions',
    tips: ['Neutral colors typically approved', 'May need landlord permission', 'Some properties require professional painters'],
    icon: FileText
  },
  {
    consideration: 'Quick Turnaround',
    description: 'Apartments often need faster completion for move-in/move-out',
    tips: ['2-3 day typical timeline', 'Weekend and evening availability', 'Fast-drying paint options'],
    icon: Clock
  },
  {
    consideration: 'Space Limitations',
    description: 'Tight spaces require specialized techniques and equipment',
    tips: ['Compact furniture moving', 'Vertical painting efficiency', 'Minimal material storage'],
    icon: Building
  },
  {
    consideration: 'Neighbor Considerations',
    description: 'Apartment living requires noise and odor management',
    tips: ['Low-VOC paint options', 'Quiet work hours', 'Proper ventilation planning'],
    icon: Users
  }
]

const apartmentPricingFactors = [
  {
    factor: 'Apartment Size',
    impact: 'Studio: $400-800 | 1BR: $800-1,400 | 2BR: $1,200-2,200 | 3BR: $2,000+',
    description: 'Square footage is the primary cost driver'
  },
  {
    factor: 'Wall Condition',
    impact: 'Good: +$0 | Fair: +15% | Poor: +30%',
    description: 'Existing paint condition affects prep time'
  },
  {
    factor: 'Color Changes',
    impact: 'Same color: +$0 | Light change: +10% | Dark change: +25%',
    description: 'Dramatic color changes require additional coats'
  },
  {
    factor: 'Timeline Requirements',
    impact: 'Standard: +$0 | Rush (1-2 days): +20% | Emergency: +40%',
    description: 'Faster completion requires premium pricing'
  },
  {
    factor: 'Building Access',
    impact: 'Easy access: +$0 | Limited access: +10% | Difficult: +20%',
    description: 'Elevator availability and parking affect logistics'
  }
]

const apartmentPackages = [
  {
    package: 'Basic Refresh',
    description: 'Essential painting for move-in ready condition',
    included: ['1 coat premium paint', 'Basic surface prep', 'Standard colors only', 'Equipment included'],
    price: 'From $1.50/sq ft',
    bestFor: 'Rental turnovers, budget-conscious landlords',
    timeframe: '1-2 days'
  },
  {
    package: 'Standard Apartment',
    description: 'Complete professional paint job with quality finish',
    included: ['2 coats premium paint', 'Full surface preparation', 'Color consultation', 'Furniture protection', 'Touch-up service'],
    price: 'From $2.25/sq ft',
    bestFor: 'Tenant improvements, quality rentals',
    timeframe: '2-3 days',
    popular: true
  },
  {
    package: 'Premium Upgrade',
    description: 'High-end finish with designer colors and special features',
    included: ['2 coats luxury paint', 'Extensive prep work', 'Custom color matching', 'Accent walls available', 'Trim and door painting', '1-year warranty'],
    price: 'From $3.50/sq ft',
    bestFor: 'Luxury apartments, high-end rentals',
    timeframe: '3-4 days'
  }
]

const landlordBenefits = [
  {
    benefit: 'Faster Tenant Placement',
    value: 'Save 2-3 weeks',
    description: 'Freshly painted apartments rent 40% faster than dated units'
  },
  {
    benefit: 'Higher Rental Rates',
    value: '+$50-150/month',
    description: 'Updated paint can justify 5-15% higher monthly rent'
  },
  {
    benefit: 'Longer Tenant Retention',
    value: '+6-12 months',
    description: 'Tenants in well-maintained units stay longer'
  },
  {
    benefit: 'Reduced Vacancy Costs',
    value: 'Save $500-2000',
    description: 'Avoid extended vacancy periods between tenants'
  }
]

const faqData = [
  {
    question: 'How much does it cost to paint a 1-bedroom apartment?',
    answer: 'A 1-bedroom apartment typically costs $800-1,400 to paint professionally, depending on location, paint quality, and wall condition. This includes 2 coats of paint in standard colors.'
  },
  {
    question: 'How long does it take to paint an apartment?',
    answer: 'Most apartments can be painted in 2-4 days. Studios take 1-2 days, 1-bedrooms take 2-3 days, and larger apartments may take 3-4 days depending on size and condition.'
  },
  {
    question: 'Do I need my landlord\'s permission to paint my apartment?',
    answer: 'Most lease agreements require landlord approval for painting. Check your lease terms and get written permission. Many landlords approve neutral colors but may restrict bold or dark colors.'
  },
  {
    question: 'What colors are typically approved for rental apartments?',
    answer: 'Neutral colors like white, off-white, beige, light gray, and cream are almost always approved. These colors appeal to future tenants and don\'t limit rental potential.'
  },
  {
    question: 'Is it worth it for landlords to paint between tenants?',
    answer: 'Yes! Fresh paint helps apartments rent faster, command higher rent, and attract quality tenants. The investment typically pays for itself within 2-3 months of increased rent.'
  },
  {
    question: 'Can apartments be painted while occupied?',
    answer: 'Yes, with proper planning. Use low-VOC paints, work room by room, ensure proper ventilation, and coordinate with tenants for minimal disruption.'
  }
]

export default function ApartmentPaintingQuote() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Apartment Painting Quote' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://paintquotepro.com/apartment-painting-quote',
    name: 'Apartment Painting Quote Calculator',
    description: 'Professional apartment painting cost calculator for rental properties and apartment residents',
    provider: {
      '@type': 'Organization',
      name: 'PaintQuote Pro'
    },
    serviceType: 'Apartment Painting Estimation',
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    offers: {
      '@type': 'Offer',
      price: '1.50',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1.50',
        priceCurrency: 'USD',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitCode: 'FTK'
        }
      }
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
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-base font-medium text-primary">
                  <Building className="mr-2 h-4 w-4" />
                  Apartment Specialists
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Apartment Painting Quote Calculator
                </h1>
                <p className="mt-6 text-xl text-gray-200">
                  Get instant, accurate painting quotes for apartments, condos, and rental properties. 
                  Specialized pricing for studio, 1BR, 2BR, and 3BR units with fast turnaround options.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Get Apartment Quote
                  </Link>
                  <Link
                    href="#apartment-types"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    View Pricing
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">24-48hr</div>
                    <p className="text-base text-gray-200">Quick Turnaround</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">$1.50+</div>
                    <p className="text-base text-gray-200">Per Square Foot</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <p className="text-base text-gray-200">Apartments Painted</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Apartment Types */}
          <section id="apartment-types" className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Apartment Painting Costs by Size</h2>
                <p className="text-lg text-gray-200">
                  Professional quotes tailored to your specific apartment type
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {apartmentTypes.map((apt, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${apt.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                      {apt.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-base font-medium text-primary-foreground">
                            Most Common
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{apt.type}</h3>
                      <div className="text-base text-gray-200 mb-4">
                        <div>{apt.sqft}</div>
                        <div>{apt.rooms}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary">{apt.avgCost}</div>
                        <div className="text-base text-gray-200">Complete project</div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-base">
                          <span>Timeline:</span>
                          <span className="font-medium">{apt.timeframe}</span>
                        </div>
                        <div className="flex justify-between text-base">
                          <span>Paint needed:</span>
                          <span className="font-medium">{apt.paintNeeded}</span>
                        </div>
                      </div>

                      <ul className="space-y-1 mb-6">
                        {apt.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-base">
                            <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button variant={apt.popular ? 'default' : 'outline'} className="w-full">
                        Get Quote
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Calculator */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Apartment Paint Quote Calculator
                </h2>
                
                <div className="rounded-lg border bg-background p-8 shadow-lg">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-6">Apartment Details</h3>
                      
                      <div className="space-y-6">
                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Building className="h-5 w-5 mr-2 text-primary" />
                            Property Information
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-base font-medium">Apartment Type</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">1 Bedroom</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Square Footage</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">650 sq ft</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Current Condition</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Good</div>
                            </div>
                            <div>
                              <label className="text-base font-medium">Timeline Needed</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Standard</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Home className="h-5 w-5 mr-2 text-primary" />
                            Paint Preferences
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-base">Paint Quality:</span>
                              <span className="text-base font-medium">Standard Premium</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base">Color Changes:</span>
                              <span className="text-base font-medium">Light/Neutral</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base">Special Features:</span>
                              <span className="text-base font-medium">None</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-6">Quote Breakdown</h3>
                      
                      <div className="rounded-lg bg-primary/5 p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Paintable area:</span>
                            <span className="font-medium">520 sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Paint & materials:</span>
                            <span className="font-medium">$180</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor (16 hours):</span>
                            <span className="font-medium">$800</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Surface preparation:</span>
                            <span className="font-medium">$120</span>
                          </div>
                          <hr className="border-muted" />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Quote:</span>
                            <span className="text-primary">$1,100</span>
                          </div>
                          <div className="text-base text-gray-200">
                            Price per sq ft: $2.12 | Timeline: 2-3 days
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <Button className="w-full">
                            Get Professional Quote
                          </Button>
                          <div className="text-center">
                            <Link href="/auth/signup" className="text-base text-primary hover:underline">
                              Save quote and customize options
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Special Considerations */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Apartment Painting Considerations</h2>
                <p className="text-lg text-gray-200">
                  Unique factors that affect apartment painting projects
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {apartmentSpecialConsiderations.map((item, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <item.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{item.consideration}</h3>
                          <p className="text-base text-gray-200 mb-4">{item.description}</p>
                          <ul className="space-y-1">
                            {item.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-center text-base">
                                <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                                {tip}
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

          {/* Service Packages */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Apartment Painting Packages</h2>
                <p className="text-lg text-gray-200">
                  Choose the right service level for your needs and budget
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-3">
                  {apartmentPackages.map((pkg, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${pkg.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                      {pkg.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-base font-medium text-primary-foreground">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{pkg.package}</h3>
                      <p className="text-base text-gray-200 mb-4">{pkg.description}</p>
                      
                      <div className="mb-6">
                        <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                        <div className="text-base text-gray-200">Timeline: {pkg.timeframe}</div>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {pkg.included.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-base">
                            <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mb-4 text-base">
                        <span className="font-medium">Best for:</span> {pkg.bestFor}
                      </div>

                      <Button variant={pkg.popular ? 'default' : 'outline'} className="w-full">
                        Select Package
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Factors */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Affects Apartment Painting Costs?</h2>
                <p className="text-lg text-gray-200">
                  Key factors that influence your final quote
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="space-y-6">
                  {apartmentPricingFactors.map((factor, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="grid gap-4 md:grid-cols-3 md:items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{factor.factor}</h3>
                          <p className="text-base text-gray-200">{factor.description}</p>
                        </div>
                        <div className="md:text-center">
                          <div className="text-base font-medium text-primary">{factor.impact}</div>
                        </div>
                        <div className="md:text-right">
                          <Button variant="outline" size="default">
                            Calculate Impact
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Landlord Benefits */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">ROI for Landlords & Property Managers</h2>
                <p className="text-lg text-gray-200">
                  Fresh paint is one of the highest-return improvements for rental properties
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {landlordBenefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.benefit}</h3>
                      <div className="text-2xl font-bold text-primary mb-2">{benefit.value}</div>
                      <p className="text-base text-gray-200">{benefit.description}</p>
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
                  Apartment Painting FAQ
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
                <h2 className="text-3xl font-bold mb-4">More Painting Tools</h2>
                <p className="text-lg text-gray-200">
                  Complete suite of calculators for all painting projects
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">General Paint Calculator</h3>
                    <p className="text-base text-gray-200">Universal calculator for all painting projects</p>
                  </Link>

                  <Link href="/interior-painting-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Interior Calculator</h3>
                    <p className="text-base text-gray-200">Specialized for interior painting projects</p>
                  </Link>

                  <Link href="/paint-cost-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Cost Calculator</h3>
                    <p className="text-base text-gray-200">Calculate total project costs and budget</p>
                  </Link>

                  <Link href="/how-to-estimate-interior-paint-jobs" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Estimation Guide</h3>
                    <p className="text-base text-gray-200">Learn professional estimation techniques</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Get Your Apartment Painted Fast & Professional
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-100 mb-8">
                Whether you're a tenant, landlord, or property manager, get accurate quotes 
                and professional results with quick turnaround times.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Apartment Quote
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pro Features
                </Link>
              </div>
              <p className="mt-4 text-base opacity-100">
                Quick quotes • Professional results • Tenant-friendly scheduling
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}