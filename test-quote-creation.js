// Test script to verify quote creation works with company ID 23

async function testQuoteCreation() {
  const baseUrl = 'http://localhost:3000'; // Change to your deployment URL
  
  // Test data matching your scenario
  const companyData = {
    id: 23,
    accessCode: 'GASPAR050',
    name: 'Gmail Painting'
  };
  
  const quoteData = {
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    customerPhone: '555-123-4567',
    address: '123 Test Street',
    projectType: 'interior',
    rooms: ['Living Room', 'Kitchen'],
    roomCount: 2,
    paintQuality: 'better',
    prepWork: 'minimal',
    timeEstimate: '2-3 days',
    specialRequests: null,
    totalCost: 1500,
    finalPrice: 1950,
    markupPercentage: 30,
    sqft: 800,
    breakdown: {
      materials: 400,
      labor: 800,
      markup: 450
    }
  };
  
  try {
    console.log('Testing quote creation with company ID 23...');
    
    const response = await fetch(`${baseUrl}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-company-data': JSON.stringify(companyData)
      },
      body: JSON.stringify({
        companyId: companyData.id,
        quoteData: quoteData,
        conversationHistory: [
          { role: 'user', content: 'Test quote creation' },
          { role: 'assistant', content: 'Creating test quote' }
        ]
      })
    });
    
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', responseText);
      return;
    }
    
    if (response.ok) {
      console.log('✅ Quote created successfully!');
      console.log('Quote ID:', result.quoteId);
      console.log('Quote details:', result.quote);
    } else {
      console.error('❌ Quote creation failed:', result);
      if (result.details?.includes('Company not found')) {
        console.log('\n🔍 Debugging tips:');
        console.log('1. Check if Supabase is properly configured');
        console.log('2. Run the SQL migration scripts in Supabase');
        console.log('3. Verify environment variables are set');
        console.log('4. Check if the MemoryAdapter fix is working');
      }
    }
    
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Run the test
if (typeof window === 'undefined') {
  // Node.js environment
  testQuoteCreation();
} else {
  // Browser environment
  console.log('Run testQuoteCreation() in the console to test');
}