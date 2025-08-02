'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button' // TODO: Check if this import is needed
// import { Badge } from '@/components/ui/badge' // TODO: Check if this import is needed
// import { Progress } from '@/components/ui/progress' // TODO: Check if this import is needed
// import { toast } from '@/components/ui/use-toast' // TODO: Check if this import is needed
// import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth' // TODO: Check if this import is needed
// import { SUBSCRIPTION_TIERS } from '@/lib/services/subscription' // TODO: Check if this import is needed
// import { redirectToStripePayment } from '@/lib/config/stripe-links' // TODO: Check if this import is needed
import { 
  CreditCard, 
  Check, 
  X, 
  Sparkles, 
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react'

interface UsageStats {
  currentMonth: {
    quotesCreated: number;
    quotesRemaining: number;
    limit: number;
  };
  lastMonth: {
    quotesCreated: number;
    quotesAccepted: number;
    conversionRate: number;
    avgResponseTime: number;
  };
}

export default function BillingPage() {
  const router = useRouter()
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [processingUpgrade, setProcessingUpgrade] = useState(false)

  useEffect(() => {
    const companyData = getCompanyFromLocalStorage()
    if (!companyData) {
      router.push('/access-code')
      return
    }
    setCompany(companyData)
    fetchUsageStats()
  }, [router])

  const fetchUsageStats = async () => {
    try {
      const response = await fetch('/api/companies/usage', {
        headers: {
          'x-company-data': JSON.stringify({ 
            id: company?.id,
            access_code: company?.access_code 
          })
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUsage(data)
      }
    } catch (error) {
      console.error('Error fetching usage:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (tier: string) => {
    setProcessingUpgrade(true)
    try {
      toast({
        title: 'Redirecting to Stripe',
        description: 'You will be redirected to complete your purchase...'
      })
      
      // Redirect to Stripe payment link
      setTimeout(() => {
        if (tier === 'pro') {
          redirectToStripePayment('professional', 'monthly')
        } else if (tier === 'business') {
          redirectToStripePayment('business', 'monthly')
        }
      }, 1000)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to redirect to payment. Please try again.',
        variant: 'destructive'
      })
      setProcessingUpgrade(false)
    }
  }

  const currentTier = company?.subscription_tier || 'free'
  const tierInfo = SUBSCRIPTION_TIERS[currentTier]

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-gray-200">Loading billing information...</p>
      </div>
    </div>
  }

  const usagePercentage = usage && usage.currentMonth.limit !== -1 
    ? (usage.currentMonth.quotesCreated / usage.currentMonth.limit) * 100 
    : 0

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
        <CardHeader>
          <CardTitle className="text-white">Current Plan</CardTitle>
          <CardDescription className="text-gray-200">
            Manage your subscription and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white">{tierInfo.displayName}</h3>
                {currentTier === 'pro' && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
              <p className="text-gray-200 mt-1">
                {currentTier === 'free' 
                  ? 'Perfect for getting started'
                  : 'Unlimited quotes and advanced features'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                ${tierInfo.price}
                <span className="text-base font-normal text-gray-200">/month</span>
              </div>
            </div>
          </div>

          {/* Usage Stats */}
          {usage && currentTier === 'free' && (
            <div className="mb-6">
              <div className="flex justify-between text-base mb-2">
                <span className="text-gray-200">Monthly Quote Usage</span>
                <span className="text-white">
                  {usage.currentMonth.quotesCreated} / {usage.currentMonth.limit}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2 mb-2" />
              {usagePercentage >= 80 && (
                <div className="flex items-center gap-2 text-amber-400 text-base">
                  <AlertCircle className="h-4 w-4" />
                  <span>You're approaching your monthly limit</span>
                </div>
              )}
            </div>
          )}

          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4">
              <div className="text-2xl font-bold text-white">
                {usage?.lastMonth.quotesCreated || 0}
              </div>
              <p className="text-base text-gray-200">Quotes Last Month</p>
            </div>
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4">
              <div className="text-2xl font-bold text-green-400">
                {usage?.lastMonth.conversionRate || 0}%
              </div>
              <p className="text-base text-gray-200">Win Rate</p>
            </div>
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4">
              <div className="text-2xl font-bold text-blue-400">
                {usage?.lastMonth.avgResponseTime || 0}h
              </div>
              <p className="text-base text-gray-200">Avg Response Time</p>
            </div>
            <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-4">
              <div className="text-2xl font-bold text-purple-400">
                ${((usage?.lastMonth.quotesAccepted || 0) * 2800).toLocaleString()}
              </div>
              <p className="text-base text-gray-200">Est. Revenue</p>
            </div>
          </div>

          {currentTier === 'free' && (
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">
                    Unlock Your Full Potential
                  </p>
                  <p className="text-base text-gray-100">
                    Based on your usage, upgrading to Pro could help you win {Math.round((usage?.lastMonth.quotesCreated || 20) * 0.15)} more jobs per month
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Comparison */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          {currentTier === 'free' ? 'Upgrade Your Plan' : 'Plan Comparison'}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => {
            const isCurrentPlan = key === currentTier
            const isPro = key === 'pro'
            
            return (
              <Card 
                key={key} 
                className={`glass-card ${isPro ? 'border-blue-500/50' : ''} ${isCurrentPlan ? 'ring-2 ring-white/20' : ''}`}
              >
                {isPro && (
                  <div className="text-center -mt-4 mb-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-white">{tier.displayName}</CardTitle>
                  <CardDescription className="text-gray-200">
                    {key === 'free' && 'Perfect for getting started'}
                    {key === 'pro' && 'For growing contractors'}
                    {key === 'enterprise' && 'For large teams'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-white">
                      {tier.price === -1 ? 'Custom' : `$${tier.price}`}
                      {tier.price !== -1 && (
                        <span className="text-base font-normal text-gray-200">/month</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-100 text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <Button className="w-full" disabled variant="outline">
                      Current Plan
                    </Button>
                  ) : key === 'enterprise' ? (
                    <Button className="w-full" variant="outline">
                      Contact Sales
                    </Button>
                  ) : key === 'pro' && currentTier === 'free' ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      onClick={() => handleUpgrade('pro')}
                      disabled={processingUpgrade}
                    >
                      {processingUpgrade ? 'Processing...' : 'Upgrade to Pro'}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Billing History */}
      {currentTier !== 'free' && (
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader>
            <CardTitle className="text-white">Billing History</CardTitle>
            <CardDescription className="text-gray-200">
              Your recent transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md flex items-center justify-between p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Pro Plan</p>
                    <p className="text-base text-gray-200">January 1, 2025</p>
                  </div>
                </div>
                <div className="text-white font-medium">$79.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}