'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Send, Download, Save, Edit2, Check, X, Eye, EyeOff, FileText, Settings, Palette, Clock, Shield, CreditCard, Phone, Mail, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
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
  
  // Visibility settings for customer view
  const [visibilitySettings, setVisibilitySettings] = useState({
    showMaterialsBreakdown: true,
    showLaborBreakdown: true,
    showPaintDetails: true,
    showHourlyRates: false,
    showMarkup: false,
    showTimeline: true,
    showWarranty: true,
    showPaymentTerms: true,
    showCompanyInfo: true,
    showLicense: true,
    showInsurance: true,
  })

  // Additional quote settings
  const [quoteSettings, setQuoteSettings] = useState({
    validityDays: 30,
    depositPercentage: 25,
    warranty: '2 years on labor, manufacturer warranty on materials',
    paymentTerms: '25% deposit, 50% on start, 25% on completion',
    licenseNumber: 'LIC#123456',
    insuranceInfo: 'Fully insured and bonded - $2M liability',
    companyPhone: '1-800-PAINT-PRO',
    companyEmail: 'quotes@paintquotepro.com',
    companyAddress: '123 Business Ave, Suite 100, Austin, TX 78701',
  })

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data))
        
        // Calculate proper materials and labor costs
        const calculateMaterialsCost = () => {
          let totalMaterials = 0
          
          // Calculate paint cost
          if (parsed.paintProducts && parsed.measurements) {
            const wallSqft = parsed.measurements.wallSqft || 0
            const ceilingSqft = parsed.measurements.ceilingSqft || 0
            
            // Wall paint calculation
            if (parsed.paintProducts.walls && wallSqft > 0) {
              const coverageRate = parsed.paintProducts.walls.coverageRate || 350
              const costPerGallon = parsed.paintProducts.walls.costPerGallon || 50
              const gallonsNeeded = Math.ceil(wallSqft / coverageRate)
              const wallPaintCost = gallonsNeeded * costPerGallon
              totalMaterials += wallPaintCost
              
              // Update parsed data with breakdown
              if (!parsed.pricing) parsed.pricing = {}
              if (!parsed.pricing.breakdown) parsed.pricing.breakdown = {}
              parsed.pricing.breakdown.wallPaint = {
                gallons: gallonsNeeded,
                costPerGallon: costPerGallon,
                cost: wallPaintCost,
                product: parsed.paintProducts.walls.name,
                finish: parsed.paintProducts.walls.finish
              }
            }
            
            // Ceiling paint calculation
            if (parsed.paintProducts.ceiling && ceilingSqft > 0) {
              const coverageRate = parsed.paintProducts.ceiling.coverageRate || 400
              const costPerGallon = parsed.paintProducts.ceiling.costPerGallon || 45
              const gallonsNeeded = Math.ceil(ceilingSqft / coverageRate)
              const ceilingPaintCost = gallonsNeeded * costPerGallon
              totalMaterials += ceilingPaintCost
              
              parsed.pricing.breakdown.ceilingPaint = {
                gallons: gallonsNeeded,
                costPerGallon: costPerGallon,
                cost: ceilingPaintCost,
                product: parsed.paintProducts.ceiling.name,
                finish: parsed.paintProducts.ceiling.finish
              }
            }
            
            // Add primer if needed
            if (parsed.prepWork === 'extensive' || parsed.prepWork === 'moderate') {
              const primerSqft = wallSqft + ceilingSqft
              const primerCoverageRate = 400
              const primerCostPerGallon = 35
              const primerGallons = Math.ceil(primerSqft / primerCoverageRate)
              const primerCost = primerGallons * primerCostPerGallon
              totalMaterials += primerCost
              
              parsed.pricing.breakdown.primer = {
                gallons: primerGallons,
                costPerGallon: primerCostPerGallon,
                cost: primerCost
              }
            }
          }
          
          // Add supplies cost
          const suppliesCost = parsed.supplies?.basicSupplies || 150
          totalMaterials += suppliesCost
          if (parsed.pricing?.breakdown) {
            parsed.pricing.breakdown.supplies = suppliesCost
          }
          
          return totalMaterials
        }
        
        // Calculate labor cost
        const calculateLaborCost = () => {
          if (parsed.laborCost?.totalLabor) {
            return parsed.laborCost.totalLabor
          }
          
          // Fallback calculation
          const sqft = parsed.measurements?.wallSqft || 0
          const ratePerSqft = parsed.laborCost?.ratePerSqft || 1.5
          const laborCost = sqft * ratePerSqft
          
          // Add prep work hours
          if (parsed.pricing?.breakdown) {
            const hourlyRate = 50
            let prepHours = 0
            
            if (parsed.prepWork === 'extensive') prepHours = 16
            else if (parsed.prepWork === 'moderate') prepHours = 8
            else if (parsed.prepWork === 'minor') prepHours = 4
            
            if (prepHours > 0) {
              parsed.pricing.breakdown.prepWork = {
                hours: prepHours,
                rate: hourlyRate,
                cost: prepHours * hourlyRate
              }
            }
            
            // Calculate painting hours
            const paintingHours = Math.ceil(sqft / 200) * 8 // 200 sqft per 8-hour day
            parsed.pricing.breakdown.painting = {
              hours: paintingHours,
              rate: hourlyRate,
              cost: paintingHours * hourlyRate
            }
          }
          
          return laborCost
        }
        
        // Calculate costs
        const materialsCost = calculateMaterialsCost()
        const laborCost = calculateLaborCost()
        const subtotal = materialsCost + laborCost
        const markupPercentage = parsed.markupPercentage || 30
        const markup = subtotal * (markupPercentage / 100)
        const total = subtotal + markup
        
        // Update pricing structure
        if (!parsed.pricing) parsed.pricing = {}
        parsed.pricing.materials = { total: materialsCost }
        parsed.pricing.labor = { total: laborCost }
        parsed.pricing.subtotal = subtotal
        parsed.pricing.markup = markup
        parsed.pricing.markupPercentage = markupPercentage
        parsed.pricing.total = parsed.totalCost || total // Use provided total or calculated
        
        // Add timeline if not present
        if (!parsed.pricing.timeline) {
          const sqft = parsed.measurements?.wallSqft || 0
          if (sqft < 1000) parsed.pricing.timeline = '2-3 days'
          else if (sqft < 2500) parsed.pricing.timeline = '3-5 days'
          else if (sqft < 5000) parsed.pricing.timeline = '5-7 days'
          else parsed.pricing.timeline = '7-10 days'
        }
        
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
    const numericFields = ['total', 'materials', 'labor', 'markup', 'gallons', 'hours', 'cost', 'rate', 'costPerGallon']
    const lastField = fieldPath[fieldPath.length - 1]
    
    if (numericFields.some(f => lastField.includes(f))) {
      current[lastField] = parseFloat(editedValue) || 0
    } else {
      current[lastField] = editedValue
    }
    
    // Recalculate totals if materials or labor changed
    if (field.includes('materials') || field.includes('labor')) {
      const materials = newData.pricing?.materials?.total || 0
      const labor = newData.pricing?.labor?.total || 0
      const subtotal = materials + labor
      const markup = subtotal * ((newData.pricing?.markupPercentage || 30) / 100)
      newData.pricing.subtotal = subtotal
      newData.pricing.markup = markup
      newData.pricing.total = subtotal + markup
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
            ...quoteData,
            visibilitySettings,
            quoteSettings,
            id: Date.now().toString()
          },
          companyInfo: {
            name: 'PaintQuote Pro',
            phone: quoteSettings.companyPhone,
            email: quoteSettings.companyEmail,
            address: quoteSettings.companyAddress,
            license: quoteSettings.licenseNumber,
            insurance: quoteSettings.insuranceInfo,
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
          ...quoteData,
          visibilitySettings,
          quoteSettings,
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
    localStorage.setItem('quote_draft', JSON.stringify({
      ...quoteData,
      visibilitySettings,
      quoteSettings
    }))
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
  
  // Format date
  const quoteDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  const validUntil = new Date(Date.now() + quoteSettings.validityDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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
                <h1 className="text-xl font-semibold text-white">Review & Customize Quote</h1>
                <p className="text-sm text-gray-400">Configure what your customer will see</p>
              </div>
            </div>
            
            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={saveDraft}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button
                onClick={sendQuoteEmail}
                disabled={isLoading || isSending || sendSuccess}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSending ? 'Sending...' : sendSuccess ? 'Sent!' : 'Send to Customer'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-900/80 border border-white/10">
            <TabsTrigger value="preview" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="edit" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Preview Tab - Customer View */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-white text-gray-900 max-w-4xl mx-auto">
              <CardContent className="p-8">
                {/* Company Header */}
                <div className="text-center mb-8 pb-8 border-b">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">PaintQuote Pro</h1>
                  <p className="text-gray-600">Professional Painting Services</p>
                  {visibilitySettings.showCompanyInfo && (
                    <div className="mt-4 space-y-1 text-sm text-gray-600">
                      <p>{quoteSettings.companyPhone} • {quoteSettings.companyEmail}</p>
                      <p>{quoteSettings.companyAddress}</p>
                      {visibilitySettings.showLicense && <p>License: {quoteSettings.licenseNumber}</p>}
                      {visibilitySettings.showInsurance && <p>{quoteSettings.insuranceInfo}</p>}
                    </div>
                  )}
                </div>

                {/* Quote Header */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Quote For:</h2>
                    <div className="space-y-2">
                      <p className="font-medium">{quoteData.customerName || 'Valued Customer'}</p>
                      {quoteData.customerEmail && <p className="text-gray-600">{quoteData.customerEmail}</p>}
                      {quoteData.customerPhone && <p className="text-gray-600">{quoteData.customerPhone}</p>}
                      {quoteData.address && <p className="text-gray-600">{quoteData.address}</p>}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h2 className="text-lg font-semibold mb-4">Quote Details:</h2>
                    <div className="space-y-2 text-gray-600">
                      <p>Quote #: PQ-{Date.now().toString().slice(-6)}</p>
                      <p>Date: {quoteDate}</p>
                      <p>Valid Until: {validUntil}</p>
                    </div>
                  </div>
                </div>

                {/* Project Scope */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Project Scope</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium mb-2">Project Type:</p>
                        <p className="text-gray-700 capitalize">{quoteData.projectType} Painting</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Square Footage:</p>
                        <p className="text-gray-700">{quoteData.measurements?.wallSqft || 0} sq ft</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Surfaces:</p>
                        <p className="text-gray-700 capitalize">{quoteData.surfaces?.join(', ') || 'Walls'}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Prep Work:</p>
                        <p className="text-gray-700 capitalize">{quoteData.prepWork || 'Standard'}</p>
                      </div>
                    </div>
                    
                    {quoteData.specialRequests && quoteData.specialRequests.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2">Special Requirements:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {quoteData.specialRequests.map((req: string, idx: number) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
                  <div className="space-y-3">
                    {/* Materials */}
                    {visibilitySettings.showMaterialsBreakdown ? (
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">Materials</p>
                            {visibilitySettings.showPaintDetails && quoteData.pricing?.breakdown && (
                              <div className="mt-2 space-y-1 text-sm text-gray-600">
                                {quoteData.pricing.breakdown.wallPaint && (
                                  <p>• Wall Paint ({quoteData.pricing.breakdown.wallPaint.gallons} gal): ${quoteData.pricing.breakdown.wallPaint.cost.toFixed(2)}</p>
                                )}
                                {quoteData.pricing.breakdown.ceilingPaint && (
                                  <p>• Ceiling Paint ({quoteData.pricing.breakdown.ceilingPaint.gallons} gal): ${quoteData.pricing.breakdown.ceilingPaint.cost.toFixed(2)}</p>
                                )}
                                {quoteData.pricing.breakdown.primer && (
                                  <p>• Primer ({quoteData.pricing.breakdown.primer.gallons} gal): ${quoteData.pricing.breakdown.primer.cost.toFixed(2)}</p>
                                )}
                                {quoteData.pricing.breakdown.supplies && (
                                  <p>• Supplies & Equipment: ${quoteData.pricing.breakdown.supplies.toFixed(2)}</p>
                                )}
                              </div>
                            )}
                          </div>
                          <p className="font-semibold">${getTotal(quoteData.pricing?.materials).toFixed(2)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="border-b pb-3">
                        <div className="flex justify-between">
                          <p className="font-medium">Materials</p>
                          <p className="font-semibold">${getTotal(quoteData.pricing?.materials).toFixed(2)}</p>
                        </div>
                      </div>
                    )}

                    {/* Labor */}
                    {visibilitySettings.showLaborBreakdown ? (
                      <div className="border-b pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Labor</p>
                            {quoteData.pricing?.breakdown && (
                              <div className="mt-2 space-y-1 text-sm text-gray-600">
                                {quoteData.pricing.breakdown.prepWork && (
                                  <p>• Prep Work ({quoteData.pricing.breakdown.prepWork.hours} hrs{visibilitySettings.showHourlyRates && ` @ $${quoteData.pricing.breakdown.prepWork.rate}/hr`}): ${quoteData.pricing.breakdown.prepWork.cost.toFixed(2)}</p>
                                )}
                                {quoteData.pricing.breakdown.painting && (
                                  <p>• Painting ({quoteData.pricing.breakdown.painting.hours} hrs{visibilitySettings.showHourlyRates && ` @ $${quoteData.pricing.breakdown.painting.rate}/hr`}): ${quoteData.pricing.breakdown.painting.cost.toFixed(2)}</p>
                                )}
                              </div>
                            )}
                          </div>
                          <p className="font-semibold">${getTotal(quoteData.pricing?.labor).toFixed(2)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="border-b pb-3">
                        <div className="flex justify-between">
                          <p className="font-medium">Labor</p>
                          <p className="font-semibold">${getTotal(quoteData.pricing?.labor).toFixed(2)}</p>
                        </div>
                      </div>
                    )}

                    {/* Markup - Only show if enabled */}
                    {visibilitySettings.showMarkup && quoteData.pricing?.markup > 0 && (
                      <div className="border-b pb-3">
                        <div className="flex justify-between">
                          <p className="font-medium">Overhead & Profit ({quoteData.pricing.markupPercentage}%)</p>
                          <p className="font-semibold">${quoteData.pricing.markup.toFixed(2)}</p>
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="pt-3">
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold">Total Investment</p>
                        <p className="text-2xl font-bold text-green-600">${quoteData.pricing?.total?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                {visibilitySettings.showTimeline && quoteData.pricing?.timeline && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Project Timeline</h2>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-2" />
                        <p className="text-gray-700">Estimated Completion: <span className="font-semibold">{quoteData.pricing.timeline}</span></p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Terms */}
                {visibilitySettings.showPaymentTerms && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Payment Terms</h2>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
                        <p className="text-gray-700">{quoteSettings.paymentTerms}</p>
                      </div>
                      <p className="text-sm text-gray-600">Deposit amount: ${(quoteData.pricing?.total * (quoteSettings.depositPercentage / 100)).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">We accept cash, check, and all major credit cards</p>
                    </div>
                  </div>
                )}

                {/* Warranty */}
                {visibilitySettings.showWarranty && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Warranty & Guarantee</h2>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-gray-700 font-medium">{quoteSettings.warranty}</p>
                          <p className="text-sm text-gray-600 mt-1">We stand behind our work with a comprehensive warranty</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
                  <h3 className="text-xl font-semibold mb-2">Ready to Transform Your Space?</h3>
                  <p className="text-gray-600 mb-4">This quote is valid until {validUntil}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Accept Quote
                    </Button>
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call to Discuss
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
                  <p>Thank you for considering PaintQuote Pro for your painting needs.</p>
                  <p className="mt-2">Questions? Contact us at {quoteSettings.companyPhone} or {quoteSettings.companyEmail}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Edit Tab - Edit Quote Details */}
          <TabsContent value="edit" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Customer Information */}
              <Card className="lg:col-span-2 bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
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
                    
                    <div>
                      <Label className="text-gray-400">Phone</Label>
                      <div className="flex items-center gap-2">
                        {editMode === 'customerPhone' ? (
                          <>
                            <Input
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Button size="icon" variant="ghost" onClick={() => saveEdit('customerPhone')}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={cancelEdit}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-white">{quoteData.customerPhone || 'Not specified'}</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('customerPhone', quoteData.customerPhone)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
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
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Adjustments */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Pricing Adjustments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-400">Materials Cost</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'pricing.materials.total' ? (
                        <>
                          <Input
                            type="number"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button size="icon" variant="ghost" onClick={() => saveEdit('pricing.materials.total')}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-white">${getTotal(quoteData.pricing?.materials).toFixed(2)}</p>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEdit('pricing.materials.total', getTotal(quoteData.pricing?.materials))}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Labor Cost</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'pricing.labor.total' ? (
                        <>
                          <Input
                            type="number"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button size="icon" variant="ghost" onClick={() => saveEdit('pricing.labor.total')}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-white">${getTotal(quoteData.pricing?.labor).toFixed(2)}</p>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEdit('pricing.labor.total', getTotal(quoteData.pricing?.labor))}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Markup %</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'pricing.markupPercentage' ? (
                        <>
                          <Input
                            type="number"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button size="icon" variant="ghost" onClick={() => saveEdit('pricing.markupPercentage')}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-white">{quoteData.pricing?.markupPercentage || 30}%</p>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEdit('pricing.markupPercentage', quoteData.pricing?.markupPercentage || 30)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Label className="text-gray-400">Final Total</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'pricing.total' ? (
                        <>
                          <Input
                            type="number"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                          <Button size="icon" variant="ghost" onClick={() => saveEdit('pricing.total')}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-xl font-bold text-green-400">${quoteData.pricing?.total?.toFixed(2) || '0.00'}</p>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleEdit('pricing.total', quoteData.pricing?.total)}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab - Visibility & Company Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Visibility Settings */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Customer View Settings</CardTitle>
                  <CardDescription className="text-gray-400">
                    Control what information is visible to the customer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-materials" className="text-gray-300">Show Materials Breakdown</Label>
                    <Switch
                      id="show-materials"
                      checked={visibilitySettings.showMaterialsBreakdown}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showMaterialsBreakdown: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-labor" className="text-gray-300">Show Labor Breakdown</Label>
                    <Switch
                      id="show-labor"
                      checked={visibilitySettings.showLaborBreakdown}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showLaborBreakdown: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-paint" className="text-gray-300">Show Paint Details</Label>
                    <Switch
                      id="show-paint"
                      checked={visibilitySettings.showPaintDetails}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showPaintDetails: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-hourly" className="text-gray-300">Show Hourly Rates</Label>
                    <Switch
                      id="show-hourly"
                      checked={visibilitySettings.showHourlyRates}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showHourlyRates: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-markup" className="text-gray-300">Show Markup</Label>
                    <Switch
                      id="show-markup"
                      checked={visibilitySettings.showMarkup}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showMarkup: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-timeline" className="text-gray-300">Show Timeline</Label>
                    <Switch
                      id="show-timeline"
                      checked={visibilitySettings.showTimeline}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showTimeline: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-warranty" className="text-gray-300">Show Warranty</Label>
                    <Switch
                      id="show-warranty"
                      checked={visibilitySettings.showWarranty}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showWarranty: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-payment" className="text-gray-300">Show Payment Terms</Label>
                    <Switch
                      id="show-payment"
                      checked={visibilitySettings.showPaymentTerms}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showPaymentTerms: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-license" className="text-gray-300">Show License Info</Label>
                    <Switch
                      id="show-license"
                      checked={visibilitySettings.showLicense}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showLicense: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Company Settings */}
              <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quote Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-400">Quote Valid For (days)</Label>
                    <Input
                      type="number"
                      value={quoteSettings.validityDays}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, validityDays: parseInt(e.target.value) || 30 }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Deposit Percentage</Label>
                    <Input
                      type="number"
                      value={quoteSettings.depositPercentage}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, depositPercentage: parseInt(e.target.value) || 25 }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Payment Terms</Label>
                    <Textarea
                      value={quoteSettings.paymentTerms}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, paymentTerms: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Warranty</Label>
                    <Textarea
                      value={quoteSettings.warranty}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, warranty: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">License Number</Label>
                    <Input
                      value={quoteSettings.licenseNumber}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Insurance Info</Label>
                    <Input
                      value={quoteSettings.insuranceInfo}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, insuranceInfo: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile Action Buttons */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 z-50">
          <div className="flex gap-3">
            <Button
              onClick={saveDraft}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Button
              onClick={sendQuoteEmail}
              disabled={isLoading || isSending || sendSuccess}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending ? 'Sending...' : sendSuccess ? 'Sent!' : 'Send'}
            </Button>
          </div>
        </div>
        
        {/* Success/Error Messages */}
        {sendSuccess && (
          <div className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:w-96 p-4 bg-green-500/20 backdrop-blur-lg border border-green-500/30 rounded-lg z-50">
            <p className="text-green-400 text-center">✅ Quote sent successfully!</p>
          </div>
        )}
        
        {sendError && (
          <div className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:w-96 p-4 bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-lg z-50">
            <p className="text-red-400 text-center">❌ {sendError}</p>
          </div>
        )}
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