import { Product } from '../../domain/entity/Product'

export interface ProductCatalogRepository {
  save(product: Product): Promise<void>
  findByProductId(productId: string): Promise<Product>
  remove(productId: string): Promise<void>
}
