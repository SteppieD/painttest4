import { NextRequest, NextResponse } from 'next/server';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export async function GET(request: NextRequest) {
  try {
    // Test auth extraction
    const company = getCompanyFromRequest(request);
    
    // Get headers for debugging
    const headers = Object.fromEntries(request.headers.entries());
    const relevantHeaders = {
      'x-company-data': headers['x-company-data'],
      'cookie': headers['cookie']?.substring(0, 50) + '...' // Truncate for security
    };
    
    return NextResponse.json({
      success: true,
      message: 'Auth test endpoint',
      company,
      headers: relevantHeaders,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}