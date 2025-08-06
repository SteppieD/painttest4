#!/usr/bin/env node

import { getDatabaseAdapter } from '../lib/database/adapter';

async function removeEmail(email: string) {
  const db = getDatabaseAdapter();
  
  try {
    // Get all companies to find the one with this email
    const companies = await db.getAllCompanies();
    const company = companies.find(c => c.email?.toLowerCase() === email.toLowerCase());
    
    if (company) {
      console.log(`Found company: ${company.company_name} (ID: ${company.id})`);
      
      // Remove the company
      await db.deleteCompany(company.id);
      console.log(`✅ Successfully removed company with email: ${email}`);
    } else {
      console.log(`❌ No company found with email: ${email}`);
    }
    
    // Also clean up any pending signups
    try {
      await db.query('DELETE FROM pending_signups WHERE email = ?', [email.toLowerCase()]);
      console.log('✅ Cleaned up any pending signups');
    } catch (error) {
      // Table might not exist, that's ok
    }
    
  } catch (error) {
    console.error('Error removing email:', error);
  }
}

// Get email from command line
const email = process.argv[2];
if (!email) {
  console.log('Usage: npx tsx scripts/remove-email.ts <email>');
  process.exit(1);
}

removeEmail(email);