import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDatabaseAdapter } from '@/lib/database/adapter'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, companyName } = await request.json()

    if (!name || !email || !password || !companyName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    const db = getDatabaseAdapter()

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Create company
    const company = await db.createCompany({
      company_name: companyName,
      email: email,
      phone: '',
      access_code: Math.random().toString(36).substr(2, 9).toUpperCase(),
      is_trial: true,
      quote_limit: 5, // Free trial gets 5 quotes per month
    })

    // Create user (simplified schema)
    const user = await db.createUser({
      email,
      company_name: companyName,
    })

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        companyId: company.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: name,
        role: 'admin',
        company: {
          id: company.id,
          name: company.company_name,
          accessCode: company.access_code,
          plan: 'free',
        },
      },
      message: `Account created successfully! Your access code is: ${company.access_code}. Please save this code to log in.`,
    })
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  }
}