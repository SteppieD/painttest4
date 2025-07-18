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
      is_trial: 0, // Use 0 instead of false for SQLite
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

    // Also create an entry in access_codes table for tracking
    await db.query(
      `INSERT INTO access_codes (code, company_name, is_active, uses_count) 
       VALUES (?, ?, 1, 1)`,
      [accessCode, companyName]
    )

    // Create session in database
    await db.query(
      `INSERT INTO access_code_sessions (id, session_data) 
       VALUES (?, ?)`,
      [sessionId, JSON.stringify({ company_id: company.id })]
    )

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

  } catch (error) {
    console.error('Simple signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  }
}