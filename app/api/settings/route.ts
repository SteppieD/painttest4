import { NextRequest, NextResponse } from 'next/server'
import { getDatabaseAdapter } from '@/lib/database/adapter'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface AuthPayload {
  userId: number
  companyId: number
  email: string
  role: string
}

async function getAuth(): Promise<AuthPayload | null> {
  const token = cookies().get('auth-token')?.value
  if (!token) return null
  
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload
  } catch {
    return null
  }
}

export async function GET() {
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = getDatabaseAdapter()
    const company = await db.getCompany(auth.companyId)

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const settings = company.settings ? JSON.parse(company.settings) : {}
    
    return NextResponse.json({
      companyName: company.company_name,
      taxRate: settings.defaultTaxRate || 8.25,
      overheadPercent: settings.defaultOverheadPercent || 15,
      profitMargin: settings.defaultProfitMargin || 30,
      chargeRates: settings.chargeRates || {
        // Interior
        walls: 3.50,
        ceilings: 4.00,
        baseboards: 2.50,
        crownMolding: 5.00,
        doors: 125.00,
        windows: 75.00,
        // Exterior
        exteriorWalls: 4.50,
        fascia: 6.00,
        soffits: 5.00,
        exteriorDoors: 150.00,
        exteriorWindows: 100.00,
      }
    })
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const db = getDatabaseAdapter()
    
    const settings = {
      defaultTaxRate: data.taxRate,
      defaultOverheadPercent: data.overheadPercent,
      defaultProfitMargin: data.profitMargin,
      chargeRates: data.chargeRates,
    }

    await db.updateCompany(auth.companyId, {
      company_name: data.companyName,
      settings: JSON.stringify(settings),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}