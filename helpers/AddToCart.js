import { expect } from '@playwright/test';
import { usersSauce } from '../data/UsersSauce.js';
import { assertAcceptedUser } from './ValidLoginTests.js';

/**
 * Runner helper: log in and add a set of products to the cart.
 * - Ensures we're on the inventory page before clicking
 * - Waits for each product selector to appear before clicking
 * @param {import('@playwright/test').Page} page
 * @param {string[]=} productIds optional list of product data-test ids
 */
export async function addToCart(page, productIds) {
  // Use the first accepted user by default
  const user = usersSauce.acceptedUsers?.[0] || {
    username: usersSauce.validUsernames?.[0],
    password: usersSauce.password,
  };

  // Ensure the user is logged in (assertAcceptedUser performs the login and checks)
  await assertAcceptedUser(user, page);

  // Wait for the inventory page to be ready
  await expect(page).toHaveURL(/inventory\.html/);

  const productsToAdd = productIds || [
    'add-to-cart-sauce-labs-backpack',
    'add-to-cart-sauce-labs-bike-light',
  ];

  // Click each product only after its selector is visible
  for (const productId of productsToAdd) {
    const selector = `[data-test="${productId}"]`;
    await page.waitForSelector(selector, { timeout: 10000 });
    await page.click(selector);
  }

  // Wait until the cart badge becomes visible after items are added
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible({ timeout: 7000 });
  await expect(cartBadge).toHaveText(String(productsToAdd.length));
}

export default { addToCart };
