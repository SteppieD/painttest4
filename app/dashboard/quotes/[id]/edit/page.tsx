'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Calculator } from 'lucide-react'
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
  walls_sqft?: number
  ceilings_sqft?: number
  trim_sqft?: number
  doors_count?: number
  windows_count?: number
  paint_quality?: string
  timeline?: string
  special_requests?: string
  total_materials: number
  projected_labor: number
  base_cost: number
  markup_percentage: number
  final_price: number
  paint_coverage?: number
  labor_percentage?: number
  status: string
}

export default function QuoteEditPage({ params }: { params: { id: string } }) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  const calculatePricing = () => {
    if (!quote) return

    const wallsSqft = quote.walls_sqft || 0
    const ceilingsSqft = quote.ceilings_sqft || 0
    const trimSqft = quote.trim_sqft || 0
    const doorsCount = quote.doors_count || 0
    const windowsCount = quote.windows_count || 0

    // Calculate materials
    const paintCoverage = quote.paint_coverage || 350
    const totalSqft = wallsSqft + ceilingsSqft
    const paintGallons = Math.ceil(totalSqft / paintCoverage)
    const paintCost = paintGallons * 50 // $50 per gallon
    const trimPaintCost = trimSqft > 0 ? Math.ceil(trimSqft / 350) * 60 : 0 // $60 per gallon for trim
    const sundries = (paintCost + trimPaintCost) * 0.15 // 15% for supplies
    const totalMaterials = paintCost + trimPaintCost + sundries

    // Calculate labor
    const wallLabor = wallsSqft * 1.5 // $1.50 per sqft
    const ceilingLabor = ceilingsSqft * 2.0 // $2.00 per sqft
    const trimLabor = trimSqft * 2.5 // $2.50 per sqft
    const doorLabor = doorsCount * 100 // $100 per door
    const windowLabor = windowsCount * 25 // $25 per window
    const totalLabor = wallLabor + ceilingLabor + trimLabor + doorLabor + windowLabor

    // Calculate totals
    const baseCost = totalMaterials + totalLabor
    const markupAmount = baseCost * (quote.markup_percentage / 100)
    const finalPrice = baseCost + markupAmount

    setQuote({
      ...quote,
      total_materials: totalMaterials,
      projected_labor: totalLabor,
      base_cost: baseCost,
      final_price: finalPrice
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quote) return

    setSaving(true)
    try {
      const response = await fetch(`/api/quotes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quote)
      })

      if (!response.ok) {
        throw new Error('Failed to update quote')
      }

      toast({
        title: 'Success',
        description: 'Quote updated successfully'
      })

      // Redirect back to quote detail page
      router.push(`/dashboard/quotes/${params.id}`)
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

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="glass-card p-8 text-center">
          <p className="text-white mb-4">Quote not found</p>
          <Link href="/dashboard/quotes">
            <Button className="btn-primary-modern">Back to Quotes</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl pb-20">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/quotes/${params.id}`}>
              <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Edit Quote #{quote.quote_id}</h1>
              <p className="text-sm text-gray-400 mt-1">Make changes to the quote details</p>
            </div>
            <Button
              type="button"
              onClick={calculatePricing}
              className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Recalculate
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Customer Information */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="customer_name" className="text-gray-300">Customer Name</Label>
                <Input
                  id="customer_name"
                  value={quote.customer_name}
                  onChange={(e) => setQuote({ ...quote, customer_name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customer_email" className="text-gray-300">Email</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={quote.customer_email || ''}
                  onChange={(e) => setQuote({ ...quote, customer_email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="customer_phone" className="text-gray-300">Phone</Label>
                <Input
                  id="customer_phone"
                  value={quote.customer_phone || ''}
                  onChange={(e) => setQuote({ ...quote, customer_phone: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-gray-300">Address</Label>
                <Input
                  id="address"
                  value={quote.address || ''}
                  onChange={(e) => setQuote({ ...quote, address: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="project_type" className="text-gray-300">Project Type</Label>
                <Select value={quote.project_type} onValueChange={(value) => setQuote({ ...quote, project_type: value })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interior">Interior</SelectItem>
                    <SelectItem value="exterior">Exterior</SelectItem>
                    <SelectItem value="both">Interior & Exterior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paint_quality" className="text-gray-300">Paint Quality</Label>
                <Select value={quote.paint_quality || 'standard'} onValueChange={(value) => setQuote({ ...quote, paint_quality: value })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeline" className="text-gray-300">Timeline</Label>
                <Input
                  id="timeline"
                  value={quote.timeline || ''}
                  onChange={(e) => setQuote({ ...quote, timeline: e.target.value })}
                  placeholder="e.g., 1 week"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <Select value={quote.status} onValueChange={(value) => setQuote({ ...quote, status: value })}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="special_requests" className="text-gray-300">Special Requests</Label>
              <Textarea
                id="special_requests"
                value={quote.special_requests || ''}
                onChange={(e) => setQuote({ ...quote, special_requests: e.target.value })}
                rows={3}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Measurements */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Measurements</CardTitle>
            <CardDescription className="text-gray-400">Enter square footage and counts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="walls_sqft" className="text-gray-300">Walls (sq ft)</Label>
                <Input
                  id="walls_sqft"
                  type="number"
                  value={quote.walls_sqft || 0}
                  onChange={(e) => setQuote({ ...quote, walls_sqft: parseInt(e.target.value) || 0 })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="ceilings_sqft" className="text-gray-300">Ceilings (sq ft)</Label>
                <Input
                  id="ceilings_sqft"
                  type="number"
                  value={quote.ceilings_sqft || 0}
                  onChange={(e) => setQuote({ ...quote, ceilings_sqft: parseInt(e.target.value) || 0 })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="trim_sqft" className="text-gray-300">Trim (sq ft)</Label>
                <Input
                  id="trim_sqft"
                  type="number"
                  value={quote.trim_sqft || 0}
                  onChange={(e) => setQuote({ ...quote, trim_sqft: parseInt(e.target.value) || 0 })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="doors_count" className="text-gray-300">Doors</Label>
                <Input
                  id="doors_count"
                  type="number"
                  value={quote.doors_count || 0}
                  onChange={(e) => setQuote({ ...quote, doors_count: parseInt(e.target.value) || 0 })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="windows_count" className="text-gray-300">Windows</Label>
                <Input
                  id="windows_count"
                  type="number"
                  value={quote.windows_count || 0}
                  onChange={(e) => setQuote({ ...quote, windows_count: parseInt(e.target.value) || 0 })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Pricing</CardTitle>
            <CardDescription className="text-gray-400">Adjust pricing and markup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="markup_percentage" className="text-gray-300">Markup Percentage</Label>
                <Input
                  id="markup_percentage"
                  type="number"
                  value={quote.markup_percentage}
                  onChange={(e) => setQuote({ ...quote, markup_percentage: parseInt(e.target.value) || 30 })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="paint_coverage" className="text-gray-300">Paint Coverage (sq ft/gallon)</Label>
                <Input
                  id="paint_coverage"
                  type="number"
                  value={quote.paint_coverage || 350}
                  onChange={(e) => setQuote({ ...quote, paint_coverage: parseInt(e.target.value) || 350 })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Materials</span>
                <span className="text-white">${quote.total_materials.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Labor</span>
                <span className="text-white">${quote.projected_labor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-400">Base Cost</span>
                <span className="text-white">${quote.base_cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Markup ({quote.markup_percentage}%)</span>
                <span className="text-white">${(quote.final_price - quote.base_cost).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/20">
                <span className="text-white">Total</span>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  ${quote.final_price.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Link href={`/dashboard/quotes/${params.id}`}>
            <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}