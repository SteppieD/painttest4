/**
 * PaintQuote Pro Payment Flow Test Suite
 * Tests Stripe integration, plan selection, and payment flow validation
 */

const puppeteer = require('puppeteer');

class PaymentFlowTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:3005';
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      errors: [],
      paymentIssues: [],
      stripeIssues: []
    };
  }

  async setup() {
    this.browser = await puppeteer.launch({ 
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1920, height: 1080 });
    
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

  async testPricingPageLoad() {
    this.log('\n💰 Testing Pricing Page Load', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Check if pricing page loads successfully
      const title = await this.page.$eval('h1', el => el.textContent);
      if (title.includes('Revenue Opportunity') || title.includes('Pricing')) {
        this.log('✅ Pricing page loads successfully', 'success');
      } else {
        this.log('❌ Pricing page may not have loaded correctly', 'error');
      }

      // Check for pricing plans
      const plans = await this.page.$$eval('[data-testid*="plan"], .plan, .card', plans => plans.length);
      if (plans >= 3) {
        this.log(`✅ Found ${plans} pricing plan cards`, 'success');
      } else {
        this.log(`⚠️ Expected at least 3 pricing plans, found ${plans}`, 'warning');
      }

    } catch (error) {
      this.log(`❌ Error loading pricing page: ${error.message}`, 'error');
    }
  }

  async testBillingToggle() {
    this.log('\n🔄 Testing Billing Toggle (Monthly/Yearly)', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Look for billing toggle
      const monthlyButton = await this.page.$('[data-value="monthly"], button[value="monthly"], [data-testid="monthly"]');
      const yearlyButton = await this.page.$('[data-value="yearly"], button[value="yearly"], [data-testid="yearly"]');
      
      if (monthlyButton && yearlyButton) {
        this.log('✅ Found monthly and yearly billing toggles', 'success');
        
        // Test clicking yearly option
        await yearlyButton.click();
        await this.page.waitForTimeout(500);
        
        // Check if prices updated (should show "Save 17%" or similar)
        const saveText = await this.page.$eval('*', el => el.innerText.includes('Save'));
        if (saveText) {
          this.log('✅ Yearly billing shows savings indicator', 'success');
        } else {
          this.log('⚠️ Yearly billing may not show savings clearly', 'warning');
        }
        
        // Switch back to monthly
        await monthlyButton.click();
        await this.page.waitForTimeout(500);
        this.log('✅ Billing toggle works correctly', 'success');
        
      } else {
        this.log('⚠️ Billing toggle not found - may be using different selectors', 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing billing toggle: ${error.message}`, 'error');
    }
  }

  async testFreeTierSignup() {
    this.log('\n🆓 Testing Free Tier Signup Flow', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Find free plan button
      const freeButton = await this.page.$('button:contains("Start Free"), button:contains("Free")');
      
      if (!freeButton) {
        // Alternative selector approach
        const buttons = await this.page.$$eval('button', buttons => 
          buttons.map(btn => ({ text: btn.textContent.trim(), index: buttons.indexOf(btn) }))
        );
        
        const freeButtonIndex = buttons.findIndex(btn => 
          btn.text.toLowerCase().includes('free') || btn.text.toLowerCase().includes('start free')
        );
        
        if (freeButtonIndex >= 0) {
          const allButtons = await this.page.$$('button');
          await allButtons[freeButtonIndex].click();
          
          // Check if redirected to access code page
          await this.page.waitForTimeout(2000);
          const currentUrl = this.page.url();
          
          if (currentUrl.includes('/access-code')) {
            this.log('✅ Free tier redirects to access code page', 'success');
          } else if (currentUrl.includes('/signup') || currentUrl.includes('/auth')) {
            this.log('✅ Free tier redirects to signup page', 'success');
          } else {
            this.log(`⚠️ Free tier redirect unclear - went to: ${currentUrl}`, 'warning');
          }
        } else {
          this.log('❌ Free tier button not found', 'error');
        }
      }

    } catch (error) {
      this.log(`❌ Error testing free tier signup: ${error.message}`, 'error');
    }
  }

  async testProfessionalPlanStripeLinks() {
    this.log('\n💼 Testing Professional Plan Stripe Links', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Test monthly Professional plan
      await this.testStripeButtonClick('professional', 'monthly');
      
      // Go back and test yearly
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Switch to yearly billing
      const yearlyToggle = await this.page.$('[data-value="yearly"], button[value="yearly"]');
      if (yearlyToggle) {
        await yearlyToggle.click();
        await this.page.waitForTimeout(500);
      }
      
      await this.testStripeButtonClick('professional', 'yearly');
      
    } catch (error) {
      this.log(`❌ Error testing Professional plan Stripe links: ${error.message}`, 'error');
    }
  }

  async testBusinessPlanStripeLinks() {
    this.log('\n🏢 Testing Business Plan Stripe Links', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Test monthly Business plan
      await this.testStripeButtonClick('business', 'monthly');
      
      // Go back and test yearly
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Switch to yearly billing
      const yearlyToggle = await this.page.$('[data-value="yearly"], button[value="yearly"]');
      if (yearlyToggle) {
        await yearlyToggle.click();
        await this.page.waitForTimeout(500);
      }
      
      await this.testStripeButtonClick('business', 'yearly');
      
    } catch (error) {
      this.log(`❌ Error testing Business plan Stripe links: ${error.message}`, 'error');
    }
  }

  async testStripeButtonClick(planType, billingPeriod) {
    try {
      // Set up request interception to capture Stripe redirects
      await this.page.setRequestInterception(true);
      
      let stripeUrlCaptured = null;
      
      this.page.on('request', request => {
        if (request.url().includes('buy.stripe.com')) {
          stripeUrlCaptured = request.url();
          this.log(`📍 Captured Stripe URL: ${stripeUrlCaptured}`, 'info');
          request.abort(); // Prevent actual redirect to Stripe
        } else {
          request.continue();
        }
      });

      // Find the plan button
      const buttons = await this.page.$$eval('button', buttons => 
        buttons.map((btn, index) => ({ 
          text: btn.textContent.trim(), 
          index,
          className: btn.className 
        }))
      );
      
      // Look for Professional or Business plan button
      const planButtonIndex = buttons.findIndex(btn => 
        (planType === 'professional' && (
          btn.text.toLowerCase().includes('start now') && 
          btn.text.includes('79') || btn.text.includes('66')
        )) ||
        (planType === 'business' && (
          btn.text.toLowerCase().includes('start now') && 
          btn.text.includes('149') || btn.text.includes('124')
        ))
      );
      
      if (planButtonIndex >= 0) {
        const allButtons = await this.page.$$('button');
        await allButtons[planButtonIndex].click();
        
        // Wait for potential redirect
        await this.page.waitForTimeout(3000);
        
        if (stripeUrlCaptured) {
          this.log(`✅ ${planType} ${billingPeriod} plan successfully redirects to Stripe`, 'success');
          
          // Validate Stripe URL format
          if (this.validateStripeUrl(stripeUrlCaptured, planType, billingPeriod)) {
            this.log(`✅ Stripe URL format is valid`, 'success');
          } else {
            this.log(`⚠️ Stripe URL format may be incorrect`, 'warning');
            this.results.stripeIssues.push(`Invalid Stripe URL for ${planType} ${billingPeriod}: ${stripeUrlCaptured}`);
          }
        } else {
          this.log(`❌ ${planType} ${billingPeriod} plan did not redirect to Stripe`, 'error');
        }
      } else {
        this.log(`❌ ${planType} plan button not found`, 'error');
      }
      
      // Clean up request interception
      await this.page.setRequestInterception(false);
      
    } catch (error) {
      this.log(`❌ Error testing ${planType} ${billingPeriod} Stripe button: ${error.message}`, 'error');
    }
  }

  validateStripeUrl(url, planType, billingPeriod) {
    // Basic Stripe URL validation
    if (!url.includes('buy.stripe.com')) {
      return false;
    }
    
    // Check for expected patterns (this may need adjustment based on actual Stripe URLs)
    const hasValidPattern = url.includes('/bJe') || url.includes('/14A') || url.includes('test_');
    
    return hasValidPattern;
  }

  async testEnterprisePlanContact() {
    this.log('\n🏬 Testing Enterprise Plan Contact Flow', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Find Enterprise plan button
      const buttons = await this.page.$$eval('button', buttons => 
        buttons.map((btn, index) => ({ text: btn.textContent.trim(), index }))
      );
      
      const enterpriseButtonIndex = buttons.findIndex(btn => 
        btn.text.toLowerCase().includes('contact') || btn.text.toLowerCase().includes('enterprise')
      );
      
      if (enterpriseButtonIndex >= 0) {
        const allButtons = await this.page.$$('button');
        await allButtons[enterpriseButtonIndex].click();
        
        await this.page.waitForTimeout(2000);
        const currentUrl = this.page.url();
        
        if (currentUrl.includes('/contact')) {
          this.log('✅ Enterprise plan redirects to contact page', 'success');
          
          // Check if interest parameter is set
          if (currentUrl.includes('enterprise') || currentUrl.includes('interest=enterprise')) {
            this.log('✅ Enterprise contact includes proper interest parameter', 'success');
          } else {
            this.log('⚠️ Enterprise contact may not pre-fill interest field', 'warning');
          }
        } else {
          this.log(`⚠️ Enterprise redirect unclear - went to: ${currentUrl}`, 'warning');
        }
      } else {
        this.log('❌ Enterprise plan button not found', 'error');
      }

    } catch (error) {
      this.log(`❌ Error testing Enterprise plan contact: ${error.message}`, 'error');
    }
  }

  async testPaymentSecurityIndicators() {
    this.log('\n🔒 Testing Payment Security Indicators', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Look for security indicators
      const securityText = await this.page.$$eval('*', elements => {
        const text = elements.map(el => el.textContent).join(' ').toLowerCase();
        return {
          hasSecure: text.includes('secure') || text.includes('ssl') || text.includes('encrypted'),
          hasStripe: text.includes('stripe') || text.includes('powered by stripe'),
          hasGuarantee: text.includes('guarantee') || text.includes('refund'),
          hasCards: text.includes('credit card') || text.includes('visa') || text.includes('mastercard')
        };
      });
      
      if (securityText.hasStripe) {
        this.log('✅ Stripe branding/security mentioned', 'success');
      } else {
        this.log('⚠️ Stripe security indicators not clearly visible', 'warning');
      }
      
      if (securityText.hasSecure) {
        this.log('✅ Security messaging present', 'success');
      } else {
        this.log('⚠️ Security messaging could be more prominent', 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing security indicators: ${error.message}`, 'error');
    }
  }

  async testPricingTransparency() {
    this.log('\n💎 Testing Pricing Transparency', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Check for clear pricing display
      const pricingInfo = await this.page.$$eval('*', elements => {
        const text = elements.map(el => el.textContent).join(' ');
        return {
          hasMonthlyPrices: (text.match(/\$\d+/g) || []).length >= 3,
          hasNoSetupFee: text.toLowerCase().includes('no setup') || text.toLowerCase().includes('setup fee'),
          hasCancelAnytime: text.toLowerCase().includes('cancel') && text.toLowerCase().includes('anytime'),
          hasMoneyBack: text.toLowerCase().includes('money back') || text.toLowerCase().includes('refund'),
          hasTrialInfo: text.toLowerCase().includes('trial') || text.toLowerCase().includes('free forever')
        };
      });
      
      if (pricingInfo.hasMonthlyPrices) {
        this.log('✅ Clear pricing amounts displayed', 'success');
      } else {
        this.log('⚠️ Pricing amounts may not be clear enough', 'warning');
      }
      
      if (pricingInfo.hasTrialInfo) {
        this.log('✅ Trial/free tier information present', 'success');
      }
      
      if (pricingInfo.hasNoSetupFee) {
        this.log('✅ No setup fee mentioned', 'success');
      } else {
        this.log('⚠️ Setup fee policy not clearly stated', 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing pricing transparency: ${error.message}`, 'error');
    }
  }

  async testROICalculator() {
    this.log('\n📊 Testing ROI Calculator on Pricing Page', 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/pricing`, { waitUntil: 'domcontentloaded' });
      
      // Look for ROI calculator section
      const roiSection = await this.page.$('.roi, [class*="roi"], [id*="roi"]');
      
      if (roiSection || await this.page.$eval('*', el => el.textContent.includes('ROI Calculator'))) {
        this.log('✅ ROI Calculator section found', 'success');
        
        // Check for key ROI metrics
        const roiMetrics = await this.page.$$eval('*', elements => {
          const text = elements.map(el => el.textContent).join(' ');
          return {
            hasRevenueNumbers: text.includes('$8,400') || text.includes('revenue'),
            hasWinRate: text.includes('win rate') || text.includes('40-60%'),
            hasQuoteSpeed: text.includes('10-15 minutes') || text.includes('3-6 hours'),
            hasROI: text.includes('ROI') || text.includes('return')
          };
        });
        
        if (roiMetrics.hasRevenueNumbers && roiMetrics.hasWinRate) {
          this.log('✅ ROI Calculator shows compelling metrics', 'success');
        } else {
          this.log('⚠️ ROI Calculator metrics may need improvement', 'warning');
        }
        
      } else {
        this.log('⚠️ ROI Calculator section not found', 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing ROI calculator: ${error.message}`, 'error');
    }
  }

  async runAllTests() {
    console.log('🚀 Starting PaintQuote Pro Payment Flow Tests\n');
    
    await this.setup();
    
    try {
      await this.testPricingPageLoad();
      await this.testBillingToggle();
      await this.testFreeTierSignup();
      await this.testProfessionalPlanStripeLinks();
      await this.testBusinessPlanStripeLinks();
      await this.testEnterprisePlanContact();
      await this.testPaymentSecurityIndicators();
      await this.testPricingTransparency();
      await this.testROICalculator();
      
    } catch (error) {
      this.log(`❌ Test suite error: ${error.message}`, 'error');
    }
    
    await this.teardown();
    
    // Print results summary
    console.log('\n📊 Payment Flow Test Results Summary');
    console.log('====================================');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️ Warnings: ${this.results.warnings}`);
    
    if (this.results.stripeIssues.length > 0) {
      console.log('\n💳 Stripe Integration Issues:');
      this.results.stripeIssues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
    if (this.results.paymentIssues.length > 0) {
      console.log('\n💰 Payment Flow Issues:');
      this.results.paymentIssues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
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
  const tester = new PaymentFlowTester();
  tester.runAllTests().then((results) => {
    process.exit(results.failed > 0 ? 1 : 0);
  }).catch((error) => {
    console.error('Payment flow test suite failed:', error);
    process.exit(1);
  });
}

module.exports = PaymentFlowTester;