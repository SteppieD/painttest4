import { notFound } from 'next/navigation'
import { db } from '@/lib/database/adapter'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, DollarSign, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface AuthPayload {
  userId: number
  companyId: number
  email: string
  role: string
}

async function getAuth(): Promise<AuthPayload | null> {
  const token = cookies().get('auth-token')?.value
  if (!token) return null
  
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload
  } catch {
    return null
  }
}

async function getCustomer(id: string, companyId: number) {
  const customer = await db.get(
    `SELECT * FROM customers WHERE id = ? AND company_id = ?`,
    [id, companyId]
  )
  
  if (!customer) return null
  
  // Get quotes for this customer
  const quotes = await db.getAll(
    `SELECT q.*, u.email as created_by_email
     FROM quotes q
     LEFT JOIN users u ON q.created_by = u.id
     WHERE q.customer_id = ?
     ORDER BY q.created_at DESC`,
    [id]
  )
  
  // Transform quotes to include nested createdBy object
  const transformedQuotes = quotes?.map(quote => ({
    ...quote,
    createdBy: quote.created_by_email ? {
      email: quote.created_by_email
    } : null
  })) || []
  
  return {
    ...customer,
    quotes: transformedQuotes
  }
}

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const auth = await getAuth()
  if (!auth) {
    return notFound()
  }

  const customer = await getCustomer(params.id, auth.companyId)
  if (!customer) {
    return notFound()
  }

  // Calculate customer stats
  const acceptedQuotes = customer.quotes.filter(q => q.status === 'accepted')
  const totalRevenue = acceptedQuotes.reduce((sum, q) => sum + Number(q.total_amount || 0), 0)
  const avgQuoteValue = customer.quotes.length > 0 
    ? customer.quotes.reduce((sum, q) => sum + Number(q.total_amount || 0), 0) / customer.quotes.length 
    : 0
  const winRate = customer.quotes.length > 0 
    ? (acceptedQuotes.length / customer.quotes.length) * 100 
    : 0

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/customers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Customers
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {customer.name}
            </h1>
            <p className="text-muted-foreground">
              Customer since {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Link href="/dashboard/quotes/new">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </Link>
      </div>

      {/* Customer Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {customer.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${customer.email}`} className="hover:underline">
                  {customer.email}
                </a>
              </div>
            )}
            {customer.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${customer.phone}`} className="hover:underline">
                  {customer.phone}
                </a>
              </div>
            )}
            {customer.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{customer.address}</span>
              </div>
            )}
            {customer.createdAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Added on {new Date(customer.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Quotes</p>
                <p className="text-2xl font-bold">{customer.quotes.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold">{winRate.toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Quote Value</p>
                <p className="text-2xl font-bold">${avgQuoteValue.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote History */}
      <Card>
        <CardHeader>
          <CardTitle>Quote History</CardTitle>
          <CardDescription>
            All quotes created for this customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customer.quotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No quotes created yet
            </div>
          ) : (
            <div className="space-y-4">
              {customer.quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/dashboard/quotes/${quote.id}`}
                        className="font-medium hover:underline"
                      >
                        {quote.quoteNumber}
                      </Link>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">{quote.projectType}</span>
                        <span>•</span>
                        <span>Created by {quote.createdBy.name || quote.createdBy.email}</span>
                      </div>
                      {quote.description && (
                        <p className="text-sm text-muted-foreground mt-2">{quote.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${quote.totalAmount.toFixed(2)}</div>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mt-1",
                        quote.status === 'accepted' ? "bg-green-100 text-green-700" : 
                        quote.status === 'sent' ? "bg-blue-100 text-blue-700" : 
                        quote.status === 'draft' ? "bg-gray-100 text-gray-700" : 
                        quote.status === 'rejected' ? "bg-red-100 text-red-700" : 
                        "bg-gray-100 text-gray-700"
                      )}>
                        {quote.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Response Time Tracking */}
                  {quote.sentAt && (
                    <div className="mt-3 pt-3 border-t text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        Response time: {calculateResponseTime(quote.createdAt, quote.sentAt)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function calculateResponseTime(created: Date, sent: Date): string {
  const diffMs = sent.getTime() - created.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  
  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    return `${diffMinutes} minutes`
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)} hours`
  } else {
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`
  }
}