import { Metadata } from 'next'
import Link from 'next/link'
// import { Button } from '@/components/ui/button' // TODO: Check if this import is needed
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge' // TODO: Check if this import is needed
import ModernNavigation from '@/components/modern-navigation'
// import { PaintEstimateCalculator } from '@/components/calculators/paint-estimate-calculator' // TODO: Check if this import is needed
// import { ROICalculator } from '@/components/calculators/roi-calculator' // TODO: Check if this import is needed
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
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Painting Contractor Software - #1 Estimating & Quote App | PaintQuote Pro',
  description: 'The best painting contractor software for fast, accurate estimates. Create professional quotes in 10 minutes. Used by 1,000+ painting contractors. Try free.',
  keywords: 'painting contractor software, paint contractor app, painting business software, contractor estimating software, painting quote software',
  openGraph: {
    title: 'Painting Contractor Software - Professional Estimating in Minutes',
    description: 'Join 1,000+ painting contractors using PaintQuote Pro to create winning quotes 10x faster. Mobile-friendly, AI-powered, and built for painters.',
    type: 'website',
  }
}

export default function PaintingContractorSoftwarePage() {
  return (
    <>
      <ModernNavigation />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-base text-gray-200 mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">Painting Contractor Software</span>
              </nav>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <Star className="h-3 w-3 mr-1" />
                    #1 Rated by 1,000+ Painting Contractors
                  </Badge>
                  
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                    The Only <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Painting Contractor Software</span> Built for Speed
                  </h1>
                  
                  <p className="text-xl text-gray-100 mb-8">
                    Stop losing jobs to slow quotes. Our painting contractor app helps you create professional estimates in under 10 minutes—from anywhere. 
                    <span className="text-white font-semibold"> Win 40% more jobs</span> with instant, accurate quotes.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link href="/trial-signup">
                      <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg group">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="#demo-video">
                      <Button size="lg" className="btn-secondary-modern px-8 py-6 text-lg group">
                        <Play className="mr-2 h-5 w-5" />
                        Watch 2-Min Demo
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center gap-6 text-base text-gray-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      No credit card required
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-blue-400" />
                      Works on all devices
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8  from-blue-500/10 to-purple-500/10">
                    <h3 className="text-2xl font-bold text-white mb-6">See the Difference</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Without Software</p>
                          <p className="text-gray-200">3-6 hours per quote, 24-48 hour delivery</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <Zap className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">With PaintQuote Pro</p>
                          <p className="text-gray-200">10-15 minutes, instant delivery</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <p className="text-base text-amber-400 font-medium">
                        💡 Average contractor saves 40 hours/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-y border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">1,000+</div>
                <p className="text-gray-200">Active Contractors</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">50,000+</div>
                <p className="text-gray-200">Quotes Created</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">$25M+</div>
                <p className="text-gray-200">Revenue Quoted</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <p className="text-gray-200">User Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20" id="features">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Everything a Painting Contractor Needs
              </h2>
              <p className="text-xl text-gray-100">
                Built by painters, for painters. Every feature designed to help you quote faster, win more jobs, and grow your painting business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI-Powered Estimating */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-blue-500/20 group hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">AI-Powered Estimating</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 mb-4">
                    Just describe the job in plain English. Our AI understands painting terminology and calculates accurate estimates instantly.
                  </p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Auto-calculates paint & materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Includes labor hours
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Handles complex surfaces
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Mobile-First Design */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-emerald-500/20 group hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-white">Quote From Anywhere</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 mb-4">
                    Create quotes on-site using your phone or tablet. No laptop needed. Works offline and syncs when connected.
                  </p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      iPhone & Android apps
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Take photos & attach
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      E-signature ready
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Professional Templates */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-purple-500/20 group hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Win More Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 mb-4">
                    Professional quote templates that convert. Include your logo, terms, and payment options automatically.
                  </p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Branded PDF quotes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Accept deposits online
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Automated follow-ups
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Accurate Calculations */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-amber-500/20 group hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-amber-400" />
                  </div>
                  <CardTitle className="text-white">Never Miss Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 mb-4">
                    Built-in calculators for every surface type. Automatically includes prep work, primers, and multiple coats.
                  </p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Interior & exterior rates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Material calculators
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Profit margin control
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Customer Management */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-cyan-500/20 group hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">Track Everything</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 mb-4">
                    Keep all your quotes, customers, and jobs organized. See your pipeline and never lose track of leads.
                  </p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Customer database
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Job pipeline view
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Revenue tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Business Insights */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-rose-500/20 group hover:scale-105 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-rose-400" />
                  </div>
                  <CardTitle className="text-white">Grow Your Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 mb-4">
                    See which jobs make you the most money. Track win rates, average job size, and profit margins.
                  </p>
                  <ul className="space-y-2 text-base text-gray-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Win rate analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Profit reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Seasonal trends
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ROI Calculator CTA */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                See How Much You&apos;ll Save
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                Most painting contractors save 40+ hours per month and win 35% more jobs with our software.
              </p>
              <Link href="/roi-calculator">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg group">
                  Calculate Your ROI
                  <Calculator className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Job Types Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Built for Every Painting Job
              </h2>
              <p className="text-xl text-gray-100">
                From single rooms to commercial buildings, our painting contractor app handles it all.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Residential */}
              <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Home className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Residential Painting</h3>
                    <p className="text-gray-200">Perfect for house painters and residential contractors</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-100">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Interior room painting quotes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Exterior house painting estimates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Cabinet refinishing calculators</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Deck & fence staining quotes</span>
                  </li>
                </ul>
                <Link href="/interior-painting-quote-calculator" className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300">
                  Try Interior Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Commercial */}
              <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Commercial Painting</h3>
                    <p className="text-gray-200">Ideal for commercial painting contractors</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-100">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Office building estimates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Retail space painting quotes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Industrial coating calculators</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <span>Multi-unit property estimates</span>
                  </li>
                </ul>
                <Link href="/commercial-painting-estimating-software" className="inline-flex items-center gap-2 mt-6 text-emerald-400 hover:text-emerald-300">
                  See Commercial Features
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Painters Choose PaintQuote Pro
              </h2>
              <p className="text-xl text-gray-100">
                See how we compare to traditional methods and other painting software
              </p>
            </div>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-200 font-medium">Feature</th>
                    <th className="text-center py-4 px-4">
                      <div className="text-white font-semibold">PaintQuote Pro</div>
                      <div className="text-base text-gray-200">Our Software</div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="text-gray-200 font-semibold">Manual Method</div>
                      <div className="text-base text-gray-200">Spreadsheets</div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="text-gray-200 font-semibold">Other Software</div>
                      <div className="text-base text-gray-200">Generic CRMs</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-100">Time to Create Quote</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-emerald-400 font-semibold">10-15 min</span>
                    </td>
                    <td className="text-center py-4 px-4 text-gray-200">3-6 hours</td>
                    <td className="text-center py-4 px-4 text-gray-200">30-60 min</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-100">Painting-Specific Features</td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-red-400">✗</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-amber-400">Limited</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-100">Mobile App</td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-red-400">✗</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-amber-400">Extra Cost</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-100">AI Assistance</td>
                    <td className="text-center py-4 px-4">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-red-400">✗</span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-red-400">✗</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-gray-100">Price</td>
                    <td className="text-center py-4 px-4">
                      <span className="text-emerald-400 font-semibold">$79/mo</span>
                    </td>
                    <td className="text-center py-4 px-4 text-gray-200">Free (hidden costs)</td>
                    <td className="text-center py-4 px-4 text-gray-200">$150-300/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Trusted by Painting Contractors Nationwide
              </h2>
              <p className="text-xl text-gray-100">
                Join thousands of painters who&apos;ve transformed their business with our software
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-100 mb-4">
                    {"Cut my quoting time from 4 hours to 15 minutes. I"}{''}m winning more jobs because I can respond to leads instantly. Game changer!{""}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                    <div>
                      <p className="font-semibold text-white">Mike Rodriguez</p>
                      <p className="text-base text-gray-200">Premium Painting LLC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-100 mb-4">
                    {"\"The AI feature is incredible. I describe the job and it creates a perfect quote. My close rate went from 30% to 48%!\""
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500"></div>
                    <div>
                      <p className="font-semibold text-white">Sarah Chen</p>
                      <p className="text-base text-gray-200">Chen&apos;s Custom Painting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-100 mb-4">
                    {"\"Finally, software built for painters! Handles everything from cabinets to commercial jobs. Worth every penny.\""}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                    <div>
                      <p className="font-semibold text-white">David Thompson</p>
                      <p className="text-base text-gray-200">Thompson Pro Painters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Calculators Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Try Our Free Tools
                </h2>
                <p className="text-xl text-gray-100">
                  See how much time and money you could save with better quoting software
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <PaintEstimateCalculator />
                <ROICalculator />
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-100 mb-6">
                  Ready to create quotes this fast for your actual jobs?
                </p>
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20" id="demo-video">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  See It In Action
                </h2>
                <p className="text-xl text-gray-100">
                  Watch how fast you can create a professional painting quote
                </p>
              </div>
              
              <div className="relative aspect-video bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-900/70 backdrop-blur flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer">
                      <Play className="h-10 w-10 text-white ml-1" />
                    </div>
                    <p className="text-white font-medium">2-Minute Demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                Common Questions
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Is this painting contractor software easy to learn?
                  </h3>
                  <p className="text-gray-100">
                    Absolutely! Most contractors are creating quotes within 10 minutes of signing up. Our AI assistant guides you through everything, and we offer free onboarding calls to get you started.
                  </p>
                </div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Does the paint contractor app work offline?
                  </h3>
                  <p className="text-gray-100">
                    Yes! You can create quotes on-site without internet. The app syncs automatically when you&apos;re back online. Perfect for estimates at properties with poor cell service.
                  </p>
                </div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Can I customize quotes for my painting business?
                  </h3>
                  <p className="text-gray-100">
                    Yes! Add your logo, set your own rates, customize terms, and create templates for different job types. The software adapts to how you run your painting business.
                  </p>
                </div>

                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    What makes this better than other contractor software?
                  </h3>
                  <p className="text-gray-100">
                    We&apos;re built specifically for painters. While generic contractor software tries to serve everyone, we focus on painting-specific features like surface calculators, paint quantity estimates, and coating specifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md max-w-4xl mx-auto text-center p-12  from-blue-500/10 to-purple-500/10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Winning More Painting Jobs Today
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                Join 1,000+ painting contractors who quote faster, look more professional, and win more jobs with PaintQuote Pro.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg group">
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" className="btn-secondary-modern px-8 py-6 text-lg">
                    View Pricing
                    <DollarSign className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  Cancel anytime
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-purple-400" />
                  Export your data
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Explore More Painting Tools
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/paint-estimate-templates" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Free Quote Templates</h4>
                  <p className="text-gray-200 text-base">Download professional painting quote templates</p>
                </Link>
                <Link href="/interior-painting-quote-calculator" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Interior Paint Calculator</h4>
                  <p className="text-gray-200 text-base">Calculate interior painting costs instantly</p>
                </Link>
                <Link href="/how-to-quote-painting-jobs" className="glass-card p-6 hover:scale-105 transition-transform">
                  <h4 className="text-lg font-semibold text-white mb-2">Quoting Guide</h4>
                  <p className="text-gray-200 text-base">Learn professional quoting strategies</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}