import { expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { usersSauce } from '../data/UsersSauce.js';

/**
 * Runner helper: assert the correct error message for a single invalid-login case.
 * This does NOT declare Playwright tests; it performs assertions inside a test.
 * @param {{username?: string, password?: string}} user
 * @param {import('@playwright/test').Page} page
 */
export async function errorLoginCase(user, page) {
  const loginPage = new LoginPage(page);
  const validUsernames = usersSauce.validUsernames;
  const validPassword = usersSauce.password;

  await loginPage.openLoginPage();
  await loginPage.login(user.username ?? '', user.password ?? '');

  const errorLocator = page.locator('[data-test="error"]');

  const username = user.username;
  const password = user.password;

  // 🎯 Switch-case for validation message
  switch (true) {
    // 🟥 Locked-out user (special)
    case username === 'locked_out_user' && password === validPassword:
      await expect(errorLocator).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
      );
      break;

    // 🟧 Username required
    case !username:
      await expect(errorLocator).toHaveText('Epic sadface: Username is required');
      break;

    // 🟨 Password required
    case username && !password:
      await expect(errorLocator).toHaveText('Epic sadface: Password is required');
      break;

  // 🟦 Invalid credentials (bad user or wrong password)
  case username && (!validUsernames.includes(username) || (validUsernames.includes(username) && password !== validPassword)):
      await expect(errorLocator).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
      );
      break;

    // 🟩 Fallback (unexpected edge)
    default:
      await expect(errorLocator).toHaveText('Epic sadface: Unknown login error');
      break;
  }
}
