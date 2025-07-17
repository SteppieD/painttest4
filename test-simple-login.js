// Simple test to check if existing user can login

async function testSimpleLogin() {
  console.log('Testing login with existing user...\n');
  
  try {
    const loginResponse = await fetch('http://localhost:3001/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'test123'
      })
    });
    
    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      console.error('Login failed:', loginResponse.status, errorText);
      return;
    }
    
    const loginData = await loginResponse.json();
    console.log('✅ Login successful');
    console.log('User:', loginData.user);
    
    // Get auth token
    const authCookie = loginResponse.headers.get('set-cookie');
    const authToken = authCookie?.match(/auth-token=([^;]+)/)?.[1];
    
    if (!authToken) {
      console.error('No auth token received');
      return;
    }
    
    console.log('\nTesting dashboard access...');
    
    // Test dashboard
    const dashboardResponse = await fetch('http://localhost:3001/dashboard', {
      headers: {
        'Cookie': `auth-token=${authToken}`
      }
    });
    
    console.log('Dashboard status:', dashboardResponse.status);
    
    if (dashboardResponse.status === 500) {
      console.error('Dashboard error - likely the sentAt field issue');
      // Try to get error details
      const errorHtml = await dashboardResponse.text();
      if (errorHtml.includes('sentAt')) {
        console.error('Confirmed: sentAt field error in dashboard query');
      }
    } else if (dashboardResponse.status === 200) {
      console.log('✅ Dashboard accessible');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSimpleLogin();