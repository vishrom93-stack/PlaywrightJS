// pages/CheckoutPage.js
import { expect } from '@playwright/test';

export default class CheckoutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // 🌍 URLs
    this.stepOneUrl = 'https://www.saucedemo.com/checkout-step-one.html';
    this.stepTwoUrl = 'https://www.saucedemo.com/checkout-step-two.html';
    this.completeUrl = 'https://www.saucedemo.com/checkout-complete.html';

    // 🧾 Step One locators
    this.firstName = '[data-test="firstName"]';
    this.lastName = '[data-test="lastName"]';
    this.postalCode = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';

    // 📦 Step Two locators
    this.finishButton = '[data-test="finish"]';

    // 🎉 Complete page locators
    this.title = '.title';
    this.thankYouHeader = '.complete-header';
    this.thankYouText = '.complete-text';
  }

  // 🧾 Step One Assertions
  async assertOnStepOne() {
    await expect(this.page).toHaveURL(this.stepOneUrl);
    await expect(this.page.locator(this.title)).toHaveText('Checkout: Your Information');
  }

  // ✍️ Fill Step One form (no auto-continue)
  async fillStepOneForm(first = 'Romi', last = 'Tester', postal = '12345') {
    console.log('🧾 Filling Step One fields (no continue click)');
    await this.page.fill(this.firstName, first);
    await this.page.fill(this.lastName, last);
    await this.page.fill(this.postalCode, postal);
    // ❌ Do NOT click Continue automatically
  }

  // 👇 Manual continue button (only when test wants to)
  async clickContinue() {
    console.log('👉 Manually clicking Continue');
    await this.page.locator(this.continueButton).click();
  }

  // 📦 Step Two Assertions
  async assertOnStepTwo() {
    await expect(this.page).toHaveURL(this.stepTwoUrl);
    await expect(this.page.locator(this.title)).toHaveText('Checkout: Overview');
  }

  // 🎉 Finish Checkout Flow
  async finishCheckout() {
    await this.page.click(this.finishButton);
  }

  // ✅ Final Page Assertions
  async assertOnComplete() {
    await expect(this.page).toHaveURL(this.completeUrl);
    await expect(this.page.locator(this.title)).toHaveText('Checkout: Complete!');
    await expect(this.page.locator(this.thankYouHeader)).toHaveText('Thank you for your order!');
    await expect(this.page.locator(this.thankYouText)).toBeVisible();
  }
}
