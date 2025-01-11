export interface ProductCatalogDAO {
  findAllProducts(): Promise<
    {
      productId: string
      name: string
      category: string
      createdAt: Date
      updatedAt: Date
    }[]
  >
  save(product: {
    productId: string
    name: string
    category: string
    createdAt: Date
    updatedAt: Date
  }): Promise<void>
}
