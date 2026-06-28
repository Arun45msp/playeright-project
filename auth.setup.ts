import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {

  await page.goto('/auth/login',{ waitUntil: 'networkidle' });

  await page.locator("[data-test='email']").fill('customer@practicesoftwaretesting.com');
  await page.locator("[data-test='password']").fill('welcome01');
  await page.locator("[data-test='login-submit']").click();

  // Wait until login is confirmed
  await expect(page).toHaveURL('/account');

  // Save cookies + localStorage to auth.json
  await page.context().storageState({ path: 'auth.json' });
});