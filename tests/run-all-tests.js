/**
 * PaintQuote Pro Master Test Runner
 * Executes all test suites and generates comprehensive reports
 */

const LinkAuditTester = require('./link-audit.js');
const AccessibilityAuditTester = require('./accessibility-audit.js');
const PaymentFlowTester = require('./payment-flow-test.js');
const DashboardTierTester = require('./dashboard-tier-test.js');

class MasterTestRunner {
  constructor() {
    this.results = {
      overall: {
        totalPassed: 0,
        totalFailed: 0,
        totalWarnings: 0,
        totalTests: 0,
        startTime: new Date(),
        endTime: null,
        duration: null
      },
      suites: {}
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  async runTestSuite(TestClass, suiteName) {
    this.log(`\n🎯 Starting ${suiteName}`, 'info');
    console.log('='.repeat(50));
    
    try {
      const tester = new TestClass();
      const results = await tester.runAllTests();
      
      // Store results
      this.results.suites[suiteName] = {
        passed: results.passed,
        failed: results.failed,
        warnings: results.warnings,
        errors: results.errors || [],
        specificIssues: {
          contrastIssues: results.contrastIssues || [],
          ariaIssues: results.ariaIssues || [],
          keyboardIssues: results.keyboardIssues || [],
          stripeIssues: results.stripeIssues || [],
          paymentIssues: results.paymentIssues || [],
          tierViolations: results.tierViolations || [],
          featureIssues: results.featureIssues || []
        }
      };
      
      // Update overall stats
      this.results.overall.totalPassed += results.passed;
      this.results.overall.totalFailed += results.failed;
      this.results.overall.totalWarnings += results.warnings;
      
      this.log(`✅ ${suiteName} completed: ${results.passed} passed, ${results.failed} failed, ${results.warnings} warnings`, 'success');
      return true;
      
    } catch (error) {
      this.log(`❌ ${suiteName} failed with error: ${error.message}`, 'error');
      this.results.suites[suiteName] = {
        passed: 0,
        failed: 1,
        warnings: 0,
        errors: [error.message],
        specificIssues: {}
      };
      this.results.overall.totalFailed += 1;
      return false;
    }
  }

  generateHTMLReport() {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PaintQuote Pro Test Results</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            padding: 40px 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            background: linear-gradient(45deg, #60a5fa, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .passed { color: #34d399; }
        .failed { color: #f87171; }
        .warnings { color: #fbbf24; }
        .suite {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 20px;
        }
        .suite h3 {
            margin: 0 0 20px 0;
            color: #60a5fa;
            font-size: 1.5rem;
        }
        .suite-stats {
            display: flex;
            gap: 20px;
            margin-bottom: 15px;
        }
        .issues {
            margin-top: 15px;
        }
        .issue-category {
            margin-bottom: 15px;
        }
        .issue-category h4 {
            color: #fbbf24;
            margin-bottom: 8px;
        }
        .issue-list {
            list-style: none;
            padding: 0;
        }
        .issue-list li {
            padding: 5px 0;
            padding-left: 15px;
            position: relative;
        }
        .issue-list li::before {
            content: '•';
            color: #f87171;
            position: absolute;
            left: 0;
        }
        .timestamp {
            text-align: center;
            margin-top: 30px;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 PaintQuote Pro Test Results</h1>
            <p>Comprehensive Testing Suite Report</p>
        </div>
        
        <div class="summary">
            <div class="stat-card">
                <div class="stat-number passed">${this.results.overall.totalPassed}</div>
                <div>Tests Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number failed">${this.results.overall.totalFailed}</div>
                <div>Tests Failed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number warnings">${this.results.overall.totalWarnings}</div>
                <div>Warnings</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${((this.results.overall.totalPassed / (this.results.overall.totalPassed + this.results.overall.totalFailed)) * 100).toFixed(1)}%</div>
                <div>Success Rate</div>
            </div>
        </div>

        ${Object.entries(this.results.suites).map(([suiteName, results]) => `
        <div class="suite">
            <h3>${suiteName}</h3>
            <div class="suite-stats">
                <span class="passed">✅ ${results.passed} Passed</span>
                <span class="failed">❌ ${results.failed} Failed</span>
                <span class="warnings">⚠️ ${results.warnings} Warnings</span>
            </div>
            
            ${results.errors && results.errors.length > 0 ? `
            <div class="issues">
                <div class="issue-category">
                    <h4>🚨 Critical Errors</h4>
                    <ul class="issue-list">
                        ${results.errors.map(error => `<li>${error}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}
            
            ${Object.entries(results.specificIssues).map(([issueType, issues]) => 
                issues && issues.length > 0 ? `
                <div class="issue-category">
                    <h4>${this.getIssueIcon(issueType)} ${this.formatIssueType(issueType)}</h4>
                    <ul class="issue-list">
                        ${issues.map(issue => `<li>${issue}</li>`).join('')}
                    </ul>
                </div>
                ` : ''
            ).join('')}
        </div>
        `).join('')}
        
        <div class="timestamp">
            Report generated on ${new Date().toLocaleString()}
            <br>
            Test duration: ${this.results.overall.duration || 'N/A'}
        </div>
    </div>
</body>
</html>
    `;
    
    return html;
  }

  getIssueIcon(issueType) {
    const icons = {
      contrastIssues: '🎨',
      ariaIssues: '🏷️',
      keyboardIssues: '⌨️',
      stripeIssues: '💳',
      paymentIssues: '💰',
      tierViolations: '🔒',
      featureIssues: '⚙️'
    };
    return icons[issueType] || '⚠️';
  }

  formatIssueType(issueType) {
    const names = {
      contrastIssues: 'Color Contrast Issues',
      ariaIssues: 'ARIA/Accessibility Issues',
      keyboardIssues: 'Keyboard Navigation Issues',
      stripeIssues: 'Stripe Integration Issues',
      paymentIssues: 'Payment Flow Issues',
      tierViolations: 'Tier Violation Issues',
      featureIssues: 'Feature Access Issues'
    };
    return names[issueType] || issueType;
  }

  async runAllTests() {
    console.log('🚀 PaintQuote Pro Comprehensive Test Suite');
    console.log('===========================================');
    console.log(`Started at: ${this.results.overall.startTime.toLocaleString()}\n`);

    const testSuites = [
      { class: LinkAuditTester, name: 'Link Audit Tests' },
      { class: AccessibilityAuditTester, name: 'Accessibility & WCAG Tests' },
      { class: PaymentFlowTester, name: 'Payment Flow Tests' },
      { class: DashboardTierTester, name: 'Dashboard Tier Tests' }
    ];

    // Run all test suites
    for (const suite of testSuites) {
      await this.runTestSuite(suite.class, suite.name);
      this.log('', 'info'); // Add spacing
    }

    // Calculate final stats
    this.results.overall.endTime = new Date();
    this.results.overall.duration = Math.round((this.results.overall.endTime - this.results.overall.startTime) / 1000) + ' seconds';
    this.results.overall.totalTests = this.results.overall.totalPassed + this.results.overall.totalFailed;

    // Print final summary
    console.log('\n📊 FINAL TEST SUMMARY');
    console.log('=====================');
    console.log(`Total Tests Run: ${this.results.overall.totalTests}`);
    console.log(`✅ Passed: ${this.results.overall.totalPassed}`);
    console.log(`❌ Failed: ${this.results.overall.totalFailed}`);
    console.log(`⚠️ Warnings: ${this.results.overall.totalWarnings}`);
    console.log(`🎯 Success Rate: ${((this.results.overall.totalPassed / this.results.overall.totalTests) * 100).toFixed(1)}%`);
    console.log(`⏱️ Duration: ${this.results.overall.duration}`);

    // Generate HTML report
    try {
      const fs = require('fs');
      const htmlReport = this.generateHTMLReport();
      fs.writeFileSync('test-results.html', htmlReport);
      this.log('📄 HTML report generated: test-results.html', 'success');
    } catch (error) {
      this.log(`❌ Failed to generate HTML report: ${error.message}`, 'error');
    }

    // Print recommendations
    console.log('\n💡 RECOMMENDATIONS');
    console.log('==================');
    
    if (this.results.overall.totalFailed > 0) {
      console.log('🔴 CRITICAL: Address failed tests before production deployment');
    }
    
    if (this.results.overall.totalWarnings > 10) {
      console.log('🟡 HIGH: Review and fix warning issues for better user experience');
    }
    
    if (this.results.suites['Accessibility & WCAG Tests']?.failed > 0) {
      console.log('♿ ACCESSIBILITY: Fix accessibility issues for WCAG compliance');
    }
    
    if (this.results.suites['Payment Flow Tests']?.failed > 0) {
      console.log('💳 PAYMENTS: Critical payment flow issues need immediate attention');
    }

    console.log('\n🏁 Test suite completed!');
    
    return {
      success: this.results.overall.totalFailed === 0,
      results: this.results
    };
  }
}

// Run all tests if called directly
if (require.main === module) {
  const runner = new MasterTestRunner();
  runner.runAllTests().then((outcome) => {
    process.exit(outcome.success ? 0 : 1);
  }).catch((error) => {
    console.error('Master test runner failed:', error);
    process.exit(1);
  });
}

module.exports = MasterTestRunner;