import { NextResponse, NextRequest } from 'next/server'
import { getCompanyFromRequest } from '@/lib/auth/simple-auth'
import { getDb } from '@/lib/database/adapter'

// Demo data for when no quotes exist
const getDemoData = () => ({
  totalRevenue: 125430,
  monthlyRevenue: 18750,
  averageQuoteValue: 3250,
  largestQuote: 12500,
  revenueByMonth: [
    { month: 'Jul', revenue: 15200 },
    { month: 'Aug', revenue: 18500 },
    { month: 'Sep', revenue: 22100 },
    { month: 'Oct', revenue: 19800 },
    { month: 'Nov', revenue: 24300 },
    { month: 'Dec', revenue: 25530 }
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

    // Get all quotes for this company
    const allQuotes = await db.getQuotesByCompanyId(validatedCompanyId)
    
    // Filter quotes by status
    const acceptedQuotes = allQuotes?.filter((q: any) => q.status === 'accepted') || []
    
    // If no accepted quotes, return demo data
    if (acceptedQuotes.length === 0) {
      return NextResponse.json(getDemoData())
    }
    
    // Calculate revenue metrics
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    
    // Filter quotes for monthly calculation
    const recentQuotes = acceptedQuotes.filter((q: any) => 
      new Date(q.created_at) >= thirtyDaysAgo
    )
    
    // Calculate totals
    const totalRevenue = acceptedQuotes.reduce((sum: number, q: any) => 
      sum + (q.pricing?.total || q.total || 0), 0
    )
    
    const monthlyRevenue = recentQuotes.reduce((sum: number, q: any) => 
      sum + (q.pricing?.total || q.total || 0), 0
    )
    
    // Calculate average quote value
    const averageQuoteValue = acceptedQuotes.length > 0 
      ? totalRevenue / acceptedQuotes.length 
      : 0
    
    // Calculate largest quote
    const largestQuote = acceptedQuotes.reduce((max: number, q: any) => {
      const quoteValue = q.pricing?.total || q.total || 0
      return quoteValue > max ? quoteValue : max
    }, 0)
    
    // Process monthly revenue data
    const revenueByMonth = processMonthlyRevenue(acceptedQuotes)
    
    // Process revenue by project type with percentages
    const revenueByProjectType = processRevenueByProjectType(acceptedQuotes, totalRevenue)
    
    // Process top revenue customers
    const topRevenueCustomers = processTopRevenueCustomers(acceptedQuotes)
    
    // Calculate growth metrics
    const previousMonthRevenue = revenueByMonth[revenueByMonth.length - 2]?.revenue || 0
    const revenueGrowth = previousMonthRevenue > 0 
      ? ((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100
      : 0
    
    // Simple projection based on current monthly average
    const projectedRevenue = Math.round(monthlyRevenue * 1.1) // 10% optimistic growth
    
    return NextResponse.json({
      totalRevenue: Math.round(totalRevenue),
      monthlyRevenue: Math.round(monthlyRevenue),
      averageQuoteValue: Math.round(averageQuoteValue),
      largestQuote: Math.round(largestQuote),
      revenueByMonth,
      revenueByProjectType,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      projectedRevenue,
      topRevenueCustomers
    })
  } catch (error) {
    console.error('Revenue analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function processMonthlyRevenue(quotes: any[]) {
  const monthlyRevenue: { [key: string]: number } = {}
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyRevenue[monthKey] = 0
  }
  
  // Sum revenue by month
  quotes.forEach(quote => {
    const date = new Date(quote.created_at)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (monthKey in monthlyRevenue) {
      monthlyRevenue[monthKey] += quote.pricing?.total || quote.total || 0
    }
  })
  
  // Convert to array with proper month names and sort
  return Object.entries(monthlyRevenue)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, revenue]) => {
      const [year, month] = monthKey.split('-')
      const monthIndex = parseInt(month) - 1
      return {
        month: monthNames[monthIndex],
        revenue: Math.round(revenue)
      }
    })
}

function processRevenueByProjectType(quotes: any[], totalRevenue: number) {
  const revenueByType: { [key: string]: number } = {}
  
  quotes.forEach(quote => {
    const type = quote.project_type || 'Other'
    if (!revenueByType[type]) {
      revenueByType[type] = 0
    }
    revenueByType[type] += quote.pricing?.total || quote.total || 0
  })
  
  return Object.entries(revenueByType)
    .map(([type, revenue]) => ({
      type,
      revenue: Math.round(revenue),
      percentage: totalRevenue > 0 ? Math.round((revenue / totalRevenue) * 100) : 0
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

function processTopRevenueCustomers(quotes: any[]) {
  const customerRevenue: { [key: string]: { revenue: number; quotes: number } } = {}
  
  quotes.forEach(quote => {
    const customerName = quote.customer_name || 'Unknown Customer'
    const quoteValue = quote.pricing?.total || quote.total || 0
    
    if (!customerRevenue[customerName]) {
      customerRevenue[customerName] = { revenue: 0, quotes: 0 }
    }
    
    customerRevenue[customerName].revenue += quoteValue
    customerRevenue[customerName].quotes += 1
  })
  
  return Object.entries(customerRevenue)
    .map(([name, data]) => ({
      name,
      revenue: Math.round(data.revenue),
      quotes: data.quotes
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5) // Top 5 customers
}