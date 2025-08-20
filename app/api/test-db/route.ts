import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database/adapter'

// Force dynamic rendering since we're accessing the database
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDatabase()
    
    // Use Supabase-compatible method to get companies
    // Since we can't use raw SQL, we'll use the adapter's methods
    let companies: Array<{ access_code: string; company_name: string }> = [];
    
    try {
      // Try to get all companies (limited for testing)
      const allCompanies = await db.getAllCompanies();
      // Take only first 5 for testing
      companies = allCompanies.slice(0, 5).map(company => ({
        access_code: company.access_code,
        company_name: company.company_name || company.name || 'Unknown Company'
      }));
    } catch (err) {
      console.log('Error fetching companies:', err);
      // Fallback: return empty array if method doesn't exist
      // companies already initialized as empty array
    }
    
    return NextResponse.json({
      success: true,
      database: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Supabase' : 'Memory',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Not configured',
      companiesFound: companies.length,
      companies: companies,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      database: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Supabase' : 'Memory',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Not configured'
    }, { status: 500 })
  }
}