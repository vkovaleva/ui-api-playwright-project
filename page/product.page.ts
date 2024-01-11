import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { Goods } from '../bo/goods/goods';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get wishlistButton() {
    return this.page.locator('[data-testid="primaryActions"] [data-testid="saveForLater"]');
  }

  get addToBagButton() {
    return this.page.getByTestId('add-button');
  }

  get goodsTitle() {
    return this.page.locator('#asos-product h1');
  }

  get goodsPrice() {
    return this.page.getByTestId('current-price');
  }

  get goodSizeSelector() {
    return this.page.locator('#variantSelector');
  }

  async chooseGoodsSize(sizeOption: string) {
    const optionToSelect =
      (await this.page.locator('option', { hasText: sizeOption }).textContent()) || '';
    await this.goodSizeSelector.selectOption({ label: optionToSelect });
  }

  async addGoodsToWishlist(goods: Goods) {
    const goodsWithInfo = await this.addGoodsInfo(goods);
    if (goods.getSize()) await this.chooseGoodsSize(goods.getSize());
    await this.wishlistButton.click();
    return goodsWithInfo;
  }

  async addGoodsToBacket(goods: Goods) {
    const goodsWithInfo = await this.addGoodsInfo(goods);
    await this.chooseGoodsSize(goods.getSize());
    await this.addToBagButton.click();
    return goodsWithInfo;
  }

  private async addGoodsInfo(goods: Goods) {
    const productTitle = (await this.goodsTitle.textContent()) || '';
    let productPrice = (await this.goodsPrice.textContent()) || '';
    productPrice = productPrice.replace(/^\D+/g, '');
    goods.setTitle(productTitle);
    goods.setPrice(+productPrice);
    return goods;
  }
}
