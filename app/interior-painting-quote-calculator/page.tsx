import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator, Home, Palette, Ruler, Clock, CheckCircle, DollarSign, Zap } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Interior Painting Quote Calculator | Free Room & House Interior Estimates',
  description: 'Calculate accurate interior painting quotes instantly. Get professional estimates for bedrooms, living rooms, kitchens, and entire houses with our specialized interior paint calculator.',
  keywords: 'interior painting quote calculator, interior paint cost calculator, room painting estimate, house interior painting cost, interior paint quote',
  openGraph: {
    title: 'Interior Painting Quote Calculator - Instant Room Estimates',
    description: 'Professional interior painting cost calculator for rooms and houses. Get accurate quotes in minutes.',
    type: 'website',
    images: [{
      url: '/og-interior-painting-calculator.jpg',
      width: 1200,
      height: 630,
      alt: 'Interior Painting Quote Calculator'
    }]
  },
  alternates: {
    canonical: '/interior-painting-quote-calculator'
  }
}

const roomTypes = [
  {
    room: 'Living Room',
    avgSize: '300-400 sq ft',
    timeframe: '2-3 days',
    costRange: '$800-1,400',
    complexity: 'Medium',
    features: ['High ceilings common', 'Multiple windows', 'Built-in features', 'Accent walls popular'],
    popular: true
  },
  {
    room: 'Master Bedroom',
    avgSize: '250-350 sq ft',
    timeframe: '1-2 days',
    costRange: '$600-1,200',
    complexity: 'Low',
    features: ['Standard height ceilings', 'Fewer windows', 'Minimal trim work', 'Neutral colors preferred']
  },
  {
    room: 'Kitchen',
    avgSize: '150-250 sq ft',
    timeframe: '2-3 days',
    costRange: '$500-1,000',
    complexity: 'High',
    features: ['Cabinet painting available', 'Backsplash considerations', 'Ventilation requirements', 'Grease-resistant paint needed']
  },
  {
    room: 'Bathroom',
    avgSize: '40-80 sq ft',
    timeframe: '1 day',
    costRange: '$300-600',
    complexity: 'High',
    features: ['Moisture-resistant paint', 'Detailed trim work', 'Ventilation critical', 'Primer essential']
  },
  {
    room: 'Dining Room',
    avgSize: '150-250 sq ft',
    timeframe: '1-2 days',
    costRange: '$500-900',
    complexity: 'Medium',
    features: ['Chair rail common', 'Formal finishes', 'Lighting considerations', 'Open to other rooms']
  },
  {
    room: 'Home Office',
    avgSize: '100-200 sq ft',
    timeframe: '1-2 days',
    costRange: '$400-700',
    complexity: 'Low',
    features: ['Productivity colors', 'Good lighting needed', 'Cable management', 'Professional appearance']
  }
]

const paintFinishes = [
  {
    finish: 'Flat/Matte',
    bestFor: 'Bedrooms, ceilings, low-traffic areas',
    pros: ['Hides imperfections well', 'Non-reflective', 'Easy touch-ups'],
    cons: ['Not washable', 'Shows marks easily'],
    cost: '$'
  },
  {
    finish: 'Eggshell',
    bestFor: 'Living rooms, dining rooms, hallways',
    pros: ['Slight sheen', 'More durable than flat', 'Good for most rooms'],
    cons: ['Shows brush marks', 'Moderate washability'],
    cost: '$$',
    popular: true
  },
  {
    finish: 'Satin',
    bestFor: 'Kitchens, bathrooms, kids rooms',
    pros: ['Easy to clean', 'Moisture resistant', 'Durable finish'],
    cons: ['Shows imperfections', 'More expensive'],
    cost: '$$$'
  },
  {
    finish: 'Semi-Gloss',
    bestFor: 'Trim, doors, cabinets',
    pros: ['Very washable', 'Moisture resistant', 'Highlights details'],
    cons: ['Shows every flaw', 'Requires perfect prep'],
    cost: '$$$$'
  }
]

const pricingByRoom = [
  {
    category: 'Small Rooms',
    rooms: 'Bathrooms, closets, powder rooms',
    sqft: '40-100 sq ft',
    laborHours: '4-8 hours',
    materialCost: '$50-120',
    laborCost: '$300-600',
    totalRange: '$350-720'
  },
  {
    category: 'Medium Rooms', 
    rooms: 'Bedrooms, home offices, studies',
    sqft: '100-250 sq ft',
    laborHours: '6-12 hours',
    materialCost: '$80-200',
    laborCost: '$480-960',
    totalRange: '$560-1,160'
  },
  {
    category: 'Large Rooms',
    rooms: 'Living rooms, family rooms, kitchens',
    sqft: '250-400 sq ft',
    laborHours: '10-20 hours',
    materialCost: '$120-320',
    laborCost: '$800-1,600',
    totalRange: '$920-1,920'
  },
  {
    category: 'Whole House Interior',
    rooms: '2,000-3,000 sq ft homes',
    sqft: '1,600-2,400 sq ft wall area',
    laborHours: '60-120 hours',
    materialCost: '$800-1,500',
    laborCost: '$4,800-9,600',
    totalRange: '$5,600-11,100'
  }
]

