'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText, 
  Calculator,
  Building2,
  Briefcase,
  Award,
  Shield,
  Clock,
  Target,
  BarChart3,
  Lightbulb,
  Rocket,
  BookOpen
} from 'lucide-react'
import ModernNavigation from '@/components/modern-navigation'

export default function PaintingContractorBusinessPage() {
  const startupSteps = [
    {
      step: 1,
      title: "Business Planning & Legal Setup",
      items: [
        "Choose your business structure (LLC, Corp, Sole Prop)",
        "Register your business name and get an EIN",
        "Obtain necessary licenses and permits",
        "Set up business banking and accounting",
        "Get general liability and workers' comp insurance"
      ]
    },
    {
      step: 2,
      title: "Financial Foundation",
      items: [
        "Calculate your hourly rate and overhead costs",
        "Create a pricing strategy with 30-50% profit margins",
        "Set up job costing and tracking systems",
        "Establish payment terms and collection procedures",
        "Build a 3-6 month emergency fund"
      ]
    },
    {
      step: 3,
      title: "Marketing & Branding",
      items: [
        "Design professional logo and brand identity",
        "Build a conversion-focused website",
        "Set up Google My Business and local SEO",
        "Create before/after portfolio",
        "Develop referral and review generation systems"
      ]
    },
    {
      step: 4,
      title: "Operations & Systems",
      items: [
        "Implement professional quoting software",
        "Create standard operating procedures",
        "Set up customer communication workflows",
        "Establish quality control checklists",
        "Build vendor and supplier relationships"
      ]
    }
  ]

  const growthStrategies = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Niche Specialization",
      description: "Focus on high-margin specialties like cabinet painting, commercial work, or luxury homes"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Building",
      description: "Hire and train skilled painters to scale beyond owner-operator model"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Premium Positioning",
      description: "Position as the quality leader to command 20-30% higher prices"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Geographic Expansion",
      description: "Systematically expand into neighboring markets and territories"
    }
  ]

  const commonMistakes = [
    "Underpricing jobs and leaving money on the table",
    "Not tracking job costs and profit margins",
    "Failing to get deposits and payment upfront",
    "Neglecting marketing during busy seasons",
    "Not having proper insurance coverage",
    "Mixing personal and business finances",
    "Growing too fast without systems in place",
    "Not following up on leads quickly enough"
  ]

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Start & Scale Your Painting Business
              </h1>
              <p className="text-xl mb-8 text-blue-50 max-w-3xl mx-auto">
                The complete guide to building a profitable painting contractor business that generates $500K-$2M+ in annual revenue
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/trial-signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Your Business Right
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pillars/how-to-price-painting-jobs">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn Pricing Strategies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-gray-200">
                <CardContent className="pt-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">$65-85/hr</div>
                  <p className="text-sm text-gray-600">Average painter income</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.5% CAGR</div>
                  <p className="text-sm text-gray-600">Industry growth rate</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="pt-6 text-center">
                  <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">400K+</div>
                  <p className="text-sm text-gray-600">Painting businesses in US</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="pt-6 text-center">
                  <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">35-50%</div>
                  <p className="text-sm text-gray-600">Typical profit margins</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Startup Guide */}
        <div className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Your 4-Step Startup Roadmap
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {startupSteps.map((phase) => (
                <Card key={phase.step} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {phase.step}
                      </div>
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Strategies */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">
              Proven Growth Strategies
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Scale from owner-operator to $1M+ painting business with these strategies
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {growthStrategies.map((strategy, idx) => (
                <Card key={idx} className="border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        {strategy.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{strategy.title}</h3>
                        <p className="text-gray-600">{strategy.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-900">
                  8 Costly Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="text-red-600 mt-1">✗</div>
                      <span className="text-gray-700">{mistake}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resources Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Essential Business Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/pillars/painting-cost-calculator">
                <Card className="border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <Calculator className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Pricing Calculator</h3>
                    <p className="text-gray-600">Calculate accurate job costs and profit margins</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pillars/painting-estimate-templates">
                <Card className="border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <FileText className="h-8 w-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Quote Templates</h3>
                    <p className="text-gray-600">Professional templates that win more jobs</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pillars/painting-estimate-software">
                <Card className="border-gray-200 hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <BarChart3 className="h-8 w-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-2">Business Software</h3>
                    <p className="text-gray-600">Tools to automate and scale your business</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Build Your Painting Empire?
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Join thousands of successful painting contractors using PaintQuote Pro to streamline operations and win more jobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trial-signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/roi-calculator">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Calculate Your ROI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}