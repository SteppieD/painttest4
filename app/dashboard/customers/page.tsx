'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp,
  Search,
  Plus,
  Calendar,
  ChevronRight,
  Star,
  Clock,
  Filter
} from 'lucide-react'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'
interface Customer {
  id: number | string
  name: string
  email?: string
  phone?: string
  address?: string
  totalQuotes: number
  acceptedQuotes: number
  totalRevenue: number
  lastQuoteDate: string
  created_at: string
  status?: 'active' | 'inactive' | 'prospect'
  rating?: number
  tags?: string[]
  preferredContact?: 'email' | 'phone' | 'text'
}

export default function CustomersPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [companyData, setCompanyData] = useState<{ id: number; access_code: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all')
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'recent'>('recent')

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    setCompanyData(company)
    fetchCustomers(company)
  }, [router])

  useEffect(() => {
    let filtered = [...customers]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone?.includes(searchTerm) ||
        customer.address?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(customer => customer.status === filterStatus)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'value') {
        return b.totalRevenue - a.totalRevenue
      } else {
        return new Date(b.lastQuoteDate).getTime() - new Date(a.lastQuoteDate).getTime()
      }
    })

    setFilteredCustomers(filtered)
  }, [customers, searchTerm, filterStatus, sortBy])

  const fetchCustomers = async (company: { id: number; access_code: string }) => {
    try {
      const response = await fetch('/api/customers', {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.access_code
          })
        }
      })

      if (response.ok) {
        const data = await response.json()
        // Add mock status and rating to existing customers
        const enhancedCustomers = (data.customers || []).map((c: Customer, index: number) => ({
          ...c,
          status: c.totalRevenue > 10000 ? 'active' : c.totalQuotes > 0 ? 'inactive' : 'prospect',
          rating: c.totalRevenue > 20000 ? 5 : c.totalRevenue > 10000 ? 4 : c.totalRevenue > 5000 ? 3 : 0,
          tags: c.totalRevenue > 20000 ? ['vip', 'repeat-customer'] : c.totalQuotes > 3 ? ['repeat-customer'] : ['new'],
          preferredContact: 'email' as const
        }))
        setCustomers(enhancedCustomers)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-200">Loading customers...</p>
        </div>
      </div>
    )
  }

  const totalQuotes = customers.reduce((sum, c) => sum + c.totalQuotes, 0)
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalRevenue, 0)
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'prospect': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getRatingStars = (rating?: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < (rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
      />
    ))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient-modern">Customers</h1>
          <p className="text-medium-contrast">
            Manage your customer relationships and quote history
          </p>
        </div>
        <Button 
          className="btn-primary-modern"
          onClick={() => setShowAddCustomer(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customers.length}</div>
            <p className="text-base text-gray-200 mt-1">Active relationships</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalQuotes}</div>
            <p className="text-base text-gray-200 mt-1">Quotes sent</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-100">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-base text-gray-200 mt-1">From accepted quotes</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search customers by name, email, phone, or address..."
            className="pl-10 bg-gray-900/80 border-white/10 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="px-4 py-2 bg-gray-900/80 border border-white/10 rounded-lg text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'prospect')}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospects</option>
          </select>
          <select
            className="px-4 py-2 bg-gray-900/80 border border-white/10 rounded-lg text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'value' | 'recent')}
          >
            <option value="recent">Most Recent</option>
            <option value="value">Highest Value</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ">
        <CardHeader>
          <CardTitle className="text-white">All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No customers yet</h3>
              <p className="text-gray-200 mb-4">Your customers will appear here after creating quotes</p>
              <Link href="/create-quote">
                <Button className="btn-primary-modern">
                  Create Your First Quote
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <Link 
                  key={customer.id} 
                  href={`/dashboard/customers/${customer.id}`}
                  className="block"
                >
                  <div className="border border-white/10 rounded-lg p-4 hover:bg-gray-900/80 hover:border-blue-500/30 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                            {customer.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(customer.status)}`}>
                            {customer.status || 'prospect'}
                          </span>
                          {customer.tags?.includes('vip') && (
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              VIP
                            </span>
                          )}
                          <div className="flex items-center gap-0.5">
                            {getRatingStars(customer.rating)}
                          </div>
                        </div>
                      
                      <div className="flex flex-wrap gap-4 text-base text-gray-200">
                        {customer.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        )}
                        {customer.address && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {customer.address}
                          </div>
                        )}
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1 flex flex-col items-end">
                      <div className="flex items-center gap-2 justify-end">
                        <FileText className="h-4 w-4 text-gray-200" />
                        <span className="text-base font-medium text-white">{customer.totalQuotes} quotes</span>
                      </div>
                      {customer.totalRevenue > 0 && (
                        <div className="text-base text-emerald-400 font-medium">
                          ${customer.totalRevenue.toLocaleString()} revenue
                        </div>
                      )}
                        <div className="text-base text-gray-200">
                          Last quote: {new Date(customer.lastQuoteDate).toLocaleDateString()}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all mt-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {filteredCustomers.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No customers found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Customer Dialog */}
      <Dialog open={showAddCustomer} onOpenChange={setShowAddCustomer}>
        <DialogContent className="bg-white border border-gray-200 max-w-md mx-auto mt-20">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Add New Customer</DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter the customer's information to add them to your database
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name *
              </Label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="John Smith"
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="john@example.com"
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                placeholder="(555) 123-4567"
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Address
              </Label>
              <Textarea
                id="address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                placeholder="123 Main St, City, State 12345"
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setShowAddCustomer(false)
                setNewCustomer({ name: '', email: '', phone: '', address: '' })
              }}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={async () => {
                if (!newCustomer.name.trim()) {
                  alert('Please enter a customer name')
                  return
                }
                
                try {
                  const response = await fetch('/api/customers', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      ...newCustomer,
                      company_id: companyData?.id
                    })
                  })
                  
                  if (response.ok) {
                    const data = await response.json()
                    // Refresh the customers list
                    setCustomers([...customers, data.customer])
                    setFilteredCustomers([...customers, data.customer])
                    setShowAddCustomer(false)
                    setNewCustomer({ name: '', email: '', phone: '', address: '' })
                  } else {
                    alert('Failed to add customer. Please try again.')
                  }
                } catch (error) {
                  console.error('Error adding customer:', error)
                  alert('Failed to add customer. Please try again.')
                }
              }}
              disabled={!newCustomer.name.trim()}
            >
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}