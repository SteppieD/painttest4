import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAdapter } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get company from request with fallback to demo
    const company = await getCompanyFromRequest(request);
    console.log('[QUOTE-USAGE] Company:', company);
    
    if (!company) {
      console.log('[QUOTE-USAGE] No company in request');
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
    const fallbackQuotesUsed = 0; // We'll count from quotes table later
    const quotesLimit = companyData.monthly_quote_limit || 5;
    const hasUnlimitedQuotes = !quotesLimit || quotesLimit === -1;
    const fallbackPercentageUsed = hasUnlimitedQuotes ? 0 : (fallbackQuotesUsed / quotesLimit) * 100;
    const fallbackIsNearLimit = !hasUnlimitedQuotes && fallbackPercentageUsed >= 80;
    const fallbackIsAtLimit = !hasUnlimitedQuotes && fallbackQuotesUsed >= quotesLimit;
    
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
        plan: companyData.subscription_tier || 'free'
      });
    } catch (error) {
      console.log('[QUOTE-USAGE] Could not count quotes:', error);
      // Return default response if quote counting fails
      return NextResponse.json({
        quotesUsed: fallbackQuotesUsed,
        quotesLimit,
        hasUnlimitedQuotes,
        percentageUsed: fallbackPercentageUsed,
        isNearLimit: fallbackIsNearLimit,
        isAtLimit: fallbackIsAtLimit,
        plan: companyData.subscription_tier || 'free'
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