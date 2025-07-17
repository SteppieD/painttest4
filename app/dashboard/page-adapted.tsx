import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MobileQuoteButton } from '@/components/mobile-quote-button'
import { TrendingUp, Clock, DollarSign, Users, FileText, Percent, Lock } from 'lucide-react'
import Link from 'next/link'
import { QuoteUsageIndicator } from '@/components/quote-usage-indicator'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface AuthPayload {
  userId: number
  companyId: number
  email: string
  role: string
}

async function getDashboardData(companyId: number) {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Get company data from old schema
    const company: any = await prisma.$queryRaw`
      SELECT * FROM companies WHERE id = ${companyId} LIMIT 1
    `
    
    const companyData = company[0]

    // Get quotes data (assuming quotes table exists)
    const quotes: any[] = await prisma.$queryRaw`
      SELECT * FROM quotes 
      WHERE company_id = ${companyId} 
      ORDER BY created_at DESC
    ` || []

    const totalQuotes = quotes.length
    const acceptedQuotes = quotes.filter((q: any) => q.status === 'accepted').length
    
    // Get unique customers
    const uniqueCustomers = new Set(quotes.map((q: any) => q.customer_email)).size

    // Calculate total quoted amount
    const totalQuotedAmount = quotes.reduce((sum: number, q: any) => {
      return sum + (parseFloat(q.total_amount) || 0)
    }, 0)

    // Get monthly data
    const monthlyQuotes = quotes.filter((q: any) => {
      const createdAt = new Date(q.created_at)
      return createdAt >= thirtyDaysAgo
    })

    const monthlyQuotedAmount = monthlyQuotes.reduce((sum: number, q: any) => {
      return sum + (parseFloat(q.total_amount) || 0)
    }, 0)

    const monthlyRevenue = monthlyQuotes
      .filter((q: any) => q.status === 'accepted')
      .reduce((sum: number, q: any) => {
        return sum + (parseFloat(q.total_amount) || 0)
      }, 0)

    const conversionRate = totalQuotes > 0 
      ? Math.round((acceptedQuotes / totalQuotes) * 100)
      : 0

    return {
      company: companyData,
      totalQuotes,
      acceptedQuotes,
      totalCustomers: uniqueCustomers,
      conversionRate,
      recentQuotes: quotes.slice(0, 5),
      totalQuotedAmount,
      monthlyQuotedAmount,
      monthlyRevenue,
      avgResponseTime: null,
    }
}

export default async function DashboardPage() {
  const token = cookies().get('auth-token')?.value
  
  if (!token) {
    return <div>Please login</div>
  }
  
  const user = jwt.verify(token!, JWT_SECRET) as AuthPayload
  
  const data = await getDashboardData(user.companyId)
  
  // Check if free or paid user based on quote limit
  const isPaidUser = !data.company.quote_limit || data.company.quote_limit > 5

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Welcome back! Here&apos;s an overview of your business.
          </p>
        </div>
        {!isPaidUser && (
          <div className="w-full sm:w-72">
            <QuoteUsageIndicator companyId={user.companyId} />
          </div>
        )}
      </div>
      
      <MobileQuoteButton />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalQuotes}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quoted</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(data.totalQuotedAmount / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">All time value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Total customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Quote to sale</p>
          </CardContent>
        </Card>

        {/* Premium metrics - locked for free users */}
        <Card className={!isPaidUser ? "relative overflow-hidden" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isPaidUser ? (
              <>
                <div className="text-2xl font-bold">${(data.monthlyRevenue / 1000).toFixed(1)}k</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold blur-sm">$12.4k</div>
                <p className="text-xs text-muted-foreground blur-sm">Last 30 days</p>
              </>
            )}
          </CardContent>
          {!isPaidUser && (
            <Link href="/pricing" className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-colors">
              <div className="text-center">
                <Lock className="h-5 w-5 mx-auto mb-1" />
                <p className="text-xs font-medium">Pro Feature</p>
              </div>
            </Link>
          )}
        </Card>
      </div>

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentQuotes.map((quote: any) => (
              <div
                key={quote.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{quote.customer_name || 'Unknown Customer'}</p>
                  <p className="text-sm text-muted-foreground">
                    #{quote.id} • ${quote.total_amount || '0'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm capitalize">{quote.status || 'draft'}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(quote.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}