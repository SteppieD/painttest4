import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

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

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
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
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Check if company email already exists
    const existingCompany = await prisma.company.findUnique({
      where: { email },
    })

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create company and user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create company
      const company = await tx.company.create({
        data: {
          name: companyName,
          email: email,
          plan: 'free',
          quotesLimit: 5,
          settings: {
            defaultTaxRate: 8.25,
            defaultOverheadPercent: 15,
            defaultProfitMargin: 30,
            laborRates: {
              residential: 45,
              commercial: 55,
            },
          },
        },
      })

      // Create user
      const user = await tx.user.create({
        data: {
          companyId: company.id,
          email,
          name,
          role: 'admin',
          passwordHash,
        },
        include: {
          company: true,
        },
      })

      return { user, company }
    })

    // Create JWT token
    const token = jwt.sign(
      {
        userId: result.user.id,
        companyId: result.user.companyId,
        email: result.user.email,
        role: result.user.role,
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
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        company: {
          id: result.company.id,
          name: result.company.name,
          plan: result.company.plan,
        },
      },
    })
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}