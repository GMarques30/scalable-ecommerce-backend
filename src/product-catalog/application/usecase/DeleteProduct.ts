import { ProductCatalogRepository } from '../repository/ProductCatalogRepository'

export class DeleteProduct {
  constructor(
    private readonly productCatalogRepository: ProductCatalogRepository
  ) {}

  async execute(input: DeleteProductInput): Promise<void> {
    await this.productCatalogRepository.findByProductId(input.productId)
    await this.productCatalogRepository.remove(input.productId)
  }
}

interface DeleteProductInput {
  productId: string
}
