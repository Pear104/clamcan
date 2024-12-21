import { test, expect } from "@playwright/test";

test("Register", async ({ page }) => {
  const randomString = Math.random().toString(36).substring(7);
  const email = `xoxiba9578@cantozil.com`;
  // const email = `${randomString}@example.com`;
  await page.goto("http://localhost:3000/");
  await page.getByText("Log in").click();
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.getByPlaceholder("Your email address").click();
  await page.getByPlaceholder("Your email address").fill(email);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill("12345678");
  await page.locator('input[name="confirmPassword"]').click();
  await page.locator('input[name="confirmPassword"]').fill("12345678");
  await page.getByRole("button", { name: "Sign Up", exact: true }).click();
  await page.getByRole("link", { name: "Login" }).click();
  await expect(page.getByRole("heading")).toContainText("Sign In");
});
