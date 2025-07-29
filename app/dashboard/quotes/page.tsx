'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, DollarSign, Clock, CheckCircle, XCircle, Send, Plus } from 'lucide-react'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'
import { cn } from '@/lib/utils'

interface Quote {
  id: number
  quote_number: string
  status: string
  total_amount: number
  created_at: string
  customer?: {
    name: string
    email?: string
    phone?: string
  }
}

export default function QuotesPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalQuotes: 0,
    acceptedQuotes: 0,
    totalValue: 0,
    acceptanceRate: 0
  })

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    fetchQuotes(company)
  }, [router])

  const fetchQuotes = async (company: any) => {
    try {
      const response = await fetch('/api/quotes', {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.accessCode
          })
        }
      })

      if (response.ok) {
        const data = await response.json()
        const quotesData = data.quotes || []
        setQuotes(quotesData)
        
        // Calculate stats
        const accepted = quotesData.filter((q: Quote) => q.status === 'accepted')
        const totalValue = accepted.reduce((sum: number, q: Quote) => sum + q.total_amount, 0)
        
        setStats({
          totalQuotes: quotesData.length,
          acceptedQuotes: accepted.length,
          totalValue,
          acceptanceRate: quotesData.length > 0 ? Math.round((accepted.length / quotesData.length) * 100) : 0
        })
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-500/20 text-gray-200 border-gray-500/50' },
      sent: { label: 'Sent', className: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
      viewed: { label: 'Viewed', className: 'bg-purple-500/20 text-purple-400 border-purple-500/50' },
      accepted: { label: 'Accepted', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' },
      rejected: { label: 'Rejected', className: 'bg-red-500/20 text-red-400 border-red-500/50' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    
    return (
      <Badge className={cn('border', config.className)}>
        {config.label}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-200">Loading quotes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-modern">Quotes</h1>
          <p className="text-medium-contrast">
            Manage and track all your painting quotes
          </p>
        </div>
        <Link href="/create-quote">
          <Button className="btn-primary-modern">
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalQuotes}</div>
            <p className="text-base text-gray-200 mt-1">All time</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.acceptedQuotes}</div>
            <p className="text-base text-gray-200 mt-1">{stats.acceptanceRate}% acceptance rate</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.totalValue.toLocaleString()}
            </div>
            <p className="text-base text-gray-200 mt-1">From accepted quotes</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Average Quote</CardTitle>
            <Clock className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.acceptedQuotes > 0 ? Math.round(stats.totalValue / stats.acceptedQuotes).toLocaleString() : '0'}
            </div>
            <p className="text-base text-gray-200 mt-1">Per accepted quote</p>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Recent Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No quotes yet</h3>
              <p className="text-gray-200 mb-4">Create your first quote to get started</p>
              <Link href="/create-quote">
                <Button className="btn-primary-modern">
                  Create Your First Quote
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {quotes.map((quote) => (
                <Link
                  key={quote.id}
                  href={`/dashboard/quotes/${quote.id}`}
                  className="block p-4 border border-white/10 rounded-lg hover:bg-gray-900/80 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                          Quote #{quote.quote_number}
                        </h3>
                        {getStatusBadge(quote.status)}
                      </div>
                      {quote.customer && (
                        <p className="text-base text-gray-200">
                          {quote.customer.name}
                          {quote.customer.email && ` • ${quote.customer.email}`}
                        </p>
                      )}
                      <p className="text-base text-gray-200">
                        Created {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">
                        ${quote.total_amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}