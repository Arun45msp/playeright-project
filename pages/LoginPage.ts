import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/auth/login');
  }

async login(email: string, password: string) {
  await this.page.locator("[data-test='email']").fill(email);
  await this.page.locator("[data-test='password']").fill(password);
  await this.page.locator("[data-test='login-submit']").click();
}

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('/account');
  }

  async expectLoginError() {
    await expect(
      this.page.getByText('Invalid email or password')
    ).toBeVisible();
  }
}