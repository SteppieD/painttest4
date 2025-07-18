'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  companyId: number;
  onQuoteCreated?: (quoteId: string) => void;
  useAI?: boolean;
}

export function ChatInterface({ 
  companyId, 
  onQuoteCreated,
  useAI = true 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: useAI 
          ? "Hello! I'm here to help you create a professional painting quote. Just tell me about your project - like the customer's name, address, and what needs to be painted."
          : "Hello! I'm here to help you create a professional painting quote. What's the customer's name?",
        timestamp: new Date()
      }
    ]);
  }, [useAI]);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setSuggestedReplies([]);

    try {
      // Get company data from localStorage for access code
      const companyData = localStorage.getItem('paintquote_company');
      const company = companyData ? JSON.parse(companyData) : null;
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: companyId,
            access_code: company?.accessCode || ''
          })
        },
        body: JSON.stringify({
          message: content,
          sessionId,
          useAI
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Update session and other data
      if (data.sessionId) setSessionId(data.sessionId);
      if (data.suggestedReplies) setSuggestedReplies(data.suggestedReplies);
      
      // Handle quote completion
      if (data.isComplete && data.quoteData) {
        setQuoteData(data.quoteData);
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createQuote = async () => {
    if (!quoteData) return;

    setIsLoading(true);
    try {
      // Get company data from localStorage for access code
      const companyData = localStorage.getItem('paintquote_company');
      const company = companyData ? JSON.parse(companyData) : null;
      
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: companyId,
            access_code: company?.accessCode || ''
          })
        },
        body: JSON.stringify({
          companyId,
          quoteData: {
            customerName: quoteData.customerName,
            customerEmail: quoteData.customerEmail,
            customerPhone: quoteData.customerPhone,
            address: quoteData.address,
            projectType: quoteData.projectType,
            rooms: quoteData.rooms,
            roomCount: quoteData.roomCount,
            paintQuality: quoteData.paintQuality,
            prepWork: quoteData.prepWork,
            timeEstimate: quoteData.timeline,
            specialRequests: quoteData.specialRequests,
            totalCost: quoteData.pricing?.subtotal,
            finalPrice: quoteData.pricing?.total,
            markupPercentage: 30,
            sqft: quoteData.surfaces?.walls || 0,
            breakdown: {
              materials: quoteData.pricing?.materials?.total,
              labor: quoteData.pricing?.labor?.total,
              markup: quoteData.pricing?.markup
            }
          },
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create quote');
      }

      const result = await response.json();
      
      toast({
        title: 'Quote Created!',
        description: `Quote ${result.quoteId} has been created successfully.`
      });

      if (onQuoteCreated) {
        onQuoteCreated(result.quoteId);
      } else {
        router.push(`/quotes/${result.quoteId}`);
      }

    } catch (error) {
      console.error('Create quote error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create quote. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
          />
        ))}
        {isLoading && (
          <MessageBubble
            message={{ role: 'assistant', content: '' }}
            isTyping
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quote preview */}
      {quoteData && (
        <Card className="mx-4 mb-4 p-4 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                Quote Ready!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                {quoteData.customerName} - {quoteData.address}
              </p>
              <p className="text-lg font-bold text-green-900 dark:text-green-100 mt-2">
                Total: ${quoteData.pricing?.total?.toFixed(2) || '0.00'}
              </p>
              <Button
                onClick={createQuote}
                disabled={isLoading}
                className="mt-3"
              >
                Create Quote
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Input area */}
      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        suggestedReplies={suggestedReplies}
        placeholder={
          quoteData 
            ? "Quote is ready! Click 'Create Quote' above."
            : "Type your message..."
        }
      />
    </div>
  );
}