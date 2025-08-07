/**
 * PaintQuote Pro Link Audit Test Suite
 * Tests all navigation links, footer links, mobile menu links, and dashboard navigation
 */

const puppeteer = require('puppeteer');

class LinkAuditTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:3005';
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      errors: []
    };
  }

  async setup() {
    this.browser = await puppeteer.launch({ 
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    
    // Set longer timeout for slow networks
    this.page.setDefaultTimeout(30000);
    this.page.setDefaultNavigationTimeout(30000);
  }

  async teardown() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`[${timestamp}] ${prefix} ${message}`);
    
    if (type === 'error') {
      this.results.failed++;
      this.results.errors.push(message);
    } else if (type === 'warning') {
      this.results.warnings++;
    } else if (type === 'success') {
      this.results.passed++;
    }
  }

  async testLink(url, description, shouldBeExternal = false) {
    try {
      this.log(`Testing ${description}: ${url}`);
      
      if (shouldBeExternal) {
        // For external links, just check if they're properly formatted
        if (url.startsWith('http://') || url.startsWith('https://')) {
          this.log(`✅ External link properly formatted: ${description}`, 'success');
          return true;
        } else {
          this.log(`❌ External link not properly formatted: ${description}`, 'error');
          return false;
        }
      }

      const response = await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      
      if (response && response.ok()) {
        this.log(`✅ ${description} loads successfully`, 'success');
        return true;
      } else {
        this.log(`❌ ${description} failed to load (Status: ${response ? response.status() : 'unknown'})`, 'error');
        return false;
      }
    } catch (error) {
      this.log(`❌ Error testing ${description}: ${error.message}`, 'error');
      return false;
    }
  }

  async testMainNavigation() {
    this.log('\n🔍 Testing Main Navigation Links', 'info');
    
    await this.page.goto(`${this.baseUrl}`, { waitUntil: 'domcontentloaded' });
    
    const navigationLinks = [
      { url: `${this.baseUrl}/`, description: 'Home Page' },
      { url: `${this.baseUrl}/features`, description: 'Features Page' },
      { url: `${this.baseUrl}/pricing`, description: 'Pricing Page' },
      { url: `${this.baseUrl}/solutions`, description: 'Solutions Page' },
      { url: `${this.baseUrl}/about`, description: 'About Page' },
      { url: `${this.baseUrl}/contact`, description: 'Contact Page' },
      { url: `${this.baseUrl}/help`, description: 'Help Page' }
    ];

    for (const link of navigationLinks) {
      await this.testLink(link.url, link.description);
    }
  }

  async testSoftwareDropdownLinks() {
    this.log('\n🔍 Testing Software Dropdown Links', 'info');
    
    const softwareLinks = [
      { url: `${this.baseUrl}/painting-contractor-software`, description: 'Painting Contractor Software' },
      { url: `${this.baseUrl}/painting-estimate-software`, description: 'Estimate Software' },
      { url: `${this.baseUrl}/painting-quote-software`, description: 'Quote Software' },
      { url: `${this.baseUrl}/painting-business-software`, description: 'Business Software' },
      { url: `${this.baseUrl}/commercial-painting-estimating-software`, description: 'Commercial Estimating Software' },
      { url: `${this.baseUrl}/mobile-painting-estimate-app`, description: 'Mobile Estimate App' }
    ];

    for (const link of softwareLinks) {
      await this.testLink(link.url, link.description);
    }
  }

  async testSolutionsLinks() {
    this.log('\n🔍 Testing Solutions Links', 'info');
    
    const solutionsLinks = [
      { url: `${this.baseUrl}/solutions/residential`, description: 'Residential Solutions' },
      { url: `${this.baseUrl}/solutions/commercial`, description: 'Commercial Solutions' },
      { url: `${this.baseUrl}/solutions/franchise`, description: 'Franchise Solutions' },
      { url: `${this.baseUrl}/solutions/enterprise`, description: 'Enterprise Solutions' },
      { url: `${this.baseUrl}/solutions/startups`, description: 'Startup Solutions' }
    ];

    for (const link of solutionsLinks) {
      await this.testLink(link.url, link.description);
    }
  }

  async testCalculatorLinks() {
    this.log('\n🔍 Testing Calculator & Tool Links', 'info');
    
    const calculatorLinks = [
      { url: `${this.baseUrl}/paint-quote-calculator`, description: 'Paint Quote Calculator' },
      { url: `${this.baseUrl}/interior-painting-quote-calculator`, description: 'Interior Painting Calculator' },
      { url: `${this.baseUrl}/exterior-painting-estimate-calculator`, description: 'Exterior Painting Calculator' },
      { url: `${this.baseUrl}/paint-cost-calculator`, description: 'Paint Cost Calculator' },
      { url: `${this.baseUrl}/apartment-painting-quote`, description: 'Apartment Painting Quote' },
      { url: `${this.baseUrl}/painting-estimate-calculator-free`, description: 'Free Estimate Calculator' },
      { url: `${this.baseUrl}/roi-calculator`, description: 'ROI Calculator' }
    ];

    for (const link of calculatorLinks) {
      await this.testLink(link.url, link.description);
    }
  }

  async testGuidesLinks() {
    this.log('\n🔍 Testing Guides Links', 'info');
    
    const guidesLinks = [
      { url: `${this.baseUrl}/guides`, description: 'Guides Main Page' },
      { url: `${this.baseUrl}/guides/how-to-quote-painting-jobs`, description: 'How to Quote Guide' },
      { url: `${this.baseUrl}/guides/interior-painting-quotes`, description: 'Interior Painting Quotes Guide' },
      { url: `${this.baseUrl}/guides/exterior-painting-quotes`, description: 'Exterior Painting Quotes Guide' },
      { url: `${this.baseUrl}/guides/commercial-painting-quotes`, description: 'Commercial Painting Quotes Guide' },
      { url: `${this.baseUrl}/guides/paint-calculator`, description: 'Paint Calculator Guide' },
      { url: `${this.baseUrl}/guides/labor-cost-estimation`, description: 'Labor Cost Estimation Guide' },
      { url: `${this.baseUrl}/guides/pricing-psychology`, description: 'Pricing Psychology Guide' }
    ];

    for (const link of guidesLinks) {
      await this.testLink(link.url, link.description);
    }
  }

  async testStripePaymentLinks() {
    this.log('\n🔍 Testing Stripe Payment Links', 'info');
    
    // Go to pricing page to test payment buttons
    await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
    
    // Test Professional Plan Links
    try {
      // Check for Stripe environment variables or fallback URLs
      const professionalMonthlyUrl = process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_MONTHLY_URL || 'https://buy.stripe.com/test_professional_monthly';
      const professionalYearlyUrl = process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_YEARLY_URL || 'https://buy.stripe.com/test_professional_yearly';
      
      this.log(`Professional Monthly Stripe URL: ${professionalMonthlyUrl}`, 'info');
      this.log(`Professional Yearly Stripe URL: ${professionalYearlyUrl}`, 'info');
      
      // Test Business Plan Links (hardcoded in component)
      const businessMonthlyUrl = 'https://buy.stripe.com/bJe7sL5WucqObuF98X5EY02';
      const businessYearlyUrl = 'https://buy.stripe.com/14AaEXgB80I66al84T5EY03';
      
      await this.testLink(businessMonthlyUrl, 'Business Plan Monthly Stripe Link', true);
      await this.testLink(businessYearlyUrl, 'Business Plan Yearly Stripe Link', true);
      
      this.log('✅ Stripe payment links format validation complete', 'success');
      
    } catch (error) {
      this.log(`❌ Error testing Stripe payment links: ${error.message}`, 'error');
    }
  }

  async testAuthenticationFlows() {
    this.log('\n🔍 Testing Authentication Flow Links', 'info');
    
    const authLinks = [
      { url: `${this.baseUrl}/auth/signup`, description: 'Sign Up Page' },
      { url: `${this.baseUrl}/auth/signin`, description: 'Sign In Page' },
      { url: `${this.baseUrl}/access-code`, description: 'Access Code Page' },
      { url: `${this.baseUrl}/trial-signup`, description: 'Trial Signup Page' },
      { url: `${this.baseUrl}/logout`, description: 'Logout Page' }
    ];

    for (const link of authLinks) {
      await this.testLink(link.url, link.description);
    }
  }

  async testMobileMenuLinks() {
    this.log('\n🔍 Testing Mobile Menu Links', 'info');
    
    await this.page.goto(`${this.baseUrl}`, { waitUntil: 'domcontentloaded' });
    
    // Set mobile viewport
    await this.page.setViewport({ width: 375, height: 667 });
    
    try {
      // Look for mobile menu trigger
      const mobileMenuButton = await this.page.$('[data-testid="mobile-menu-button"], .mobile-menu-trigger, button[aria-label*="menu"]');
      
      if (mobileMenuButton) {
        await mobileMenuButton.click();
        this.log('✅ Mobile menu opens successfully', 'success');
        
        // Test if mobile menu links are accessible
        const mobileLinks = await this.page.$$eval('nav a', links => 
          links.map(link => ({ href: link.href, text: link.textContent.trim() }))
        );
        
        this.log(`Found ${mobileLinks.length} links in mobile navigation`, 'info');
        
        // Reset to desktop viewport
        await this.page.setViewport({ width: 1920, height: 1080 });
        
      } else {
        this.log('⚠️ Mobile menu button not found - check mobile navigation implementation', 'warning');
      }
      
    } catch (error) {
      this.log(`❌ Error testing mobile menu: ${error.message}`, 'error');
    }
  }

  async testDashboardNavigation() {
    this.log('\n🔍 Testing Dashboard Navigation (Unauthenticated)', 'info');
    
    // Test dashboard redirect when not authenticated
    const dashboardPages = [
      { url: `${this.baseUrl}/dashboard`, description: 'Dashboard Home' },
      { url: `${this.baseUrl}/dashboard/quotes`, description: 'Quotes Dashboard' },
      { url: `${this.baseUrl}/dashboard/customers`, description: 'Customers Dashboard' },
      { url: `${this.baseUrl}/dashboard/analytics`, description: 'Analytics Dashboard' },
      { url: `${this.baseUrl}/dashboard/settings`, description: 'Settings Dashboard' }
    ];

    for (const page of dashboardPages) {
      try {
        await this.page.goto(page.url, { waitUntil: 'domcontentloaded' });
        
        // Check if redirected to auth or shows auth prompt
        const currentUrl = this.page.url();
        if (currentUrl.includes('/auth/') || currentUrl.includes('/access-code')) {
          this.log(`✅ ${page.description} correctly redirects to authentication`, 'success');
        } else {
          this.log(`⚠️ ${page.description} may not have proper auth protection`, 'warning');
        }
        
      } catch (error) {
        this.log(`❌ Error testing ${page.description}: ${error.message}`, 'error');
      }
    }
  }

  async testFooterLinks() {
    this.log('\n🔍 Testing Footer Links', 'info');
    
    await this.page.goto(`${this.baseUrl}`, { waitUntil: 'domcontentloaded' });
    
    try {
      // Scroll to footer
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      await this.page.waitForTimeout(1000); // Wait for scroll
      
      // Get all footer links
      const footerLinks = await this.page.$$eval('footer a', links => 
        links.map(link => ({ 
          href: link.href, 
          text: link.textContent.trim(),
          isExternal: link.href.startsWith('http') && !link.href.includes('localhost')
        }))
      );
      
      this.log(`Found ${footerLinks.length} footer links`, 'info');
      
      for (const link of footerLinks) {
        if (link.href && link.text) {
          await this.testLink(link.href, `Footer: ${link.text}`, link.isExternal);
        }
      }
      
    } catch (error) {
      this.log(`❌ Error testing footer links: ${error.message}`, 'error');
    }
  }

  async testLocationPages() {
    this.log('\n🔍 Testing Location Pages', 'info');
    
    const locationPages = [
      { url: `${this.baseUrl}/locations/austin`, description: 'Austin Location Page' },
      { url: `${this.baseUrl}/locations/denver`, description: 'Denver Location Page' },
      { url: `${this.baseUrl}/locations/miami`, description: 'Miami Location Page' },
      { url: `${this.baseUrl}/locations/phoenix`, description: 'Phoenix Location Page' },
      { url: `${this.baseUrl}/locations/charlotte`, description: 'Charlotte Location Page' }
    ];

    for (const link of locationPages) {
      await this.testLink(link.url, link.description);
    }
  }

  async runAllTests() {
    console.log('🚀 Starting PaintQuote Pro Link Audit Tests\n');
    
    await this.setup();
    
    try {
      await this.testMainNavigation();
      await this.testSoftwareDropdownLinks();
      await this.testSolutionsLinks();
      await this.testCalculatorLinks();
      await this.testGuidesLinks();
      await this.testStripePaymentLinks();
      await this.testAuthenticationFlows();
      await this.testMobileMenuLinks();
      await this.testDashboardNavigation();
      await this.testFooterLinks();
      await this.testLocationPages();
      
    } catch (error) {
      this.log(`❌ Test suite error: ${error.message}`, 'error');
    }
    
    await this.teardown();
    
    // Print results summary
    console.log('\n📊 Link Audit Test Results Summary');
    console.log('=====================================');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️ Warnings: ${this.results.warnings}`);
    
    if (this.results.errors.length > 0) {
      console.log('\n🚨 Errors Found:');
      this.results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
    
    console.log(`\n📈 Overall Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
    
    return this.results;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new LinkAuditTester();
  tester.runAllTests().then((results) => {
    process.exit(results.failed > 0 ? 1 : 0);
  }).catch((error) => {
    console.error('Test suite failed:', error);
    process.exit(1);
  });
}

module.exports = LinkAuditTester;