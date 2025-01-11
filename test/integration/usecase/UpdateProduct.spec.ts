import { ProductCatalogRepository } from '../../../src/product-catalog/application/repository/ProductCatalogRepository'
import { Product } from '../../../src/product-catalog/domain/entity/Product'
import { UpdateProduct } from './../../../src/product-catalog/application/usecase/UpdateProduct'
import { ProductCatalogRepositoryMemory } from './../../infra/repository/ProductCatalogRepositoryMemory'

let productCatalogRepository: ProductCatalogRepository
let sut: UpdateProduct

beforeEach(() => {
  productCatalogRepository = new ProductCatalogRepositoryMemory()
  sut = new UpdateProduct(productCatalogRepository)
})

test('Must be possible to update the status of a product successfully', async function () {
  const product = Product.create('Notebook', 'ELECTRONICS')
  productCatalogRepository.save(product)
  const input = {
    productId: product.getProductId(),
    name: 'Desktop',
    category: 'APPLIANCES'
  }
  await sut.execute(input)
  const result = await productCatalogRepository.findByProductId(
    product.getProductId()
  )
  expect(result.getName()).toEqual('Desktop')
  expect(result.getCategory()).toEqual('APPLIANCES')
})

test('Should only be possible to update the product name', async function () {
  const product = Product.create('Notebook', 'ELECTRONICS')
  productCatalogRepository.save(product)
  const input = {
    productId: product.getProductId(),
    name: 'Desktop'
  }
  await sut.execute(input)
  const result = await productCatalogRepository.findByProductId(
    product.getProductId()
  )
  expect(result.getName()).toEqual('Desktop')
})

test('Should only be possible to update the product category', async function () {
  const product = Product.create('Notebook', 'ELECTRONICS')
  productCatalogRepository.save(product)
  const input = {
    productId: product.getProductId(),
    category: 'APPLIANCES'
  }
  await sut.execute(input)
  const result = await productCatalogRepository.findByProductId(
    product.getProductId()
  )
  expect(result.getCategory()).toEqual('APPLIANCES')
})

test('Should not be possible to update the status of a product if it does not exist', function () {
  const input = {
    productId: crypto.randomUUID(),
    category: 'APPLIANCES'
  }
  expect(() => sut.execute(input)).rejects.toThrow(
    new Error('Product not found.')
  )
})
