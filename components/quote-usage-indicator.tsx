import { getDatabaseAdapter } from '@/lib/database/adapter'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, Zap } from 'lucide-react'
import Link from 'next/link'

interface QuoteUsageIndicatorProps {
  companyId: number
}

async function getQuoteUsage(companyId: number) {
  const db = getDatabaseAdapter()
  const company = await db.getCompany(companyId)

  if (!company) {
    throw new Error('Company not found')
  }

  // Return quote usage data in the expected format
  return {
    quotesUsed: company.monthly_quote_count || 0,
    quotesLimit: company.monthly_quote_limit || 5,
    quotesResetAt: null, // We don't track reset dates in the current schema
    subscription_tier: company.subscription_tier || 'free'
  }
}

export async function QuoteUsageIndicator({ companyId }: QuoteUsageIndicatorProps) {
  const usage = await getQuoteUsage(companyId)

  // Don't show for unlimited plans
  if (usage.quotesLimit === -1) {
    return null
  }

  const percentageUsed = (usage.quotesUsed / usage.quotesLimit) * 100
  const remainingQuotes = usage.quotesLimit - usage.quotesUsed
  const daysUntilReset = 30 // Default to monthly reset

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-medium flex items-center gap-2">
          {percentageUsed >= 100 ? (
            <AlertCircle className="h-4 w-4 text-destructive" />
          ) : (
            <Zap className="h-4 w-4 text-primary" />
          )}
          Quote Usage
        </h3>
        <span className="text-base text-gray-200">
          {usage.quotesUsed} / {usage.quotesLimit}
        </span>
      </div>
      
      <Progress value={Math.min(percentageUsed, 100)} className="mb-2" />
      
      <div className="flex items-center justify-between text-base text-gray-200">
        <span>
          {remainingQuotes > 0 
            ? `${remainingQuotes} quotes remaining`
            : 'No quotes remaining'
          }
        </span>
        <span>Resets in {daysUntilReset} days</span>
      </div>

      {percentageUsed >= 80 && (
        <div className="mt-3 p-2 rounded-md bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
          <p className="text-base text-amber-800 dark:text-amber-200">
            {percentageUsed >= 100 
              ? "You&apos;ve used all your free quotes this month."
              : `You&apos;re running low on quotes.`
            }
            {' '}
            <Link href="/pricing" className="font-medium underline hover:no-underline">
              Upgrade to Pro
            </Link>
            {' '}for unlimited quotes.
          </p>
        </div>
      )}
    </div>
  )
}