const interiorConsiderations = [
  {
    factor: 'Ceiling Height',
    impact: 'Standard (8-9ft): +0% | High (10-12ft): +20% | Vaulted: +40%',
    description: 'Higher ceilings require more paint and increase labor complexity'
  },
  {
    factor: 'Trim & Details',
    impact: 'Minimal: +0% | Standard: +15% | Extensive: +35%',
    description: 'Crown molding, wainscoting, and built-ins add significant time'
  },
  {
    factor: 'Wall Texture',
    impact: 'Smooth: +0% | Light texture: +10% | Heavy texture: +25%',
    description: 'Textured walls require more paint and careful application'
  },
  {
    factor: 'Color Changes',
    impact: 'Similar: +0% | Light to dark: +20% | Dark to light: +40%',
    description: 'Dramatic color changes often require additional primer and coats'
  },
  {
    factor: 'Room Access',
    impact: 'Easy: +0% | Furnished: +15% | Difficult: +30%',
    description: 'Furniture, stairs, and tight spaces affect work efficiency'
  }
]

const faqData = [
  {
    question: 'How much does it cost to paint a room interior?',
    answer: 'Interior room painting typically costs $300-1,400 depending on size and complexity. Small bathrooms start around $300, while large living rooms can cost $1,400 or more.'
  },
  {
    question: 'How do you calculate interior painting costs?',
    answer: 'Calculate by measuring wall area (length × width × height), subtracting openings, then multiply by $1.50-4.00 per square foot including materials and labor.'
  },
  {
    question: 'What paint finish is best for interior walls?',
    answer: 'Eggshell is most popular for living areas, satin for high-traffic areas like kitchens and bathrooms, and flat for bedrooms and ceilings.'
  },
  {
    question: 'How long does interior painting take?',
    answer: 'Most rooms take 1-3 days including prep work. Small bathrooms take 1 day, while large living rooms may take 2-3 days for proper preparation and multiple coats.'
  },
  {
    question: 'Do I need primer for interior painting?',
    answer: 'Primer is recommended when changing colors dramatically, painting over stains, or switching paint types. It ensures better coverage and longer-lasting results.'
  },
  {
    question: 'What\'s included in professional interior painting?',
    answer: 'Professional service includes surface preparation, primer (if needed), two coats of paint, trim painting, cleanup, and typically a warranty on workmanship.'
  }
]

