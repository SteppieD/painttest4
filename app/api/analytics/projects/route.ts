import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Quote } from '@/lib/database/adapter'

// Force dynamic rendering since we use authentication
export const dynamic = 'force-dynamic';

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

    // Get quotes data (treating quotes as projects)
    const { data: quotes, error: quotesError } = await supabase
      .from('quotes')
      .select('*')
      .eq('company_id', profile.company_id)
      .order('created_at', { ascending: false })

    if (quotesError) {
      console.error('Error fetching quotes:', quotesError)
      return NextResponse.json({ error: 'Failed to fetch project data' }, { status: 500 })
    }

    // Calculate metrics
    const totalProjects = quotes?.length || 0
    const activeProjects = quotes?.filter(q => 
      q.status === 'accepted' || q.status === 'in_progress'
    ).length || 0
    const completedProjects = quotes?.filter(q => 
      q.status === 'completed'
    ).length || 0
    const pendingProjects = quotes?.filter(q => 
      q.status === 'pending' || q.status === 'draft'
    ).length || 0

    // Calculate completion rate
    const completionRate = totalProjects > 0 
      ? (completedProjects / totalProjects) * 100 
      : 0

    // Process project timeline data
    const timelineData = processTimelineData(quotes || [])
    
    // Get project types distribution
    const projectTypes = processProjectTypes(quotes || [])

    // Recent projects
    const recentProjects = quotes?.slice(0, 10).map(q => ({
      id: q.id,
      name: q.quote_number || `Quote #${q.id.slice(0, 8)}`,
      customer: q.customer_name || 'Unknown',
      status: q.status || 'pending',
      value: q.total_price || 0,
      createdAt: q.created_at,
      items: q.line_items?.length || 0
    })) || []

    return NextResponse.json({
      totalProjects,
      activeProjects,
      completedProjects,
      pendingProjects,
      completionRate: Math.round(completionRate),
      projectTimeline: timelineData,
      projectTypes,
      recentProjects
    })
  } catch (error) {
    console.error('Projects analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function processTimelineData(quotes: Quote[]) {
  const monthlyData: { [key: string]: { started: number, completed: number } } = {}
  
  // Initialize last 6 months
  for (let i = 0; i < 6; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyData[monthKey] = { started: 0, completed: 0 }
  }
  
  quotes.forEach(quote => {
    const createdDate = new Date(quote.created_at)
    const createdKey = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, '0')}`
    
    if (createdKey in monthlyData) {
      monthlyData[createdKey].started++
    }
    
    if (quote.status === 'completed' && quote.updated_at) {
      const completedDate = new Date(quote.updated_at)
      const completedKey = `${completedDate.getFullYear()}-${String(completedDate.getMonth() + 1).padStart(2, '0')}`
      
      if (completedKey in monthlyData) {
        monthlyData[completedKey].completed++
      }
    }
  })
  
  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      started: data.started,
      completed: data.completed
    }))
}

function processProjectTypes(quotes: Quote[]) {
  const types: { [key: string]: number } = {
    'Interior': 0,
    'Exterior': 0,
    'Commercial': 0,
    'Residential': 0,
    'Other': 0
  }
  
  quotes.forEach(quote => {
    // Try to categorize based on line items or quote details
    const pricing = quote.pricing as Record<string, any>
    const lineItems = pricing?.line_items || []
    let categorized = false
    
    lineItems.forEach((item: { description?: string; quantity?: number; rate?: number; total?: number }) => {
      const desc = (item.description || '').toLowerCase()
      if (desc.includes('interior')) {
        types['Interior']++
        categorized = true
      } else if (desc.includes('exterior')) {
        types['Exterior']++
        categorized = true
      } else if (desc.includes('commercial')) {
        types['Commercial']++
        categorized = true
      } else if (desc.includes('residential')) {
        types['Residential']++
        categorized = true
      }
    })
    
    if (!categorized) {
      types['Other']++
    }
  })
  
  return Object.entries(types)
    .filter(([, count]) => count > 0)
    .map(([type, count]) => ({
      type,
      count
    }))
}