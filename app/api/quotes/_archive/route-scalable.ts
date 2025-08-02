import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { QuoteNumberGenerator, QuoteRateLimiter } from '@/lib/quote-number-generator'

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
  surfaces: unknown[]
  chargeRates: ChargeRates
}

class QuoteCalculatorV2 {
  static calculate(input: QuoteInputV2) {
    let total = 0
    let laborTotal = 0
    let materialsTotal = 0
    
    // Calculate cost for each surface
    const calculatedSurfaces = input.surfaces.map((surface: unknown) => {
      let surfaceCost = 0
      let surfaceLabor = 0
      let surfaceMaterials = 0
      
      // Determine the charge rate based on surface type
      const rateMap: Record<string, keyof ChargeRates> = {
        'walls': 'walls',
        'ceilings': 'ceilings',
        'baseboards': 'baseboards',
        'crown_molding': 'crownMolding',
        'door': 'doorsWithJams',
        'doors': 'doorsWithJams',
        'window': 'windows',
        'windows': 'windows',
        'exterior_walls': 'exteriorWalls',
        'exterior_wall': 'exteriorWalls',
        'fascia': 'fasciaBoards',
        'soffits': 'soffits',
        'soffit': 'soffits',
        'exterior_doors': 'exteriorDoors',
        'exterior_door': 'exteriorDoors',
        'exterior_windows': 'exteriorWindows',
        'exterior_window': 'exteriorWindows'
      }
      
      const rateKey = rateMap[surface.type] || surface.type
      const rate = (input.chargeRates as unknown)[rateKey] || 0
      
      // Calculate based on measurement type
      if (surface.area && surface.area > 0) {
        // Square foot pricing
        surfaceCost = surface.area * rate * (surface.coats || 2)
      } else if (surface.linearFeet && surface.linearFeet > 0) {
        // Linear foot pricing
        surfaceCost = surface.linearFeet * rate * (surface.coats || 2)
      } else if (surface.count && surface.count > 0) {
        // Per unit pricing
        surfaceCost = surface.count * rate
      }
      
      // Apply condition multiplier
      const conditionMultiplier = {
        'excellent': 0.9,
        'good': 1.0,
        'fair': 1.2,
        'poor': 1.5
      }
      surfaceCost *= conditionMultiplier[surface.condition] || 1.0
      
      // Apply prep work charges
      const prepCharges = {
        'patch_nail_holes': 0.10,
        'patch_cracks': 0.15,
        'patch_water_stains': 0.20,
        'light_sanding': 0.15,
        'heavy_sanding': 0.25,
        'prime_patches': 0.20,
        'prime_all': 0.40,
        'remove_wallpaper': 0.50,
        'repair_drywall': 0.75
      }
      
      let prepMultiplier = 1.0
      if (surface.prepWork && Array.isArray(surface.prepWork)) {
        surface.prepWork.forEach((prep: string) => {
          prepMultiplier += prepCharges[prep as keyof typeof prepCharges] || 0
        })
      }
      surfaceCost *= prepMultiplier
      
      // Split into labor and materials (40% labor, 60% materials typically)
      surfaceLabor = surfaceCost * 0.4
      surfaceMaterials = surfaceCost * 0.6
      
      total += surfaceCost
      laborTotal += surfaceLabor
      materialsTotal += surfaceMaterials
      
      return {
        ...surface,
        calculatedCost: surfaceCost,
        laborCost: surfaceLabor,
        materialsCost: surfaceMaterials
      }
    })
    
    return { 
      total,
      labor: laborTotal,
      materials: materialsTotal,
      surfaces: calculatedSurfaces
    }
  }
  
  static formatOutput(calculation: unknown) {
    return {
      formattedTotal: `$${calculation.total.toFixed(2)}`,
      formattedLabor: `$${calculation.labor.toFixed(2)}`,
      formattedMaterials: `$${calculation.materials.toFixed(2)}`
    }
  }
}

// Create singleton instances for scalability
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

const quoteGenerator = new QuoteNumberGenerator(prisma)
const rateLimiter = new QuoteRateLimiter(20, 15) // 20 quotes per 15 minutes per user

