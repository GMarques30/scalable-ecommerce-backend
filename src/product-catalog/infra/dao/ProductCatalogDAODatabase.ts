import { DatabaseConnection } from '../../../account/infra/database/DatabaseConnection'
import { ProductCatalogDAO } from '../../application/dao/ProductCatalogDAO'

export class ProductCatalogDAODatabase implements ProductCatalogDAO {
  private readonly connection: any

  constructor(databaseConnection: DatabaseConnection) {
    this.connection = databaseConnection
  }

  async findByProductId(productId: string): Promise<{
    productId: string
    name: string
    category: string
    createdAt: Date
    updatedAt: Date
  }> {
    const [product] = await this.connection.query(
      'SELECT * FROM products_catalog WHERE product_id = $1',
      [productId]
    )
    if (!product) {
      throw new Error('Product not found.')
    }
    return {
      productId: product.product_id,
      name: product.name,
      category: product.category,
      createdAt: product.created_at,
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
    const productsData = await this.connection.query(
      'SELECT * FROM products_catalog',
      []
    )
    const products = []
    for (const product of productsData) {
      products.push({
        productId: product.product_id,
        name: product.name,
        category: product.category,
        createdAt: product.created_at,
        updatedAt: product.updated_at
      })
    }
    return products
  }

  async save(product: {
    productId: string
    name: string
    category: string
    createdAt: Date
    updatedAt: Date
  }): Promise<void> {
    await this.connection.query(
      'INSERT INTO products_catalog (product_id, name, category, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
      [
        product.productId,
        product.name,
        product.category,
        product.createdAt,
        product.updatedAt
      ]
    )
  }
}
