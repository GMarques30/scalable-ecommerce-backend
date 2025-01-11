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
}