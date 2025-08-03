import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database/adapter'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Generate a unique access code
    const accessCode = Math.random().toString(36).substr(2, 9).toUpperCase()

    // Create company first
    const company = await db.createCompany({
      company_name: companyName,
      email: email,
      phone: '',
      access_code: accessCode,
      subscription_tier: 'free',
      monthly_quote_limit: 5,
      monthly_quote_count: 0,
      tax_rate: 0,
      default_labor_percentage: 30,
      onboarding_completed: false,
      onboarding_step: 0,
    })

    if (!company) {
      console.error('Failed to create company')
      return NextResponse.json(
        { error: 'Failed to create company' },
        { status: 500 }
      )
    }

    // Parse name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await db.createUser({
      email,
      password_hash: hashedPassword,
      role: 'admin', // First user is always admin
      company_id: company.id,
    })

    if (!user) {
      // Note: In a real implementation, we'd need to rollback the company creation
      console.error('Failed to create user')
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Create JWT token for immediate login
    const token = jwt.sign(
      {
        userId: user.id,
        companyId: company.id,
        email: user.email,
        role: 'admin',
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
        email: user.email!,
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
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}