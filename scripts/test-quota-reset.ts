import { SubscriptionService } from '../lib/services/subscription';
import { db } from '../lib/database/adapter';

async function testQuotaReset() {
  console.log('Testing monthly quota reset logic...\n');

  // Test company ID (you'll need to replace with a real ID)
  const testCompanyId = 1;

  // Get current company data
  const company = await db.getCompany(testCompanyId);
  console.log('Current company data:', {
    subscription_tier: company?.subscription_tier,
    monthly_quote_count: company?.monthly_quote_count,
    monthly_quote_limit: company?.monthly_quote_limit,
    last_quote_reset: company?.last_quote_reset
  });

  // Check current quota
  console.log('\n1. Checking current quota...');
  const quotaBefore = await SubscriptionService.checkQuoteLimit(testCompanyId);
  console.log('Quota before:', quotaBefore);

  // Simulate last reset being last month
  console.log('\n2. Simulating last month reset...');
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  await db.updateCompany(testCompanyId, {
    monthly_quote_count: 5,
    last_quote_reset: lastMonth.toISOString()
  });

  // Check quota again - should trigger reset
  console.log('\n3. Checking quota after simulating old reset date...');
  const quotaAfter = await SubscriptionService.checkQuoteLimit(testCompanyId);
  console.log('Quota after:', quotaAfter);

  // Verify reset happened
  const companyAfter = await db.getCompany(testCompanyId);
  console.log('\n4. Company data after reset:', {
    monthly_quote_count: companyAfter?.monthly_quote_count,
    last_quote_reset: companyAfter?.last_quote_reset
  });

  // Test increment
  console.log('\n5. Testing quote increment...');
  await SubscriptionService.incrementQuoteCount(testCompanyId);
  
  const companyAfterIncrement = await db.getCompany(testCompanyId);
  console.log('Quote count after increment:', companyAfterIncrement?.monthly_quote_count);

  // Test different subscription tiers
  console.log('\n6. Testing Pro tier (unlimited)...');
  await db.updateCompany(testCompanyId, {
    subscription_tier: 'pro'
  });
  
  const proQuota = await SubscriptionService.checkQuoteLimit(testCompanyId);
  console.log('Pro tier quota:', proQuota);

  // Reset to free tier
  await db.updateCompany(testCompanyId, {
    subscription_tier: 'free'
  });

  console.log('\nTest completed!');
}

// Run the test
testQuotaReset().catch(console.error);