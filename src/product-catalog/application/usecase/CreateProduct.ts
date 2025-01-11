import { Product } from '../../domain/entity/Product'
import { ProductCatalogRepository } from '../repository/ProductCatalogRepository'

export class CreateProduct {
  constructor(
    private readonly productCatalogRepository: ProductCatalogRepository
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const product = Product.create(input.name, input.category)
    await this.productCatalogRepository.save(product)
    return {
      productId: product.getProductId()
    }
  }
}

interface CreateProductInput {
  name: string
  category: string
}

interface CreateProductOutput {
  productId: string
}
