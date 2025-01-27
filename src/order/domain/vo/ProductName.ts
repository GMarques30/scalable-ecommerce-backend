export class ProductName {
  private value: string

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Product name is required')
    }
    this.value = value
  }

  public getProductName() {
    return this.value
  }
}
