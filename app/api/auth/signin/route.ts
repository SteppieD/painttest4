import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDatabaseAdapter } from '@/lib/database/adapter'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface CompanyRecord {
  id: number;
  company_name: string;
  email: string;
  phone: string;
  plan?: string;
  quotes_used?: number;
  quote_limit?: number;
  quotes_reset_at?: string;
  onboarding_completed?: boolean;
}

// Map old schema to new schema format
const mapCompanyData = (company: CompanyRecord) => ({
  id: company.id,
  name: company.company_name,
  email: company.email,
  phone: company.phone,
  plan: company.plan || 'free',
  quotesUsed: company.quotes_used || 0,
  quotesLimit: company.quote_limit || 5,
  quotesResetAt: company.quotes_reset_at,
  quotesGenerated: company.quotes_generated || 0,
  settings: {
    chargeRates: {
      walls: parseFloat(company.default_walls_rate || '3.50'),
      ceilings: parseFloat(company.default_ceilings_rate || '4.00'),
      baseboards: 2.50,
      crownMolding: 5.00,
      doorsWithJams: 125.00,
      windows: 75.00,
      exteriorWalls: 4.50,
      fasciaBoards: 6.00,
      soffits: 5.00,
      exteriorDoors: 150.00,
      exteriorWindows: 100.00,
    },
    overheadPercent: 15,
    profitMargin: 30,
    taxRate: parseFloat(company.tax_rate || '8.25'),
    defaultTerms: 'Payment due within 30 days.'
  }
})

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const db = getDatabaseAdapter()
    
    // Query the user by email
    const user = await db.getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    let isValid = false
    try {
      isValid = await bcrypt.compare(password, user.password_hash)
    } catch (bcryptError) {
      console.error('Password verification error:', bcryptError)
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      )
    }
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Get company data
    const company = await db.getCompany(user.company_id)

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        companyId: user.company_id,
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

    // Map the response to match expected format
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        company: mapCompanyData(company),
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