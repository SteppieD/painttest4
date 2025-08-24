'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Sparkles, Edit } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { achievementService } from '@/lib/gamification/achievement-service';
import { AchievementNotification } from '@/components/achievements/achievement-notification';
import { QuickUpgradeButton } from '@/components/quick-upgrade-button';
import { OnboardingAssistant } from '@/lib/onboarding/onboarding-assistant';
import { trackQuoteCreated, trackAIChatInteraction } from '@/lib/analytics/track-events';
import ErrorBoundary, { useErrorHandler } from '@/components/error-boundary';
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

function ChatInterfaceCore({ 
  companyId, 
  isDemo = false,
  onQuoteCreated
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isFirstQuote, setIsFirstQuote] = useState(false);
  const [onboardingSettings, setOnboardingSettings] = useState({});
  const [quoteCreationInProgress, setQuoteCreationInProgress] = useState(false);
  const [lastQuoteCreationTime, setLastQuoteCreationTime] = useState<number | null>(null);
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
  const [latestAchievement, setLatestAchievement] = useState<string | null>(null);
  const errorHandler = useErrorHandler();

  // Check if this is the user's first quote
  useEffect(() => {
    const checkFirstQuote = async () => {
      try {
        const companyData = localStorage.getItem('paintquote_company');
        if (companyData) {
          const data = JSON.parse(companyData);
          // Check if onboarding is not completed or this is their first quote
          if (!data.onboarding_completed) {
            setIsFirstQuote(true);
            OnboardingAssistant.reset();
            
            // Add welcome message for first-time users
            setMessages([{
              role: 'assistant',
              content: "🎨 Welcome to PaintQuote Pro! I{'\'}m here to help you create your first professional quote. As we go through this, I{'\'}ll also set up your account preferences to make future quotes even faster. Let{'\'}s start - what type of painting project are you quoting for?",
              timestamp: new Date()
            }]);
          }
        }
      } catch (error) {
        console.error('Error checking first quote:', error);
      }
    };
    
    checkFirstQuote();
    // setMessages and setIsFirstQuote are state setters (stable)
    // OnboardingAssistant is imported module (stable)
  }, []);

  // Listen for achievement events
  useEffect(() => {
    const handleAchievement = (event: CustomEvent) => {
      setLatestAchievement(event.detail.achievementId);
      setTimeout(() => setLatestAchievement(null), 100);
    };
    
    window.addEventListener('achievement-unlocked', handleAchievement as EventListener);
    return () => {
      window.removeEventListener('achievement-unlocked', handleAchievement as EventListener);
    };
  }, []);

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

  const createQuote = useCallback(async () => {
    // Prevent duplicate quote creation
    if (!quoteData || quoteCreationInProgress) {
      console.log('[CHAT] Quote creation blocked - no data or already in progress');
      return;
    }

    console.log('[CHAT] Quote data from AI:', quoteData);
    console.log('[CHAT] Pricing structure:', quoteData.pricing);
    
    // Debug: Show what we{'\'}re about to send
    console.log('[CHAT DEBUG] Creating quote with data:', {
      customerName: quoteData.customerName,
      hasPricing: !!quoteData.pricing,
      pricingKeys: quoteData.pricing ? Object.keys(quoteData.pricing) : 'no pricing',
      pricingStructure: quoteData.pricing
    });

    setIsLoading(true);
    
    // Save onboarding settings if this is the first quote
    if (isFirstQuote) {
      try {
        const settings = OnboardingAssistant.getExtractedSettings();
        if (Object.keys(settings).length > 0) {
          await OnboardingAssistant.saveSettings(companyId, settings);
          
          // Update localStorage to mark onboarding as complete
          const companyData = localStorage.getItem('paintquote_company');
          if (companyData) {
            const data = JSON.parse(companyData);
            localStorage.setItem('paintquote_company', JSON.stringify({
              ...data,
              ...settings,
              onboarding_completed: true
            }));
          }
          
          // Trigger onboarding achievement
          await achievementService.checkOnboardingAchievements(companyId);
          
          toast({
            title: '✨ Setup Complete!',
            description: 'Your business settings have been saved. Future quotes will be even faster!',
          });
        }
      } catch (error) {
        console.error('Error saving onboarding settings:', error);
        // Continue with quote creation even if settings save fails
      }
    }
    
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
        companyId: Number(companyId), // Ensure it's a number
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

      // Add timeout handling for quote creation
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => {
        abortController.abort();
      }, 90000); // 90 second timeout for quote creation
      
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: companyId,
            access_code: company?.access_code
          })
        },
        body: JSON.stringify(finalRequestBody),
        signal: abortController.signal
      });
      
      // Clear timeout on successful response
      clearTimeout(timeoutId);

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

      // Track quote creation event
      trackQuoteCreated({
        quoteId: result.quoteId || result.quote?.id || 'unknown',
        value: quoteData.pricing?.total || quoteData.finalPrice || 0,
        customerName: quoteData.customerName,
        projectType: quoteData.projectType
      });
      
      // Track AI chat interaction
      const sessionDuration = Math.floor((Date.now() - startTime) / 1000);
      trackAIChatInteraction(messages.length, sessionDuration);
      
      // Check for achievements using the new service
      const timeToCreate = Date.now() - startTime;
      const companyInfo = JSON.parse(localStorage.getItem('paintquote_company') || '{}');
      if (companyInfo.id) {
        const newAchievements = await achievementService.checkQuoteCreationAchievements(
          companyInfo.id,
          quoteData,
          timeToCreate
        );
        
        // Show the first achievement if any were unlocked
        if (newAchievements.length > 0) {
          setLatestAchievement(newAchievements[0]);
          setTimeout(() => setLatestAchievement(null), 100);
        }
      }

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
      // Provide specific error messages based on error type
      let errorMessage = 'Failed to create quote. Please try again.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Quote creation timed out. Please try again.';
        } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
          errorMessage = 'Authorization failed. Please check your account status.';
        } else if (error.message.includes('403') || error.message.includes('upgrade')) {
          errorMessage = 'Upgrade required to create more quotes.';
        } else if (error.message.includes('500') || error.message.includes('server')) {
          errorMessage = 'Server error. Please try again in a moment.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        } else if (error.message.includes('validation')) {
          errorMessage = 'Quote data validation failed. Please check all required fields.';
        }
      }
      
      toast({
        title: 'Error Creating Quote',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      setQuoteCreationInProgress(false);
    }
  }, [quoteData, quoteCreationInProgress, companyId, isFirstQuote, messages, onQuoteCreated, router, startTime]);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setSuggestedReplies([]);

    // Extract onboarding settings from message if first quote
    if (isFirstQuote) {
      const extracted = OnboardingAssistant.extractSettingsFromMessage(content);
      if (Object.keys(extracted).length > 0) {
        setOnboardingSettings(prev => ({ ...prev, ...extracted }));
        console.log('[ONBOARDING] Extracted settings:', extracted);
      }
    }

    try {
      // Get company data from localStorage for access code
      const companyData = localStorage.getItem('paintquote_company');
      const company = companyData ? JSON.parse(companyData) : null;
      
      // Create abort controller for timeout handling
      const abortController = new AbortController();
      const timeoutId = setTimeout(() => {
        abortController.abort();
      }, 60000); // 60 second timeout
      
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
          isDemo: isDemo,
          isFirstQuote,
          onboardingSettings: OnboardingAssistant.getExtractedSettings()
        }),
        signal: abortController.signal
      });
      
      // Clear timeout on successful response
      clearTimeout(timeoutId);

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
              <QuickUpgradeButton variant="compact" showPricing={false} />
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
      
      // Validate AI response
      if (!data.response || typeof data.response !== 'string') {
        throw new Error('Invalid AI response format');
      }
      
      // Check for potentially harmful content in AI response
      if (data.response.length > 10000) {
        console.warn('[SECURITY] AI response too long, truncating');
        data.response = data.response.substring(0, 10000) + '... [Response truncated for security]';
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
      if (data.suggestedReplies) {
        setSuggestedReplies(data.suggestedReplies);
      } else if (data.userWantsReview || data.hasMinimumInfo) {
        // Provide review-oriented suggested replies when user shows readiness
        setSuggestedReplies([
          "That looks good, let{'\'}s review",
          "Ready to see the quote",
          "Perfect, proceed with the quote",
          "Sounds good, finalize it"
        ]);
      }
      
      // Validate quote data if present
      if (data.quoteData && typeof data.quoteData === 'object') {
        // Basic validation of quote data structure
        const requiredFields = ['customerName'];
        const hasRequiredFields = requiredFields.every(field => 
          data.quoteData[field] && typeof data.quoteData[field] === 'string'
        );
        
        if (!hasRequiredFields) {
          console.warn('[VALIDATION] Quote data missing required fields');
          errorHandler(new Error('Quote data validation failed'), 'Missing required customer information');
          return;
        }
      }
      
      // Handle quote completion and readiness states
      if (data.isComplete && data.quoteData) {
        setQuoteData(data.quoteData);
        
        // If the AI response indicates the quote is finalized, automatically trigger creation
        // Add safety checks to prevent duplicate quote creation
        if (!quoteCreationInProgress && 
            (data.response.toLowerCase().includes('finalized') || 
             data.response.toLowerCase().includes('have a great') ||
             data.response.toLowerCase().includes('good luck'))) {
          
          // Check if we recently created a quote (within last 5 seconds)
          const now = Date.now();
          if (lastQuoteCreationTime && (now - lastQuoteCreationTime) < 5000) {
            console.log('[CHAT] Preventing duplicate quote creation - too soon after last attempt');
            return;
          }
          
          // Set flag to prevent concurrent creation
          setQuoteCreationInProgress(true);
          setLastQuoteCreationTime(now);
          
          // Small delay to let user see the final message
          setTimeout(() => {
            createQuote();
          }, 2000);
        }
      } else if (data.userWantsReview && data.hasMinimumInfo) {
        // User expressed readiness but quote might need more info
        if (!data.quoteData) {
          // Add a helpful message suggesting what to do next
          const helpMessage: Message = {
            role: 'assistant',
            content: "I can see you{'\'}re ready to review the quote! I have the basic information, but let me gather a few more details to create the most accurate quote possible. What{'\'}s the total square footage or specific measurements for the project?",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, helpMessage]);
        } else {
          setQuoteData(data.quoteData);
        }
      }

      // Add debug logging
      console.log('[CHAT] Quote status:', {
        isComplete: data.isComplete,
        userWantsReview: data.userWantsReview,
        hasMinimumInfo: data.hasMinimumInfo,
        hasQuoteData: !!data.quoteData,
        debug: data.debug
      });

    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try again.';
        } else if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [companyId, isDemo, isFirstQuote, sessionId, quoteCreationInProgress, lastQuoteCreationTime, errorHandler, createQuote]);

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
            content: "Great! I{'\'}ll help you create a quote for Sarah Johnson{'\'}s interior painting project. Let me gather a few more details. What{'\'}s the approximate square footage of the home?",
            timestamp: new Date()
          }]);
          setSuggestedReplies(['1,500 sq ft', '2,000 sq ft', '2,500 sq ft', '3,000 sq ft']);
          setIsLoading(false);
        }, 1000);
      }, 1500);

      // Auto-continue demo
      setTimeout(() => {
        sendMessage("It's about 2,000 sq ft with standard 8-foot ceilings");
      }, 5000);
    };

    if (isDemo) {
      // Demo mode - pre-fill with demo data
      setMessages([
        {
          role: 'assistant',
          content: "🎯 **Demo Mode**: Let me show you how fast you can create professional quotes! I{'\'}ll walk you through a typical residential project.",
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
          content: "Hi! I'll help you create a professional quote for your customer. What type of painting project are you quoting today?",
          timestamp: new Date()
        }
      ]);
      // Set initial suggested replies
      setSuggestedReplies(['Interior residential', 'Exterior residential', 'Commercial space', 'Single room', 'Whole house', 'Office space']);
    }
    // sendMessage is used in timeout, add as dependency
  }, [isDemo, sendMessage]);


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
            message={{ role: 'assistant', content: 'Analyzing your project and creating a professional quote...' }}
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
                Quote Draft Complete! 
              </h3>
              <p className="text-base text-green-400/80 mt-1">
                {quoteData.customerName} - {quoteData.address}
              </p>
              <p className="text-sm text-green-400/60 mt-2">
                <strong>Review & Customize</strong> to adjust pricing, add terms, and choose what to show customers • <strong>Quick Save</strong> to save as-is
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
                  <div className="flex gap-2">
                    <Button
                      onClick={createQuote}
                      disabled={isLoading || quoteCreationInProgress}
                      size="lg"
                      variant="outline"
                      className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Quick Save
                    </Button>
                    <Button
                      onClick={() => {
                        // Navigate to quote review page with the generated data
                        router.push(`/create-quote/review?data=${encodeURIComponent(JSON.stringify(quoteData))}`);
                      }}
                      disabled={isLoading}
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25 group"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Review & Customize
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Button>
                  </div>
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
            ? "Quote draft is ready! Click 'Review & Customize' or 'Quick Save' above."
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

// Export wrapped component with error boundary
export function ChatInterface(props: ChatInterfaceProps) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('[ChatInterface] Error caught by boundary:', error);
        console.error('[ChatInterface] Error info:', errorInfo);
      }}
    >
      <ChatInterfaceCore {...props} />
    </ErrorBoundary>
  );
}