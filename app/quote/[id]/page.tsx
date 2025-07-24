'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  FileText,
  Calendar,
  DollarSign,
  Sparkles
} from 'lucide-react'

interface Quote {
  id: number
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
  sundries_cost?: number
  tax_rate?: number
  tax_amount?: number
  subtotal?: number
  company?: {
    name: string
    email: string
    phone: string
  }
}

export default function PublicQuotePage({ params }: { params: { id: string } }) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [tracked, setTracked] = useState(false)

  useEffect(() => {
    fetchQuote()
  }, [])

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/quotes/${params.id}/public`)
      if (response.ok) {
        const data = await response.json()
        setQuote(data)
        
        // Track view event
        if (!tracked) {
          trackEvent('viewed')
          setTracked(true)
        }
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackEvent = async (event: string) => {
    try {
      await fetch(`/api/quotes/${params.id}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event })
      })
    } catch (error) {
      console.error('Error tracking event:', error)
    }
  }

  const handleAccept = async () => {
    await trackEvent('accepted')
    // In production, this would redirect to a payment/acceptance flow
    alert('Thank you for accepting this quote! We will contact you shortly.')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your quote...</p>
        </div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <Card className="glass-card max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Quote Not Found</h2>
            <p className="text-gray-400">This quote may have expired or been removed.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const bundledServiceCost = ((quote.total_materials || 0) + (quote.projected_labor || 0)) * (1 + (quote.markup_percentage || 30) / 100)
  const subtotal = bundledServiceCost
  const taxAmount = quote.tax_amount || 0
  const total = quote.final_price || (subtotal + taxAmount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Professional Painting Quote</h1>
                <p className="text-sm text-gray-400">Quote #{quote.quote_id}</p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              <CheckCircle className="h-3 w-3 mr-1" />
              Valid for 30 days
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Company Info */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              {quote.company?.name || 'Professional Painting Services'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {quote.company?.email && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{quote.company.email}</span>
                </div>
              )}
              {quote.company?.phone && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{quote.company.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  {new Date(quote.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer & Project Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white text-lg">Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white">{quote.customer_name}</p>
              </div>
              {quote.address && (
                <div>
                  <p className="text-sm text-gray-400">Project Address</p>
                  <p className="text-white flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    {quote.address}
                  </p>
                </div>
              )}
              {quote.customer_email && (
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{quote.customer_email}</p>
                </div>
              )}
              {quote.customer_phone && (
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{quote.customer_phone}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Project Type</p>
                <p className="text-white capitalize">{quote.project_type} Painting</p>
              </div>
              {quote.walls_sqft && quote.walls_sqft > 0 && (
                <div>
                  <p className="text-sm text-gray-400">Total Square Footage</p>
                  <p className="text-white">{quote.walls_sqft.toLocaleString()} sq ft</p>
                </div>
              )}
              {quote.paint_quality && (
                <div>
                  <p className="text-sm text-gray-400">Paint Quality</p>
                  <p className="text-white capitalize">{quote.paint_quality}</p>
                </div>
              )}
              {quote.timeline && (
                <div>
                  <p className="text-sm text-gray-400">Timeline</p>
                  <p className="text-white flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {quote.timeline}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Scope of Work */}
        {quote.conversation_summary && (
          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg">Scope of Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 whitespace-pre-wrap">{quote.conversation_summary}</p>
            </CardContent>
          </Card>
        )}

        {/* Pricing */}
        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">Investment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300">Professional Painting Services</span>
                <span className="text-white font-medium">
                  ${bundledServiceCost.toFixed(2)}
                </span>
              </div>
              
              {taxAmount > 0 && (
                <>
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sales Tax</span>
                    <span className="text-white">${taxAmount.toFixed(2)}</span>
                  </div>
                </>
              )}
              
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total Investment</span>
                  <span className="text-2xl font-bold text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <p className="text-sm text-gray-300">
                This quote includes all materials, labor, and equipment needed to complete your project to the highest standards.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            onClick={handleAccept}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Accept This Quote
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => window.print()}
          >
            <FileText className="h-5 w-5 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Questions? Contact us at {quote.company?.email || 'info@paintingpro.com'}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This quote is valid for 30 days from the date of issue
          </p>
        </div>
      </div>
    </div>
  )
}