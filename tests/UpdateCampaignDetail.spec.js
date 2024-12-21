import { test, expect } from '@playwright/test';

test('Create campaign', async ({ page }) => {
  // Generate random cost between 1 and 1000
  const randomCost = Math.floor(Math.random() * 1000) + 1;

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
  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByPlaceholder('Cost Amount').click();
  await page.getByPlaceholder('Cost Amount').fill(randomCost.toString());
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Update campaign successfully')).toBeVisible();

  await expect(page.getByText(randomCost.toString(), { exact: true })).toBeVisible();
});