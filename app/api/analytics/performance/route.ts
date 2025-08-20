import { NextResponse, NextRequest } from 'next/server'
import { getCompanyFromRequest } from '@/lib/auth/simple-auth'
import { getDb } from '@/lib/database/adapter'

export async function GET(request: NextRequest) {
  try {
    // Get authenticated company
    const company = await getCompanyFromRequest(request)
    
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const validatedCompanyId = company.id
    
    // Get database adapter
    const db = getDb()

    // Get performance metrics
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)

    // Get all quotes for this company
    const allQuotes = await db.getQuotesByCompanyId(validatedCompanyId)
    
    // Filter quotes by date
    const recentQuotes = allQuotes?.filter((q: any) => 
      new Date(q.created_at) >= thirtyDaysAgo
    ) || []
    
    const quarterQuotes = allQuotes?.filter((q: any) => 
      new Date(q.created_at) >= ninetyDaysAgo
    ) || []

    // If no quotes exist, return sample data for demonstration
    if (!allQuotes || allQuotes.length === 0) {
      console.log('[Performance API] No quotes found, returning sample data')
      return NextResponse.json({
        winRate: 68,
        winRateChange: 5.2,
        averageCloseTime: 3.5,
        quotesCreated: 15,
        quotesAccepted: 10,
        quotesPending: 3,
        quotesDeclined: 2,
        conversionByType: [
          { type: 'Interior Residential', sent: 8, accepted: 6, rate: 75 },
          { type: 'Exterior Residential', sent: 5, accepted: 3, rate: 60 },
          { type: 'Commercial', sent: 2, accepted: 1, rate: 50 }
        ],
        performanceTrend: [
          { month: 'Jul', winRate: 62, quotes: 8 },
          { month: 'Aug', winRate: 65, quotes: 12 },
          { month: 'Sep', winRate: 63, quotes: 15 },
          { month: 'Oct', winRate: 67, quotes: 10 },
          { month: 'Nov', winRate: 70, quotes: 14 },
          { month: 'Dec', winRate: 68, quotes: 15 }
        ],
        topPerformingServices: [
          { service: 'Kitchen Cabinet Painting', winRate: 82, avgValue: 3200, totalRevenue: 16000 },
          { service: 'Full Interior Paint', winRate: 75, avgValue: 4800, totalRevenue: 24000 },
          { service: 'Deck Staining', winRate: 71, avgValue: 2100, totalRevenue: 8400 }
        ],
        lossReasons: [
          { reason: 'Price too high', count: 1, percentage: 50 },
          { reason: 'Went with competitor', count: 1, percentage: 50 }
        ]
      })
    }

    // Calculate metrics
    const quotesCreated = recentQuotes?.length || 0
    const quotesAccepted = recentQuotes?.filter((q: any) => q.status === 'accepted').length || 0
    const conversionRate = quotesCreated > 0 ? (quotesAccepted / quotesCreated) * 100 : 0
    
    // Calculate average time to close
    const acceptedWithTime = recentQuotes?.filter((q: any) => 
      q.status === 'accepted' && q.updated_at
    ) || []
    
    const avgTimeToClose = acceptedWithTime.length > 0
      ? acceptedWithTime.reduce((sum: number, q: any) => {
          const created = new Date(q.created_at).getTime()
          const updated = new Date(q.updated_at).getTime()
          return sum + (updated - created) / (1000 * 60 * 60 * 24) // Convert to days
        }, 0) / acceptedWithTime.length
      : 0

    // Process weekly data for charts
    const weeklyData = processWeeklyData(quarterQuotes || [])

    // Calculate additional metrics
    const quotesPending = recentQuotes?.filter((q: any) => q.status === 'pending').length || 0
    const quotesDeclined = recentQuotes?.filter((q: any) => q.status === 'declined').length || 0
    
    // Calculate win rate change (compare to previous period)
    const previousPeriodQuotes = allQuotes?.filter((q: any) => {
      const quoteDate = new Date(q.created_at)
      return quoteDate >= new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) && 
             quoteDate < thirtyDaysAgo
    }) || []
    
    const previousAccepted = previousPeriodQuotes.filter((q: any) => q.status === 'accepted').length
    const previousTotal = previousPeriodQuotes.length
    const previousWinRate = previousTotal > 0 ? (previousAccepted / previousTotal) * 100 : 0
    const winRateChange = conversionRate - previousWinRate
    
    // Group quotes by service type for conversion analysis
    const serviceTypes = ['Interior Residential', 'Exterior Residential', 'Commercial']
    const conversionByType = serviceTypes.map(type => {
      const typeQuotes = recentQuotes?.filter((q: any) => 
        q.service_type === type || 
        (q.project_details && JSON.stringify(q.project_details).toLowerCase().includes(type.toLowerCase().split(' ')[0]))
      ) || []
      const sent = typeQuotes.length
      const accepted = typeQuotes.filter((q: any) => q.status === 'accepted').length
      const rate = sent > 0 ? Math.round((accepted / sent) * 100) : 0
      
      return { type, sent, accepted, rate }
    })
    
    // Process monthly trend data
    const performanceTrend = processMonthlyTrend(quarterQuotes || [])
    
    // Calculate top performing services
    const topPerformingServices = calculateTopServices(recentQuotes || [])
    
    // Calculate loss reasons
    const lossReasons = calculateLossReasons(recentQuotes || [])

    return NextResponse.json({
      winRate: Math.round(conversionRate),
      winRateChange: Math.round(winRateChange * 10) / 10,
      averageCloseTime: Math.round(avgTimeToClose * 10) / 10,
      quotesCreated,
      quotesAccepted,
      quotesPending,
      quotesDeclined,
      conversionByType,
      performanceTrend,
      topPerformingServices,
      lossReasons
    })
  } catch (error) {
    console.error('Performance analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function processWeeklyData(quotes: any[]) {
  const weeklyQuotes: { [key: string]: { created: number, accepted: number } } = {}
  
  // Get last 12 weeks
  for (let i = 0; i < 12; i++) {
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - (i * 7))
    weekStart.setHours(0, 0, 0, 0)
    
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    
    const weekKey = `Week ${12 - i}`
    weeklyQuotes[weekKey] = { created: 0, accepted: 0 }
    
    quotes.forEach(quote => {
      const quoteDate = new Date(quote.created_at)
      if (quoteDate >= weekStart && quoteDate < weekEnd) {
        weeklyQuotes[weekKey].created++
        if (quote.status === 'accepted') {
          weeklyQuotes[weekKey].accepted++
        }
      }
    })
  }
  
  const quotesArray = Object.entries(weeklyQuotes).map(([week, data]) => ({
    week,
    quotes: data.created
  }))
  
  const conversionArray = Object.entries(weeklyQuotes).map(([week, data]) => ({
    week,
    rate: data.created > 0 ? (data.accepted / data.created) * 100 : 0
  }))
  
  return {
    quotes: quotesArray,
    conversion: conversionArray
  }
}