export default function InteriorPaintingQuoteCalculator() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Interior Painting Quote Calculator' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://paintquotepro.com/interior-painting-quote-calculator',
    name: 'Interior Painting Quote Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    description: 'Professional interior painting cost calculator for rooms and houses',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Room-by-room calculations',
      'Paint finish recommendations',
      'Material cost estimation',
      'Labor time calculation',
      'Professional quote generation'
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
          <div className="container">
            <Breadcrumbs items={breadcrumbItems} className="py-4" />
          </div>

          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Home className="mr-2 h-4 w-4" />
                  Interior Specialist
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Interior Painting Quote Calculator
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Get accurate interior painting quotes for any room or entire house. Professional estimates 
                  for bedrooms, living rooms, kitchens, bathrooms, and more with specialized considerations.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Interior Quote
                  </Link>
                  <Link
                    href="#room-types"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    View Room Pricing
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">$1.50-4</div>
                    <p className="text-sm text-muted-foreground">Per Square Foot</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">1-3 days</div>
                    <p className="text-sm text-muted-foreground">Per Room</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">6 finishes</div>
                    <p className="text-sm text-muted-foreground">Paint Options</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Calculator */}
          <section className="border-t py-16 bg-muted/50">
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Interior Paint Quote Calculator
                </h2>
                
                <div className="rounded-lg border bg-background p-8 shadow-lg">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-6">Room Details</h3>
                      
                      <div className="space-y-6">
                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Home className="h-5 w-5 mr-2 text-primary" />
                            Room Information
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-sm font-medium">Room Type</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Living Room</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Wall Area</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">320 sq ft</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Ceiling Height</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">9 feet</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Complexity Level</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Medium</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Palette className="h-5 w-5 mr-2 text-primary" />
                            Paint Specifications
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Paint finish:</span>
                              <span className="text-sm font-medium">Eggshell</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Paint quality:</span>
                              <span className="text-sm font-medium">Premium</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Color change:</span>
                              <span className="text-sm font-medium">Light</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Primer needed:</span>
                              <span className="text-sm font-medium">Yes</span>
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
                            <span>Paint (2.5 gal @ $55):</span>
                            <span className="font-medium">$138</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Primer (1 gal @ $35):</span>
                            <span className="font-medium">$35</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Supplies & materials:</span>
                            <span className="font-medium">$75</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor (16 hours @ $65):</span>
                            <span className="font-medium">$1,040</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Surface preparation:</span>
                            <span className="font-medium">$160</span>
                          </div>
                          <hr className="border-muted" />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Quote:</span>
                            <span className="text-primary">$1,448</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Price per sq ft: $4.53 | Timeline: 2-3 days
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <Button className="w-full">
                            Get Professional Quote
                          </Button>
                          <div className="text-center">
                            <Link href="/auth/signup" className="text-sm text-primary hover:underline">
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

          {/* Room Types */}
          <section id="room-types" className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Interior Room Painting Costs</h2>
                <p className="text-lg text-muted-foreground">
                  Specialized pricing for different room types and their unique requirements
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {roomTypes.map((room, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${room.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                      {room.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Most Common
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{room.room}</h3>
                      <div className="text-sm text-muted-foreground mb-4">
                        <div>Size: {room.avgSize}</div>
                        <div>Timeline: {room.timeframe}</div>
                        <div>Complexity: {room.complexity}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary">{room.costRange}</div>
                        <div className="text-sm text-muted-foreground">Typical cost range</div>
                      </div>

                      <ul className="space-y-1 mb-6">
                        {room.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button variant={room.popular ? 'default' : 'outline'} className="w-full">
                        Calculate {room.room}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Paint Finishes Guide */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Interior Paint Finish Guide</h2>
                <p className="text-lg text-muted-foreground">
                  Choose the right finish for each room based on function and durability needs
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {paintFinishes.map((finish, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${finish.popular ? 'border-primary shadow-lg' : ''}`}>
                      {finish.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{finish.finish}</h3>
                        <div className="text-lg font-bold text-primary">{finish.cost}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Best for:</div>
                        <div className="text-sm text-muted-foreground">{finish.bestFor}</div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-2">Pros:</div>
                          <ul className="space-y-1">
                            {finish.pros.map((pro, proIndex) => (
                              <li key={proIndex} className="flex items-center text-sm">
                                <CheckCircle className="mr-2 h-3 w-3 text-green-600" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-orange-700 mb-2">Cons:</div>
                          <ul className="space-y-1">
                            {finish.cons.map((con, conIndex) => (
                              <li key={conIndex} className="text-sm text-muted-foreground">
                                • {con}
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

          {/* Pricing by Room Size */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Interior Painting Pricing by Room Size</h2>
                <p className="text-lg text-muted-foreground">
                  Detailed cost breakdowns based on room categories and square footage
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="space-y-6">
                  {pricingByRoom.map((category, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
                          <div className="text-sm text-muted-foreground mb-4">
                            <div><strong>Includes:</strong> {category.rooms}</div>
                            <div><strong>Wall area:</strong> {category.sqft}</div>
                            <div><strong>Labor time:</strong> {category.laborHours}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="grid gap-3 sm:grid-cols-3 text-center">
                            <div className="rounded bg-muted/50 p-3">
                              <div className="text-sm text-muted-foreground">Materials</div>
                              <div className="font-medium">{category.materialCost}</div>
                            </div>
                            <div className="rounded bg-muted/50 p-3">
                              <div className="text-sm text-muted-foreground">Labor</div>
                              <div className="font-medium">{category.laborCost}</div>
                            </div>
                            <div className="rounded bg-primary/10 p-3">
                              <div className="text-sm text-muted-foreground">Total</div>
                              <div className="font-bold text-primary">{category.totalRange}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Interior Considerations */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Factors Affecting Interior Paint Costs</h2>
                <p className="text-lg text-muted-foreground">
                  Key variables that influence your interior painting project pricing
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="space-y-6">
                  {interiorConsiderations.map((factor, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="grid gap-4 md:grid-cols-3 md:items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{factor.factor}</h3>
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </div>
                        <div className="md:text-center">
                          <div className="text-sm font-medium text-primary">{factor.impact}</div>
                        </div>
                        <div className="md:text-right">
                          <Button variant="outline" size="sm">
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

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Interior Painting FAQ
                </h2>
                
                <div className="space-y-8">
                  {faqData.map((faq, index) => (
                    <div key={index} className="rounded-lg bg-muted/50 p-6">
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">More Painting Tools</h2>
                <p className="text-lg text-muted-foreground">
                  Complete suite of calculators for all your painting projects
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Link href="/paint-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">General Calculator</h3>
                    <p className="text-sm text-muted-foreground">Universal calculator for all painting projects</p>
                  </Link>

                  <Link href="/exterior-painting-estimate-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Exterior Calculator</h3>
                    <p className="text-sm text-muted-foreground">Specialized for exterior painting projects</p>
                  </Link>

                  <Link href="/paint-cost-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Cost Calculator</h3>
                    <p className="text-sm text-muted-foreground">Calculate total project costs and budget</p>
                  </Link>

                  <Link href="/apartment-painting-quote" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Apartment Calculator</h3>
                    <p className="text-sm text-muted-foreground">Specialized for rental and apartment painting</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-primary py-16 text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Get Your Interior Painted Professionally
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-90 mb-8">
                Transform your home's interior with professional painting. Get accurate quotes, 
                choose the perfect finishes, and create the space you've always wanted.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Interior Quote
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pro Features
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Professional estimates • Quality finishes • Expert advice
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}