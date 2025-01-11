import { Category } from './Category'

export class ProductCategory {
  private productCategory: Category

  constructor(productCategory: string) {
    this.productCategory = this.toProductCategory(productCategory)
  }

  private toProductCategory(value: string): Category {
    if (!Object.values(Category).includes(value as Category)) {
      throw new Error('Invalid category.')
    }
    return value as Category
  }

  public getCategory() {
    return this.productCategory
  }
}
