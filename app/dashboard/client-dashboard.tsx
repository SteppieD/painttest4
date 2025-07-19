"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MobileQuoteButton } from '@/components/mobile-quote-button'
import { TrendingUp, Clock, DollarSign, Users, FileText, Percent, Lock } from 'lucide-react'
import Link from 'next/link'
import { QuoteUsageIndicator } from '@/components/quote-usage-indicator-client'
import { ClientDate } from '@/components/client-date'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
}

export function ClientDashboard() {
  const companyData = useCompanyAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    console.log('ClientDashboard - companyData:', companyData);
    
    // Wait a bit before checking auth to avoid race conditions
    if (!authChecked) {
      setTimeout(() => {
        setAuthChecked(true);
      }, 500);
      return;
    }
    
    if (!companyData && authChecked) {
      console.log('No company data after auth check, redirecting to access-code');
      router.push('/access-code');
      return;
    }
    
    if (!companyData) {
      return;
    }

    // For now, use mock data
    // In a real implementation, we would fetch this from an API
    setDashboardData({
      companyName: companyData.name || 'Unknown Company',
      totalQuotes: 0,
      uniqueCustomers: 0,
      totalQuotedAmount: 0,
      acceptedQuotes: 0,
      acceptanceRate: 0,
      monthlyQuotes: 0,
      monthlyQuotedAmount: 0,
      recentQuotes: [],
      quotesUsed: 0,
      quotesLimit: 1,
      hasUnlimitedQuotes: false
    });
    setLoading(false);
  }, [companyData, router, authChecked]);

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{dashboardData.companyName} Dashboard</h1>
          <p className="text-gray-600">Send professional quotes in under 2 minutes</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/settings">
            <Button variant="outline">Settings</Button>
          </Link>
          <MobileQuoteButton />
          <Link href="/create-quote">
            <Button className="hidden sm:inline-flex">
              <FileText className="mr-2 h-4 w-4" />
              New Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* Quote Usage Indicator */}
      <QuoteUsageIndicator />

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quotes Sent</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalQuotes}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.monthlyQuotes} this month • Avg 2 min each
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.uniqueCustomers}</div>
            <p className="text-xs text-muted-foreground">Potential customers quoted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Potential</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dashboardData.totalQuotedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              ${dashboardData.monthlyQuotedAmount.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.acceptanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.acceptedQuotes} jobs won
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
          <CardDescription>Track quote status and follow up with leads</CardDescription>
        </CardHeader>
        <CardContent>
          {dashboardData.recentQuotes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">No quotes created yet</p>
              <p className="text-sm mb-4">Start winning more jobs with professional quotes</p>
              <Link href="/create-quote">
                <Button>Create Your First Quote</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.recentQuotes.map((quote: any) => (
                <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{quote.customer_name}</p>
                    <p className="text-sm text-gray-600">{quote.address}</p>
                    <ClientDate date={quote.created_at} className="text-xs text-gray-500" />
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${parseFloat(quote.final_price || quote.total_cost || 0).toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full inline-block ${
                      quote.status === 'accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : quote.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quote.status || 'Pending'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <Link href={`/quotes/${quote.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Quote</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">AI-powered quotes in under 2 minutes</p>
            <Link href="/create-quote">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                New Quote
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quote Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Follow up and close more deals</p>
            <Link href="/quotes">
              <Button variant="outline" className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                All Quotes
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Go Unlimited</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Quote more, win more, grow faster</p>
            <Link href="/pricing">
              <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                <Lock className="mr-2 h-4 w-4" />
                Upgrade Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}