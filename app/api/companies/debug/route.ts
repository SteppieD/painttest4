import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';

export async function GET(request: NextRequest) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
      return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
    }
    
    const companies = await db.getAllCompanies();
    
    return NextResponse.json({ 
      success: true,
      totalCompanies: companies.length,
      companies: companies.map(c => ({
        id: c.id,
        accessCode: c.access_code,
        name: c.name || c.company_name,
        email: c.email,
        onboardingCompleted: c.onboarding_completed,
        createdAt: c.created_at
      }))
    });
    
  } catch (error) {
    console.error('[DEBUG] Error fetching companies:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch companies',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}