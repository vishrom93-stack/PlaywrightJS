import { expect } from '@playwright/test';

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    /** @type {import('@playwright/test').Page} */
    this.page = page;
    this.pageTitle = '[data-test="title"]';
    this.burgerMenu = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';
  }

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.page.locator(this.pageTitle)).toHaveText('Products');
  }

  async logout() {
    await this.page.locator(this.burgerMenu).click();
    await this.page.locator(this.logoutLink).click();
  }
}

export default InventoryPage;
