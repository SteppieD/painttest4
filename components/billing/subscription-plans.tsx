'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Zap } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe/stripe-client';
import { cn } from '@/lib/utils';

interface SubscriptionPlansProps {
  currentPlan?: string;
  onSelectPlan: (plan: string, billingPeriod: 'monthly' | 'yearly') => void;
  isLoading?: boolean;
}

export function SubscriptionPlans({ 
  currentPlan, 
  onSelectPlan, 
  isLoading 
}: SubscriptionPlansProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const getYearlySavings = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
    const monthlySavings = (monthlyPrice * 12 - yearlyPrice) / 12;
    return Math.round(monthlySavings);
  };

  return (
    <div className="space-y-6">
      {/* Billing Period Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={cn(
          "text-base font-medium",
          billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-200'
        )}>
          Monthly
        </span>
        <Switch
          checked={billingPeriod === 'yearly'}
          onCheckedChange={(checked) => setBillingPeriod(checked ? 'yearly' : 'monthly')}
        />
        <span className={cn(
          "text-base font-medium",
          billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-200'
        )}>
          Yearly
        </span>
        {billingPeriod === 'yearly' && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Save 20%
          </Badge>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(SUBSCRIPTION_PLANS).map(([planKey, plan]) => {
          const isCurrentPlan = currentPlan === planKey;
          const monthlyPrice = plan.pricing.monthly;
          const yearlyPrice = plan.pricing.yearly;
          const displayPrice = billingPeriod === 'yearly' ? yearlyPrice / 12 : monthlyPrice;
          const savings = billingPeriod === 'yearly' ? getYearlySavings(monthlyPrice) : 0;

          return (
            <Card 
              key={planKey} 
              className={cn(
                "relative",
                isCurrentPlan && "border-blue-500 ring-1 ring-blue-500",
                planKey === 'business' && "border-purple-500"
              )}
            >
              {planKey === 'business' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {planKey === 'business' && <Zap className="w-5 h-5 text-purple-600" />}
                </div>
                <CardDescription>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      ${displayPrice.toFixed(0)}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="text-base text-green-600 mt-1">
                      Save ${savings}/month
                    </div>
                  )}
                  {billingPeriod === 'yearly' && (
                    <div className="text-base text-gray-200 mt-1">
                      Billed annually (${yearlyPrice}/year)
                    </div>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onSelectPlan(planKey, billingPeriod)}
                  disabled={isLoading || isCurrentPlan}
                  className={cn(
                    "w-full",
                    planKey === 'business' && !isCurrentPlan && "bg-purple-600 hover:bg-purple-700"
                  )}
                >
                  {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}