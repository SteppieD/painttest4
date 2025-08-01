import { NextResponse } from 'next/server'
import { getDatabaseAdapter } from '@/lib/database/adapter'

export async function GET() {
  try {
    const db = getDatabaseAdapter()
    
    // Test basic database connectivity
    const companies = await db.getAllCompanies()
    const users = await db.getAllUsers()
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      tables: {
        companies: companies.length >= 0,
        users: users.length >= 0
      },
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}