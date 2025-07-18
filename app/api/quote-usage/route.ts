import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAdapter } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get company from request with fallback to demo
    const company = getCompanyFromRequest(request);
    console.log('[QUOTE-USAGE] Company:', company);
    
    const db = getDatabaseAdapter();
    const companyData = await db.getCompany(company.id);
    
    if (!companyData) {
      console.log('[QUOTE-USAGE] Company not found, using defaults');
      // Return default values if company not found
      return NextResponse.json({
        quotesUsed: 0,
        quotesLimit: 5,
        hasUnlimitedQuotes: false,
        percentageUsed: 0,
        isNearLimit: false,
        isAtLimit: false,
        plan: 'free'
      });
    }
    
    // Handle missing columns gracefully
    const quotesUsed = 0; // We'll count from quotes table later
    const quotesLimit = companyData.quote_limit || 5;
    const hasUnlimitedQuotes = !quotesLimit || quotesLimit === -1;
    const percentageUsed = hasUnlimitedQuotes ? 0 : (quotesUsed / quotesLimit) * 100;
    const isNearLimit = !hasUnlimitedQuotes && percentageUsed >= 80;
    const isAtLimit = !hasUnlimitedQuotes && quotesUsed >= quotesLimit;
    
    // Count actual quotes if needed
    try {
      const actualQuotesCount = await db.getQuotesCount(company.id);
      return NextResponse.json({
        quotesUsed: actualQuotesCount || 0,
        quotesLimit,
        hasUnlimitedQuotes,
        percentageUsed: hasUnlimitedQuotes ? 0 : ((actualQuotesCount || 0) / quotesLimit) * 100,
        isNearLimit: !hasUnlimitedQuotes && ((actualQuotesCount || 0) / quotesLimit) >= 0.8,
        isAtLimit: !hasUnlimitedQuotes && (actualQuotesCount || 0) >= quotesLimit,
        plan: companyData.is_trial ? 'trial' : 'free'
      });
    } catch (error) {
      console.log('[QUOTE-USAGE] Could not count quotes:', error);
      // Return default response if quote counting fails
      return NextResponse.json({
        quotesUsed,
        quotesLimit,
        hasUnlimitedQuotes,
        percentageUsed,
        isNearLimit,
        isAtLimit,
        plan: companyData.is_trial ? 'trial' : 'free'
      });
    }
    
  } catch (error) {
    console.error('[QUOTE-USAGE] Error:', error);
    console.error('[QUOTE-USAGE] Stack:', error instanceof Error ? error.stack : 'No stack');
    
    // Return safe default values on any error
    return NextResponse.json({
      quotesUsed: 0,
      quotesLimit: 5,
      hasUnlimitedQuotes: false,
      percentageUsed: 0,
      isNearLimit: false,
      isAtLimit: false,
      plan: 'free'
    });
  }
}