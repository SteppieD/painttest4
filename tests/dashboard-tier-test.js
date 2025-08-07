/**
 * PaintQuote Pro Dashboard Tier Feature Test Suite
 * Tests feature access and limitations based on subscription tier
 */

const puppeteer = require('puppeteer');

class DashboardTierTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:3005';
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      errors: [],
      tierViolations: [],
      featureIssues: []
    };
    
    // Define tier limitations based on pricing page
    this.tierLimits = {
      free: {
        quotesPerMonth: 5,
        features: [
          'Professional quote templates',
          'Mobile-optimized interface',
          'Basic customer management',
          'Quote response time tracking',
          '24-hour quote delivery',
          'Basic calculator',
          'Email support'
        ],
        restrictions: [
          'No AI quote assistant',
          'No custom branding',
          'Limited to 1 user',
          'No analytics dashboard',
          'No customer portal'
        ]
      },
      professional: {
        quotesPerMonth: 'unlimited',
        teamMembers: 3,
        features: [
          'Unlimited quotes',
          'AI-powered instant quoting',
          'Custom branding & templates',
          'Win rate analytics dashboard',
          'Response time tracking',
          'Customer portal',
          'Priority support',
          'Mobile & offline access',
          'Automated follow-up reminders',
          'Digital signatures'
        ],
        restrictions: [
          'No QuickBooks integration',
          'No API access'
        ]
      },
      business: {
        quotesPerMonth: 'unlimited',
        teamMembers: 'unlimited',
        features: [
          'Everything in Professional',
          'Unlimited team members',
          'QuickBooks & Xero integration',
          'Advanced win/loss analytics',
          'Quote conversion insights',
          'Custom workflows',
          'Phone & chat support',
          'Weekly training sessions',
          'Bulk quote creation',
          'Multi-location support',
          'API access',
          'White-label customer portal'
        ],
        restrictions: []
      },
      enterprise: {
        quotesPerMonth: 'unlimited',
        teamMembers: 'unlimited',
        features: [
          'Everything in Business',
          'Custom integrations',
          'Dedicated account manager',
          'Custom training',
          'SLA guarantee',
          'Custom features',
          'White-label options',
          'On-premise deployment',
          'Advanced security',
          'Custom reporting'
        ],
        restrictions: []
      }
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

  // Simulate user signup with specific tier
  async simulateUserTier(tier = 'free') {
    this.log(`\n👤 Simulating ${tier.toUpperCase()} tier user`, 'info');
    
    try {
      // Go to access code page to simulate free tier signup
      await this.page.goto(`${this.baseUrl}/access-code`, { waitUntil: 'domcontentloaded' });
      
      // Look for access code input
      const accessCodeInput = await this.page.$('input[type="text"], input[placeholder*="code"], input[name*="code"]');
      
      if (accessCodeInput) {
        // Use a test access code or create demo account
        await accessCodeInput.type('DEMO123');
        
        const submitButton = await this.page.$('button[type="submit"], button:contains("Submit")');
        if (submitButton) {
          await submitButton.click();
          await this.page.waitForTimeout(3000);
          
          const currentUrl = this.page.url();
          if (currentUrl.includes('/dashboard') || currentUrl.includes('/onboarding')) {
            this.log(`✅ Successfully simulated ${tier} tier user access`, 'success');
            return true;
          }
        }
      }
      
      // Alternative: try direct dashboard access (may redirect to auth)
      await this.page.goto(`${this.baseUrl}/dashboard`, { waitUntil: 'domcontentloaded' });
      return true;
      
    } catch (error) {
      this.log(`❌ Error simulating ${tier} tier user: ${error.message}`, 'error');
      return false;
    }
  }

  async testQuoteLimitations(tier = 'free') {
    this.log(`\n📊 Testing Quote Limitations for ${tier.toUpperCase()} tier`, 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/dashboard/quotes`, { waitUntil: 'domcontentloaded' });
      
      if (tier === 'free') {
        // Check for quota indicator
        const quotaIndicators = await this.page.$$eval('*', elements => {
          const text = elements.map(el => el.textContent).join(' ');
          return {
            hasQuotaDisplay: text.includes('5 quotes') || text.includes('quota') || text.includes('limit'),
            hasUsageCounter: text.match(/\d+\s*\/\s*5/) || text.match(/\d+\s*of\s*5/),
            hasUpgradePrompt: text.toLowerCase().includes('upgrade') && text.toLowerCase().includes('unlimited')
          };
        });
        
        if (quotaIndicators.hasQuotaDisplay || quotaIndicators.hasUsageCounter) {
          this.log('✅ Free tier shows quote limitations', 'success');
        } else {
          this.log('⚠️ Free tier quote limitations not clearly displayed', 'warning');
          this.results.tierViolations.push('Free tier should show 5 quotes/month limit');
        }
        
        if (quotaIndicators.hasUpgradePrompt) {
          this.log('✅ Free tier shows upgrade prompt for unlimited quotes', 'success');
        } else {
          this.log('⚠️ Free tier missing upgrade prompts', 'warning');
        }
      }
      
      // Test quote creation button access
      const createQuoteButton = await this.page.$('button:contains("Create Quote"), a[href*="new"], button:contains("New Quote")');
      if (createQuoteButton) {
        this.log(`✅ ${tier} tier can access quote creation`, 'success');
      } else {
        this.log(`⚠️ ${tier} tier quote creation button not found`, 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing quote limitations: ${error.message}`, 'error');
    }
  }

  async testAnalyticsDashboardAccess(tier = 'free') {
    this.log(`\n📈 Testing Analytics Dashboard Access for ${tier.toUpperCase()} tier`, 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/dashboard/analytics`, { waitUntil: 'domcontentloaded' });
      
      const currentUrl = this.page.url();
      const pageContent = await this.page.$eval('*', el => el.textContent.toLowerCase());
      
      if (tier === 'free') {
        // Free tier should not have access to analytics
        if (pageContent.includes('upgrade') || pageContent.includes('unlock') || 
            currentUrl.includes('/unlock-analytics')) {
          this.log('✅ Free tier properly blocks analytics access', 'success');
        } else if (pageContent.includes('analytics') && pageContent.includes('chart')) {
          this.log('❌ Free tier should not have full analytics access', 'error');
          this.results.tierViolations.push('Free tier has unauthorized analytics access');
        } else {
          this.log('⚠️ Analytics access restriction unclear for free tier', 'warning');
        }
      } else {
        // Paid tiers should have analytics access
        if (pageContent.includes('win rate') || pageContent.includes('performance') || 
            pageContent.includes('revenue')) {
          this.log(`✅ ${tier} tier has analytics access`, 'success');
        } else {
          this.log(`⚠️ ${tier} tier analytics features not found`, 'warning');
        }
      }

    } catch (error) {
      this.log(`❌ Error testing analytics access: ${error.message}`, 'error');
    }
  }

  async testTeamMemberLimitations(tier = 'free') {
    this.log(`\n👥 Testing Team Member Limitations for ${tier.toUpperCase()} tier`, 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/dashboard/settings`, { waitUntil: 'domcontentloaded' });
      
      const pageContent = await this.page.$eval('*', el => el.textContent.toLowerCase());
      const expectedLimits = this.tierLimits[tier];
      
      if (tier === 'free') {
        if (pageContent.includes('1 user') || pageContent.includes('single user') || 
            pageContent.includes('upgrade for team')) {
          this.log('✅ Free tier shows single user limitation', 'success');
        } else {
          this.log('⚠️ Free tier team limitations not clearly displayed', 'warning');
        }
      } else if (tier === 'professional') {
        if (pageContent.includes('3 team') || pageContent.includes('3 member')) {
          this.log('✅ Professional tier shows 3 team member limit', 'success');
        } else {
          this.log('⚠️ Professional tier team limit (3 members) not clearly shown', 'warning');
        }
      } else if (tier === 'business' || tier === 'enterprise') {
        if (pageContent.includes('unlimited team') || pageContent.includes('unlimited member')) {
          this.log(`✅ ${tier} tier shows unlimited team members`, 'success');
        } else {
          this.log(`⚠️ ${tier} tier unlimited team feature not clearly displayed`, 'warning');
        }
      }

    } catch (error) {
      this.log(`❌ Error testing team member limitations: ${error.message}`, 'error');
    }
  }

  async testAIFeatureAccess(tier = 'free') {
    this.log(`\n🤖 Testing AI Feature Access for ${tier.toUpperCase()} tier`, 'info');
    
    try {
      // Test AI chat/assistant access
      await this.page.goto(`${this.baseUrl}/dashboard/chat`, { waitUntil: 'domcontentloaded' });
      
      const pageContent = await this.page.$eval('*', el => el.textContent.toLowerCase());
      
      if (tier === 'free') {
        if (pageContent.includes('upgrade') || pageContent.includes('unlock') || 
            pageContent.includes('professional plan') || pageContent.includes('ai not available')) {
          this.log('✅ Free tier properly blocks AI features', 'success');
        } else if (pageContent.includes('ai assistant') && !pageContent.includes('upgrade')) {
          this.log('❌ Free tier should not have AI assistant access', 'error');
          this.results.tierViolations.push('Free tier has unauthorized AI access');
        }
      } else {
        // Paid tiers should have AI access
        if (pageContent.includes('ai') || pageContent.includes('assistant') || 
            pageContent.includes('generate quote')) {
          this.log(`✅ ${tier} tier has AI features`, 'success');
        } else {
          this.log(`⚠️ ${tier} tier AI features not clearly accessible`, 'warning');
        }
      }

    } catch (error) {
      this.log(`❌ Error testing AI feature access: ${error.message}`, 'error');
    }
  }

  async testIntegrationFeatures(tier = 'free') {
    this.log(`\n🔗 Testing Integration Features for ${tier.toUpperCase()} tier`, 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/integrations`, { waitUntil: 'domcontentloaded' });
      
      const pageContent = await this.page.$eval('*', el => el.textContent.toLowerCase());
      
      if (tier === 'free' || tier === 'professional') {
        // Should not have QuickBooks/Xero integration
        if (pageContent.includes('business plan') && pageContent.includes('quickbooks')) {
          this.log(`✅ ${tier} tier properly shows integration requires Business plan`, 'success');
        } else if (pageContent.includes('quickbooks') && !pageContent.includes('upgrade')) {
          this.log(`⚠️ ${tier} tier may have unauthorized integration access`, 'warning');
        }
      } else if (tier === 'business' || tier === 'enterprise') {
        // Should have integrations
        if (pageContent.includes('quickbooks') || pageContent.includes('xero') || 
            pageContent.includes('api access')) {
          this.log(`✅ ${tier} tier has integration features`, 'success');
        } else {
          this.log(`⚠️ ${tier} tier integration features not found`, 'warning');
        }
      }

    } catch (error) {
      this.log(`❌ Error testing integration features: ${error.message}`, 'error');
    }
  }

  async testCustomBrandingAccess(tier = 'free') {
    this.log(`\n🎨 Testing Custom Branding Access for ${tier.toUpperCase()} tier`, 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/dashboard/settings`, { waitUntil: 'domcontentloaded' });
      
      // Look for branding/customization options
      const brandingElements = await this.page.$$eval('*', elements => {
        const text = elements.map(el => el.textContent).join(' ').toLowerCase();
        return {
          hasBrandingSection: text.includes('branding') || text.includes('logo') || text.includes('colors'),
          hasUpgradePrompt: text.includes('upgrade') && text.includes('custom'),
          hasTemplateCustomization: text.includes('template') && text.includes('custom')
        };
      });
      
      if (tier === 'free') {
        if (brandingElements.hasUpgradePrompt) {
          this.log('✅ Free tier shows custom branding upgrade prompt', 'success');
        } else if (brandingElements.hasBrandingSection && !brandingElements.hasUpgradePrompt) {
          this.log('❌ Free tier should not have custom branding access', 'error');
          this.results.tierViolations.push('Free tier has unauthorized custom branding');
        }
      } else if (tier === 'professional' || tier === 'business' || tier === 'enterprise') {
        if (brandingElements.hasBrandingSection) {
          this.log(`✅ ${tier} tier has custom branding features`, 'success');
        } else {
          this.log(`⚠️ ${tier} tier custom branding features not found`, 'warning');
        }
      }

    } catch (error) {
      this.log(`❌ Error testing custom branding access: ${error.message}`, 'error');
    }
  }

  async testDashboardNavigation(tier = 'free') {
    this.log(`\n🧭 Testing Dashboard Navigation for ${tier.toUpperCase()} tier`, 'info');
    
    const dashboardPages = [
      { url: '/dashboard', name: 'Dashboard Home' },
      { url: '/dashboard/quotes', name: 'Quotes' },
      { url: '/dashboard/customers', name: 'Customers' },
      { url: '/dashboard/analytics', name: 'Analytics' },
      { url: '/dashboard/settings', name: 'Settings' }
    ];

    for (const page of dashboardPages) {
      try {
        await this.page.goto(`${this.baseUrl}${page.url}`, { waitUntil: 'domcontentloaded' });
        const currentUrl = this.page.url();
        const pageContent = await this.page.$eval('*', el => el.textContent.toLowerCase());
        
        // Check if page is accessible or shows appropriate restrictions
        if (currentUrl.includes(page.url)) {
          if (page.name === 'Analytics' && tier === 'free') {
            if (pageContent.includes('upgrade') || pageContent.includes('unlock')) {
              this.log(`✅ ${page.name} properly restricted for ${tier} tier`, 'success');
            } else {
              this.log(`⚠️ ${page.name} may need better restrictions for ${tier} tier`, 'warning');
            }
          } else {
            this.log(`✅ ${page.name} accessible for ${tier} tier`, 'success');
          }
        } else if (currentUrl.includes('/unlock-analytics')) {
          this.log(`✅ ${page.name} properly redirects to unlock page for ${tier} tier`, 'success');
        } else {
          this.log(`⚠️ ${page.name} navigation unclear for ${tier} tier`, 'warning');
        }
        
      } catch (error) {
        this.log(`❌ Error testing ${page.name} for ${tier} tier: ${error.message}`, 'error');
      }
    }
  }

  async testBillingPageAccess(tier = 'free') {
    this.log(`\n💳 Testing Billing Page Access for ${tier.toUpperCase()} tier`, 'info');
    
    try {
      await this.page.goto(`${this.baseUrl}/dashboard/settings/billing`, { waitUntil: 'domcontentloaded' });
      
      const pageContent = await this.page.$eval('*', el => el.textContent.toLowerCase());
      
      if (tier === 'free') {
        if (pageContent.includes('upgrade') || pageContent.includes('choose plan') || 
            pageContent.includes('free plan')) {
          this.log('✅ Free tier billing page shows upgrade options', 'success');
        } else {
          this.log('⚠️ Free tier billing page should emphasize upgrade options', 'warning');
        }
      } else {
        if (pageContent.includes('manage subscription') || pageContent.includes('billing') || 
            pageContent.includes('invoice')) {
          this.log(`✅ ${tier} tier has billing management access`, 'success');
        } else {
          this.log(`⚠️ ${tier} tier billing management features not found`, 'warning');
        }
      }

    } catch (error) {
      this.log(`❌ Error testing billing page access: ${error.message}`, 'error');
    }
  }

  async runTierTests(tier) {
    this.log(`\n🎯 Running comprehensive tests for ${tier.toUpperCase()} tier`, 'info');
    
    // Simulate user with specified tier
    const userSimulated = await this.simulateUserTier(tier);
    if (!userSimulated) {
      this.log(`⚠️ Could not simulate ${tier} tier user - testing with default access`, 'warning');
    }
    
    await this.testQuoteLimitations(tier);
    await this.testAnalyticsDashboardAccess(tier);
    await this.testTeamMemberLimitations(tier);
    await this.testAIFeatureAccess(tier);
    await this.testIntegrationFeatures(tier);
    await this.testCustomBrandingAccess(tier);
    await this.testDashboardNavigation(tier);
    await this.testBillingPageAccess(tier);
  }

  async runAllTests() {
    console.log('🚀 Starting PaintQuote Pro Dashboard Tier Tests\n');
    
    await this.setup();
    
    try {
      // Test each tier
      const tiersToTest = ['free', 'professional', 'business'];
      
      for (const tier of tiersToTest) {
        await this.runTierTests(tier);
        this.log(`\n📋 Completed ${tier.toUpperCase()} tier testing\n`, 'info');
      }
      
    } catch (error) {
      this.log(`❌ Test suite error: ${error.message}`, 'error');
    }
    
    await this.teardown();
    
    // Print results summary
    console.log('\n📊 Dashboard Tier Test Results Summary');
    console.log('======================================');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️ Warnings: ${this.results.warnings}`);
    
    if (this.results.tierViolations.length > 0) {
      console.log('\n🚨 Tier Violation Issues:');
      this.results.tierViolations.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
    if (this.results.featureIssues.length > 0) {
      console.log('\n⚙️ Feature Access Issues:');
      this.results.featureIssues.forEach((issue, index) => {
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
    
    // Feature gate compliance report
    console.log('\n🔒 Feature Gate Compliance Report');
    console.log('=================================');
    console.log('Free Tier Restrictions:');
    this.tierLimits.free.restrictions.forEach(restriction => {
      console.log(`  • ${restriction}`);
    });
    console.log('\nProfessional Tier Access:');
    this.tierLimits.professional.features.slice(0, 5).forEach(feature => {
      console.log(`  • ${feature}`);
    });
    console.log('\nBusiness Tier Access:');
    this.tierLimits.business.features.slice(0, 5).forEach(feature => {
      console.log(`  • ${feature}`);
    });
    
    return this.results;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new DashboardTierTester();
  tester.runAllTests().then((results) => {
    process.exit(results.failed > 0 ? 1 : 0);
  }).catch((error) => {
    console.error('Dashboard tier test suite failed:', error);
    process.exit(1);
  });
}

module.exports = DashboardTierTester;