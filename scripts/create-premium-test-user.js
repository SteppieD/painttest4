#!/usr/bin/env node

/**
 * Script to create a premium test user for testing premium features
 * Run with: node scripts/create-premium-test-user.js
 */

const bcrypt = require('bcryptjs');
const path = require('path');

// Import the database adapter
const { getAdapter } = require('../lib/database/adapter');

async function createPremiumTestUser() {
  console.log('🚀 Creating Premium Test User...\n');
  
  try {
    const db = await getAdapter();
    
    // Test user details
    const testEmail = 'premium@test.com';
    const testPassword = 'premium123';
    const companyName = 'Premium Test Company';
    
    // Hash the password
    const passwordHash = await bcrypt.hash(testPassword, 10);
    
    // Check if company already exists
    let company = await db.getCompanyByEmail(testEmail);
    
    if (company) {
      console.log('⚠️  Company already exists. Updating to premium...');
      
      // Update existing company to premium
      await db.updateCompany(company.id, {
        plan: 'pro',
        subscription_tier: 'pro',
        monthly_quote_limit: 999999, // Unlimited
        quotesLimit: 999999,
        stripe_customer_id: 'test_premium_customer',
        stripe_subscription_id: 'test_premium_subscription',
        subscription_status: 'active'
      });
      
      console.log('✅ Updated existing company to premium');
    } else {
      // Create new premium company
      company = await db.createCompany({
        name: companyName,
        email: testEmail,
        plan: 'pro',
        subscription_tier: 'pro',
        monthly_quote_limit: 999999, // Unlimited
        quotesLimit: 999999,
        quotesUsed: 0,
        stripe_customer_id: 'test_premium_customer',
        stripe_subscription_id: 'test_premium_subscription',
        subscription_status: 'active',
        settings: {
          currency: 'USD',
          taxRate: 0,
          businessPhone: '(555) 999-8888',
          businessAddress: '123 Premium St, Test City, TC 12345',
          logo: null,
          emailSignature: 'Premium Test Company - Professional Painting Services',
          defaultPaymentTerms: 'Net 30',
          includeTermsAndConditions: true,
          termsAndConditions: 'Standard terms and conditions apply.',
          premiumFeatures: {
            advancedAnalytics: true,
            teamAccess: true,
            customBranding: true,
            prioritySupport: true,
            apiAccess: false
          }
        }
      });
      
      console.log('✅ Created new premium company');
    }
    
    // Check if user exists
    let user = await db.getUserByEmail(testEmail);
    
    if (user) {
      console.log('⚠️  User already exists. Updating...');
      
      // Update password
      await db.query(
        'UPDATE users SET password_hash = $1 WHERE email = $2',
        [passwordHash, testEmail]
      ).catch(() => {
        console.log('   (Password update skipped - may be using memory adapter)');
      });
    } else {
      // Create user
      user = await db.createUser({
        email: testEmail,
        passwordHash: passwordHash,
        name: 'Premium Test User',
        companyId: company.id,
        role: 'owner'
      });
      
      console.log('✅ Created new premium user');
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Premium Test User Ready!\n');
    console.log('📧 Email:', testEmail);
    console.log('🔑 Password:', testPassword);
    console.log('🏢 Company:', companyName);
    console.log('💎 Plan: Premium (Pro)');
    console.log('📊 Features:');
    console.log('   ✅ Unlimited quotes');
    console.log('   ✅ Advanced analytics');
    console.log('   ✅ Team access (up to 3 members)');
    console.log('   ✅ Custom branding');
    console.log('   ✅ Priority support');
    console.log('='.repeat(50));
    console.log('\n🌐 Test URLs:');
    console.log('   Local: http://localhost:3005/auth/signin');
    console.log('   Production: https://paintquotepro.vercel.app/auth/signin');
    console.log('\n💡 Premium Features to Test:');
    console.log('   1. Dashboard - All analytics should be visible (no blur)');
    console.log('   2. Quotes - No limit on quote creation');
    console.log('   3. Settings - Access to all premium settings');
    console.log('   4. Analytics pages - Full access to all metrics');
    console.log('   5. Team management - Ability to invite team members');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating premium test user:', error);
    process.exit(1);
  }
}

// Run the script
createPremiumTestUser();