import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator, Home, CloudRain, Sun, Shield, CheckCircle, DollarSign, Zap, AlertTriangle } from 'lucide-react'
import SharedNavigation from '@/components/shared-navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Exterior Painting Estimate Calculator | Free House Exterior Cost Calculator',
  description: 'Calculate exterior painting costs instantly. Get accurate estimates for siding, trim, doors, and windows. Professional exterior house painting cost calculator.',
  keywords: 'exterior painting estimate calculator, exterior house painting cost, exterior paint cost calculator, house exterior painting estimate, siding painting cost',
  openGraph: {
    title: 'Exterior Painting Estimate Calculator - Instant House Estimates',
    description: 'Professional exterior painting cost calculator for houses. Get accurate estimates for siding, trim, and all exterior surfaces.',
    type: 'website',
    images: [{
      url: '/og-exterior-painting-calculator.jpg',
      width: 1200,
      height: 630,
      alt: 'Exterior Painting Estimate Calculator'
    }]
  },
  alternates: {
    canonical: '/exterior-painting-estimate-calculator'
  }
}

const exteriorSurfaces = [
  {
    surface: 'Siding',
    avgCost: '$2.50-5.00/sq ft',
    difficulty: 'Medium',
    timeframe: '3-7 days',
    features: ['Largest surface area', 'Weather exposure critical', 'Primer often required', 'Multiple coats needed'],
    popular: true,
    paintNeeded: '60-80% of total'
  },
  {
    surface: 'Trim & Windows',
    avgCost: '$3.00-6.00/sq ft',
    difficulty: 'High',
    timeframe: '2-4 days',
    features: ['Detail work intensive', 'Multiple colors common', 'Weather sealing important', 'Precision required'],
    paintNeeded: '15-25% of total'
  },
  {
    surface: 'Doors & Shutters',
    avgCost: '$150-400 each',
    difficulty: 'Medium',
    timeframe: '1-2 days',
    features: ['High-traffic areas', 'Premium paint needed', 'Hardware removal', 'Multiple coats standard'],
    paintNeeded: '5-10% of total'
  },
  {
    surface: 'Deck & Railings',
    avgCost: '$2.00-4.00/sq ft',
    difficulty: 'High',
    timeframe: '2-5 days',
    features: ['Heavy prep work', 'Stain vs paint options', 'Weather resistance critical', 'Safety considerations'],
    paintNeeded: '10-20% of total'
  },
  {
    surface: 'Garage Doors',
    avgCost: '$200-600 each',
    difficulty: 'Medium',
    timeframe: '1 day',
    features: ['Large flat surfaces', 'Metal preparation', 'Sectional painting', 'Hardware masking'],
    paintNeeded: '5-10% of total'
  },
  {
    surface: 'Foundation',
    avgCost: '$1.50-3.00/sq ft',
    difficulty: 'Low',
    timeframe: '1-2 days',
    features: ['Concrete/masonry', 'Moisture considerations', 'Special primers', 'Ground level access'],
    paintNeeded: '5-15% of total'
  }
]

const houseSizes = [
  {
    size: 'Small House',
    sqft: '1,000-1,500 sq ft',
    exteriorArea: '1,200-1,800 sq ft',
    stories: '1-1.5 stories',
    costRange: '$3,000-7,500',
    timeframe: '3-5 days',
    paintNeeded: '8-12 gallons',
    features: ['Minimal trim work', 'Standard prep', 'Basic access'],
    laborHours: '40-60 hours'
  },
  {
    size: 'Medium House',
    sqft: '1,500-2,500 sq ft',
    exteriorArea: '1,800-3,000 sq ft',
    stories: '1.5-2 stories',
    costRange: '$6,000-12,500',
    timeframe: '5-8 days',
    paintNeeded: '12-18 gallons',
    features: ['Moderate trim work', 'Some height challenges', 'Standard complexity'],
    laborHours: '60-100 hours',
    popular: true
  },
  {
    size: 'Large House',
    sqft: '2,500-4,000 sq ft',
    exteriorArea: '3,000-4,800 sq ft',
    stories: '2-2.5 stories',
    costRange: '$10,000-20,000',
    timeframe: '7-12 days',
    paintNeeded: '18-28 gallons',
    features: ['Extensive trim work', 'Height equipment needed', 'Complex architecture'],
    laborHours: '100-150 hours'
  },
  {
    size: 'Luxury/Estate',
    sqft: '4,000+ sq ft',
    exteriorArea: '4,800+ sq ft',
    stories: '2.5+ stories',
    costRange: '$18,000-40,000+',
    timeframe: '10-20 days',
    paintNeeded: '25-50+ gallons',
    features: ['Premium materials', 'Complex details', 'Professional crew required'],
    laborHours: '150-300+ hours'
  }
]

