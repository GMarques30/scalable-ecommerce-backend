import { Product } from './../../../src/domain/entity/Product'

test('Must be possible to create a successful product', function () {
  const product = Product.create('Notebook', 'ELECTRONICS')
  expect(product.getProductId()).toBeDefined()
  expect(product.getProductId()).toEqual(expect.any(String))
  expect(product.getName()).toEqual('Notebook')
  expect(product.getCategory()).toEqual('ELECTRONICS')
  expect(product.getCreatedAt()).toBeInstanceOf(Date)
  expect(product.getCreatedAt()).toEqual(expect.any(Date))
  expect(product.getUpdatedAt()).toBeInstanceOf(Date)
  expect(product.getUpdatedAt()).toEqual(expect.any(Date))
})

test('Must be possible to restore the product status', function () {
  const productId = crypto.randomUUID()
  const createdAt = '2025-01-11T01:19:35.660Z'
  const updatedAt = '2025-01-12T01:19:35.660Z'
  const product = Product.restore(
    productId,
    'Notebook',
    'ELECTRONICS',
    createdAt,
    updatedAt
  )
  expect(product.getProductId()).toBeDefined()
  expect(product.getProductId()).toEqual(expect.any(String))
  expect(product.getName()).toEqual('Notebook')
  expect(product.getCategory()).toEqual('ELECTRONICS')
  expect(product.getCreatedAt()).toBeInstanceOf(Date)
  expect(product.getCreatedAt()).toEqual(new Date(createdAt))
  expect(product.getUpdatedAt()).toBeInstanceOf(Date)
  expect(product.getUpdatedAt()).toEqual(new Date(updatedAt))
})

test('Should be possible to update the name of a product', function () {
  const product = Product.create('Notebook', 'ELECTRONICS')
  product.setName('Desktop')
  expect(product.getName()).toEqual('Desktop')
})

test('Should be possible to change the product category', function () {
  const product = Product.create('Alexa', 'ELECTRONICS')
  product.setCategory('APPLIANCES')
  expect(product.getCategory()).toEqual('APPLIANCES')
})
