'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  TrendingUp,
  Edit,
  Save,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  User,
  Building,
  Home,
  Tag
} from 'lucide-react'
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
  notes?: string
  tags?: string[]
  preferredContact?: 'email' | 'phone' | 'text'
  customerType?: 'residential' | 'commercial'
  rating?: number
  lastContactDate?: string
}

interface CommunicationLog {
  id: string
  date: string
  type: 'email' | 'phone' | 'meeting' | 'quote'
  subject: string
  notes: string
  outcome?: 'positive' | 'neutral' | 'negative'
}

export default function CustomerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([])
  const [stats, setStats] = useState({
    totalQuotes: 0,
    acceptedQuotes: 0,
    totalRevenue: 0,
    acceptanceRate: 0,
    averageQuoteValue: 0,
    pendingQuotes: 0,
    rejectedQuotes: 0
  })

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    fetchCustomer(company)
  }, [router, params.id, fetchCustomer])

  const fetchCustomer = useCallback(async (company: { id: number; access_code: string }) => {
    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.access_code
          })
        }
      })

      if (!response.ok) {
        notFound()
        return
      }

      const data = await response.json()
      
      // Enhance customer data with mock fields
      const enhancedCustomer = {
        ...data,
        notes: data.notes || 'No notes yet.',
        tags: data.tags || ['residential', 'repeat-customer'],
        preferredContact: data.preferredContact || 'email',
        customerType: data.customerType || 'residential',
        rating: data.rating || 4,
        lastContactDate: data.lastContactDate || new Date().toISOString()
      }
      
      setCustomer(enhancedCustomer)
      setNotes(enhancedCustomer.notes)
      
      // Mock communication logs
      setCommunicationLogs([
        {
          id: '1',
          date: new Date().toISOString(),
          type: 'quote',
          subject: 'Interior painting quote sent',
          notes: 'Customer requested quote for living room and bedrooms',
          outcome: 'positive'
        },
        {
          id: '2',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'phone',
          subject: 'Follow-up call',
          notes: 'Discussed timeline and availability',
          outcome: 'neutral'
        },
        {
          id: '3',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'email',
          subject: 'Initial inquiry',
          notes: 'Customer reached out through website contact form',
          outcome: 'positive'
        }
      ])
      
      // Calculate stats
      const quotes = data.quotes || []
      const accepted = quotes.filter((q: Quote) => q.status === 'accepted')
      const pending = quotes.filter((q: Quote) => q.status === 'sent' || q.status === 'viewed')
      const rejected = quotes.filter((q: Quote) => q.status === 'rejected')
      const totalRevenue = accepted.reduce((sum: number, q: Quote) => sum + q.total_amount, 0)
      
      setStats({
        totalQuotes: quotes.length,
        acceptedQuotes: accepted.length,
        pendingQuotes: pending.length,
        rejectedQuotes: rejected.length,
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
  }, [params.id])

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

  const getRatingStars = (rating?: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < (rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
      />
    ))
  }

  const getOutcomeIcon = (outcome?: string) => {
    switch (outcome) {
      case 'positive': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'negative': return <XCircle className="h-4 w-4 text-red-400" />
      default: return <AlertCircle className="h-4 w-4 text-amber-400" />
    }
  }

  const saveNotes = () => {
    // In a real app, this would save to the database
    setIsEditingNotes(false)
    if (customer) {
      setCustomer({ ...customer, notes })
    }
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/customers">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-900/70">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gradient-modern">{customer.name}</h1>
              <div className="flex items-center gap-2">
                {customer.customerType === 'commercial' ? (
                  <Building className="h-5 w-5 text-blue-400" />
                ) : (
                  <Home className="h-5 w-5 text-green-400" />
                )}
                <div className="flex items-center gap-0.5">
                  {getRatingStars(customer.rating)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              {customer.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            className="btn-secondary-modern"
            onClick={() => {
              if (customer.email) {
                window.location.href = `mailto:${customer.email}`
              } else {
                alert('No email address available for this customer')
              }
            }}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button 
            className="btn-primary-modern"
            onClick={() => {
              // Store customer info in localStorage for the quote creation
              localStorage.setItem('selected_customer', JSON.stringify({
                id: customer.id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address
              }))
              router.push('/create-quote')
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </div>
      </div>

      {/* Contact Info & Notes Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {customer.email && (
                <div className="flex items-center gap-3 text-gray-100">
                  <Mail className="h-4 w-4 text-gray-200" />
                  <div>
                    <a href={`mailto:${customer.email}`} className="hover:text-blue-400 transition-colors">
                      {customer.email}
                    </a>
                    {customer.preferredContact === 'email' && (
                      <span className="ml-2 text-xs text-green-400">(Preferred)</span>
                    )}
                  </div>
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center gap-3 text-gray-100">
                  <Phone className="h-4 w-4 text-gray-200" />
                  <div>
                    <a href={`tel:${customer.phone}`} className="hover:text-blue-400 transition-colors">
                      {customer.phone}
                    </a>
                    {customer.preferredContact === 'phone' && (
                      <span className="ml-2 text-xs text-green-400">(Preferred)</span>
                    )}
                  </div>
                </div>
              )}
              {customer.address && (
                <div className="flex items-center gap-3 text-gray-100">
                  <MapPin className="h-4 w-4 text-gray-200" />
                  <span>{customer.address}</span>
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-gray-200 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Customer since {new Date(customer.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-200 text-sm">
                <Clock className="h-4 w-4" />
                <span>Last contact: {new Date(customer.lastContactDate || customer.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Notes */}
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Customer Notes</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => isEditingNotes ? saveNotes() : setIsEditingNotes(true)}
              className="text-gray-400 hover:text-white"
            >
              {isEditingNotes ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            {isEditingNotes ? (
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[150px] bg-gray-800/50 border-white/10 text-white"
                placeholder="Add notes about this customer..."
              />
            ) : (
              <p className="text-gray-300 whitespace-pre-wrap">
                {customer.notes || 'No notes yet. Click edit to add notes.'}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-100">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalQuotes}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-100">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.acceptedQuotes}</div>
            <p className="text-xs text-emerald-400 mt-1">{stats.acceptanceRate}% rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-100">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pendingQuotes}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-100">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.rejectedQuotes}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-100">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">
              ${stats.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-100">Avg Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">
              ${stats.averageQuoteValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Quote History and Communication */}
      <Tabs defaultValue="quotes" className="space-y-4">
        <TabsList className="bg-gray-900/80 border-white/10">
          <TabsTrigger value="quotes" className="data-[state=active]:bg-blue-500/20">
            Quote History
          </TabsTrigger>
          <TabsTrigger value="communication" className="data-[state=active]:bg-blue-500/20">
            Communication Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quotes">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Quote History</CardTitle>
              <CardDescription className="text-gray-200">
                All quotes for this customer
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer.quotes.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-200 mb-4">No quotes yet for this customer</p>
                  <Button 
                    className="btn-primary-modern"
                    onClick={() => {
                      localStorage.setItem('selected_customer', JSON.stringify({
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        address: customer.address
                      }))
                      router.push('/create-quote')
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Quote
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.quotes.map((quote) => (
                    <Link
                      key={quote.id}
                      href={`/dashboard/quotes/${quote.id}`}
                      className="block p-4 border border-white/10 rounded-lg hover:bg-gray-900/80 hover:border-blue-500/30 transition-all group"
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
        </TabsContent>

        <TabsContent value="communication">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Communication Log</CardTitle>
                <CardDescription className="text-gray-200">
                  Track all interactions with this customer
                </CardDescription>
              </div>
              <Button 
                className="btn-primary-modern" 
                size="sm"
                onClick={() => {
                  // For now, show an alert. In production, this would open a modal
                  alert('Activity logging coming soon! This will allow you to track calls, emails, and meetings with this customer.')
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Log Activity
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communicationLogs.map((log) => (
                  <div key={log.id} className="p-4 border border-white/10 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {log.type === 'email' && <Mail className="h-4 w-4 text-blue-400" />}
                          {log.type === 'phone' && <Phone className="h-4 w-4 text-green-400" />}
                          {log.type === 'meeting' && <User className="h-4 w-4 text-purple-400" />}
                          {log.type === 'quote' && <FileText className="h-4 w-4 text-amber-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium text-white">{log.subject}</h4>
                            {getOutcomeIcon(log.outcome)}
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{log.notes}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(log.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}