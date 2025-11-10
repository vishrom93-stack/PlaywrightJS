import { expect } from '@playwright/test';

/**
 * 🧩 Confirms that a user has successfully logged in to SauceDemo.
 * Verifies both URL and page header.
 *
 * @param {import('@playwright/test').Page} page - Playwright page object.
 */
export async function confirmSuccessfulLogin(page) {
  // ✅ Check the URL
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // ✅ Check the "Products" title
  const titleLocator = page.locator('[data-test="title"]');
  await expect(titleLocator).toBeVisible();
  await expect(titleLocator).toHaveText('Products');
} 
