'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAchievements } from '@/hooks/use-achievements';
import { AchievementNotification } from '@/components/achievements/achievement-notification';
import { redirectToStripePayment } from '@/lib/config/stripe-links';
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  companyId: number;
  isDemo?: boolean;
  onQuoteCreated?: (quoteId: string) => void;
}

export function ChatInterface({ 
  companyId, 
  isDemo = false,
  onQuoteCreated
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  interface QuoteData {
    customerName?: string;
    customerEmail?: string;
    address?: string;
    projectType?: string;
    finalPrice?: number;
    totalCost?: number;
    breakdown?: {
      materials?: number;
      labor?: number;
      [key: string]: unknown;
    };
    pricing?: {
      total?: number;
      subtotal?: number;
      materials?: { total?: number } | number;
      labor?: { total?: number } | number;
      markup?: number;
      breakdown?: {
        primer?: { gallons: number; cost: number };
        wallPaint?: { gallons: number; cost: number };
        ceilingPaint?: { gallons: number; cost: number };
        supplies?: number;
        prepWork?: { hours: number; cost: number };
        painting?: { hours: number; cost: number };
      };
      timeline?: string;
    };
    [key: string]: unknown;
  }

  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const [startTime] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { latestAchievement, checkQuoteAchievements } = useAchievements();

  // Helper function to safely extract total values
  const getTotal = (value: { total?: number } | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'object' && value && 'total' in value) return value.total || 0;
    return 0;
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Move handleDemoStart inside useEffect to avoid dependency issues
  useEffect(() => {
    const handleDemoStartInternal = async () => {
      // Simulate typing indicator
      setIsLoading(true);
      
      // First user message
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'user',
          content: "I need a quote for painting a 3-bedroom house interior. The client is Sarah Johnson at 123 Maple Street.",
          timestamp: new Date()
        }]);
        setIsLoading(false);
      }, 500);

      // Assistant response
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Great! I&apos;ll help you create a quote for Sarah Johnson&apos;s interior painting project. Let me gather a few more details. What&apos;s the approximate square footage of the home?",
            timestamp: new Date()
          }]);
          setSuggestedReplies(['1,500 sq ft', '2,000 sq ft', '2,500 sq ft', '3,000 sq ft']);
          setIsLoading(false);
        }, 1000);
      }, 1500);

      // Auto-continue demo
      setTimeout(() => {
        sendMessage("It&apos;s about 2,000 sq ft with standard 8-foot ceilings");
      }, 5000);
    };

    if (isDemo) {
      // Demo mode - pre-fill with demo data
      setMessages([
        {
          role: 'assistant',
          content: "🎯 **Demo Mode**: Let me show you how fast you can create professional quotes! I&apos;ll walk you through a typical residential project.",
          timestamp: new Date()
        }
      ]);
      // Auto-start the demo after a short delay
      setTimeout(() => {
        handleDemoStartInternal();
      }, 1500);
    } else {
      setMessages([
        {
          role: 'assistant',
          content: "Hi! I&apos;ll help you create a professional quote for your customer. What type of painting project are you quoting today?",
          timestamp: new Date()
        }
      ]);
      // Set initial suggested replies
      setSuggestedReplies(['Interior residential', 'Exterior residential', 'Commercial space', 'Single room', 'Whole house', 'Office space']);
    }
  }, [isDemo]);


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
            access_code: company?.access_code
          })
        },
        body: JSON.stringify({
          message: content,
          sessionId,
          isDemo: isDemo
        })
      });

      let data;
      try {
        const text = await response.text();
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        console.error('Response status:', response.status);
        console.error('Response headers:', response.headers);
        throw new Error(`Server error: ${response.status} - Unable to parse response`);
      }

      if (!response.ok) {
        // Check if it&apos;s a subscription upgrade required error
        if (response.status === 403 && data.requiresUpgrade) {
          toast({
            title: 'Upgrade Required',
            description: data.message || 'You\'ve reached your monthly quote limit.',
            action: (
              <Button 
                size="default" 
                onClick={() => redirectToStripePayment('professional', 'monthly')}
              >
                Upgrade Now
              </Button>
            )
          });
          
          // Add a message to the chat
          const upgradeMessage: Message = {
            role: 'assistant',
            content: '🔒 ' + (data.message || 'You\'ve reached your monthly AI quote limit. Please upgrade to Pro for unlimited quotes!'),
            timestamp: new Date()
          };
          setMessages(prev => [...prev, upgradeMessage]);
          return;
        }
        throw new Error(data.error || 'Failed to send message');
      }

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
    
    // Debug: Show what we&apos;re about to send
    console.log('[CHAT DEBUG] Creating quote with data:', {
      customerName: quoteData.customerName,
      hasPricing: !!quoteData.pricing,
      pricingKeys: quoteData.pricing ? Object.keys(quoteData.pricing) : 'no pricing',
      pricingStructure: quoteData.pricing
    });

    setIsLoading(true);
    try {
      // Get company data from localStorage for access code
      const companyData = localStorage.getItem('paintquote_company');
      const company = companyData ? JSON.parse(companyData) : null;
      
      // Check if pricing data exists
      if (!quoteData.pricing) {
        console.error('[CHAT] No pricing data in quote:', quoteData);
        toast({
          title: 'Incomplete Quote',
          description: 'The quote is missing pricing information. Please try again.',
          variant: 'destructive'
        });
        return;
      }
      
      const requestBody = {
        companyId: Number(companyId), // Ensure it&apos;s a number
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
          timeEstimate: quoteData.timeline || null,
          specialRequests: quoteData.specialRequests || null,
          totalCost: quoteData.pricing?.subtotal || quoteData.pricing?.total || 0,
          finalPrice: quoteData.pricing?.total || quoteData.pricing?.subtotal || 0,
          markupPercentage: quoteData.markupPercentage || 30,
          sqft: (quoteData.surfaces as { walls?: number })?.walls || (quoteData.measurements as { wallSqft?: number })?.wallSqft || quoteData.sqft || 0,
          breakdown: {
            materials: typeof quoteData.pricing?.materials === 'object' ? quoteData.pricing.materials.total || 0 : quoteData.pricing?.materials || 0,
            labor: typeof quoteData.pricing?.labor === 'object' ? quoteData.pricing.labor.total || 0 : quoteData.pricing?.labor || 0,
            markup: quoteData.pricing?.markup || 0
          }
        },
        conversationHistory: messages
      };

      console.log('[CHAT] Request body to quotes API:', requestBody);
      console.log('[CHAT] Conversation history length:', messages.length);
      console.log('[CHAT] Request body size:', new Blob([JSON.stringify(requestBody)]).size, 'bytes');
      
      // Limit conversation history to prevent oversized requests
      const limitedMessages = messages.slice(-10); // Keep only last 10 messages
      const finalRequestBody = {
        ...requestBody,
        conversationHistory: limitedMessages
      };

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: companyId,
            access_code: company?.access_code
          })
        },
        body: JSON.stringify(finalRequestBody)
      });

      let result;
      try {
        const text = await response.text();
        console.log('[CHAT] Quote API response text:', text);
        
        // Handle empty response
        if (!text) {
          console.error('Empty response from quote API');
          throw new Error('Server returned empty response. Check server logs.');
        }
        
        result = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse quote response:', parseError);
        console.error('Response status:', response.status);
        console.error('Response text length:', response.text?.length || 0);
        
        // Check for common server errors
        if (response.status === 500) {
          throw new Error('Server error: Database might not be initialized. Please check /api/diagnose for details.');
        }
        throw new Error(`Failed to parse quote response: ${response.status}`);
      }

      if (!response.ok) {
        console.error('Quote creation error response:', result);
        throw new Error(result.details || result.error || 'Failed to create quote');
      }
      
      toast({
        title: 'Quote Created!',
        description: `Quote ${result.quoteId} has been created successfully.`,
        action: (
          <Button 
            size="default" 
            onClick={() => router.push(`/dashboard/quotes/${result.quoteId}`)}
          >
            View Quote
          </Button>
        )
      });

      // Check for achievements
      const timeToCreate = Date.now() - startTime;
      await checkQuoteAchievements(quoteData, timeToCreate);

      // Navigate to the quote using the quote_id (like Q-2025-00001-1NWTY8)
      if (onQuoteCreated) {
        onQuoteCreated(result.quoteId);
      } else {
        // Small delay to show the toast
        setTimeout(() => {
          router.push(`/dashboard/quotes/${result.quoteId}`);
        }, 1000);
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
    <div className="flex h-full flex-col bg-gray-900/50">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-900/30">
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
        <div className="mx-4 mb-4 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl border border-green-500/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-300 text-lg">
                Quote Ready!
              </h3>
              <p className="text-base text-green-400/80 mt-1">
                {quoteData.customerName} - {quoteData.address}
              </p>
              
              {/* Quote Breakdown */}
              {quoteData.pricing?.breakdown && (
                <div className="mt-4 space-y-3">
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-base mb-2 text-white">MATERIALS: ${getTotal(quoteData.pricing.materials).toFixed(2)}</h4>
                    <div className="space-y-1 text-base text-gray-100">
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
                  
                  <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-base mb-2 text-white">LABOR: ${getTotal(quoteData.pricing.labor).toFixed(2)}</h4>
                    <div className="space-y-1 text-base text-gray-100">
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
              
              <div className="mt-4 pt-4 border-t border-green-500/30">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      Total: ${quoteData.pricing?.total?.toFixed(2) || '0.00'}
                    </p>
                    {quoteData.pricing?.timeline && (
                      <p className="text-base text-green-400">
                        Timeline: {quoteData.pricing.timeline}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => {
                      // Navigate to quote review page with the generated data
                      router.push(`/create-quote/review?data=${encodeURIComponent(JSON.stringify(quoteData))}`);
                    }}
                    disabled={isLoading}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25 group"
                  >
                    Continue to Review
                    <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input area */}
      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        suggestedReplies={suggestedReplies}
        placeholder={
          quoteData 
            ? "Quote is ready! Click Create Quote above."
            : "Type your message..."
        }
      />
      
      {/* Achievement Notifications */}
      <AchievementNotification 
        achievementId={latestAchievement}
        onClose={() => {}}
      />
    </div>
  );
}