import { notFound } from 'next/navigation'
import { db } from '@/lib/database/adapter'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Send, Edit } from 'lucide-react'
import Link from 'next/link'

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

async function getQuote(quoteId: string, companyId: number) {
  const quote = await db.get(
    `SELECT q.*, 
            q.customer_name, 
            q.customer_email,
            q.customer_phone,
            q.address as customer_address,
            comp.name as company_name,
            comp.phone as company_phone,
            comp.email as company_email
     FROM quotes q
     LEFT JOIN companies comp ON q.company_id = comp.id
     WHERE q.quote_id = ? AND q.company_id = ?`,
    [quoteId, companyId]
  )
  
  if (!quote) return null
  
  // Transform the flat result to include nested objects
  return {
    ...quote,
    quoteNumber: quote.quote_id,
    customer: {
      name: quote.customer_name || 'Unknown Customer',
      email: quote.customer_email || '',
      phone: quote.customer_phone || '',
      address: quote.customer_address || ''
    },
    company: {
      id: quote.company_id,
      name: quote.company_name,
      phone: quote.company_phone || '',
      email: quote.company_email || ''
    }
  }
}

export default async function QuoteDetailPage({ params }: { params: { id: string } }) {
  const auth = await getAuth()
  if (!auth) {
    return notFound()
  }

  const quote = await getQuote(params.id, auth.companyId)
  if (!quote) {
    return notFound()
  }

  const surfaces = quote.surfaces as any[]
  const materials = quote.materials as any
  const labor = quote.labor as any

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quotes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quotes
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Quote {quote.quoteNumber}
            </h1>
            <p className="text-muted-foreground">
              Created on {new Date(quote.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send to Customer
          </Button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          quote.status === 'draft' ? 'bg-gray-100 text-gray-700' :
          quote.status === 'sent' ? 'bg-blue-100 text-blue-700' :
          quote.status === 'accepted' ? 'bg-green-100 text-green-700' :
          'bg-red-100 text-red-700'
        }`}>
          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
        </span>
        <span className="text-sm text-muted-foreground">
          Valid until {new Date(quote.validUntil || Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </span>
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p className="font-medium">{quote.customer.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="font-medium">{quote.customer.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p className="font-medium">{quote.customer.phone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p className="font-medium">{quote.customer.address || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            {quote.projectType.charAt(0).toUpperCase() + quote.projectType.slice(1)} painting project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quote.description && (
            <p className="text-sm text-muted-foreground mb-4">{quote.description}</p>
          )}
          
          <div className="space-y-4">
            <h4 className="font-medium">Surfaces to Paint</h4>
            <div className="rounded-lg border">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium">Surface</th>
                    <th className="p-2 text-left text-sm font-medium">Measurement</th>
                    <th className="p-2 text-left text-sm font-medium">Coats</th>
                    <th className="p-2 text-left text-sm font-medium">Condition</th>
                    <th className="p-2 text-right text-sm font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {surfaces.map((surface: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 text-sm">{surface.name}</td>
                      <td className="p-2 text-sm">
                        {surface.area ? `${surface.area} sq ft` :
                         surface.linearFeet ? `${surface.linearFeet} linear ft` :
                         surface.count ? `${surface.count} units` : 'N/A'}
                      </td>
                      <td className="p-2 text-sm">{surface.coats}</td>
                      <td className="p-2 text-sm capitalize">{surface.condition}</td>
                      <td className="p-2 text-sm text-right font-medium">
                        ${materials?.surfaces?.[index]?.calculatedCost?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Materials</span>
              <span className="font-medium">${materials?.totalMaterials?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Labor</span>
              <span className="font-medium">${labor?.totalLabor?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${quote.subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overhead (15%)</span>
              <span className="font-medium">${quote.overhead.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profit (30%)</span>
              <span className="font-medium">${quote.profit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (8.25%)</span>
              <span className="font-medium">${quote.tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${quote.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Notes */}
      {(quote.notes || quote.terms) && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quote.notes && (
              <div>
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground">{quote.notes}</p>
              </div>
            )}
            {quote.terms && (
              <div>
                <h4 className="font-medium mb-2">Terms & Conditions</h4>
                <p className="text-sm text-muted-foreground">{quote.terms}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}