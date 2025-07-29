'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Sparkles, 
  Calculator, 
  Users, 
  Paintbrush, 
  Clock,
  X,
  ChevronRight
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyData: any;
}

export function OnboardingModal({ isOpen, onClose, companyData }: OnboardingModalProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleSetupNow = () => {
    router.push('/onboarding/chat');
  };

  const handleSetupLater = () => {
    // Update local storage to mark that user skipped onboarding
    const stored = localStorage.getItem('paintquote_company');
    if (stored) {
      const data = JSON.parse(stored);
      localStorage.setItem('paintquote_company', JSON.stringify({
        ...data,
        skipOnboarding: true
      }));
    }
    onClose();
  };

  return (
    <Dialog open={showModal} onOpenChange={(open) => !open && handleSetupLater()}>
      <DialogContent className="sm:max-w-xl bg-gray-900 border-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl text-white">Complete Your Business Setup</DialogTitle>
                <DialogDescription className="text-gray-200">
                  Personalize PaintQuote Pro for {companyData?.name || 'your business'}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSetupLater}
              className="text-gray-200 hover:text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          <Card className="bg-gray-800/50 border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Why Complete Setup?
            </h3>
            <p className="text-base text-gray-100 mb-4">
              Our AI assistant uses your business information to automatically calculate accurate quotes, saving you time and reducing errors.
            </p>
            
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <Calculator className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-base font-medium text-white">Accurate Labor Costs</p>
                  <p className="text-base text-gray-200">Set your hourly rates and crew costs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Paintbrush className="h-5 w-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-base font-medium text-white">Material Pricing</p>
                  <p className="text-base text-gray-200">Configure paint and supply costs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-base font-medium text-white">Business Details</p>
                  <p className="text-base text-gray-200">Add your logo, contact info, and terms</p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <p className="text-base text-amber-200">
                Takes only 2-3 minutes to complete
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSetupNow}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              Complete Setup Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              onClick={handleSetupLater}
              variant="outline"
              className="flex-1 bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700 hover:text-white"
            >
              I'll Do This Later
            </Button>
          </div>
          
          <p className="text-base text-center text-gray-200">
            You can always complete setup later from your dashboard
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}