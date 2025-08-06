'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  TrendingUp, 
  Star, 
  RepeatIcon, 
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'

interface CustomerData {
  totalCustomers: number
  newCustomers: number
  returningCustomers: number
  averageLifetimeValue: number
  customerRetentionRate: number
  topCustomers: {
    id: string
    name: string
    email: string
    phone: string
    totalSpent: number
    quotesCount: number
    lastQuote: string
    status: 'active' | 'inactive'
  }[]
  customerGrowth: { month: string; count: number }[]
  customersByLocation: { area: string; count: number; percentage: number }[]
  customerSatisfaction: number
}

export default function CustomerAnalyticsPage() {
  const router = useRouter()
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    fetchCustomerData(company)
  }, [router])

  const fetchCustomerData = async (company: any) => {
    try {
      const response = await fetch('/api/analytics/customers', {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.access_code
          })
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCustomerData(data)
      }
    } catch (error) {
      console.error('Error fetching customer data:', error)
      // Use mock data for now
      setCustomerData({
        totalCustomers: 156,
        newCustomers: 23,
        returningCustomers: 45,
        averageLifetimeValue: 8750,
        customerRetentionRate: 68,
        topCustomers: [
          {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '555-0123',
            totalSpent: 24500,
            quotesCount: 8,
            lastQuote: '2024-01-15',
            status: 'active'
          },
          {
            id: '2',
            name: 'Michael Chen',
            email: 'mchen@email.com',
            phone: '555-0124',
            totalSpent: 18200,
            quotesCount: 5,
            lastQuote: '2024-01-10',
            status: 'active'
          },
          {
            id: '3',
            name: 'ABC Corporation',
            email: 'contact@abc.com',
            phone: '555-0125',
            totalSpent: 45750,
            quotesCount: 12,
            lastQuote: '2024-01-20',
            status: 'active'
          }
        ],
        customerGrowth: [
          { month: 'Jan', count: 120 },
          { month: 'Feb', count: 128 },
          { month: 'Mar', count: 135 },
          { month: 'Apr', count: 142 },
          { month: 'May', count: 149 },
          { month: 'Jun', count: 156 }
        ],
        customersByLocation: [
          { area: 'Downtown', count: 45, percentage: 29 },
          { area: 'Suburbs', count: 68, percentage: 44 },
          { area: 'Commercial District', count: 43, percentage: 27 }
        ],
        customerSatisfaction: 92
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading || !customerData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Customer Insights</h1>
            <p className="text-gray-400">Understand your customer base and relationships</p>
          </div>
        </div>
        <Link href="/dashboard/customers">
          <Button className="btn-primary-modern">
            Manage Customers
          </Button>
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customerData.totalCustomers}</div>
            <p className="text-xs text-green-400 mt-1">+{customerData.newCustomers} this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Retention Rate</CardTitle>
            <RepeatIcon className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customerData.customerRetentionRate}%</div>
            <p className="text-xs text-gray-400 mt-1">Returning customers</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Lifetime Value</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${customerData.averageLifetimeValue.toLocaleString()}</div>
            <p className="text-xs text-gray-400 mt-1">Per customer</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customerData.customerSatisfaction}%</div>
            <p className="text-xs text-gray-400 mt-1">Happy customers</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{customerData.returningCustomers}</div>
            <p className="text-xs text-gray-400 mt-1">Repeat business</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Growth Chart */}
      <Card className="bg-gray-900/80 backdrop-blur border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Customer Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {customerData.customerGrowth.map((month, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-gray-400">{month.count}</div>
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-emerald-500 rounded-t"
                  style={{ height: `${(month.count / Math.max(...customerData.customerGrowth.map(m => m.count))) * 200}px` }}
                />
                <div className="text-xs text-gray-400">{month.month}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Customers */}
        <Card className="lg:col-span-2 bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {customerData.topCustomers.map((customer) => (
                <div 
                  key={customer.id}
                  className={`p-4 rounded-lg bg-gray-800/50 cursor-pointer transition-all hover:bg-gray-700/50 ${
                    selectedCustomer === customer.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCustomer(customer.id === selectedCustomer ? null : customer.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-white">{customer.name}</div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          customer.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {customer.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">${customer.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">{customer.quotesCount} quotes</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last: {new Date(customer.lastQuote).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Distribution */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Customer Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerData.customersByLocation.map((location, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{location.area}</span>
                  <span className="text-white font-medium">{location.count} ({location.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Mail className="h-4 w-4 mr-2" />
          Email Campaign
        </Button>
        <Button className="btn-primary-modern">
          <Phone className="h-4 w-4 mr-2" />
          Contact Customers
        </Button>
      </div>
    </div>
  )
}