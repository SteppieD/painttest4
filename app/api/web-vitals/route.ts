import { NextRequest, NextResponse } from 'next/server'

interface WebVitalData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  id?: string
  navigationType?: string
  url: string
  timestamp: number
  deviceType: string
  connectionType: string
  userAgent: string
  referrer: string
}

export async function POST(request: NextRequest) {
  try {
    const { vitals }: { vitals: WebVitalData[] } = await request.json()

    // Validate the data
    if (!Array.isArray(vitals) || vitals.length === 0) {
      return NextResponse.json(
        { error: 'Invalid vitals data' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Store this data in a database
    // 2. Send to analytics service (Google Analytics, DataDog, etc.)
    // 3. Set up alerts for poor performance

    // For now, we'll log the data
    console.log('Web Vitals received:', {
      count: vitals.length,
      data: vitals.map(vital => ({
        name: vital.name,
        value: vital.value,
        rating: vital.rating,
        url: vital.url,
        deviceType: vital.deviceType,
        timestamp: new Date(vital.timestamp).toISOString()
      }))
    })

    // Check for poor performance and log alerts
    const poorVitals = vitals.filter(vital => vital.rating === 'poor')
    if (poorVitals.length > 0) {
      console.warn('Poor Web Vitals detected:', poorVitals.map(vital => ({
        metric: vital.name,
        value: vital.value,
        url: vital.url,
        device: vital.deviceType
      })))

      // In production, you might want to:
      // - Send alerts to Slack/email
      // - Create performance incident tickets
      // - Trigger automated optimization workflows
    }

    // Aggregate data for monitoring
    const aggregatedData = {
      timestamp: Date.now(),
      totalVitals: vitals.length,
      goodCount: vitals.filter(v => v.rating === 'good').length,
      needsImprovementCount: vitals.filter(v => v.rating === 'needs-improvement').length,
      poorCount: vitals.filter(v => v.rating === 'poor').length,
      metrics: vitals.reduce((acc, vital) => {
        acc[vital.name] = {
          value: vital.value,
          rating: vital.rating
        }
        return acc
      }, {} as Record<string, { value: number; rating: string }>)
    }

    // Store aggregated data (in production, this would go to a database)
    console.log('Aggregated vitals data:', aggregatedData)

    return NextResponse.json({
      success: true,
      processed: vitals.length,
      timestamp: Date.now()
    })

  } catch (error) {
    console.error('Error processing web vitals:', error)
    return NextResponse.json(
      { error: 'Failed to process web vitals data' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve web vitals analytics (for dashboard)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || '24h'
  const page = searchParams.get('page')

  // In production, this would query your database
  // For now, return mock data structure
  const mockData = {
    period,
    page: page || 'all',
    summary: {
      totalPageViews: 1250,
      avgLCP: 2.1,
      avgINP: 180,
      avgCLS: 0.08,
      avgFCP: 1.6,
      avgTTFB: 450,
      performanceScore: 92
    },
    trends: {
      lcp: { trend: 'improving', change: -5.2 },
      inp: { trend: 'stable', change: 1.1 },
      cls: { trend: 'improving', change: -12.5 }
    },
    alerts: [
      {
        metric: 'LCP',
        threshold: 2500,
        currentValue: 3200,
        page: '/painting-contractors',
        severity: 'warning',
        timestamp: Date.now() - 3600000
      }
    ]
  }

  return NextResponse.json(mockData)
}