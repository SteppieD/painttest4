const { chromium } = require('playwright');

async function manualTest() {
  console.log('🔍 Starting Manual Testing of PaintQuote Pro...\n');
  
  const browser = await chromium.launch({
    headless: false, // Show browser for manual inspection
    slowMo: 500 // Slow down for observation
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    // Test 1: Access Code Flow
    console.log('📋 Test 1: Access Code Flow');
    await page.goto('http://localhost:3005/access-code');
    await page.waitForTimeout(2000);
    
    // Try to enter an access code
    const codeInput = await page.$('input[type="text"]');
    if (codeInput) {
      console.log('✅ Access code input found');
      await codeInput.type('DEMO123');
      await page.waitForTimeout(1000);
      
      const submitButton = await page.$('button[type="submit"]');
      if (submitButton) {
        const isDisabled = await submitButton.evaluate(el => el.disabled);
        console.log(`   Submit button disabled: ${isDisabled}`);
        if (!isDisabled) {
          await submitButton.click();
          console.log('   Clicked submit button');
          await page.waitForTimeout(3000);
        }
      }
    } else {
      console.log('❌ Access code input not found');
    }
    
    // Test 2: Direct Quote Creation
    console.log('\n📋 Test 2: Direct Quote Creation');
    await page.goto('http://localhost:3005/create-quote');
    await page.waitForTimeout(2000);
    
    // Check if we can access the quote creation page
    const chatInterface = await page.$('textarea, input[placeholder*="message" i], .chat-input');
    if (chatInterface) {
      console.log('✅ Chat interface found');
      await chatInterface.type('I need a quote for painting a 3 bedroom house, 2000 sq ft, interior only');
      await page.waitForTimeout(1000);
      
      // Look for send button
      const sendButton = await page.$('button[type="submit"], button:has-text("Send"), button[aria-label*="send" i]');
      if (sendButton) {
        await sendButton.click();
        console.log('   Sent message to AI');
        await page.waitForTimeout(5000); // Wait for AI response
        
        // Check for quote breakdown
        const quoteBreakdown = await page.$('.quote-breakdown, [class*="breakdown"], [class*="quote-details"]');
        if (quoteBreakdown) {
          console.log('✅ Quote breakdown appeared');
          
          // Look for Continue to Review button
          const reviewButton = await page.$('button:has-text("Continue to Review"), button:has-text("Review")');
          if (reviewButton) {
            console.log('✅ Review button found');
            await reviewButton.click();
            await page.waitForTimeout(3000);
            console.log('   Navigated to review page');
          }
        }
      }
    } else {
      console.log('❌ Chat interface not found - may need authentication');
    }
    
    // Test 3: Pricing Page and Upsells
    console.log('\n📋 Test 3: Pricing Page and Upsells');
    await page.goto('http://localhost:3005/pricing');
    await page.waitForTimeout(2000);
    
    // Check for pricing tiers
    const pricingCards = await page.$$('.pricing-card, [class*="price"], [class*="tier"]');
    console.log(`   Found ${pricingCards.length} pricing elements`);
    
    // Check for CTAs
    const upgradeCTAs = await page.$$('a[href*="stripe"], button:has-text("Get Started"), button:has-text("Subscribe")');
    console.log(`   Found ${upgradeCTAs.length} upgrade CTAs`);
    
    if (upgradeCTAs.length > 0) {
      const firstCTA = upgradeCTAs[0];
      const ctaText = await firstCTA.textContent();
      const ctaHref = await firstCTA.getAttribute('href');
      console.log(`   First CTA: "${ctaText}" -> ${ctaHref}`);
    }
    
    // Test 4: Navigation Flow
    console.log('\n📋 Test 4: Navigation Flow');
    const navLinks = [
      { selector: 'a[href="/features"], a:has-text("Features")', name: 'Features' },
      { selector: 'a[href="/demo"], a:has-text("Demo")', name: 'Demo' },
      { selector: 'a[href="/case-studies"], a:has-text("Case Studies")', name: 'Case Studies' },
      { selector: 'a[href="/contact"], a:has-text("Contact")', name: 'Contact' }
    ];
    
    for (const link of navLinks) {
      const element = await page.$(link.selector);
      if (element) {
        const href = await element.getAttribute('href');
        console.log(`✅ ${link.name}: ${href}`);
      } else {
        console.log(`❌ ${link.name}: Not found`);
      }
    }
    
    // Test 5: ROI Calculator
    console.log('\n📋 Test 5: ROI Calculator');
    await page.goto('http://localhost:3005/roi-calculator');
    await page.waitForTimeout(2000);
    
    const roiInputs = await page.$$('input[type="number"], input[type="range"]');
    console.log(`   Found ${roiInputs.length} ROI calculator inputs`);
    
    if (roiInputs.length > 0) {
      // Try to interact with first input
      await roiInputs[0].fill('50000');
      await page.waitForTimeout(1000);
      
      // Check for results
      const results = await page.$('.roi-results, [class*="result"], [class*="savings"]');
      if (results) {
        console.log('✅ ROI results updated');
      }
    }
    
    // Test 6: Mobile Menu
    console.log('\n📋 Test 6: Mobile Navigation');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3005');
    await page.waitForTimeout(2000);
    
    const mobileMenuButton = await page.$('button[aria-label*="menu" i], button:has-text("Menu"), [class*="hamburger"], [class*="mobile-menu"]');
    if (mobileMenuButton) {
      console.log('✅ Mobile menu button found');
      await mobileMenuButton.click();
      await page.waitForTimeout(1000);
      
      const mobileNav = await page.$('[class*="mobile-nav"], [class*="drawer"], [class*="sidebar"]');
      if (mobileNav) {
        console.log('✅ Mobile navigation opened');
      }
    } else {
      console.log('❌ Mobile menu button not found');
    }
    
    console.log('\n=====================================');
    console.log('🎯 Manual Testing Complete!');
    console.log('=====================================\n');
    
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
  
  // Keep browser open for manual inspection
  console.log('🔍 Browser will remain open for manual inspection...');
  console.log('   Press Ctrl+C to close when done.\n');
  
  // Wait indefinitely
  await new Promise(() => {});
}

manualTest().catch(console.error);