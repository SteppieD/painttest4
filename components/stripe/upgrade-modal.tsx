'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StripeBuyButton } from './buy-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'professional' | 'business';
}

// Store your buy button IDs here
const BUY_BUTTON_IDS = {
  professional: {
    monthly: 'buy_btn_1RoXJXGbblInKQeXuxaB0kZu', // Your test button
    yearly: 'buy_btn_xxx' // Add your yearly button ID
  },
  business: {
    monthly: 'buy_btn_xxx', // Add your business monthly button ID
    yearly: 'buy_btn_xxx' // Add your business yearly button ID
  }
};

// Your publishable key (test mode)
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51R6x3QGbblInKQeXVASILRMWJxtv1tnOKECGEnZx6FmvPRTV6c92qeLyJpdcmSqcZl7ZCJDmltiMSLFs8lsQb1K700SovzXUkJ';

export function UpgradeModal({ isOpen, onClose, plan }: UpgradeModalProps) {
  const planName = plan === 'professional' ? 'Professional' : 'Business';
  const planPrice = plan === 'professional' ? '$29.99' : '$79.99';
  const yearlyPrice = plan === 'professional' ? '$299.99' : '$799.99';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Upgrade to {planName} Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="monthly" className="text-white">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="text-white">
                Yearly (Save 17%)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly" className="mt-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">{planPrice}</p>
                <p className="text-gray-400">per month</p>
              </div>
              
              <div className="flex justify-center">
                <StripeBuyButton
                  buyButtonId={BUY_BUTTON_IDS[plan].monthly}
                  publishableKey={STRIPE_PUBLISHABLE_KEY}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="mt-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-white">{yearlyPrice}</p>
                <p className="text-gray-400">per year</p>
                <p className="text-green-400 text-sm mt-1">
                  Save {plan === 'professional' ? '$60' : '$160'} per year!
                </p>
              </div>
              
              <div className="flex justify-center">
                <StripeBuyButton
                  buyButtonId={BUY_BUTTON_IDS[plan].yearly}
                  publishableKey={STRIPE_PUBLISHABLE_KEY}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-400 text-center">
              • Cancel anytime from your Stripe dashboard<br/>
              • Secure payment powered by Stripe<br/>
              • Instant access after payment
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}