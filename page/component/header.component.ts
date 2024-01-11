import { Page } from '@playwright/test';
import { BaseComponent } from './base.component';

export class HeaderComponent extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  get accountIconButton() {
    return this.page.getByTestId('myAccountIcon');
  }

  get searchInput() {
    return this.page.getByTestId('search-input');
  }

  get signInLink() {
    return this.page.getByTestId('signin-link');
  }

  get wishlistIcon() {
    return this.page.getByTestId('savedItemsIcon');
  }

  get basketIcon() {
    return this.page.getByTestId('miniBagIcon');
  }

  async goToSignIn() {
    await this.accountIconButton.hover();
    await this.signInLink.click();
  }

  async goToWishlist() {
    await this.page.keyboard.down('PageUp');
    await this.wishlistIcon.click();
  }

  async goToBacket() {
    await this.page.keyboard.down('PageUp');
    await this.basketIcon.click();
  }

  async searchByName(name: string) {
    await this.searchInput.fill(name);
    await this.searchInput.press('Enter');
  }
}
