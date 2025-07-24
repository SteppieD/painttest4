"use client"

import { MobileQuoteButton } from '@/components/mobile-quote-button'
import { TrendingUp, Clock, DollarSign, Users, FileText, Percent, Lock, ArrowRight, Sparkles, Target, Activity, TrendingDown, BarChart, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QuoteUsageIndicator } from '@/components/quote-usage-indicator-client'
import { ClientDate } from '@/components/client-date'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AchievementDisplay } from '@/components/achievements/achievement-display'

interface DashboardData {
  companyName: string
  totalQuotes: number
  uniqueCustomers: number
  totalQuotedAmount: number
  acceptedQuotes: number
  acceptanceRate: number
  monthlyQuotes: number
  monthlyQuotedAmount: number
  recentQuotes: any[]
  quotesUsed: number
  quotesLimit: number
  hasUnlimitedQuotes: boolean
  subscriptionTier: 'free' | 'pro' | 'enterprise'
  avgQuoteValue: number
  conversionTrend: number[]
  topCustomers: { name: string; value: number; jobs: number }[]
}

export function ClientDashboard() {
  const companyData = useCompanyAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    console.log('ClientDashboard - companyData:', companyData)
    
    if (!authChecked) {
      setTimeout(() => {
        setAuthChecked(true)
      }, 500)
      return
    }
    
    if (!companyData && authChecked) {
      console.log('No company data after auth check, redirecting to access-code')
      router.push('/access-code')
      return
    }
    
    if (!companyData) {
      return
    }

    // Fetch real usage data
    fetchDashboardData()
  }, [companyData, router, authChecked])

  const fetchDashboardData = async () => {
    try {
      // Fetch usage data
      const response = await fetch('/api/companies/usage', {
        headers: {
          'x-company-data': JSON.stringify({ 
            id: companyData?.id,
            access_code: companyData?.accessCode 
          })
        }
      });
      
      if (response.ok) {
        const usage = await response.json();
        
        // Mock data combined with real usage data
        setDashboardData({
          companyName: companyData.name || 'Unknown Company',
          totalQuotes: 127,
          uniqueCustomers: 89,
          totalQuotedAmount: 342500,
          acceptedQuotes: 76,
          acceptanceRate: 59.8,
          monthlyQuotes: usage.currentMonth.quotesCreated,
          monthlyQuotedAmount: 67200,
          recentQuotes: [
            { id: 1, customer: 'John Smith', amount: 3200, status: 'pending', date: new Date() },
            { id: 2, customer: 'Sarah Johnson', amount: 4500, status: 'accepted', date: new Date() },
            { id: 3, customer: 'Mike Davis', amount: 2800, status: 'pending', date: new Date() },
          ],
          quotesUsed: usage.currentMonth.quotesCreated,
          quotesLimit: usage.currentMonth.limit,
          hasUnlimitedQuotes: usage.currentMonth.limit === -1,
          subscriptionTier: companyData.subscription_tier || 'free',
          avgQuoteValue: 2833,
          conversionTrend: [45, 52, 48, 65, 58, 72],
          topCustomers: [
            { name: 'Johnson Properties', value: 45200, jobs: 12 },
            { name: 'Smith Real Estate', value: 38500, jobs: 8 },
            { name: 'Davis Construction', value: 28900, jobs: 6 }
          ]
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data
      setDashboardData({
        companyName: companyData.name || 'Unknown Company',
        totalQuotes: 127,
        uniqueCustomers: 89,
        totalQuotedAmount: 342500,
        acceptedQuotes: 76,
        acceptanceRate: 59.8,
        monthlyQuotes: 24,
        monthlyQuotedAmount: 67200,
        recentQuotes: [
          { id: 1, customer: 'John Smith', amount: 3200, status: 'pending', date: new Date() },
          { id: 2, customer: 'Sarah Johnson', amount: 4500, status: 'accepted', date: new Date() },
          { id: 3, customer: 'Mike Davis', amount: 2800, status: 'pending', date: new Date() },
        ],
        quotesUsed: 1,
        quotesLimit: 5,
        hasUnlimitedQuotes: false,
        subscriptionTier: companyData?.subscription_tier || 'free',
        avgQuoteValue: 2833,
        conversionTrend: [45, 52, 48, 65, 58, 72],
        topCustomers: [
          { name: 'Johnson Properties', value: 45200, jobs: 12 },
          { name: 'Smith Real Estate', value: 38500, jobs: 8 },
          { name: 'Davis Construction', value: 28900, jobs: 6 }
        ]
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-white font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const isPro = dashboardData.subscriptionTier !== 'free'

  const stats = [
    {
      title: 'Total Quotes',
      value: dashboardData.totalQuotes,
      change: '+12%',
      icon: FileText,
      color: 'from-blue-400 to-cyan-400',
      locked: false
    },
    {
      title: 'Win Rate',
      value: `${dashboardData.acceptanceRate}%`,
      change: '+5%',
      icon: Percent,
      color: 'from-emerald-400 to-green-400',
      locked: !isPro,
      lockedText: 'Unlock win rate analytics'
    },
    {
      title: 'Total Revenue',
      value: `$${dashboardData.totalQuotedAmount.toLocaleString()}`,
      change: '+18%',
      icon: DollarSign,
      color: 'from-purple-400 to-pink-400',
      locked: !isPro,
      lockedText: 'Track revenue metrics'
    },
    {
      title: 'Active Customers',
      value: dashboardData.uniqueCustomers,
      change: '+8%',
      icon: Users,
      color: 'from-amber-400 to-orange-400',
      locked: false
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back to {dashboardData.companyName}
            </h1>
            <p className="text-gray-300">
              Create professional quotes in under 2 minutes with AI assistance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <MobileQuoteButton />
            <Link href="/create-quote" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <button className="relative btn-primary-modern inline-flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Create New Quote
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Setup Reminder - Show if onboarding not completed */}
      {companyData && !companyData.onboarding_completed && (
        <Card className="glass-card border-amber-500/50 bg-amber-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Complete Your Business Setup</h3>
                <p className="text-sm text-gray-300 mb-3">
                  Finish setting up your business profile to unlock all features and start creating professional quotes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/onboarding/chat">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Complete Setup with AI
                    </Button>
                  </Link>
                  <Link href="/onboarding">
                    <Button size="sm" variant="outline" className="border-amber-500/50 text-white hover:bg-amber-500/10">
                      Use Classic Form
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Quote Card - Show for new users */}
      {dashboardData.totalQuotes === 0 && (
        <Card className="glass-card border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">
                  See PaintQuote Pro in Action - 60 Second Demo!
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Watch how fast you can create professional quotes. We&apos;ll show you with a real example.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/create-quote?demo=true">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Try Demo Quote (60 seconds)
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Save 6 hours per quote</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quote Usage */}
      <QuoteUsageIndicator />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          
          if (stat.locked) {
            return (
              <Link key={index} href="/dashboard/settings/billing">
                <div className="glass-card p-6 group card-hover-modern relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/50 z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 font-medium">{stat.lockedText}</p>
                      <p className="text-xs text-blue-400 mt-1">Upgrade to Pro</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between mb-4 opacity-50">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">--</span>
                  </div>
                  <div className="space-y-1 opacity-50">
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-500">---</p>
                  </div>
                </div>
              </Link>
            )
          }
          
          return (
            <div key={index} className="glass-card p-6 group card-hover-modern">
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Quotes */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Recent Quotes
            </h2>
            <Link href="/dashboard/quotes" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          
          <div className="space-y-3">
            {dashboardData.recentQuotes.map((quote) => (
              <Link
                key={quote.id}
                href={`/dashboard/quotes/${quote.id}`}
                className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      {quote.customer}
                    </p>
                    <p className="text-sm text-gray-400">
                      <ClientDate date={quote.date} />
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">
                      ${quote.amount.toLocaleString()}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      quote.status === 'accepted' 
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-400" />
            Quick Actions
          </h2>
          
          <div className="space-y-3">
            <Link href="/create-quote" className="block p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl border border-blue-500/20 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <p className="font-medium text-white">AI Quote Assistant</p>
                  <p className="text-xs text-gray-400">Create quotes with AI help</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
            
            <Link href="/dashboard/customers" className="block p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20 rounded-xl border border-emerald-500/20 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-emerald-400" />
                <div className="flex-1">
                  <p className="font-medium text-white">Manage Customers</p>
                  <p className="text-xs text-gray-400">View customer database</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
            
            <Link href="/roi-calculator" className="block p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 rounded-xl border border-amber-500/20 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <div className="flex-1">
                  <p className="font-medium text-white">ROI Calculator</p>
                  <p className="text-xs text-gray-400">Calculate your savings</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Achievement Display */}
      <div className="mt-6">
        <AchievementDisplay />
      </div>

      {/* Performance Metrics - Free users see basic version */}
      {isPro ? (
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Performance This Month
            </h2>
            <span className="text-sm text-gray-400">
              <ClientDate date={new Date()} options={{ year: 'numeric', month: 'long' }} />
            </span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - dashboardData.acceptanceRate / 100)}`}
                    className="text-emerald-400 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{dashboardData.acceptanceRate}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">Quote Acceptance Rate</p>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold text-purple-400 mb-2">{dashboardData.monthlyQuotes}</p>
              <p className="text-sm text-gray-400">Quotes This Month</p>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold text-blue-400 mb-2">
                ${dashboardData.monthlyQuotedAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Monthly Revenue</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/70 z-10 flex items-center justify-center">
            <div className="text-center">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Unlock Performance Analytics</h3>
              <p className="text-gray-400 mb-4 max-w-sm">
                Track your acceptance rates, revenue trends, and business growth with Pro analytics
              </p>
              <Link href="/dashboard/settings/billing">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
          <div className="opacity-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Performance This Month</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4"></div>
                <p className="text-sm text-gray-400">Quote Acceptance Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-600 mb-2">--</p>
                <p className="text-sm text-gray-400">Quotes This Month</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-600 mb-2">$--</p>
                <p className="text-sm text-gray-400">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Analytics Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversion Trends */}
        {isPro ? (
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-400" />
              Conversion Trends
            </h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {dashboardData.conversionTrend.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                    style={{ height: `${(value / 100) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">6-month average</p>
              <p className="text-lg font-semibold text-white">
                {Math.round(dashboardData.conversionTrend.reduce((a, b) => a + b) / dashboardData.conversionTrend.length)}%
              </p>
            </div>
          </div>
        ) : (
          <Link href="/dashboard/settings/billing">
            <div className="glass-card p-6 relative overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/50 z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-white">Conversion Trends</p>
                  <p className="text-xs text-blue-400 mt-1">Pro Feature</p>
                </div>
              </div>
              <div className="opacity-20">
                <h3 className="text-lg font-bold text-white mb-4">Conversion Trends</h3>
                <div className="h-48 bg-gray-800 rounded"></div>
              </div>
            </div>
          </Link>
        )}

        {/* Top Customers */}
        {isPro ? (
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Top Customers
            </h3>
            <div className="space-y-3">
              {dashboardData.topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{customer.name}</p>
                    <p className="text-xs text-gray-400">{customer.jobs} jobs completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">${customer.value.toLocaleString()}</p>
                    <p className="text-xs text-emerald-400">+15%</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/customers" className="block mt-4 text-center text-sm text-blue-400 hover:text-blue-300">
              View all customers →
            </Link>
          </div>
        ) : (
          <Link href="/dashboard/settings/billing">
            <div className="glass-card p-6 relative overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/50 z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-white">Top Customers</p>
                  <p className="text-xs text-blue-400 mt-1">Pro Feature</p>
                </div>
              </div>
              <div className="opacity-20">
                <h3 className="text-lg font-bold text-white mb-4">Top Customers</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-800 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Additional Premium Insights */}
      {!isPro && (
        <div className="glass-card p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="text-center max-w-2xl mx-auto">
            <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Unlock Advanced Analytics with Pro
            </h2>
            <p className="text-gray-300 mb-6">
              Get detailed insights into your business performance, track customer lifetime value, 
              monitor conversion trends, and make data-driven decisions to grow your painting business.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">40%</p>
                <p className="text-xs text-gray-400">Higher win rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">3x</p>
                <p className="text-xs text-gray-400">Faster quotes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">$8.4k</p>
                <p className="text-xs text-gray-400">Extra revenue/mo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">283x</p>
                <p className="text-xs text-gray-400">ROI on Pro</p>
              </div>
            </div>
            <Link href="/dashboard/settings/billing">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Sparkles className="h-5 w-5 mr-2" />
                Start 14-Day Free Trial
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}