import { Order } from './../../../src/order/domain/entity/Order'

test('Must be possible to create an order successfully', function () {
  const accountId = crypto.randomUUID()
  const order = Order.create(
    accountId,
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  expect(order.getOrderId()).toEqual(expect.any(String))
  expect(order.getAccountId()).toEqual(accountId)
  expect(order.getDate()).toEqual(expect.any(Date))
  expect(order.getStatus()).toEqual('PENDING')
  expect(order.getPaymentMethod()).toEqual('PIX')
  expect(order.getTotalAmount()).toEqual(200.9)
  expect(order.getAddressType()).toEqual('STREET')
  expect(order.getStreet()).toEqual('Main street')
  expect(order.getNumber()).toEqual(23)
  expect(order.getDistrict()).toEqual('Springfield Park District')
  expect(order.getCity()).toEqual('Springfield')
  expect(order.getState()).toEqual('Oregon')
  expect(order.getZip()).toEqual('12345-678')
  expect(order.getCountry()).toEqual('United States')
  expect(order.getComplement()).toEqual(undefined)
  expect(order.getShippingCost()).toEqual(14.0)
})

test('Must be possible to restore the status of a request', function () {
  const orderId = crypto.randomUUID()
  const accountId = crypto.randomUUID()
  const date = new Date()

  const order = Order.restore(
    orderId,
    accountId,
    date,
    'Sent',
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  expect(order.getOrderId()).toEqual(orderId)
  expect(order.getAccountId()).toEqual(accountId)
  expect(order.getDate()).toEqual(date)
  expect(order.getStatus()).toEqual('SENT')
  expect(order.getPaymentMethod()).toEqual('PIX')
  expect(order.getTotalAmount()).toEqual(200.9)
  expect(order.getAddressType()).toEqual('STREET')
  expect(order.getStreet()).toEqual('Main street')
  expect(order.getNumber()).toEqual(23)
  expect(order.getDistrict()).toEqual('Springfield Park District')
  expect(order.getCity()).toEqual('Springfield')
  expect(order.getState()).toEqual('Oregon')
  expect(order.getZip()).toEqual('12345-678')
  expect(order.getCountry()).toEqual('United States')
  expect(order.getComplement()).toEqual(undefined)
  expect(order.getShippingCost()).toEqual(14.0)
})

test('Should not be possible to create an order with a negative total amount', function () {
  expect(() =>
    Order.create(
      crypto.randomUUID(),
      'Pix',
      -200.9,
      'Street',
      'Main street',
      23,
      'Springfield Park District',
      'Springfield',
      'Oregon',
      '12345-678',
      'United States',
      14.0
    )
  ).toThrow(new Error('Total amount costs cannot be negative.'))
})

test('Should be possible to change the status of an order from pending to processing', function () {
  const order = Order.create(
    crypto.randomUUID(),
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  order.processing()
  expect(order.getStatus()).toEqual('PROCESSING')
})

test('Should be possible to change the status of an order from processing to refused', function () {
  const order = Order.create(
    crypto.randomUUID(),
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  order.processing()
  order.refused()
  expect(order.getStatus()).toEqual('PAYMENT REFUSED')
})

test('Should be possible to change the status of an order from processing to paid', function () {
  const order = Order.create(
    crypto.randomUUID(),
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  order.processing()
  order.paid()
  expect(order.getStatus()).toEqual('PAID')
})

test('Should be possible to change the status of an order from paid to sent', function () {
  const order = Order.create(
    crypto.randomUUID(),
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  order.processing()
  order.paid()
  order.sent()
  expect(order.getStatus()).toEqual('SENT')
})

test('Should be possible to change the status of an order from sent to completed', function () {
  const order = Order.create(
    crypto.randomUUID(),
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  order.processing()
  order.paid()
  order.sent()
  order.completed()
  expect(order.getStatus()).toEqual('COMPLETED')
})

test('Should be possible to change the status of an order from processing to canceled', function () {
  const order = Order.create(
    crypto.randomUUID(),
    'Pix',
    200.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.0
  )
  order.processing()
  order.canceled()
  expect(order.getStatus()).toEqual('CANCELED')
})
