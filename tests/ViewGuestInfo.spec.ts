import { test, expect } from '@playwright/test';

test('View Guest info', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByText('Log in').click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('nguyentrunghung03@gmail.com');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();


  await page.getByText('nguyentrunghung03@gmail.com').hover();
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page.getByText('Detail Information')).toBeVisible();
});

