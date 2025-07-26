/**
 * UI Styling and Visibility Test
 * Detects styling issues like white-on-white text, broken layouts, etc.
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3001';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkPageStyling(page, url, pageName) {
    console.log(`\nTesting UI styling: ${pageName} - ${url}`);
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await delay(2000);
        
        // Check for styling issues
        const stylingIssues = await page.evaluate(() => {
            const issues = [];
            
            // Check for white-on-white text
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const styles = window.getComputedStyle(el);
                const color = styles.color;
                const backgroundColor = styles.backgroundColor;
                const textContent = el.textContent?.trim();
                
                if (textContent && textContent.length > 0) {
                    // Check for white text on white background
                    if ((color === 'rgb(255, 255, 255)' || color === 'white') && 
                        (backgroundColor === 'rgb(255, 255, 255)' || backgroundColor === 'white')) {
                        issues.push({
                            type: 'white-on-white',
                            element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                            text: textContent.substring(0, 50) + (textContent.length > 50 ? '...' : ''),
                            selector: el.tagName.toLowerCase() + 
                                     (el.id ? '#' + el.id : '') + 
                                     (el.className ? '.' + el.className.split(' ').slice(0,2).join('.') : '')
                        });
                    }
                    
                    // Check for very low contrast (light gray on white)
                    if (color.startsWith('rgb(') && backgroundColor === 'rgb(255, 255, 255)') {
                        const rgbMatch = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
                        if (rgbMatch) {
                            const [, r, g, b] = rgbMatch.map(Number);
                            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                            if (luminance > 0.8) { // Very light text
                                issues.push({
                                    type: 'low-contrast',
                                    element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                                    text: textContent.substring(0, 50) + (textContent.length > 50 ? '...' : ''),
                                    color: color,
                                    selector: el.tagName.toLowerCase() + 
                                             (el.id ? '#' + el.id : '') + 
                                             (el.className ? '.' + el.className.split(' ').slice(0,2).join('.') : '')
                                });
                            }
                        }
                    }
                }
            });
            
            // Check for buttons with potential styling issues
            const buttons = document.querySelectorAll('button, [role="button"]');
            buttons.forEach(btn => {
                const styles = window.getComputedStyle(btn);
                const color = styles.color;
                const backgroundColor = styles.backgroundColor;
                const border = styles.border;
                
                if (color === backgroundColor && btn.textContent?.trim()) {
                    issues.push({
                        type: 'button-invisible-text',
                        element: 'BUTTON',
                        text: btn.textContent.trim().substring(0, 50),
                        color: color,
                        backgroundColor: backgroundColor,
                        selector: 'button' + (btn.id ? '#' + btn.id : '') + (btn.className ? '.' + btn.className.split(' ').slice(0,2).join('.') : '')
                    });
                }
            });
            
            // Check for missing images or broken image sources
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.src || img.src === window.location.href || img.src.endsWith('/')) {
                    issues.push({
                        type: 'broken-image-src',
                        element: 'IMG',
                        src: img.src,
                        alt: img.alt
                    });
                }
                
                if (!img.complete || img.naturalWidth === 0) {
                    issues.push({
                        type: 'broken-image-load',
                        element: 'IMG',
                        src: img.src,
                        alt: img.alt
                    });
                }
            });
            
            // Check for layout issues
            const overflowElements = [];
            elements.forEach(el => {
                if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
                    const styles = window.getComputedStyle(el);
                    if (styles.overflow === 'visible') {
                        overflowElements.push({
                            type: 'overflow-issue',
                            element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                            scrollWidth: el.scrollWidth,
                            clientWidth: el.clientWidth
                        });
                    }
                }
            });
            
            issues.push(...overflowElements.slice(0, 5)); // Limit overflow issues
            
            return issues;
        });
        
        // Check for console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        // Check for 404 or other HTTP errors on resources
        const resourceErrors = [];
        page.on('response', response => {
            if (response.status() >= 400) {
                resourceErrors.push({
                    url: response.url(),
                    status: response.status(),
                    statusText: response.statusText()
                });
            }
        });
        
        await delay(1000); // Let console errors accumulate
        
        return {
            styling: stylingIssues,
            console: consoleErrors,
            resources: resourceErrors
        };
        
    } catch (error) {
        return {
            error: error.message,
            styling: [],
            console: [],
            resources: []
        };
    }
}

async function testFormFunctionality(page, url, pageName) {
    console.log(`\nTesting forms: ${pageName} - ${url}`);
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await delay(2000);
        
        const formIssues = await page.evaluate(() => {
            const issues = [];
            const forms = document.querySelectorAll('form');
            
            forms.forEach((form, index) => {
                // Check for inputs without labels
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    const hasLabel = input.labels?.length > 0 || 
                                   input.getAttribute('aria-label') ||
                                   input.getAttribute('placeholder');
                    
                    if (!hasLabel) {
                        issues.push({
                            type: 'input-without-label',
                            formIndex: index,
                            inputType: input.type || input.tagName
                        });
                    }
                });
                
                // Check for submit buttons
                const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
                if (submitButtons.length === 0) {
                    issues.push({
                        type: 'form-without-submit',
                        formIndex: index
                    });
                }
            });
            
            return issues;
        });
        
        return formIssues;
    } catch (error) {
        return [{ type: 'error', message: error.message }];
    }
}

async function runUITest() {
    console.log('Starting Comprehensive UI Styling Test');
    console.log('======================================');
    
    const browser = await puppeteer.launch({ 
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1200, height: 800 }
    });
    
    const page = await browser.newPage();
    
    // Set up error monitoring
    const allErrors = [];
    
    try {
        // Test key pages
        const testPages = [
            { url: BASE_URL, name: 'Homepage' },
            { url: BASE_URL + '/trial-signup', name: 'Trial Signup' },
            { url: BASE_URL + '/access-code', name: 'Access Code Login' },
            { url: BASE_URL + '/painting-contractor-software', name: 'Contractor Software' },
            { url: BASE_URL + '/pricing', name: 'Pricing' },
            { url: BASE_URL + '/features', name: 'Features' },
            { url: BASE_URL + '/dashboard', name: 'Dashboard' },
            { url: BASE_URL + '/create-quote', name: 'Create Quote' }
        ];
        
        for (const testPage of testPages) {
            const issues = await checkPageStyling(page, testPage.url, testPage.name);
            const formIssues = await testFormFunctionality(page, testPage.url, testPage.name);
            
            if (issues.styling?.length > 0 || issues.console?.length > 0 || issues.resources?.length > 0 || formIssues?.length > 0) {
                allErrors.push({
                    page: testPage.name,
                    url: testPage.url,
                    issues: issues,
                    formIssues: formIssues
                });
            }
        }
        
        // Generate report
        console.log('\n\n=== UI STYLING TEST REPORT ===');
        console.log('==============================');
        
        if (allErrors.length === 0) {
            console.log('✅ No critical UI issues found!');
        } else {
            allErrors.forEach(pageError => {
                console.log(`\n📄 ${pageError.page} (${pageError.url})`);
                console.log('─'.repeat(50));
                
                if (pageError.issues.styling?.length > 0) {
                    console.log('\n🎨 STYLING ISSUES:');
                    pageError.issues.styling.forEach(issue => {
                        const icon = issue.type === 'white-on-white' ? '⚪' : 
                                   issue.type === 'low-contrast' ? '🔍' : 
                                   issue.type === 'button-invisible-text' ? '🔘' : '❌';
                        console.log(`${icon} ${issue.type}: ${issue.text}`);
                        console.log(`   Element: ${issue.selector || issue.element}`);
                        if (issue.color) console.log(`   Color: ${issue.color}`);
                        if (issue.backgroundColor) console.log(`   Background: ${issue.backgroundColor}`);
                    });
                }
                
                if (pageError.issues.console?.length > 0) {
                    console.log('\n🐛 CONSOLE ERRORS:');
                    pageError.issues.console.forEach(error => {
                        console.log(`❌ ${error}`);
                    });
                }
                
                if (pageError.issues.resources?.length > 0) {
                    console.log('\n🔗 RESOURCE ERRORS:');
                    pageError.issues.resources.forEach(error => {
                        console.log(`❌ ${error.status} ${error.url}`);
                    });
                }
                
                if (pageError.formIssues?.length > 0) {
                    console.log('\n📝 FORM ISSUES:');
                    pageError.formIssues.forEach(issue => {
                        console.log(`❌ ${issue.type}: ${issue.message || JSON.stringify(issue)}`);
                    });
                }
            });
        }
        
        // Summary
        const totalIssues = allErrors.reduce((sum, page) => {
            return sum + 
                   (page.issues.styling?.length || 0) + 
                   (page.issues.console?.length || 0) + 
                   (page.issues.resources?.length || 0) +
                   (page.formIssues?.length || 0);
        }, 0);
        
        console.log(`\n=== SUMMARY ===`);
        console.log(`Pages tested: ${testPages.length}`);
        console.log(`Pages with issues: ${allErrors.length}`);
        console.log(`Total issues found: ${totalIssues}`);
        
    } catch (error) {
        console.error('Test execution failed:', error);
    } finally {
        await browser.close();
    }
}

// Run the test
runUITest().catch(console.error);