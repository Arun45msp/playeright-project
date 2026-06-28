import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async searchProduct(name: string) {
    await this.page.getByPlaceholder('Search').fill(name);
    await this.page.getByPlaceholder('Search').press('Enter');
  }

  async selectProduct(name: string) {
    await this.page.getByText(name).first().click();
  }

  async addToCart() {
   
    
  }

  async expectProductVisible(name: string) {
    await expect(this.page.getByText(name).first()).toBeVisible();
  }
}