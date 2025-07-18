'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, Zap } from 'lucide-react'
import Link from 'next/link'

interface QuoteUsageData {
  quotesUsed: number
  quotesLimit: number
  hasUnlimitedQuotes: boolean
  percentageUsed: number
  isNearLimit: boolean
  isAtLimit: boolean
  plan: string
}

export function QuoteUsageIndicator() {
  const [data, setData] = useState<QuoteUsageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get company data from localStorage
    const companyData = localStorage.getItem('paintquote_company')
    if (!companyData) {
      setLoading(false)
      return
    }

    const company = JSON.parse(companyData)
    
    fetch('/api/quote-usage', {
      headers: {
        'x-company-data': JSON.stringify({
          id: company.id,
          access_code: company.accessCode
        })
      }
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  const { quotesUsed, quotesLimit, hasUnlimitedQuotes, percentageUsed, isNearLimit, isAtLimit, plan } = data

  if (hasUnlimitedQuotes) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Zap className="h-4 w-4 text-yellow-500" />
        <span>Unlimited quotes ({quotesUsed} created)</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Quote Usage</span>
          {isNearLimit && (
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {quotesUsed} / {quotesLimit} quotes
        </span>
      </div>
      
      <Progress value={percentageUsed} className="h-2" />
      
      {isAtLimit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">
            You've reached your monthly quote limit.{' '}
            <Link href="/billing" className="font-medium underline hover:no-underline">
              Upgrade to Pro
            </Link>{' '}
            for unlimited quotes.
          </p>
        </div>
      )}
      
      {isNearLimit && !isAtLimit && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            You're approaching your quote limit.{' '}
            <Link href="/billing" className="font-medium underline hover:no-underline">
              Upgrade now
            </Link>{' '}
            to avoid interruptions.
          </p>
        </div>
      )}
    </div>
  )
}