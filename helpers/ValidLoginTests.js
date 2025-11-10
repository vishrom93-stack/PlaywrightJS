import LoginPage from '../pages/LoginPage.js';

/**
 * Runner helper: perform successful login for a single user.
 * This does NOT declare Playwright tests; call it from a test.
 * 
 * @param {{username: string, password: string}} user
 * @param {import('@playwright/test').Page} page
 */
export async function assertAcceptedUser(user, page) {
  const loginPage = new LoginPage(page);

  // ✅ Just perform the login — open + verify already handled inside
  await loginPage.openLoginPage();
  await loginPage.login(user.username, user.password);
}
