'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Send, Download, Save, Edit2, Check, X } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

function QuoteReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [editMode, setEditMode] = useState<string | null>(null)
  const [quoteData, setQuoteData] = useState<any>(null)
  const [editedValue, setEditedValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendError, setSendError] = useState('')

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data))
        setQuoteData(parsed)
      } catch (error) {
        console.error('Error parsing quote data:', error)
        toast({
          title: 'Error',
          description: 'Failed to load quote data',
          variant: 'destructive'
        })
        router.push('/create-quote')
      }
    } else {
      router.push('/create-quote')
    }
  }, [searchParams, router])

  const handleEdit = (field: string, value: any) => {
    setEditMode(field)
    setEditedValue(value || '')
  }

  const saveEdit = (field: string) => {
    const fieldPath = field.split('.')
    const newData = { ...quoteData }
    
    // Navigate to nested field and update value
    let current = newData
    for (let i = 0; i < fieldPath.length - 1; i++) {
      current = current[fieldPath[i]]
    }
    
    // Parse number values for numeric fields
    const numericFields = ['total', 'materials', 'labor', 'markup', 'gallons', 'hours', 'cost']
    const lastField = fieldPath[fieldPath.length - 1]
    
    if (numericFields.some(f => lastField.includes(f))) {
      current[lastField] = parseFloat(editedValue) || 0
    } else {
      current[lastField] = editedValue
    }
    
    setQuoteData(newData)
    setEditMode(null)
  }

  const cancelEdit = () => {
    setEditMode(null)
    setEditedValue('')
  }

  const sendQuoteEmail = async () => {
    if (!quoteData.customerEmail) {
      toast({
        title: 'Email Required',
        description: 'Please add a customer email address to send the quote.',
        variant: 'destructive'
      })
      return
    }
    
    setIsSending(true)
    setSendError('')
    
    try {
      const response = await fetch('/api/quotes/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: quoteData.customerEmail,
          customerName: quoteData.customerName || 'Valued Customer',
          quoteData: {
            projectType: quoteData.projectType || 'Interior Painting',
            squareFootage: quoteData.sqft || quoteData.surfaces?.walls || 0,
            rooms: quoteData.roomCount || quoteData.rooms?.length || 0,
            materials: quoteData.pricing?.materials || {},
            labor: quoteData.pricing?.labor || {},
            total: quoteData.pricing?.total || 0,
            timeline: quoteData.pricing?.timeline || '3-5 days',
            id: Date.now().toString()
          },
          companyInfo: {
            name: 'PaintQuote Pro',
            phone: '1-800-PAINT-PRO',
            email: 'quotes@paintquotepro.com'
          }
        })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setSendSuccess(true)
        toast({
          title: 'Quote Sent Successfully!',
          description: `The quote has been sent to ${quoteData.customerEmail}`,
        })
        
        // Also create the quote in the database
        await createQuote()
      } else {
        setSendError(result.error || 'Failed to send quote')
        toast({
          title: 'Failed to Send',
          description: result.error || 'Unable to send the quote email.',
          variant: 'destructive'
        })
      }
    } catch (error) {
      setSendError('An error occurred while sending the quote')
      toast({
        title: 'Error',
        description: 'An error occurred while sending the quote.',
        variant: 'destructive'
      })
    } finally {
      setIsSending(false)
    }
  }
  
  const createQuote = async () => {
    setIsLoading(true)
    try {
      // Get company data from localStorage for access code
      const companyData = localStorage.getItem('paintquote_company')
      const company = companyData ? JSON.parse(companyData) : null
      
      const requestBody = {
        companyId: company?.id,
        quoteData: {
          customerName: quoteData.customerName || 'Unknown Customer',
          customerEmail: quoteData.customerEmail || null,
          customerPhone: quoteData.customerPhone || null,
          address: quoteData.address || null,
          projectType: quoteData.projectType || 'interior',
          rooms: quoteData.rooms || [],
          roomCount: quoteData.roomCount || 0,
          paintQuality: quoteData.paintQuality || 'better',
          prepWork: quoteData.prepWork || null,
          timeEstimate: quoteData.timeline || quoteData.pricing?.timeline || null,
          specialRequests: quoteData.specialRequests || null,
          totalCost: quoteData.pricing?.subtotal || quoteData.pricing?.total || 0,
          finalPrice: quoteData.pricing?.total || quoteData.pricing?.subtotal || 0,
          markupPercentage: quoteData.markupPercentage || 30,
          sqft: quoteData.surfaces?.walls || quoteData.measurements?.wallSqft || quoteData.sqft || 0,
          breakdown: {
            materials: typeof quoteData.pricing?.materials === 'object' 
              ? quoteData.pricing.materials.total || 0 
              : quoteData.pricing?.materials || 0,
            labor: typeof quoteData.pricing?.labor === 'object' 
              ? quoteData.pricing.labor.total || 0 
              : quoteData.pricing?.labor || 0,
            markup: quoteData.pricing?.markup || 0
          }
        },
        conversationHistory: []
      }

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: company?.id,
            access_code: company?.access_code
          })
        },
        body: JSON.stringify(requestBody)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create quote')
      }
      
      toast({
        title: 'Quote Created!',
        description: `Quote ${result.quoteId} has been created successfully.`,
      })

      // Navigate to the quote
      router.push(`/dashboard/quotes/${result.quoteId}`)

    } catch (error) {
      console.error('Create quote error:', error)
      toast({
        title: 'Error',
        description: 'Failed to create quote. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveDraft = async () => {
    // Store quote data in localStorage for now
    // In production, this would save to backend as draft
    localStorage.setItem('quote_draft', JSON.stringify(quoteData))
    toast({
      title: 'Draft Saved',
      description: 'Your quote draft has been saved.',
    })
  }

  if (!quoteData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const getTotal = (value: any): number => {
    if (typeof value === 'number') return value
    if (typeof value === 'object' && value && 'total' in value) return value.total || 0
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="glass-card rounded-none border-b border-white/10 relative z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/create-quote">
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-900/70">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-white">Review Your Quote</h1>
                <p className="text-sm text-gray-400">Make any final adjustments before sending</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quote Details - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-gray-400">Customer Name</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'customerName' ? (
                        <>
                          <Input
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button size="icon" variant="ghost" onClick={() => saveEdit('customerName')}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-white">{quoteData.customerName || 'Not specified'}</p>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEdit('customerName', quoteData.customerName)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'customerEmail' ? (
                        <>
                          <Input
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button size="icon" variant="ghost" onClick={() => saveEdit('customerEmail')}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-white">{quoteData.customerEmail || 'Not specified'}</p>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEdit('customerEmail', quoteData.customerEmail)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-400">Address</Label>
                  <div className="flex items-center gap-2">
                    {editMode === 'address' ? (
                      <>
                        <Input
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                        <Button size="icon" variant="ghost" onClick={() => saveEdit('address')}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-white">{quoteData.address || 'Not specified'}</p>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleEdit('address', quoteData.address)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials Breakdown */}
            {quoteData.pricing?.breakdown && (
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Materials Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quoteData.pricing.breakdown.primer && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <div>
                        <p className="text-white">Primer</p>
                        <p className="text-sm text-gray-400">{quoteData.pricing.breakdown.primer.gallons} gallons</p>
                      </div>
                      <p className="text-white font-semibold">
                        ${quoteData.pricing.breakdown.primer.cost.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  {quoteData.pricing.breakdown.wallPaint && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <div>
                        <p className="text-white">Wall Paint</p>
                        <p className="text-sm text-gray-400">{quoteData.pricing.breakdown.wallPaint.gallons} gallons</p>
                      </div>
                      <p className="text-white font-semibold">
                        ${quoteData.pricing.breakdown.wallPaint.cost.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  {quoteData.pricing.breakdown.ceilingPaint && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <div>
                        <p className="text-white">Ceiling Paint</p>
                        <p className="text-sm text-gray-400">{quoteData.pricing.breakdown.ceilingPaint.gallons} gallons</p>
                      </div>
                      <p className="text-white font-semibold">
                        ${quoteData.pricing.breakdown.ceilingPaint.cost.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  {quoteData.pricing.breakdown.supplies && (
                    <div className="flex justify-between items-center py-2">
                      <p className="text-white">Supplies</p>
                      <p className="text-white font-semibold">
                        ${quoteData.pricing.breakdown.supplies.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                    <p className="text-white font-semibold">Total Materials</p>
                    <p className="text-white font-bold text-lg">
                      ${getTotal(quoteData.pricing.materials).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Labor Breakdown */}
            {quoteData.pricing?.breakdown && (
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Labor Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quoteData.pricing.breakdown.prepWork && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                      <div>
                        <p className="text-white">Prep Work</p>
                        <p className="text-sm text-gray-400">{quoteData.pricing.breakdown.prepWork.hours} hours</p>
                      </div>
                      <p className="text-white font-semibold">
                        ${quoteData.pricing.breakdown.prepWork.cost.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  {quoteData.pricing.breakdown.painting && (
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <p className="text-white">Painting</p>
                        <p className="text-sm text-gray-400">{quoteData.pricing.breakdown.painting.hours} hours</p>
                      </div>
                      <p className="text-white font-semibold">
                        ${quoteData.pricing.breakdown.painting.cost.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                    <p className="text-white font-semibold">Total Labor</p>
                    <p className="text-white font-bold text-lg">
                      ${getTotal(quoteData.pricing.labor).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quote Summary - Right Side */}
          <div className="space-y-6">
            {/* Total Summary */}
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-filter backdrop-blur-md border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white">Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300">Materials</p>
                    <p className="text-white font-semibold">
                      ${getTotal(quoteData.pricing?.materials).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300">Labor</p>
                    <p className="text-white font-semibold">
                      ${getTotal(quoteData.pricing?.labor).toFixed(2)}
                    </p>
                  </div>
                  
                  {quoteData.pricing?.markup > 0 && (
                    <div className="flex justify-between items-center">
                      <p className="text-gray-300">Markup</p>
                      <p className="text-white font-semibold">
                        ${quoteData.pricing.markup.toFixed(2)}
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-green-500/30">
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-white">Total</p>
                      <div className="text-right">
                        {editMode === 'pricing.total' ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white w-24"
                            />
                            <Button size="icon" variant="ghost" onClick={() => saveEdit('pricing.total')}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-green-400">
                              ${quoteData.pricing?.total?.toFixed(2) || '0.00'}
                            </p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('pricing.total', quoteData.pricing?.total)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {quoteData.pricing?.timeline && (
                  <div className="pt-3 border-t border-green-500/30">
                    <p className="text-sm text-gray-400">Timeline</p>
                    <p className="text-white font-semibold">{quoteData.pricing.timeline}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
              <CardContent className="pt-6 space-y-3">
                <Button
                  onClick={sendQuoteEmail}
                  disabled={isLoading || isSending || sendSuccess}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:opacity-50"
                  size="lg"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSending ? 'Sending...' : sendSuccess ? 'Sent!' : 'Create & Send Quote'}
                </Button>
                
                <Button
                  onClick={saveDraft}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  size="lg"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-white hover:bg-white/10"
                  size="lg"
                  disabled={isLoading}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
            
            {/* Success/Error Messages */}
            {sendSuccess && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-center">✅ Quote sent successfully!</p>
              </div>
            )}
            
            {sendError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-center">❌ {sendError}</p>
              </div>
            )}

            {/* Quick Actions */}
            <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={() => router.push('/create-quote')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Chat
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={() => router.push('/dashboard/quotes/new?prefill=' + encodeURIComponent(JSON.stringify(quoteData)))}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Advanced Edit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function QuoteReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-200">Loading quote review...</p>
        </div>
      </div>
    }>
      <QuoteReviewContent />
    </Suspense>
  )
}