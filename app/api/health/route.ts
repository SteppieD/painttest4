import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test basic database connectivity
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`
    
    // Test if company_users table exists
    let companyUsersExists = false
    try {
      await prisma.$queryRaw`SELECT COUNT(*) FROM company_users LIMIT 1`
      companyUsersExists = true
    } catch (e) {
      console.error('company_users table check failed:', e)
    }
    
    // Test if companies table exists
    let companiesExists = false
    try {
      await prisma.$queryRaw`SELECT COUNT(*) FROM companies LIMIT 1`
      companiesExists = true
    } catch (e) {
      console.error('companies table check failed:', e)
    }
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      tables: {
        company_users: companyUsersExists,
        companies: companiesExists
      },
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Health check error:', error)
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}