const exteriorChallenges = [
  {
    challenge: 'Weather Conditions',
    impact: 'Ideal: +0% | Challenging: +15% | Extreme: +30%',
    description: 'Temperature, humidity, and precipitation affect application and drying',
    icon: CloudRain,
    solutions: ['Spring/fall optimal', 'Monitor forecasts', 'Flexible scheduling']
  },
  {
    challenge: 'Height & Access',
    impact: 'Single story: +0% | Two story: +25% | Three story: +50%',
    description: 'Multi-story homes require scaffolding and specialized equipment',
    icon: Home,
    solutions: ['Professional scaffolding', 'Safety equipment', 'Experienced crew']
  },
  {
    challenge: 'Surface Condition',
    impact: 'Good: +0% | Fair: +20% | Poor: +40%',
    description: 'Peeling paint, wood damage, and surface prep significantly affect costs',
    icon: AlertTriangle,
    solutions: ['Power washing', 'Scraping/sanding', 'Primer application', 'Repairs']
  },
  {
    challenge: 'Architectural Complexity',
    impact: 'Simple: +0% | Moderate: +25% | Complex: +50%',
    description: 'Victorian, colonial, and detailed homes require more time and skill',
    icon: Shield,
    solutions: ['Detailed estimates', 'Experienced painters', 'Quality brushes']
  }
]

const seasonalFactors = [
  {
    season: 'Spring (Mar-May)',
    conditions: 'Ideal',
    availability: 'High demand',
    pricing: 'Premium rates',
    advantages: ['Perfect temperatures', 'Low humidity', 'Stable weather'],
    considerations: ['Book early', 'Higher costs', 'Limited availability']
  },
  {
    season: 'Summer (Jun-Aug)',
    conditions: 'Challenging',
    availability: 'Peak season',
    pricing: 'Highest rates',
    advantages: ['Long daylight hours', 'Fast drying', 'No rain delays'],
    considerations: ['Extreme heat issues', 'Paint drying too fast', 'Worker fatigue']
  },
  {
    season: 'Fall (Sep-Nov)',
    conditions: 'Ideal',
    availability: 'Moderate',
    pricing: 'Standard rates',
    advantages: ['Perfect temperatures', 'Lower humidity', 'Stable conditions'],
    considerations: ['Weather window closing', 'Leaf cleanup needed'],
    popular: true
  },
  {
    season: 'Winter (Dec-Feb)',
    conditions: 'Difficult',
    availability: 'Low demand',
    pricing: 'Discount rates',
    advantages: ['Lower costs', 'Immediate availability', 'Contractor focus'],
    considerations: ['Temperature limits', 'Shorter days', 'Weather delays']
  }
]

