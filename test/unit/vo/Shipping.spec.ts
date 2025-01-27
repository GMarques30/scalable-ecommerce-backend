import { Shipping } from './../../../src/order/domain/vo/Shipping'

test('Should be possible to create a shipping address', function () {
  const shipping = new Shipping(
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    0
  )
  expect(shipping.getAddressType()).toEqual('STREET')
  expect(shipping.getStreet()).toEqual('Main street')
  expect(shipping.getNumber()).toEqual(23)
  expect(shipping.getDistrict()).toEqual('Springfield Park District')
  expect(shipping.getCity()).toEqual('Springfield')
  expect(shipping.getState()).toEqual('Oregon')
  expect(shipping.getZip()).toEqual('12345-678')
  expect(shipping.getCountry()).toEqual('United States')
  expect(shipping.getComplement()).toEqual(undefined)
  expect(shipping.getShippingCost()).toEqual(0)
})

test('should not be possible to create a shipping address with the negative cost', function () {
  expect(
    () =>
      new Shipping(
        'Street',
        'Main street',
        23,
        'Springfield Park District',
        'Springfield',
        'Oregon',
        '12345-678',
        'United States',
        -1
      )
  ).toThrow(new Error('Shipping costs cannot be negative.'))
})
