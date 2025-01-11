import { Product } from '../../domain/entity/Product'

export interface ProductCatalogRepository {
  save(product: Product): Promise<void>
}
