import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/checkout');
  }

  async expectItemInCart(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async expectCartCount(count: number) {
    const items = this.page.getByTestId('cart-item');
    await expect(items).toHaveCount(count);
  }

  async removeItem() {
    await this.page.getByRole('button', { name: 'Remove' }).first().click();
  }
}