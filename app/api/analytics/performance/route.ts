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

    // Get performance metrics
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()

    // Get quotes data
    const { data: recentQuotes } = await supabase
      .from('quotes')
      .select('*')
      .eq('company_id', validatedCompanyId)
      .gte('created_at', thirtyDaysAgo)

    const { data: allQuotes } = await supabase
      .from('quotes')
      .select('*')
      .eq('company_id', validatedCompanyId)
      .gte('created_at', ninetyDaysAgo)

    // Calculate metrics
    const quotesCreated = recentQuotes?.length || 0
    const quotesAccepted = recentQuotes?.filter(q => q.status === 'accepted').length || 0
    const conversionRate = quotesCreated > 0 ? (quotesAccepted / quotesCreated) * 100 : 0
    
    // Calculate average time to close
    const acceptedWithTime = recentQuotes?.filter(q => 
      q.status === 'accepted' && q.updated_at
    ) || []
    
    const avgTimeToClose = acceptedWithTime.length > 0
      ? acceptedWithTime.reduce((sum, q) => {
          const created = new Date(q.created_at).getTime()
          const updated = new Date(q.updated_at).getTime()
          return sum + (updated - created) / (1000 * 60 * 60 * 24) // Convert to days
        }, 0) / acceptedWithTime.length
      : 0

    // Process weekly data for charts
    const weeklyData = processWeeklyData(allQuotes || [])

    return NextResponse.json({
      quotesCreated,
      quotesAccepted,
      conversionRate,
      avgTimeToClose: Math.round(avgTimeToClose * 10) / 10, // Round to 1 decimal
      weeklyQuotes: weeklyData.quotes,
      weeklyConversion: weeklyData.conversion,
      topPerformingQuotes: recentQuotes?.
        filter(q => q.status === 'accepted')
        .sort((a, b) => (b.total_price || 0) - (a.total_price || 0))
        .slice(0, 5) || []
    })
  } catch (error) {
    console.error('Performance analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function processWeeklyData(quotes: any[]) {
  const weeklyQuotes: { [key: string]: { created: number, accepted: number } } = {}
  
  // Process last 12 weeks
  for (let i = 0; i < 12; i++) {
    const weekStart = new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000))
    const weekKey = `Week ${12 - i}`
    weeklyQuotes[weekKey] = { created: 0, accepted: 0 }
  }
  
  quotes.forEach(quote => {
    const weekIndex = Math.floor((Date.now() - new Date(quote.created_at).getTime()) / (7 * 24 * 60 * 60 * 1000))
    if (weekIndex < 12) {
      const weekKey = `Week ${12 - weekIndex}`
      weeklyQuotes[weekKey].created++
      if (quote.status === 'accepted') {
        weeklyQuotes[weekKey].accepted++
      }
    }
  })
  
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