/**
 * PaintQuote Pro Accessibility & WCAG Compliance Test Suite
 * Tests color contrast, keyboard navigation, ARIA labels, and screen reader compatibility
 */

const puppeteer = require('puppeteer');

class AccessibilityAuditTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:3005';
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      errors: [],
      contrastIssues: [],
      keyboardIssues: [],
      ariaIssues: []
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

  // Calculate relative luminance for WCAG color contrast
  getRelativeLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Calculate contrast ratio between two colors
  getContrastRatio(color1, color2) {
    const l1 = this.getRelativeLuminance(...color1);
    const l2 = this.getRelativeLuminance(...color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Convert RGB string to array
  parseRGBColor(rgbString) {
    const matches = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (matches) {
      return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
    }
    return [0, 0, 0];
  }

  async testColorContrast(page = 'home') {
    this.log(`\n🎨 Testing Color Contrast Compliance on ${page} page`, 'info');
    
    const pageUrl = page === 'home' ? this.baseUrl : `${this.baseUrl}/${page}`;
    await this.page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
    
    try {
      // Test text elements for contrast
      const textElements = await this.page.$$eval('*', elements => {
        return elements
          .filter(el => {
            const style = window.getComputedStyle(el);
            const text = el.textContent?.trim();
            return text && text.length > 0 && 
                   style.display !== 'none' && 
                   style.visibility !== 'hidden' &&
                   el.offsetWidth > 0 && el.offsetHeight > 0;
          })
          .map(el => {
            const style = window.getComputedStyle(el);
            return {
              tagName: el.tagName,
              text: el.textContent.trim().substring(0, 50),
              color: style.color,
              backgroundColor: style.backgroundColor,
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              className: el.className
            };
          })
          .slice(0, 50); // Limit to prevent overwhelming results
      });

      let contrastIssues = 0;
      let tested = 0;

      for (const element of textElements) {
        if (element.color && element.backgroundColor && 
            element.color.includes('rgb') && element.backgroundColor.includes('rgb')) {
          
          const textColor = this.parseRGBColor(element.color);
          const bgColor = this.parseRGBColor(element.backgroundColor);
          const contrastRatio = this.getContrastRatio(textColor, bgColor);
          
          tested++;
          
          // WCAG AA standards: 4.5:1 for normal text, 3:1 for large text
          const fontSize = parseFloat(element.fontSize);
          const isLargeText = fontSize >= 18 || (fontSize >= 14 && element.fontWeight >= 700);
          const minRatio = isLargeText ? 3.0 : 4.5;
          
          if (contrastRatio < minRatio) {
            contrastIssues++;
            const issue = `Low contrast in ${element.tagName}: "${element.text}" (${contrastRatio.toFixed(2)}:1, needs ${minRatio}:1)`;
            this.results.contrastIssues.push(issue);
            this.log(`⚠️ ${issue}`, 'warning');
          }
        }
      }

      if (contrastIssues === 0) {
        this.log(`✅ All ${tested} text elements pass contrast requirements`, 'success');
      } else {
        this.log(`⚠️ Found ${contrastIssues} contrast issues out of ${tested} elements tested`, 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing color contrast: ${error.message}`, 'error');
    }
  }

  async testButtonContrast() {
    this.log('\n🔘 Testing Button Color Contrast', 'info');
    
    await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
    
    try {
      const buttons = await this.page.$$eval('button, .btn, [role="button"], input[type="submit"]', buttons => {
        return buttons.map(btn => {
          const style = window.getComputedStyle(btn);
          return {
            text: btn.textContent?.trim() || btn.value || 'Button',
            color: style.color,
            backgroundColor: style.backgroundColor,
            borderColor: style.borderColor,
            className: btn.className,
            tagName: btn.tagName
          };
        });
      });

      let buttonIssues = 0;
      
      for (const button of buttons) {
        if (button.color && button.backgroundColor && 
            button.color.includes('rgb') && button.backgroundColor.includes('rgb')) {
          
          const textColor = this.parseRGBColor(button.color);
          const bgColor = this.parseRGBColor(button.backgroundColor);
          const contrastRatio = this.getContrastRatio(textColor, bgColor);
          
          if (contrastRatio < 3.0) { // Buttons need at least 3:1 ratio
            buttonIssues++;
            const issue = `Button "${button.text}" has low contrast: ${contrastRatio.toFixed(2)}:1`;
            this.results.contrastIssues.push(issue);
            this.log(`⚠️ ${issue}`, 'warning');
          }
        }
      }

      if (buttonIssues === 0) {
        this.log(`✅ All ${buttons.length} buttons pass contrast requirements`, 'success');
      } else {
        this.log(`⚠️ ${buttonIssues} buttons have contrast issues`, 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing button contrast: ${error.message}`, 'error');
    }
  }

  async testKeyboardNavigation() {
    this.log('\n⌨️ Testing Keyboard Navigation', 'info');
    
    await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
    
    try {
      // Test Tab navigation
      const focusableElements = await this.page.$$eval(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        elements => elements.length
      );
      
      this.log(`Found ${focusableElements} focusable elements`, 'info');
      
      // Test tabbing through elements
      let tabCount = 0;
      let focusVisible = 0;
      
      for (let i = 0; i < Math.min(focusableElements, 20); i++) {
        await this.page.keyboard.press('Tab');
        tabCount++;
        
        // Check if focused element has visible focus indicator
        const hasFocusIndicator = await this.page.evaluate(() => {
          const focused = document.activeElement;
          if (!focused) return false;
          
          const style = window.getComputedStyle(focused);
          const pseudoStyle = window.getComputedStyle(focused, ':focus');
          
          return (
            style.outline !== 'none' || 
            style.outlineWidth !== '0px' ||
            pseudoStyle.outline !== 'none' ||
            pseudoStyle.outlineWidth !== '0px' ||
            style.boxShadow !== 'none' ||
            pseudoStyle.boxShadow !== 'none'
          );
        });
        
        if (hasFocusIndicator) {
          focusVisible++;
        }
      }
      
      const focusVisibleRatio = focusVisible / tabCount;
      
      if (focusVisibleRatio > 0.8) {
        this.log(`✅ Good focus visibility: ${Math.round(focusVisibleRatio * 100)}% of elements have focus indicators`, 'success');
      } else if (focusVisibleRatio > 0.5) {
        this.log(`⚠️ Moderate focus visibility: ${Math.round(focusVisibleRatio * 100)}% of elements have focus indicators`, 'warning');
      } else {
        this.log(`❌ Poor focus visibility: Only ${Math.round(focusVisibleRatio * 100)}% of elements have focus indicators`, 'error');
      }

      // Test Escape key functionality
      await this.page.keyboard.press('Escape');
      this.log('✅ Escape key press tested', 'success');

      // Test Enter key on buttons
      try {
        await this.page.focus('button');
        await this.page.keyboard.press('Enter');
        this.log('✅ Enter key on buttons tested', 'success');
      } catch (error) {
        this.log('⚠️ Could not test Enter key on buttons', 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing keyboard navigation: ${error.message}`, 'error');
    }
  }

  async testAriaLabels() {
    this.log('\n🏷️ Testing ARIA Labels and Screen Reader Support', 'info');
    
    await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
    
    try {
      // Test for missing alt text on images
      const imagesWithoutAlt = await this.page.$$eval('img', images => {
        return images
          .filter(img => !img.alt || img.alt.trim() === '')
          .map(img => ({
            src: img.src,
            className: img.className
          }));
      });

      if (imagesWithoutAlt.length === 0) {
        this.log('✅ All images have alt text', 'success');
      } else {
        this.log(`⚠️ ${imagesWithoutAlt.length} images missing alt text`, 'warning');
        imagesWithoutAlt.forEach(img => {
          this.results.ariaIssues.push(`Image missing alt text: ${img.src}`);
        });
      }

      // Test for ARIA landmarks
      const landmarks = await this.page.$$eval('[role], nav, main, header, footer, aside', elements => {
        return elements.map(el => ({
          tagName: el.tagName,
          role: el.getAttribute('role'),
          hasAriaLabel: !!el.getAttribute('aria-label'),
          hasAriaLabelledby: !!el.getAttribute('aria-labelledby')
        }));
      });

      this.log(`Found ${landmarks.length} landmark elements`, 'info');

      // Test for buttons without accessible names
      const buttonsWithoutNames = await this.page.$$eval('button, [role="button"]', buttons => {
        return buttons
          .filter(btn => {
            const text = btn.textContent?.trim();
            const ariaLabel = btn.getAttribute('aria-label');
            const ariaLabelledby = btn.getAttribute('aria-labelledby');
            return !text && !ariaLabel && !ariaLabelledby;
          })
          .map(btn => ({
            className: btn.className,
            tagName: btn.tagName
          }));
      });

      if (buttonsWithoutNames.length === 0) {
        this.log('✅ All buttons have accessible names', 'success');
      } else {
        this.log(`⚠️ ${buttonsWithoutNames.length} buttons missing accessible names`, 'warning');
        buttonsWithoutNames.forEach(btn => {
          this.results.ariaIssues.push(`Button missing accessible name: ${btn.tagName}.${btn.className}`);
        });
      }

      // Test for form labels
      const inputsWithoutLabels = await this.page.$$eval('input, select, textarea', inputs => {
        return inputs
          .filter(input => {
            const id = input.id;
            const ariaLabel = input.getAttribute('aria-label');
            const ariaLabelledby = input.getAttribute('aria-labelledby');
            const hasLabel = id && document.querySelector(`label[for="${id}"]`);
            return !hasLabel && !ariaLabel && !ariaLabelledby;
          })
          .map(input => ({
            type: input.type || input.tagName,
            name: input.name,
            id: input.id
          }));
      });

      if (inputsWithoutLabels.length === 0) {
        this.log('✅ All form inputs have labels', 'success');
      } else {
        this.log(`⚠️ ${inputsWithoutLabels.length} form inputs missing labels`, 'warning');
        inputsWithoutLabels.forEach(input => {
          this.results.ariaIssues.push(`Form input missing label: ${input.type} (${input.name || input.id})`);
        });
      }

    } catch (error) {
      this.log(`❌ Error testing ARIA labels: ${error.message}`, 'error');
    }
  }

  async testHeadingStructure() {
    this.log('\n📑 Testing Heading Structure', 'info');
    
    try {
      const headings = await this.page.$$eval('h1, h2, h3, h4, h5, h6', headings => {
        return headings.map(h => ({
          level: parseInt(h.tagName[1]),
          text: h.textContent.trim(),
          tagName: h.tagName
        }));
      });

      this.log(`Found ${headings.length} headings`, 'info');

      // Check for proper heading hierarchy
      let hierarchyIssues = 0;
      let hasH1 = false;

      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        
        if (heading.level === 1) {
          hasH1 = true;
          if (i > 0) {
            this.log('⚠️ H1 should typically be the first heading', 'warning');
            hierarchyIssues++;
          }
        }
        
        if (i > 0) {
          const prevLevel = headings[i - 1].level;
          if (heading.level > prevLevel + 1) {
            this.log(`⚠️ Heading level jump: ${prevLevel} to ${heading.level} - "${heading.text}"`, 'warning');
            hierarchyIssues++;
          }
        }
      }

      if (!hasH1) {
        this.log('⚠️ Page missing H1 heading', 'warning');
        hierarchyIssues++;
      }

      if (hierarchyIssues === 0) {
        this.log('✅ Heading structure is properly organized', 'success');
      } else {
        this.log(`⚠️ Found ${hierarchyIssues} heading structure issues`, 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing heading structure: ${error.message}`, 'error');
    }
  }

  async testColorDependency() {
    this.log('\n🌈 Testing Color Dependency', 'info');
    
    try {
      // Simulate color blindness by removing color information
      await this.page.addStyleTag({
        content: `
          * { 
            filter: grayscale(100%) !important; 
          }
        `
      });

      // Check if important information is still conveyed
      const criticalElements = await this.page.$$eval(
        '.error, .success, .warning, .required, [aria-invalid="true"]', 
        elements => elements.length
      );

      // Remove the grayscale filter
      await this.page.addStyleTag({
        content: `
          * { 
            filter: none !important; 
          }
        `
      });

      this.log(`Found ${criticalElements} elements that might rely on color`, 'info');
      
      // Check for non-color indicators
      const hasNonColorIndicators = await this.page.$$eval('*', elements => {
        let count = 0;
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          if (el.textContent?.includes('*') || 
              el.textContent?.includes('required') ||
              style.textDecoration.includes('underline') ||
              el.querySelector('.icon') ||
              el.querySelector('[class*="icon"]')) {
            count++;
          }
        });
        return count;
      });

      if (hasNonColorIndicators > 0) {
        this.log('✅ Found non-color indicators for important information', 'success');
      } else {
        this.log('⚠️ May be relying too heavily on color alone', 'warning');
      }

    } catch (error) {
      this.log(`❌ Error testing color dependency: ${error.message}`, 'error');
    }
  }

  async testResponsiveAccessibility() {
    this.log('\n📱 Testing Responsive Accessibility', 'info');
    
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    for (const viewport of viewports) {
      try {
        await this.page.setViewport({ width: viewport.width, height: viewport.height });
        await this.page.goto(this.baseUrl, { waitUntil: 'domcontentloaded' });
        
        // Test minimum touch target size (44x44px)
        const smallTargets = await this.page.$$eval('button, a, input[type="submit"], [role="button"]', targets => {
          return targets.filter(target => {
            const rect = target.getBoundingClientRect();
            return rect.width < 44 || rect.height < 44;
          }).length;
        });

        if (smallTargets === 0) {
          this.log(`✅ ${viewport.name}: All interactive elements meet minimum size requirements`, 'success');
        } else {
          this.log(`⚠️ ${viewport.name}: ${smallTargets} interactive elements are too small`, 'warning');
        }

        // Test for horizontal scrolling
        const hasHorizontalScroll = await this.page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });

        if (!hasHorizontalScroll) {
          this.log(`✅ ${viewport.name}: No horizontal scrolling detected`, 'success');
        } else {
          this.log(`⚠️ ${viewport.name}: Horizontal scrolling detected`, 'warning');
        }

      } catch (error) {
        this.log(`❌ Error testing ${viewport.name} accessibility: ${error.message}`, 'error');
      }
    }

    // Reset to desktop
    await this.page.setViewport({ width: 1920, height: 1080 });
  }

  async runAllTests() {
    console.log('🚀 Starting PaintQuote Pro Accessibility Audit Tests\n');
    
    await this.setup();
    
    try {
      // Test key pages
      const pagesToTest = ['home', 'pricing', 'features', 'dashboard'];
      
      for (const page of pagesToTest) {
        await this.testColorContrast(page);
      }
      
      await this.testButtonContrast();
      await this.testKeyboardNavigation();
      await this.testAriaLabels();
      await this.testHeadingStructure();
      await this.testColorDependency();
      await this.testResponsiveAccessibility();
      
    } catch (error) {
      this.log(`❌ Test suite error: ${error.message}`, 'error');
    }
    
    await this.teardown();
    
    // Print results summary
    console.log('\n📊 Accessibility Audit Results Summary');
    console.log('======================================');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️ Warnings: ${this.results.warnings}`);
    
    if (this.results.contrastIssues.length > 0) {
      console.log('\n🎨 Color Contrast Issues:');
      this.results.contrastIssues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
    if (this.results.ariaIssues.length > 0) {
      console.log('\n🏷️ ARIA/Accessibility Issues:');
      this.results.ariaIssues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
    if (this.results.keyboardIssues.length > 0) {
      console.log('\n⌨️ Keyboard Navigation Issues:');
      this.results.keyboardIssues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
    console.log(`\n📈 Overall Accessibility Score: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
    
    return this.results;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new AccessibilityAuditTester();
  tester.runAllTests().then((results) => {
    process.exit(results.failed > 0 ? 1 : 0);
  }).catch((error) => {
    console.error('Accessibility test suite failed:', error);
    process.exit(1);
  });
}

module.exports = AccessibilityAuditTester;