import { ProductCatalogRepository } from '../../../src/product-catalog/application/repository/ProductCatalogRepository'
import { CreateProduct } from './../../../src/product-catalog/application/usecase/CreateProduct'
import { ProductCatalogRepositoryMemory } from './../../infra/repository/ProductCatalogRepositoryMemory'

let productCatalogRepository: ProductCatalogRepository
let sut: CreateProduct

beforeEach(() => {
  productCatalogRepository = new ProductCatalogRepositoryMemory()
  sut = new CreateProduct(productCatalogRepository)
})

test('Deve ser possivel criar um produto com sucesso', async function () {
  const input = {
    name: 'Notebook',
    category: 'ELECTRONICS'
  }
  const result = await sut.execute(input)
  expect(result.productId).toEqual(expect.any(String))
})
