import { NextResponse } from 'next/server'
import { getDatabaseAdapter } from '@/lib/database/adapter'

export async function GET() {
  try {
    const db = getDatabaseAdapter()
    
    // Test if we can query companies
    const companies = await db.query(
      'SELECT access_code, company_name FROM companies LIMIT 5'
    )
    
    return NextResponse.json({
      success: true,
      database: process.env.DATABASE_URL ? 'Supabase' : 'SQLite',
      useSupabase: process.env.USE_SUPABASE,
      companies: companies,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      database: process.env.DATABASE_URL ? 'Supabase' : 'SQLite',
      useSupabase: process.env.USE_SUPABASE
    }, { status: 500 })
  }
}