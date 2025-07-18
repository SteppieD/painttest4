import { NextRequest, NextResponse } from 'next/server'
import { getDatabaseAdapter } from '@/lib/database/adapter'
import { getAuthContext } from '@/lib/auth/middleware'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthContext(request)
    
    if (!auth || auth.type !== 'company') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const companyId = auth.company!.id
    const db = getDatabaseAdapter()
    const company = await db.getCompany(companyId)

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Check if we need to reset the quotes
    if (company.plan === 'free' && company.quotesResetAt && new Date() > new Date(company.quotesResetAt)) {
      // Reset quotes for the new month
      const nextMonth = new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      
      await db.updateCompany(companyId, {
        quotesUsed: 0,
        quotesResetAt: nextMonth.toISOString(),
      })
      company.quotesUsed = 0
    }

    const quotesUsed = company.quotesUsed || 0
    const quotesLimit = company.quotesLimit || 5
    const hasUnlimitedQuotes = !company.quotesLimit || company.quotesLimit === -1
    const percentageUsed = hasUnlimitedQuotes ? 0 : (quotesUsed / quotesLimit) * 100
    const isNearLimit = !hasUnlimitedQuotes && percentageUsed >= 80
    const isAtLimit = !hasUnlimitedQuotes && quotesUsed >= quotesLimit

    return NextResponse.json({
      quotesUsed,
      quotesLimit,
      hasUnlimitedQuotes,
      percentageUsed,
      isNearLimit,
      isAtLimit,
      plan: company.plan || 'free'
    })
  } catch (error) {
    console.error('Quote usage error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quote usage' },
      { status: 500 }
    )
  }
}