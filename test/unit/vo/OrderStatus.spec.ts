import { Order } from '../../../src/order/domain/entity/Order'
import { OrderStatusFactory } from '../../../src/order/domain/vo/OrderStatus'

let order: Order

beforeEach(() => {
  order = Order.create(
    crypto.randomUUID(),
    'CREDIT CARD',
    137.9,
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    14.9
  )
})

test.each([
  'Pending',
  'Processing',
  'Payment Refused',
  'Paid',
  'Sent',
  'Completed',
  'Canceled'
])('Must be possible to create a valid state', function (status: string) {
  expect(OrderStatusFactory.create(order, status).getStatus()).toEqual(
    status.toUpperCase()
  )
})

test.each(['Delivered', 'Fraud Detected', 'Reserved', 'Out of stock'])(
  'Should throw an error for invalid status',
  function (status: string) {
    expect(() => OrderStatusFactory.create(order, status)).toThrow(
      'Invalid status.'
    )
  }
)

test('Should be possible to change the status from pending to processing', function () {
  OrderStatusFactory.create(order, 'Pending').processing()
  expect(order.status.getStatus()).toEqual('PROCESSING')
})

test('Should be possible to change the status from pending to canceled', function () {
  OrderStatusFactory.create(order, 'Pending').canceled()
  expect(order.status.getStatus()).toEqual('CANCELED')
})

test('Should not be possible to change the status from pending to refused', function () {
  expect(() => OrderStatusFactory.create(order, 'Pending').refused()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from pending to paid status', function () {
  expect(() => OrderStatusFactory.create(order, 'Pending').paid()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change the status from pending to sent', function () {
  expect(() => OrderStatusFactory.create(order, 'Pending').sent()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from pending to completed status', function () {
  expect(() => OrderStatusFactory.create(order, 'Pending').completed()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should be possible to change the status from processing to refused', function () {
  OrderStatusFactory.create(order, 'Processing').refused()
  expect(order.status.getStatus()).toEqual('PAYMENT REFUSED')
})

test('Should be possible to change the status from processing to paid', function () {
  OrderStatusFactory.create(order, 'Processing').paid()
  expect(order.status.getStatus()).toEqual('PAID')
})

test('Should be possible to change the status from processing to canceled', function () {
  OrderStatusFactory.create(order, 'Processing').canceled()
  expect(order.status.getStatus()).toEqual('CANCELED')
})

test('Should not be possible to change the status from being processed to being processed', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Processing').processing()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change the status from processing to sent', function () {
  expect(() => OrderStatusFactory.create(order, 'Processing').sent()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change the status from processing to complete', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Processing').completed()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change the status from refused to processing', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Payment Refused').processing()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change the status from refused to refused', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Payment Refused').refused()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from refused to paid status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Payment Refused').paid()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change the status from rejected to sent', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Payment Refused').sent()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from refused to complete status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Payment Refused').completed()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from refused to canceled status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Payment Refused').canceled()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should be possible to change the status from paid to sent', function () {
  OrderStatusFactory.create(order, 'Paid').sent()
  expect(order.status.getStatus()).toEqual('SENT')
})

test('Should be possible to change the status from paid to canceled', function () {
  OrderStatusFactory.create(order, 'Paid').canceled()
  expect(order.status.getStatus()).toEqual('CANCELED')
})

test('Should not be possible to change from paid to processing status', function () {
  expect(() => OrderStatusFactory.create(order, 'Paid').processing()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from paid to refused status', function () {
  expect(() => OrderStatusFactory.create(order, 'Paid').refused()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from paid to paid status', function () {
  expect(() => OrderStatusFactory.create(order, 'Paid').paid()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from paid to full status', function () {
  expect(() => OrderStatusFactory.create(order, 'Paid').completed()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should be possible to change the status from sent to complete', function () {
  OrderStatusFactory.create(order, 'Sent').completed()
  expect(order.status.getStatus()).toEqual('COMPLETED')
})

test('Should be possible to change the status from sent to canceled', function () {
  OrderStatusFactory.create(order, 'Sent').canceled()
  expect(order.status.getStatus()).toEqual('CANCELED')
})

test('Should not be possible to change the status from sent to processing', function () {
  expect(() => OrderStatusFactory.create(order, 'Sent').processing()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change the status from sent to rejected', function () {
  expect(() => OrderStatusFactory.create(order, 'Sent').refused()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from sent to paid status', function () {
  expect(() => OrderStatusFactory.create(order, 'Sent').paid()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change the status from sent to sent', function () {
  expect(() => OrderStatusFactory.create(order, 'Sent').sent()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from complete to processing status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Completed').processing()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from full to refused status', function () {
  expect(() => OrderStatusFactory.create(order, 'Completed').refused()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from full to paid status', function () {
  expect(() => OrderStatusFactory.create(order, 'Completed').paid()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change the status from complete to sent', function () {
  expect(() => OrderStatusFactory.create(order, 'Completed').sent()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from full to complete status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Completed').completed()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from full to canceled status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Completed').canceled()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from canceled to processing status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Canceled').processing()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from canceled to refused status', function () {
  expect(() => OrderStatusFactory.create(order, 'Canceled').refused()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from canceled to paid status', function () {
  expect(() => OrderStatusFactory.create(order, 'Canceled').paid()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from canceled to sent status', function () {
  expect(() => OrderStatusFactory.create(order, 'Canceled').sent()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})

test('Should not be possible to change from canceled to full status', function () {
  expect(() =>
    OrderStatusFactory.create(order, 'Canceled').completed()
  ).toThrow(new Error('Action not allowed in the current status.'))
})

test('Should not be possible to change from canceled to canceled status', function () {
  expect(() => OrderStatusFactory.create(order, 'Canceled').canceled()).toThrow(
    new Error('Action not allowed in the current status.')
  )
})
