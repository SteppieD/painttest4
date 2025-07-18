import { NextRequest, NextResponse } from 'next/server'
import { getDatabaseAdapter } from '@/lib/database/adapter'

export async function GET(request: NextRequest) {
  try {
    const db = getDatabaseAdapter()
    
    // Count records
    const companies = await db.getAllCompanies()
    const users = await db.getAllUsers()
    
    // Get first user (without sensitive data)
    const firstUser = users.length > 0 ? {
      id: users[0].id,
      email: users[0].email,
      name: users[0].name,
      company: companies.find(c => c.id === users[0].company_id)
    } : null

    return NextResponse.json({
      status: 'connected',
      database: {
        companies: companies.length,
        users: users.length,
        sampleUser: firstUser
      },
      environment: {
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV,
        databasePath: process.env.DATABASE_PATH || 'default'
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
        databasePath: process.env.DATABASE_PATH || 'default'
      }
    })
  }
}