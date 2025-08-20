import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database/adapter'
import { getCompanyFromRequest } from '@/lib/auth/simple-auth'

// Force dynamic rendering since we use request headers for auth
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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
    
    // Get all quotes for this company
    const quotes = await db.getQuotes(company.id)
    
    const achievements = []
    
    // Check First Quote achievement
    if (quotes.length > 0) {
      achievements.push({
        id: 'first_quote',
        name: 'First Quote',
        points: 100,
        reason: 'You have created your first professional quote'
      })
    }
    
    // Check Detail Master achievement - quotes with custom line items
    const quotesWithCustomItems = quotes.filter((q: any) => {
      try {
        const roomData = q.room_data ? JSON.parse(q.room_data) : null
        return roomData && roomData.customLineItems && roomData.customLineItems.length > 0
      } catch {
        return false
      }
    })
    
    if (quotesWithCustomItems.length > 0) {
      achievements.push({
        id: 'detail_master',
        name: 'Detail Master',
        points: 250,
        reason: 'You have added custom line items to a quote'
      })
    }
    
    // Check First Win achievement - accepted quotes
    const acceptedQuotes = quotes.filter((q: any) => q.status === 'accepted')
    if (acceptedQuotes.length > 0) {
      achievements.push({
        id: 'first_win',
        name: 'First Win',
        points: 500,
        reason: 'Your first quote was accepted!'
      })
    }
    
    // Check Early Bird achievement - quotes created before 9 AM
    const earlyQuotes = quotes.filter((q: any) => {
      const date = new Date(q.created_at)
      return date.getHours() < 9
    })
    
    if (earlyQuotes.length > 0) {
      achievements.push({
        id: 'early_bird',
        name: 'Early Bird',
        points: 150,
        reason: 'You created a quote before 9 AM'
      })
    }
    
    // Speed Demon is harder to check retroactively since we don't store creation time
    // But we can provide stats for the UI to check
    
    const stats = {
      totalQuotes: quotes.length,
      acceptedQuotes: acceptedQuotes.length,
      quotesWithCustomItems: quotesWithCustomItems.length,
      earlyBirdQuotes: earlyQuotes.length,
      potentialAchievements: achievements,
      totalPotentialPoints: achievements.reduce((sum, a) => sum + a.points, 0)
    }
    
    return NextResponse.json({
      success: true,
      stats,
      achievements,
      message: `Found ${achievements.length} achievements you should have unlocked`
    })
  } catch (error) {
    console.error('Error checking achievements:', error)
    return NextResponse.json(
      { error: 'Failed to check achievements' },
      { status: 500 }
    )
  }
}

// GET endpoint to manually check and display achievements
export async function GET(request: NextRequest) {
  return POST(request)
}