function processMonthlyTrend(quotes: any[]) {
  const monthlyData: { [key: string]: { created: number, accepted: number } } = {}
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  // Get last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthKey = months[date.getMonth()]
    
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    
    monthlyData[monthKey] = { created: 0, accepted: 0 }
    
    quotes.forEach(quote => {
      const quoteDate = new Date(quote.created_at)
      if (quoteDate >= monthStart && quoteDate <= monthEnd) {
        monthlyData[monthKey].created++
        if (quote.status === 'accepted') {
          monthlyData[monthKey].accepted++
        }
      }
    })
  }
  
  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    winRate: data.created > 0 ? Math.round((data.accepted / data.created) * 100) : 0,
    quotes: data.created
  }))
}

function calculateTopServices(quotes: any[]) {
  const serviceData: { [key: string]: { total: number, accepted: number, revenue: number } } = {}
  
  quotes.forEach(quote => {
    const service = quote.service_type || 'General Painting'
    if (!serviceData[service]) {
      serviceData[service] = { total: 0, accepted: 0, revenue: 0 }
    }
    
    serviceData[service].total++
    if (quote.status === 'accepted') {
      serviceData[service].accepted++
      serviceData[service].revenue += quote.pricing?.total || 0
    }
  })
  
  return Object.entries(serviceData)
    .map(([service, data]) => ({
      service,
      winRate: data.total > 0 ? Math.round((data.accepted / data.total) * 100) : 0,
      avgValue: data.accepted > 0 ? Math.round(data.revenue / data.accepted) : 0,
      totalRevenue: data.revenue
    }))
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 3)
}

function calculateLossReasons(quotes: any[]) {
  const declinedQuotes = quotes.filter(q => q.status === 'declined')
  const total = declinedQuotes.length
  
  if (total === 0) {
    return []
  }
  
  // Mock loss reasons for now - in a real app you'd have this data
  const reasons = [
    { reason: 'Price too high', count: Math.round(total * 0.4), percentage: 40 },
    { reason: 'Went with competitor', count: Math.round(total * 0.25), percentage: 25 },
    { reason: 'Project postponed', count: Math.round(total * 0.2), percentage: 20 },
    { reason: 'No response', count: Math.round(total * 0.1), percentage: 10 },
    { reason: 'Other', count: Math.round(total * 0.05), percentage: 5 }
  ]
  
  return reasons.filter(r => r.count > 0)
}