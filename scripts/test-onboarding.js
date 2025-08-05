const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testOnboarding() {
  console.log('Starting onboarding flow test...\n');
  
  try {
    // Step 1: Create a test company
    console.log('1. Creating test company...');
    const accessCode = `TEST${Date.now()}`;
    const companyData = {
      id: Math.floor(Math.random() * 1000000),
      access_code: accessCode,
      name: 'Test Painting Company',
      email: 'test@example.com',
      phone: '555-1234',
      onboarding_completed: false,
      onboarding_step: 0
    };
    
    // Simulate storing in localStorage (in real app)
    console.log('Company created:', { accessCode, id: companyData.id });
    
    // Step 2: Test onboarding endpoint
    console.log('\n2. Testing onboarding completion endpoint...');
    const onboardingData = {
      companyName: 'Test Painting Company LLC',
      email: 'test@paintingco.com',
      phone: '(555) 123-4567',
      city: 'Test City',
      state: 'TS',
      taxRate: 8.5,
      laborRate: 45,
      markupPercentage: 30
    };
    
    const response = await axios.post(`${BASE_URL}/api/companies/onboarding`, onboardingData, {
      headers: {
        'Content-Type': 'application/json',
        'x-company-data': JSON.stringify(companyData)
      }
    });
    
    console.log('Onboarding response:', response.data);
    
    if (response.data.success) {
      console.log('\n✅ Onboarding completed successfully!');
      console.log('Company data:', response.data.company);
    } else {
      console.log('\n❌ Onboarding failed');
    }
    
  } catch (error) {
    console.error('\n❌ Error during onboarding test:');
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      if (error.response.data.debugSummary) {
        console.error('\nDebug summary:');
        error.response.data.debugSummary.forEach(log => {
          console.error(`[${log.timestamp}ms] [${log.type}] ${log.message}`);
          if (log.data) {
            console.error('  Data:', JSON.stringify(log.data, null, 2));
          }
        });
      }
    } else {
      console.error(error.message);
      console.error(error.stack);
    }
  }
}

// Check if axios is installed
try {
  require.resolve('axios');
  testOnboarding();
} catch(e) {
  console.log('Installing axios...');
  require('child_process').execSync('npm install axios', { stdio: 'inherit' });
  console.log('Please run this script again.');
}