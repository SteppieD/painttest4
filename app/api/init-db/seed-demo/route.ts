import { NextResponse } from 'next/server';
import { db } from '@/lib/database/adapter';

export async function GET() {
  try {
    console.log('Creating demo companies...');
    
    const demoCompanies = [
      {
        company_name: 'Demo Painting Company',
        access_code: 'DEMO2024',
        email: 'demo@paintquote.com',
        phone: '555-0100',
        is_trial: 0,
        quote_limit: 10
      },
      {
        company_name: 'Smith Painting LLC',
        access_code: 'PAINTER001',
        email: 'smith@paintquote.com',
        phone: '555-0101',
        is_trial: 0,
        quote_limit: 5
      },
      {
        company_name: 'Elite Contractors',
        access_code: 'CONTRACTOR123',
        email: 'elite@paintquote.com',
        phone: '555-0102',
        is_trial: 0,
        quote_limit: 20
      }
    ];

    const results = [];
    
    for (const company of demoCompanies) {
      try {
        // Check if company already exists
        const existing = await db.getCompanyByAccessCode(company.access_code);
        if (existing) {
          results.push({
            accessCode: company.access_code,
            status: 'exists',
            message: `Company ${company.access_code} already exists`
          });
          continue;
        }
        
        // Create the company
        const newCompany = await db.createCompany(company);
        results.push({
          accessCode: company.access_code,
          status: 'created',
          message: `Created demo company: ${company.company_name}`,
          data: newCompany
        });
      } catch (error) {
        results.push({
          accessCode: company.access_code,
          status: 'error',
          message: `Error creating ${company.access_code}: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Demo companies seeding completed',
      results
    });
  } catch (error) {
    console.error('Error seeding demo companies:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to seed demo companies',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}