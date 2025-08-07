'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Mail, Download, CheckCircle, Edit } from 'lucide-react'
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
      // Get company data from localStorage for authentication
      const companyData = localStorage.getItem('paintquote_company')
      const company = companyData ? JSON.parse(companyData) : null
      
      const response = await fetch(`/api/quotes/${params.id}`, {
        headers: {
          'x-company-data': JSON.stringify({
            id: company?.id,
            access_code: company?.access_code || '',
            name: company?.name
          })
        }
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/access-code')
          return
        }
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
          <Button size="default" onClick={copyToClipboard}>
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
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-100 animate-pulse"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-8 text-center">
          <p className="text-white mb-4">Quote not found</p>
          <Link href="/dashboard/quotes">
            <Button className="btn-primary-modern">Back to Quotes</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/quotes">
              <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-gray-900/70">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Quote #{quote.quote_id}</h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-base text-gray-200">
                  Created on {new Date(quote.created_at).toLocaleDateString()}
                </p>
                <span className={`inline-flex px-3 py-1 rounded-full text-base font-medium backdrop-blur-sm ${
                  quote.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  quote.status === 'sent' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  quote.status === 'accepted' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  'bg-gray-500/20 text-gray-100 border border-gray-500/30'
                }`}>
                  {quote.status === 'pending' ? '⏱️ Ready to Send' :
                   quote.status === 'sent' ? '✉️ Sent to Customer' :
                   quote.status === 'accepted' ? '✅ Job Won!' :
                   quote.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/dashboard/quotes/${params.id}/edit`} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <Button className="relative w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Quote
              </Button>
            </Link>
            <Link href={`/dashboard/quotes/${params.id}/preview`} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <Button className="relative w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                👁️ Customer View
              </Button>
            </Link>
            <Button 
              onClick={copyToClipboard} 
              className="bg-gray-900/70 hover:bg-white/20 text-white border border-white/20"
            >
              {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Quote'}
            </Button>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <Button 
                onClick={sendEmail} 
                className="relative w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send to Client
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-white">Customer Information</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-base font-medium text-gray-200">Name</p>
            <p className="text-white">{quote.customer_name}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-200">Email</p>
            <p className="text-white">{quote.customer_email || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-200">Phone</p>
            <p className="text-white">{quote.customer_phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-200">Address</p>
            <p className="text-white">{quote.address || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-white">Project Details</h2>
          <p className="text-base text-gray-200 mt-1">
            {quote.project_type} painting project
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-base font-medium text-gray-200">Wall Area</p>
              <p className="text-white">{quote.walls_sqft || 0} sq ft</p>
            </div>
            <div>
              <p className="text-base font-medium text-gray-200">Paint Quality</p>
              <p className="text-white">{quote.paint_quality || 'Standard'}</p>
            </div>
            <div>
              <p className="text-base font-medium text-gray-200">Timeline</p>
              <p className="text-white">{quote.timeline || 'Standard'}</p>
            </div>
            <div>
              <p className="text-base font-medium text-gray-200">Status</p>
              <span className={`inline-flex px-3 py-1 rounded-full text-base font-medium backdrop-blur-sm ${
                quote.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                quote.status === 'sent' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                quote.status === 'accepted' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                'bg-gray-500/20 text-gray-100 border border-gray-500/30'
              }`}>
                {quote.status}
              </span>
            </div>
          </div>
          {quote.special_requests && (
            <div>
              <p className="text-base font-medium text-gray-200">Special Requests</p>
              <p className="mt-1 text-white">{quote.special_requests}</p>
            </div>
          )}
        </div>
      </div>

      {/* Contractor Metrics */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6 border-l-4 border-l-green-500">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-white">Contractor Metrics</h2>
          <p className="text-base text-gray-200 mt-1">Key numbers for your crew</p>
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
          <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
            <p className="text-base text-gray-100">💰 Profit Margin</p>
            <p className="text-3xl md:text-2xl font-bold text-green-400">
              ${((quote.final_price || 0) - (quote.base_cost || 0)).toFixed(0)}
            </p>
            <p className="text-base md:text-base text-gray-200">
              {(((quote.final_price || 0) - (quote.base_cost || 0)) / (quote.final_price || 1) * 100).toFixed(0)}% of total
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
            <p className="text-base text-gray-100">⏱️ Est. Labor Hours</p>
            <p className="text-3xl md:text-2xl font-bold text-blue-400">
              {Math.ceil((quote.walls_sqft || 0) / 150)} hrs
            </p>
            <p className="text-base md:text-base text-gray-200">
              ~{Math.ceil((quote.walls_sqft || 0) / 150 / 8)} days
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
            <p className="text-base text-gray-100">🎨 Paint Needed</p>
            <p className="text-3xl md:text-2xl font-bold text-purple-400">
              {Math.ceil((quote.walls_sqft || 0) / (quote.paint_coverage || 350))} gal
            </p>
            <p className="text-base md:text-base text-gray-200">
              {quote.paint_coverage || 350} sqft/gal coverage
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/20">
          <p className="text-base font-medium mb-3 text-white">📋 Quick Reference:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base">
            <div className="flex items-center gap-2 p-2 bg-gray-900/70 rounded-lg">
              <span>👥</span>
              <span className="text-gray-100">Crew: {(quote.walls_sqft || 0) > 3000 ? '2-3 painters' : '1-2 painters'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-900/70 rounded-lg">
              <span>⚡</span>
              <span className="text-gray-100">Productivity: ~150 sqft/hr</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-900/70 rounded-lg">
              <span>📅</span>
              <span className="text-gray-100">{quote.timeline || 'Standard timeline'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-900/70 rounded-lg">
              <span>🎨</span>
              <span className="text-gray-100">{quote.paint_quality || 'Standard'} grade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-white">Cost Breakdown</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-200">Materials</span>
            <span className="font-medium text-white">${quote.total_materials?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-200">Labor</span>
            <span className="font-medium text-white">${quote.projected_labor?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="border-t border-white/20 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-200">Subtotal</span>
              <span className="font-medium text-white">${quote.base_cost?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-200">Markup ({quote.markup_percentage || 30}%)</span>
            <span className="font-medium text-white">
              ${((quote.final_price || 0) - (quote.base_cost || 0)).toFixed(2)}
            </span>
          </div>
          <div className="border-t border-white/20 pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-white">Total</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ${quote.final_price?.toFixed(2) || quote.total_revenue?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Materials List */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-white">Materials Shopping List</h2>
          <p className="text-base text-gray-200 mt-1">What to buy for this job</p>
        </div>
        <div className="space-y-2 text-base">
          <div className="flex justify-between items-center p-3 bg-gray-900/70 rounded-lg backdrop-blur-sm">
            <span className="text-gray-100">🎨 {quote.paint_quality || 'Standard'} Paint</span>
            <span className="font-medium text-white">{Math.ceil((quote.walls_sqft || 0) / (quote.paint_coverage || 350))} gallons</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-900/70 rounded-lg backdrop-blur-sm">
            <span className="text-gray-100">🖌️ Brushes & Rollers</span>
            <span className="font-medium text-white">Standard set</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-900/70 rounded-lg backdrop-blur-sm">
            <span className="text-gray-100">📦 Drop Cloths & Tape</span>
            <span className="font-medium text-white">{Math.ceil((quote.walls_sqft || 0) / 500)} rolls tape</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-900/70 rounded-lg backdrop-blur-sm">
            <span className="text-gray-100">🧹 Sundries & Supplies</span>
            <span className="font-medium text-white">${quote.sundries_cost?.toFixed(2) || '0.00'}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions for Contractors */}
      <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <div className="border-b border-white/10 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-white">Next Steps</h2>
          <p className="text-base text-gray-200 mt-1">
            {quote.status === 'pending' ? 'Quote is ready to send to your customer' :
             quote.status === 'sent' ? 'Follow up to close the deal' :
             quote.status === 'accepted' ? 'Congratulations on winning the job!' :
             'Manage this quote'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {quote.status === 'pending' && (
            <>
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg blur-sm opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <Button 
                  onClick={sendEmail}
                  className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Quote Now
                </Button>
              </div>
              <Button 
                onClick={copyToClipboard}
                className="bg-gray-900/70 hover:bg-white/20 text-white border border-white/20"
              >
                📱 Copy for Text/WhatsApp
              </Button>
              <Link href={`/dashboard/quotes/${params.id}/preview`}>
                <Button className="bg-gray-900/70 hover:bg-white/20 text-white border border-white/20">
                  👁️ Preview Customer View
                </Button>
              </Link>
            </>
          )}
          {quote.status === 'sent' && (
            <>
              <Button 
                className="bg-gray-900/70 hover:bg-white/20 text-white border border-white/20"
                onClick={() => {
                  if (quote.customer_phone) {
                    window.location.href = `tel:${quote.customer_phone}`
                  } else {
                    alert('No phone number available for this customer')
                  }
                }}
              >
                📞 Call Customer
              </Button>
              <Button 
                className="bg-gray-900/70 hover:bg-white/20 text-white border border-white/20"
                onClick={() => {
                  if (quote.customer_phone) {
                    window.location.href = `sms:${quote.customer_phone}?body=Hi ${quote.customer_name}, following up on your painting quote. Do you have any questions?`
                  } else {
                    alert('No phone number available for this customer')
                  }
                }}
              >
                📱 Send Follow-up Text
              </Button>
              <Button 
                className="bg-gray-900/70 hover:bg-white/20 text-white border border-white/20"
                onClick={async () => {
                  try {
                    const response = await fetch(`/api/quotes/${params.id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ status: 'accepted' })
                    })
                    if (response.ok) {
                      window.location.reload()
                    } else {
                      alert('Failed to update quote status')
                    }
                  } catch (error) {
                    alert('Error updating quote status')
                  }
                }}
              >
                ✅ Mark as Won
              </Button>
            </>
          )}
          <Link href="/create-quote">
            <Button className="bg-gray-900/80 hover:bg-gray-900/70 text-gray-200 hover:text-white">
              + New Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Quick Actions Floating Button */}
      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <div className="flex flex-col gap-2">
          {quote.customer_phone && (
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              onClick={() => window.location.href = `tel:${quote.customer_phone}`}
            >
              📞
            </Button>
          )}
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            onClick={() => {
              const message = `Hi ${quote.customer_name}, here${String.fromCharCode(39)}s your painting quote #${quote.quote_id}: $${quote.final_price?.toFixed(2)}. Let me know if you have any questions!`
              if (quote.customer_phone) {
                window.location.href = `sms:${quote.customer_phone}?body=${encodeURIComponent(message)}`
              } else {
                navigator.clipboard.writeText(message)
                toast({ title: 'Message copied!', description: 'Text message copied to clipboard' })
              }
            }}
          >
            💬
          </Button>
        </div>
      </div>
    </div>
  )
}