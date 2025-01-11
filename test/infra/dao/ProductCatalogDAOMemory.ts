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

  async findByProductId(productId: string): Promise<{
    productId: string
    name: string
    category: string
    createdAt: Date
    updatedAt: Date
  }> {
    const product = this.products.find(
      product => product.productId === productId
    )
    if (!product) {
      throw new Error('Product not found.')
    }
    return {
      productId: product.productId,
      name: product.name,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
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
