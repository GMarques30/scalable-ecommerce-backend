import { ProductCatalogRepository } from '../repository/ProductCatalogRepository'

export class UpdateProduct {
  constructor(
    private readonly productCatalogRepository: ProductCatalogRepository
  ) {}

  async execute(input: UpdateProductInput): Promise<void> {
    const product = await this.productCatalogRepository.findByProductId(
      input.productId
    )
    product.setName(input.name || product.getName())
    product.setCategory(input.category || product.getCategory())
    await this.productCatalogRepository.update(product)
  }
}

interface UpdateProductInput {
  productId: string
  name?: string
  category?: string
}
