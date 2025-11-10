import { test } from '@playwright/test';
import { usersSauce } from '../data/UsersSauce.js';
import { assertAcceptedUser } from '../helpers/ValidLoginTests.js';

test.describe('✅ Login Suite - SauceDemo', () => {
  usersSauce.acceptedUsers.forEach((user) => {
    test(`Login with accepted user: ${user.username}`, async ({ page }) => {
      await assertAcceptedUser(user, page);
    });
  });
});
