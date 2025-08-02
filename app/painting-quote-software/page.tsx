import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ModernNavigation from '@/components/modern-navigation'
import { PaintEstimateCalculator } from '@/components/calculators/paint-estimate-calculator'
import { ROICalculator } from '@/components/calculators/roi-calculator'
import { 
  Clock, 
  TrendingUp, 
  DollarSign, 
  CheckCircle,
  Smartphone,
  FileText,
  Users,
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Calculator,
  Palette,
  Home,
  Building2,
  Sparkles,
  ChevronRight,
  Play,
  Download,
  Star,
  Mail,
  MessageSquare,
  Repeat,
  PaintBucket,
  Target,
  Layers,
  Settings,
  ChevronDown
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Quote Software - Fast Professional Quotes in Minutes | PaintQuote Pro',
  description: 'Painting quote software that creates professional estimates in 10 minutes. Win 40% more jobs with instant quotes. Used by 1000+ contractors. Try free today.',
  keywords: 'painting quote software, paint quote app, painting quote generator, painting quote calculator, online paint quote, painting estimate app',
  openGraph: {
    title: 'Painting Quote Software - Professional Estimates in Minutes',
    description: 'Create winning painting quotes 10x faster. Mobile-friendly, AI-powered quote software built specifically for painting contractors.',
    type: 'website',
  }
}

// Structured data for software
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PaintQuote Pro - Painting Quote Software",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "79",
    "priceCurrency": "USD",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "79",
      "priceCurrency": "USD",
      "billingIncrement": {
        "@type": "QuantitativeValue",
        "value": 1,
        "unitCode": "MON"
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1000"
  }
}

