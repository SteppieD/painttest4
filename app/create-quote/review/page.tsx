'use client'

// Quote Review Page - Professional invoice-style quote with subscription tiers
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, Send, Download, Save, Edit2, Check, X, Eye, Settings, 
  Lock, Crown, Phone, Mail, MapPin, 
  CheckCircle2, Sparkles, 
  CreditCard, Image, Globe, Upload
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'

// Subscription tiers with available features
const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    features: {
      basicQuote: true,
      customBranding: false,
      advancedPricing: false,
      customerPortal: false,
      digitalSignatures: false,
      paymentIntegration: false,
      analytics: false,
      customTerms: false,
      multipleTemplates: false,
      bulkQuoting: false,
      apiAccess: false,
      whiteLabel: false,
      customWorkflows: false,
      teamCollaboration: false,
      advancedReporting: false
    }
  },
  professional: {
    name: 'Professional',
    badge: 'Pro',
    color: 'bg-blue-500',
    features: {
      basicQuote: true,
      customBranding: true,
      advancedPricing: true,
      customerPortal: true,
      digitalSignatures: true,
      paymentIntegration: false,
      analytics: true,
      customTerms: true,
      multipleTemplates: true,
      bulkQuoting: false,
      apiAccess: false,
      whiteLabel: false,
      customWorkflows: false,
      teamCollaboration: true,
      advancedReporting: false
    }
  },
  business: {
    name: 'Business',
    badge: 'Business',
    color: 'bg-purple-500',
    features: {
      basicQuote: true,
      customBranding: true,
      advancedPricing: true,
      customerPortal: true,
      digitalSignatures: true,
      paymentIntegration: true,
      analytics: true,
      customTerms: true,
      multipleTemplates: true,
      bulkQuoting: true,
      apiAccess: true,
      whiteLabel: true,
      customWorkflows: true,
      teamCollaboration: true,
      advancedReporting: true
    }
  },
  enterprise: {
    name: 'Enterprise',
    badge: 'Enterprise',
    color: 'bg-gradient-to-r from-amber-500 to-orange-500',
    features: {
      basicQuote: true,
      customBranding: true,
      advancedPricing: true,
      customerPortal: true,
      digitalSignatures: true,
      paymentIntegration: true,
      analytics: true,
      customTerms: true,
      multipleTemplates: true,
      bulkQuoting: true,
      apiAccess: true,
      whiteLabel: true,
      customWorkflows: true,
      teamCollaboration: true,
      advancedReporting: true
    }
  }
}

function QuoteReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [editMode, setEditMode] = useState<string | null>(null)
  const [quoteData, setQuoteData] = useState<Record<string, unknown> | null>(null)
  const [editedValue, setEditedValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const [sendError, setSendError] = useState('')
  
  // Get user subscription tier from localStorage (would come from auth/API in production)
  const [userTier, setUserTier] = useState<keyof typeof SUBSCRIPTION_TIERS>('free')
  
  useEffect(() => {
    // Get subscription tier from company data
    const companyData = localStorage.getItem('paintquote_company')
    if (companyData) {
      const company = JSON.parse(companyData)
      // Determine tier based on access code or subscription level
      if (company.access_code === 'DEMO2024') {
        setUserTier('professional') // Demo gets Professional features
      } else if (company.subscription_tier) {
        setUserTier(company.subscription_tier)
      }
    }
  }, [])
  
  // Check if feature is available for user's tier
  const hasFeature = (feature: keyof typeof SUBSCRIPTION_TIERS.free.features) => {
    return (SUBSCRIPTION_TIERS as any)[userTier]?.features[feature] || false
  }
  
  // Visibility settings with tier restrictions
  const [visibilitySettings, setVisibilitySettings] = useState({
    showMaterialsBreakdown: true,
    showLaborBreakdown: true,
    showMaterialsItemized: true,  // New: control itemized vs summary for materials
    showLaborItemized: true,      // New: control itemized vs summary for labor
    showPaintDetails: hasFeature('advancedPricing'),
    showHourlyRates: false,
    showMarkup: false,
    showTimeline: true,
    showWarranty: true,
    showPaymentTerms: true,
    showCompanyInfo: true,
    showLicense: hasFeature('customBranding'),
    showInsurance: hasFeature('customBranding'),
    showDigitalSignature: hasFeature('digitalSignatures'),
    showCustomerPortal: hasFeature('customerPortal'),
    showPaymentButton: hasFeature('paymentIntegration'),
  })

  // Company branding settings (Contractor's business info)
  const [companySettings, setCompanySettings] = useState({
    companyName: 'Your Painting Company',
    tagline: 'Professional Painting Services',
    logo: null as string | null,
    primaryColor: '#3B82F6', // Blue
    secondaryColor: '#10B981', // Green
    companyPhone: '555-PAINT-NOW',
    companyEmail: 'info@yourcompany.com',
    companyWebsite: 'www.yourcompany.com',
    companyAddress: '123 Main St, Your City, ST 12345',
    licenseNumber: 'LIC#123456',
    insuranceInfo: 'Fully insured and bonded - $2M liability',
    taxId: 'TAX-ID-123456',
  })

  // Quote settings
  const [quoteSettings, setQuoteSettings] = useState({
    quoteTemplate: 'modern', // modern, classic, minimal
    validityDays: 30,
    depositPercentage: 25,
    warranty: '2 years on labor, manufacturer warranty on materials',
    paymentTerms: '25% deposit, 50% on start, 25% on completion',
    paymentMethods: 'Cash, Check, Credit Card, ACH Transfer',
    termsAndConditions: 'Standard terms and conditions apply. See website for details.',
    notes: '',
  })

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data))
        
        // Calculate the total base cost (before markup)
        // Rates already include everything: materials, labor, supplies
        const calculateTotalBaseCost = () => {
          // If total cost was provided, work backwards from it
          if (parsed.totalCost) {
            const markupPercentage = parsed.markupPercentage || 30
            return parsed.totalCost / (1 + markupPercentage / 100)
          }
          
          let totalBaseCost = 0
          
          // Calculate from measurements and rates
          if (parsed.measurements) {
            const wallSqft = parsed.measurements.wallSqft || 0
            const ceilingSqft = parsed.measurements.ceilingSqft || 0
            const ratePerSqft = parsed.ratePerSqft || 1.20 // Composite rate
            
            totalBaseCost = (wallSqft + ceilingSqft) * ratePerSqft
          }
          
          // Add any additional line items
          if (parsed.lineItems && parsed.lineItems.length > 0) {
            parsed.lineItems.forEach((item: any) => {
              totalBaseCost += item.total || 0
            })
          }
          
          return totalBaseCost
        }
        
        // Get the base cost first
        const baseCost = calculateTotalBaseCost()
        
        // Labor is 30% of the base cost (internal calculation)
        const laborCost = baseCost * 0.3
        
        // Materials is 70% of the base cost (internal calculation)  
        const materialsCost = baseCost * 0.7
        
        // Calculate breakdown for display (proportional to the 70/30 split)
        // This is just for showing itemized details, not for calculating totals
        const calculateBreakdown = () => {
          if (!parsed.pricing) parsed.pricing = {}
          if (!parsed.pricing.breakdown) parsed.pricing.breakdown = {}
          
          // For materials breakdown (70% of base cost)
          if (parsed.paintProducts && parsed.measurements) {
            const wallSqft = parsed.measurements.wallSqft || 0
            const ceilingSqft = parsed.measurements.ceilingSqft || 0
            
            // Proportionally allocate the materials cost
            const totalSqft = wallSqft + ceilingSqft
            if (totalSqft > 0) {
              // Wall paint gets proportional share of materials
              if (wallSqft > 0) {
                const wallShare = (wallSqft / totalSqft) * materialsCost * 0.6 // 60% for paint
                const gallonsNeeded = Math.ceil(wallSqft / 350)
                parsed.pricing.breakdown.wallPaint = {
                  gallons: gallonsNeeded,
                  costPerGallon: wallShare / gallonsNeeded,
                  cost: wallShare,
                  product: parsed.paintProducts.walls?.name || 'Premium Wall Paint',
                  finish: parsed.paintProducts.walls?.finish || 'Eggshell'
                }
              }
              
              // Ceiling paint
              if (ceilingSqft > 0) {
                const ceilingShare = (ceilingSqft / totalSqft) * materialsCost * 0.3 // 30% for ceiling
                const gallonsNeeded = Math.ceil(ceilingSqft / 400)
                parsed.pricing.breakdown.ceilingPaint = {
                  gallons: gallonsNeeded,
                  costPerGallon: ceilingShare / gallonsNeeded,
                  cost: ceilingShare,
                  product: parsed.paintProducts.ceiling?.name || 'Ceiling Paint',
                  finish: 'Flat'
                }
              }
              
              // Supplies always get 10% of materials
              parsed.pricing.breakdown.supplies = materialsCost * 0.1
            }
          }
          
          // For labor breakdown (30% of base cost)
          const sqft = (parsed.measurements?.wallSqft || 0) + (parsed.measurements?.ceilingSqft || 0)
          if (sqft > 0) {
            const hourlyRate = 50
            
            // Calculate prep work hours based on prep level
            let prepHours = 0
            if (parsed.prepWork === 'extensive') prepHours = 16
            else if (parsed.prepWork === 'moderate') prepHours = 8
            else if (parsed.prepWork === 'minor') prepHours = 4
            
            // Calculate painting hours (200 sqft per 8-hour day)
            const paintingHours = Math.ceil(sqft / 200) * 8
            const totalHours = prepHours + paintingHours
            
            // Distribute labor cost proportionally
            if (totalHours > 0) {
              if (prepHours > 0) {
                parsed.pricing.breakdown.prepWork = {
                  hours: prepHours,
                  rate: hourlyRate,
                  cost: (prepHours / totalHours) * laborCost
                }
              }
              
              if (paintingHours > 0) {
                parsed.pricing.breakdown.painting = {
                  hours: paintingHours,
                  rate: hourlyRate,
                  cost: (paintingHours / totalHours) * laborCost
                }
              }
            }
          }
        }
        
        // Calculate breakdown for display
        calculateBreakdown()
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
        
        // Generate quote number
        parsed.quoteNumber = `PQ-${Date.now().toString().slice(-6)}`
        parsed.quoteDate = new Date().toISOString()
        
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

  const handleEdit = (field: string, value: string | number | boolean) => {
    setEditMode(field)
    setEditedValue(String(value || ''))
  }

  const saveEdit = (field: string) => {
    const fieldPath = field.split('.')
    const newData = { ...quoteData }
    
    // Navigate to nested field and update value
    let current: any = newData
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
      if (!(newData as any).pricing) {
        (newData as any).pricing = {}
      }
      const pricing = (newData as any).pricing
      const materials = pricing?.materials?.total || 0
      const labor = pricing?.labor?.total || 0
      const subtotal = materials + labor
      const markup = subtotal * ((pricing?.markupPercentage || 30) / 100)
      pricing.subtotal = subtotal
      pricing.markup = markup
      pricing.total = subtotal + markup
    }
    
    setQuoteData(newData)
    setEditMode(null)
  }

  const cancelEdit = () => {
    setEditMode(null)
    setEditedValue('')
  }

  const sendQuoteEmail = async () => {
    if (!quoteData || !quote.customerEmail) {
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
          to: quote.customerEmail,
          customerName: quote.customerName || 'Valued Customer',
          quoteData: {
            ...quote,
            visibilitySettings,
            quoteSettings,
            companySettings,
            userTier,
          },
          companyInfo: companySettings,
        })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setSendSuccess(true)
        toast({
          title: 'Quote Sent Successfully!',
          description: `The quote has been sent to ${quote.customerEmail}`,
        })
        
        // Track analytics if available
        if (hasFeature('analytics')) {
          // Track quote sent event
          console.log('Analytics: Quote sent', quote.quoteNumber)
        }
        
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
          companySettings,
          userTier,
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
      quoteSettings,
      companySettings,
    }))
    toast({
      title: 'Draft Saved',
      description: 'Your quote draft has been saved.',
    })
  }
  
  const downloadPDF = () => {
    if (!hasFeature('basicQuote')) {
      toast({
        title: 'Upgrade Required',
        description: 'PDF download requires a paid subscription.',
        variant: 'destructive'
      })
      return
    }
    
    // In production, this would generate a real PDF
    toast({
      title: 'Downloading PDF',
      description: 'Your quote PDF is being generated...',
    })
  }

  if (!quoteData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // TypeScript now knows quoteData is not null
  const quote = quoteData as any

  const getTotal = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value
    if (typeof value === 'object' && value && 'total' in value) return (value as any).total || 0
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/create-quote">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">Quote #{quote.quoteNumber}</h1>
                  {userTier !== 'free' && (
                    <Badge className={(SUBSCRIPTION_TIERS as any)[userTier]?.color}>
                      {(SUBSCRIPTION_TIERS as any)[userTier]?.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">Review and customize your professional quote</p>
              </div>
            </div>
            
            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={saveDraft}
                variant="outline"
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button
                onClick={downloadPDF}
                variant="outline"
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              
              <Button
                onClick={sendQuoteEmail}
                disabled={isLoading || isSending || sendSuccess}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSending ? 'Sending...' : sendSuccess ? 'Sent!' : 'Send to Customer'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-100 p-1">
            <TabsTrigger value="preview" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="edit" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </TabsTrigger>
          </TabsList>

          {/* Preview Tab - Professional Invoice Layout */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="max-w-5xl mx-auto shadow-xl">
              <CardContent className="p-0">
                {/* Invoice Header with Contractor's Business Info */}
                <div className="bg-white p-8 border-b">
                  <div className="flex justify-between items-start">
                    {/* Left side - Logo and Company Info */}
                    <div className="flex gap-6">
                      {/* Logo Space */}
                      <div className="flex-shrink-0">
                        {companySettings.logo ? (
                          <img 
                            src={companySettings.logo} 
                            alt={companySettings.companyName}
                            className="h-20 w-20 object-contain rounded-lg"
                          />
                        ) : (
                          <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <div className="text-center">
                              <Image className="h-6 w-6 text-gray-400 mx-auto" aria-label="Logo placeholder" />
                              <p className="text-xs text-gray-500 mt-1">Logo</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Company Details */}
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          {hasFeature('customBranding') ? companySettings.companyName : 'Your Painting Company'}
                        </h1>
                        <p className="text-gray-600 mb-2">
                          {hasFeature('customBranding') ? companySettings.tagline : 'Professional Painting Services'}
                        </p>
                        <div className="text-sm text-gray-600 space-y-0.5">
                          <p>{companySettings.companyPhone} • {companySettings.companyEmail}</p>
                          <p>{companySettings.companyAddress}</p>
                          {visibilitySettings.showLicense && <p>License: {companySettings.licenseNumber}</p>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Quote Label */}
                    <div className="text-right">
                      <div 
                        className="inline-block px-6 py-3 rounded-lg mb-2"
                        style={{ 
                          background: hasFeature('customBranding') 
                            ? `linear-gradient(135deg, ${companySettings.primaryColor}, ${companySettings.secondaryColor})`
                            : 'linear-gradient(135deg, #3B82F6, #10B981)'
                        }}
                      >
                        <p className="text-2xl font-bold text-white">QUOTE</p>
                      </div>
                      <p className="text-lg font-medium text-gray-700">#{quote.quoteNumber}</p>
                      <p className="text-sm text-gray-500">{quoteDate}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Quote Details Grid */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Bill To */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bill To</h3>
                      <div className="space-y-1">
                        <p className="font-semibold text-lg">{quote.customerName || 'Customer Name'}</p>
                        {quote.customerEmail && (
                          <p className="text-gray-600 flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {quote.customerEmail}
                          </p>
                        )}
                        {quote.customerPhone && (
                          <p className="text-gray-600 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {quote.customerPhone}
                          </p>
                        )}
                        {quote.address && (
                          <p className="text-gray-600 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {quote.address}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quote Info */}
                    <div className="text-right">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quote Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quote Date:</span>
                          <span className="font-medium">{quoteDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valid Until:</span>
                          <span className="font-medium">{validUntil}</span>
                        </div>
                        {hasFeature('advancedPricing') && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Project Type:</span>
                            <span className="font-medium capitalize">{quote.projectType} Painting</span>
                          </div>
                        )}
                        {quote.pricing?.timeline && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Timeline:</span>
                            <span className="font-medium">{quote.pricing.timeline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>


                  {/* Line Items Table */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Services & Materials</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                            {hasFeature('advancedPricing') && (
                              <>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">Qty</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">Rate</th>
                              </>
                            )}
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {/* Materials Section */}
                          {visibilitySettings.showMaterialsBreakdown && (
                            visibilitySettings.showMaterialsItemized && quote.pricing?.breakdown ? (
                              <>
                                {quote.pricing.breakdown.wallPaint && (
                                <tr>
                                  <td className="py-3 px-4">
                                    <p className="font-medium">Wall Paint</p>
                                    {visibilitySettings.showPaintDetails && (
                                      <p className="text-sm text-gray-600">
                                        {quote.pricing.breakdown.wallPaint.product} - {quote.pricing.breakdown.wallPaint.finish}
                                      </p>
                                    )}
                                  </td>
                                  {hasFeature('advancedPricing') && (
                                    <>
                                      <td className="text-right py-3 px-4">{quote.pricing.breakdown.wallPaint.gallons} gal</td>
                                      <td className="text-right py-3 px-4">${quote.pricing.breakdown.wallPaint.costPerGallon}</td>
                                    </>
                                  )}
                                  <td className="text-right py-3 px-4 font-medium">
                                    ${quote.pricing.breakdown.wallPaint.cost.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              
                              {quote.pricing.breakdown.ceilingPaint && (
                                <tr>
                                  <td className="py-3 px-4">
                                    <p className="font-medium">Ceiling Paint</p>
                                    {visibilitySettings.showPaintDetails && (
                                      <p className="text-sm text-gray-600">
                                        {quote.pricing.breakdown.ceilingPaint.product} - {quote.pricing.breakdown.ceilingPaint.finish}
                                      </p>
                                    )}
                                  </td>
                                  {hasFeature('advancedPricing') && (
                                    <>
                                      <td className="text-right py-3 px-4">{quote.pricing.breakdown.ceilingPaint.gallons} gal</td>
                                      <td className="text-right py-3 px-4">${quote.pricing.breakdown.ceilingPaint.costPerGallon}</td>
                                    </>
                                  )}
                                  <td className="text-right py-3 px-4 font-medium">
                                    ${quote.pricing.breakdown.ceilingPaint.cost.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              
                              {quote.pricing.breakdown.primer && (
                                <tr>
                                  <td className="py-3 px-4">
                                    <p className="font-medium">Primer</p>
                                    <p className="text-sm text-gray-600">Professional grade primer</p>
                                  </td>
                                  {hasFeature('advancedPricing') && (
                                    <>
                                      <td className="text-right py-3 px-4">{quote.pricing.breakdown.primer.gallons} gal</td>
                                      <td className="text-right py-3 px-4">${quote.pricing.breakdown.primer.costPerGallon}</td>
                                    </>
                                  )}
                                  <td className="text-right py-3 px-4 font-medium">
                                    ${quote.pricing.breakdown.primer.cost.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              
                              {quote.pricing.breakdown.supplies && (
                                <tr>
                                  <td className="py-3 px-4">
                                    <p className="font-medium">Supplies & Equipment</p>
                                    <p className="text-sm text-gray-600">Brushes, rollers, tape, drop cloths, etc.</p>
                                  </td>
                                  {hasFeature('advancedPricing') && (
                                    <>
                                      <td className="text-right py-3 px-4">1</td>
                                      <td className="text-right py-3 px-4">-</td>
                                    </>
                                  )}
                                  <td className="text-right py-3 px-4 font-medium">
                                    ${quote.pricing.breakdown.supplies.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              </>
                            ) : (
                              <tr>
                                <td className="py-3 px-4">
                                  <p className="font-medium">Materials</p>
                                  <p className="text-sm text-gray-600">Paint, primer, and supplies</p>
                                </td>
                                {hasFeature('advancedPricing') && (
                                  <>
                                    <td className="text-right py-3 px-4">-</td>
                                    <td className="text-right py-3 px-4">-</td>
                                  </>
                                )}
                                <td className="text-right py-3 px-4 font-medium">
                                  ${getTotal(quote.pricing?.materials).toFixed(2)}
                                </td>
                              </tr>
                            )
                          )}

                          {/* Labor Section */}
                          {visibilitySettings.showLaborBreakdown && (
                            visibilitySettings.showLaborItemized && quote.pricing?.breakdown ? (
                              <>
                              {quote.pricing.breakdown.prepWork && (
                                <tr>
                                  <td className="py-3 px-4">
                                    <p className="font-medium">Prep Work</p>
                                    <p className="text-sm text-gray-600">Surface preparation, patching, sanding</p>
                                  </td>
                                  {hasFeature('advancedPricing') && (
                                    <>
                                      <td className="text-right py-3 px-4">{quote.pricing.breakdown.prepWork.hours} hrs</td>
                                      <td className="text-right py-3 px-4">
                                        {visibilitySettings.showHourlyRates ? `$${quote.pricing.breakdown.prepWork.rate}/hr` : '-'}
                                      </td>
                                    </>
                                  )}
                                  <td className="text-right py-3 px-4 font-medium">
                                    ${quote.pricing.breakdown.prepWork.cost.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              
                              {quote.pricing.breakdown.painting && (
                                <tr>
                                  <td className="py-3 px-4">
                                    <p className="font-medium">Painting Labor</p>
                                    <p className="text-sm text-gray-600">Professional painting application</p>
                                  </td>
                                  {hasFeature('advancedPricing') && (
                                    <>
                                      <td className="text-right py-3 px-4">{quote.pricing.breakdown.painting.hours} hrs</td>
                                      <td className="text-right py-3 px-4">
                                        {visibilitySettings.showHourlyRates ? `$${quote.pricing.breakdown.painting.rate}/hr` : '-'}
                                      </td>
                                    </>
                                  )}
                                  <td className="text-right py-3 px-4 font-medium">
                                    ${quote.pricing.breakdown.painting.cost.toFixed(2)}
                                  </td>
                                </tr>
                              )}
                              </>
                            ) : (
                              <tr>
                                <td className="py-3 px-4">
                                  <p className="font-medium">Labor</p>
                                  <p className="text-sm text-gray-600">Professional painting services</p>
                                </td>
                                {hasFeature('advancedPricing') && (
                                  <>
                                    <td className="text-right py-3 px-4">-</td>
                                    <td className="text-right py-3 px-4">-</td>
                                  </>
                                )}
                                <td className="text-right py-3 px-4 font-medium">
                                  ${getTotal(quote.pricing?.labor).toFixed(2)}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Totals Section */}
                  <div className="mb-8">
                    <div className="ml-auto max-w-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">${quote.pricing?.subtotal?.toFixed(2) || '0.00'}</span>
                        </div>
                        
                        {visibilitySettings.showMarkup && quote.pricing?.markup > 0 && (
                          <div className="flex justify-between py-2 border-t">
                            <span className="text-gray-600">Overhead & Profit ({quote.pricing.markupPercentage}%)</span>
                            <span className="font-medium">${quote.pricing.markup.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between py-3 border-t-2 border-gray-900">
                          <span className="text-xl font-bold">Total</span>
                          <span className="text-2xl font-bold text-blue-600">
                            ${quote.pricing?.total?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                        
                        {hasFeature('paymentIntegration') && (
                          <div className="pt-2">
                            <p className="text-sm text-gray-600">
                              Deposit Required ({quoteSettings.depositPercentage}%): 
                              <span className="font-semibold ml-2">
                                ${(quote.pricing?.total * (quoteSettings.depositPercentage / 100)).toFixed(2)}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Payment Terms */}
                    {visibilitySettings.showPaymentTerms && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment Terms</h3>
                        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                          <p className="text-sm">{quoteSettings.paymentTerms}</p>
                          <p className="text-sm text-gray-600">Accepted: {quoteSettings.paymentMethods}</p>
                        </div>
                      </div>
                    )}

                    {/* Warranty */}
                    {visibilitySettings.showWarranty && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Warranty</h3>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm">{quoteSettings.warranty}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {quoteSettings.notes && (
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Additional Notes</h3>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <p className="text-sm">{quoteSettings.notes}</p>
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Ready to Transform Your Space?</h3>
                    <p className="text-gray-600 mb-4">This quote is valid until {validUntil}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {hasFeature('digitalSignatures') && visibilitySettings.showDigitalSignature && (
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Accept & Sign Quote
                        </Button>
                      )}
                      
                      {hasFeature('customerPortal') && visibilitySettings.showCustomerPortal && (
                        <Button variant="outline">
                          <Globe className="h-4 w-4 mr-2" />
                          View in Customer Portal
                        </Button>
                      )}
                      
                      {hasFeature('paymentIntegration') && visibilitySettings.showPaymentButton && (
                        <Button variant="outline">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Deposit Now
                        </Button>
                      )}
                      
                      {!hasFeature('digitalSignatures') && !hasFeature('customerPortal') && (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Us to Accept
                        </Button>
                      )}
                    </div>

                    {userTier === 'free' && (
                      <div className="mt-4 p-3 bg-white/50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <Lock className="h-4 w-4 inline mr-1" />
                          Upgrade to Professional to enable digital signatures and customer portal
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-8 border-t text-center">
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Thank you for considering {companySettings.companyName}</p>
                      <p>
                        {companySettings.companyPhone} • {companySettings.companyEmail}
                        {hasFeature('customBranding') && companySettings.companyWebsite && (
                          <> • {companySettings.companyWebsite}</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Edit Tab */}
          <TabsContent value="edit" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3 max-w-7xl mx-auto">
              {/* Customer Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Customer Name</Label>
                      <div className="flex items-center gap-2">
                        {editMode === 'customerName' ? (
                          <>
                            <Input
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
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
                            <p className="flex-1">{quote.customerName || 'Not specified'}</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('customerName', quote.customerName)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Email</Label>
                      <div className="flex items-center gap-2">
                        {editMode === 'customerEmail' ? (
                          <>
                            <Input
                              type="email"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
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
                            <p className="flex-1">{quote.customerEmail || 'Not specified'}</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('customerEmail', quote.customerEmail)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Phone</Label>
                      <div className="flex items-center gap-2">
                        {editMode === 'customerPhone' ? (
                          <>
                            <Input
                              type="tel"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
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
                            <p className="flex-1">{quote.customerPhone || 'Not specified'}</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('customerPhone', quote.customerPhone)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Address</Label>
                      <div className="flex items-center gap-2">
                        {editMode === 'address' ? (
                          <>
                            <Input
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
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
                            <p className="flex-1">{quote.address || 'Not specified'}</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('address', quote.address)}
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
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  {hasFeature('advancedPricing') ? (
                    <CardDescription>Adjust pricing with advanced controls</CardDescription>
                  ) : (
                    <CardDescription>
                      <Lock className="h-3 w-3 inline mr-1" />
                      Upgrade to Professional for advanced pricing
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Materials Cost</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'pricing.materials.total' ? (
                        <>
                          <Input
                            type="number"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            disabled={!hasFeature('advancedPricing')}
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
                          <p className="flex-1">${getTotal(quote.pricing?.materials).toFixed(2)}</p>
                          {hasFeature('advancedPricing') && (
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('pricing.materials.total', getTotal(quote.pricing?.materials))}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Labor Cost</Label>
                    <div className="flex items-center gap-2">
                      {editMode === 'pricing.labor.total' ? (
                        <>
                          <Input
                            type="number"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            disabled={!hasFeature('advancedPricing')}
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
                          <p className="flex-1">${getTotal(quote.pricing?.labor).toFixed(2)}</p>
                          {hasFeature('advancedPricing') && (
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('pricing.labor.total', getTotal(quote.pricing?.labor))}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  {hasFeature('advancedPricing') && (
                    <div>
                      <Label>Markup %</Label>
                      <div className="flex items-center gap-2">
                        {editMode === 'pricing.markupPercentage' ? (
                          <>
                            <Input
                              type="number"
                              value={editedValue}
                              onChange={(e) => setEditedValue(e.target.value)}
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
                            <p className="flex-1">{quote.pricing?.markupPercentage || 30}%</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => handleEdit('pricing.markupPercentage', quote.pricing?.markupPercentage || 30)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div>
                    <Label>Final Total</Label>
                    <p className="text-2xl font-bold text-blue-600">
                      ${quote.pricing?.total?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab - Customization Options */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2 max-w-7xl mx-auto">
              {/* Visibility Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Visibility Settings</CardTitle>
                  <CardDescription>
                    Control what information is visible to customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Materials Section</Label>
                      <p className="text-sm text-gray-500">Include materials costs in quote</p>
                    </div>
                    <Switch
                      checked={visibilitySettings.showMaterialsBreakdown}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showMaterialsBreakdown: checked }))}
                    />
                  </div>

                  {visibilitySettings.showMaterialsBreakdown && (
                    <div className="flex items-center justify-between ml-6">
                      <div className="space-y-0.5">
                        <Label>Itemize Materials</Label>
                        <p className="text-sm text-gray-500">Show paint, primer, supplies separately</p>
                      </div>
                      <Switch
                        checked={visibilitySettings.showMaterialsItemized}
                        onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showMaterialsItemized: checked }))}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Labor Section</Label>
                      <p className="text-sm text-gray-500">Include labor costs in quote</p>
                    </div>
                    <Switch
                      checked={visibilitySettings.showLaborBreakdown}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showLaborBreakdown: checked }))}
                    />
                  </div>

                  {visibilitySettings.showLaborBreakdown && (
                    <div className="flex items-center justify-between ml-6">
                      <div className="space-y-0.5">
                        <Label>Itemize Labor</Label>
                        <p className="text-sm text-gray-500">Show prep work and painting separately</p>
                      </div>
                      <Switch
                        checked={visibilitySettings.showLaborItemized}
                        onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showLaborItemized: checked }))}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>
                        Paint Details
                        {!hasFeature('advancedPricing') && (
                          <Badge variant="outline" className="ml-2">Pro</Badge>
                        )}
                      </Label>
                      <p className="text-sm text-gray-500">Show paint brands and finishes</p>
                    </div>
                    <Switch
                      checked={visibilitySettings.showPaintDetails}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showPaintDetails: checked }))}
                      disabled={!hasFeature('advancedPricing')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>
                        Hourly Rates
                        {!hasFeature('advancedPricing') && (
                          <Badge variant="outline" className="ml-2">Pro</Badge>
                        )}
                      </Label>
                      <p className="text-sm text-gray-500">Show hourly labor rates</p>
                    </div>
                    <Switch
                      checked={visibilitySettings.showHourlyRates}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showHourlyRates: checked }))}
                      disabled={!hasFeature('advancedPricing')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>
                        Digital Signatures
                        {!hasFeature('digitalSignatures') && (
                          <Badge variant="outline" className="ml-2">Pro</Badge>
                        )}
                      </Label>
                      <p className="text-sm text-gray-500">Enable quote acceptance signatures</p>
                    </div>
                    <Switch
                      checked={visibilitySettings.showDigitalSignature}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showDigitalSignature: checked }))}
                      disabled={!hasFeature('digitalSignatures')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>
                        Customer Portal
                        {!hasFeature('customerPortal') && (
                          <Badge variant="outline" className="ml-2">Pro</Badge>
                        )}
                      </Label>
                      <p className="text-sm text-gray-500">Portal access for customers</p>
                    </div>
                    <Switch
                      checked={visibilitySettings.showCustomerPortal}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showCustomerPortal: checked }))}
                      disabled={!hasFeature('customerPortal')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>
                        Payment Integration
                        {!hasFeature('paymentIntegration') && (
                          <Badge variant="outline" className="ml-2">Business</Badge>
                        )}
                      </Label>
                      <p className="text-sm text-gray-500">Accept deposits online</p>
                    </div>
                    <Switch
                      checked={visibilitySettings.showPaymentButton}
                      onCheckedChange={(checked) => setVisibilitySettings(prev => ({ ...prev, showPaymentButton: checked }))}
                      disabled={!hasFeature('paymentIntegration')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Branding Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Company Branding
                    {!hasFeature('customBranding') && (
                      <Badge variant="outline" className="ml-2">Pro</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Customize your company information and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Logo Upload */}
                  <div>
                    <Label>Company Logo</Label>
                    <div className="flex items-center gap-4 mt-2">
                      {companySettings.logo ? (
                        <div className="relative">
                          <img 
                            src={companySettings.logo} 
                            alt="Company logo"
                            className="h-16 w-16 object-contain rounded-lg border"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => setCompanySettings(prev => ({ ...prev, logo: null }))}
                            disabled={!hasFeature('customBranding')}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <Image className="h-6 w-6 text-gray-400" aria-label="Logo placeholder" />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="logo-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                setCompanySettings(prev => ({ ...prev, logo: reader.result as string }))
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          disabled={!hasFeature('customBranding')}
                        />
                        <Label 
                          htmlFor="logo-upload"
                          className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                            hasFeature('customBranding') 
                              ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer' 
                              : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Label>
                        {!hasFeature('customBranding') && (
                          <p className="text-xs text-gray-500 mt-1">Pro feature</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={companySettings.companyName}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, companyName: e.target.value }))}
                      disabled={!hasFeature('customBranding')}
                      placeholder="Your Painting Company"
                    />
                  </div>
                  
                  <div>
                    <Label>Tagline</Label>
                    <Input
                      value={companySettings.tagline}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, tagline: e.target.value }))}
                      disabled={!hasFeature('customBranding')}
                      placeholder="Professional Painting Services"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={companySettings.primaryColor}
                          onChange={(e) => setCompanySettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                          disabled={!hasFeature('customBranding')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={companySettings.primaryColor}
                          onChange={(e) => setCompanySettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                          disabled={!hasFeature('customBranding')}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={companySettings.secondaryColor}
                          onChange={(e) => setCompanySettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          disabled={!hasFeature('customBranding')}
                          className="w-16 h-10"
                        />
                        <Input
                          value={companySettings.secondaryColor}
                          onChange={(e) => setCompanySettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          disabled={!hasFeature('customBranding')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>License Number</Label>
                    <Input
                      value={companySettings.licenseNumber}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      disabled={!hasFeature('customBranding')}
                    />
                  </div>
                  
                  <div>
                    <Label>Insurance Info</Label>
                    <Input
                      value={companySettings.insuranceInfo}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, insuranceInfo: e.target.value }))}
                      disabled={!hasFeature('customBranding')}
                    />
                  </div>
                  
                  {!hasFeature('customBranding') && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <Lock className="h-4 w-4 inline mr-1" />
                        Upgrade to Professional to customize branding
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quote Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Quote Settings</CardTitle>
                  <CardDescription>
                    Configure quote terms and conditions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Quote Valid For (days)</Label>
                    <Input
                      type="number"
                      value={quoteSettings.validityDays}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, validityDays: parseInt(e.target.value) || 30 }))}
                    />
                  </div>
                  
                  <div>
                    <Label>Deposit Percentage</Label>
                    <Input
                      type="number"
                      value={quoteSettings.depositPercentage}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, depositPercentage: parseInt(e.target.value) || 25 }))}
                    />
                  </div>
                  
                  <div>
                    <Label>
                      Payment Terms
                      {!hasFeature('customTerms') && (
                        <Badge variant="outline" className="ml-2">Pro</Badge>
                      )}
                    </Label>
                    <Textarea
                      value={quoteSettings.paymentTerms}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, paymentTerms: e.target.value }))}
                      disabled={!hasFeature('customTerms')}
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label>
                      Warranty
                      {!hasFeature('customTerms') && (
                        <Badge variant="outline" className="ml-2">Pro</Badge>
                      )}
                    </Label>
                    <Textarea
                      value={quoteSettings.warranty}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, warranty: e.target.value }))}
                      disabled={!hasFeature('customTerms')}
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label>Additional Notes</Label>
                    <Textarea
                      value={quoteSettings.notes}
                      onChange={(e) => setQuoteSettings(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any additional notes for the customer..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Feature Upgrade Card */}
              {userTier === 'free' && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      Unlock Premium Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="font-medium">Professional Features:</p>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>✓ Custom branding & colors</li>
                        <li>✓ Digital signatures</li>
                        <li>✓ Customer portal access</li>
                        <li>✓ Advanced pricing controls</li>
                        <li>✓ Analytics & insights</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-medium">Business Features:</p>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>✓ Payment integration</li>
                        <li>✓ QuickBooks sync</li>
                        <li>✓ White-label portal</li>
                        <li>✓ API access</li>
                        <li>✓ Bulk quoting</li>
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => router.push('/pricing')}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mobile Action Buttons */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">
          <div className="flex gap-3">
            <Button
              onClick={saveDraft}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Button
              onClick={sendQuoteEmail}
              disabled={isLoading || isSending || sendSuccess}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending ? 'Sending...' : sendSuccess ? 'Sent!' : 'Send'}
            </Button>
          </div>
        </div>
        
        {/* Success/Error Messages */}
        {sendSuccess && (
          <div className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:w-96 p-4 bg-green-50 border border-green-200 rounded-lg z-50">
            <p className="text-green-700 text-center font-medium">
              <CheckCircle2 className="h-5 w-5 inline mr-2" />
              Quote sent successfully!
            </p>
          </div>
        )}
        
        {sendError && (
          <div className="fixed bottom-20 lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:w-96 p-4 bg-red-50 border border-red-200 rounded-lg z-50">
            <p className="text-red-700 text-center">{sendError}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default function QuoteReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quote...</p>
        </div>
      </div>
    }>
      <QuoteReviewContent />
    </Suspense>
  )
}