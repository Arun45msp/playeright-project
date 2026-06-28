import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product Search', () => {

  test.beforeEach(async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
  });

  test('search returns relevant results', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.searchProduct('Pliers');
    await productPage.expectProductVisible('Pliers');
  });

  test('product detail page loads', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.searchProduct('Hammer');
    await productPage.selectProduct('Hammer');

    // URL assertion
    await expect(page).toHaveURL(/p/);

    // Text assertion
    await expect(
      page.getByRole('heading', { name: 'Hammer' })
    ).toBeVisible();
  });

  test('add to cart works', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.searchProduct('Pliers');
    await productPage.selectProduct('Pliers');
    await productPage.addToCart();

    // Cart count increases
    await expect(page.locator('[data-test="nav-cart"]')).toContainText('1');
  });

});