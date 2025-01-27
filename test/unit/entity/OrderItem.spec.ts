import { OrderItem } from './../../../src/order/domain/entity/OrderItem'

test('Should be possible to create an order item', function () {
  const productId = crypto.randomUUID()
  const orderItem = OrderItem.create(productId, 'Notebook', 1500.0, 1)
  expect(orderItem.getOrderItemId()).toEqual(expect.any(String))
  expect(orderItem.getProductId()).toEqual(productId)
  expect(orderItem.getProductName()).toEqual('Notebook')
  expect(orderItem.getPrice()).toEqual(1500.0)
  expect(orderItem.getQuantity()).toEqual(1)
})

test('Must be possible to restore the status of an order item', function () {
  const orderItemId = crypto.randomUUID()
  const productId = crypto.randomUUID()
  const orderItem = OrderItem.restore(
    orderItemId,
    productId,
    'Notebook',
    1500.0,
    1
  )
  expect(orderItem.getOrderItemId()).toEqual(orderItemId)
  expect(orderItem.getProductId()).toEqual(productId)
  expect(orderItem.getProductName()).toEqual('Notebook')
  expect(orderItem.getPrice()).toEqual(1500.0)
  expect(orderItem.getQuantity()).toEqual(1)
})

test('Should throw an error if the product name is empty', function () {
  expect(() => OrderItem.create(crypto.randomUUID(), '', 1500.0, 1)).toThrow(
    new Error('Product name cannot be empty')
  )
})

test('Should throw an error if the product value is negative', function () {
  expect(() =>
    OrderItem.create(crypto.randomUUID(), 'Notebook', -1, 1)
  ).toThrow(new Error('The price cannot be negative'))
})

test('Should throw an error if the quantity of items is negative', function () {
  expect(() =>
    OrderItem.create(crypto.randomUUID(), 'Notebook', 1500.0, -1)
  ).toThrow(new Error('The quantity of items cannot be negative or zero'))
})
