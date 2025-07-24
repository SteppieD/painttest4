// Test the full trial signup flow including redirect
const puppeteer = require('puppeteer');

async function testTrialSignupFlow() {
  console.log('🧪 Testing full trial signup flow with browser automation...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, // Set to true for CI/CD
    defaultViewport: { width: 1280, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    
    // 1. Navigate to trial signup page
    console.log('1️⃣ Navigating to trial signup page...');
    await page.goto('http://localhost:3000/trial-signup', { waitUntil: 'networkidle2' });
    console.log('✅ Page loaded\n');
    
    // 2. Fill in the form
    console.log('2️⃣ Filling out the form...');
    const timestamp = Date.now();
    const companyName = `Test Company ${timestamp}`;
    const email = `test${timestamp}@example.com`;
    
    await page.type('input[id="company"]', companyName);
    await page.type('input[id="email"]', email);
    console.log(`   Company: ${companyName}`);
    console.log(`   Email: ${email}\n`);
    
    // 3. Submit the form
    console.log('3️⃣ Submitting the form...');
    await page.click('button[type="submit"]');
    
    // 4. Wait for success message
    console.log('4️⃣ Waiting for success message...');
    await page.waitForSelector('.text-emerald-400', { timeout: 10000 });
    
    // Get the access code
    const accessCode = await page.$eval('.font-mono.font-bold.text-blue-400', el => el.textContent);
    console.log(`✅ Success! Access code: ${accessCode}\n`);
    
    // 5. Wait for redirect
    console.log('5️⃣ Waiting for redirect to dashboard...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
    
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    
    if (currentUrl.includes('/dashboard')) {
      console.log('✅ Successfully redirected to dashboard!\n');
      
      // Check if we can see dashboard content
      const dashboardTitle = await page.$eval('h1', el => el.textContent).catch(() => 'Not found');
      console.log(`📊 Dashboard title: ${dashboardTitle}`);
    } else {
      console.log('❌ Did not redirect to dashboard\n');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
  testTrialSignupFlow();
} catch {
  console.log('📦 Puppeteer not installed. Install it with:');
  console.log('   npm install puppeteer');
  console.log('\nOr test manually by:');
  console.log('1. Open http://localhost:3000/trial-signup');
  console.log('2. Fill in the form');
  console.log('3. Submit and check if you get redirected to dashboard');
}