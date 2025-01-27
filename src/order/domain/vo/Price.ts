export class Price {
  private value: number

  constructor(price: number) {
    if (price < 0) {
      throw new Error('The price cannot be negative')
    }
    this.value = Number(price.toFixed(2))
  }

  public getPrice() {
    return this.value
  }
}
