import { ProductCatalogDAO } from '../../../src/product-catalog/application/dao/ProductCatalogDAO'
import { ProductCatalogDAOMemory } from '../../infra/dao/ProductCatalogDAOMemory'
import { FetchProductDetails } from './../../../src/product-catalog/application/usecase/FetchProductDetails'

let productCatalogDAO: ProductCatalogDAO
let sut: FetchProductDetails

beforeEach(() => {
  productCatalogDAO = new ProductCatalogDAOMemory()
  sut = new FetchProductDetails(productCatalogDAO)
})

test('Must be possible to obtain the details of a product successfully', async function () {
  const product = {
    productId: crypto.randomUUID(),
    name: 'Notebook',
    category: 'ELECTRONICS',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  await productCatalogDAO.save(product)
  const input = {
    productId: product.productId
  }
  const result = await sut.execute(input)
  expect(result).toEqual(
    expect.objectContaining({
      productId: product.productId,
      name: product.name,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  )
})

test('Should not be possible to get the details of a non-existent product', async function () {
  const input = {
    productId: crypto.randomUUID()
  }
  expect(() => sut.execute(input)).rejects.toThrow(
    new Error('Product not found.')
  )
})
