import { test, expect } from '@playwright/test';

test('List campaign', async ({ page }) => {
  const randomString = Math.random().toString(36).substring(2, 15);

  await page.goto('http://localhost:3000/');
  await page.locator('.inline-block > .p-2').click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('freedomtohongkong@gmail.com');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  await page.getByRole('menuitem', { name: 'desktop Campaigns' }).click();
  await expect(page.getByRole('link', { name: 'Campaigns' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
});