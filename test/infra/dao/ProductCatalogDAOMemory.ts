import { ProductCatalogDAO } from '../../../src/product-catalog/application/dao/ProductCatalogDAO'

export class ProductCatalogDAOMemory implements ProductCatalogDAO {
  private readonly products: {
    productId: string
    name: string
    category: string
    createdAt: Date
    updatedAt: Date
  }[]

  constructor() {
    this.products = []
  }

  async findAllProducts(): Promise<
    {
      productId: string
      name: string
      category: string
      createdAt: Date
      updatedAt: Date
    }[]
  > {
    return this.products
  }
  async save(product: {
    productId: string
    name: string
    category: string
    createdAt: Date
    updatedAt: Date
  }): Promise<void> {
    this.products.push(product)
  }
}
