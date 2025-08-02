'use client'

import { useEffect, useState } from 'react'
// import { Progress } from '@/components/ui/progress' // TODO: Check if this import is needed
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
          access_code: company.access_code
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
      <div className="flex items-center gap-2 text-base text-gray-200">
        <Zap className="h-4 w-4 text-yellow-500" />
        <span>Unlimited quotes ({quotesUsed} created)</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-white">Quote Usage</span>
          {isNearLimit && (
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          )}
        </div>
        <span className="text-base text-gray-100">
          {quotesUsed} / {quotesLimit} quotes
        </span>
      </div>
      
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-700">
        <div 
          className="h-full w-full flex-1 transition-all rounded-full"
          style={{ 
            transform: `translateX(-${100 - percentageUsed}%)`,
            background: percentageUsed >= 80 
              ? 'linear-gradient(to right, #ef4444, #dc2626)' 
              : percentageUsed >= 60 
              ? 'linear-gradient(to right, #f59e0b, #d97706)'
              : 'linear-gradient(to right, #10b981, #059669)'
          }}
        />
      </div>
      
      {isAtLimit && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-base text-red-400">
            You{"'"}ve reached your monthly quote limit.{' '}
            <Link href="/billing" className="font-medium text-red-300 underline hover:no-underline">
              Upgrade to Pro
            </Link>{' '}
            for unlimited quotes.
          </p>
        </div>
      )}
      
      {isNearLimit && !isAtLimit && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 backdrop-blur-sm">
          <p className="text-base text-yellow-400">
            You{"'"}re approaching your quote limit.{' '}
            <Link href="/billing" className="font-medium text-yellow-300 underline hover:no-underline">
              Upgrade now
            </Link>{' '}
            to avoid interruptions.
          </p>
        </div>
      )}
    </div>
  )
}