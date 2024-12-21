import { test, expect } from '@playwright/test';

test('Job list', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('#mobile-menu-2').getByRole('link', { name: 'Job' }).click();
  await expect(page.getByText('Cool Jobs For You')).toBeVisible();
  await expect(page.locator('.col-span-7 > .w-full')).toBeVisible();
  await expect(page.getByPlaceholder('Search Jobs...')).toBeVisible();
  await expect(page.getByText('PositionPlaceSalary')).toBeVisible();
});