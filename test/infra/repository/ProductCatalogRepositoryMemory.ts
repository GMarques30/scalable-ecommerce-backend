import { ProductCatalogRepository } from '../../../src/product-catalog/application/repository/ProductCatalogRepository'
import { Product } from '../../../src/product-catalog/domain/entity/Product'

export class ProductCatalogRepositoryMemory
  implements ProductCatalogRepository
{
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

  async save(product: Product): Promise<void> {
    this.products.push({
      productId: product.getProductId(),
      name: product.getName(),
      category: product.getCategory(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt()
    })
  }
}
