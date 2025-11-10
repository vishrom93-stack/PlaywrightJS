import { test, expect } from '@playwright/test';
import { initializeLogin } from './InitializeLogin.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';

/**
 * @typedef {import('@playwright/test').Page} Page
 */

/**
 * 🛍️ Helper: Adds products to cart.
 * @param {Page} page
 * @param {string[]} [productIds]
 */
async function addProductsToCart(page, productIds = [
  'add-to-cart-sauce-labs-backpack',
  'add-to-cart-sauce-labs-bike-light',
]) {
  for (const id of productIds) {
    await page.locator(`[data-test="${id}"]`).click();
  }

  // ✅ Verify badge updates correctly
  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveText(String(productIds.length));
}

/**
 * 🧭 Full Checkout Flow
 */
export function runFullCheckoutFlow() {
  test.describe('🧭 Full Checkout Flow', () => {
    /** @type {CartPage} */
    let CartPageInstance;

    /** @type {CheckoutPage} */
    let CheckoutPageInstance;

    test.beforeEach(async ({ page }) => {
      /** @type {Page} */
      const typedPage = page;

      // ♻️ Reuse login helper
      await initializeLogin(typedPage);

      // 🧩 Initialize page objects
      CartPageInstance = new CartPage(typedPage);
      CheckoutPageInstance = new CheckoutPage(typedPage);
    });

    // 🧩 1️⃣ Add Products to Cart and Verify Badge
    test('🧩 Add Products to Cart and Verify Badge', async () => {
      await addProductsToCart(CartPageInstance.page);
    });

    // 🛒 2️⃣ Open Cart Page
    test('🛒 Open Cart Page', async () => {
      await addProductsToCart(CartPageInstance.page);
      await CartPageInstance.openCartPage();
      await CartPageInstance.assertOnCartPage();
    });

    // 🚀 3️⃣ Proceed to Checkout Step One
    test('🚀 Proceed to Checkout Step One', async () => {
      await addProductsToCart(CartPageInstance.page);
      await CartPageInstance.openCartPage();
      await CartPageInstance.proceedToCheckout();
      await CheckoutPageInstance.assertOnStepOne();
    });

    // ✍️ 4️⃣ Fill Step One Form
    test('✍️ Fill Step One Form', async () => {
      await addProductsToCart(CartPageInstance.page);
      await CartPageInstance.openCartPage();
      await CartPageInstance.proceedToCheckout();
      await CheckoutPageInstance.assertOnStepOne();
      await CheckoutPageInstance.fillStepOneForm('Romi', 'Tester', '12345');
    });

    // 📦 5️⃣ Verify Step Two Overview
    test('📦 Verify Step Two Overview', async () => {
      await addProductsToCart(CartPageInstance.page);
      await CartPageInstance.openCartPage();
      await CartPageInstance.proceedToCheckout();
      await CheckoutPageInstance.fillStepOneForm('Romi', 'Tester', '12345');
      await CheckoutPageInstance.clickContinue();
   
    });

    // 🎉 6️⃣ Complete Checkout and Verify Thank You Page
    test('🎉 Complete Checkout and Verify Thank You Page', async () => {
      await addProductsToCart(CartPageInstance.page);
      await CartPageInstance.openCartPage();
      await CartPageInstance.proceedToCheckout();
      await CheckoutPageInstance.fillStepOneForm('Romi', 'Tester', '12345');
      await CheckoutPageInstance.clickContinue();
      await CheckoutPageInstance.finishCheckout();
      await CheckoutPageInstance.assertOnComplete();
    });
  });
}
