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

    // Get revenue data from quotes
    const { data: quotes, error: quotesError } = await supabase
      .from('quotes')
      .select('total_price, created_at, status')
      .eq('company_id', validatedCompanyId)
      .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true })

    if (quotesError) {
      console.error('Error fetching quotes:', quotesError)
      return NextResponse.json({ error: 'Failed to fetch revenue data' }, { status: 500 })
    }

    // Process data for the dashboard
    const monthlyRevenue = processMonthlyRevenue(quotes || [])
    const totalRevenue = quotes?.reduce((sum, q) => sum + (q.total_price || 0), 0) || 0
    const acceptedQuotes = quotes?.filter(q => q.status === 'accepted') || []
    const acceptedRevenue = acceptedQuotes.reduce((sum, q) => sum + (q.total_price || 0), 0)
    
    return NextResponse.json({
      totalRevenue,
      acceptedRevenue,
      averageQuoteValue: quotes?.length ? totalRevenue / quotes.length : 0,
      conversionRate: quotes?.length ? (acceptedQuotes.length / quotes.length) * 100 : 0,
      revenueByMonth: monthlyRevenue,
      recentQuotes: quotes?.slice(-10).reverse() || []
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function processMonthlyRevenue(quotes: any[]) {
  const monthlyData: { [key: string]: number } = {}
  
  quotes.forEach(quote => {
    const date = new Date(quote.created_at)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0
    }
    monthlyData[monthKey] += quote.total_price || 0
  })
  
  // Convert to array format expected by the chart
  return Object.entries(monthlyData).map(([month, revenue]) => ({
    month,
    revenue
  })).slice(-12) // Last 12 months
}