import { NextRequest, NextResponse } from 'next/server'
import { getDatabaseAdapter, db } from '@/lib/database/adapter'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { companyName, email } = await request.json()

    if (!companyName || companyName.trim() === '') {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      )
    }

    if (!email || email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const db = getDatabaseAdapter()

    // Check if email already exists
    try {
      const existingCompanies = await db.getAllCompanies()
      const emailExists = existingCompanies.some(
        company => company.email?.toLowerCase() === email.trim().toLowerCase()
      )
      
      if (emailExists) {
        return NextResponse.json(
          { error: 'An account with this email already exists. Please sign in with your access code.' },
          { status: 400 }
        )
      }
    } catch (checkError) {
      console.error('Error checking existing email:', checkError)
      // Continue with signup if check fails
    }

    // Generate a unique access code
    const accessCode = 'PQ' + Math.random().toString(36).substr(2, 8).toUpperCase()

    // Create company with simple data
    const isSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const company = await db.createCompany({
      company_name: companyName.trim(),
      access_code: accessCode,
      email: email.trim().toLowerCase(),
      phone: '',
      is_trial: isSupabase ? false : 0, // Handle boolean/integer difference
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

    // Send welcome email (non-blocking)
    fetch(`${request.nextUrl.origin}/api/email/send-welcome`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: company.email,
        companyName: company.company_name,
        accessCode: accessCode
      })
    }).catch(error => {
      console.error('Failed to send welcome email:', error)
    })

    return NextResponse.json({
      success: true,
      accessCode: accessCode,
      company: {
        id: company.id,
        name: company.company_name,
        email: company.email,
        quotesRemaining: 5,
        onboarding_completed: false
      },
      message: `Welcome to PaintQuote Pro! Your access code is: ${accessCode}`
    })

  } catch (error: any) {
    console.error('Simple signup error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
    
    // Log which database adapter we're using
    console.error('Database adapter:', db.constructor.name)
    console.error('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      HAS_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL
    })
    
    // Provide more specific error messages
    if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
      return NextResponse.json(
        { error: 'This company name may already be taken. Please try another name.' },
        { status: 400 }
      )
    }
    
    if (error.message?.includes('column') || error.message?.includes('field')) {
      console.error('Database schema mismatch error - likely missing column in production database')
      return NextResponse.json(
        { error: 'Database configuration error. Our team has been notified.' },
        { status: 500 }
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