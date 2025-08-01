import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
    const { data: existingUser } = await supabase
      .from('auth.users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Generate a unique access code
    const accessCode = Math.random().toString(36).substr(2, 9).toUpperCase()

    // Create company first
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert({
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
      .select()
      .single()

    if (companyError || !company) {
      console.error('Failed to create company:', companyError)
      return NextResponse.json(
        { error: 'Failed to create company' },
        { status: 500 }
      )
    }

    // Parse name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Create user in auth.users with company metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_id: company.id,
          role: 'admin', // First user is always admin
          first_name: firstName,
          last_name: lastName,
        }
      }
    })

    if (authError || !authData.user) {
      // Rollback company creation
      await supabase
        .from('companies')
        .delete()
        .eq('id', company.id)

      console.error('Failed to create user:', authError)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Create JWT token for immediate login
    const token = jwt.sign(
      {
        userId: authData.user.id,
        companyId: company.id,
        email: authData.user.email,
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
        id: authData.user.id,
        email: authData.user.email!,
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