export default function PaintingQuoteSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section - Painting Quote Software */}
        <section className="relative overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-base text-gray-200 mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/painting-contractor-software" className="hover:text-white transition-colors">Software</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Painting Quote Software</span>
              </nav>

              <div className="text-center mb-12">
                <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 inline-flex">
                  <Zap className="h-3 w-3 mr-1" />
                  Average Quote Time: 10 Minutes
                </Badge>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Painting Quote Software That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Wins Jobs</span>
                </h1>
                
                <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
                  Stop losing jobs to slow quotes. Our painting quote app helps you create professional, accurate estimates in minutes—not hours. 
                  <span className="text-white font-semibold"> Join 1,000+ contractors</span> winning more with instant quotes.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4 text-center">
                    <div className="text-2xl font-bold text-white">10 min</div>
                    <div className="text-base text-gray-200">Average quote time</div>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4 text-center">
                    <div className="text-2xl font-bold text-white">40%</div>
                    <div className="text-base text-gray-200">Higher win rate</div>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4 text-center">
                    <div className="text-2xl font-bold text-white">50k+</div>
                    <div className="text-base text-gray-200">Quotes created</div>
                  </div>
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4 text-center">
                    <div className="text-2xl font-bold text-white">4.9/5</div>
                    <div className="text-base text-gray-200">User rating</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial-signup">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg group">
                      Start Creating Quotes Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/painting-quote-templates">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-gray-900/70 bg-transparent px-8 py-6 text-lg">
                      <Download className="mr-2 h-5 w-5" />
                      Free Quote Templates
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Painting Quote Software Works */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                How Our Painting Quote App Works
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Describe the Job</h3>
                  <p className="text-gray-200">
                    Tell our AI about the painting project in plain English. Room sizes, surfaces, special requirements—just type naturally.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">AI Calculates Everything</h3>
                  <p className="text-gray-200">
                    Our painting quote calculator instantly figures out paint quantities, labor hours, and material costs based on your rates.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Send Professional Quote</h3>
                  <p className="text-gray-200">
                    Get a branded PDF quote ready to email or text. Customers can view, approve, and pay deposits online.
                  </p>
                </div>
              </div>

              {/* Video Demo CTA */}
              <div className="mt-16 text-center">
                <Link href="#demo-video">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-gray-900/70 group">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Watch 2-Minute Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid - Paint Quote App */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Everything You Need in a Paint Quote App
                </h2>
                <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                  Built by painters for painters. Every feature designed to help you quote faster and more accurately.
                </p>
              </div>

              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                  <TabsTrigger value="create" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
                    Create Quotes
                  </TabsTrigger>
                  <TabsTrigger value="manage" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
                    Manage Business
                  </TabsTrigger>
                  <TabsTrigger value="grow" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
                    Grow Revenue
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-blue-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-blue-400" />
                          </div>
                          <CardTitle className="text-white">AI-Powered Quote Generator</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Describe jobs in plain English</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Auto-calculates materials & labor</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Handles complex multi-room projects</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-emerald-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <Calculator className="h-5 w-5 text-emerald-400" />
                          </div>
                          <CardTitle className="text-white">Smart Painting Calculator</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Accurate paint quantity estimates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Factors in coats, coverage, waste</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Separate interior/exterior rates</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-purple-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-purple-400" />
                          </div>
                          <CardTitle className="text-white">Mobile Paint Quote App</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Create quotes on-site</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Take & attach photos</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Works offline</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-amber-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-amber-400" />
                          </div>
                          <CardTitle className="text-white">Professional Templates</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Branded quote templates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Customizable terms & conditions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Multiple format options</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="manage" className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-cyan-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <Users className="h-5 w-5 text-cyan-400" />
                          </div>
                          <CardTitle className="text-white">Customer Management</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Store all customer details</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Quote history tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Job pipeline view</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-rose-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-rose-400" />
                          </div>
                          <CardTitle className="text-white">Automated Follow-ups</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Auto-send quote reminders</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Track email opens</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Customizable sequences</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="grow" className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-indigo-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-indigo-400" />
                          </div>
                          <CardTitle className="text-white">Business Analytics</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Win rate tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Revenue reports</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Profit margin analysis</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-teal-500/20">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                            <Target className="h-5 w-5 text-teal-400" />
                          </div>
                          <CardTitle className="text-white">Lead Optimization</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-100">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Response time tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Conversion insights</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Best practices alerts</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Quote Types - Painting Quote Calculator */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                Our Painting Quote Calculator Handles Every Job Type
              </h2>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Interior Painting */}
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <Home className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Interior Painting Quotes</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100 mb-6">
                    <li>• Single rooms to whole houses</li>
                    <li>• Walls, ceilings, trim, doors</li>
                    <li>• Cabinet painting & refinishing</li>
                    <li>• Accent walls & special finishes</li>
                    <li>• Stairwells & high ceilings</li>
                  </ul>
                  <Link href="/interior-painting-quote-calculator" className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2">
                    Try Interior Calculator
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Exterior Painting */}
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Exterior Painting Quotes</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100 mb-6">
                    <li>• House siding (all types)</li>
                    <li>• Decks & fences</li>
                    <li>• Garage doors & shutters</li>
                    <li>• Power washing included</li>
                    <li>• Weather-resistant coatings</li>
                  </ul>
                  <Link href="/exterior-painting-estimate-calculator" className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-2">
                    Try Exterior Calculator
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Commercial Painting */}
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Layers className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Commercial Painting Quotes</h3>
                  </div>
                  <ul className="space-y-2 text-gray-100 mb-6">
                    <li>• Office buildings</li>
                    <li>• Retail spaces</li>
                    <li>• Apartments & HOAs</li>
                    <li>• Industrial coatings</li>
                    <li>• Epoxy floor systems</li>
                  </ul>
                  <Link href="/commercial-painting-estimating-software" className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-2">
                    Commercial Features
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison - Online Paint Quote */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why Choose Our Online Paint Quote System?
                </h2>
                <p className="text-xl text-gray-100">
                  See how we stack up against traditional methods and competitors
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-6 text-gray-200 font-medium">Feature</th>
                      <th className="py-4 px-6 text-center">
                        <div className="text-white font-semibold">PaintQuote Pro</div>
                        <div className="text-base text-emerald-400">Our Software</div>
                      </th>
                      <th className="py-4 px-6 text-center">
                        <div className="text-gray-200">Excel/Word</div>
                        <div className="text-base text-gray-200">Manual</div>
                      </th>
                      <th className="py-4 px-6 text-center">
                        <div className="text-gray-200">Generic CRM</div>
                        <div className="text-base text-gray-200">Not Industry-Specific</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6 text-gray-100">Quote Creation Time</td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-emerald-400 font-semibold">10 minutes</span>
                      </td>
                      <td className="py-4 px-6 text-center text-gray-200">3-6 hours</td>
                      <td className="py-4 px-6 text-center text-gray-200">30-60 minutes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6 text-gray-100">Paint Calculations</td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-amber-400">Manual</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-red-400">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6 text-gray-100">Surface-Specific Rates</td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-amber-400">Manual</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-red-400">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6 text-gray-100">Mobile App</td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-red-400">✗</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-amber-400">Extra $</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6 text-gray-100">AI Assistance</td>
                      <td className="py-4 px-6 text-center">
                        <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-red-400">✗</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-red-400">✗</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4 px-6 text-gray-100">Monthly Cost</td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-emerald-400 font-semibold">$79</span>
                      </td>
                      <td className="py-4 px-6 text-center text-gray-200">$0 (hidden costs)</td>
                      <td className="py-4 px-6 text-center text-gray-200">$200-500+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 text-center">
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-gray-900/70">
                    View Full Comparison
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                Painting Contractors Love Our Quote Software
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-100 mb-6">
                      {"This painting quote app changed my business. I"}{''}m responding to leads in 15 minutes instead of 2 days. My close rate went from 25% to 45%!{""}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                      <div>
                        <p className="font-semibold text-white">Maria Garcia</p>
                        <p className="text-base text-gray-200">Garcia&apos;s Professional Painting</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-100 mb-6">
                      {"The painting calculator is spot-on accurate. No more underquoting jobs. I"}{''}ve increased my profit margins by 20% just by having better estimates.{""}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500"></div>
                      <div>
                        <p className="font-semibold text-white">Tom Anderson</p>
                        <p className="text-base text-gray-200">Anderson Paint Co.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-100 mb-6">
                      {"\"Being able to create quotes on my phone at the job site is incredible. Customers love getting professional quotes before I even leave their house.\""}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                      <div>
                        <p className="font-semibold text-white">James Wilson</p>
                        <p className="text-base text-gray-200">Wilson&apos;s Painting Services</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-gray-100 mb-4">Join 1,000+ painting contractors using our software</p>
                <Link href="/case-studies">
                  <Button variant="ghost" className="text-white hover:bg-gray-900/70">
                    Read More Success Stories
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Calculators */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Try Our Free Painting Calculators
                </h2>
                <p className="text-xl text-gray-100">
                  See how our quote software can save you time and increase your revenue
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <PaintEstimateCalculator />
                <ROICalculator />
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-100 mb-6">
                  Ready to create quotes this fast for all your painting jobs?
                </p>
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Painting Quote App */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                Common Questions About Our Painting Quote Software
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <button className="w-full text-left flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      How fast can I really create painting quotes?
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-200" />
                  </button>
                  <p className="text-gray-100 mt-4">
                    Most contractors create complete, professional quotes in 10-15 minutes. Simple jobs like single rooms can be done in 5 minutes. Compare that to 3-6 hours manually!
                  </p>
                </div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <button className="w-full text-left flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      Does the painting quote calculator handle complex jobs?
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-200" />
                  </button>
                  <p className="text-gray-100 mt-4">
                    Yes! Our AI understands multi-room projects, different surface types, prep work requirements, and special finishes. It can handle everything from single walls to entire commercial buildings.
                  </p>
                </div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <button className="w-full text-left flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      Can I use the paint quote app on my phone?
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-200" />
                  </button>
                  <p className="text-gray-100 mt-4">
                    Absolutely! Our mobile app works on iPhone and Android. Create quotes on-site, take photos, and send to customers instantly. It even works offline and syncs when you&apos;re back online.
                  </p>
                </div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <button className="w-full text-left flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      How accurate are the paint quantity calculations?
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-200" />
                  </button>
                  <p className="text-gray-100 mt-4">
                    Very accurate! We factor in surface type, number of coats, coverage rates, and waste percentage. You can customize all these factors based on your experience and the specific paints you use.
                  </p>
                </div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <button className="w-full text-left flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      Can I customize the quote templates?
                    </h3>
                    <ChevronDown className="h-5 w-5 text-gray-200" />
                  </button>
                  <p className="text-gray-100 mt-4">
                    Yes! Add your logo, customize colors, edit terms and conditions, and create multiple templates for different job types. Your quotes will look professional and match your brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Creating Professional Painting Quotes Today
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                Join 1,000+ painting contractors who quote faster, look more professional, and win more jobs with PaintQuote Pro.
              </p>
              
              <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8  from-blue-500/10 to-purple-500/10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Link href="/trial-signup">
                    <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg group">
                      Start 14-Day Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/paint-estimate-templates">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-gray-900/70 bg-transparent px-8 py-6 text-lg">
                      <Download className="mr-2 h-5 w-5" />
                      Download Free Templates
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 text-base text-gray-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-blue-400" />
                    Works on all devices
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-400" />
                    Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Explore More Painting Tools & Resources
              </h3>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Link href="/painting-contractor-software" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Contractor Software</h4>
                  <p className="text-gray-200 text-base">Complete business management</p>
                </Link>
                
                <Link href="/painting-quote-templates" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Quote Templates</h4>
                  <p className="text-gray-200 text-base">Free professional templates</p>
                </Link>
                
                <Link href="/interior-painting-quote-calculator" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Interior Calculator</h4>
                  <p className="text-gray-200 text-base">Room-by-room estimates</p>
                </Link>
                
                <Link href="/exterior-painting-estimate-calculator" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Exterior Calculator</h4>
                  <p className="text-gray-200 text-base">House painting quotes</p>
                </Link>
                
                <Link href="/paint-estimate-templates" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Estimate Templates</h4>
                  <p className="text-gray-200 text-base">Customizable formats</p>
                </Link>
                
                <Link href="/how-to-quote-painting-jobs" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Quoting Guide</h4>
                  <p className="text-gray-200 text-base">Pro tips & strategies</p>
                </Link>
                
                <Link href="/roi-calculator" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">ROI Calculator</h4>
                  <p className="text-gray-200 text-base">See your savings</p>
                </Link>
                
                <Link href="/mobile-painting-estimate-app" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Mobile App</h4>
                  <p className="text-gray-200 text-base">Quote on the go</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}