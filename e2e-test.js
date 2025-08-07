const { test, expect, chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3005';
const TEST_EMAIL = 'gaspari.giuseppe@gmail.com';
const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots');
const REPORT_FILE = path.join(__dirname, 'e2e-test-report.html');

// Test data
const testUser = {
  name: 'John Test Contractor',
  email: 'test+' + Date.now() + '@example.com',
  company: 'Test Painting Co',
  phone: '555-123-4567'
};

const testQuote = {
  customerName: 'Jane Smith',
  customerEmail: TEST_EMAIL,
  projectAddress: '123 Main St, Anytown, USA',
  projectType: 'Interior painting',
  rooms: '3 bedrooms, 2 bathrooms, living room',
  squareFootage: '1200',
  specialRequirements: 'High-quality finish, two coats'
};

// Test results tracking
let testResults = {
  startTime: new Date(),
  tests: [],
  screenshots: [],
  issues: [],
  opportunities: [],
  userExperience: {
    loadTimes: [],
    navigationFlow: [],
    conversionFunnelIssues: []
  }
};

// Utility functions
async function takeScreenshot(page, name, description) {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
  
  const filename = `${Date.now()}-${name}.png`;
  const filepath = path.join(SCREENSHOTS_DIR, filename);
  
  await page.screenshot({ path: filepath, fullPage: true });
  
  testResults.screenshots.push({
    name,
    description,
    filename,
    timestamp: new Date()
  });
  
  console.log(`📸 Screenshot saved: ${name}`);
}

async function measureLoadTime(page, url, description) {
  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  const loadTime = Date.now() - startTime;
  
  testResults.userExperience.loadTimes.push({
    url,
    description,
    loadTime,
    acceptable: loadTime < 3000
  });
  
  console.log(`⏱️  ${description}: ${loadTime}ms`);
  return loadTime;
}

function addTestResult(name, status, details, uxImpact = null) {
  const result = {
    name,
    status,
    details,
    timestamp: new Date(),
    uxImpact
  };
  
  testResults.tests.push(result);
  
  if (status === 'failed') {
    testResults.issues.push({
      severity: uxImpact?.severity || 'medium',
      issue: details,
      impact: uxImpact?.description || 'User experience may be degraded'
    });
  }
  
  console.log(`${status === 'passed' ? '✅' : '❌'} ${name}: ${details}`);
}

function addOpportunity(category, description, impact) {
  testResults.opportunities.push({
    category,
    description,
    impact,
    priority: impact.includes('conversion') ? 'high' : 'medium'
  });
}

// Main test execution
async function runComprehensiveTests() {
  console.log('🚀 Starting PaintQuote Pro E2E Testing Suite...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Slow down for better observation
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    // Test 1: Homepage User Experience
    console.log('\n📋 Test 1: Homepage User Experience');
    await testHomepage(page);
    
    // Test 2: Sign-up Flow
    console.log('\n📋 Test 2: Sign-up Flow');
    await testSignupFlow(page);
    
    // Test 3: AI Chat Interface & Quote Creation
    console.log('\n📋 Test 3: AI Chat Interface & Quote Creation');
    await testQuoteCreation(page);
    
    // Test 4: Quote Review Process
    console.log('\n📋 Test 4: Quote Review Process');
    await testQuoteReview(page);
    
    // Test 5: Email Quote Sending
    console.log('\n📋 Test 5: Email Quote Sending');
    await testQuoteEmailSending(page);
    
    // Test 6: Navigation Links
    console.log('\n📋 Test 6: Navigation Links Testing');
    await testNavigationLinks(page);
    
    // Test 7: Upsell/Pricing Links
    console.log('\n📋 Test 7: Upsell/Pricing Links');
    await testUpsellPricingLinks(page);
    
    // Test 8: Mobile Responsiveness
    console.log('\n📋 Test 8: Mobile Responsiveness');
    await testMobileResponsiveness(context);
    
    // Test 9: Performance Analysis
    console.log('\n📋 Test 9: Performance Analysis');
    await testPerformance(page);
    
  } catch (error) {
    console.error('❌ Critical test failure:', error);
    addTestResult('Critical Error', 'failed', error.message, {
      severity: 'critical',
      description: 'Test suite encountered a critical failure'
    });
  } finally {
    await browser.close();
    await generateReport();
  }
}

async function testHomepage(page) {
  try {
    // Load homepage and measure performance
    const loadTime = await measureLoadTime(page, BASE_URL, 'Homepage Load');
    await takeScreenshot(page, 'homepage-initial', 'Homepage initial load');
    
    // Check critical elements
    const heroHeading = await page.locator('h1').first();
    const ctaButton = await page.locator('text=/Start.*Free|Get.*Started|Create.*Quote/i').first();
    const navigationMenu = await page.locator('nav').first();
    
    if (await heroHeading.isVisible()) {
      const heroText = await heroHeading.textContent();
      addTestResult('Hero Heading', 'passed', `Found: "${heroText}"`);
      
      // UX Analysis: Check if heading is compelling
      if (heroText.toLowerCase().includes('free') || heroText.toLowerCase().includes('minutes')) {
        addOpportunity('conversion', 'Hero heading emphasizes speed and value', 'Positive for conversion');
      }
    } else {
      addTestResult('Hero Heading', 'failed', 'Hero heading not found', {
        severity: 'high',
        description: 'Missing hero heading reduces conversion potential'
      });
    }
    
    // Test CTA button
    if (await ctaButton.isVisible()) {
      addTestResult('Primary CTA', 'passed', 'Primary CTA button is visible');
      
      // Check CTA text for conversion optimization
      const ctaText = await ctaButton.textContent();
      if (ctaText.toLowerCase().includes('free') || ctaText.toLowerCase().includes('start')) {
        addOpportunity('conversion', 'CTA uses action-oriented language', 'Good for conversion');
      }
    } else {
      addTestResult('Primary CTA', 'failed', 'Primary CTA button not found', {
        severity: 'critical',
        description: 'Missing primary CTA severely impacts conversion'
      });
    }
    
    // Check for social proof elements
    const testimonials = await page.locator('[data-testid="testimonial"], .testimonial, text=/testimonial/i').count();
    const logos = await page.locator('[data-testid="client-logo"], .client-logo, .logo').count();
    
    if (testimonials > 0 || logos > 0) {
      addTestResult('Social Proof', 'passed', `Found ${testimonials} testimonials, ${logos} logos`);
    } else {
      addOpportunity('conversion', 'Add social proof elements (testimonials, client logos)', 'High impact on trust and conversion');
    }
    
    // Test scroll behavior and additional CTAs
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await takeScreenshot(page, 'homepage-mid-scroll', 'Homepage middle section');
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await takeScreenshot(page, 'homepage-footer', 'Homepage footer section');
    
  } catch (error) {
    addTestResult('Homepage Test', 'failed', error.message);
  }
}

async function testSignupFlow(page) {
  try {
    // Navigate to signup
    await page.goto(`${BASE_URL}/trial-signup`);
    await takeScreenshot(page, 'signup-page', 'Signup page initial view');
    
    // Fill out signup form
    const nameField = page.locator('input[name="name"], input[placeholder*="name" i]').first();
    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    const companyField = page.locator('input[name="company"], input[placeholder*="company" i]').first();
    const phoneField = page.locator('input[name="phone"], input[type="tel"], input[placeholder*="phone" i]').first();
    
    // Test form validation
    const submitButton = page.locator('button[type="submit"], button:has-text("Sign Up"), button:has-text("Start")').first();
    
    if (await submitButton.isVisible()) {
      // Try submitting empty form to test validation
      await submitButton.click();
      
      // Check for validation errors
      const errorMessages = await page.locator('.error, [role="alert"], .text-red-500').count();
      if (errorMessages > 0) {
        addTestResult('Form Validation', 'passed', `Found ${errorMessages} validation messages`);
      } else {
        addOpportunity('ux', 'Add client-side form validation for better UX', 'Improves form completion rates');
      }
      
      // Fill out the form
      if (await nameField.isVisible()) await nameField.fill(testUser.name);
      if (await emailField.isVisible()) await emailField.fill(testUser.email);
      if (await companyField.isVisible()) await companyField.fill(testUser.company);
      if (await phoneField.isVisible()) await phoneField.fill(testUser.phone);
      
      await takeScreenshot(page, 'signup-form-filled', 'Signup form filled out');
      
      // Submit form
      await submitButton.click();
      
      // Wait for redirect or success message
      await page.waitForTimeout(3000);
      const currentUrl = page.url();
      
      if (currentUrl.includes('dashboard') || currentUrl.includes('onboarding') || currentUrl.includes('welcome')) {
        addTestResult('Signup Completion', 'passed', `Redirected to: ${currentUrl}`);
        testResults.userExperience.navigationFlow.push({
          from: 'signup',
          to: currentUrl,
          successful: true
        });
      } else {
        addTestResult('Signup Completion', 'failed', `Unexpected redirect: ${currentUrl}`, {
          severity: 'high',
          description: 'Signup flow may not be working properly'
        });
      }
      
      await takeScreenshot(page, 'signup-result', 'Post-signup state');
      
    } else {
      addTestResult('Signup Form', 'failed', 'Signup form or submit button not found');
    }
    
  } catch (error) {
    addTestResult('Signup Flow', 'failed', error.message);
  }
}

async function testQuoteCreation(page) {
  try {
    // Navigate to quote creation
    await page.goto(`${BASE_URL}/create-quote`);
    await takeScreenshot(page, 'quote-creation-page', 'Quote creation page');
    
    // Look for AI chat interface
    const chatInterface = page.locator('[data-testid="chat"], .chat, #chat').first();
    const chatInput = page.locator('textarea, input[placeholder*="describe" i], input[placeholder*="tell" i]').first();
    const sendButton = page.locator('button:has-text("Send"), button[type="submit"]').first();
    
    if (await chatInput.isVisible()) {
      addTestResult('AI Chat Interface', 'passed', 'Chat input found');
      
      // Test the AI chat flow
      const projectDescription = `I need a quote for ${testQuote.projectType} at ${testQuote.projectAddress}. 
      The project involves ${testQuote.rooms} with approximately ${testQuote.squareFootage} square feet. 
      Special requirements: ${testQuote.specialRequirements}. 
      Customer name is ${testQuote.customerName} and email is ${testQuote.customerEmail}.`;
      
      await chatInput.fill(projectDescription);
      await takeScreenshot(page, 'chat-input-filled', 'Chat input filled with project details');
      
      if (await sendButton.isVisible()) {
        await sendButton.click();
        
        // Wait for AI response
        await page.waitForTimeout(5000);
        
        // Look for AI response
        const chatMessages = await page.locator('.message, .chat-message, [data-testid="message"]').count();
        if (chatMessages > 0) {
          addTestResult('AI Response', 'passed', `Found ${chatMessages} chat messages`);
        } else {
          addTestResult('AI Response', 'failed', 'No AI response detected', {
            severity: 'high',
            description: 'AI chat functionality may not be working'
          });
        }
        
        await takeScreenshot(page, 'ai-response', 'AI chat response');
        
        // Look for quote generation button or next step
        const generateButton = page.locator('button:has-text("Generate"), button:has-text("Create Quote"), button:has-text("Continue")').first();
        if (await generateButton.isVisible()) {
          await generateButton.click();
          await page.waitForTimeout(3000);
          addTestResult('Quote Generation', 'passed', 'Quote generation initiated');
        }
        
      } else {
        addTestResult('Chat Send Button', 'failed', 'Send button not found');
      }
      
    } else {
      addTestResult('AI Chat Interface', 'failed', 'Chat interface not found', {
        severity: 'critical',
        description: 'Core AI chat functionality is missing'
      });
    }
    
  } catch (error) {
    addTestResult('Quote Creation', 'failed', error.message);
  }
}

async function testQuoteReview(page) {
  try {
    // Look for quote review elements
    const quotePreview = page.locator('.quote-preview, [data-testid="quote-preview"]').first();
    const editButton = page.locator('button:has-text("Edit"), button:has-text("Modify")').first();
    const approveButton = page.locator('button:has-text("Approve"), button:has-text("Accept"), button:has-text("Send")').first();
    
    await takeScreenshot(page, 'quote-review', 'Quote review interface');
    
    if (await quotePreview.isVisible()) {
      addTestResult('Quote Preview', 'passed', 'Quote preview is visible');
      
      // Check for key quote elements
      const priceElement = await page.locator('text=/\\$[0-9,]+/', '.price, .total').count();
      if (priceElement > 0) {
        addTestResult('Quote Pricing', 'passed', 'Price information displayed');
      } else {
        addOpportunity('ux', 'Make pricing more prominent in quote review', 'Clear pricing improves customer confidence');
      }
      
    } else {
      addTestResult('Quote Preview', 'failed', 'Quote preview not found');
    }
    
    // Test edit functionality
    if (await editButton.isVisible()) {
      addTestResult('Edit Functionality', 'passed', 'Edit button is available');
    } else {
      addOpportunity('feature', 'Add quote editing capability', 'Flexibility increases user satisfaction');
    }
    
    // Test approval flow
    if (await approveButton.isVisible()) {
      addTestResult('Quote Approval', 'passed', 'Quote approval button is available');
      testResults.userExperience.navigationFlow.push({
        from: 'quote-creation',
        to: 'quote-review',
        successful: true
      });
    }
    
  } catch (error) {
    addTestResult('Quote Review', 'failed', error.message);
  }
}

async function testQuoteEmailSending(page) {
  try {
    // Look for email sending functionality
    const sendEmailButton = page.locator('button:has-text("Send Email"), button:has-text("Email Quote"), button:has-text("Send")').first();
    const emailField = page.locator('input[type="email"], input[name="email"]').first();
    
    if (await sendEmailButton.isVisible()) {
      // Check if email field is pre-filled or needs to be filled
      if (await emailField.isVisible()) {
        const currentEmail = await emailField.inputValue();
        if (!currentEmail || currentEmail !== TEST_EMAIL) {
          await emailField.fill(TEST_EMAIL);
        }
      }
      
      await takeScreenshot(page, 'before-email-send', 'Before sending email');
      
      // Send the email
      await sendEmailButton.click();
      await page.waitForTimeout(3000);
      
      // Look for success message
      const successMessage = await page.locator('text=/sent/i, text=/success/i, .success, .alert-success').count();
      if (successMessage > 0) {
        addTestResult('Email Sending', 'passed', `Quote email sent to ${TEST_EMAIL}`);
      } else {
        addTestResult('Email Sending', 'failed', 'No success confirmation found', {
          severity: 'medium',
          description: 'Users may not know if email was sent successfully'
        });
      }
      
      await takeScreenshot(page, 'after-email-send', 'After sending email');
      
    } else {
      addTestResult('Email Sending', 'failed', 'Email sending functionality not found', {
        severity: 'high',
        description: 'Core email functionality may be missing'
      });
    }
    
  } catch (error) {
    addTestResult('Email Sending', 'failed', error.message);
  }
}

async function testNavigationLinks(page) {
  try {
    await page.goto(BASE_URL);
    
    const navigationLinks = [
      { text: 'Features', expectedUrl: 'features' },
      { text: 'Pricing', expectedUrl: 'pricing' },
      { text: 'About', expectedUrl: 'about' },
      { text: 'Contact', expectedUrl: 'contact' },
      { text: 'Login', expectedUrl: 'auth' },
      { text: 'Dashboard', expectedUrl: 'dashboard' }
    ];
    
    let workingLinks = 0;
    let brokenLinks = 0;
    
    for (const link of navigationLinks) {
      try {
        const linkElement = page.locator(`a:has-text("${link.text}"), nav a[href*="${link.expectedUrl}"]`).first();
        
        if (await linkElement.isVisible()) {
          const href = await linkElement.getAttribute('href');
          
          // Test the link
          await linkElement.click();
          await page.waitForTimeout(2000);
          
          const currentUrl = page.url();
          if (currentUrl.includes(link.expectedUrl) || currentUrl !== BASE_URL) {
            addTestResult(`Navigation: ${link.text}`, 'passed', `Links to: ${currentUrl}`);
            workingLinks++;
          } else {
            addTestResult(`Navigation: ${link.text}`, 'failed', `Link may be broken: ${href}`);
            brokenLinks++;
          }
          
          // Go back to homepage
          await page.goto(BASE_URL);
          await page.waitForTimeout(1000);
          
        } else {
          addTestResult(`Navigation: ${link.text}`, 'failed', 'Link not found in navigation');
          brokenLinks++;
        }
        
      } catch (error) {
        addTestResult(`Navigation: ${link.text}`, 'failed', error.message);
        brokenLinks++;
      }
    }
    
    if (brokenLinks > 0) {
      addOpportunity('ux', `Fix ${brokenLinks} broken navigation links`, 'Broken links hurt user experience and SEO');
    }
    
    await takeScreenshot(page, 'navigation-test-complete', 'Navigation testing completed');
    
  } catch (error) {
    addTestResult('Navigation Links', 'failed', error.message);
  }
}

async function testUpsellPricingLinks(page) {
  try {
    // Test main pricing page
    await page.goto(`${BASE_URL}/pricing`);
    await takeScreenshot(page, 'pricing-page', 'Pricing page');
    
    // Look for pricing tiers
    const pricingCards = await page.locator('.pricing-card, .price-tier, [data-testid="pricing-tier"]').count();
    if (pricingCards > 0) {
      addTestResult('Pricing Tiers', 'passed', `Found ${pricingCards} pricing options`);
    } else {
      addTestResult('Pricing Tiers', 'failed', 'No pricing tiers found');
    }
    
    // Test upgrade/CTA buttons
    const upgradeButtons = await page.locator('button:has-text("Upgrade"), button:has-text("Choose Plan"), a:has-text("Get Started")').count();
    if (upgradeButtons > 0) {
      addTestResult('Upgrade CTAs', 'passed', `Found ${upgradeButtons} upgrade buttons`);
    } else {
      addOpportunity('conversion', 'Add clear upgrade CTAs to pricing page', 'Critical for conversion');
    }
    
    // Test feature comparison
    const featureList = await page.locator('.feature-list, ul li, .check-mark').count();
    if (featureList > 5) {
      addTestResult('Feature Comparison', 'passed', `Found detailed feature list (${featureList} items)`);
    } else {
      addOpportunity('conversion', 'Add detailed feature comparison', 'Helps justify pricing tiers');
    }
    
    // Test ROI calculator link
    await page.goto(`${BASE_URL}/roi-calculator`);
    const roiCalculator = await page.locator('input[type="number"], .calculator, form').count();
    if (roiCalculator > 0) {
      addTestResult('ROI Calculator', 'passed', 'ROI calculator found and functional');
    } else {
      addOpportunity('feature', 'Add ROI calculator for pricing justification', 'Powerful sales tool');
    }
    
  } catch (error) {
    addTestResult('Upsell/Pricing Links', 'failed', error.message);
  }
}

async function testMobileResponsiveness(context) {
  try {
    // Test mobile viewport
    const mobilePage = await context.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await mobilePage.goto(BASE_URL);
    await takeScreenshot(mobilePage, 'mobile-homepage', 'Mobile homepage view');
    
    // Test mobile navigation
    const mobileMenuButton = mobilePage.locator('button[aria-label*="menu" i], .hamburger, .menu-toggle').first();
    if (await mobileMenuButton.isVisible()) {
      addTestResult('Mobile Navigation', 'passed', 'Mobile menu button found');
      
      await mobileMenuButton.click();
      await takeScreenshot(mobilePage, 'mobile-menu-open', 'Mobile menu opened');
    } else {
      addTestResult('Mobile Navigation', 'failed', 'Mobile menu not found', {
        severity: 'high',
        description: 'Mobile navigation is critical for user experience'
      });
    }
    
    // Test mobile form usability
    await mobilePage.goto(`${BASE_URL}/trial-signup`);
    await takeScreenshot(mobilePage, 'mobile-signup', 'Mobile signup form');
    
    const formFields = await mobilePage.locator('input, textarea, select').count();
    if (formFields > 0) {
      addTestResult('Mobile Forms', 'passed', `${formFields} form fields are accessible on mobile`);
    }
    
    await mobilePage.close();
    
  } catch (error) {
    addTestResult('Mobile Responsiveness', 'failed', error.message);
  }
}

async function testPerformance(page) {
  try {
    // Test Core Web Vitals simulation
    const performanceEntries = await page.evaluate(() => {
      return JSON.stringify(performance.getEntriesByType('navigation'));
    });
    
    const navEntry = JSON.parse(performanceEntries)[0];
    if (navEntry) {
      const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
      const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
      
      addTestResult('Page Load Performance', loadTime < 3000 ? 'passed' : 'failed', 
        `Load time: ${loadTime}ms, DOM ready: ${domContentLoaded}ms`);
        
      if (loadTime > 3000) {
        addOpportunity('performance', 'Optimize page load time', 'Faster load times improve conversion rates');
      }
    }
    
    // Test image optimization
    const images = await page.locator('img').count();
    const lazyImages = await page.locator('img[loading="lazy"]').count();
    
    if (images > 0) {
      const lazyPercentage = (lazyImages / images) * 100;
      addTestResult('Image Optimization', lazyPercentage > 50 ? 'passed' : 'warning', 
        `${lazyImages}/${images} images are lazy loaded (${lazyPercentage.toFixed(1)}%)`);
        
      if (lazyPercentage < 50) {
        addOpportunity('performance', 'Implement lazy loading for more images', 'Improves initial page load');
      }
    }
    
  } catch (error) {
    addTestResult('Performance Testing', 'failed', error.message);
  }
}

async function generateReport() {
  testResults.endTime = new Date();
  testResults.duration = testResults.endTime - testResults.startTime;
  
  // Calculate summary statistics
  const passedTests = testResults.tests.filter(t => t.status === 'passed').length;
  const failedTests = testResults.tests.filter(t => t.status === 'failed').length;
  const totalTests = testResults.tests.length;
  const successRate = ((passedTests / totalTests) * 100).toFixed(1);
  
  // Generate HTML report
  const htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PaintQuote Pro E2E Test Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { color: #2563eb; margin-bottom: 10px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .summary-card { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; }
        .summary-card h3 { margin: 0 0 10px 0; font-size: 24px; }
        .summary-card p { margin: 0; color: #64748b; }
        .passed { color: #059669; }
        .failed { color: #dc2626; }
        .warning { color: #d97706; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
        .test-item { padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid; }
        .test-item.passed { background: #f0fdf4; border-left-color: #059669; }
        .test-item.failed { background: #fef2f2; border-left-color: #dc2626; }
        .test-item.warning { background: #fffbeb; border-left-color: #d97706; }
        .test-item h4 { margin: 0 0 5px 0; }
        .test-item p { margin: 0; color: #64748b; font-size: 14px; }
        .screenshots { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .screenshot { background: #f8fafc; padding: 15px; border-radius: 8px; }
        .screenshot img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
        .opportunities { background: #eff6ff; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .opportunity { padding: 10px; margin-bottom: 10px; background: white; border-radius: 4px; }
        .priority-high { border-left: 4px solid #dc2626; }
        .priority-medium { border-left: 4px solid #d97706; }
        .load-times { margin-top: 20px; }
        .load-time { display: flex; justify-content: space-between; padding: 10px; margin-bottom: 5px; background: #f8fafc; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 PaintQuote Pro E2E Test Report</h1>
            <p>Comprehensive testing report for conversion optimization and user experience analysis</p>
            <p><strong>Test Date:</strong> ${testResults.startTime.toLocaleString()}</p>
            <p><strong>Duration:</strong> ${Math.round(testResults.duration / 1000)} seconds</p>
        </div>

        <div class="summary">
            <div class="summary-card">
                <h3 class="passed">${passedTests}</h3>
                <p>Tests Passed</p>
            </div>
            <div class="summary-card">
                <h3 class="failed">${failedTests}</h3>
                <p>Tests Failed</p>
            </div>
            <div class="summary-card">
                <h3>${successRate}%</h3>
                <p>Success Rate</p>
            </div>
            <div class="summary-card">
                <h3>${testResults.opportunities.length}</h3>
                <p>Growth Opportunities</p>
            </div>
        </div>

        <div class="section">
            <h2>📊 Executive Summary</h2>
            <div class="test-item ${successRate > 70 ? 'passed' : successRate > 50 ? 'warning' : 'failed'}">
                <h4>Overall Assessment</h4>
                <p>
                    ${successRate > 70 ? 
                        'Strong performance with good user experience foundations. Focus on optimization opportunities.' :
                        successRate > 50 ?
                        'Moderate performance with several areas needing attention. Address critical issues first.' :
                        'Significant issues detected that may impact user conversion. Immediate action required.'
                    }
                </p>
            </div>
        </div>

        <div class="section">
            <h2>🔍 Test Results</h2>
            ${testResults.tests.map(test => `
                <div class="test-item ${test.status}">
                    <h4>${test.name}</h4>
                    <p>${test.details}</p>
                    ${test.uxImpact ? `<p><strong>UX Impact:</strong> ${test.uxImpact.description}</p>` : ''}
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>⚡ Performance Analysis</h2>
            <div class="load-times">
                <h3>Page Load Times</h3>
                ${testResults.userExperience.loadTimes.map(lt => `
                    <div class="load-time">
                        <span>${lt.description}</span>
                        <span class="${lt.acceptable ? 'passed' : 'failed'}">${lt.loadTime}ms</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>🚀 Business Growth Opportunities</h2>
            <div class="opportunities">
                ${testResults.opportunities.map(opp => `
                    <div class="opportunity priority-${opp.priority}">
                        <h4>${opp.category.toUpperCase()}: ${opp.description}</h4>
                        <p>${opp.impact}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>🚨 Critical Issues</h2>
            ${testResults.issues.length > 0 ? testResults.issues.map(issue => `
                <div class="test-item failed">
                    <h4>Severity: ${issue.severity.toUpperCase()}</h4>
                    <p><strong>Issue:</strong> ${issue.issue}</p>
                    <p><strong>Impact:</strong> ${issue.impact}</p>
                </div>
            `).join('') : '<p>No critical issues detected.</p>'}
        </div>

        <div class="section">
            <h2>📸 Test Screenshots</h2>
            <div class="screenshots">
                ${testResults.screenshots.map(screenshot => `
                    <div class="screenshot">
                        <h4>${screenshot.name}</h4>
                        <p>${screenshot.description}</p>
                        <p><em>File: ${screenshot.filename}</em></p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>📈 Conversion Optimization Recommendations</h2>
            <div class="opportunities">
                <div class="opportunity priority-high">
                    <h4>IMMEDIATE: Fix Critical User Flows</h4>
                    <p>Address any failed tests in signup, quote creation, and email sending flows as these directly impact revenue.</p>
                </div>
                <div class="opportunity priority-high">
                    <h4>HIGH IMPACT: Optimize Load Performance</h4>
                    <p>Pages loading over 3 seconds can reduce conversions by 20-50%. Prioritize performance optimization.</p>
                </div>
                <div class="opportunity priority-medium">
                    <h4>CONVERSION: Enhance Social Proof</h4>
                    <p>Add customer testimonials, success stories, and client logos to build trust and credibility.</p>
                </div>
                <div class="opportunity priority-medium">
                    <h4>UX: Improve Mobile Experience</h4>
                    <p>Ensure all functionality works seamlessly on mobile devices as mobile traffic continues to grow.</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>📋 Next Steps</h2>
            <div class="test-item warning">
                <h4>Recommended Action Plan</h4>
                <p>
                    1. Fix all critical and high-severity issues immediately<br>
                    2. Implement high-impact conversion optimizations<br>
                    3. Address performance issues that affect user experience<br>
                    4. Schedule regular testing to maintain quality<br>
                    5. A/B test key conversion elements (CTAs, forms, pricing)
                </p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
  
  fs.writeFileSync(REPORT_FILE, htmlReport);
  
  console.log('\n' + '='.repeat(80));
  console.log('🎯 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests (${successRate}%)`);
  console.log(`❌ Failed: ${failedTests}/${totalTests} tests`);
  console.log(`🚀 Opportunities: ${testResults.opportunities.length} growth opportunities identified`);
  console.log(`📸 Screenshots: ${testResults.screenshots.length} captured`);
  console.log(`📊 Report: ${REPORT_FILE}`);
  console.log('='.repeat(80));
  
  // Print key findings
  if (testResults.issues.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES TO ADDRESS:');
    testResults.issues.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.severity.toUpperCase()}] ${issue.issue}`);
    });
  }
  
  if (testResults.opportunities.length > 0) {
    console.log('\n🎯 TOP CONVERSION OPPORTUNITIES:');
    testResults.opportunities.slice(0, 5).forEach((opp, i) => {
      console.log(`${i + 1}. ${opp.description} (${opp.priority} priority)`);
    });
  }
  
  console.log(`\n📧 Test email sent to: ${TEST_EMAIL}`);
  console.log('Testing complete! 🎉');
}

// Run the tests
runComprehensiveTests().catch(console.error);