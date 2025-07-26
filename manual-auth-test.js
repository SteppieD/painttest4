/**
 * Manual Authentication Flow Test
 * Tests specific authentication scenarios and form validation
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3001';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testAuthenticationFlow() {
    console.log('Starting Manual Authentication Flow Test');
    console.log('=========================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    try {
        // Test 1: Trial Signup Form Validation
        console.log('\n1. Testing Trial Signup Form Validation...');
        await page.goto(BASE_URL + '/trial-signup');
        await delay(2000);
        
        // Check if form exists
        const form = await page.$('form');
        if (!form) {
            console.log('❌ No form found on trial signup page');
        } else {
            console.log('✅ Form found on trial signup page');
            
            // Test empty form submission
            const submitButton = await page.$('button[type="submit"], input[type="submit"]');
            if (submitButton) {
                await submitButton.click();
                await delay(2000);
                
                // Check for validation errors
                const validationErrors = await page.$$('.error, [role="alert"], .text-red-500, .text-red-600');
                if (validationErrors.length > 0) {
                    console.log('✅ Form validation working - errors shown for empty submission');
                } else {
                    console.log('⚠️ No validation errors shown for empty form submission');
                }
            }
            
            // Test with valid email
            const emailInput = await page.$('input[type="email"]');
            if (emailInput) {
                await emailInput.clear();
                await emailInput.type('test@example.com');
                console.log('✅ Email input working');
            }
            
            // Test with company name if field exists
            const companyInput = await page.$('input[name="company"], input[placeholder*="company" i]');
            if (companyInput) {
                await companyInput.clear();
                await companyInput.type('Test Painting Company');
                console.log('✅ Company input working');
            }
        }
        
        // Test 2: Access Code Login
        console.log('\n2. Testing Access Code Login...');
        await page.goto(BASE_URL + '/access-code');
        await delay(2000);
        
        const codeForm = await page.$('form');
        if (!codeForm) {
            console.log('❌ No form found on access code page');
        } else {
            console.log('✅ Access code form found');
            
            // Test with invalid code
            const codeInput = await page.$('input[type="text"], input[name="code"], input[name="accessCode"]');
            if (codeInput) {
                await codeInput.clear();
                await codeInput.type('INVALID123');
                
                const submitButton = await page.$('button[type="submit"]');
                if (submitButton) {
                    await submitButton.click();
                    await delay(3000);
                    
                    // Check for error message
                    const errorMessage = await page.$('.error, [role="alert"], .text-red-500, .text-red-600');
                    if (errorMessage) {
                        const errorText = await errorMessage.textContent();
                        console.log('✅ Invalid code error handling working:', errorText);
                    } else {
                        console.log('⚠️ No error message shown for invalid access code');
                    }
                    
                    // Check if we're still on the same page (good)
                    const currentUrl = page.url();
                    if (currentUrl.includes('/access-code')) {
                        console.log('✅ User stayed on access code page after invalid submission');
                    } else {
                        console.log('❌ User was redirected after invalid code submission');
                    }
                }
            }
        }
        
        // Test 3: Forgot Code Functionality
        console.log('\n3. Testing Forgot Code Functionality...');
        const forgotLink = await page.$('a[href*="forgot"], button:has-text("forgot"), *:contains("Forgot your code")');
        if (forgotLink) {
            console.log('✅ Forgot code link found');
            await forgotLink.click();
            await delay(2000);
            
            // Check if we're on a forgot code page or modal opened
            const currentUrl = page.url();
            if (currentUrl.includes('forgot') || currentUrl.includes('reset')) {
                console.log('✅ Forgot code functionality navigates to proper page');
            } else {
                // Check for modal
                const modal = await page.$('[role="dialog"], .modal, .popup');
                if (modal) {
                    console.log('✅ Forgot code functionality opens modal');
                } else {
                    console.log('⚠️ Forgot code link clicked but no clear action taken');
                }
            }
        } else {
            console.log('⚠️ No "Forgot your code" functionality found');
        }
        
        // Test 4: Dashboard Access (should redirect to login)
        console.log('\n4. Testing Dashboard Access Without Auth...');
        await page.goto(BASE_URL + '/dashboard');
        await delay(3000);
        
        const finalUrl = page.url();
        if (finalUrl.includes('/access-code') || finalUrl.includes('/login') || finalUrl.includes('/trial-signup')) {
            console.log('✅ Dashboard properly redirects unauthenticated users');
        } else if (finalUrl.includes('/dashboard')) {
            console.log('⚠️ Dashboard accessible without authentication');
        } else {
            console.log('❓ Dashboard redirected to unexpected page:', finalUrl);
        }
        
        // Test 5: Quote Creation Access
        console.log('\n5. Testing Quote Creation Access...');
        await page.goto(BASE_URL + '/create-quote');
        await delay(3000);
        
        const quoteUrl = page.url();
        if (quoteUrl.includes('/access-code') || quoteUrl.includes('/login') || quoteUrl.includes('/trial-signup')) {
            console.log('✅ Quote creation properly redirects unauthenticated users');
        } else if (quoteUrl.includes('/create-quote')) {
            console.log('⚠️ Quote creation accessible without authentication');
        } else {
            console.log('❓ Quote creation redirected to unexpected page:', quoteUrl);
        }
        
    } catch (error) {
        console.error('Test execution failed:', error);
    } finally {
        await browser.close();
    }
}

// Run the test
testAuthenticationFlow().catch(console.error);