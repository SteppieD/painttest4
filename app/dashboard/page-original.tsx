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

    const [
      totalQuotes,
      acceptedQuotes,
      totalCustomers,
      recentQuotes,
      allQuotes,
      monthlyQuotes,
      sentQuotes,
    ] = await Promise.all([
      prisma.quote.count({
        where: {
          companyId,
          deletedAt: null,
        },
      }),
      prisma.quote.count({
        where: {
          companyId,
          status: 'accepted',
          deletedAt: null,
        },
      }),
      prisma.customer.count({
        where: {
          companyId,
          deletedAt: null,
        },
      }),
      prisma.quote.findMany({
        where: {
          companyId,
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          customer: true,
        },
      }),
      prisma.quote.findMany({
        where: {
          companyId,
          deletedAt: null,
        },
        select: {
          totalAmount: true,
          status: true,
        },
      }),
      prisma.quote.findMany({
        where: {
          companyId,
          deletedAt: null,
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
        select: {
          totalAmount: true,
          status: true,
        },
      }),
      prisma.quote.findMany({
        where: {
          companyId,
          status: 'sent',
        },
        select: {
          createdAt: true,
          updatedAt: true,
        },
      }),
    ])

    // Calculate total quoted amount
    const totalQuotedAmount = allQuotes.reduce((sum, quote) => sum + quote.totalAmount.toNumber(), 0)
    const monthlyQuotedAmount = monthlyQuotes.reduce((sum, quote) => sum + quote.totalAmount.toNumber(), 0)
    
    // Calculate average response time
    let avgResponseTime = null
    if (sentQuotes.length > 0) {
      const responseTimes = sentQuotes
        .map(q => (q.updatedAt.getTime() - q.createdAt.getTime()) / (1000 * 60 * 60)) // hours
      avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
    }

    const conversionRate = totalQuotes > 0 
      ? Math.round((acceptedQuotes / totalQuotes) * 100)
      : 0

    // Calculate monthly revenue (accepted quotes only)
    const monthlyRevenue = monthlyQuotes
      .filter(q => q.status === 'accepted')
      .reduce((sum, quote) => sum + quote.totalAmount.toNumber(), 0)

    return {
      totalQuotes,
      acceptedQuotes,
      totalCustomers,
      conversionRate,
      recentQuotes,
      totalQuotedAmount,
      monthlyQuotedAmount,
      monthlyRevenue,
      avgResponseTime,
    }
}

export default async function DashboardPage() {
  const token = cookies().get('auth-token')?.value
  const user = jwt.verify(token!, JWT_SECRET) as AuthPayload
  
  const data = await getDashboardData(user.companyId)
  
  // TODO: Check actual user plan from database
  const isPaidUser = false // For now, assume all users are on free plan

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
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isPaidUser ? (
              <>
                <div className="text-2xl font-bold">
                  {data.avgResponseTime ? `${data.avgResponseTime.toFixed(1)}h` : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Quote to delivery</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold blur-sm">18.5h</div>
                <p className="text-xs text-muted-foreground blur-sm">Quote to delivery</p>
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

        <Card className={!isPaidUser ? "relative overflow-hidden" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isPaidUser ? (
              <>
                <div className="text-2xl font-bold">${(data.monthlyQuotedAmount / 1000).toFixed(1)}k</div>
                <p className="text-xs text-muted-foreground">Quotes this month</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold blur-sm">$28.3k</div>
                <p className="text-xs text-muted-foreground blur-sm">Quotes this month</p>
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

        <Card className={!isPaidUser ? "relative overflow-hidden" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Quote Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isPaidUser ? (
              <>
                <div className="text-2xl font-bold">
                  ${data.totalQuotes > 0 ? (data.totalQuotedAmount / data.totalQuotes).toFixed(0) : '0'}
                </div>
                <p className="text-xs text-muted-foreground">Per quote</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold blur-sm">$2,850</div>
                <p className="text-xs text-muted-foreground blur-sm">Per quote</p>
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

      {/* Upgrade Prompt for Free Users */}
      {!isPaidUser && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Unlock Advanced Analytics
            </CardTitle>
            <CardDescription>
              Get insights that help you win more jobs and grow revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Free users are winning 25% of quotes.</span>{' '}
                  Pro users win <span className="font-semibold text-primary">65% of quotes</span>.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Track response times to beat competitors</li>
                  <li>• See monthly revenue and pipeline trends</li>
                  <li>• Analyze which quote types convert best</li>
                </ul>
              </div>
              <Link href="/pricing">
                <Button>
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentQuotes.map((quote) => (
              <div
                key={quote.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{quote.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {quote.quoteNumber} • ${quote.totalAmount.toString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm capitalize">{quote.status}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(quote.createdAt).toLocaleDateString()}
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