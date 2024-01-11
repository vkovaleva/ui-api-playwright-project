export class Goods {
  private title: string;
  private price: number;
  private quantity: number;
  private goodType: string;
  private size: string;

  constructor(title: string = '', goodType: string = '', quantity: number = 1, price: number = 0) {
    this.goodType = goodType;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.size = '';
  }

  setGoodType(type: string) {
    this.goodType = type;
  }

  getGoodType(): string {
    return this.goodType;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }

  setPrice(price: number) {
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }

  setSize(size: string) {
    this.size = size;
  }

  getSize(): string {
    return this.size;
  }
}
