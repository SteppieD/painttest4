'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, ArrowRight, CreditCard } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
// Business tier removed - focusing on Professional tier only
import { redirectToStripePayment } from '@/lib/config/stripe-links';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuickUpgradeButtonProps {
  variant?: 'default' | 'banner' | 'compact' | 'cta';
  showPricing?: boolean;
  className?: string;
}

export function QuickUpgradeButton({ 
  variant = 'default', 
  showPricing = true,
  className = '' 
}: QuickUpgradeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<'monthly' | 'yearly'>('monthly');

  const handleDirectUpgrade = async (billing: 'monthly' | 'yearly') => {
    setIsLoading(true);
    try {
      toast({
        title: '🚀 Redirecting to checkout...',
        description: 'You\'ll be taken to Stripe to complete your purchase'
      });
      
      // Direct redirect to Stripe checkout - Professional tier only
      await redirectToStripePayment('professional', billing);
    } catch (error) {
      console.error('Upgrade error:', error);
      toast({
        title: 'Unable to process upgrade',
        description: 'Please try again or contact support',
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <Button
        onClick={() => handleDirectUpgrade('monthly')}
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        size="sm"
      >
        {isLoading ? (
          'Processing...'
        ) : (
          <>
            <Zap className="h-3 w-3 mr-1" />
            Upgrade
          </>
        )}
      </Button>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white mb-1">Upgrade to Pro</h4>
            <p className="text-sm text-gray-300">Unlimited quotes • AI Assistant • Analytics</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleDirectUpgrade('monthly')}
              disabled={isLoading}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              $79/mo
            </Button>
            <Button
              onClick={() => handleDirectUpgrade('yearly')}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              $790/yr (Save $158)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <>
        <Button
          onClick={() => setShowDialog(true)}
          disabled={isLoading}
          className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg ${className}`}
          size="lg"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Upgrade to Pro - Start at $79/mo
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-md bg-gray-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Choose Your Plan</DialogTitle>
              <DialogDescription className="text-gray-300">
                Select monthly or yearly billing. You can change or cancel anytime.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <button
                onClick={() => {
                  setSelectedBilling('monthly');
                  handleDirectUpgrade('monthly');
                  setShowDialog(false);
                }}
                className="w-full p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-left"
                disabled={isLoading}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">Monthly</h4>
                    <p className="text-sm text-gray-400">Pay as you go</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">$79</p>
                    <p className="text-xs text-gray-400">per month</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedBilling('yearly');
                  handleDirectUpgrade('yearly');
                  setShowDialog(false);
                }}
                className="w-full p-4 border-2 border-green-500/50 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors text-left relative"
                disabled={isLoading}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    SAVE $158
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">Yearly</h4>
                    <p className="text-sm text-gray-400">Best value - 2 months free</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">$790</p>
                    <p className="text-xs text-gray-400">per year ($66/mo)</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 p-3 bg-blue-500/10 rounded-lg">
              <p className="text-xs text-blue-300 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Secure payment via Stripe. Cancel anytime.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Default variant
  return (
    <Button
      onClick={() => handleDirectUpgrade('monthly')}
      disabled={isLoading}
      className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 ${className}`}
    >
      {isLoading ? (
        'Processing...'
      ) : (
        <>
          <Sparkles className="h-4 w-4 mr-2" />
          {showPricing ? 'Upgrade to Pro - $79/mo' : 'Upgrade to Pro'}
        </>
      )}
    </Button>
  );
}