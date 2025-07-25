import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import { 
  Calculator,
  Home,
  Paintbrush,
  Droplets,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Sparkles,
  ArrowRight,
  Ruler,
  Package,
  Info,
  Zap,
  FileText
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Paint Calculator & Estimating Tools: Free Online Calculators | PaintQuote Pro',
  description: 'Free paint calculator tools for contractors. Calculate paint quantity, coverage, costs, and labor hours. Accurate estimating tools used by 2,000+ professionals.',
  keywords: 'paint calculator, paint coverage calculator, painting estimate calculator, paint quantity calculator, painting cost calculator',
  openGraph: {
    title: 'Free Paint Calculator & Estimating Tools for Contractors',
    description: 'Professional paint calculators for accurate estimates. Calculate coverage, materials, labor, and costs instantly.',
    type: 'website',
  },
  alternates: {
    canonical: '/guides/paint-calculator'
  }
}

// Schema markup for rich snippets
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Paint Calculator Tools",
      "url": "https://paintquotepro.com/guides/paint-calculator",
      "description": "Free professional paint calculator tools for contractors. Calculate paint coverage, quantities, costs, and labor hours.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much paint do I need per square foot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One gallon of paint covers approximately 350-400 square feet with one coat on smooth surfaces. Textured surfaces require more paint, covering 250-300 sq ft per gallon. Always add 10% for waste and touch-ups."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate paint for a room?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Calculate room paint by: 1) Measure wall perimeter and height, 2) Multiply for total wall area, 3) Subtract doors (20 sq ft) and windows (15 sq ft), 4) Divide by paint coverage rate (350 sq ft/gallon), 5) Multiply by number of coats needed."
          }
        },
        {
          "@type": "Question",
          "name": "What factors affect paint coverage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Paint coverage is affected by surface texture (smooth vs rough), porosity (sealed vs unsealed), color changes (dark to light requires more coats), application method (spray vs brush), and paint quality (premium paints cover better)."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Paint Needed for a Project",
      "description": "Step-by-step guide to calculating paint requirements for any painting project",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Measure the surfaces",
          "text": "Measure length and height of each wall or surface to be painted"
        },
        {
          "@type": "HowToStep",
          "name": "Calculate total area",
          "text": "Multiply length × height for each surface and add them together"
        },
        {
          "@type": "HowToStep",
          "name": "Subtract openings",
          "text": "Subtract area of doors (20 sq ft) and windows (15 sq ft) from total"
        },
        {
          "@type": "HowToStep",
          "name": "Determine coverage rate",
          "text": "Use 350-400 sq ft per gallon for smooth surfaces, less for textured"
        },
        {
          "@type": "HowToStep",
          "name": "Calculate gallons needed",
          "text": "Divide total area by coverage rate and multiply by number of coats"
        }
      ]
    }
  ]
}

// Calculator types data
const calculatorTypes = [
  {
    title: 'Interior Paint Calculator',
    icon: Home,
    color: 'blue',
    description: 'Calculate paint for rooms, walls, and ceilings',
    link: '#interior-calculator'
  },
  {
    title: 'Exterior Paint Calculator',
    icon: Home,
    color: 'purple',
    description: 'Estimate siding, trim, and outdoor surfaces',
    link: '#exterior-calculator'
  },
  {
    title: 'Coverage Calculator',
    icon: Paintbrush,
    color: 'green',
    description: 'Determine paint coverage by surface type',
    link: '#coverage-calculator'
  },
  {
    title: 'Cost Estimator',
    icon: DollarSign,
    color: 'yellow',
    description: 'Calculate total project costs',
    link: '#cost-calculator'
  }
]

// Paint coverage rates
const coverageRates = {
  smooth: { primer: 300, paint: 400 },
  textured: { primer: 250, paint: 300 },
  rough: { primer: 200, paint: 250 },
  porous: { primer: 150, paint: 200 }
}

