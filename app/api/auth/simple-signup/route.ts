import { NextRequest, NextResponse } from 'next/server'
import { getDatabaseAdapter } from '@/lib/database/adapter'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { companyName } = await request.json()

    if (!companyName || companyName.trim() === '') {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    const db = getDatabaseAdapter()

    // Generate a unique access code
    const accessCode = 'PQ' + Math.random().toString(36).substr(2, 8).toUpperCase()

    // Create company with simple data
    const company = await db.createCompany({
      company_name: companyName.trim(),
      access_code: accessCode,
      email: `${accessCode.toLowerCase()}@paintquote.com`,
      phone: '',
      is_trial: process.env.USE_SUPABASE === 'true' ? false : 0, // Handle boolean/integer difference
      quote_limit: 5
    })

    // Create session cookie
    const sessionId = Math.random().toString(36).substr(2, 16)
    cookies().set('pq_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    // For now, we'll skip the access_codes and sessions tables
    // The company table with access_code is sufficient for authentication
    // TODO: Implement proper session management with Supabase-compatible approach

    return NextResponse.json({
      success: true,
      accessCode: accessCode,
      company: {
        id: company.id,
        name: company.company_name,
        quotesRemaining: 5
      },
      message: `Welcome to PaintQuote Pro! Your access code is: ${accessCode}`
    })

  } catch (error: any) {
    console.error('Simple signup error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    // Provide more specific error messages
    if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
      return NextResponse.json(
        { error: 'This company name may already be taken. Please try another name.' },
        { status: 400 }
      )
    }
    
    if (error.message?.includes('Supabase')) {
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  }
}