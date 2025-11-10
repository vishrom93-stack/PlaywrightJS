import { expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { usersSauce } from '../data/UsersSauce.js'; // ✅ Direct import from same folder

/**
 * Runner helper: perform successful-login assertions for a single user.
 * This does NOT declare Playwright tests; call it from a test.
 * @param {{username: string, password: string}} user
 * @param {import('@playwright/test').Page} page
 */
export async function assertAcceptedUser(user, page) {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();

  // 🔐 Only handle the login action
  await loginPage.openLoginPage();
  await loginPage.login(user.username, user.password);
}