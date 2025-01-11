import { ProductCatalogDAO } from '../../../src/product-catalog/application/dao/ProductCatalogDAO'
import { FetchProducts } from './../../../src/product-catalog/application/usecase/FetchProducts'
import { ProductCatalogDAOMemory } from './../../infra/dao/ProductCatalogDAOMemory'

let productCatalogDAO: ProductCatalogDAO
let sut: FetchProducts

beforeEach(() => {
  productCatalogDAO = new ProductCatalogDAOMemory()
  sut = new FetchProducts(productCatalogDAO)
})

test('Should be able to get all the products', async function () {
  await productCatalogDAO.save({
    productId: crypto.randomUUID(),
    name: 'Notebook',
    category: 'ELECTRONICS',
    createdAt: new Date(),
    updatedAt: new Date()
  })
  await productCatalogDAO.save({
    productId: crypto.randomUUID(),
    name: 'Desktop',
    category: 'ELECTRONICS',
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const result = await sut.execute()
  expect(result.products).toEqual(
    expect.objectContaining([
      {
        productId: expect.any(String),
        name: 'Notebook',
        category: 'ELECTRONICS',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      },
      {
        productId: expect.any(String),
        name: 'Desktop',
        category: 'ELECTRONICS',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }
    ])
  )
})
