import { usersSauce } from '../data/UsersSauce.js';
import { assertAcceptedUser } from './ValidLoginTests.js';

/**
 * 🌟 Reusable function that logs in with a valid user and ensures
 * the "Products" page is loaded.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @returns {Promise<void>}
 */
export async function initializeLogin(page) {
  // Choose the first valid user from usersSauce
  const user =
    usersSauce.acceptedUsers?.[0] || {
      username: usersSauce.validUsernames?.[0],
      password: usersSauce.password,
    };

  // ✅ Handles open, login, and success confirmation
  await assertAcceptedUser(user, page);
}