const exteriorPaintTypes = [
  {
    type: 'Acrylic Latex',
    bestFor: 'Most exterior surfaces, siding, trim',
    lifespan: '7-10 years',
    cost: '$45-65/gallon',
    features: ['Water-based', 'Easy cleanup', 'Color retention', 'Mildew resistant'],
    pros: ['Durable', 'Breathable', 'UV resistant', 'Fast drying'],
    cons: ['Not for metal', 'Temperature sensitive'],
    popular: true
  },
  {
    type: 'Oil-Based',
    bestFor: 'Metal surfaces, trim, detailed work',
    lifespan: '8-12 years',
    cost: '$50-75/gallon',
    features: ['Penetrating', 'Hard finish', 'Smooth application', 'Self-leveling'],
    pros: ['Very durable', 'Smooth finish', 'Metal adhesion', 'Professional look'],
    cons: ['Long dry time', 'Odor', 'Cleanup difficult', 'VOC content']
  },
  {
    type: 'Elastomeric',
    bestFor: 'Stucco, masonry, problem surfaces',
    lifespan: '10-15 years',
    cost: '$60-90/gallon',
    features: ['Flexible', 'Crack bridging', 'Thick coating', 'Waterproof'],
    pros: ['Crack resistance', 'Waterproof', 'Long lasting', 'Energy efficient'],
    cons: ['Expensive', 'Difficult application', 'Limited colors']
  },
  {
    type: 'Primer + Paint',
    bestFor: 'Previously painted surfaces in good condition',
    lifespan: '6-8 years',
    cost: '$40-60/gallon',
    features: ['One-coat coverage', 'Time saving', 'Good adhesion', 'Multiple finishes'],
    pros: ['Time efficient', 'Good coverage', 'Cost effective', 'Easy application'],
    cons: ['Not for all surfaces', 'Shorter lifespan', 'Limited durability']
  }
]

const faqData = [
  {
    question: 'How much does it cost to paint a house exterior?',
    answer: 'Exterior house painting typically costs $3,000-20,000+ depending on size and complexity. Small homes (1,000-1,500 sq ft) cost $3,000-7,500, while large homes (2,500-4,000 sq ft) cost $10,000-20,000.'
  },
  {
    question: 'How do you calculate exterior painting costs?',
    answer: 'Calculate by measuring all exterior surfaces (siding, trim, doors), multiply by $2.50-5.00 per square foot for siding and $3.00-6.00 for trim. Add costs for doors ($150-400 each) and complexity factors.'
  },
  {
    question: 'How long does exterior painting take?',
    answer: 'Most homes take 5-12 days depending on size and weather. Small homes take 3-5 days, medium homes 5-8 days, and large homes 7-12 days. Weather delays can extend timelines.'
  },
  {
    question: 'What is the best time to paint house exterior?',
    answer: 'Spring (March-May) and fall (September-November) are ideal with temperatures 50-85°F and low humidity. Avoid painting in direct hot sun, freezing temperatures, or when rain is expected within 24 hours.'
  },
  {
    question: 'How much paint do I need for exterior house?',
    answer: 'Most homes need 8-28 gallons depending on size. Small homes need 8-12 gallons, medium homes 12-18 gallons, and large homes 18-28 gallons. Add 10% for waste and touch-ups.'
  },
  {
    question: 'How often should you paint house exterior?',
    answer: 'Most exterior paint lasts 7-10 years depending on climate, paint quality, and surface prep. Wood siding may need repainting every 5-7 years, while vinyl and fiber cement can last 10-15 years.'
  }
]

