'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<'professional' | 'business'>('professional');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleTestCheckout = async () => {
    setLoading(true);
    
    try {
      // Create a test session token for authentication
      document.cookie = 'pq_session=test-session; path=/; max-age=3600';
      
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, billingPeriod }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start checkout',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Test Stripe Payment Integration</CardTitle>
            <CardDescription className="text-gray-100">
              This page tests the Stripe checkout flow directly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-white block mb-2">Select Plan:</label>
              <div className="flex gap-4">
                <Button
                  variant={plan === 'professional' ? 'default' : 'outline'}
                  onClick={() => setPlan('professional')}
                  className={plan === 'professional' ? '' : 'text-white border-white/20'}
                >
                  Professional ($79/mo)
                </Button>
                <Button
                  variant={plan === 'business' ? 'default' : 'outline'}
                  onClick={() => setPlan('business')}
                  className={plan === 'business' ? '' : 'text-white border-white/20'}
                >
                  Business ($149/mo)
                </Button>
              </div>
            </div>

            <div>
              <label className="text-white block mb-2">Billing Period:</label>
              <div className="flex gap-4">
                <Button
                  variant={billingPeriod === 'monthly' ? 'default' : 'outline'}
                  onClick={() => setBillingPeriod('monthly')}
                  className={billingPeriod === 'monthly' ? '' : 'text-white border-white/20'}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingPeriod === 'yearly' ? 'default' : 'outline'}
                  onClick={() => setBillingPeriod('yearly')}
                  className={billingPeriod === 'yearly' ? '' : 'text-white border-white/20'}
                >
                  Yearly (Save 17%)
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleTestCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                {loading ? 'Creating checkout session...' : 'Test Stripe Checkout'}
              </Button>
            </div>

            <div className="text-base text-gray-200 space-y-2">
              <p>🧪 This will create a real Stripe checkout session</p>
              <p>💳 Use test card: 4242 4242 4242 4242</p>
              <p>📅 Any future expiry date, any CVC</p>
              <p>✅ This bypasses normal auth flow for testing</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <a href="/" className="text-gray-200 hover:text-white">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}