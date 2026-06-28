import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {

  test('valid credentials redirect to account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      'customer@practicesoftwaretesting.com',
      'welcome01'
    );
    await loginPage.expectLoginSuccess();
  });

  test('invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong@email.com', 'wrongpass');
    await loginPage.expectLoginError();
  });

  test('empty fields shows validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(page.getByText('Email is required')).toBeVisible();
  });

});