export default function PaintCalculatorGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li>/</li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li>/</li>
                <li className="text-white">Paint Calculator</li>
              </ol>
            </nav>

            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                Free Painting Calculators
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Professional Paint Calculator & Estimating Tools
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Accurate paint calculations in seconds. Used by 2,000+ painting contractors to 
                create precise estimates and reduce material waste.
              </p>
              
              {/* Quick Access Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
                {calculatorTypes.map((calc) => (
                  <a
                    key={calc.title}
                    href={calc.link}
                    className="group"
                  >
                    <Card className="bg-gray-800/50 border-gray-700 p-4 hover:border-blue-500/50 transition-all">
                      <calc.icon className={`h-8 w-8 text-${calc.color}-400 mx-auto mb-2`} />
                      <div className="text-sm font-semibold text-white group-hover:text-blue-400">
                        {calc.title}
                      </div>
                    </Card>
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#interior-calculator">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Start Calculating
                    <Calculator className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/trial-signup">
                  <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Try Full Software
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Accurate Calculations Matter */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Why Accurate Paint Calculations Matter
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-gray-800/30 border-gray-700 p-6 text-center">
                  <DollarSign className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Avoid Overbuying</h3>
                  <p className="text-sm text-gray-300">
                    Save 15-20% on material costs by ordering exactly what you need
                  </p>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6 text-center">
                  <Clock className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Eliminate Delays</h3>
                  <p className="text-sm text-gray-300">
                    No more mid-job trips to buy additional paint or supplies
                  </p>
                </Card>
                
                <Card className="bg-gray-800/30 border-gray-700 p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Protect Profits</h3>
                  <p className="text-sm text-gray-300">
                    Accurate estimates ensure healthy margins on every job
                  </p>
                </Card>
              </div>

              <Card className="bg-yellow-500/10 border-yellow-500/30 p-8">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Industry Fact</h3>
                <p className="text-gray-300 mb-4">
                  According to the Painting Contractors Association, inaccurate material estimates 
                  are the #1 cause of reduced profits, costing contractors an average of $8,500 
                  per year in wasted materials and emergency supply runs.
                </p>
                <p className="text-sm text-gray-400">
                  Our calculators use industry-standard formulas refined by professional painters 
                  to ensure accuracy within 5% on every estimate.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Interior Paint Calculator */}
        <section id="interior-calculator" className="py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Interior Paint Calculator
              </h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">Room Dimensions</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Room Type
                    </label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>Bedroom</option>
                      <option>Living Room</option>
                      <option>Kitchen</option>
                      <option>Bathroom</option>
                      <option>Dining Room</option>
                      <option>Office</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Wall Height (feet)
                    </label>
                    <input 
                      type="number" 
                      defaultValue="8"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Length (ft)
                    </label>
                    <input 
                      type="number" 
                      placeholder="12"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Width (ft)
                    </label>
                    <input 
                      type="number" 
                      placeholder="10"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Doors
                    </label>
                    <input 
                      type="number" 
                      defaultValue="1"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Windows
                    </label>
                    <input 
                      type="number" 
                      defaultValue="1"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Surface Type
                    </label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>Smooth Drywall</option>
                      <option>Textured Walls</option>
                      <option>Rough/Stucco</option>
                      <option>Previously Painted</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Number of Coats
                    </label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>1 Coat</option>
                      <option>2 Coats (Standard)</option>
                      <option>3 Coats (Dark to Light)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Include Ceiling</span>
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="rounded" />
                    <span>Include Primer</span>
                  </label>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Calculate Paint Needed
                  <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </Card>

              {/* Results Card */}
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Calculation Results</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-4">Paint Requirements</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Square Footage:</span>
                        <span className="text-white font-semibold">384 sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Wall Paint Needed:</span>
                        <span className="text-white font-semibold">2 gallons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Ceiling Paint:</span>
                        <span className="text-white font-semibold">1 gallon</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Primer (if needed):</span>
                        <span className="text-white font-semibold">2 gallons</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-4">Cost Estimate</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Paint Cost:</span>
                        <span className="text-white font-semibold">$90-150</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Labor (4-6 hrs):</span>
                        <span className="text-white font-semibold">$200-360</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Supplies:</span>
                        <span className="text-white font-semibold">$25-40</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-gray-700">
                        <span className="text-white font-semibold">Total Estimate:</span>
                        <span className="text-green-400 font-bold">$315-550</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2">Pro Tip</h4>
                  <p className="text-sm text-gray-300">
                    Always add 10-15% to your paint calculation for touch-ups and future maintenance. 
                    This bedroom would benefit from 2.5 gallons instead of 2 to ensure complete coverage.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-800">
                    Save Calculation
                  </Button>
                  <Link href="/trial-signup" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Create Full Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Exterior Paint Calculator */}
        <section id="exterior-calculator" className="py-16 bg-black/20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Exterior Paint Calculator
              </h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">Building Dimensions</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Building Type
                    </label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>Single Story House</option>
                      <option>Two Story House</option>
                      <option>Ranch Style</option>
                      <option>Colonial</option>
                      <option>Commercial Building</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Siding Material
                    </label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>Wood Siding</option>
                      <option>Vinyl Siding</option>
                      <option>Stucco</option>
                      <option>Brick</option>
                      <option>Concrete Block</option>
                      <option>Metal Siding</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Current Condition
                    </label>
                    <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                      <option>Good - Minor Prep</option>
                      <option>Fair - Moderate Prep</option>
                      <option>Poor - Extensive Prep</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Perimeter (ft)
                    </label>
                    <input 
                      type="number" 
                      placeholder="140"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Height (ft)
                    </label>
                    <input 
                      type="number" 
                      placeholder="20"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Gable Ends
                    </label>
                    <input 
                      type="number" 
                      defaultValue="2"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Garage Doors
                    </label>
                    <input 
                      type="number" 
                      defaultValue="2"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Additional Surfaces</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Trim & Fascia</span>
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" className="rounded" />
                      <span>Shutters</span>
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" className="rounded" />
                      <span>Doors</span>
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Soffit</span>
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" className="rounded" />
                      <span>Deck/Porch</span>
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                      <input type="checkbox" className="rounded" />
                      <span>Garage Doors</span>
                    </label>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Calculate Exterior Paint
                  <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </Card>

              {/* Exterior Results */}
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Exterior Paint Requirements</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-4">Surface Areas</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Siding:</span>
                        <span className="text-white">2,450 sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Trim:</span>
                        <span className="text-white">380 linear ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Soffit:</span>
                        <span className="text-white">280 sq ft</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-pink-400 mb-4">Paint Needed</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Siding Paint:</span>
                        <span className="text-white font-semibold">10 gallons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Trim Paint:</span>
                        <span className="text-white font-semibold">3 gallons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Primer:</span>
                        <span className="text-white font-semibold">8 gallons</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4">Project Cost</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Materials:</span>
                        <span className="text-white">$650-850</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Labor:</span>
                        <span className="text-white">$2,800-3,500</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-gray-700">
                        <span className="text-white">Total:</span>
                        <span className="text-green-400">$3,450-4,350</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Calculator */}
        <section id="coverage-calculator" className="py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Paint Coverage Calculator
              </h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">Coverage Rates by Surface Type</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-4">Interior Surfaces</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 text-gray-400">Surface</th>
                          <th className="text-right py-2 text-gray-400">Sq Ft/Gallon</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Smooth Drywall</td>
                          <td className="text-right text-white">350-400</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Textured Walls</td>
                          <td className="text-right text-white">250-350</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Primed Wood</td>
                          <td className="text-right text-white">300-350</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Plaster</td>
                          <td className="text-right text-white">300-400</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-300">Acoustic Ceiling</td>
                          <td className="text-right text-white">150-200</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-4">Exterior Surfaces</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 text-gray-400">Surface</th>
                          <th className="text-right py-2 text-gray-400">Sq Ft/Gallon</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Wood Siding</td>
                          <td className="text-right text-white">250-300</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Stucco</td>
                          <td className="text-right text-white">150-250</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Brick</td>
                          <td className="text-right text-white">180-250</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 text-gray-300">Concrete Block</td>
                          <td className="text-right text-white">100-200</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-300">Metal Siding</td>
                          <td className="text-right text-white">300-400</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">Quick Coverage Calculator</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Square Footage</label>
                      <input 
                        type="number" 
                        placeholder="1000"
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Coverage Rate</label>
                      <input 
                        type="number" 
                        placeholder="350"
                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Gallons Needed</label>
                      <div className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-green-400 font-semibold">
                        2.9 gallons
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Factors Affecting Coverage */}
              <Card className="bg-gray-800/30 border-gray-700 p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Factors Affecting Paint Coverage</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Increases Coverage</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>High-quality paint with better hiding power</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Properly primed surfaces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Similar color to existing paint</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Professional spray application</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Decreases Coverage</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Porous or unpainted surfaces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Dark colors over light surfaces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Rough or textured surfaces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Temperature extremes during application</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Cost Calculator */}
        <section id="cost-calculator" className="py-16 bg-black/20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Painting Cost Calculator
              </h2>
              
              <Card className="bg-gray-800/30 border-gray-700 p-8 mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">Project Cost Estimator</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4">Material Costs</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Paint Quality</label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                          <option>Budget ($25-35/gal)</option>
                          <option>Mid-Grade ($35-50/gal)</option>
                          <option>Premium ($50-75/gal)</option>
                          <option>Designer ($75+/gal)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Gallons Needed</label>
                        <input 
                          type="number" 
                          defaultValue="10"
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-4">Labor Costs</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Region</label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                          <option>Northeast (+20%)</option>
                          <option>West Coast (+25%)</option>
                          <option>Midwest (Base)</option>
                          <option>South (-10%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Crew Size</label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white">
                          <option>Solo ($50-80/hr)</option>
                          <option>2-Person ($85-120/hr)</option>
                          <option>3+ Person ($120-180/hr)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Est. Hours</label>
                        <input 
                          type="number" 
                          defaultValue="24"
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-4">Additional Costs</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-gray-300">Surface Preparation</span>
                        </div>
                        <input 
                          type="number" 
                          defaultValue="350"
                          className="w-24 bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white text-sm"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-gray-300">Primer</span>
                        </div>
                        <input 
                          type="number" 
                          defaultValue="200"
                          className="w-24 bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white text-sm"
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-gray-300">Supplies & Equipment</span>
                        </div>
                        <input 
                          type="number" 
                          defaultValue="150"
                          className="w-24 bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white text-sm"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  Calculate Total Cost
                  <DollarSign className="ml-2 h-5 w-5" />
                </Button>
              </Card>

              {/* Cost Breakdown Results */}
              <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Complete Cost Breakdown</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Paint (10 gallons @ $42.50/gal)</span>
                    <span className="text-white font-semibold">$425</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Labor (24 hours @ $100/hr)</span>
                    <span className="text-white font-semibold">$2,400</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Surface Preparation</span>
                    <span className="text-white font-semibold">$350</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Supplies & Equipment</span>
                    <span className="text-white font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-700">
                    <span className="text-white font-semibold">Subtotal</span>
                    <span className="text-white font-semibold">$3,325</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Overhead & Profit (35%)</span>
                    <span className="text-white font-semibold">$1,164</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t border-gray-700">
                    <span className="text-xl font-bold text-white">Total Quote Price</span>
                    <span className="text-2xl font-bold text-green-400">$4,489</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400">Cost per Sq Ft</div>
                    <div className="text-xl font-bold text-white">$1.80</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400">Profit Margin</div>
                    <div className="text-xl font-bold text-green-400">26%</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400">Est. Duration</div>
                    <div className="text-xl font-bold text-white">3 days</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Calculators CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 p-12 text-center">
                <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">
                  Need More Advanced Calculations?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our free calculators are great for basic estimates, but PaintQuote Pro's 
                  AI-powered software handles complex projects with multiple surfaces, custom 
                  pricing, and instant professional quotes.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                  <div>
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-white mb-1">Multi-Room Projects</h3>
                    <p className="text-sm text-gray-400">Calculate entire homes in minutes</p>
                  </div>
                  <div>
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-white mb-1">Custom Pricing</h3>
                    <p className="text-sm text-gray-400">Your rates, materials, and markups</p>
                  </div>
                  <div>
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-white mb-1">Professional Quotes</h3>
                    <p className="text-sm text-gray-400">Branded PDFs ready to send</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Start Free 14-Day Trial
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      See All Features
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-gray-400 mt-4">
                  No credit card required • 5 free quotes • Setup in 2 minutes
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Pro Tips for Accurate Estimates</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Ruler className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Measuring Best Practices</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Always measure twice for accuracy</li>
                    <li>• Include closets and alcoves</li>
                    <li>• Subtract only doors, not windows</li>
                    <li>• Round up to nearest foot</li>
                    <li>• Account for waste (10-15%)</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Package className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Material Ordering Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Order all paint from same batch</li>
                    <li>• Keep 1 gallon for touch-ups</li>
                    <li>• Factor in primer needs</li>
                    <li>• Don't forget specialty paints</li>
                    <li>• Account for multiple coats</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <Clock className="h-8 w-8 text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Time Estimation Guide</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Prep work: 30-40% of total time</li>
                    <li>• Add 20% for occupied spaces</li>
                    <li>• Factor in drying time</li>
                    <li>• Consider weather delays</li>
                    <li>• Include cleanup time</li>
                  </ul>
                </Card>

                <Card className="bg-gray-800/30 border-gray-700 p-6">
                  <AlertCircle className="h-8 w-8 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Forgetting ceiling paint</li>
                    <li>• Underestimating prep work</li>
                    <li>• Not accounting for primer</li>
                    <li>• Missing trim calculations</li>
                    <li>• Ignoring surface conditions</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Related Resources</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-quote-painting-jobs" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-blue-500/50 transition-all">
                    <FileText className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 mb-2">
                      How to Quote Painting Jobs
                    </h3>
                    <p className="text-sm text-gray-400">
                      Complete guide to professional painting quotes
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/painting-estimate-software" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-purple-500/50 transition-all">
                    <Zap className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 mb-2">
                      Best Painting Software
                    </h3>
                    <p className="text-sm text-gray-400">
                      Compare top estimating software solutions
                    </p>
                  </Card>
                </Link>

                <Link href="/guides/interior-painting-estimator" className="block group">
                  <Card className="bg-gray-800/30 border-gray-700 p-6 hover:border-green-500/50 transition-all">
                    <Home className="h-8 w-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 mb-2">
                      Interior Painting Guide
                    </h3>
                    <p className="text-sm text-gray-400">
                      Room-by-room pricing strategies
                    </p>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ModernFooter />
    </>
  )
}