// Clean up rate limiter periodically
setInterval(() => {
  rateLimiter.cleanup()
}, 60 * 60 * 1000) // Every hour

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

  // Apply rate limiting
  const rateLimitKey = `quote:${auth.companyId}:${auth.userId}`
  const rateLimitCheck = await rateLimiter.checkLimit(rateLimitKey)
  
  if (!rateLimitCheck.allowed) {
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded', 
        message: `Too many quote requests. Please try again in ${rateLimitCheck.retryAfter} seconds.`,
        retryAfter: rateLimitCheck.retryAfter
      }, 
      { status: 429 }
    )
  }

  try {
    const data = await request.json()
    
    // Get company settings with optimized query
    const company = await prisma.company.findUnique({
      where: { id: auth.companyId },
      select: {
        id: true,
        name: true,
        plan: true,
        quotesUsed: true,
        quotesLimit: true,
        quotesResetAt: true,
        settings: true
      }
    })
    
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Check quote limits for free plan
    if (company.plan === 'free' && company.quotesLimit > 0) {
      // Check if we need to reset the monthly quota
      if (company.quotesResetAt && new Date() > company.quotesResetAt) {
        await prisma.company.update({
          where: { id: auth.companyId },
          data: {
            quotesUsed: 0,
            quotesResetAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          },
        })
        company.quotesUsed = 0
      }

      // Check if quota exceeded
      if (company.quotesUsed >= company.quotesLimit) {
        return NextResponse.json(
          { 
            error: 'Monthly quote limit reached', 
            message: 'You have reached your monthly quote limit. Please upgrade to Pro for unlimited quotes.',
            quotesUsed: company.quotesUsed,
            quotesLimit: company.quotesLimit
          }, 
          { status: 403 }
        )
      }
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
    
    // Apply overhead, profit, and tax
    const subtotal = calculation.total
    const overheadPercent = data.settings?.overheadPercent || companySettings.overheadPercent || 15
    const profitMargin = data.settings?.profitMargin || companySettings.profitMargin || 30
    const taxRate = data.settings?.taxRate || companySettings.taxRate || 8.25
    
    const overhead = subtotal * (overheadPercent / 100)
    const subtotalWithOverhead = subtotal + overhead
    const profit = subtotalWithOverhead * (profitMargin / 100)
    const subtotalWithProfit = subtotalWithOverhead + profit
    const tax = subtotalWithProfit * (taxRate / 100)
    const totalAmount = subtotalWithProfit + tax

    // Create or update customer - optimized to reduce queries
    const customer = await prisma.customer.upsert({
      where: {
        companyId_email: {
          companyId: auth.companyId,
          email: data.customer.email
        }
      },
      update: {
        name: data.customer.name,
        phone: data.customer.phone,
        address: data.customer.address,
      },
      create: {
        companyId: auth.companyId,
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
        address: data.customer.address,
      }
    })

    // Generate unique quote number using atomic operation
    const quoteNumber = await quoteGenerator.generateQuoteNumber(auth.companyId)

    // Create quote and update quote usage in a transaction for consistency
    const quote = await prisma.$transaction(async (tx) => {
      // Create the quote
      const newQuote = await tx.quote.create({
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
            surfaces: calculation.surfaces,
            totalMaterials: calculation.materials,
          },
          labor: {
            totalLabor: calculation.labor,
          },
          subtotal: subtotal,
          overhead: overhead,
          profit: profit,
          tax: tax,
          totalAmount: totalAmount,
          description: data.description,
          notes: data.notes,
          terms: data.terms || companySettings.defaultTerms || 'Payment due within 30 days.',
          createdById: auth.userId,
        },
        include: {
          customer: true,
        }
      })

      // Increment quote usage for free plan
      if (company.plan === 'free' && company.quotesLimit > 0) {
        await tx.company.update({
          where: { id: auth.companyId },
          data: {
            quotesUsed: {
              increment: 1
            }
          }
        })
      }

      return newQuote
    })

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Quote creation error:', error)
    
    // Return more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('P2002')) {
        return NextResponse.json(
          { error: 'Quote number conflict. Please try again.' }, 
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET endpoint for retrieving quotes with pagination
export async function GET(request: NextRequest) {
  const auth = await getAuth()
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const status = searchParams.get('status')
  const customerId = searchParams.get('customerId')
  
  const skip = (page - 1) * limit

  try {
    const where = {
      companyId: auth.companyId,
      deletedAt: null,
      ...(status && { status }),
      ...(customerId && { customerId: parseInt(customerId) })
    }

    const [quotes, totalCount] = await prisma.$transaction([
      prisma.quote.findMany({
        where,
        include: {
          customer: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.quote.count({ where })
    ])

    return NextResponse.json({
      quotes,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Quote retrieval error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}