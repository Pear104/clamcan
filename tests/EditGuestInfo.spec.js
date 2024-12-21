import { test, expect } from '@playwright/test';


test('Edit Guest info', async ({ page }) => {
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
  
    await page.locator('input[name="name"]').dblclick();
    await page.locator('input[name="name"]').fill('Hung');
    await page.locator('input[name="school"]').click();
    await page.locator('input[name="school"]').dblclick();
    await page.locator('input[name="school"]').fill('FPT University');
    await page.locator('input[name="major"]').dblclick();
    await page.locator('input[name="major"]').fill('IT');
    await page.locator('select[name="degree"]').selectOption('Bachelor');
    await page.locator('input[name="dob"]').fill('2024-04-04');
    await page.locator('input[name="phone"]').click();
    await page.locator('input[name="phone"]').fill('0123456789');
    await page.locator('input[name="address"]').click();
    await page.locator('input[name="address"]').fill('Joe\'s house');
    await page.locator('.w-md-editor-area').click();
    await page.locator('textarea').dblclick();
    await page.locator('textarea').fill('# Nice');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Update profile successfully')).toBeVisible();
  });
  