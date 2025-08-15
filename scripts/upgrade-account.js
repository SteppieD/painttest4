const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  'https://opcbwsfdhergcjjobryp.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function upgradeAccount() {
  // Get the email to upgrade
  const emailToUpgrade = process.argv[2] || 'demo2025@example.com';
  
  console.log('🔍 Looking for account with email:', emailToUpgrade);
  
  // Find the specific account
  const { data: company, error } = await supabase
    .from('companies')
    .select('*')
    .eq('email', emailToUpgrade)
    .single();
  
  if (error || !company) {
    console.log('Account not found with that email. Searching for test accounts...');
    
    const { data: companies } = await supabase
      .from('companies')
      .select('id, company_name, email, plan, subscription_tier, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (companies && companies.length > 0) {
      console.log('\n📋 Recent accounts in the system:');
      companies.forEach((c, index) => {
        console.log(`${index + 1}. ${c.company_name} - ${c.email} - Plan: ${c.plan || c.subscription_tier || 'free'}`);
      });
      
      console.log('\n💡 To upgrade a specific account, run:');
      console.log('   node scripts/upgrade-account.js <email>');
    }
    return;
  }
  
  console.log(`\n📧 Found account: ${company.company_name} (${company.email})`);
  console.log(`   Current Plan: ${company.plan || company.subscription_tier || 'free'}`);
  console.log(`   Quotes Used: ${company.quotes_used || 0}/${company.monthly_quote_limit || company.quote_limit || 5}`);
  
  console.log('\n🚀 Upgrading to Professional plan...');
  
  // Upgrade to professional plan using the actual columns
  const { data: updated, error: updateError } = await supabase
    .from('companies')
    .update({
      plan: 'professional',
      subscription_tier: 'professional',
      monthly_quote_limit: 9999, // Effectively unlimited
      quote_limit: 9999,
      is_trial: false,
      // Reset quote usage for fresh start
      quotes_used: 0,
      monthly_quote_count: 0,
      quotes_reset_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      // Mark as fully onboarded
      onboarding_completed: true,
      setup_completed_at: new Date().toISOString()
    })
    .eq('id', company.id)
    .select()
    .single();
  
  if (updateError) {
    console.error('❌ Error upgrading account:', updateError);
    return;
  }
  
  // Also check if there's a user associated with this company
  const { data: users } = await supabase
    .from('users')
    .select('*')
    .eq('company_id', company.id);
  
  if (users && users.length > 0) {
    console.log(`\n👤 Associated users: ${users.length}`);
    users.forEach(user => {
      console.log(`   - ${user.email || user.phone || 'User ' + user.id}`);
    });
  }
  
  console.log('\n✅ Account successfully upgraded to Professional plan!');
  console.log('\n📊 Updated account details:');
  console.log(`   Company: ${updated.company_name}`);
  console.log(`   Email: ${updated.email}`);
  console.log(`   Plan: ${updated.plan} / ${updated.subscription_tier}`);
  console.log(`   Quote Limit: Unlimited (9999/month)`);
  console.log(`   Trial Status: Full Account (not trial)`);
  
  console.log('\n🎉 Professional plan includes:');
  console.log('   ✓ Unlimited Quotes (9999/month)');
  console.log('   ✓ Full Dashboard Access');
  console.log('   ✓ Advanced Analytics');
  console.log('   ✓ Customer Management');
  console.log('   ✓ Quote Templates');
  console.log('   ✓ Export Features');
  console.log('   ✓ API Access');
  console.log('   ✓ Priority Support');
  
  console.log('\n📱 Login credentials:');
  console.log(`   Email: ${updated.email}`);
  console.log(`   Access Code: ${updated.access_code}`);
  
  console.log('\n🔗 You can now log in at: http://localhost:3005/auth/signin');
  console.log('   Use the email above and the access code to sign in and test premium features!');
  
  // If you want to test with your personal email, let's also create/update that account
  if (emailToUpgrade === 'demo2025@example.com') {
    console.log('\n💡 Tip: If you want to use your personal email for testing, you can:');
    console.log('   1. Sign up with your email at http://localhost:3005/auth/signup');
    console.log('   2. Then run: node scripts/upgrade-account.js your-email@example.com');
  }
}

upgradeAccount().catch(console.error);