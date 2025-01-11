import { ProductCatalogDAO } from '../dao/ProductCatalogDAO'

export class FetchProducts {
  constructor(private readonly productCatalogDAO: ProductCatalogDAO) {}

  async execute(): Promise<FetchProductsOutput> {
    const products = await this.productCatalogDAO.findAllProducts()
    return {
      products
    }
  }
}

export interface FetchProductsOutput {
  products: {
    productId: string
    name: string
    category: string
    createdAt: Date
    updatedAt: Date
  }[]
}
