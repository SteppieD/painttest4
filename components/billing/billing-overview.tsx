'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button'; // TODO: Check if this import is needed
// import { Badge } from '@/components/ui/badge'; // TODO: Check if this import is needed
// import { Progress } from '@/components/ui/progress'; // TODO: Check if this import is needed
import { 
  Calendar, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  Settings,
  ExternalLink
} from 'lucide-react';
// import { format } from 'date-fns';
 // TODO: Check if this import is needed
interface BillingOverviewProps {
  subscription: {
    id: string;
    status: string;
    plan: 'professional' | 'business';
    billingPeriod: 'monthly' | 'yearly';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  } | null;
  usage: {
    quotesThisMonth: number;
    quotesLimit: number;
    plan: 'professional' | 'business';
  };
  onManageBilling: () => void;
  onUpgrade: () => void;
  isLoading?: boolean;
}

export function BillingOverview({ 
  subscription, 
  usage, 
  onManageBilling, 
  onUpgrade, 
  isLoading 
}: BillingOverviewProps) {
  const getStatusColor = (_status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'past_due': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUsagePercentage = () => {
    if (usage.quotesLimit === -1) return 0; // Unlimited
    return (usage.quotesThisMonth / usage.quotesLimit) * 100;
  };

  const _getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold capitalize">
                    {subscription.plan} Plan
                  </h3>
                  <p className="text-base text-gray-600 capitalize">
                    {subscription.billingPeriod} billing
                  </p>
                </div>
                <Badge className={getStatusColor(subscription.status)}>
                  {subscription.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-base text-gray-600">Current Period</p>
                  <p className="font-medium">
                    {format(subscription.currentPeriodStart, 'MMM d')} - {format(subscription.currentPeriodEnd, 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-base text-gray-600">Next Billing</p>
                  <p className="font-medium">
                    {subscription.cancelAtPeriodEnd 
                      ? 'Canceled' 
                      : format(subscription.currentPeriodEnd, 'MMM d, yyyy')
                    }
                  </p>
                </div>
              </div>

              {subscription.cancelAtPeriodEnd && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-base text-yellow-800">
                    Your subscription will end on {format(subscription.currentPeriodEnd, 'MMM d, yyyy')}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={onManageBilling}
                  disabled={isLoading}
                  variant="outline"
                  className="flex-1"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Billing
                </Button>
                {subscription.plan === 'professional' && (
                  <Button 
                    onClick={onUpgrade}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Upgrade to Business
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">No active subscription</p>
              <Button onClick={onUpgrade} disabled={isLoading}>
                Choose a Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Usage This Month
          </CardTitle>
          <CardDescription>
            Track your quote generation usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">Quotes Generated</span>
              <span className="text-lg font-bold">
                {usage.quotesThisMonth}
                {usage.quotesLimit !== -1 && (
                  <span className="text-base font-normal text-gray-600">
                    /{usage.quotesLimit}
                  </span>
                )}
              </span>
            </div>

            {usage.quotesLimit !== -1 && (
              <div className="space-y-2">
                <Progress 
                  value={getUsagePercentage()} 
                  className="h-2"
                />
                <div className="flex justify-between text-base text-gray-600">
                  <span>0</span>
                  <span>{usage.quotesLimit} limit</span>
                </div>
              </div>
            )}

            {usage.quotesLimit === -1 && (
              <div className="flex items-center gap-2 text-base text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>Unlimited quotes</span>
              </div>
            )}

            {usage.quotesLimit !== -1 && usage.quotesThisMonth >= usage.quotesLimit * 0.8 && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-base text-yellow-800">
                  You{"'"}re approaching your monthly limit. Consider upgrading for unlimited quotes.
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4">
              Access your complete billing history and download invoices
            </p>
            <Button 
              onClick={onManageBilling}
              disabled={isLoading}
              variant="outline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Billing Portal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}