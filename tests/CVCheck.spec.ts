import { test, expect } from "@playwright/test";
import path from "path";

test.describe.serial("Running test sequentially", () => {
  test("Upload CV", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Log in").click();
    await page.getByPlaceholder("Your email address").click();
    await page
      .getByPlaceholder("Your email address")
      .fill("nguyentrunghung03@gmail.com");
    await page.getByPlaceholder("Your password").click();
    await page.getByPlaceholder("Your password").fill("12345678");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();
    await page.getByText("nguyentrunghung03@gmail.com").hover();
    await page.getByRole("link", { name: "Profile" }).click();
    await page.getByRole("button", { name: "CV" }).click();

    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByRole('button', { name: 'upload Select File' }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "./asset/fig9.pdf"));

    await expect(
      page.getByRole("link", { name: "fig9.pdf" })
    ).toBeVisible();
  });

  test("Delete CV", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByText("Log in").click();
    await page.getByPlaceholder("Your email address").click();
    await page
      .getByPlaceholder("Your email address")
      .fill("nguyentrunghung03@gmail.com");
    await page.getByPlaceholder("Your password").click();
    await page.getByPlaceholder("Your password").fill("12345678");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();
    await page.getByText("nguyentrunghung03@gmail.com").hover();
    await page.getByRole("link", { name: "Profile" }).click();
    await page.getByRole("button", { name: "CV" }).click();

    await page
      .locator("div")
      .filter({ hasText: /^fig9\.pdf$/ })
      .locator("div")
      .click();
    await expect(page.getByText("You haven't upload any CV yet")).toBeVisible();
  });
});
