'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'
import { useCompanyAuth } from '@/components/auth-wrapper'
import { 
  Send, 
  Sparkles, 
  Building2,
  Calculator,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Loader2
} from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface OnboardingData {
  companyName?: string
  email?: string
  phone?: string
  taxRate?: number
  city?: string
  state?: string
  laborRate?: number
  markupPercentage?: number
  minimumJobSize?: number
}

const SUGGESTED_RESPONSES = [
  "I'm ready to get started!",
  "Tell me more about the tax setup",
  "What pricing should I use?",
  "I need help with my business info"
]

export default function ChatOnboardingPage() {
  const companyAuth = useCompanyAuth()
  const company = companyAuth?.company
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [collectedData, setCollectedData] = useState<OnboardingData>({})
  const [currentStep, setCurrentStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (company?.onboarding_completed) {
      router.push('/dashboard')
      return
    }

    // Initial welcome message
    setMessages([{
      id: '1',
      content: `Hey there! Welcome to PaintQuote Pro! 🎨 I'm here to help you get your painting business set up in just a few minutes.

Let's start with the basics - what's the name of your painting company?`,
      role: 'assistant',
      timestamp: new Date()
    }])
  }, [company, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/companies/onboarding/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: company?.id,
            access_code: company?.accessCode 
          })
        },
        body: JSON.stringify({
          message: input,
          collectedData,
          currentStep
        })
      })

      if (!response.ok) {
        throw new Error('Failed to process message')
      }

      const data = await response.json()

      // Update collected data
      if (data.collectedData) {
        setCollectedData(prev => ({ ...prev, ...data.collectedData }))
      }

      // Update step
      if (data.nextStep !== undefined) {
        setCurrentStep(data.nextStep)
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // If onboarding is complete, save and redirect
      if (data.isComplete) {
        await completeOnboarding()
      }

    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsTyping(false)
    }
  }

  const completeOnboarding = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/companies/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: company?.id,
            access_code: company?.accessCode 
          })
        },
        body: JSON.stringify({
          ...collectedData,
          onboarding_completed: true
        })
      })

      if (!response.ok) {
        throw new Error('Failed to complete onboarding')
      }

      // Update local storage
      const existingData = localStorage.getItem('paintquote_company')
      if (existingData) {
        const parsedData = JSON.parse(existingData)
        localStorage.setItem('paintquote_company', JSON.stringify({
          ...parsedData,
          onboarding_completed: true,
          ...collectedData
        }))
      }

      toast({
        title: 'Welcome to PaintQuote Pro!',
        description: 'Your account is all set up and ready to go.'
      })

      router.push('/dashboard')
    } catch (error) {
      console.error('Error completing onboarding:', error)
      toast({
        title: 'Error',
        description: 'Failed to complete setup. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSuggestedResponse = (response: string) => {
    setInput(response)
  }

  const progress = ((currentStep + 1) / 5) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Setting Up Your Business</h1>
          <Progress value={progress} className="w-full max-w-xs mx-auto h-2" />
        </div>

        {/* Chat Container */}
        <Card className="glass-card h-[600px] flex flex-col">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              PaintQuote Setup Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            {/* Messages */}
            <div className="h-full overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-800/90 text-white border border-gray-700'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/90 border border-gray-700 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                      <span className="text-gray-300">Setting up your business...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10">
            {/* Suggested Responses */}
            {!isTyping && messages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {SUGGESTED_RESPONSES.map((response, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-colors"
                    onClick={() => handleSuggestedResponse(response)}
                  >
                    {response}
                  </Badge>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response..."
                className="bg-gray-800/90 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                disabled={isTyping || isSaving}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping || isSaving}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Skip Option */}
        {/* Alternative Options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            onClick={() => router.push('/onboarding')}
            className="bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
          >
            Switch to Classic Form
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="text-gray-300 hover:text-white underline"
          >
            Skip Setup (Complete Later)
          </Button>
        </div>
      </div>
    </div>
  )
}