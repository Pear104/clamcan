import { test, expect } from '@playwright/test';

test('View campaign ', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('.inline-block > .p-2').click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('freedomtohongkong@gmail.com');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.getByRole('menu').getByText('Campaigns').click();
  
  await page.getByRole('link', { name: 'Tuyển nhân viên bán bánh xèo' }).click();
  await expect(page.locator('div').filter({ hasText: /^Posts of Campaign #40$/ }).first()).toBeVisible();
});