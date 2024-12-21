import { test, expect } from '@playwright/test';

test('Dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('.inline-block > .p-2').click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('freedomtohongkong@gmail.com');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await expect(page.getByText('Campaigns').nth(1)).toBeVisible();
  await expect(page.getByText('Scheduled Posts')).toBeVisible();
  await expect(page.getByText('Onboard Campaigns')).toBeVisible();
});