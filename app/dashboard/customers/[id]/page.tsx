'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, DollarSign, FileText, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'

interface Quote {
  id: number
  quote_number: string
  status: string
  total_amount: number
  created_at: string
}

interface Customer {
  id: number
  name: string
  email?: string
  phone?: string
  address?: string
  created_at: string
  quotes: Quote[]
}

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalQuotes: 0,
    acceptedQuotes: 0,
    totalRevenue: 0,
    acceptanceRate: 0,
    averageQuoteValue: 0
  })

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    fetchCustomer(company)
  }, [router, params.id])

  const fetchCustomer = async (company: any) => {
    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.accessCode
          })
        }
      })

      if (!response.ok) {
        notFound()
        return
      }

      const data = await response.json()
      setCustomer(data)
      
      // Calculate stats
      const quotes = data.quotes || []
      const accepted = quotes.filter((q: Quote) => q.status === 'accepted')
      const totalRevenue = accepted.reduce((sum: number, q: Quote) => sum + q.total_amount, 0)
      
      setStats({
        totalQuotes: quotes.length,
        acceptedQuotes: accepted.length,
        totalRevenue,
        acceptanceRate: quotes.length > 0 ? Math.round((accepted.length / quotes.length) * 100) : 0,
        averageQuoteValue: accepted.length > 0 ? Math.round(totalRevenue / accepted.length) : 0
      })
    } catch (error) {
      console.error('Error fetching customer:', error)
      notFound()
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
          <p className="text-gray-200">Loading customer details...</p>
        </div>
      </div>
    )
  }

  if (!customer) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/customers">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-900/70">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gradient-modern">{customer.name}</h1>
          <p className="text-medium-contrast">Customer Details</p>
        </div>
      </div>

      {/* Contact Info */}
      <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
        <CardHeader>
          <CardTitle className="text-white">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {customer.email && (
              <div className="flex items-center gap-2 text-gray-100">
                <Mail className="h-4 w-4 text-gray-200" />
                <a href={`mailto:${customer.email}`} className="hover:text-blue-400 transition-colors">
                  {customer.email}
                </a>
              </div>
            )}
            {customer.phone && (
              <div className="flex items-center gap-2 text-gray-100">
                <Phone className="h-4 w-4 text-gray-200" />
                <a href={`tel:${customer.phone}`} className="hover:text-blue-400 transition-colors">
                  {customer.phone}
                </a>
              </div>
            )}
            {customer.address && (
              <div className="flex items-center gap-2 text-gray-100">
                <MapPin className="h-4 w-4 text-gray-200" />
                <span>{customer.address}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-200 text-base">
            <Calendar className="h-4 w-4" />
            <span>Customer since {new Date(customer.created_at).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalQuotes}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Acceptance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.acceptanceRate}%</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Avg Quote Value</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.averageQuoteValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote History */}
      <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
        <CardHeader>
          <CardTitle className="text-white">Quote History</CardTitle>
          <CardDescription className="text-gray-200">
            All quotes for this customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customer.quotes.length === 0 ? (
            <p className="text-center py-8 text-gray-200">No quotes yet for this customer</p>
          ) : (
            <div className="space-y-4">
              {customer.quotes.map((quote) => (
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
                      <p className="text-base text-gray-200">
                        {new Date(quote.created_at).toLocaleDateString()}
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