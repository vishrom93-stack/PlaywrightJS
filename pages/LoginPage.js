import { expect } from '@playwright/test';
import { confirmSuccessfulLogin } from '../data/LoginConfirmation.js';

class LoginPage {
  // Locators
  usernameField = '[data-test="username"]';
  userPasswordField = '[data-test="password"]';
  loginButton = '[data-test="login-button"]';

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Actions & Methods
  async openLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page.locator('.login_logo')).toHaveText('Swag Labs');
  }

  /**
   * Logs in using the provided username and password,
   * and automatically confirms successful login.
   * 
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.page.locator(this.usernameField).fill(username);
    await this.page.locator(this.userPasswordField).fill(password);
    await this.page.locator(this.loginButton).click();

    // ✅ Automatically confirm successful login
    await confirmSuccessfulLogin(this.page);
  }
}

export default LoginPage;
