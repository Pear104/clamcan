// @ts-check
const { test, expect } = require('@playwright/test');

// Check navigation to About page
test('has title', async ({ page }) => {
  await page.goto('localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('ClamCan Inc.');
});

test('Check homepage', async ({ page }) => {
  await page.goto('localhost:3000');
  
  // Check that home link contains div with w-full class
  await expect(page.locator('a:has-text("Home") div.w-full')).toBeVisible();
});

// Check for full sections

test('Check footer', async ({ page }) => {
  await page.goto('localhost:3000');
  
  await expect(page.locator('footer h2:has-text("CONTACT")')).toBeVisible();
});

test('Home sections', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('Find theBest Job offers for')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Popular Categories' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Millions of jobs. Find the' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Popular Jobs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Find Best Companies' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why is ClamCan good?' })).toBeVisible();
});