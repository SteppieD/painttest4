import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateCompanyId } from '@/lib/validation/schemas'

export async function GET() {
  try {
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's company
    const { data: profile } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', user.id)
      .single()

    if (!profile?.company_id) {
      return NextResponse.json({ error: 'No company found' }, { status: 404 })
    }

    // Validate company ID to prevent SQL injection
    let validatedCompanyId: number;
    try {
      validatedCompanyId = validateCompanyId(profile.company_id);
    } catch (error) {
      console.error('Invalid company ID in profile:', profile.company_id);
      return NextResponse.json({ error: 'Invalid company data' }, { status: 400 })
    }

    // Get customers data
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('*')
      .eq('company_id', validatedCompanyId)
      .order('created_at', { ascending: false })

    if (customersError) {
      console.error('Error fetching customers:', customersError)
      return NextResponse.json({ error: 'Failed to fetch customer data' }, { status: 500 })
    }

    // Get quotes for lifetime value calculation
    const { data: quotes } = await supabase
      .from('quotes')
      .select('customer_id, total_price, status')
      .eq('company_id', validatedCompanyId)

    // Calculate metrics
    const totalCustomers = customers?.length || 0
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const newCustomers = customers?.filter(c => 
      new Date(c.created_at) >= thirtyDaysAgo
    ).length || 0

    // Calculate customer lifetime values
    const customerValues: { [key: string]: number } = {}
    quotes?.forEach(quote => {
      if (quote.customer_id && quote.status === 'accepted') {
        if (!customerValues[quote.customer_id]) {
          customerValues[quote.customer_id] = 0
        }
        customerValues[quote.customer_id] += quote.total_price || 0
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
      .map(([customerId, value]) => {
        const customer = customers?.find(c => c.id === customerId)
        return {
          id: customerId,
          name: customer?.name || 'Unknown',
          email: customer?.email || '',
          totalValue: value,
          quotesCount: quotes?.filter(q => q.customer_id === customerId).length || 0
        }
      })

    return NextResponse.json({
      totalCustomers,
      newCustomers,
      repeatCustomers,
      avgLifetimeValue: Math.round(avgLifetimeValue),
      customerGrowth: monthlyGrowth,
      topCustomers,
      recentCustomers: customers?.slice(0, 10) || []
    })
  } catch (error) {
    console.error('Customer analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function processMonthlyGrowth(customers: any[]) {
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