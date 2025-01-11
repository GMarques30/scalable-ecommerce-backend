import { ProductCatalogDAO } from '../dao/ProductCatalogDAO'

export class FetchProductDetails {
  constructor(private readonly productCatalogDAO: ProductCatalogDAO) {}

  async execute(
    input: FetchProductDetailInput
  ): Promise<FetchProductDetailOutput> {
    const product = await this.productCatalogDAO.findByProductId(
      input.productId
    )
    return {
      productId: product.productId,
      name: product.name,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}

interface FetchProductDetailInput {
  productId: string
}

interface FetchProductDetailOutput {
  productId: string
  name: string
  category: string
  createdAt: Date
  updatedAt: Date
}
