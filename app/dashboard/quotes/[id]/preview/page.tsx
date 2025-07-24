'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Send, Mail, Copy, Edit3, Check, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'

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
}

export default function QuotePreviewPage({ params }: { params: { id: string } }) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editedQuote, setEditedQuote] = useState<Quote | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchQuote()
  }, [params.id])

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/quotes/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }
      const data = await response.json()
      setQuote(data.quote)
      setEditedQuote(data.quote)
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

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
    setEditedQuote(quote)
  }

  const handleSave = async () => {
    if (!editedQuote) return
    
    setSaving(true)
    try {
      // Recalculate totals
      const materials = parseFloat(editedQuote.total_materials?.toString() || '0')
      const labor = parseFloat(editedQuote.projected_labor?.toString() || '0')
      const subtotal = materials + labor
      const markupAmount = subtotal * (editedQuote.markup_percentage / 100)
      const beforeTax = subtotal + markupAmount
      const taxAmount = beforeTax * (editedQuote.tax_rate || 0) / 100
      const finalPrice = beforeTax + taxAmount

      const updatedQuote = {
        ...editedQuote,
        subtotal,
        tax_amount: taxAmount,
        final_price: finalPrice,
        total_revenue: finalPrice
      }

      const response = await fetch(`/api/quotes/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuote)
      })

      if (!response.ok) {
        throw new Error('Failed to update quote')
      }

      setQuote(updatedQuote)
      setEditedQuote(updatedQuote)
      setEditing(false)
      
      toast({
        title: 'Success',
        description: 'Quote updated successfully'
      })
    } catch (error) {
      console.error('Error updating quote:', error)
      toast({
        title: 'Error',
        description: 'Failed to update quote',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSendEmail = async () => {
    if (!quote) return

    // Track that the quote was sent
    try {
      await fetch(`/api/quotes/${params.id}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'sent' })
      })
    } catch (error) {
      console.error('Error tracking quote sent:', error)
    }

    const subject = `Painting Quote #${quote.quote_id}`
    const body = formatEmailBody(quote)
    
    window.location.href = `mailto:${quote.customer_email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const copyPublicLink = async () => {
    const publicUrl = `${window.location.origin}/quote/${params.id}`
    try {
      await navigator.clipboard.writeText(publicUrl)
      toast({
        title: 'Link Copied!',
        description: 'The quote link has been copied to your clipboard.'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive'
      })
    }
  }

  const formatEmailBody = (quote: Quote) => {
    const publicUrl = `${window.location.origin}/quote/${params.id}`
    return `Dear ${quote.customer_name},

Thank you for considering us for your painting project. Please find your quote details below:

QUOTE #${quote.quote_id}
Date: ${new Date(quote.created_at).toLocaleDateString()}

PROJECT DETAILS:
- Type: ${quote.project_type} painting
- Total area: ${quote.walls_sqft || 0} sq ft
- Paint quality: ${quote.paint_quality || 'Standard'}
- Timeline: ${quote.timeline || 'Standard'}
${quote.special_requests ? `- Special requests: ${quote.special_requests}` : ''}

COST BREAKDOWN:
- Materials: $${quote.total_materials?.toFixed(2) || '0.00'}
- Labor: $${quote.projected_labor?.toFixed(2) || '0.00'}
- Subtotal: $${quote.subtotal?.toFixed(2) || '0.00'}
- Markup (${quote.markup_percentage}%): $${((quote.subtotal || 0) * quote.markup_percentage / 100).toFixed(2)}
${quote.tax_rate ? `- Tax (${quote.tax_rate}%): $${quote.tax_amount?.toFixed(2) || '0.00'}` : ''}

TOTAL: $${quote.final_price?.toFixed(2) || '0.00'}

This quote is valid for 30 days from the date above.

View your quote online: ${publicUrl}

Please let us know if you have any questions or would like to proceed with the project.

