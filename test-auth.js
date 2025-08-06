// Test script to verify authentication flow
const baseUrl = 'http://localhost:3001';

async function testAccessCodeLogin() {
  console.log('Testing access code login...');
  
  const response = await fetch(`${baseUrl}/api/auth/verify-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessCode: 'DEMO2024'
    })
  });

  const data = await response.json();
  console.log('Login response:', {
    status: response.status,
    success: data.success,
    hasCompany: !!data.company,
    hasAccessCode: !!data.company?.access_code
  });

  if (data.success && data.company) {
    console.log('✅ Login successful');
    console.log('Company:', {
      id: data.company.id,
      name: data.company.name,
      access_code: data.company.access_code
    });
  } else {
    console.log('❌ Login failed:', data.error);
  }

  return data;
}

async function testDashboardAccess(companyData) {
  console.log('\nTesting dashboard API access...');
  
  const response = await fetch(`${baseUrl}/api/companies/usage`, {
    headers: {
      'x-company-data': JSON.stringify({
        id: companyData.id,
        access_code: companyData.access_code
      })
    }
  });

  const data = await response.json();
  console.log('Dashboard API response:', {
    status: response.status,
    hasData: !!data.currentMonth
  });

  if (response.ok) {
    console.log('✅ Dashboard API accessible');
    console.log('Usage data:', data.currentMonth);
  } else {
    console.log('❌ Dashboard API failed:', data.error);
  }
}

async function runTests() {
  try {
    const loginData = await testAccessCodeLogin();
    if (loginData.success && loginData.company) {
      await testDashboardAccess(loginData.company);
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

runTests();