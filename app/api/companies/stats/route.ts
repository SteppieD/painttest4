import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database/adapter'
import { getCompanyFromRequest } from '@/lib/auth/simple-auth'

export async function GET(request: NextRequest) {
  try {
    // Get company from request headers
    const company = await getCompanyFromRequest(request)
    
    if (!company) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    
    // Get total number of quotes for this company
    const quotes = await db.getQuotes(company.id)
    const totalQuotes = quotes.length
    
    // Get accepted quotes count
    const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length
    
    // Get quotes created today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const quotesToday = quotes.filter(q => {
      const quoteDate = new Date(q.created_at)
      return quoteDate >= today
    }).length
    
    // Get quotes with custom line items
    const quotesWithCustomItems = quotes.filter(q => {
      try {
        const roomData = q.room_data ? JSON.parse(q.room_data) : null
        return roomData && roomData.customLineItems && roomData.customLineItems.length > 0
      } catch {
        return false
      }
    }).length
    
    // Calculate average quote value
    const totalValue = quotes.reduce((sum, q) => sum + (q.total_revenue || 0), 0)
    const averageQuoteValue = totalQuotes > 0 ? totalValue / totalQuotes : 0
    
    // Get the creation time of the first quote
    const firstQuoteTime = quotes.length > 0 
      ? new Date(quotes[0].created_at).toISOString()
      : null
    
    return NextResponse.json({
      totalQuotes,
      acceptedQuotes,
      quotesToday,
      quotesWithCustomItems,
      averageQuoteValue,
      firstQuoteTime,
      // Achievement-specific flags
      hasFirstQuote: totalQuotes > 0,
      hasAcceptedQuote: acceptedQuotes > 0,
      hasDetailedQuote: quotesWithCustomItems > 0
    })
  } catch (error) {
    console.error('Error fetching company stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company stats' },
      { status: 500 }
    )
  }
}