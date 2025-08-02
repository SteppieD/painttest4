import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAdapter } from '@/lib/database/adapter';

export async function GET(_request: NextRequest) {
  const results = {
    success: true,
    tests: {
      connection: false,
      getCompany: false,
      getAllCompanies: false,
      tableStructure: false
    },
    data: {} as any,
    errors: {} as any
  };
  
  try {
    const db = getDatabaseAdapter();
    results.tests.connection = true;
    
    // Test 1: Get company by ID
    try {
      const company = await db.getCompany(1);
      results.tests.getCompany = true;
      results.data.company = company;
    } catch (error) {
      results.errors.getCompany = error instanceof Error ? error.message : 'Unknown error';
    }
    
    // Test 2: Get all companies
    try {
      const companies = await db.getAllCompanies();
      results.tests.getAllCompanies = true;
      results.data.companiesCount = companies.length;
      results.data.companies = companies.slice(0, 3); // First 3 only
    } catch (error) {
      results.errors.getAllCompanies = error instanceof Error ? error.message : 'Unknown error';
    }
    
    // Test 3: Check table structure
    try {
      const tableInfo = await db.query('PRAGMA table_info(companies)') as Array<Record<string, unknown>>;
      results.tests.tableStructure = true;
      results.data.companyColumns = tableInfo.map((col: unknown) => col.name);
    } catch (error) {
      results.errors.tableStructure = error instanceof Error ? error.message : 'Unknown error';
    }
    
    return NextResponse.json(results);
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      results
    }, { status: 500 });
  }
}