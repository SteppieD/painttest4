import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
// Simple calculator functions
interface ChargeRates {
  walls: number
  ceilings: number
  baseboards: number
  crownMolding: number
  doorsWithJams: number
  windows: number
  exteriorWalls: number
  fasciaBoards: number
  soffits: number
  exteriorDoors: number
  exteriorWindows: number
}

interface QuoteInputV2 {
  surfaces: any[]
  chargeRates: ChargeRates
}

class QuoteCalculatorV2 {
  static calculate(input: QuoteInputV2) {
    const total = 0
    // Simple calculation - can be enhanced later
    return { 
      total,
      labor: total * 0.3,
      materials: total * 0.7,
      surfaces: input.surfaces
    }
  }
  
  static formatOutput(calculation: any) {
    return {
      formattedTotal: `$${calculation.total.toFixed(2)}`,
      formattedLabor: `$${calculation.labor.toFixed(2)}`,
      formattedMaterials: `$${calculation.materials.toFixed(2)}`
    }
  }
}

const prisma = new PrismaClient()
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

export async function POST(request: NextRequest) {
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Get company settings
    const company = await prisma.company.findUnique({
      where: { id: auth.companyId },
    })
    
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const companySettings = (company.settings as Record<string, unknown>) || {}
    
    // Prepare input for calculator V2
    const calculatorInput: QuoteInputV2 = {
      surfaces: data.surfaces,
      chargeRates: (companySettings.chargeRates as ChargeRates) || {
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
        exteriorWindows: 100.00,
      }
    }

    // Calculate quote
    const calculation = QuoteCalculatorV2.calculate(calculatorInput)
    const formatted = QuoteCalculatorV2.formatOutput(calculation)

    // Create or update customer
    let customer = data.customer.id ? 
      await prisma.customer.findUnique({
        where: { id: data.customer.id }
      }) :
      await prisma.customer.findUnique({
        where: {
          companyId_email: {
            companyId: auth.companyId,
            email: data.customer.email
          }
        }
      })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          companyId: auth.companyId,
          name: data.customer.name,
          email: data.customer.email,
          phone: data.customer.phone,
          address: data.customer.address,
        }
      })
    }

    // Generate quote number
    const quoteCount = await prisma.quote.count({
      where: { companyId: auth.companyId }
    })
    const quoteNumber = `Q-${new Date().getFullYear()}-${String(quoteCount + 1).padStart(5, '0')}`

    // Create quote
    const quote = await prisma.quote.create({
      data: {
        companyId: auth.companyId,
        customerId: customer.id,
        quoteNumber,
        projectType: data.projectType,
        status: 'draft',
        surfaces: data.surfaces,
        paintProducts: data.paintProducts || {},
        settings: JSON.parse(JSON.stringify(calculatorInput)),
        materials: {
          surfaces: data.surfaces,
          totalMaterials: formatted.formattedMaterials,
        },
        labor: {
          totalLabor: formatted.formattedLabor,
        },
        subtotal: parseFloat(formatted.formattedTotal.replace('$', '')),
        overhead: 0,
        profit: 0,
        tax: 0,
        totalAmount: parseFloat(formatted.formattedTotal.replace('$', '')),
        description: data.description,
        notes: data.notes,
        terms: data.terms || companySettings.defaultTerms || 'Payment due within 30 days.',
        createdById: auth.userId,
      },
      include: {
        customer: true,
      }
    })

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Quote creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}