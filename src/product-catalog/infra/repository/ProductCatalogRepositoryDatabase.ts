import { DatabaseConnection } from '../../../account/infra/database/DatabaseConnection'
import { ProductCatalogRepository } from '../../application/repository/ProductCatalogRepository'
import { Product } from '../../domain/entity/Product'

export class ProductCatalogRepositoryDatabase
  implements ProductCatalogRepository
{
  private readonly connection: any

  constructor(databaseConnection: DatabaseConnection) {
    this.connection = databaseConnection
  }

  async save(product: Product): Promise<void> {
    await this.connection.query(
      'INSERT INTO products_catalog (product_id, name, category, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
      [
        product.getProductId(),
        product.getName(),
        product.getCategory(),
        product.getCreatedAt(),
        product.getUpdatedAt()
      ]
    )
  }

  async findByProductId(productId: string): Promise<Product> {
    const [product] = await this.connection.query(
      'SELECT * FROM products_catalog WHERE product_id = $1',
      [productId]
    )
    if (!product) {
      throw new Error('Product not found.')
    }
    return Product.restore(
      product.product_id,
      product.name,
      product.category,
      product.created_at,
      product.updated_at
    )
  }

  async remove(productId: string): Promise<void> {
    await this.connection.query(
      'DELETE FROM products_catalog WHERE product_id = $1',
      [productId]
    )
  }

  async update(product: Product): Promise<void> {
    await this.connection.query(
      'UPDATE products_catalog SET name = $2, category = $3 WHERE product_id = $1',
      [product.getProductId(), product.getName(), product.getCategory()]
    )
  }
}
