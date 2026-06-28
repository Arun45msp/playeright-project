import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {

  test('fetch all products returns 200', async ({ request }) => {
    const response = await request.get(
      'https://api.practicesoftwaretesting.com/products'
    );
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });

  test('login API returns token', async ({ request }) => {
    const response = await request.post(
      'https://api.practicesoftwaretesting.com/users/login',
      {
        data: {
          email: 'customer@practicesoftwaretesting.com',
          password: 'welcome01'
        }
      }
    );
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
  });

  test('network mock — simulate API failure', async ({ page }) => {
    await page.route('**/products**', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await page.goto('/');
    await expect(
      page.getByText('Something went wrong')
    ).toBeVisible();
  });

});