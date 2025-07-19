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
}

export function ChatInterface({ 
  companyId, 
  onQuoteCreated
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
        content: "Hi! I'll help you build a quote in under 2 minutes. I see you're set up for painting with your standard rates. Let's start - what type of space are we quoting today?",
        timestamp: new Date()
      }
    ]);
    // Set initial suggested replies
    setSuggestedReplies(['Living room', 'Bedroom', 'Kitchen', 'Bathroom', 'Whole house', 'Office']);
  }, []);

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
          sessionId
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

    console.log('[CHAT] Quote data from AI:', quoteData);
    console.log('[CHAT] Pricing structure:', quoteData.pricing);

    setIsLoading(true);
    try {
      // Get company data from localStorage for access code
      const companyData = localStorage.getItem('paintquote_company');
      const company = companyData ? JSON.parse(companyData) : null;
      
      const requestBody = {
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
          totalCost: quoteData.pricing?.subtotal || 0,
          finalPrice: quoteData.pricing?.total || 0,
          markupPercentage: 30,
          sqft: quoteData.surfaces?.walls || quoteData.measurements?.wallSqft || 0,
          breakdown: {
            materials: quoteData.pricing?.materials?.total || 0,
            labor: quoteData.pricing?.labor?.total || 0,
            markup: quoteData.pricing?.markup || 0
          }
        },
        conversationHistory: messages
      };

      console.log('[CHAT] Request body to quotes API:', requestBody);

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: companyId,
            access_code: company?.accessCode || ''
          })
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Quote creation error response:', errorData);
        throw new Error(errorData.details || 'Failed to create quote');
      }

      const result = await response.json();
      
      toast({
        title: 'Quote Created!',
        description: `Quote ${result.quoteId} has been created successfully.`
      });

      if (onQuoteCreated) {
        onQuoteCreated(result.quoteId);
      } else {
        router.push(`/dashboard/quotes/${result.quoteId}`);
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
        <Card className="mx-4 mb-4 p-6 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 dark:text-green-100 text-lg">
                Quote Ready!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                {quoteData.customerName} - {quoteData.address}
              </p>
              
              {/* Quote Breakdown */}
              {quoteData.pricing?.breakdown && (
                <div className="mt-4 space-y-3">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">MATERIALS: ${quoteData.pricing.materials?.total?.toFixed(2)}</h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {quoteData.pricing.breakdown.primer && (
                        <div>• Primer: {quoteData.pricing.breakdown.primer.gallons} gallons - ${quoteData.pricing.breakdown.primer.cost.toFixed(2)}</div>
                      )}
                      {quoteData.pricing.breakdown.wallPaint && (
                        <div>• Wall Paint: {quoteData.pricing.breakdown.wallPaint.gallons} gallons - ${quoteData.pricing.breakdown.wallPaint.cost.toFixed(2)}</div>
                      )}
                      {quoteData.pricing.breakdown.ceilingPaint && (
                        <div>• Ceiling Paint: {quoteData.pricing.breakdown.ceilingPaint.gallons} gallons - ${quoteData.pricing.breakdown.ceilingPaint.cost.toFixed(2)}</div>
                      )}
                      {quoteData.pricing.breakdown.supplies && (
                        <div>• Supplies: ${quoteData.pricing.breakdown.supplies.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2">LABOR: ${quoteData.pricing.labor?.total?.toFixed(2)}</h4>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {quoteData.pricing.breakdown.prepWork && (
                        <div>• Prep work: {quoteData.pricing.breakdown.prepWork.hours} hours - ${quoteData.pricing.breakdown.prepWork.cost.toFixed(2)}</div>
                      )}
                      {quoteData.pricing.breakdown.painting && (
                        <div>• Painting: {quoteData.pricing.breakdown.painting.hours} hours - ${quoteData.pricing.breakdown.painting.cost.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      Total: ${quoteData.pricing?.total?.toFixed(2) || '0.00'}
                    </p>
                    {quoteData.pricing?.timeline && (
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Timeline: {quoteData.pricing.timeline}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={createQuote}
                    disabled={isLoading}
                    size="lg"
                  >
                    Create Quote
                  </Button>
                </div>
              </div>
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