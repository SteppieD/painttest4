import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    ])

    const conversionRate = totalQuotes > 0 
      ? Math.round((acceptedQuotes / totalQuotes) * 100)
      : 0

    return {
      totalQuotes,
      acceptedQuotes,
      totalCustomers,
      conversionRate,
      recentQuotes,
    }
}

export default async function DashboardPage() {
  const token = cookies().get('auth-token')?.value
  const user = jwt.verify(token!, JWT_SECRET) as AuthPayload
  
  const data = await getDashboardData(user.companyId)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalQuotes}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.acceptedQuotes}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Total customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Quote to sale</p>
          </CardContent>
        </Card>
      </div>

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