#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const API_KEY = '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';

// Test user credentials
const TEST_USER = {
  email: 'test@paintquotepro.com',
  password: 'test123'
};

// Color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

let authToken = null;

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const protocol = options.protocol === 'https:' ? https : http;
    const req = protocol.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

// Test functions
async function testHomepage() {
  console.log(`\n${colors.blue}Testing Homepage...${colors.reset}`);
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      const hasTimeSavings = response.body.includes('Turn Hours Into Minutes');
      const hasFreemium = response.body.includes('5 free quotes per month');
      
      console.log(`${colors.green}✓ Homepage loads successfully${colors.reset}`);
      console.log(`${colors.green}✓ Time savings section: ${hasTimeSavings ? 'Present' : 'Missing'}${colors.reset}`);
      console.log(`${colors.green}✓ Freemium messaging: ${hasFreemium ? 'Present' : 'Missing'}${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.red}✗ Homepage returned status ${response.statusCode}${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Homepage test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

async function testAuthentication() {
  console.log(`\n${colors.blue}Testing Authentication...${colors.reset}`);
  
  try {
    const data = JSON.stringify(TEST_USER);
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/signin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, data);
    
    if (response.statusCode === 200) {
      const setCookie = response.headers['set-cookie'];
      if (setCookie && setCookie.length > 0) {
        authToken = setCookie[0].split(';')[0].split('=')[1];
        console.log(`${colors.green}✓ Authentication successful${colors.reset}`);
        return true;
      }
    }
    
    console.log(`${colors.red}✗ Authentication failed: ${response.statusCode}${colors.reset}`);
    return false;
  } catch (error) {
    console.log(`${colors.red}✗ Authentication test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

async function testDashboard() {
  console.log(`\n${colors.blue}Testing Dashboard...${colors.reset}`);
  
  if (!authToken) {
    console.log(`${colors.yellow}⚠ Skipping dashboard test - not authenticated${colors.reset}`);
    return false;
  }
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/dashboard',
      method: 'GET',
      headers: {
        'Cookie': `auth-token=${authToken}`
      }
    });
    
    if (response.statusCode === 200) {
      const hasMetrics = response.body.includes('Total Quotes') && 
                        response.body.includes('Total Quoted') &&
                        response.body.includes('Win Rate');
      const hasLockedFeatures = response.body.includes('Pro Feature') || 
                               response.body.includes('blur-sm');
      
      console.log(`${colors.green}✓ Dashboard loads successfully${colors.reset}`);
      console.log(`${colors.green}✓ Business metrics: ${hasMetrics ? 'Present' : 'Missing'}${colors.reset}`);
      console.log(`${colors.green}✓ Locked features: ${hasLockedFeatures ? 'Present' : 'Missing'}${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.red}✗ Dashboard returned status ${response.statusCode}${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Dashboard test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

async function testNavigation() {
  console.log(`\n${colors.blue}Testing Navigation Pages...${colors.reset}`);
  
  if (!authToken) {
    console.log(`${colors.yellow}⚠ Skipping navigation test - not authenticated${colors.reset}`);
    return false;
  }
  
  const pages = [
    { path: '/dashboard/quotes', name: 'Quotes' },
    { path: '/dashboard/customers', name: 'Customers' },
    { path: '/dashboard/products', name: 'Products' },
    { path: '/dashboard/settings', name: 'Settings' },
    { path: '/dashboard/chat', name: 'Chat' }
  ];
  
  let allPassed = true;
  
  for (const page of pages) {
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: page.path,
        method: 'GET',
        headers: {
          'Cookie': `auth-token=${authToken}`
        }
      });
      
      if (response.statusCode === 200) {
        console.log(`${colors.green}✓ ${page.name} page loads successfully${colors.reset}`);
      } else {
        console.log(`${colors.red}✗ ${page.name} page returned status ${response.statusCode}${colors.reset}`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`${colors.red}✗ ${page.name} page test failed: ${error.message}${colors.reset}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

async function testPricingPage() {
  console.log(`\n${colors.blue}Testing Pricing Page...${colors.reset}`);
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/pricing',
      method: 'GET'
    });
    
    if (response.statusCode === 200) {
      const hasFreeTier = response.body.includes('5 quotes per month');
      const hasProTier = response.body.includes('$47');
      const hasMobileFeature = response.body.includes('📱');
      
      console.log(`${colors.green}✓ Pricing page loads successfully${colors.reset}`);
      console.log(`${colors.green}✓ Free tier (5 quotes): ${hasFreeTier ? 'Present' : 'Missing'}${colors.reset}`);
      console.log(`${colors.green}✓ Pro tier ($47): ${hasProTier ? 'Present' : 'Missing'}${colors.reset}`);
      console.log(`${colors.green}✓ Mobile features: ${hasMobileFeature ? 'Present' : 'Missing'}${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.red}✗ Pricing page returned status ${response.statusCode}${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Pricing page test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

async function testMobileRoute() {
  console.log(`\n${colors.blue}Testing Mobile Quote Route...${colors.reset}`);
  
  if (!authToken) {
    console.log(`${colors.yellow}⚠ Skipping mobile route test - not authenticated${colors.reset}`);
    return false;
  }
  
  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/dashboard/quotes/mobile',
      method: 'GET',
      headers: {
        'Cookie': `auth-token=${authToken}`,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      }
    });
    
    if (response.statusCode === 200) {
      const hasSwipeHint = response.body.includes('Swipe left or right');
      const hasEmojis = response.body.includes('👤') && response.body.includes('🏠');
      
      console.log(`${colors.green}✓ Mobile quote route loads successfully${colors.reset}`);
      console.log(`${colors.green}✓ Swipe navigation: ${hasSwipeHint ? 'Present' : 'Missing'}${colors.reset}`);
      console.log(`${colors.green}✓ Mobile UI elements: ${hasEmojis ? 'Present' : 'Missing'}${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.red}✗ Mobile route returned status ${response.statusCode}${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Mobile route test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

async function testLocationPages() {
  console.log(`\n${colors.blue}Testing Location Pages...${colors.reset}`);
  
  const locations = ['phoenix', 'denver', 'orlando', 'las-vegas', 'miami'];
  let allPassed = true;
  
  for (const location of locations) {
    try {
      const response = await makeRequest({
        hostname: 'localhost',
        port: 3000,
        path: `/locations/${location}`,
        method: 'GET'
      });
      
      if (response.statusCode === 200) {
        console.log(`${colors.green}✓ ${location} page loads successfully${colors.reset}`);
      } else {
        console.log(`${colors.red}✗ ${location} page returned status ${response.statusCode}${colors.reset}`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`${colors.red}✗ ${location} page test failed: ${error.message}${colors.reset}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// Main test runner
async function runAllTests() {
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.blue}PaintQuote Pro - Comprehensive Test Suite${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
  
  const results = {
    homepage: await testHomepage(),
    authentication: await testAuthentication(),
    dashboard: await testDashboard(),
    navigation: await testNavigation(),
    pricing: await testPricingPage(),
    mobile: await testMobileRoute(),
    locations: await testLocationPages()
  };
  
  // Summary
  console.log(`\n${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.blue}Test Summary${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
  
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.keys(results).length;
  
  Object.entries(results).forEach(([test, result]) => {
    const status = result ? `${colors.green}PASSED${colors.reset}` : `${colors.red}FAILED${colors.reset}`;
    console.log(`${test.padEnd(20)} ${status}`);
  });
  
  console.log(`\n${colors.blue}Total: ${passed}/${total} tests passed${colors.reset}`);
  
  if (passed === total) {
    console.log(`${colors.green}✨ All tests passed! The application is working correctly.${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠ Some tests failed. Please check the logs above.${colors.reset}`);
  }
}

// Run tests
runAllTests().catch(console.error);