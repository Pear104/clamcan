import { test, expect } from '@playwright/test';

test('Change guests password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('Log in').click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('nguyentrunghung03@gmail.com');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();


  await page.getByText('nguyentrunghung03@gmail.com').hover();
  await page.getByRole('link', { name: 'Change Password' }).click();
  await page.getByPlaceholder('Enter your new password').click();
  await page.getByPlaceholder('Enter your new password').fill('12345678');
  await page.getByPlaceholder('Confirm your new password').click();
  await page.getByPlaceholder('Confirm your new password').fill('12345678');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Change password successfully')).toBeVisible();
});

