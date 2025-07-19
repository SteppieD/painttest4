'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Mail, Download, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'

interface Quote {
  quote_id: string
  customer_name: string
  customer_email?: string
  customer_phone?: string
  address?: string
  project_type: string
  rooms?: string
  total_revenue: number
  final_price: number
  base_cost: number
  total_materials: number
  projected_labor: number
  markup_percentage: number
  created_at: string
  status: string
  walls_sqft?: number
  paint_quality?: string
  timeline?: string
  special_requests?: string
  conversation_summary?: string
  paint_cost?: number
  paint_coverage?: number
  labor_percentage?: number
  sundries_cost?: number
  tax_rate?: number
  tax_amount?: number
}

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchQuote()
  }, [params.id])

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/quotes/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/dashboard/quotes')
          return
        }
        throw new Error('Failed to fetch quote')
      }
      const data = await response.json()
      setQuote(data.quote)
    } catch (error) {
      console.error('Error fetching quote:', error)
      toast({
        title: 'Error',
        description: 'Failed to load quote details',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!quote) return

    const quoteText = `
PAINTING QUOTE #${quote.quote_id}
Date: ${new Date(quote.created_at).toLocaleDateString()}

CUSTOMER INFORMATION:
Name: ${quote.customer_name}
Email: ${quote.customer_email || 'Not provided'}
Phone: ${quote.customer_phone || 'Not provided'}
Address: ${quote.address || 'Not provided'}

PROJECT DETAILS:
Type: ${quote.project_type} painting
Walls: ${quote.walls_sqft || 0} sq ft
Paint Quality: ${quote.paint_quality || 'Standard'}
Timeline: ${quote.timeline || 'Standard'}
${quote.special_requests ? `Special Requests: ${quote.special_requests}` : ''}

COST BREAKDOWN:
Materials: $${quote.total_materials?.toFixed(2) || '0.00'}
Labor: $${quote.projected_labor?.toFixed(2) || '0.00'}
Subtotal: $${quote.base_cost?.toFixed(2) || '0.00'}
Markup (${quote.markup_percentage || 30}%): $${((quote.final_price || 0) - (quote.base_cost || 0)).toFixed(2)}

TOTAL: $${quote.final_price?.toFixed(2) || quote.total_revenue?.toFixed(2) || '0.00'}

Valid for 30 days from quote date.
    `.trim()

    navigator.clipboard.writeText(quoteText)
    setCopied(true)
    toast({
      title: 'Copied!',
      description: 'Quote details copied to clipboard'
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const sendEmail = () => {
    if (!quote) return

    if (!quote.customer_email) {
      // Show options when no email
      toast({
        title: 'No Email Address',
        description: 'Copy the quote to send via text or print it out',
        action: (
          <Button size="sm" onClick={copyToClipboard}>
            Copy Quote
          </Button>
        )
      })
      return
    }

    const subject = `Painting Quote #${quote.quote_id}`
    const body = `
Dear ${quote.customer_name},

Thank you for considering us for your painting project. Please find your quote details below:

QUOTE #${quote.quote_id}
Date: ${new Date(quote.created_at).toLocaleDateString()}

PROJECT DETAILS:
- ${quote.project_type} painting
- Total area: ${quote.walls_sqft || 0} sq ft
- Timeline: ${quote.timeline || 'Standard'}

TOTAL COST: $${quote.final_price?.toFixed(2) || quote.total_revenue?.toFixed(2) || '0.00'}

This quote is valid for 30 days from the date above.

Please let us know if you have any questions or would like to proceed with the project.

Best regards,
Your Painting Company
    `.trim()

    window.location.href = `mailto:${quote.customer_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardContent className="p-8 text-center">
            <p>Quote not found</p>
            <Link href="/dashboard/quotes">
              <Button className="mt-4">Back to Quotes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/quotes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Quote #{quote.quote_id}</h1>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Created on {new Date(quote.created_at).toLocaleDateString()}
              </p>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                quote.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                quote.status === 'accepted' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {quote.status === 'pending' ? '⏱️ Ready to Send' :
                 quote.status === 'sent' ? '✉️ Sent to Customer' :
                 quote.status === 'accepted' ? '✅ Job Won!' :
                 quote.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/quotes/${params.id}/preview`}>
            <Button variant="primary">
              View Customer Quote
            </Button>
          </Link>
          <Button variant="outline" onClick={copyToClipboard}>
            {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button onClick={sendEmail} variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            {quote.customer_email ? 'Email' : 'Send Options'}
          </Button>
        </div>
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p>{quote.customer_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>{quote.customer_email || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p>{quote.customer_phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p>{quote.address || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            {quote.project_type} painting project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Wall Area</p>
              <p>{quote.walls_sqft || 0} sq ft</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paint Quality</p>
              <p>{quote.paint_quality || 'Standard'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Timeline</p>
              <p>{quote.timeline || 'Standard'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                quote.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                quote.status === 'accepted' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {quote.status}
              </span>
            </div>
          </div>
          {quote.special_requests && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Special Requests</p>
              <p className="mt-1">{quote.special_requests}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contractor Metrics */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle>Contractor Metrics</CardTitle>
          <CardDescription>Key numbers for your crew</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="text-2xl font-bold text-green-600">
                ${((quote.final_price || 0) - (quote.base_cost || 0)).toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground">
                {(((quote.final_price || 0) - (quote.base_cost || 0)) / (quote.final_price || 1) * 100).toFixed(0)}% of total
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">Est. Labor Hours</p>
              <p className="text-2xl font-bold">
                {Math.ceil((quote.walls_sqft || 0) / 150)} hrs
              </p>
              <p className="text-xs text-muted-foreground">
                ~{Math.ceil((quote.walls_sqft || 0) / 150 / 8)} days
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">Paint Needed</p>
              <p className="text-2xl font-bold">
                {Math.ceil((quote.walls_sqft || 0) / (quote.paint_coverage || 350))} gal
              </p>
              <p className="text-xs text-muted-foreground">
                {quote.paint_coverage || 350} sqft/gal coverage
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm font-medium mb-2">Quick Reference:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>• Crew Size: {(quote.walls_sqft || 0) > 3000 ? '2-3 painters' : '1-2 painters'}</div>
              <div>• Productivity: ~150 sqft/hour per painter</div>
              <div>• {quote.timeline || 'Standard timeline'}</div>
              <div>• {quote.paint_quality || 'Standard'} grade paint</div>
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
              <span className="font-medium">${quote.total_materials?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Labor</span>
              <span className="font-medium">${quote.projected_labor?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${quote.base_cost?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Markup ({quote.markup_percentage || 30}%)</span>
              <span className="font-medium">
                ${((quote.final_price || 0) - (quote.base_cost || 0)).toFixed(2)}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${quote.final_price?.toFixed(2) || quote.total_revenue?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Materials Shopping List</CardTitle>
          <CardDescription>What to buy for this job</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span>🎨 {quote.paint_quality || 'Standard'} Paint</span>
              <span className="font-medium">{Math.ceil((quote.walls_sqft || 0) / (quote.paint_coverage || 350))} gallons</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span>🖌️ Brushes & Rollers</span>
              <span className="font-medium">Standard set</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span>📦 Drop Cloths & Tape</span>
              <span className="font-medium">{Math.ceil((quote.walls_sqft || 0) / 500)} rolls tape</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span>🧹 Sundries & Supplies</span>
              <span className="font-medium">${quote.sundries_cost?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Contractors */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
          <CardDescription>
            {quote.status === 'pending' ? 'Quote is ready to send to your customer' :
             quote.status === 'sent' ? 'Follow up to close the deal' :
             quote.status === 'accepted' ? 'Congratulations on winning the job!' :
             'Manage this quote'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {quote.status === 'pending' && (
            <>
              <Button onClick={sendEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send Quote Now
              </Button>
              <Button variant="outline" onClick={copyToClipboard}>
                📱 Copy for Text/WhatsApp
              </Button>
              <Link href={`/dashboard/quotes/${params.id}/preview`}>
                <Button variant="outline">
                  👁️ Preview Customer View
                </Button>
              </Link>
            </>
          )}
          {quote.status === 'sent' && (
            <>
              <Button variant="outline">
                📞 Call Customer
              </Button>
              <Button variant="outline">
                📱 Send Follow-up Text
              </Button>
              <Button variant="outline">
                ✅ Mark as Won
              </Button>
            </>
          )}
          <Link href="/create-quote">
            <Button variant="ghost">
              + New Quote
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}