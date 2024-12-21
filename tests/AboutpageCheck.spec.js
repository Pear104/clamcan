const { test, expect } = require('@playwright/test');

test('About Us Page Navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('link', { name: 'About', exact: true }).click();
    expect(page.url()).toBe('http://localhost:3000/about');
});

test('Check welcome and mission statement', async ({ page }) => {
    await page.goto('localhost:3000/about');
    
    const content = await page.textContent('body');
    expect(content).toContain('Welcome to');
    expect(content).toContain('Headhunters');
});

test('Check about', async ({ page }) => {
    await page.goto('localhost:3000/about');
    
    const content = await page.textContent('body');
    expect(content).toContain('About us');
});

test('Our people', async ({ page }) => {
    await page.goto('localhost:3000/about');
    const content = await page.textContent('.text-4xl');
    expect(content).toBe('Our People');
});

test('Our story', async ({ page }) => {
    await page.goto('localhost:3000/about');
    const content = await page.textContent('body');
    expect(content).toContain('Our Story');
});

test('Check footer', async ({ page }) => {
    await page.goto('localhost:3000/about');
    
    await expect(page.locator('footer h2:has-text("CONTACT")')).toBeVisible();
  });
  