import { NextResponse, NextRequest } from 'next/server'
import { getCompanyFromRequest } from '@/lib/auth/simple-auth'
import { getDb, Quote } from '@/lib/database/adapter'

// Force dynamic rendering since we use request headers for auth
export const dynamic = 'force-dynamic';

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
    
    // Get quotes for this company
    const quotes = await db.getQuotesByCompanyId(validatedCompanyId)
    
    // Extract unique customers from quotes
    const customersMap = new Map()
    quotes.forEach((quote: Quote) => {
      if (!customersMap.has(quote.customer_email)) {
        customersMap.set(quote.customer_email, {
          id: quote.customer_email,
          name: quote.customer_name,
          email: quote.customer_email,
          phone: quote.customer_phone,
          created_at: quote.created_at
        })
      }
    })
    
    const customers = Array.from(customersMap.values())

    // Calculate metrics
    const totalCustomers = customers?.length || 0
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const newCustomers = customers?.filter(c => 
      new Date(c.created_at) >= thirtyDaysAgo
    ).length || 0

    // Calculate customer lifetime values
    const customerValues: { [key: string]: number } = {}
    quotes?.forEach((quote: Quote) => {
      if (quote.customer_email && quote.status === 'accepted') {
        if (!customerValues[quote.customer_email]) {
          customerValues[quote.customer_email] = 0
        }
        customerValues[quote.customer_email] += (quote.pricing as { total?: number })?.total || quote.total_cost || 0
      }
    })

    const avgLifetimeValue = Object.values(customerValues).length > 0
      ? Object.values(customerValues).reduce((sum, val) => sum + val, 0) / Object.values(customerValues).length
      : 0

    const repeatCustomers = Object.keys(customerValues).length

    // Process monthly growth
    const monthlyGrowth = processMonthlyGrowth(customers || [])

    // Get top customers
    const topCustomers = Object.entries(customerValues)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([customerEmail, value]) => {
        const customer = customers?.find(c => c.email === customerEmail)
        return {
          id: customerEmail,
          name: customer?.name || 'Unknown',
          email: customerEmail,
          totalValue: value,
          quotesCount: quotes?.filter((q: Quote) => q.customer_email === customerEmail).length || 0
        }
      })

    // Calculate retention rate (mock for now since we don't have historical data)
    const customerRetentionRate = totalCustomers > 0 ? 75 : 0
    
    // Add mock location data
    const customersByLocation = [
      { area: 'Downtown', count: Math.floor(totalCustomers * 0.4), percentage: 40 },
      { area: 'Suburbs', count: Math.floor(totalCustomers * 0.35), percentage: 35 },
      { area: 'Rural', count: Math.floor(totalCustomers * 0.25), percentage: 25 }
    ]
    
    // Format top customers to match expected structure
    const formattedTopCustomers = topCustomers.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: '', // We don't have phone in aggregated data
      totalSpent: c.totalValue,
      quotesCount: c.quotesCount,
      lastQuote: new Date().toISOString(), // Mock date
      status: 'active' as const
    }))
    
    // Format customer growth to match expected structure
    const formattedGrowth = monthlyGrowth.map(item => ({
      month: item.month,
      count: item.customers
    }))
    
    return NextResponse.json({
      totalCustomers,
      newCustomers,
      returningCustomers: repeatCustomers,
      averageLifetimeValue: Math.round(avgLifetimeValue),
      customerRetentionRate,
      topCustomers: formattedTopCustomers,
      customerGrowth: formattedGrowth,
      customersByLocation,
      customerSatisfaction: 4.5, // Mock satisfaction score
      recentCustomers: customers?.slice(0, 10) || []
    })
  } catch (error) {
    console.error('Customer analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

function processMonthlyGrowth(customers: Customer[]) {
  const monthlyData: { [key: string]: number } = {}
  
  // Get last 12 months
  for (let i = 0; i < 12; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyData[monthKey] = 0
  }
  
  customers.forEach(customer => {
    const date = new Date(customer.created_at)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (monthKey in monthlyData) {
      monthlyData[monthKey]++
    }
  })
  
  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, customers]) => ({
      month,
      customers
    }))
}