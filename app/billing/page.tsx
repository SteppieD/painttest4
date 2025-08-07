'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, CreditCard, Package } from 'lucide-react';
import Link from 'next/link';
import { BillingOverview } from '@/components/billing/billing-overview';
import { SubscriptionPlans } from '@/components/billing/subscription-plans';

interface SubscriptionInfo {
  id: string;
  status: string;
  plan: 'professional' | 'business';
  billingPeriod: 'monthly' | 'yearly';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

interface UsageStats {
  quotesThisMonth: number;
  quotesLimit: number;
  plan: 'professional' | 'business';
}

function BillingContent() {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchSubscriptionInfo = useCallback(async () => {
    try {
      // Get company data from localStorage to send in header
      const companyData = localStorage.getItem('paintquote_company');
      if (!companyData) {
        return;
      }
      const parsedCompany = JSON.parse(companyData);
      
      const response = await fetch('/api/stripe/subscription-info', {
        headers: {
          'x-company-data': JSON.stringify({
            id: parsedCompany.id,
            access_code: parsedCompany.access_code
          })
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSubscriptionInfo(data.subscription ? {
          ...data.subscription,
          currentPeriodStart: new Date(data.subscription.currentPeriodStart),
          currentPeriodEnd: new Date(data.subscription.currentPeriodEnd)
        } : null);
        setUsageStats(data.usage);
      }
    } catch (error) {
      console.error('Failed to fetch subscription info:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check for authentication in localStorage
    const companyData = localStorage.getItem('paintquote_company');
    if (!companyData) {
      router.push('/access-code');
      return;
    }
    fetchSubscriptionInfo();
  }, [router, fetchSubscriptionInfo]);

  useEffect(() => {
    // Handle success/cancel from Stripe checkout
    const sessionId = searchParams.get('session_id');
    const cancelled = searchParams.get('cancelled');

    if (sessionId) {
      toast({
        title: 'Payment Successful!',
        description: 'Your subscription has been activated.',
      });
      // Remove search params from URL
      window.history.replaceState({}, '', '/billing');
    } else if (cancelled) {
      toast({
        title: 'Payment Cancelled',
        description: 'Your subscription was not activated.',
        variant: 'destructive'
      });
      // Remove search params from URL
      window.history.replaceState({}, '', '/billing');
    }
  }, [searchParams]);

  const handleSelectPlan = async (plan: string, billingPeriod: 'monthly' | 'yearly') => {
    setIsProcessing(true);
    try {
      const companyData = localStorage.getItem('paintquote_company');
      const parsedCompany = companyData ? JSON.parse(companyData) : null;
      
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(parsedCompany && {
            'x-company-data': JSON.stringify({
              id: parsedCompany.id,
              access_code: parsedCompany.access_code
            })
          })
        },
        body: JSON.stringify({ plan, billingPeriod }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to start checkout process. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManageBilling = async () => {
    setIsProcessing(true);
    try {
      const companyData = localStorage.getItem('paintquote_company');
      const parsedCompany = companyData ? JSON.parse(companyData) : null;
      
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          ...(parsedCompany && {
            'x-company-data': JSON.stringify({
              id: parsedCompany.id,
              access_code: parsedCompany.access_code
            })
          })
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        throw new Error('Failed to create portal session');
      }
    } catch (error) {
      console.error('Portal error:', error);
      toast({
        title: 'Error',
        description: 'Failed to open billing portal. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpgrade = () => {
    // Switch to plans tab or open upgrade modal
    const plansTab = document.querySelector('[value="plans"]') as HTMLElement;
    if (plansTab) {
      plansTab.click();
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Billing & Subscription</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="plans" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Plans & Pricing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {isLoading ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </CardContent>
                </Card>
              ) : (
                <BillingOverview
                  subscription={subscriptionInfo}
                  usage={usageStats || { quotesThisMonth: 0, quotesLimit: 50, plan: 'professional' }}
                  onManageBilling={handleManageBilling}
                  onUpgrade={handleUpgrade}
                  isLoading={isProcessing}
                />
              )}
            </TabsContent>

            <TabsContent value="plans">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <SubscriptionPlans
                    currentPlan={subscriptionInfo?.plan}
                    onSelectPlan={handleSelectPlan}
                    isLoading={isProcessing}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
}
