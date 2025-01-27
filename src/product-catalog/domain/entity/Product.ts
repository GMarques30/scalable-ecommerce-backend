import { UUID } from '../../../account/domain/vo/UUID'
import { ProductCategory } from '../vo/ProductCategory'

export class Product {
  private readonly productId: UUID
  private name: string
  private category: ProductCategory
  private readonly createdAt: Date
  private updatedAt: Date

  private constructor(
    productId: UUID,
    name: string,
    category: ProductCategory,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.productId = productId
    this.name = name
    this.category = category
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static create(name: string, category: string): Product {
    const productId = new UUID(crypto.randomUUID())
    const productCategory = new ProductCategory(category)
    const createdAt = new Date()
    const updatedAt = new Date()
    return new Product(productId, name, productCategory, createdAt, updatedAt)
  }

  static restore(
    productId: string,
    name: string,
    category: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    const productIdValueObject = new UUID(productId)
    const productCategory = new ProductCategory(category)
    const createdAtValueObject = new Date(createdAt)
    const updatedAtValueObject = new Date(updatedAt)
    return new Product(
      productIdValueObject,
      name,
      productCategory,
      createdAtValueObject,
      updatedAtValueObject
    )
  }

  public getProductId() {
    return this.productId.getUUID()
  }

  public getName() {
    return this.name
  }

  public setName(name: string) {
    this.name = name
    this.update()
  }

  public getCategory() {
    return this.category.getCategory()
  }

  public setCategory(category: string) {
    this.category = new ProductCategory(category)
    this.update()
  }

  public getCreatedAt() {
    return this.createdAt
  }

  public getUpdatedAt() {
    return this.updatedAt
  }

  private update() {
    this.updatedAt = new Date()
  }
}
