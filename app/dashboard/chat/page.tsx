'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { ClientTimestamp } from '@/components/client-timestamp'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    confidence?: number
    missingFields?: string[]
  }
}


export default function ChatPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m here to help you create a painting quote. Let\'s start with some basic information. What\'s the customer\'s name?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      if (data.quoteData) {
        // AI has collected enough information and generated quote data
        const quoteResponse = await fetch('/api/quotes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data.quoteData)
        })

        if (!quoteResponse.ok) {
          throw new Error('Failed to create quote')
        }

        const quote = await quoteResponse.json()
        
        toast({
          title: 'Quote created!',
          description: `Quote ${quote.quoteNumber} has been created successfully.`,
        })

        router.push(`/dashboard/quotes/${quote.id}`)
      } else {
        // Add AI response to messages
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
          metadata: data.parsingStatus
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process your message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 md:space-y-8 px-4 md:px-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Quote Assistant</h1>
        <p className="text-base md:text-base text-gray-200">
          Chat with our AI assistant to create a painting quote
        </p>
      </div>

      <Card className="h-[calc(100vh-200px)] md:h-[600px] flex flex-col">
        <CardHeader className="px-4 py-3 md:px-6 md:py-4">
          <CardTitle className="text-lg md:text-xl">New Quote Conversation</CardTitle>
          <CardDescription className="text-base">
            Answer the assistant&apos;s questions to generate a quote
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col px-4 pb-4 md:px-6 md:pb-6">
          <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 mb-4 -mx-2 px-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-base md:text-base leading-relaxed">{message.content}</p>
                  <p className="text-base opacity-70 mt-1">
                    <ClientTimestamp timestamp={message.timestamp} />
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              disabled={isLoading}
              className="h-10 md:h-9 text-base md:text-base"
            />
            <Button 
              onClick={sendMessage} 
              disabled={isLoading}
              size="icon"
              className="h-10 w-10 md:h-9 md:w-9 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}