import { expect } from '@playwright/test';
import { test } from '../../../configs/test-options';
import { UserFactory } from '../../../bo/user/user.factory';

test.describe('Login Feature', async () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.onHeader().goToSignIn();
  });

  test(`Negative: validation message should be shown if user log in with empty password`, async ({
    pageManager,
  }) => {
    const user = UserFactory.createUserWithoutPassword();
    await pageManager.onLoginPage().signIn(user);
    expect(
      await pageManager
        .onLoginPage()
        .isValidationMessageWithTextExist('password', 'Hey, we need a password here'),
    ).toBeTruthy();
  });

  test(`Negative: validation message should be shown if user log in with empty email`, async ({
    pageManager,
  }) => {
    const user = UserFactory.createUserWithoutEmail();
    await pageManager.onLoginPage().signIn(user);
    expect(
      await pageManager
        .onLoginPage()
        .isValidationMessageWithTextExist('email', 'Oops! You need to type your email here'),
    ).toBeTruthy();
  });
});