export default function ExteriorPaintingEstimateCalculator() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Exterior Painting Estimate Calculator' }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://paintquotepro.com/exterior-painting-estimate-calculator',
    name: 'Exterior Painting Estimate Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web-based',
    description: 'Professional exterior painting cost calculator for houses and buildings',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'House size calculations',
      'Surface-specific estimates',
      'Weather considerations',
      'Paint type recommendations',
      'Seasonal pricing factors'
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
                  <Sun className="mr-2 h-4 w-4" />
                  Exterior Specialist
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Exterior Painting Estimate Calculator
                </h1>
                <p className="mt-6 text-xl text-muted-foreground">
                  Get accurate exterior house painting estimates for siding, trim, doors, and all exterior surfaces. 
                  Professional calculations that account for weather, access, and surface complexity.
                </p>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate Exterior Quote
                  </Link>
                  <Link
                    href="#house-sizes"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    View House Pricing
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">$2.50-5</div>
                    <p className="text-sm text-muted-foreground">Per Sq Ft Siding</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5-12 days</div>
                    <p className="text-sm text-muted-foreground">Typical Timeline</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">7-10 years</div>
                    <p className="text-sm text-muted-foreground">Paint Lifespan</p>
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
                  Exterior Paint Estimate Calculator
                </h2>
                
                <div className="rounded-lg border bg-background p-8 shadow-lg">
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-6">House Details</h3>
                      
                      <div className="space-y-6">
                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Home className="h-5 w-5 mr-2 text-primary" />
                            Property Information
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-sm font-medium">House Size</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Medium House</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Stories</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">2 Stories</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Exterior Area</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">2,400 sq ft</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Current Condition</label>
                              <div className="mt-1 p-2 border rounded bg-background text-center">Good</div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-6">
                          <h4 className="font-medium mb-4 flex items-center">
                            <Sun className="h-5 w-5 mr-2 text-primary" />
                            Project Specifications
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Paint type:</span>
                              <span className="text-sm font-medium">Acrylic Latex</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Season:</span>
                              <span className="text-sm font-medium">Spring</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Complexity:</span>
                              <span className="text-sm font-medium">Moderate</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Access level:</span>
                              <span className="text-sm font-medium">Standard</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-6">Estimate Breakdown</h3>
                      
                      <div className="rounded-lg bg-primary/5 p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Siding (2,000 sq ft @ $3.50):</span>
                            <span className="font-medium">$7,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Trim & windows (400 sq ft @ $4.50):</span>
                            <span className="font-medium">$1,800</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Doors & shutters (3 @ $275):</span>
                            <span className="font-medium">$825</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Paint & materials (16 gal):</span>
                            <span className="font-medium">$960</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Surface preparation:</span>
                            <span className="font-medium">$800</span>
                          </div>
                          <hr className="border-muted" />
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total Estimate:</span>
                            <span className="text-primary">$11,385</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Price per sq ft: $4.74 | Timeline: 6-8 days
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <Button className="w-full">
                            Get Professional Estimate
                          </Button>
                          <div className="text-center">
                            <Link href="/auth/signup" className="text-sm text-primary hover:underline">
                              Save estimate and get detailed breakdown
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

          {/* House Sizes */}
          <section id="house-sizes" className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Exterior Painting Costs by House Size</h2>
                <p className="text-lg text-muted-foreground">
                  Professional estimates based on typical house sizes and exterior areas
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {houseSizes.map((house, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${house.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                      {house.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Most Common
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{house.size}</h3>
                      <div className="text-sm text-muted-foreground mb-4">
                        <div>Interior: {house.sqft}</div>
                        <div>Exterior area: {house.exteriorArea}</div>
                        <div>Height: {house.stories}</div>
                        <div>Timeline: {house.timeframe}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary">{house.costRange}</div>
                        <div className="text-sm text-muted-foreground">Complete exterior</div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 mb-4 text-sm">
                        <div className="flex justify-between">
                          <span>Paint needed:</span>
                          <span className="font-medium">{house.paintNeeded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Labor hours:</span>
                          <span className="font-medium">{house.laborHours}</span>
                        </div>
                      </div>

                      <ul className="space-y-1 mb-6">
                        {house.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button variant={house.popular ? 'default' : 'outline'} className="w-full">
                        Calculate {house.size}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Exterior Surfaces */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Exterior Surface Breakdown</h2>
                <p className="text-lg text-muted-foreground">
                  Different exterior surfaces require specialized approaches and pricing
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {exteriorSurfaces.map((surface, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${surface.popular ? 'border-primary shadow-lg' : ''}`}>
                      {surface.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Primary Surface
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{surface.surface}</h3>
                      <div className="text-sm text-muted-foreground mb-4">
                        <div>Difficulty: {surface.difficulty}</div>
                        <div>Timeline: {surface.timeframe}</div>
                        <div>Paint share: {surface.paintNeeded}</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-primary">{surface.avgCost}</div>
                        <div className="text-sm text-muted-foreground">Average cost</div>
                      </div>

                      <ul className="space-y-1 mb-6">
                        {surface.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="mr-2 h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Button variant={surface.popular ? 'default' : 'outline'} className="w-full">
                        Get {surface.surface} Quote
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Exterior Challenges */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Exterior Painting Challenges</h2>
                <p className="text-lg text-muted-foreground">
                  Key factors that affect exterior painting complexity and costs
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {exteriorChallenges.map((challenge, index) => (
                    <div key={index} className="rounded-lg border bg-background p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <challenge.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{challenge.challenge}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                          
                          <div className="mb-4">
                            <div className="text-sm font-medium text-primary">{challenge.impact}</div>
                          </div>

                          <div>
                            <div className="text-sm font-medium mb-2">Solutions:</div>
                            <ul className="space-y-1">
                              {challenge.solutions.map((solution, solutionIndex) => (
                                <li key={solutionIndex} className="flex items-center text-sm">
                                  <CheckCircle className="mr-2 h-3 w-3 text-green-600" />
                                  {solution}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Seasonal Factors */}
          <section className="bg-muted/50 py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Best Time for Exterior Painting</h2>
                <p className="text-lg text-muted-foreground">
                  Seasonal considerations for optimal exterior painting results and pricing
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {seasonalFactors.map((season, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${season.popular ? 'border-primary shadow-lg' : ''}`}>
                      {season.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Best Season
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{season.season}</h3>
                      <div className="grid gap-3 sm:grid-cols-3 mb-4 text-sm">
                        <div>
                          <span className="font-medium">Conditions:</span>
                          <div className="text-muted-foreground">{season.conditions}</div>
                        </div>
                        <div>
                          <span className="font-medium">Availability:</span>
                          <div className="text-muted-foreground">{season.availability}</div>
                        </div>
                        <div>
                          <span className="font-medium">Pricing:</span>
                          <div className="text-muted-foreground">{season.pricing}</div>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-2">Advantages:</div>
                          <ul className="space-y-1">
                            {season.advantages.map((advantage, advantageIndex) => (
                              <li key={advantageIndex} className="flex items-center text-sm">
                                <CheckCircle className="mr-2 h-3 w-3 text-green-600" />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-orange-700 mb-2">Considerations:</div>
                          <ul className="space-y-1">
                            {season.considerations.map((consideration, considerationIndex) => (
                              <li key={considerationIndex} className="text-sm text-muted-foreground">
                                • {consideration}
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

          {/* Paint Types */}
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Exterior Paint Types Guide</h2>
                <p className="text-lg text-muted-foreground">
                  Choose the right paint type for your exterior surfaces and climate
                </p>
              </div>

              <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">
                  {exteriorPaintTypes.map((paint, index) => (
                    <div key={index} className={`rounded-lg border bg-background p-6 ${paint.popular ? 'border-primary shadow-lg' : ''}`}>
                      {paint.popular && (
                        <div className="text-center mb-4">
                          <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-semibold mb-2">{paint.type}</h3>
                      <div className="text-sm text-muted-foreground mb-4">
                        <div><strong>Best for:</strong> {paint.bestFor}</div>
                        <div><strong>Lifespan:</strong> {paint.lifespan}</div>
                        <div><strong>Cost:</strong> {paint.cost}</div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Key Features:</div>
                        <div className="flex flex-wrap gap-2">
                          {paint.features.map((feature, featureIndex) => (
                            <span key={featureIndex} className="text-xs bg-muted px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-2">Pros:</div>
                          <ul className="space-y-1">
                            {paint.pros.map((pro, proIndex) => (
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
                            {paint.cons.map((con, conIndex) => (
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

          {/* FAQ Section */}
          <section className="bg-muted/50 py-16">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Exterior Painting FAQ
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

                  <Link href="/interior-painting-quote-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Interior Calculator</h3>
                    <p className="text-sm text-muted-foreground">Specialized for interior painting projects</p>
                  </Link>

                  <Link href="/paint-cost-calculator" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Cost Calculator</h3>
                    <p className="text-sm text-muted-foreground">Calculate total project costs and budget</p>
                  </Link>

                  <Link href="/how-to-estimate-interior-paint-jobs" 
                        className="group rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 group-hover:text-primary">Estimation Guide</h3>
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
                Transform Your Home's Exterior
              </h2>
              <p className="mx-auto max-w-2xl text-xl opacity-90 mb-8">
                Protect and beautify your home with professional exterior painting. Get accurate estimates, 
                choose the right season, and ensure lasting results with weather-resistant paints.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Exterior Estimate
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
                >
                  View Pro Features
                </Link>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Weather-resistant • Long-lasting • Professional results
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}