import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface PageTestResult {
  url: string;
  hasCSS: boolean;
  consoleErrors: string[];
  tailwindClasses: string[];
  screenshotPath: string;
  cssFiles: string[];
  missingStyles: string[];
}

async function testPageStyling(page: Page, url: string, name: string): Promise<PageTestResult> {
  const consoleErrors: string[] = [];
  const result: PageTestResult = {
    url,
    hasCSS: false,
    consoleErrors: [],
    tailwindClasses: [],
    screenshotPath: '',
    cssFiles: [],
    missingStyles: []
  };

  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Listen for failed requests (including CSS)
  page.on('requestfailed', request => {
    consoleErrors.push(`Failed to load: ${request.url()}`);
  });

  try {
    // Navigate to the page
    console.log(`Testing ${name} (${url})...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(async (e) => {
      console.log(`Navigation timeout for ${url}, proceeding with domcontentloaded...`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    });

    // Wait a bit for dynamic content
    await page.waitForTimeout(2000);

    // Check for CSS files
    const cssFiles = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return links.map(link => (link as HTMLLinkElement).href);
    });
    result.cssFiles = cssFiles;
    result.hasCSS = cssFiles.length > 0;

    // Check if Tailwind classes are present and working
    const tailwindCheck = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const tailwindClasses: string[] = [];
      const tailwindPrefixes = ['bg-', 'text-', 'p-', 'm-', 'flex', 'grid', 'w-', 'h-', 'rounded', 'shadow', 'border'];
      
      elements.forEach(el => {
        const classList = Array.from(el.classList);
        classList.forEach(className => {
          if (tailwindPrefixes.some(prefix => className.startsWith(prefix))) {
            if (!tailwindClasses.includes(className)) {
              tailwindClasses.push(className);
            }
          }
        });
      });

      // Check if styles are actually applied
      const testElement = document.createElement('div');
      testElement.className = 'bg-blue-500 p-4';
      document.body.appendChild(testElement);
      const computed = window.getComputedStyle(testElement);
      const hasBackground = computed.backgroundColor !== 'rgba(0, 0, 0, 0)';
      const hasPadding = computed.padding !== '0px';
      document.body.removeChild(testElement);

      return {
        classes: tailwindClasses.slice(0, 20), // First 20 classes as sample
        stylesWorking: hasBackground && hasPadding
      };
    });

    result.tailwindClasses = tailwindCheck.classes;
    if (!tailwindCheck.stylesWorking) {
      result.missingStyles.push('Tailwind CSS not applying styles properly');
    }

    // Check for common styling issues
    const styleIssues = await page.evaluate(() => {
      const issues: string[] = [];
      
      // Check if page has no styles at all
      const allElements = document.querySelectorAll('*');
      let hasAnyStyles = false;
      
      for (const el of Array.from(allElements).slice(0, 10)) {
        const computed = window.getComputedStyle(el);
        if (computed.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
            computed.color !== 'rgb(0, 0, 0)' ||
            computed.fontSize !== '16px') {
          hasAnyStyles = true;
          break;
        }
      }
      
      if (!hasAnyStyles) {
        issues.push('No custom styles detected - page appears unstyled');
      }

      // Check for missing fonts
      const bodyFont = window.getComputedStyle(document.body).fontFamily;
      if (bodyFont === 'Times New Roman' || bodyFont === 'serif') {
        issues.push('Default browser font detected - custom fonts may not be loading');
      }

      return issues;
    });

    result.missingStyles.push(...styleIssues);
    result.consoleErrors = consoleErrors;

    // Take screenshot
    const screenshotDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }
    
    const screenshotPath = path.join(screenshotDir, `${name.replace(/\s+/g, '-').toLowerCase()}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    result.screenshotPath = screenshotPath;

  } catch (error) {
    console.error(`Error testing ${name}:`, error);
    result.consoleErrors.push(`Test error: ${error}`);
  }

  return result;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const results: PageTestResult[] = [];

  try {
    // Test home page
    let page = await context.newPage();
    results.push(await testPageStyling(page, 'http://localhost:3001/', 'Home Page'));
    await page.close();

    // Test access-code page
    page = await context.newPage();
    results.push(await testPageStyling(page, 'http://localhost:3001/access-code', 'Access Code Page'));
    await page.close();
    
    // Test dashboard page directly
    page = await context.newPage();
    results.push(await testPageStyling(page, 'http://localhost:3001/dashboard', 'Dashboard Page'));
    await page.close();

    // Test create-quote page
    page = await context.newPage();
    results.push(await testPageStyling(page, 'http://localhost:3001/create-quote', 'Create Quote Page'));
    await page.close();

  } finally {
    await browser.close();
  }

  // Generate report
  console.log('\n=== STYLING ISSUES REPORT ===\n');
  
  for (const result of results) {
    console.log(`\n${result.url}`);
    console.log('='.repeat(result.url.length));
    
    console.log(`\nCSS Files Loaded: ${result.hasCSS ? 'Yes' : 'No'}`);
    if (result.cssFiles.length > 0) {
      console.log('CSS Files:');
      result.cssFiles.forEach(file => console.log(`  - ${file}`));
    }
    
    if (result.tailwindClasses.length > 0) {
      console.log(`\nTailwind Classes Found: ${result.tailwindClasses.length}`);
      console.log('Sample Classes:', result.tailwindClasses.slice(0, 5).join(', '));
    } else {
      console.log('\nNo Tailwind Classes Found!');
    }
    
    if (result.missingStyles.length > 0) {
      console.log('\nStyling Issues:');
      result.missingStyles.forEach(issue => console.log(`  - ${issue}`));
    }
    
    if (result.consoleErrors.length > 0) {
      console.log('\nConsole Errors:');
      result.consoleErrors.forEach(error => console.log(`  - ${error}`));
    }
    
    console.log(`\nScreenshot saved: ${result.screenshotPath}`);
  }
  
  console.log('\n=== END OF REPORT ===\n');
}

main().catch(console.error);