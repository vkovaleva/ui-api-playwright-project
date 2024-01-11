import { Goods } from '../bo/goods/goods';

export function sortByPriceAsc(a: Goods, b: Goods) {
  return a.getPrice() - b.getPrice();
}

export function sortByPriceDesc(a: Goods, b: Goods) {
  return b.getPrice() - a.getPrice();
}

export function sortAlphabeticallyAsc(a: Goods, b: Goods) {
  return ('' + a.getTitle()).localeCompare(b.getTitle());
}

export function sortAlphabeticallyDesc(a: Goods, b: Goods) {
  return ('' + b.getTitle()).localeCompare(a.getTitle());
}

export function isArraysHaveSameOrder(a: Goods[], b: Goods[]) {
  return (
    a.length === b.length &&
    a.every((element, index) => element.getPrice() === b[index].getPrice()) &&
    a.every((element, index) => element.getTitle() === b[index].getTitle())
  );
}
