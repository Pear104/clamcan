import { test, expect } from '@playwright/test';

test('Pinned jobs', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: 'Popular Jobs' })).toBeVisible();
  await expect(page.locator('div:nth-child(5) > .container > div:nth-child(2)')).toBeVisible();
  await expect(page.getByText('Search all the open positions').first()).toBeVisible();
});