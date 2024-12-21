const { test, expect } = require("@playwright/test");

test("About Us Page Navigation", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByText("Log in").click();
  await page.getByPlaceholder("Your email address").click();
  await page
    .getByPlaceholder("Your email address")
    .fill("xoyom61816@pokeline.com");
  await page.getByPlaceholder("Your password").click();
  await page.getByPlaceholder("Your password").fill("12345678");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page
    .locator("#mobile-menu-2")
    .getByRole("link", { name: "Job" })
    .click();
  await page
    .getByText(
      "Join Us as a Bussiness Analyst Today!AfghanistanMonday to FridayMarketingWe"
    )
    .click();
  await page.getByRole("button", { name: "Apply now" }).click();
  await page.getByRole("button", { name: "Apply now" }).click();
  //   await page
  //     .getByRole("combobox")
  //     .selectOption("qbFjoq0o3fLstBd55123/sEvTDq1jvk_pdf-cv.pdf");
  await page
    .locator("#webpack-dev-server-client-overlay")
    .contentFrame()
    .getByText("Uncaught runtime errors:×")
    .click();
  await page
    .locator("#webpack-dev-server-client-overlay")
    .contentFrame()
    .getByLabel("Dismiss")
    .click();
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await page.getByText("Logout").click();
  await page.locator(".inline-block > .p-2").click();
  await page.getByPlaceholder("Your email address").click();
  await page.getByPlaceholder("Your email address").click();
  await page
    .getByPlaceholder("Your email address")
    .fill("besihi4382@rustetic.com");
  await page.getByPlaceholder("Your password").click();
  await page.getByPlaceholder("Your password").fill("12345678");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page.getByRole("menuitem", { name: "Posts" }).locator("span").click();
  await page
    .getByRole("link", { name: "Join Us as a Graphic Designer" })
    .click();
  await page.goto("http://localhost:3000/worker/posts");
  await page.getByRole("link", { name: "Join Us as a Prompting" }).click();
  await page
    .getByRole("row", { name: "xoyom61816@pokeline.com Link" })
    .getByRole("button")
    .click();
  await page
    .getByLabel("Schedule interview for")
    .getByRole("button", { name: "Schedule" })
    .click();
  await page
    .getByRole("row", { name: "xoyom61816@pokeline.com Link" })
    .getByRole("button")
    .click();
  await page.locator('select[name="isPassed"]').selectOption("1");
  await page
    .locator("#webpack-dev-server-client-overlay")
    .contentFrame()
    .getByText("Uncaught runtime errors:×")
    .click();
  await page
    .locator("#webpack-dev-server-client-overlay")
    .contentFrame()
    .getByLabel("Dismiss")
    .click();
  await page.getByPlaceholder("Your note").click();
  await page.getByPlaceholder("Your note").fill("Good");
  await page
    .getByLabel("Review candidate xoyom61816@")
    .getByRole("button", { name: "Update" })
    .click();
});
