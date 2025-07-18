'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations/quote'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CustomerStep } from '@/components/quote-form/customer-step'
import { ProjectStep } from '@/components/quote-form/project-step'
import { SurfacesStep } from '@/components/quote-form/surfaces-step'
import { PaintStep } from '@/components/quote-form/paint-step'
import { ReviewStep } from '@/components/quote-form/review-step'
import { ChevronLeft, ChevronRight, Check, Smartphone } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const steps = [
  { id: 'customer', title: 'Customer', icon: '👤' },
  { id: 'project', title: 'Project', icon: '🏠' },
  { id: 'surfaces', title: 'Surfaces', icon: '🎨' },
  { id: 'paint', title: 'Paint', icon: '🪣' },
  { id: 'review', title: 'Review', icon: '✅' },
]

export default function MobileQuotePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      projectType: 'residential',
      surfaces: [],
      paintProducts: {},
      settings: {
        taxRate: 8.25,
        overheadPercent: 15,
        profitMargin: 30,
        laborRate: 45,
      },
    },
  })

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = async () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentStep < steps.length - 1) {
      await nextStep()
    }
    if (isRightSwipe && currentStep > 0) {
      prevStep()
    }
  }

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep)
    const isValid = await form.trigger(fields as (keyof QuoteFormData)[])
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      // Vibrate on step change if supported
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50)
      }
    }
  }

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create quote')
      }

      const quote = await response.json()
      
      toast({
        title: 'Quote created!',
        description: `Quote ${quote.quoteNumber} has been created successfully.`,
      })

      router.push(`/dashboard/quotes/${quote.id}`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create quote. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function getFieldsForStep(step: number): string[] {
    switch (step) {
      case 0: return ['customer']
      case 1: return ['projectType', 'description']
      case 2: return ['surfaces']
      case 3: return ['paintProducts']
      default: return []
    }
  }

  // Detect if user is on mobile
  useEffect(() => {
    const checkMobile = () => {
      // Guard against SSR
      if (typeof window === 'undefined') return
      
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        router.push('/dashboard/quotes/new')
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Quick Quote
          </h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted h-1">
          <div 
            className="bg-primary h-1 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mobile Progress Steps */}
      <div className="flex justify-around p-4 bg-muted/30">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`flex flex-col items-center ${
              index === currentStep ? 'scale-110' : ''
            }`}
          >
            <div
              className={`text-2xl mb-1 transition-all ${
                index <= currentStep ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {step.icon}
            </div>
            <span className={`text-xs ${
              index === currentStep ? 'font-semibold' : 'text-muted-foreground'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-4">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
              <CardDescription className="text-sm">
                {currentStep === 0 && "Who is this quote for?"}
                {currentStep === 1 && "What type of project?"}
                {currentStep === 2 && "What needs painting?"}
                {currentStep === 3 && "Select paint products"}
                {currentStep === 4 && "Review your quote"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="min-h-[400px]">
                {currentStep === 0 && <CustomerStep form={form} />}
                {currentStep === 1 && <ProjectStep form={form} />}
                {currentStep === 2 && <SurfacesStep form={form} />}
                {currentStep === 3 && <PaintStep form={form} />}
                {currentStep === 4 && <ReviewStep form={form} />}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex-1 h-12 text-base"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              className="flex-1 h-12 text-base"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 h-12 text-base"
            >
              {isSubmitting ? (
                'Creating...'
              ) : (
                <>
                  <Check className="h-5 w-5 mr-1" />
                  Create Quote
                </>
              )}
            </Button>
          )}
        </div>

        {/* Swipe Hint */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="text-center text-xs text-muted-foreground pb-20">
            Swipe left or right to navigate
          </div>
        )}
      </form>
    </div>
  )
}