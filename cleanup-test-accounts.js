#!/usr/bin/env node

const { getDatabaseAdapter } = require('./lib/database/adapter');

async function cleanup() {
  const db = getDatabaseAdapter();
  
  // List of test emails to remove
  const testEmails = [
    'gaspari.giuseppe@gmail.com',
    'gaspar050@example.com',
    'gaspari050@example.com'
  ];
  
  console.log('🧹 Cleaning up test accounts...\n');
  
  try {
    const companies = await db.getAllCompanies();
    
    for (const email of testEmails) {
      const company = companies.find(c => 
        c.email?.toLowerCase() === email.toLowerCase() ||
        c.company_name?.toLowerCase().includes('gaspar') ||
        c.company_name?.toLowerCase().includes('gaspari')
      );
      
      if (company) {
        console.log(`Found company: ${company.company_name} (ID: ${company.id}, Email: ${company.email})`);
        
        try {
          await db.deleteCompany(company.id);
          console.log(`✅ Removed company ID ${company.id}\n`);
        } catch (err) {
          console.log(`❌ Failed to remove company ID ${company.id}: ${err.message}\n`);
        }
      }
    }
    
    // Also clean up pending signups
    console.log('🧹 Cleaning up pending signups...');
    try {
      for (const email of testEmails) {
        await db.query('DELETE FROM pending_signups WHERE email = ?', [email.toLowerCase()]);
      }
      console.log('✅ Cleaned up pending signups\n');
    } catch (error) {
      console.log('Note: pending_signups table might not exist\n');
    }
    
    console.log('✨ Cleanup complete!');
    console.log('You can now test the signup process again with a fresh start.');
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

cleanup();