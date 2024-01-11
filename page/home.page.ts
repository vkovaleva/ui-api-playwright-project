import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get acceptCookieButton() {
    return this.page.locator('#onetrust-button-group #onetrust-accept-btn-handler');
  }

  async acceptCookie() {
    await this.acceptCookieButton.click();
  }
}
