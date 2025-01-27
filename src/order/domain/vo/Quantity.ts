export class Quantity {
  private value: number

  constructor(quantity: number) {
    if (quantity < 1 || !quantity) {
      throw new Error('The quantity of items cannot be negative or zero')
    }
    this.value = quantity
  }

  public increment() {
    this.value++
  }

  public decrement() {
    if (this.value === 1) {
      return
    }
    this.value--
  }

  public getQuantity() {
    return this.value
  }
}