Best regards,
Your Painting Company`
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!quote || !editedQuote) {
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
            <h1 className="text-2xl font-bold">Quote Preview</h1>
            <p className="text-sm text-muted-foreground">
              Review and edit before sending to customer
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={saving}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleEdit}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button onClick={handleSendEmail} disabled={!quote.customer_email}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button onClick={copyPublicLink} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Quote Header */}
      <Card>
        <CardHeader>
          <CardTitle>Quote #{quote.quote_id}</CardTitle>
          <CardDescription>
            Created on {new Date(quote.created_at).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Name</Label>
            {editing ? (
              <Input
                value={editedQuote.customer_name}
                onChange={(e) => setEditedQuote({...editedQuote, customer_name: e.target.value})}
              />
            ) : (
              <p className="mt-1">{quote.customer_name}</p>
            )}
          </div>
          <div>
            <Label>Email</Label>
            {editing ? (
              <Input
                type="email"
                value={editedQuote.customer_email || ''}
                onChange={(e) => setEditedQuote({...editedQuote, customer_email: e.target.value})}
              />
            ) : (
              <p className="mt-1">{quote.customer_email || 'Not provided'}</p>
            )}
          </div>
          <div>
            <Label>Phone</Label>
            {editing ? (
              <Input
                value={editedQuote.customer_phone || ''}
                onChange={(e) => setEditedQuote({...editedQuote, customer_phone: e.target.value})}
              />
            ) : (
              <p className="mt-1">{quote.customer_phone || 'Not provided'}</p>
            )}
          </div>
          <div>
            <Label>Address</Label>
            {editing ? (
              <Input
                value={editedQuote.address || ''}
                onChange={(e) => setEditedQuote({...editedQuote, address: e.target.value})}
              />
            ) : (
              <p className="mt-1">{quote.address || 'Not provided'}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Wall Area (sq ft)</Label>
              {editing ? (
                <Input
                  type="number"
                  value={editedQuote.walls_sqft || 0}
                  onChange={(e) => setEditedQuote({...editedQuote, walls_sqft: parseInt(e.target.value) || 0})}
                />
              ) : (
                <p className="mt-1">{quote.walls_sqft || 0} sq ft</p>
              )}
            </div>
            <div>
              <Label>Paint Quality</Label>
              {editing ? (
                <Input
                  value={editedQuote.paint_quality || ''}
                  onChange={(e) => setEditedQuote({...editedQuote, paint_quality: e.target.value})}
                />
              ) : (
                <p className="mt-1">{quote.paint_quality || 'Standard'}</p>
              )}
            </div>
            <div>
              <Label>Timeline</Label>
              {editing ? (
                <Input
                  value={editedQuote.timeline || ''}
                  onChange={(e) => setEditedQuote({...editedQuote, timeline: e.target.value})}
                />
              ) : (
                <p className="mt-1">{quote.timeline || 'Standard'}</p>
              )}
            </div>
            <div>
              <Label>Status</Label>
              <p className="mt-1">
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  quote.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  quote.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                  quote.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {quote.status}
                </span>
              </p>
            </div>
          </div>
          {(editing || quote.special_requests) && (
            <div>
              <Label>Special Requests</Label>
              {editing ? (
                <Input
                  value={editedQuote.special_requests || ''}
                  onChange={(e) => setEditedQuote({...editedQuote, special_requests: e.target.value})}
                />
              ) : (
                <p className="mt-1">{quote.special_requests}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cost Breakdown - Customer Facing (No Markup Shown) */}
      <Card>
        <CardHeader>
          <CardTitle>Project Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Show bundled cost (materials + labor + markup) as single line */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Professional Painting Services</span>
              <span className="font-medium">
                ${(((quote.total_materials || 0) + (quote.projected_labor || 0)) * (1 + (quote.markup_percentage || 30) / 100)).toFixed(2)}
              </span>
            </div>
            
            {/* Show tax if applicable */}
            {(quote.tax_rate || 0) > 0 && (
              <>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      ${(((quote.total_materials || 0) + (quote.projected_labor || 0)) * (1 + (quote.markup_percentage || 30) / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sales Tax ({quote.tax_rate}%)</span>
                  <span className="font-medium">
                    ${((((quote.total_materials || 0) + (quote.projected_labor || 0)) * (1 + (quote.markup_percentage || 30) / 100)) * (quote.tax_rate / 100)).toFixed(2)}
                  </span>
                </div>
              </>
            )}
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Investment</span>
                <span>
                  ${(((quote.total_materials || 0) + (quote.projected_labor || 0)) * (1 + (quote.markup_percentage || 30) / 100) * (1 + (quote.tax_rate || 0) / 100)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                This quote is valid for 30 days from creation date
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push(`/dashboard/quotes/${params.id}`)}>
                View Final
              </Button>
              <Button onClick={handleSendEmail} disabled={!quote.customer_email}>
                <Send className="h-4 w-4 mr-2" />
                Send to Customer
              </Button>
              <Button onClick={copyPublicLink} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy Public Link
              </Button>
            </div>
            
            {/* Public Link Display */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm text-gray-600">Share this link with your customer:</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input 
                  readOnly 
                  value={`${window.location.origin}/quote/${params.id}`}
                  className="font-mono text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={copyPublicLink}
                  variant="ghost"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Link href={`/quote/${params.id}`} target="_blank">
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}