'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { DebugLogger } from '@/lib/debug-logger'
import { 
  Building2, 
  Calculator, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Sparkles,
  DollarSign,
  Clock,
  Users
} from 'lucide-react'

interface OnboardingData {
  // Step 1: Company Info
  companyName: string
  email: string
  phone: string
  
  // Step 2: Tax & Location
  taxRate: number
  city: string
  state: string
  
  // Step 3: Pricing Preferences
  laborRate: number
  markupPercentage: number
  minimumJobSize: number
}

const steps = [
  { id: 1, title: 'Company Information', icon: Building2 },
  { id: 2, title: 'Tax & Location', icon: Calculator },
  { id: 3, title: 'Pricing Preferences', icon: DollarSign },
  { id: 4, title: 'Get Started', icon: Sparkles }
]

export default function OnboardingPage() {
  const companyData = useCompanyAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    companyName: '',
    email: '',
    phone: '',
    taxRate: 0,
    city: '',
    state: '',
    laborRate: 45,
    markupPercentage: 30,
    minimumJobSize: 500
  })

  useEffect(() => {
    // Populate company data if available
    if (companyData) {
      setData(prev => ({
        ...prev,
        companyName: companyData.name || '',
        email: companyData.email || '',
        phone: companyData.phone || ''
      }))
      
      // Check if already completed onboarding
      if (companyData.onboarding_completed) {
        router.push('/dashboard')
      }
    }
  }, [companyData, router])

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    const logger = new DebugLogger('ONBOARDING_CLIENT');
    
    logger.checkpoint('Starting onboarding completion');
    logger.info('Company data check', { 
      hasCompanyData: !!companyData,
      companyId: companyData?.id 
    });
    
    if (!companyData) {
      logger.error('No company data found');
      toast({
        title: 'Error',
        description: 'No company data found. Please log in again.',
        variant: 'destructive'
      })
      router.push('/access-code')
      return
    }

    setSaving(true)
    logger.checkpoint('Preparing request');
    
    try {
      // Log the data being sent
      const requestHeaders = {
        'Content-Type': 'application/json',
        'x-company-data': JSON.stringify({ 
          id: companyData.id,
          access_code: companyData.access_code,
          name: companyData.name || data.companyName,
          email: companyData.email || data.email
        })
      };
      
      const requestBody = {
        ...data,
        onboarding_completed: true
      };
      
      logger.info('Request details', {
        url: '/api/companies/onboarding',
        method: 'POST',
        headerKeys: Object.keys(requestHeaders),
        bodyKeys: Object.keys(requestBody)
      });
      
      // Save all settings
      logger.checkpoint('Sending request to server');
      const response = await fetch('/api/companies/onboarding', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody)
      })

      logger.info('Response received', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json()
          logger.error('Server error response', errorData);
        } catch (jsonError) {
          logger.error('Failed to parse error response', jsonError);
          errorData = { error: `Server error: ${response.status} ${response.statusText}` }
        }
        logger.printSummary();
        throw new Error(errorData.error || 'Failed to complete onboarding')
      }

      // Parse success response
      const successData = await response.json();
      logger.success('Onboarding API succeeded', { 
        hasCompany: !!successData.company,
        hasDebugSummary: !!successData.debugSummary,
        hasWarning: !!successData.warning
      });

      // Update local storage with the correct company ID from the response
      logger.checkpoint('Updating local storage');
      const existingData = localStorage.getItem('paintquote_company')
      if (existingData) {
        const parsedData = JSON.parse(existingData)
        localStorage.setItem('paintquote_company', JSON.stringify({
          ...parsedData,
          id: successData.company.id || parsedData.id, // Use the ID from the server response
          onboarding_completed: true,
          ...data
        }))
      }

      logger.success('Onboarding completed successfully');
      logger.printSummary();

      // Show warning if there was one, but still continue
      if (successData.warning) {
        toast({
          title: 'Setup Complete',
          description: 'Your settings have been saved locally. You can start using the app now.',
        })
      } else {
        toast({
          title: 'Welcome to PaintQuote Pro!',
          description: 'Your account is all set up and ready to go.'
        })
      }

      router.push('/dashboard')
    } catch (error) {
      logger.error('Error completing onboarding', error);
      logger.printSummary();
      toast({
        title: 'Error',
        description: 'Failed to complete setup. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setSaving(false)
    }
  }

  const progress = (currentStep / 4) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to PaintQuote Pro! 🎨</h1>
          <p className="text-gray-200">Let{'s'} get your account set up in just a few minutes</p>
        </div>


        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id <= currentStep ? 'text-white' : 'text-gray-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.id < currentStep
                      ? 'bg-green-500 border-green-500'
                      : step.id === currentStep
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-600'
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className="text-base mt-1 hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6">
          {currentStep === 1 && (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Company Information</h3>
                <p className="text-base text-gray-200 mt-1.5">
                  Tell us about your painting business
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-gray-100">Company Name</Label>
                  <Input
                    id="companyName"
                    value={data.companyName}
                    onChange={(e) => setData({ ...data, companyName: e.target.value })}
                    className="bg-gray-900/70 border-white/20 text-white"
                    placeholder="ABC Painting Co."
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-100">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="bg-gray-900/70 border-white/20 text-white"
                    placeholder="contact@abcpainting.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-100">Business Phone</Label>
                  <Input
                    id="phone"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="bg-gray-900/70 border-white/20 text-white"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Tax & Location</h3>
                <p className="text-base text-gray-200 mt-1.5">
                  Set up your local tax rate and service area
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="taxRate" className="text-gray-100">Sales Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    value={data.taxRate}
                    onChange={(e) => setData({ ...data, taxRate: parseFloat(e.target.value) || 0 })}
                    className="bg-gray-900/70 border-white/20 text-white"
                    placeholder="8.25"
                  />
                  <p className="text-base text-gray-200 mt-1">
                    Enter your local sales tax rate (e.g., 8.25 for 8.25%)
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-gray-100">City</Label>
                    <Input
                      id="city"
                      value={data.city}
                      onChange={(e) => setData({ ...data, city: e.target.value })}
                      className="bg-gray-900/70 border-white/20 text-white"
                      placeholder="Phoenix"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-100">State</Label>
                    <Input
                      id="state"
                      value={data.state}
                      onChange={(e) => setData({ ...data, state: e.target.value })}
                      className="bg-gray-900/70 border-white/20 text-white"
                      placeholder="AZ"
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">Pricing Preferences</h3>
                <p className="text-base text-gray-200 mt-1.5">
                  Set your default rates and markups
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="laborRate" className="text-gray-100">Hourly Labor Rate ($)</Label>
                  <Input
                    id="laborRate"
                    type="number"
                    step="5"
                    value={data.laborRate}
                    onChange={(e) => setData({ ...data, laborRate: parseFloat(e.target.value) || 0 })}
                    className="bg-gray-900/70 border-white/20 text-white"
                    placeholder="45"
                  />
                  <p className="text-base text-gray-200 mt-1">
                    Your standard hourly rate for labor
                  </p>
                </div>
                <div>
                  <Label htmlFor="markup" className="text-gray-100">Default Markup (%)</Label>
                  <Input
                    id="markup"
                    type="number"
                    step="5"
                    value={data.markupPercentage}
                    onChange={(e) => setData({ ...data, markupPercentage: parseFloat(e.target.value) || 0 })}
                    className="bg-gray-900/70 border-white/20 text-white"
                    placeholder="30"
                  />
                  <p className="text-base text-gray-200 mt-1">
                    Industry standard is 20-50% depending on your market
                  </p>
                </div>
                <div>
                  <Label htmlFor="minimum" className="text-gray-100">Minimum Job Size ($)</Label>
                  <Input
                    id="minimum"
                    type="number"
                    step="100"
                    value={data.minimumJobSize}
                    onChange={(e) => setData({ ...data, minimumJobSize: parseFloat(e.target.value) || 0 })}
                    className="bg-gray-900/70 border-white/20 text-white"
                    placeholder="500"
                  />
                  <p className="text-base text-gray-200 mt-1">
                    Smallest job you{'ll'} accept
                  </p>
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight text-white">You{'re'} All Set! 🎉</h3>
                <p className="text-base text-gray-200 mt-1.5">
                  Here{'s'} what you can do with PaintQuote Pro
                </p>
              </div>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Create Quotes in Minutes</h3>
                      <p className="text-base text-gray-200">Use our AI assistant to generate professional quotes 10x faster</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Win More Jobs</h3>
                      <p className="text-base text-gray-200">Professional quotes with instant delivery help you close more deals</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Track Your Business</h3>
                      <p className="text-base text-gray-200">See your quotes, customers, and revenue all in one place</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                  <p className="text-base text-white font-medium mb-1">💡 Pro Tip</p>
                  <p className="text-base text-gray-100">
                    Start by creating your first quote using the AI assistant. It will guide you through the entire process!
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="p-6 border-t border-white/10 flex justify-between">
            <Button
              onClick={handleBack}
              disabled={currentStep === 1}
              variant="ghost"
              className="text-gray-200 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={saving}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                {saving ? 'Setting up...' : 'Start Using PaintQuote Pro'}
                <Sparkles className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-colors"
          >
            Skip Setup (Complete Later)
          </Button>
        </div>
      </div>
    </div>
  )
}