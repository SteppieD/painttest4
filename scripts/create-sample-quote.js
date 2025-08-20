#!/usr/bin/env node

/**
 * Script to create a sample quote for testing
 * This will give us data to display in the analytics pages
 */

const { getDb } = require('../lib/database/adapter');

async function createSampleQuote() {
  console.log('📝 Creating sample quote for testing...\n');
  
  try {
    const db = getDb();
    
    // Create a sample quote
    const quote = await db.createQuote({
      company_id: 77, // Premium Test Company
      quote_id: `QT-${Date.now()}`,
      customer_name: 'John Smith',
      customer_email: 'john.smith@example.com',
      customer_phone: '(555) 123-4567',
      customer_address: '123 Main St, Test City, TC 12345',
      project_type: 'Interior Painting',
      status: 'accepted',
      surfaces: ['walls', 'ceilings', 'trim'],
      measurements: {
        wallArea: 1500,
        ceilingArea: 500,
        trimLength: 200
      },
      pricing: {
        labor: 2500,
        materials: 1200,
        subtotal: 3700,
        tax: 296,
        total: 3996
      },
      notes: 'Sample quote for testing premium features',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
    console.log('✅ Sample quote created successfully!');
    console.log('\nQuote Details:');
    console.log('  ID:', quote.quote_id);
    console.log('  Customer:', quote.customer_name);
    console.log('  Total:', `$${quote.pricing.total}`);
    console.log('  Status:', quote.status);
    
    // Create another quote for variety
    const quote2 = await db.createQuote({
      company_id: 77,
      quote_id: `QT-${Date.now() + 1}`,
      customer_name: 'Jane Doe',
      customer_email: 'jane.doe@example.com',
      customer_phone: '(555) 987-6543',
      customer_address: '456 Oak Ave, Test City, TC 12346',
      project_type: 'Exterior Painting',
      status: 'pending',
      surfaces: ['exterior_walls', 'trim', 'deck'],
      measurements: {
        wallArea: 2000,
        trimLength: 300,
        deckArea: 400
      },
      pricing: {
        labor: 3500,
        materials: 1800,
        subtotal: 5300,
        tax: 424,
        total: 5724
      },
      notes: 'Second sample quote for testing',
      created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      updated_at: new Date().toISOString()
    });
    
    console.log('\n✅ Second quote created!');
    console.log('  ID:', quote2.quote_id);
    console.log('  Customer:', quote2.customer_name);
    console.log('  Total:', `$${quote2.pricing.total}`);
    console.log('  Status:', quote2.status);
    
    console.log('\n🎉 Sample data ready! Analytics should now show:');
    console.log('  - 2 total quotes');
    console.log('  - 2 unique customers');
    console.log('  - $9,720 total quoted');
    console.log('  - 50% acceptance rate');
    console.log('\n📊 Refresh your dashboard to see the data!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating sample quote:', error);
    process.exit(1);
  }
}

// Run the script
createSampleQuote();