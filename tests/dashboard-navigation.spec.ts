import { test, expect } from '@playwright/test';

const TEST_COMPANY = {
  name: 'Test Painting Co',
  email: 'test@example.com',
  accessCode: 'TEST123'
};

test.describe('Dashboard Navigation Tests', () => {
  // Helper to set up authentication
  async function setupAuth(page) {
    // Set up localStorage with valid auth
    await page.addInitScript(() => {
      localStorage.setItem('paintquote_company', JSON.stringify({
        id: 1,
        accessCode: 'TEST123',
        name: 'Test Painting Co',
        email: 'test@example.com',
        loginTime: Date.now(),
        onboarding_completed: true
      }));
    });
  }

  test.beforeEach(async ({ page }) => {
    // Set up auth before each test
    await setupAuth(page);
  });

  test('Dashboard loads without redirecting to login', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Should stay on dashboard, not redirect to login
    await expect(page).toHaveURL(/\/dashboard$/);
    
    // Should see company name
    await expect(page.locator('text=Test Painting Co')).toBeVisible();
    
    // Should NOT see access code displayed
    await expect(page.locator('text=Your Access Code')).not.toBeVisible();
  });

  test('Quick Actions - AI Quote Assistant', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Click AI Quote Assistant
    await page.click('text=AI Quote Assistant');
    
    // Should navigate to create quote page
    await expect(page).toHaveURL(/\/create-quote$/);
    
    // Should NOT redirect to login
    await expect(page).not.toHaveURL(/\/access-code/);
  });

  test('Quick Actions - Manage Customers', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Click Manage Customers
    await page.click('text=Manage Customers');
    
    // Should navigate to customers page
    await expect(page).toHaveURL(/\/dashboard\/customers$/);
    
    // Should NOT redirect to login
    await expect(page).not.toHaveURL(/\/access-code/);
    
    // Should see customers page content
    await expect(page.locator('h1:has-text("Customers")')).toBeVisible();
  });

  test('Quick Actions - ROI Calculator', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Click ROI Calculator
    await page.click('text=ROI Calculator');
    
    // Should navigate to ROI calculator
    await expect(page).toHaveURL(/\/roi-calculator$/);
    
    // Should NOT redirect to login
    await expect(page).not.toHaveURL(/\/access-code/);
  });

  test('Sidebar Navigation - All Links', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Test Quotes link
    await page.click('nav >> text=Quotes');
    await expect(page).toHaveURL(/\/dashboard\/quotes$/);
    await expect(page).not.toHaveURL(/\/access-code/);
    
    // Test Settings link
    await page.click('nav >> text=Settings');
    await expect(page).toHaveURL(/\/dashboard\/settings$/);
    await expect(page).not.toHaveURL(/\/access-code/);
    
    // Test Billing link
    await page.click('nav >> text=Billing');
    await expect(page).toHaveURL(/\/dashboard\/settings\/billing$/);
    await expect(page).not.toHaveURL(/\/access-code/);
  });

  test('Locked Stats redirect to sales page, not login', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Click on locked Win Rate stat
    const winRateCard = page.locator('text=Unlock win rate analytics').locator('..');
    await winRateCard.click();
    
    // Should go to unlock analytics page
    await expect(page).toHaveURL(/\/unlock-analytics$/);
    
    // Should NOT redirect to login
    await expect(page).not.toHaveURL(/\/access-code/);
    
    // Should see pricing options
    await expect(page.locator('text=Turn Data Into More Wins')).toBeVisible();
  });

  test('Magic Link Authentication Flow', async ({ page }) => {
    // Clear any existing auth
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    
    // Simulate magic link verification
    await page.goto('http://localhost:3000/auth/verify?token=test-token');
    
    // Would need to mock the API response here
    // For now, we'll just verify the page loads
    await expect(page.locator('text=Email Verification')).toBeVisible();
  });

  test('Access Code Login Flow', async ({ page }) => {
    // Clear any existing auth
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    
    // Go to login page
    await page.goto('http://localhost:3000/access-code');
    
    // Fill in login form
    await page.fill('input[placeholder="Enter your company name"]', TEST_COMPANY.name);
    await page.fill('input[placeholder="Enter your access code"]', TEST_COMPANY.accessCode);
    
    // Click sign in
    await page.click('button:has-text("Sign In")');
    
    // After successful login, should redirect to dashboard
    // (Would need API mocking for full test)
  });

  test('Returning User sees personalized login', async ({ page }) => {
    // Set up partial auth (name but no full auth)
    await page.addInitScript(() => {
      localStorage.setItem('paintquote_company', JSON.stringify({
        name: 'Test Painting Co'
      }));
    });
    
    await page.goto('http://localhost:3000/access-code');
    
    // Should see welcome back message
    await expect(page.locator('text=Welcome back, Test Painting Co')).toBeVisible();
    
    // Should NOT see company name field
    await expect(page.locator('input[placeholder="Enter your company name"]')).not.toBeVisible();
    
    // Should only see access code field
    await expect(page.locator('input[placeholder="Enter your access code"]')).toBeVisible();
  });

  test('Session persists across page refreshes', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    
    // Verify we're on dashboard
    await expect(page).toHaveURL(/\/dashboard$/);
    
    // Refresh the page
    await page.reload();
    
    // Should still be on dashboard
    await expect(page).toHaveURL(/\/dashboard$/);
    
    // Should NOT redirect to login
    await expect(page).not.toHaveURL(/\/access-code/);
  });

  test('No console errors on navigation', async ({ page }) => {
    const errors: string[] = [];
    
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Navigate through various pages
    await page.goto('http://localhost:3000/dashboard');
    await page.click('text=AI Quote Assistant');
    await page.goto('http://localhost:3000/dashboard');
    await page.click('text=Manage Customers');
    
    // Should have no console errors
    expect(errors).toHaveLength(0);
  });
});