'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, FileText, Users, DollarSign, TrendingUp } from 'lucide-react'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'
interface Customer {
  id: number
  name: string
  email?: string
  phone?: string
  address?: string
  totalQuotes: number
  acceptedQuotes: number
  totalRevenue: number
  lastQuoteDate: string
  created_at: string
}

export default function CustomersPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [companyData, setCompanyData] = useState<any>(null)

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    setCompanyData(company)
    fetchCustomers(company)
  }, [router])

  const fetchCustomers = async (company: unknown) => {
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
        setCustomers(data.customers || [])
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gradient-modern">Customers</h1>
        <p className="text-medium-contrast">
          Manage your customer relationships and quote history
        </p>
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
              {customers.map((customer) => (
                <div key={customer.id} className="border border-white/10 rounded-lg p-4 hover:bg-gray-900/80 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-white hover:text-blue-400 transition-colors">
                        {customer.name}
                      </h3>
                      
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
                    
                    <div className="text-right space-y-1">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}