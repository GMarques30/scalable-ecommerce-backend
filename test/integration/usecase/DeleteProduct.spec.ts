import { ProductCatalogRepository } from '../../../src/product-catalog/application/repository/ProductCatalogRepository'
import { Product } from '../../../src/product-catalog/domain/entity/Product'
import { DeleteProduct } from './../../../src/product-catalog/application/usecase/DeleteProduct'
import { ProductCatalogRepositoryMemory } from './../../infra/repository/ProductCatalogRepositoryMemory'

let productCatalogRepository: ProductCatalogRepository
let sut: DeleteProduct

beforeEach(() => {
  productCatalogRepository = new ProductCatalogRepositoryMemory()
  sut = new DeleteProduct(productCatalogRepository)
})

test('Deve ser possivel deletar um produto com sucesso', async function () {
  const product = Product.create('Notebook', 'ELECTRONICS')
  productCatalogRepository.save(product)
  const input = {
    productId: product.getProductId()
  }
  await sut.execute(input)
  expect(() =>
    productCatalogRepository.findByProductId(product.getProductId())
  ).rejects.toThrow(new Error('Product not found.'))
})

test('Deve ser possivel lançar um erro caso o produto não seja encontrado', function () {
  const input = {
    productId: crypto.randomUUID()
  }
  expect(() => sut.execute(input)).rejects.toThrow(
    new Error('Product not found.')
  )
})
