import { test, expect } from '@playwright/test';
import { usersSauce } from '../data/UsersSauce.js';
import { assertAcceptedUser } from '../helpers/ValidLoginTests.js';

class CartPage {
  /** @type {import('@playwright/test').Page} */
  page;
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // 🌍 URL for the Cart page
    this.cartUrl = 'https://www.saucedemo.com/cart.html';

    // 🎯 Locators
    this.cartItem = '.cart_item';
    this.checkoutButton = '[data-test="checkout"]';
    this.title = '.title';
  }

  // ✅ Assert user is on the cart page
  async assertOnCartPage() {
    await expect(this.page).toHaveURL(this.cartUrl);
    await expect(this.page.locator(this.title)).toHaveText('Your Cart');
  }

  // 🧭 Open the cart page
  async openCartPage() {
    const cartLink = '.shopping_cart_link';
    const hasCartLink = await this.page.locator(cartLink).count();
    if (hasCartLink) {
      await this.page.click(cartLink);
    } else {
      await this.page.goto(this.cartUrl);
    }

    try {
      await expect(this.page.locator(this.title)).toBeVisible({ timeout: 7000 });
    } catch {
      await expect(this.page.locator(this.cartItem).first()).toBeVisible({ timeout: 7000 });
    }
  }

  // 🔍 Count cart items
  async getCartItemCount() {
    return await this.page.locator(this.cartItem).count();
  }

  // 🚀 Proceed to checkout
  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}

export default CartPage;

// ✅ Initialization test (now includes the empty-cart badge check)
test('📜 CartPage test initialization', async ({ page }) => {
  // 🔐 Login before verifying cart
  const user =
    usersSauce.acceptedUsers?.[0] || {
      username: usersSauce.validUsernames?.[0],
      password: usersSauce.password,
    };

  await assertAcceptedUser(user, page);

  // 🕒 Wait for Products page to load
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');

  // 🧼 Verify cart badge initial state (empty)
  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveCount(0);
});