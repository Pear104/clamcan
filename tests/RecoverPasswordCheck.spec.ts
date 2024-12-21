import { test, expect } from '@playwright/test';

test('Recover password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('Log in').click();
  await page.getByRole('link', { name: 'Forgot your password?' }).click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('nguyentrunghung03@gmail.com');
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
});