import { test, expect } from '@playwright/test';

test('Create campaign', async ({ page }) => {
  const randomString = Math.random().toString(36).substring(2, 15);

  await page.goto('http://localhost:3000/');
  await page.locator('.inline-block > .p-2').click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('freedomtohongkong@gmail.com');
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.getByRole('menu').getByText('Campaigns').click();

  await page.getByRole('menuitem', { name: 'desktop Campaigns' }).click();
  await page.getByRole('row', { name: '#40' }).getByRole('button').click();
  await page.getByPlaceholder('Campaign Name').click();
  await page.getByPlaceholder('Campaign Name').fill(`Tuyển nhân viên bán bánh xèo - ${randomString}`);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('tbody')).toContainText('Recently Updated');
  await expect(
    page
      .getByRole('cell', { name: `Tuyển nhân viên bán bánh xèo - ${randomString} Recently Updated` })
      .getByRole('link')
  ).toBeVisible();
});