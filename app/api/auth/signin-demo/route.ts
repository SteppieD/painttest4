import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Demo credentials
const DEMO_USERS = [
  {
    id: 1,
    email: 'admin@acmepainting.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'ADMIN',
    company: {
      id: 1,
      name: 'Acme Painting Co.',
      plan: 'professional'
    }
  },
  {
    id: 2,
    email: 'test@test.com',
    password: 'test123',
    name: 'Test User',
    role: 'USER',
    company: {
      id: 1,
      name: 'Test Painting Co.',
      plan: 'basic'
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find demo user
    const user = DEMO_USERS.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        companyId: user.company.id,
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
        name: user.name,
        role: user.role,
        company: user.company,
      },
    })
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}