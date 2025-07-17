// Test concurrent quote creation for scalability
// Simulates multiple users creating quotes simultaneously

async function createQuote(authToken, userId) {
  const quoteData = {
    customer: {
      name: `Concurrent Customer ${userId}`,
      email: `concurrent${userId}@example.com`,
      phone: `555-${String(userId).padStart(4, '0')}`,
      address: `${userId} Test Street`
    },
    projectType: 'interior',
    surfaces: [
      {
        type: 'walls',
        area: 500 + (userId * 10),
        coats: 2,
        condition: 'good',
        prepWork: []
      }
    ],
    description: `Concurrent test quote ${userId}`,
    notes: `Testing scalability with user ${userId}`
  };

  const startTime = Date.now();
  
  try {
    const response = await fetch('http://localhost:3001/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `auth-token=${authToken}`
      },
      body: JSON.stringify(quoteData)
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (response.ok) {
      const quote = await response.json();
      return {
        success: true,
        quoteNumber: quote.quoteNumber,
        responseTime,
        userId
      };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.error,
        message: error.message,
        responseTime,
        userId
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      responseTime: Date.now() - startTime,
      userId
    };
  }
}

async function runConcurrencyTest() {
  console.log('🚀 PaintQuote Pro Scalability Test\n');
  console.log('=' .repeat(50) + '\n');

  // First, login to get auth token
  console.log('Setting up test user...');
  const loginResponse = await fetch('http://localhost:3001/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@test.com',
      password: 'test123'
    })
  });

  if (!loginResponse.ok) {
    console.error('Failed to login');
    return;
  }

  const authCookie = loginResponse.headers.get('set-cookie');
  const authToken = authCookie?.match(/auth-token=([^;]+)/)?.[1];

  if (!authToken) {
    console.error('No auth token received');
    return;
  }

  console.log('✅ Test user authenticated\n');

  // Test different concurrency levels
  const concurrencyLevels = [1, 5, 10, 20];
  
  for (const level of concurrencyLevels) {
    console.log(`\n📊 Testing with ${level} concurrent requests`);
    console.log('-'.repeat(40));
    
    const promises = [];
    const startTime = Date.now();
    
    // Create concurrent requests
    for (let i = 0; i < level; i++) {
      promises.push(createQuote(authToken, i + 1));
    }
    
    // Wait for all requests to complete
    const results = await Promise.all(promises);
    const totalTime = Date.now() - startTime;
    
    // Analyze results
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
    
    console.log(`Total time: ${totalTime}ms`);
    console.log(`Successful: ${successful.length}/${level}`);
    console.log(`Failed: ${failed.length}/${level}`);
    console.log(`Average response time: ${avgResponseTime.toFixed(0)}ms`);
    
    // Check for duplicate quote numbers
    const quoteNumbers = successful.map(r => r.quoteNumber);
    const uniqueNumbers = new Set(quoteNumbers);
    const hasDuplicates = quoteNumbers.length !== uniqueNumbers.size;
    
    console.log(`Unique quote numbers: ${hasDuplicates ? '❌ DUPLICATES FOUND!' : '✅ All unique'}`);
    
    if (successful.length > 0) {
      console.log(`Sample quote numbers: ${successful.slice(0, 3).map(r => r.quoteNumber).join(', ')}`);
    }
    
    if (failed.length > 0) {
      console.log(`\nFailures:`);
      failed.forEach(f => {
        console.log(`  - User ${f.userId}: ${f.error} ${f.message || ''}`);
      });
    }
    
    // Small delay between test levels
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n\n🎯 Scalability Test Summary');
  console.log('=' .repeat(50));
  console.log('The system should handle concurrent requests without:');
  console.log('✓ Duplicate quote numbers');
  console.log('✓ Race conditions');
  console.log('✓ Database conflicts');
  console.log('✓ Excessive response times');
  
  console.log('\n💡 Recommendations for hundreds of users:');
  console.log('1. Use connection pooling (implemented)');
  console.log('2. Add Redis for caching frequently accessed data');
  console.log('3. Implement database read replicas for reporting');
  console.log('4. Use CDN for static assets');
  console.log('5. Consider horizontal scaling with load balancer');
  console.log('6. Monitor with APM tools (New Relic, DataDog)');
  console.log('7. Set up auto-scaling based on CPU/memory usage');
}

// Run the test
runConcurrencyTest().catch(console.error);