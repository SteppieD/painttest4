import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Count records
    const companyCount = await prisma.company.count()
    const userCount = await prisma.user.count()
    
    // Get first user (without sensitive data)
    const firstUser = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
        company: {
          select: {
            id: true,
            name: true,
            plan: true
          }
        }
      }
    })

    return NextResponse.json({
      status: 'connected',
      database: {
        companies: companyCount,
        users: userCount,
        sampleUser: firstUser
      },
      environment: {
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing'
      }
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing'
      }
    })
  } finally {
    await prisma.$disconnect()
  }
}