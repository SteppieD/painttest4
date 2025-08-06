'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  ArrowLeft,
  Download,
  Filter,
  PieChart,
  Activity,
  Target
} from 'lucide-react'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'

interface RevenueData {
  totalRevenue: number
  monthlyRevenue: number
  averageQuoteValue: number
  largestQuote: number
  revenueByMonth: { month: string; revenue: number }[]
  revenueByProjectType: { type: string; revenue: number; percentage: number }[]
  revenueGrowth: number
  projectedRevenue: number
  topRevenueCustomers: { name: string; revenue: number; quotes: number }[]
}

export default function RevenueAnalyticsPage() {
  const router = useRouter()
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '1y' | 'all'>('90d')

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    fetchRevenueData(company)
  }, [router, timeRange])

  const fetchRevenueData = async (company: any) => {
    try {
      const response = await fetch(`/api/analytics/revenue?range=${timeRange}`, {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.access_code
          })
        }
      })

      if (response.ok) {
        const data = await response.json()
        setRevenueData(data)
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error)
      // Use mock data for now
      setRevenueData({
        totalRevenue: 125430,
        monthlyRevenue: 18750,
        averageQuoteValue: 3250,
        largestQuote: 12500,
        revenueByMonth: [
          { month: 'Jan', revenue: 15200 },
          { month: 'Feb', revenue: 18500 },
          { month: 'Mar', revenue: 22100 },
          { month: 'Apr', revenue: 19800 },
          { month: 'May', revenue: 24300 },
          { month: 'Jun', revenue: 25530 }
        ],
        revenueByProjectType: [
          { type: 'Interior Residential', revenue: 65000, percentage: 52 },
          { type: 'Exterior Residential', revenue: 35000, percentage: 28 },
          { type: 'Commercial', revenue: 25430, percentage: 20 }
        ],
        revenueGrowth: 18.5,
        projectedRevenue: 28500,
        topRevenueCustomers: [
          { name: 'Johnson Properties', revenue: 24500, quotes: 8 },
          { name: 'Smith Residence', revenue: 18200, quotes: 3 },
          { name: 'ABC Corporation', revenue: 15750, quotes: 5 }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading || !revenueData) {
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
            <h1 className="text-3xl font-bold text-white">Revenue Analytics</h1>
            <p className="text-gray-400">Deep insights into your business revenue</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(['30d', '90d', '1y', 'all'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : range === '1y' ? '1 Year' : 'All Time'}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${revenueData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-400 mt-1">+{revenueData.revenueGrowth}% from last period</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Monthly Average</CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${revenueData.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-400 mt-1">Current month performance</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Average Quote Value</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${revenueData.averageQuoteValue.toLocaleString()}</div>
            <p className="text-xs text-gray-400 mt-1">Per quote average</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Projected Next Month</CardTitle>
            <Target className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${revenueData.projectedRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-400 mt-1">Based on current trends</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Chart */}
      <Card className="bg-gray-900/80 backdrop-blur border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {revenueData.revenueByMonth.map((month, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-gray-400">${(month.revenue / 1000).toFixed(1)}k</div>
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                  style={{ height: `${(month.revenue / Math.max(...revenueData.revenueByMonth.map(m => m.revenue))) * 200}px` }}
                />
                <div className="text-xs text-gray-400">{month.month}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Project Type */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Revenue by Project Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueData.revenueByProjectType.map((type, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{type.type}</span>
                  <span className="text-white font-medium">${(type.revenue / 1000).toFixed(1)}k ({type.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${type.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Revenue Customers */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Top Revenue Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData.topRevenueCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                  <div>
                    <div className="font-medium text-white">{customer.name}</div>
                    <div className="text-sm text-gray-400">{customer.quotes} quotes</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">${customer.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">
                      {((customer.revenue / revenueData.totalRevenue) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button className="btn-primary-modern">
          <Download className="h-4 w-4 mr-2" />
          Export Revenue Report
        </Button>
      </div>
    </div>
  )
}