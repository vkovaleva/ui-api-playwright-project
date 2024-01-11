import { Goods } from './goods';

export class GoodsFactory {
  static createGoods(name: string, quantity: number): Goods {
    return new Goods(name, name, quantity);
  }

  static createGoodsWithSize(name: string, quantity: number, size: string): Goods {
    const goods = this.createGoods(name, quantity);
    goods.setSize(size);
    return goods;
  }
}
