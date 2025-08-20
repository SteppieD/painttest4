import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database/adapter';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const db = getDb();
    
    // Test user details
    const testEmail = 'premium@test.com';
    const testPassword = 'premium123';
    const companyName = 'Premium Test Company';
    
    // Hash the password
    const passwordHash = await bcrypt.hash(testPassword, 10);
    
    // Check if company already exists by access code
    const accessCode = 'PREMIUM2024';
    let company = await db.getCompanyByAccessCode(accessCode);
    
    if (company) {
      console.log('⚠️  Company already exists. Updating to premium...');
      
      // Update existing company to premium
      await db.updateCompany(company.id, {
        subscription_tier: 'professional',
        monthly_quote_limit: -1, // -1 means unlimited in this system
        email: testEmail
      } as any);
      
      console.log('✅ Updated existing company to premium');
    } else {
      // Create new premium company with proper access code
      company = await db.createCompany({
        company_name: companyName,
        access_code: accessCode,
        email: testEmail,
        phone: '(555) 999-8888',
        subscription_tier: 'professional',
        monthly_quote_limit: -1, // -1 means unlimited in this system
        monthly_quote_count: 0,
        tax_rate: 0,
        onboarding_completed: true,
        onboarding_step: 4
      } as any);
      
      console.log('✅ Created new premium company');
    }
    
    // Note: User creation is handled separately by the auth system
    console.log('ℹ️  Use the access code to log in to the premium account');
    
    const result = {
      success: true,
      message: 'Premium test user ready!',
      credentials: {
        email: testEmail,
        password: testPassword,
        accessCode: company.access_code || 'PREMIUM2024'
      },
      company: {
        name: companyName,
        plan: 'Professional',
        id: company.id,
        subscription_tier: 'professional',
        monthly_quote_limit: 'Unlimited'
      },
      features: [
        'Unlimited quotes',
        'Advanced analytics',
        'Team access (up to 3 members)',
        'Custom branding',
        'Priority support'
      ],
      testUrls: {
        local: 'http://localhost:3005/auth/signin',
        production: 'https://paintquotepro.vercel.app/auth/signin'
      },
      testInstructions: [
        'Dashboard - All analytics should be visible (no blur)',
        'Quotes - No limit on quote creation',
        'Settings - Access to all premium settings',
        'Analytics pages - Full access to all metrics',
        'Team management - Ability to invite team members'
      ]
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Error creating premium test user:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}