import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Goods } from '../bo/goods/goods';

export class SearchResultPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get searchResultBanner() {
    return this.page.locator('#search-term-banner');
  }

  get wishlistButton() {
    return this.page.locator('article button');
  }

  get linkToProduct() {
    return this.page.locator('article a');
  }

  async addGoodsToWishlist(goodsNumber: number) {
    for (let i = 0; i < goodsNumber; i++) {
      await this.wishlistButton.nth(i).click();
    }
  }

  async openProductPage(goods: Goods) {
    await this.linkToProduct.nth(goods.getQuantity() - 1).click();
  }
}
