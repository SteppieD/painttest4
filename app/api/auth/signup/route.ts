import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, companyName } = await request.json()

    // Validate required fields
    if (!email || !password || !name || !companyName) {
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

    // Ensure fresh connection
    await prisma.$connect()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Create company first (free trial)
    const company = await prisma.company.create({
      data: {
        name: companyName,
        email: email,
        plan: 'free',
        quotesLimit: 5, // 5 free quotes per month
        quotesResetAt: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Reset in 1 month
        settings: {
          companyLogo: null,
          defaultTaxRate: 8.25,
          defaultOverheadPercent: 15,
          defaultProfitMargin: 30,
          laborRates: {
            residential: 45,
            commercial: 55,
          },
          defaultTerms: 'Payment due within 30 days. 50% deposit required to start work.',
          chargeRates: {
            walls: 3.50,
            ceilings: 4.00,
            baseboards: 2.50,
            crownMolding: 5.00,
            doorsWithJams: 125.00,
            windows: 75.00,
            exteriorWalls: 4.50,
            fasciaBoards: 6.00,
            soffits: 5.00,
            exteriorDoors: 150.00,
            exteriorWindows: 100.00
          }
        },
      },
    })

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        companyId: company.id,
        email,
        name,
        role: 'admin', // First user is admin
        passwordHash,
      },
    })

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        companyId: user.companyId,
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
        company: {
          id: company.id,
          name: company.name,
          plan: company.plan,
        },
      },
      message: 'Account created successfully! Welcome to your free trial.',
    })
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}