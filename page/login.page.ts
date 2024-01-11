import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { User } from '../bo/user/user';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput() {
    return this.page.locator('input#EmailAddress');
  }

  get passwordInput() {
    return this.page.locator('input#Password');
  }

  get signInButton() {
    return this.page.locator('input#signin');
  }

  get errorBlock() {
    return this.page.locator('.error-block');
  }

  get passwordError() {
    return this.page.locator('#Password-error');
  }

  get emailError() {
    return this.page.locator('#EmailAddress-error');
  }

  async signIn(user: User) {
    await this.emailInput.fill(user.getEmail());
    await this.passwordInput.fill(user.getPassword());
    await this.signInButton.click();
  }

  async isValidationMessageWithTextExist(emptySource: string, messageText: string) {
    return emptySource === 'password'
      ? (await this.passwordError.isVisible()) &&
          (await this.passwordError.textContent())?.includes(messageText)
      : (await this.emailError.isVisible()) &&
          (await this.emailError.textContent())?.includes(messageText);
  }
}
