/**
 * Comprehensive Click Test for PaintQuote Application
 * Tests all major user flows and functionality
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3001';
const TEST_RESULTS = {
    homepage: [],
    marketing: [],
    auth: [],
    dashboard: [],
    quotes: [],
    settings: [],
    ui: []
};

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testPage(page, url, testName) {
    try {
        console.log(`Testing: ${testName} - ${url}`);
        
        const response = await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });
        
        const status = response?.status() || 0;
        
        if (status >= 400) {
            TEST_RESULTS.ui.push({
                type: 'error',
                page: url,
                issue: `HTTP ${status} error`,
                test: testName
            });
            return false;
        }

        // Check for console errors
        const logs = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                logs.push(msg.text());
            }
        });

        await delay(2000); // Wait for page to fully load

        // Check for white-on-white text issues
        const whiteTextIssues = await page.evaluate(() => {
            const elements = document.querySelectorAll('*');
            const issues = [];
            
            elements.forEach(el => {
                const styles = window.getComputedStyle(el);
                const color = styles.color;
                const backgroundColor = styles.backgroundColor;
                
                if ((color === 'rgb(255, 255, 255)' || color === 'white') && 
                    (backgroundColor === 'rgb(255, 255, 255)' || backgroundColor === 'white')) {
                    if (el.textContent.trim().length > 0) {
                        issues.push({
                            element: el.tagName + (el.className ? '.' + el.className : ''),
                            text: el.textContent.trim().substring(0, 50)
                        });
                    }
                }
            });
            return issues;
        });

        if (whiteTextIssues.length > 0) {
            TEST_RESULTS.ui.push({
                type: 'visibility',
                page: url,
                issue: 'White text on white background detected',
                details: whiteTextIssues,
                test: testName
            });
        }

        // Check for broken images
        const brokenImages = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.filter(img => !img.complete || img.naturalWidth === 0)
                         .map(img => img.src);
        });

        if (brokenImages.length > 0) {
            TEST_RESULTS.ui.push({
                type: 'broken-images',
                page: url,
                issue: 'Broken images detected',
                details: brokenImages,
                test: testName
            });
        }

        // Log console errors
        if (logs.length > 0) {
            TEST_RESULTS.ui.push({
                type: 'console-errors',
                page: url,
                issue: 'Console errors detected',
                details: logs,
                test: testName
            });
        }

        return true;
    } catch (error) {
        TEST_RESULTS.ui.push({
            type: 'error',
            page: url,
            issue: error.message,
            test: testName
        });
        return false;
    }
}

async function testHomepageAndMarketing(page) {
    console.log('\n=== Testing Homepage and Marketing Pages ===');
    
    // Test homepage
    await testPage(page, BASE_URL, 'Homepage');
    
    // Test navigation links
    try {
        await page.goto(BASE_URL);
        await delay(2000);
        
        // Test header navigation
        const navLinks = await page.$$eval('nav a, header a', links => 
            links.map(link => ({ href: link.href, text: link.textContent.trim() }))
        );
        
        for (const link of navLinks) {
            if (link.href && link.href.startsWith(BASE_URL)) {
                const success = await testPage(page, link.href, `Nav Link: ${link.text}`);
                if (success) {
                    TEST_RESULTS.homepage.push({
                        type: 'success',
                        test: `Navigation link: ${link.text}`,
                        url: link.href
                    });
                }
            }
        }
        
        // Test footer links
        const footerLinks = await page.$$eval('footer a', links => 
            links.map(link => ({ href: link.href, text: link.textContent.trim() }))
        );
        
        for (const link of footerLinks) {
            if (link.href && link.href.startsWith(BASE_URL)) {
                const success = await testPage(page, link.href, `Footer Link: ${link.text}`);
                if (success) {
                    TEST_RESULTS.homepage.push({
                        type: 'success',
                        test: `Footer link: ${link.text}`,
                        url: link.href
                    });
                }
            }
        }
        
    } catch (error) {
        TEST_RESULTS.homepage.push({
            type: 'error',
            test: 'Navigation testing',
            issue: error.message
        });
    }
    
    // Test marketing pages
    const marketingPages = [
        '/painting-contractors',
        '/painting-estimate-software',
        '/commercial-painting-estimating-software',
        '/mobile-painting-estimate-app',
        '/painting-contractor-software',
        '/painting-quote-software',
        '/pricing',
        '/features',
        '/about',
        '/contact'
    ];
    
    for (const path of marketingPages) {
        const success = await testPage(page, BASE_URL + path, `Marketing Page: ${path}`);
        if (success) {
            TEST_RESULTS.marketing.push({
                type: 'success',
                test: `Marketing page: ${path}`,
                url: BASE_URL + path
            });
        }
    }
}

async function testAuthFlow(page) {
    console.log('\n=== Testing Authentication Flow ===');
    
    // Test trial signup
    await testPage(page, BASE_URL + '/trial-signup', 'Trial Signup Page');
    
    try {
        await page.goto(BASE_URL + '/trial-signup');
        await delay(2000);
        
        // Test form submission
        const hasForm = await page.$('form');
        if (hasForm) {
            // Fill out the form
            const emailInput = await page.$('input[type="email"]');
            if (emailInput) {
                await emailInput.type('test@example.com');
                
                const submitButton = await page.$('button[type="submit"], input[type="submit"]');
                if (submitButton) {
                    await submitButton.click();
                    await delay(3000);
                    
                    TEST_RESULTS.auth.push({
                        type: 'success',
                        test: 'Trial signup form submission',
                        details: 'Form submitted successfully'
                    });
                } else {
                    TEST_RESULTS.auth.push({
                        type: 'error',
                        test: 'Trial signup form',
                        issue: 'No submit button found'
                    });
                }
            } else {
                TEST_RESULTS.auth.push({
                    type: 'error',
                    test: 'Trial signup form',
                    issue: 'No email input found'
                });
            }
        } else {
            TEST_RESULTS.auth.push({
                type: 'error',
                test: 'Trial signup page',
                issue: 'No form found on page'
            });
        }
    } catch (error) {
        TEST_RESULTS.auth.push({
            type: 'error',
            test: 'Trial signup flow',
            issue: error.message
        });
    }
    
    // Test access code login
    await testPage(page, BASE_URL + '/access-code', 'Access Code Login');
    
    try {
        await page.goto(BASE_URL + '/access-code');
        await delay(2000);
        
        // Test invalid access code
        const codeInput = await page.$('input[type="text"], input[name="code"]');
        if (codeInput) {
            await codeInput.type('invalid-code');
            
            const submitButton = await page.$('button[type="submit"]');
            if (submitButton) {
                await submitButton.click();
                await delay(2000);
                
                // Check for error message
                const errorMessage = await page.$('.error, [role="alert"], .text-red-500');
                if (errorMessage) {
                    TEST_RESULTS.auth.push({
                        type: 'success',
                        test: 'Invalid access code handling',
                        details: 'Error message displayed correctly'
                    });
                } else {
                    TEST_RESULTS.auth.push({
                        type: 'warning',
                        test: 'Invalid access code handling',
                        issue: 'No error message displayed for invalid code'
                    });
                }
            }
        }
    } catch (error) {
        TEST_RESULTS.auth.push({
            type: 'error',
            test: 'Access code flow',
            issue: error.message
        });
    }
}

async function testDashboardFunctionality(page) {
    console.log('\n=== Testing Dashboard Functionality ===');
    
    // Note: This would require a valid access code to test fully
    // For now, we'll test if the page loads and check for critical elements
    
    await testPage(page, BASE_URL + '/dashboard', 'Dashboard Page');
    
    // Test dashboard navigation
    const dashboardPages = [
        '/dashboard/quotes',
        '/dashboard/settings',
        '/dashboard/chat'
    ];
    
    for (const path of dashboardPages) {
        await testPage(page, BASE_URL + path, `Dashboard: ${path}`);
    }
}

async function testQuoteSystem(page) {
    console.log('\n=== Testing Quote Creation System ===');
    
    await testPage(page, BASE_URL + '/create-quote', 'Create Quote Page');
    await testPage(page, BASE_URL + '/quote', 'Quote Builder Page');
    
    // Test quote-related pages
    const quotePages = [
        '/paint-quote-calculator',
        '/painting-quote-generator',
        '/interior-painting-quote-calculator',
        '/exterior-painting-estimate-calculator'
    ];
    
    for (const path of quotePages) {
        await testPage(page, BASE_URL + path, `Quote Tool: ${path}`);
    }
}

async function testSettingsAndConfig(page) {
    console.log('\n=== Testing Settings and Configuration ===');
    
    // Test billing and subscription pages
    await testPage(page, BASE_URL + '/billing', 'Billing Page');
    await testPage(page, BASE_URL + '/pricing', 'Pricing Page');
    
    // Test onboarding
    await testPage(page, BASE_URL + '/onboarding', 'Onboarding Page');
}

async function runComprehensiveTest() {
    console.log('Starting Comprehensive Click Test for PaintQuote Application');
    console.log('=====================================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    
    try {
        await testHomepageAndMarketing(page);
        await testAuthFlow(page);
        await testDashboardFunctionality(page);
        await testQuoteSystem(page);
        await testSettingsAndConfig(page);
        
        // Generate report
        console.log('\n=== TEST RESULTS SUMMARY ===');
        console.log('============================');
        
        Object.keys(TEST_RESULTS).forEach(category => {
            console.log(`\n${category.toUpperCase()}:`);
            TEST_RESULTS[category].forEach(result => {
                const status = result.type === 'success' ? '✅' : result.type === 'warning' ? '⚠️' : '❌';
                console.log(`${status} ${result.test}: ${result.issue || result.details || 'OK'}`);
                if (result.url) console.log(`   URL: ${result.url}`);
                if (result.details && Array.isArray(result.details)) {
                    result.details.forEach(detail => console.log(`   - ${JSON.stringify(detail)}`));
                }
            });
        });
        
        // Count issues
        const totalIssues = Object.values(TEST_RESULTS)
            .flat()
            .filter(result => result.type === 'error' || result.type === 'warning').length;
            
        const totalTests = Object.values(TEST_RESULTS).flat().length;
        
        console.log(`\n=== SUMMARY ===`);
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Issues Found: ${totalIssues}`);
        console.log(`Success Rate: ${((totalTests - totalIssues) / totalTests * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('Test execution failed:', error);
    } finally {
        await browser.close();
    }
}

// Run the test
runComprehensiveTest().catch(console.error);