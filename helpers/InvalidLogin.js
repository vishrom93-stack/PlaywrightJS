import { test } from '@playwright/test';
import { usersSauce } from '../data/UsersSauce.js';
import { errorLoginCase } from './ErrorLogin.js';

export function registerInvalidLoginTests() {
  test.describe('❌ Invalid Login Scenarios – SauceDemo', () => {
    usersSauce.errorUsers.forEach((user, index) => {
      const labelParts = [];

      if (user.username) labelParts.push(user.username, user.password);
      else labelParts.push('(empty username)');
      if (user.password === '') labelParts.push('(empty password)');

      const label = labelParts.join(' ');

      test(`Attempt login: ${label} [case ${index + 1}]`, async ({ page }) => {
        console.log(`🔒 Testing invalid login → ${label}`);
        await errorLoginCase(user, page);
      });
    });
  });
}
