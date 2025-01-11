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

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex(
      data => data.productId === product.getProductId()
    )
    this.products[index] = {
      productId: product.getProductId(),
      name: product.getName(),
      category: product.getCategory(),
      createdAt: product.getCreatedAt(),
      updatedAt: product.getUpdatedAt()
    }
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

  async findByProductId(productId: string): Promise<Product> {
    const data = this.products.find(
      productData => productData.productId === productId
    )
    if (!data) {
      throw new Error('Product not found.')
    }
    return Product.restore(
      data.productId,
      data.name,
      data.category,
      data.createdAt,
      data.updatedAt
    )
  }

  async remove(productId: string): Promise<void> {
    const index = this.products.findIndex(
      product => product.productId === productId
    )
    if (index === -1) {
      return
    }
    this.products.splice(index, 1)
  }
}
