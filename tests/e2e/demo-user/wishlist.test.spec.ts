import { expect } from '@playwright/test';
import { test } from '../../../configs/test-options';
import { GoodsFactory } from '../../../bo/goods/goods.factory';
import { sizeOptions } from '../../../utils/options';

test.describe('Wishlist Feature', async () => {
  const goodsForAddingToWishlist = [
    GoodsFactory.createGoods('dress', 1),
    GoodsFactory.createGoods('skirt', 1),
  ];
  for (const goodsTemplate of goodsForAddingToWishlist) {
    test(`${goodsTemplate.getQuantity()} ${goodsTemplate.getGoodType()} should be added to wishlist from product page`, async ({
      pageManager,
    }) => {
      await pageManager.onHeader().searchByName(goodsTemplate.getGoodType());
      await pageManager.onSearchResultPage().openProductPage(goodsTemplate);
      const addedGoods = await pageManager.onProductPage().addGoodsToWishlist(goodsTemplate);
      await pageManager.onHeader().goToWishlist();
      const wishlistGoods = await pageManager.onWishlistPage().getWishlistGoods();
      expect(wishlistGoods[0].getTitle()).toEqual(addedGoods.getTitle());
    });
  }

  const goodsWithSizeForAddingToWishlist = [
    GoodsFactory.createGoodsWithSize('dress', 1, sizeOptions.UK4),
    GoodsFactory.createGoodsWithSize('skirt', 1, sizeOptions.UK8),
  ];
  for (const goodsTemplate of goodsWithSizeForAddingToWishlist) {
    test(`${goodsTemplate.getQuantity()} ${goodsTemplate.getGoodType()} with set size ${goodsTemplate.getSize()} should be added to wishlist from product page`, async ({
      pageManager,
    }) => {
      await pageManager.onHeader().searchByName(goodsTemplate.getGoodType());
      await pageManager.onSearchResultPage().openProductPage(goodsTemplate);
      const addedGoods = await pageManager.onProductPage().addGoodsToWishlist(goodsTemplate);
      await pageManager.onHeader().goToWishlist();
      const wishlistGoods = await pageManager.onWishlistPage().getWishlistGoods();
      expect(wishlistGoods[0].getTitle()).toEqual(addedGoods.getTitle());
      expect(wishlistGoods[0].getPrice()).toEqual(addedGoods.getPrice());
    });
  }

  const goodsListForAddingToWishlist = [
    GoodsFactory.createGoods('dress', 3),
    GoodsFactory.createGoods('skirt', 1),
  ];
  for (const goods of goodsListForAddingToWishlist) {
    test(`${goods.getQuantity()} ${goods.getGoodType()} selected from search results should be added to wishlist`, async ({
      pageManager,
    }) => {
      await pageManager.onHeader().searchByName(goods.getGoodType());
      await pageManager.onSearchResultPage().addGoodsToWishlist(goods.getQuantity());
      await pageManager.onHeader().goToWishlist();
      expect(await pageManager.onWishlistPage().getWishlistGoodsCount()).toBe(goods.getQuantity());
      expect(
        await pageManager.onWishlistPage().isAllTitlesContainGoodsName(goods.getGoodType()),
      ).toBeTruthy();
    });
  }

  const goodsListForRemovalFromWishlist = [
    { goods: GoodsFactory.createGoods('dress', 3), removeNumber: 2 },
    { goods: GoodsFactory.createGoods('skirt', 1), removeNumber: 1 },
  ];
  for (const item of goodsListForRemovalFromWishlist) {
    test(`${
      item.goods.getQuantity() - item.removeNumber
    } ${item.goods.getGoodType()} should stay in wishlist if ${
      item.removeNumber
    } from ${item.goods.getQuantity()} ${item.goods.getGoodType()} were removed `, async ({
      pageManager,
    }) => {
      await pageManager.onHeader().searchByName(item.goods.getGoodType());
      await pageManager.onSearchResultPage().addGoodsToWishlist(item.goods.getQuantity());
      await pageManager.onHeader().goToWishlist();
      await pageManager.onWishlistPage().removeGoodsFromWishlist(item.removeNumber);
      expect(await pageManager.onWishlistPage().getWishlistGoodsCount()).toBe(
        item.goods.getQuantity() - item.removeNumber,
      );
    });
  }
});
