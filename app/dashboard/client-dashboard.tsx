"use client"

import { MobileQuoteButton } from '@/components/mobile-quote-button'
import { TrendingUp, Clock, DollarSign, Users, FileText, Percent, Lock, ArrowRight, Sparkles, Target, Activity, BarChart, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QuoteUsageIndicator } from '@/components/quote-usage-indicator-client'
import { ClientDate } from '@/components/client-date'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AchievementDisplay } from '@/components/achievements/achievement-display'
import { ROIWidget } from '@/components/roi-widget'
import { usePageFeatureTracking } from '@/hooks/use-feature-tracking'
import { ShareRewardWidget } from '@/components/sharing/share-reward-widget'
import { QuickUpgradeButton } from '@/components/quick-upgrade-button'
interface DashboardData {
  companyName: string
  totalQuotes: number
  uniqueCustomers: number
  totalQuotedAmount: number
  acceptedQuotes: number
  acceptanceRate: number
  monthlyQuotes: number
  monthlyQuotedAmount: number
  recentQuotes: unknown[]
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
  
  // Track dashboard feature usage
  usePageFeatureTracking('dashboard')

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
            access_code: companyData?.access_code 
          })
        }
      });
      
      if (response.ok) {
        const usage = await response.json();
        
        // Use real data for new companies - no demo data
        setDashboardData({
          companyName: companyData?.name || 'Unknown Company',
          totalQuotes: 0, // Start fresh
          uniqueCustomers: 0,
          totalQuotedAmount: 0,
          acceptedQuotes: 0,
          acceptanceRate: 0,
          monthlyQuotes: usage.currentMonth.quotesCreated,
          monthlyQuotedAmount: 0,
          recentQuotes: [], // No demo quotes
          quotesUsed: usage.currentMonth.quotesCreated,
          quotesLimit: usage.currentMonth.limit,
          hasUnlimitedQuotes: usage.currentMonth.limit === -1,
          subscriptionTier: companyData?.subscription_tier || 'free',
          avgQuoteValue: 0,
          conversionTrend: [],
          topCustomers: []
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to empty data for new companies
      setDashboardData({
        companyName: companyData?.name || 'Unknown Company',
        totalQuotes: 0,
        uniqueCustomers: 0,
        totalQuotedAmount: 0,
        acceptedQuotes: 0,
        acceptanceRate: 0,
        monthlyQuotes: 0,
        monthlyQuotedAmount: 0,
        recentQuotes: [],
        quotesUsed: 0,
        quotesLimit: 5,
        hasUnlimitedQuotes: false,
        subscriptionTier: companyData?.subscription_tier || 'free',
        avgQuoteValue: 0,
        conversionTrend: [],
        topCustomers: []
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-100 animate-pulse"></div>
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
      value: dashboardData.totalQuotes > 0 ? dashboardData.totalQuotes : 'Start Creating',
      change: dashboardData.totalQuotes > 0 ? '+12%' : '',
      icon: FileText,
      color: 'from-blue-400 to-cyan-400',
      locked: false,
      emptyMessage: 'Create your first quote!',
      href: '/dashboard/quotes',
      description: 'View all quotes'
    },
    {
      title: 'Win Rate',
      value: dashboardData.totalQuotes > 0 ? `${dashboardData.acceptanceRate}%` : 'Coming Soon',
      change: dashboardData.totalQuotes > 0 ? '+5%' : '',
      icon: Percent,
      color: 'from-emerald-400 to-green-400',
      locked: !isPro,
      lockedText: 'Unlock win rate analytics',
      href: '/dashboard/analytics/performance',
      description: 'Performance metrics'
    },
    {
      title: 'Total Revenue',
      value: dashboardData.totalQuotedAmount > 0 ? `$${dashboardData.totalQuotedAmount.toLocaleString()}` : 'Track Sales',
      change: dashboardData.totalQuotedAmount > 0 ? '+18%' : '',
      icon: DollarSign,
      color: 'from-purple-400 to-pink-400',
      locked: !isPro,
      lockedText: 'Track revenue metrics',
      href: '/dashboard/analytics/revenue',
      description: 'Revenue insights'
    },
    {
      title: 'Active Customers',
      value: dashboardData.uniqueCustomers > 0 ? dashboardData.uniqueCustomers : 'Build Your Base',
      change: dashboardData.uniqueCustomers > 0 ? '+8%' : '',
      icon: Users,
      color: 'from-amber-400 to-orange-400',
      locked: false,
      href: '/dashboard/analytics/customers',
      description: 'Customer insights'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back to {dashboardData.companyName}
            </h1>
            <p className="text-gray-100">
              Create professional quotes in under 2 minutes with AI assistance
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <MobileQuoteButton />
            <Link href="/create-quote" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <button className="relative btn-primary-modern inline-flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Create New Quote
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>


      {/* Setup Reminder - Show if onboarding not completed and not skipped */}
      {companyData && !companyData.onboarding_completed && !companyData.skipOnboarding && (
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-amber-500/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Complete Your Business Setup</h3>
                <p className="text-base text-gray-100 mb-3">
                  Finish setting up your business profile to unlock all features and start creating professional quotes.
                </p>
                <div className="flex gap-3">
                  <Link href="/onboarding">
                    <Button size="default" className="bg-amber-500 hover:bg-amber-600 text-black">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Complete Setup
                    </Button>
                  </Link>
                  <Button 
                    size="default"
                    variant="outline" 
                    className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700"
                    onClick={() => {
                      // Update local storage to hide reminder
                      const stored = localStorage.getItem('paintquote_company');
                      if (stored) {
                        const data = JSON.parse(stored);
                        localStorage.setItem('paintquote_company', JSON.stringify({
                          ...data,
                          skipOnboarding: true
                        }));
                        // Use router instead of window.location.reload to avoid hydration issues
                        router.refresh();
                      }
                    }}
                  >
                    Skip for Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Quote Card - Show for new users */}
      {(dashboardData.totalQuotes === 0 || companyData?.isNewCompany) && (
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-purple-500/50  from-purple-500/10 to-blue-500/10">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">
                  See PaintQuote Pro in Action - 60 Second Demo!
                </h3>
                <p className="text-base text-gray-100 mb-4">
                  Watch how fast you can create professional quotes. We&apos;ll show you with a real example.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/create-quote?demo=true">
                    <Button 
                      size="default" 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Try Demo Quote (60 seconds)
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-base text-gray-200">
                    <Clock className="h-4 w-4" />
                    <span>Save 6 hours per quote</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Upgrade Banner for Free Users */}
      {dashboardData.subscriptionTier === 'free' && dashboardData.quotesUsed >= 3 && (
        <div className="mb-6">
          <QuickUpgradeButton variant="banner" />
        </div>
      )}
      
      {/* ROI Widget - Show for all users */}
      <ROIWidget 
        companyName={dashboardData.companyName}
        avgQuoteValue={dashboardData.totalQuotedAmount && dashboardData.totalQuotes > 0 ? 
          Math.round(dashboardData.totalQuotedAmount / dashboardData.totalQuotes) : 2500
        }
        quotesPerMonth={dashboardData.monthlyQuotes || 10}
      />

      {/* Quote Usage */}
      <QuoteUsageIndicator />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          
          if (stat.locked) {
            return (
              <Link
                key={index} 
                href="/unlock-analytics"
                className="block"
              >
                <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 group card-hover-modern relative overflow-hidden cursor-pointer">
                <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/50 z-10 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-base text-gray-200 font-medium">{stat.lockedText}</p>
                    <p className="text-base text-blue-400 mt-1">Upgrade to Pro</p>
                  </div>
                </div>
                <div className="flex items-start justify-between mb-4 opacity-80">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-base font-medium text-gray-200">--</span>
                </div>
                <div className="space-y-1 opacity-80">
                  <p className="text-base text-gray-200">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-200">---</p>
                </div>
              </div>
              </Link>
            )
          }
          
          const StatContent = (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                {stat.change && (
                  <span className={`text-base font-medium ${
                    stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-base text-gray-200">{stat.title}</p>
                <p className={`text-2xl font-bold ${typeof stat.value === 'string' && (stat.value.includes('Start') || stat.value.includes('Coming') || stat.value.includes('Track') || stat.value.includes('Build')) ? 'text-gray-200' : 'text-white'}`}>
                  {stat.value}
                </p>
                {stat.emptyMessage && dashboardData.totalQuotes === 0 && (
                  <p className="text-base text-blue-400 mt-1">{stat.emptyMessage}</p>
                )}
                {stat.description && (
                  <p className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {stat.description} →
                  </p>
                )}
              </div>
            </>
          )
          
          if (stat.href) {
            return (
              <Link
                key={index}
                href={stat.href}
                className="block"
              >
                <div className="glass-card p-6 group card-hover-modern cursor-pointer hover:border-blue-500/30 transition-all">
                  {StatContent}
                </div>
              </Link>
            )
          }
          
          return (
            <div key={index} className="glass-card p-6 group card-hover-modern">
              {StatContent}
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Quotes */}
        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Recent Quotes
            </h2>
            <Link href="/dashboard/quotes" className="text-base text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          
          <div className="space-y-3">
            {dashboardData.recentQuotes.length > 0 ? (
              dashboardData.recentQuotes.map((quote: any) => (
                <Link
                  key={quote.id}
                  href={`/dashboard/quotes/${quote.id}`}
                  className="block p-4 bg-gray-900/80 hover:bg-gray-900/70 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {quote.customer}
                      </p>
                      <p className="text-base text-gray-200">
                        <ClientDate date={quote.date} />
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        ${(quote.amount || 0).toLocaleString()}
                      </p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-base font-medium ${
                        quote.status === 'accepted' 
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Your First Quote Awaits!</h3>
                <p className="text-base text-gray-200 mb-4">
                  Create your first professional quote in under 2 minutes
                </p>
                <Link href="/create-quote">
                  <Button size="default" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create Your First Quote
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Share & Earn Widget */}
          {companyData?.id && (
            <ShareRewardWidget companyId={companyData.id} variant="dashboard" />
          )}
          
          {/* Quick Actions */}
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
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
                    <p className="text-base text-gray-200">Create quotes with AI help</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
              
              <Link href="/dashboard/customers" className="block p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20 rounded-xl border border-emerald-500/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <div className="flex-1">
                    <p className="font-medium text-white">Manage Customers</p>
                    <p className="text-base text-gray-200">View customer database</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
              
              <Link href="/roi-calculator" className="block p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 rounded-xl border border-amber-500/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                  <div className="flex-1">
                    <p className="font-medium text-white">ROI Calculator</p>
                    <p className="text-base text-gray-200">Calculate your savings</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-200 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Display */}
      <div className="mt-6">
        <AchievementDisplay />
      </div>

      {/* Performance Metrics - Free users see basic version */}
      {isPro ? (
        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Performance This Month
            </h2>
            <span className="text-base text-gray-200">
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
              <p className="text-base text-gray-200">Quote Acceptance Rate</p>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold text-purple-400 mb-2">{dashboardData.monthlyQuotes}</p>
              <p className="text-base text-gray-200">Quotes This Month</p>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold text-blue-400 mb-2">
                ${dashboardData.monthlyQuotedAmount.toLocaleString()}
              </p>
              <p className="text-base text-gray-200">Monthly Revenue</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8 relative overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/70 z-10 flex items-center justify-center">
            <div className="text-center">
              <Lock className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Unlock Performance Analytics</h3>
              <p className="text-gray-200 mb-4 max-w-sm">
                Track your acceptance rates, revenue trends, and business growth with Pro analytics
              </p>
              <Link href="/unlock-analytics">
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
                <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-16 w-16 text-gray-700" />
                </div>
                <p className="text-base text-gray-200">Quote Acceptance Rate</p>
                <p className="text-base text-blue-400 mt-1">Create quotes to track</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-600 mb-2">--</p>
                <p className="text-base text-gray-200">Quotes This Month</p>
                <p className="text-base text-blue-400 mt-1">Start with your first</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-600 mb-2">$--</p>
                <p className="text-base text-gray-200">Monthly Revenue</p>
                <p className="text-base text-blue-400 mt-1">Revenue tracking ready</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Analytics Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversion Trends */}
        {isPro ? (
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-400" />
              Conversion Trends
            </h3>
            {dashboardData.conversionTrend.length > 0 ? (
              <>
                <div className="h-48 flex items-end justify-between gap-2">
                  {dashboardData.conversionTrend.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                        style={{ height: `${(value / 100) * 100}%` }}
                      />
                      <span className="text-base text-gray-200">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-base text-gray-200">6-month average</p>
                  <p className="text-lg font-semibold text-white">
                    {Math.round(dashboardData.conversionTrend.reduce((a, b) => a + b) / dashboardData.conversionTrend.length)}%
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <BarChart className="h-12 w-12 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-200">No data yet</p>
                <p className="text-base text-blue-400 mt-1">Create quotes to see trends</p>
              </div>
            )}
          </div>
        ) : (
          <Link href="/unlock-analytics">
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 relative overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/50 z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-base font-medium text-white">Conversion Trends</p>
                  <p className="text-base text-blue-400 mt-1">Pro Feature</p>
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
          <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Top Customers
            </h3>
            {dashboardData.topCustomers.length > 0 ? (
              <>
                <div className="space-y-3">
                  {dashboardData.topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-900/80 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{customer.name}</p>
                        <p className="text-base text-gray-200">{customer.jobs} jobs completed</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">${customer.value.toLocaleString()}</p>
                        <p className="text-base text-emerald-400">+15%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/customers" className="block mt-4 text-center text-base text-blue-400 hover:text-blue-300">
                  View all customers →
                </Link>
              </>
            ) : (
              <div className="text-center py-16">
                <Users className="h-12 w-12 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-200">No customers yet</p>
                <p className="text-base text-blue-400 mt-1">Your best clients will appear here</p>
              </div>
            )}
          </div>
        ) : (
          <Link href="/unlock-analytics">
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-6 relative overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/50 z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-base font-medium text-white">Top Customers</p>
                  <p className="text-base text-blue-400 mt-1">Pro Feature</p>
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
        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8  from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <div className="text-center max-w-2xl mx-auto">
            <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Unlock Advanced Analytics with Pro
            </h2>
            <p className="text-gray-100 mb-6">
              Get detailed insights into your business performance, track customer lifetime value, 
              monitor conversion trends, and make data-driven decisions to grow your painting business.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">40%</p>
                <p className="text-base text-gray-200">Higher win rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">3x</p>
                <p className="text-base text-gray-200">Faster quotes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">$8.4k</p>
                <p className="text-base text-gray-200">Extra revenue/mo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-400">283x</p>
                <p className="text-base text-gray-200">ROI on Pro</p>
              </div>
            </div>
            <Link href="/unlock-analytics">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Free Forever Plan
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}