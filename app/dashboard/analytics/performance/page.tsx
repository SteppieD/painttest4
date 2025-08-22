'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Percent, 
  TrendingUp, 
  Clock, 
  Target,
  ArrowLeft,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'

interface PerformanceData {
  winRate: number
  winRateChange: number
  averageCloseTime: number
  quotesCreated: number
  quotesAccepted: number
  quotesPending: number
  quotesDeclined: number
  conversionByType: {
    type: string
    sent: number
    accepted: number
    rate: number
  }[]
  performanceTrend: {
    month: string
    winRate: number
    quotes: number
  }[]
  topPerformingServices: {
    service: string
    winRate: number
    avgValue: number
    totalRevenue: number
  }[]
  lossReasons: {
    reason: string
    count: number
    percentage: number
  }[]
}

export default function PerformanceAnalyticsPage() {
  const router = useRouter()
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month')

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    fetchPerformanceData(company)
  }, [router, selectedPeriod, fetchPerformanceData])

  const fetchPerformanceData = useCallback(async (company: { id: number; access_code: string }) => {
    try {
      const response = await fetch(`/api/analytics/performance?period=${selectedPeriod}`, {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.access_code
          })
        }
      })

      if (response.ok) {
        const data = await response.json()
        setPerformanceData(data)
      }
    } catch (error) {
      console.error('Error fetching performance data:', error)
      // Use mock data for now
      setPerformanceData({
        winRate: 68,
        winRateChange: 5.2,
        averageCloseTime: 3.5,
        quotesCreated: 245,
        quotesAccepted: 167,
        quotesPending: 32,
        quotesDeclined: 46,
        conversionByType: [
          { type: 'Interior Residential', sent: 120, accepted: 92, rate: 77 },
          { type: 'Exterior Residential', sent: 85, accepted: 51, rate: 60 },
          { type: 'Commercial', sent: 40, accepted: 24, rate: 60 }
        ],
        performanceTrend: [
          { month: 'Jan', winRate: 62, quotes: 38 },
          { month: 'Feb', winRate: 65, quotes: 42 },
          { month: 'Mar', winRate: 63, quotes: 45 },
          { month: 'Apr', winRate: 67, quotes: 40 },
          { month: 'May', winRate: 70, quotes: 44 },
          { month: 'Jun', winRate: 68, quotes: 36 }
        ],
        topPerformingServices: [
          { service: 'Kitchen Cabinet Painting', winRate: 82, avgValue: 3200, totalRevenue: 28500 },
          { service: 'Full Interior Paint', winRate: 75, avgValue: 4800, totalRevenue: 45200 },
          { service: 'Deck Staining', winRate: 71, avgValue: 2100, totalRevenue: 18900 }
        ],
        lossReasons: [
          { reason: 'Price too high', count: 18, percentage: 39 },
          { reason: 'Went with competitor', count: 12, percentage: 26 },
          { reason: 'Project postponed', count: 8, percentage: 17 },
          { reason: 'No response', count: 5, percentage: 11 },
          { reason: 'Other', count: 3, percentage: 7 }
        ]
      })
    } finally {
      setLoading(false)
    }
  }, [selectedPeriod])

  if (loading || !performanceData) {
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
            <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
            <p className="text-gray-400">Track your business performance and conversion rates</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? 'bg-blue-500' : ''}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Win Rate</CardTitle>
            <Percent className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{performanceData.winRate || 0}%</div>
            <p className={`text-xs mt-1 ${(performanceData.winRateChange || 0) > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {(performanceData.winRateChange || 0) > 0 ? '+' : ''}{performanceData.winRateChange || 0}% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Close Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{performanceData.averageCloseTime || 0} days</div>
            <p className="text-xs text-gray-400 mt-1">From quote to acceptance</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Quotes Created</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{performanceData.quotesCreated || 0}</div>
            <p className="text-xs text-gray-400 mt-1">This {selectedPeriod}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{performanceData.quotesAccepted || 0}</div>
            <p className="text-xs text-amber-400 mt-1">{performanceData.quotesPending || 0} pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trend Chart */}
      <Card className="bg-gray-900/80 backdrop-blur border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Win Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative">
            {/* Win rate line chart visualization */}
            <div className="absolute inset-0 flex items-end justify-between gap-4">
              {(performanceData.performanceTrend || []).map((month, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-2">{month.winRate}%</div>
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
                    style={{ height: `${(month.winRate / 100) * 200}px` }}
                  />
                  <div className="text-xs text-gray-400 mt-2">{month.month}</div>
                  <div className="text-xs text-gray-500">{month.quotes} quotes</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion by Type */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Conversion by Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(performanceData.conversionByType || []).map((type, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{type.type}</span>
                  <span className="text-white font-medium">{type.rate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${type.rate}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{type.accepted}/{type.sent}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performing Services */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-400" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(performanceData.topPerformingServices || []).map((service, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-800/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-white text-sm">{service.service}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        ${service.avgValue.toLocaleString()} avg
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{service.winRate}%</div>
                      <div className="text-xs text-gray-400">win rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loss Reasons */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              Why Quotes Are Lost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(performanceData.lossReasons || []).map((reason, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-3 w-3 text-red-400" />
                  <span className="text-sm text-gray-300">{reason.reason}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{reason.count}</span>
                  <span className="text-xs text-gray-400">({reason.percentage}%)</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quote Status Breakdown */}
      <Card className="bg-gray-900/80 backdrop-blur border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Quote Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{performanceData.quotesAccepted || 0}</div>
              <div className="text-sm text-gray-300">Accepted</div>
              <div className="text-xs text-green-400 mt-1">
                {(performanceData.quotesCreated || 0) > 0 ? Math.round(((performanceData.quotesAccepted || 0) / (performanceData.quotesCreated || 1)) * 100) : 0}%
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Clock className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{performanceData.quotesPending || 0}</div>
              <div className="text-sm text-gray-300">Pending</div>
              <div className="text-xs text-amber-400 mt-1">
                {(performanceData.quotesCreated || 0) > 0 ? Math.round(((performanceData.quotesPending || 0) / (performanceData.quotesCreated || 1)) * 100) : 0}%
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{performanceData.quotesDeclined || 0}</div>
              <div className="text-sm text-gray-300">Declined</div>
              <div className="text-xs text-red-400 mt-1">
                {(performanceData.quotesCreated || 0) > 0 ? Math.round(((performanceData.quotesDeclined || 0) / (performanceData.quotesCreated || 1)) * 100) : 0}%
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{performanceData.quotesCreated || 0}</div>
              <div className="text-sm text-gray-300">Total Created</div>
              <div className="text-xs text-blue-400 mt-1">This {selectedPeriod}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}