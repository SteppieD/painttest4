'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, TrendingUp, DollarSign, Users, BarChart, Sparkles, ArrowRight, Lock, Activity, Percent, Clock } from 'lucide-react'
// Removed redirectToStripePayment - now using router.push to pricing page
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'
 // TODO: Check if this import is needed
export default function UnlockAnalyticsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
    }
  }, [router])

  const handleUpgrade = () => {
    setIsLoading(true)
    // Redirect to pricing page instead of direct Stripe link
    router.push('/pricing')
  }

  const features = [
    {
      icon: Percent,
      title: 'Win Rate Analytics',
      description: 'Track your quote acceptance rates and identify patterns to improve conversions',
      benefits: ['See acceptance trends', 'Compare by project type', 'Optimize pricing']
    },
    {
      icon: DollarSign,
      title: 'Revenue Tracking',
      description: 'Monitor your total revenue, average job values, and growth metrics',
      benefits: ['Real-time revenue data', 'Monthly comparisons', 'Profit analysis']
    },
    {
      icon: BarChart,
      title: 'Performance Insights',
      description: 'Get detailed analytics on quote performance and customer behavior',
      benefits: ['Conversion funnels', 'Customer lifetime value', 'Quote timing analysis']
    },
    {
      icon: Users,
      title: 'Customer Analytics',
      description: 'Understand your best customers and identify growth opportunities',
      benefits: ['Top customer reports', 'Repeat business tracking', 'Customer segments']
    }
  ]

  const testimonials = [
    {
      name: 'Mike Johnson',
      company: 'Premium Painters LLC',
      text: 'The analytics helped me increase my win rate by 40%. I can now see exactly which types of jobs convert best.',
      metric: '+40% win rate'
    },
    {
      name: 'Sarah Chen',
      company: 'ColorCraft Painting',
      text: 'Revenue tracking showed me I was underpricing commercial jobs. Fixed it and added $12k/month.',
      metric: '+$12k/month'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-gray-900/70">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-base mb-6">
              <Sparkles className="h-4 w-4" />
              Unlock Advanced Analytics
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6">
              Turn Data Into <span className="text-gradient-modern">More Wins</span>
            </h1>
            
            <p className="text-xl text-gray-100 mb-8">
              Professional contractors using our analytics see an average 40% increase in win rate 
              and $8,400 more revenue per month
            </p>

            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${selectedPlan === 'monthly' ? 'text-white' : 'text-gray-200'}`}>
                Monthly
              </span>
              <button
                onClick={() => setSelectedPlan(selectedPlan === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-gray-700 rounded-full transition-colors"
              >
                <div className={`absolute top-1 h-6 w-6 bg-white rounded-full transition-transform ${
                  selectedPlan === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                }`} />
              </button>
              <span className={`text-lg ${selectedPlan === 'yearly' ? 'text-white' : 'text-gray-200'}`}>
                Yearly
                <span className="text-base text-emerald-400 ml-2">Save 20%</span>
              </span>
            </div>

            {/* Price Display */}
            <div className="mb-8">
              <div className="text-5xl font-bold text-white mb-2">
                ${selectedPlan === 'monthly' ? '79' : '63'}/mo
              </div>
              <p className="text-gray-200">
                {selectedPlan === 'yearly' && 'Billed annually at $756/year'}
              </p>
            </div>

            <Button 
              size="lg" 
              onClick={handleUpgrade}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
            >
              {isLoading ? 'Loading...' : 'Unlock Analytics Now'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-base text-gray-200 mt-4">
              30-day money back guarantee • Cancel anytime
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Analytics That Drive Results
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="glass-card border-white/10">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl mb-2">{feature.title}</CardTitle>
                        <p className="text-gray-200">{feature.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-100">
                          <Check className="h-4 w-4 text-emerald-400" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Visual Analytics Preview */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-purple-500/20 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">See Your Business at a Glance</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Sample Metrics */}
                  <div className="text-center p-6 bg-gray-900/80 rounded-lg">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">76%</div>
                    <p className="text-gray-200">Average Win Rate</p>
                    <p className="text-base text-emerald-400 mt-2">↑ 12% from last month</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gray-900/80 rounded-lg">
                    <div className="text-4xl font-bold text-purple-400 mb-2">$124k</div>
                    <p className="text-gray-200">Monthly Revenue</p>
                    <p className="text-base text-purple-400 mt-2">↑ 23% from last month</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gray-900/80 rounded-lg">
                    <div className="text-4xl font-bold text-blue-400 mb-2">$3,200</div>
                    <p className="text-gray-200">Avg Quote Value</p>
                    <p className="text-base text-blue-400 mt-2">↑ 8% from last month</p>
                  </div>
                </div>

                {/* Chart Preview */}
                <div className="mt-8 p-6 bg-gray-900/80 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5 text-purple-400" />
                    <h4 className="text-lg font-semibold text-white">Revenue Trend</h4>
                  </div>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {[40, 55, 45, 70, 65, 85, 90].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t opacity-80" 
                        style={{ height: `${height}%` }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Contractors Love The Results
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-base text-gray-200">{testimonial.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-400">{testimonial.metric}</p>
                    </div>
                  </div>
                  <p className="text-gray-100 italic">&ldquo;{testimonial.text}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-purple-500/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Grow Your Business?
              </h3>
              <p className="text-gray-100 mb-6">
                Join hundreds of painting contractors who are winning more jobs and earning more revenue with data-driven insights.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-100">Setup in 30 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-100">30-day guarantee</span>
                </div>
              </div>

              <Button 
                size="lg" 
                onClick={handleUpgrade}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8"
              >
                {isLoading ? 'Loading...' : `Get Started Free - $${selectedPlan === 'monthly' ? '79' : '63'}/mo`}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}