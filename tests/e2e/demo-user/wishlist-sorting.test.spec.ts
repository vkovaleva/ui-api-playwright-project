import { expect } from '@playwright/test';
import { test } from '../../../configs/test-options';
import { Goods } from '../../../bo/goods/goods';
import { GoodsFactory } from '../../../bo/goods/goods.factory';
import { wishlistSortOption } from '../../../utils/options';
import * as utility from '../../../utils/utility';

test.describe('Wishlist Sorting Feature', async () => {
  test.beforeEach(async ({ pageManager }) => {
    const goodsArr: Goods[] = [];
    const goodsDresses = GoodsFactory.createGoods('dress', 3);
    const goodsSkirts = GoodsFactory.createGoods('skirt', 1);
    goodsArr.push(goodsDresses, goodsSkirts);
    for (const good of goodsArr) {
      await pageManager.onHeader().searchByName(good.getGoodType());
      await pageManager.onSearchResultPage().addGoodsToWishlist(good.getQuantity());
    }
    await pageManager.onHeader().goToWishlist();
  });

  const sortOptions = [
    {
      sortOptionFromApp: wishlistSortOption['Price: high to low'],
      sortOptionForCheck: utility.sortByPriceDesc,
    },
    {
      sortOptionFromApp: wishlistSortOption['Price: low to high'],
      sortOptionForCheck: utility.sortByPriceAsc,
    },
    {
      sortOptionFromApp: wishlistSortOption['Brand A-Z'],
      sortOptionForCheck: utility.sortAlphabeticallyAsc,
    },
    {
      sortOptionFromApp: wishlistSortOption['Brand Z-A'],
      sortOptionForCheck: utility.sortAlphabeticallyDesc,
    },
  ];
  for (const option of sortOptions) {
    test(`Goods should be sorted by ${option.sortOptionFromApp} if its set in filter`, async ({
      pageManager,
    }) => {
      const goodsInWishlist = await pageManager.onWishlistPage().getWishlistGoods();
      const sortedGoods = goodsInWishlist.sort(option.sortOptionForCheck);
      await pageManager.onWishlistPage().sortBy(option.sortOptionFromApp);
      const goodsInWishlistAfterSorting = await pageManager.onWishlistPage().getWishlistGoods();
      expect(utility.isArraysHaveSameOrder(sortedGoods, goodsInWishlistAfterSorting)).toBe(true);
    });
  }

  test(`Last added goods should be first in wishlist and 'Recently added' filter is set`, async ({
    pageManager,
  }) => {
    const goodsBeforeSorting = await pageManager.onWishlistPage().getWishlistGoods();
    await pageManager.onWishlistPage().sortBy(wishlistSortOption['Recently added']);
    const goodsAfterSorting = await pageManager.onWishlistPage().getWishlistGoods();
    expect(goodsBeforeSorting[0].getTitle()).toEqual(goodsAfterSorting[0].getTitle());
  });

  test(`Last goods should be first if 'Expiring soonest' is set in filter`, async ({
    pageManager,
  }) => {
    const goodsBeforeSorting = await pageManager.onWishlistPage().getWishlistGoods();
    await pageManager.onWishlistPage().sortBy(wishlistSortOption['Expiring soonest']);
    const goodsAfterSorting = await pageManager.onWishlistPage().getWishlistGoods();
    expect(goodsAfterSorting[0].getTitle()).toEqual(
      goodsBeforeSorting[goodsBeforeSorting.length - 1].getTitle(),
    );
  });
});
