import { test, expect } from '@playwright/test';

test('Create campaign', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('.inline-block > .p-2').click();
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('freedomtohongkong@gmail.com');
  await page.getByPlaceholder('Your password').click();

  await page.getByPlaceholder('Your password').click();
  await page.getByPlaceholder('Your password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  await page.getByRole('menu').getByText('Campaigns').click();
  await page.getByRole('button', { name: '+ New Campaign' }).click();
  await page.getByPlaceholder('Campaign Name').click();
  await page.getByPlaceholder('Campaign Name').fill('Can tuyen cong an danh dan');
  await page.getByPlaceholder('Campaign Start Date').fill('2024-11-01');
  await page.getByPlaceholder('Campaign End Date').fill('2024-11-02');
  await page.getByPlaceholder('Cost Amount').click();
  await page.getByPlaceholder('Cost Amount').fill('123');
  await page.getByPlaceholder('Hiring Amount').click();
  await page.getByPlaceholder('Hiring Amount').fill('234');
  await page.getByPlaceholder('Campaign Logo Link').click();
  await page.getByPlaceholder('Campaign Logo Link').fill('https://upload.wikimedia.org/wikipedia/en/7/73/Trollface.png');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('# Nice');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByText('Add campaign successfully')).toBeVisible();
});