// Full end-to-end test

async function testFullFlow() {
  console.log('Starting full end-to-end test...\n');
  
  // Test login
  console.log('1. Testing login...');
  const loginResponse = await fetch('http://localhost:3001/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@test.com',
      password: 'test123'
    })
  });
  
  if (!loginResponse.ok) {
    console.error('Login failed:', await loginResponse.text());
    return;
  }
  
  const loginData = await loginResponse.json();
  const authCookie = loginResponse.headers.get('set-cookie');
  const authToken = authCookie?.match(/auth-token=([^;]+)/)?.[1];
  
  console.log('✅ Login successful');
  console.log('User:', loginData.user.name);
  console.log('Company:', loginData.user.company.name);
  console.log('Plan:', loginData.user.company.plan);
  
  // Test dashboard access
  console.log('\n2. Testing dashboard access...');
  const dashboardResponse = await fetch('http://localhost:3001/dashboard', {
    headers: {
      'Cookie': `auth-token=${authToken}`
    }
  });
  
  console.log('Dashboard status:', dashboardResponse.status);
  if (dashboardResponse.status !== 200) {
    console.error('Dashboard access failed');
    const text = await dashboardResponse.text();
    console.error('Response:', text.substring(0, 500));
    return;
  }
  
  console.log('✅ Dashboard accessible');
  
  // Test signup with new account
  console.log('\n3. Testing signup with new account...');
  const randomEmail = `test${Date.now()}@example.com`;
  const signupResponse = await fetch('http://localhost:3001/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'New Test User',
      email: randomEmail,
      password: 'test123',
      companyName: 'New Test Company'
    })
  });
  
  if (!signupResponse.ok) {
    console.error('Signup failed:', await signupResponse.text());
    return;
  }
  
  const signupData = await signupResponse.json();
  console.log('✅ Signup successful');
  console.log('New user created:', signupData.user.email);
  console.log('Quote limit:', signupData.user.company.plan === 'free' ? '5 quotes/month' : 'Unlimited');
  
  // Test with the new account's token
  const newAuthCookie = signupResponse.headers.get('set-cookie');
  const newAuthToken = newAuthCookie?.match(/auth-token=([^;]+)/)?.[1];
  
  // Test creating a quote with the new account
  console.log('\n4. Testing quote creation with new account...');
  const quoteResponse = await fetch('http://localhost:3001/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `auth-token=${newAuthToken}`
    },
    body: JSON.stringify({
      customer: {
        name: 'Test Customer',
        email: 'customer@example.com',
        phone: '555-0001',
        address: '123 Test St'
      },
      projectType: 'interior',
      surfaces: [{
        type: 'walls',
        area: 500,
        coats: 2,
        condition: 'good',
        prepWork: []
      }]
    })
  });
  
  if (!quoteResponse.ok) {
    console.error('Quote creation failed:', await quoteResponse.text());
    return;
  }
  
  const quote = await quoteResponse.json();
  console.log('✅ Quote created successfully');
  console.log('Quote number:', quote.quoteNumber);
  console.log('Total amount:', quote.totalAmount);
  
  console.log('\n✅ All tests passed!');
}

// Run the test
testFullFlow().catch(console.error);