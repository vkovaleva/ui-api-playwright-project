import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Goods } from '../bo/goods/goods';

export class WishlistPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get wishlistItems() {
    return this.page.locator('#savedlists li');
  }

  get wishListItemsTitles() {
    return this.page.locator('#savedlists li p');
  }

  get wishListItemsPrices() {
    return this.page.locator('#savedlists a div>span:first-child');
  }

  get bucketRemoveIcons() {
    return this.page.locator("button[aria-label='Delete']");
  }

  get wishlistFilter() {
    return this.page.locator('#sortBy');
  }

  async sortBy(sortOption: string) {
    await this.wishlistFilter.selectOption(sortOption);
  }

  async removeGoodsFromWishlist(goodsNumber: number) {
    await this.waitForNumberOfSeconds(3);
    for (let i = 0; i < goodsNumber; i++) {
      await this.bucketRemoveIcons.nth(i).click();
    }
  }

  async getWishlistGoodsCount() {
    await this.waitForNumberOfSeconds(5);
    const wishlistItemsCount = await this.wishlistItems.count();
    return wishlistItemsCount;
  }

  async getWishlistGoods() {
    await this.waitForNumberOfSeconds(3);
    const goodsArr: Goods[] = [];
    const wishlistItemsCount = await this.getWishlistGoodsCount();
    for (let i = 0; i < wishlistItemsCount; i++) {
      const title = (await this.wishListItemsTitles.nth(i).textContent()) || '';
      let price = (await this.wishListItemsPrices.nth(i).textContent()) || '';
      price = price.replace(/^\D+/g, '');
      goodsArr.push(new Goods(title, title, 1, Number(price)));
    }
    return goodsArr;
  }

  async isAllTitlesContainGoodsName(goodsName: string) {
    await this.waitForNumberOfSeconds(3);
    const wishlistItemsCount = await this.getWishlistGoodsCount();
    for (let i = 0; i < wishlistItemsCount; i++) {
      const title = await this.wishListItemsTitles.nth(i).textContent();
      if (!title?.includes(goodsName)) return false;
    }
    return true;
  }
}
