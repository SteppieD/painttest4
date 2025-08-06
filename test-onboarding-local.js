const fetch = require('node-fetch');

async function testOnboarding() {
  const baseUrl = 'http://localhost:3001';
  
  // Test company data
  const companyData = {
    id: 70,
    access_code: 'GASPAR050',
    name: 'Company GASPAR050',
    email: 'gaspar050@example.com'
  };
  
  // Test onboarding data
  const onboardingData = {
    companyName: 'Company GASPAR050',
    email: 'gaspar050@example.com',
    phone: '555-1234',
    taxRate: 8.5,
    city: 'Phoenix',
    state: 'AZ',
    laborRate: 45,
    markupPercentage: 30,
    minimumJobSize: 500,
    onboarding_completed: true
  };
  
  console.log('Testing onboarding API...');
  console.log('Company:', companyData);
  console.log('Onboarding data:', onboardingData);
  
  try {
    const response = await fetch(`${baseUrl}/api/companies/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-company-data': JSON.stringify(companyData)
      },
      body: JSON.stringify(onboardingData)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.raw());
    
    const responseText = await response.text();
    console.log('Response body:', responseText);
    
    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log('✅ Onboarding successful!');
      console.log('Company data:', data.company);
    } else {
      console.error('❌ Onboarding failed');
      try {
        const errorData = JSON.parse(responseText);
        console.error('Error details:', errorData);
      } catch (e) {
        console.error('Raw error:', responseText);
      }
    }
  } catch (error) {
    console.error('❌ Request failed:', error);
  }
}

testOnboarding();