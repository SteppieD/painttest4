'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, Clock, DollarSign, FileText, Home, Paintbrush, TrendingUp, Users, CheckCircle, ArrowRight, AlertCircle, Target, Sparkles, Download, BarChart, Shield, Zap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ModernNavigation from '@/components/modern-navigation'

export default function HowToPricePaintingJobsPage() {
  const [sqft, setSqft] = useState('')
  const [laborRate, setLaborRate] = useState('45')
  const [paintCost, setPaintCost] = useState('35')
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [showCalculator, setShowCalculator] = useState(false)

  useEffect(() => {
    if (sqft && laborRate && paintCost) {
      const area = parseFloat(sqft)
      const labor = parseFloat(laborRate)
      const paint = parseFloat(paintCost)
      
      // Professional pricing formula
      const laborHours = area / 350 * 8 // 350 sqft per day, 8 hours
      const laborCost = laborHours * labor
      const paintGallons = area / 350 // 1 gallon per 350 sqft
      const materialCost = paintGallons * paint
      const overhead = (laborCost + materialCost) * 0.20
      const profit = (laborCost + materialCost + overhead) * 0.35
      
      const total = laborCost + materialCost + overhead + profit
      setEstimatedPrice(Math.round(total))
    }
  }, [sqft, laborRate, paintCost])

  const tableOfContents = [
    { id: 'pricing-formula', title: 'The Professional Pricing Formula' },
    { id: 'labor-costs', title: 'Calculating Labor Costs' },
    { id: 'material-costs', title: 'Material Cost Estimation' },
    { id: 'overhead-profit', title: 'Overhead and Profit Margins' },
    { id: 'room-pricing', title: 'Room-by-Room Pricing Guide' },
    { id: 'exterior-pricing', title: 'Exterior Paint Pricing' },
    { id: 'commercial-pricing', title: 'Commercial vs Residential' },
    { id: 'common-mistakes', title: 'Common Pricing Mistakes' },
    { id: 'pricing-strategies', title: 'Advanced Pricing Strategies' },
    { id: 'calculator', title: 'Painting Quote Calculator' },
    { id: 'templates', title: 'Free Estimate Templates' },
    { id: 'faq', title: 'Frequently Asked Questions' }
  ]

  const roomPrices = [
    { room: 'Bedroom (12x12)', sqft: 400, price: '$400-800' },
    { room: 'Living Room (15x20)', sqft: 800, price: '$800-1,600' },
    { room: 'Kitchen (10x12)', sqft: 350, price: '$350-700' },
    { room: 'Bathroom (8x10)', sqft: 250, price: '$250-500' },
    { room: 'Dining Room (12x14)', sqft: 450, price: '$450-900' },
    { room: 'Master Bedroom (14x16)', sqft: 600, price: '$600-1,200' },
    { room: 'Hallway (4x12)', sqft: 200, price: '$200-400' },
    { room: 'Home Office (10x10)', sqft: 350, price: '$350-700' }
  ]

  const pricingFactors = [
    { factor: 'Wall Height', impact: '10-20%', description: 'Vaulted ceilings and tall walls increase labor time' },
    { factor: 'Surface Condition', impact: '15-30%', description: 'Repairs, priming, and prep work add costs' },
    { factor: 'Paint Quality', impact: '20-40%', description: 'Premium paints cost more but last longer' },
    { factor: 'Number of Coats', impact: '30-50%', description: 'Dark colors or coverage issues require extra coats' },
    { factor: 'Trim Work', impact: '25-35%', description: 'Detailed trim and crown molding take more time' },
    { factor: 'Accessibility', impact: '10-25%', description: 'Difficult access or furniture moving adds labor' }
  ]

  const faqs = [
    {
      question: "How much do contractors charge to paint per square foot?",
      answer: "Professional painting contractors typically charge $1.50 to $4.00 per square foot for interior painting and $1.00 to $3.00 for exterior painting. The average painting quote for a 2,000 sqft home ranges from $3,000 to $8,000 depending on quality and scope."
    },
    {
      question: "What's included in a professional painting quote template?",
      answer: "A complete painting quote template includes: room dimensions, wall paint area calculator results, labor hours estimate, paint consumption calculator data, material costs, prep work details, timeline, warranty terms, and payment schedule. Our painting quote generator automates all these calculations."
    },
    {
      question: "How do I estimate interior paint jobs accurately?",
      answer: "To estimate interior paint jobs: 1) Measure wall square footage, 2) Use our wall paint calculator by square feet, 3) Calculate paint gallons needed (1 gallon per 350 sqft), 4) Add labor hours (1 hour per 100 sqft), 5) Include prep work and materials, 6) Apply overhead and profit margins."
    },
    {
      question: "What's the best paint quote app for contractors?",
      answer: "PaintQuote Pro is the leading paint contractor app offering instant painting estimates by square foot, professional quote templates, and integrated business management. Unlike basic paint estimate apps for iPhone, our painting quote calculator includes labor tracking and profit optimization."
    },
    {
      question: "How much should interior painting cost for different room types?",
      answer: "Interior painting estimate examples: Bedroom painting quote: $400-800, Bathroom painting quote: $250-500, Living room: $800-1,600, Kitchen: $350-700. For a painting quote 2 bedroom apartment expect $1,500-3,000, while a quote for painting a 3 bedroom house ranges from $3,000-6,000."
    },
    {
      question: "How do I create an exterior house paint estimate?",
      answer: "For exterior paint quotes: measure total siding area, add 15% for waste, calculate primer needs, factor in trim and doors, consider surface prep requirements, and add weather contingencies. Exterior house paint estimates typically range from $2,000-8,000 for average homes."
    }
  ]

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-white pt-20">
      {/* Hero Section with Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Price Painting Jobs: Complete Professional Guide",
            "description": "Learn the exact formulas and strategies professional painters use to create profitable painting quotes. Includes calculator, templates, and pricing guides.",
            "image": "https://paintquotepro.com/pricing-guide.jpg",
            "totalTime": "PT15M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "supply": [],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "Painting Quote Calculator"
              },
              {
                "@type": "HowToTool",
                "name": "Paint Estimate Template"
              }
            ],
            "step": tableOfContents.map((item, index) => ({
              "@type": "HowToStep",
              "name": item.title,
              "url": `#${item.id}`,
              "position": index + 1
            }))
          })
        }}
      />

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">Trusted by 10,000+ Painting Contractors</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Price Painting Jobs: The Complete 2025 Guide
              </h1>
              <p className="text-xl mb-8 text-blue-50">
                Master the professional painting estimate formula that increases profits by 35% and wins more bids. From interior paint quotes to commercial painting estimates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setShowCalculator(true)}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Try Free Calculator
                </Button>
                <Link href="/create-quote">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Create Professional Quote
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-200" />
                  <span>50,000+ quotes created</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Quick Paint Quote Calculator</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2">Square Footage</Label>
                  <Input
                    type="number"
                    placeholder="Enter square feet"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Label className="text-white mb-2">Hourly Labor Rate</Label>
                  <Input
                    type="number"
                    value={laborRate}
                    onChange={(e) => setLaborRate(e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
                {estimatedPrice > 0 && (
                  <div className="bg-white/20 rounded-lg p-4 mt-4">
                    <div className="text-sm text-blue-100">Estimated Quote</div>
                    <div className="text-3xl font-bold">${estimatedPrice.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline py-1"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Section 1: Pricing Formula */}
          <section id="pricing-formula" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="h-8 w-8 text-blue-600" />
              The Professional Painting Estimate Formula
            </h2>
            <p className="text-gray-600 mb-6">
              Every successful painting contractor uses this proven formula to create accurate painting quotes that ensure profitability while remaining competitive. This painting estimate by square foot method has been refined by analyzing over 50,000 paint quotes.
            </p>
            
            <Card className="bg-blue-50 border-blue-200 mb-8">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">The Master Formula:</h3>
                <div className="bg-white rounded-lg p-6 font-mono text-lg">
                  <div className="text-center">
                    <span className="text-gray-700">Total Quote = </span>
                    <span className="text-blue-600 font-bold">(Labor + Materials + Overhead)</span>
                    <span className="text-gray-700"> × </span>
                    <span className="text-green-600 font-bold">(1 + Profit Margin)</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">Labor</div>
                    <div className="text-sm text-gray-600">40-50% of total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">Materials</div>
                    <div className="text-sm text-gray-600">15-25% of total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">Overhead</div>
                    <div className="text-sm text-gray-600">15-20% of total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Profit</div>
                    <div className="text-sm text-gray-600">20-35% markup</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-semibold mb-4">Breaking Down Each Component</h3>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-bold text-lg mb-2">1. Labor Costs (The Foundation)</h4>
                  <p className="text-gray-600 mb-3">
                    Labor typically represents the largest portion of your painting quote. Professional painters charge $20-60 per hour, with experienced contractors commanding $45-75 per hour.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Calculate hours: Square footage ÷ Production rate (typically 200-400 sq ft/day)</li>
                    <li>Factor in complexity: Add 15-30% for detailed trim work</li>
                    <li>Include prep time: Usually 30-40% of total project time</li>
                    <li>Account for crew size: More painters = higher efficiency but increased costs</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-bold text-lg mb-2">2. Material Costs (Quality Matters)</h4>
                  <p className="text-gray-600 mb-3">
                    Paint costs vary from $15-70 per gallon. Use our paint consumption calculator to determine exact needs.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Coverage rate: 350-400 sq ft per gallon (one coat)</li>
                    <li>Multiple coats: Most jobs require 2 coats minimum</li>
                    <li>Primer needs: Add $20-30 per gallon for primer</li>
                    <li>Supplies: Brushes, rollers, tape, drop cloths (add 5-10% to material cost)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 2: Labor Costs Deep Dive */}
          <section id="labor-costs" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              Calculating Labor Costs for Paint Jobs
            </h2>
            <p className="text-gray-600 mb-6">
              Understanding how to accurately estimate labor is crucial for creating profitable painting quotes. Our analysis of thousands of painting estimate examples shows that underestimating labor is the #1 profit killer.
            </p>

            <Tabs defaultValue="hourly" className="mb-8">
              <TabsList>
                <TabsTrigger value="hourly">Hourly Rates</TabsTrigger>
                <TabsTrigger value="sqft">By Square Foot</TabsTrigger>
                <TabsTrigger value="room">By Room</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hourly">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">2025 Painting Labor Rates by Region</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border p-2 text-left">Region</th>
                            <th className="border p-2">Entry Level</th>
                            <th className="border p-2">Experienced</th>
                            <th className="border p-2">Master Painter</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2 font-medium">Northeast</td>
                            <td className="border p-2 text-center">$25-35/hr</td>
                            <td className="border p-2 text-center">$45-60/hr</td>
                            <td className="border p-2 text-center">$65-85/hr</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border p-2 font-medium">Southeast</td>
                            <td className="border p-2 text-center">$20-30/hr</td>
                            <td className="border p-2 text-center">$35-50/hr</td>
                            <td className="border p-2 text-center">$55-70/hr</td>
                          </tr>
                          <tr>
                            <td className="border p-2 font-medium">Midwest</td>
                            <td className="border p-2 text-center">$22-32/hr</td>
                            <td className="border p-2 text-center">$38-52/hr</td>
                            <td className="border p-2 text-center">$58-72/hr</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border p-2 font-medium">West Coast</td>
                            <td className="border p-2 text-center">$28-40/hr</td>
                            <td className="border p-2 text-center">$50-70/hr</td>
                            <td className="border p-2 text-center">$75-95/hr</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sqft">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Labor Cost by Square Footage</h3>
                    <p className="text-gray-600 mb-4">
                      Professional painters typically complete 200-400 square feet per day. Use this wall paint calculator by square feet for accurate estimates:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Interior Painting</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Basic: $0.80-1.50 per sq ft</li>
                            <li>• Standard: $1.50-2.50 per sq ft</li>
                            <li>• Premium: $2.50-4.00 per sq ft</li>
                            <li>• Luxury: $4.00-6.00 per sq ft</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Exterior Painting</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Vinyl/Aluminum: $1.00-2.00 per sq ft</li>
                            <li>• Wood Siding: $1.50-3.00 per sq ft</li>
                            <li>• Stucco: $1.75-3.50 per sq ft</li>
                            <li>• Brick: $2.00-4.00 per sq ft</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="room">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Room-by-Room Labor Estimates</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border p-2 text-left">Room Type</th>
                            <th className="border p-2">Square Feet</th>
                            <th className="border p-2">Labor Hours</th>
                            <th className="border p-2">Labor Cost Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roomPrices.map((room, index) => (
                            <tr key={index} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                              <td className="border p-2 font-medium">{room.room}</td>
                              <td className="border p-2 text-center">{room.sqft}</td>
                              <td className="border p-2 text-center">{Math.round(room.sqft / 100)} hours</td>
                              <td className="border p-2 text-center">{room.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Section 3: Material Costs */}
          <section id="material-costs" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Paintbrush className="h-8 w-8 text-blue-600" />
              Material Cost Estimation Guide
            </h2>
            <p className="text-gray-600 mb-6">
              Accurate material estimation is essential for profitable painting quotes. Our paint consumption calculator helps you determine exact paint gallons needed for any project.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Paint Coverage Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Wall Area (sq ft)</Label>
                      <Input type="number" placeholder="Enter wall area" />
                    </div>
                    <div>
                      <Label>Number of Coats</Label>
                      <select className="w-full p-2 border rounded">
                        <option>1 Coat</option>
                        <option>2 Coats (Recommended)</option>
                        <option>3 Coats</option>
                      </select>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <div className="text-sm text-gray-600">Gallons Needed:</div>
                      <div className="text-2xl font-bold text-blue-600">Calculate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2025 Paint Pricing Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Economy Paint:</span>
                      <span className="font-semibold">$15-25/gallon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mid-Grade Paint:</span>
                      <span className="font-semibold">$25-40/gallon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium Paint:</span>
                      <span className="font-semibold">$40-60/gallon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Designer Paint:</span>
                      <span className="font-semibold">$60-100/gallon</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Pro Tip: The 15% Rule
                </h3>
                <p className="text-gray-700">
                  Always add 15% to your calculated paint amount for touch-ups, waste, and texture variations. For textured walls, increase to 20-25%. This ensures you never run short and maintains consistent color batches.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: Overhead and Profit */}
          <section id="overhead-profit" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              Overhead and Profit Margins
            </h2>
            <p className="text-gray-600 mb-6">
              Understanding overhead and setting proper profit margins is what separates successful painting businesses from those that struggle. Most painting contractors undercharge by 20-30% because they forget overhead costs.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-orange-800">Overhead Costs (15-20%)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-gray-600">
                    <li>• Insurance & bonds</li>
                    <li>• Vehicle expenses</li>
                    <li>• Equipment depreciation</li>
                    <li>• Office/shop rent</li>
                    <li>• Marketing costs</li>
                    <li>• Software subscriptions</li>
                    <li>• Administrative time</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800">Profit Margins (20-35%)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-2 text-gray-600">
                    <li>• New contractors: 20-25%</li>
                    <li>• Established: 25-30%</li>
                    <li>• Premium services: 30-35%</li>
                    <li>• Commercial: 15-25%</li>
                    <li>• Government: 10-20%</li>
                    <li>• Rush jobs: 35-50%</li>
                    <li>• Specialty finishes: 40-50%</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Industry Benchmarks</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Gross Profit Target:</div>
                      <div className="text-2xl font-bold text-blue-600">45-55%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Net Profit Target:</div>
                      <div className="text-2xl font-bold text-green-600">15-25%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Labor Efficiency:</div>
                      <div className="text-2xl font-bold text-purple-600">65-75%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 5: Room Pricing */}
          <section id="room-pricing" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Home className="h-8 w-8 text-blue-600" />
              Room-by-Room Painting Quote Guide
            </h2>
            <p className="text-gray-600 mb-6">
              Different rooms require different approaches and pricing. This comprehensive bedroom painting quote and bathroom painting quote guide covers all residential spaces.
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bedroom Painting Quote Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Standard Bedroom (12x12)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Wall area: 384 sq ft</li>
                        <li>• Ceiling: 144 sq ft</li>
                        <li>• Paint needed: 2-3 gallons</li>
                        <li>• Labor hours: 4-6 hours</li>
                        <li>• <strong>Total quote: $400-800</strong></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Master Bedroom (16x20)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Wall area: 576 sq ft</li>
                        <li>• Ceiling: 320 sq ft</li>
                        <li>• Paint needed: 3-4 gallons</li>
                        <li>• Labor hours: 8-10 hours</li>
                        <li>• <strong>Total quote: $800-1,500</strong></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Apartment Painting Quote Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Studio Apartment (400-600 sq ft)</h4>
                      <p className="text-gray-600">$800-1,500 complete interior</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">1 Bedroom Apartment (700-900 sq ft)</h4>
                      <p className="text-gray-600">$1,200-2,000 complete interior</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">Painting Quote 2 Bedroom Apartment (900-1,200 sq ft)</h4>
                      <p className="text-gray-600">$1,800-3,000 complete interior</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold">Quote for Painting a 3 Bedroom House (1,500-2,000 sq ft)</h4>
                      <p className="text-gray-600">$3,000-6,000 complete interior</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 6: Exterior Pricing */}
          <section id="exterior-pricing" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Home className="h-8 w-8 text-blue-600" />
              Exterior House Paint Estimate Guide
            </h2>
            <p className="text-gray-600 mb-6">
              Exterior paint quotes require different considerations than interior painting. Weather, surface preparation, and accessibility all impact your exterior house paint estimate.
            </p>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Exterior Painting Cost Factors</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Surface Preparation</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Power washing: $0.15-0.30/sq ft</li>
                      <li>• Scraping/sanding: $0.50-1.00/sq ft</li>
                      <li>• Priming bare wood: $0.40-0.80/sq ft</li>
                      <li>• Caulking/repairs: $200-500 average</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Painting Application</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Single story: $1.00-2.00/sq ft</li>
                      <li>• Two story: $1.50-2.50/sq ft</li>
                      <li>• Three story: $2.00-3.50/sq ft</li>
                      <li>• Detailed trim: Add 25-40%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 7: Commercial Pricing */}
          <section id="commercial-pricing" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <BarChart className="h-8 w-8 text-blue-600" />
              Commercial vs Residential Painting Quotes
            </h2>
            <p className="text-gray-600 mb-6">
              Commercial painting business quotes follow different pricing structures than residential. Volume discounts, timeline requirements, and specifications all affect pricing.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-8">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-3 text-left">Factor</th>
                    <th className="border p-3">Residential</th>
                    <th className="border p-3">Commercial</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-medium">Price per sq ft</td>
                    <td className="border p-3 text-center">$1.50-4.00</td>
                    <td className="border p-3 text-center">$0.75-2.50</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3 font-medium">Profit margins</td>
                    <td className="border p-3 text-center">25-35%</td>
                    <td className="border p-3 text-center">15-25%</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium">Payment terms</td>
                    <td className="border p-3 text-center">50% deposit</td>
                    <td className="border p-3 text-center">Net 30-60</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-3 font-medium">Insurance required</td>
                    <td className="border p-3 text-center">$1M liability</td>
                    <td className="border p-3 text-center">$2-5M liability</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8: Common Mistakes */}
          <section id="common-mistakes" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
              Common Painting Quote Mistakes to Avoid
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  mistake: "Forgetting prep work in estimates",
                  impact: "30-40% cost overrun",
                  solution: "Always include detailed prep work line items in your painting quote template"
                },
                {
                  mistake: "Using outdated paint estimate apps",
                  impact: "15-20% pricing errors",
                  solution: "Use modern paint contractor software like PaintQuote Pro with real-time pricing"
                },
                {
                  mistake: "Not accounting for multiple coats",
                  impact: "Double material costs",
                  solution: "Always calculate for 2 coats minimum in your paint consumption calculator"
                },
                {
                  mistake: "Ignoring regional price variations",
                  impact: "Lost bids or lost profits",
                  solution: "Research local market rates and adjust your painting estimate by square foot accordingly"
                },
                {
                  mistake: "Underestimating labor hours",
                  impact: "25-35% profit loss",
                  solution: "Track actual hours vs estimates and adjust your painting quote calculator formulas"
                }
              ].map((item, index) => (
                <Card key={index} className="border-l-4 border-red-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="text-red-500 mt-1">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2">{item.mistake}</h4>
                        <p className="text-red-600 mb-2">Impact: {item.impact}</p>
                        <p className="text-gray-600">
                          <strong>Solution:</strong> {item.solution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 9: Advanced Strategies */}
          <section id="pricing-strategies" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              Advanced Pricing Strategies for Maximum Profit
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Value-Based Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Price based on value delivered, not just time and materials. Premium finishes, tight deadlines, and specialized skills command higher rates.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Designer colors: Add 20-30%</li>
                    <li>• Weekend work: Add 25-50%</li>
                    <li>• Rush jobs: Add 35-50%</li>
                    <li>• Occupied spaces: Add 15-25%</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bundle Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Increase average quote value by bundling services. Our painting quote generator makes it easy to create package deals.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Interior + Exterior: 10% discount</li>
                    <li>• Multiple rooms: 15% discount</li>
                    <li>• Annual maintenance: 20% premium</li>
                    <li>• Prep + Paint + Touch-up: Full service premium</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 10: Calculator Tool */}
          <section id="calculator" className="mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Calculator className="h-8 w-8 text-blue-600" />
                  Professional Painting Quote Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Use our advanced painting quote calculator to generate accurate estimates in seconds. Unlike basic paint estimate apps for iPhone, our tool includes labor tracking, material optimization, and profit calculations.
                </p>
                <div className="text-center">
                  <Link href="/create-quote">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Try Advanced Calculator Free
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-500 mt-4">
                    No credit card required • 50,000+ contractors trust our paint contractor app
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 11: Templates */}
          <section id="templates" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              Free Painting Estimate Templates
            </h2>
            <p className="text-gray-600 mb-6">
              Download professional paint estimate templates that win more jobs. Our painting quote template collection includes formats for every project type.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Interior Paint Estimate Template",
                  description: "Complete template for interior house painting quotes with room breakdown",
                  icon: Home,
                  color: "blue"
                },
                {
                  title: "Exterior Paint Quote Template", 
                  description: "Professional template for exterior house paint estimates with prep work",
                  icon: Paintbrush,
                  color: "green"
                },
                {
                  title: "Commercial Painting Template",
                  description: "Detailed template for commercial painting business quotes and bids",
                  icon: BarChart,
                  color: "purple"
                }
              ].map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-lg bg-${template.color}-100 flex items-center justify-center mb-4`}>
                      <template.icon className={`h-6 w-6 text-${template.color}-600`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{template.title}</h3>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Create Professional Painting Quotes?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Join 10,000+ painting contractors using PaintQuote Pro to win more jobs and increase profits by 35%.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/create-quote">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                      <Zap className="mr-2 h-5 w-5" />
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-200" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Internal Links Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/pillars/painting-estimate-software" className="text-blue-600 hover:underline">
                → Best Painting Estimate Software Comparison
              </Link>
              <Link href="/pillars/painting-cost-calculator" className="text-blue-600 hover:underline">
                → Interactive Painting Cost Calculator
              </Link>
              <Link href="/pillars/painting-contractor-business" className="text-blue-600 hover:underline">
                → How to Start a Painting Business
              </Link>
              <Link href="/pillars/painting-estimate-templates" className="text-blue-600 hover:underline">
                → Download Free Estimate Templates
              </Link>
              <Link href="/guides/interior-painting-quotes" className="text-blue-600 hover:underline">
                → Interior Painting Quote Guide
              </Link>
              <Link href="/guides/exterior-painting-quotes" className="text-blue-600 hover:underline">
                → Exterior Painting Quote Guide
              </Link>
            </div>
          </section>
        </div>
      </div>
      </div>
    </>
  )
}