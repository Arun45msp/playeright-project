import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {

  test('item added to cart appears in checkout', async ({ page }) => {
    // Add item via product page
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.searchProduct('Pliers');
    await productPage.selectProduct('Pliers');
    await productPage.addToCart();

    // Verify in cart
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.expectItemInCart('Pliers');
  });

  test('removing item updates cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.searchProduct('Pliers');
    await productPage.selectProduct('Pliers');
    await productPage.addToCart();

    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.removeItem();

    // Cart should be empty
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

});