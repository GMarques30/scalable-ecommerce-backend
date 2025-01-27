import { Address } from './../../../src/order/domain/vo/Address'

test('Should be possible to create a address with complement', function () {
  const address = new Address(
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States',
    'Apartment'
  )
  expect(address.getAddressType()).toEqual('STREET')
  expect(address.getStreet()).toEqual('Main street')
  expect(address.getNumber()).toEqual(23)
  expect(address.getDistrict()).toEqual('Springfield Park District')
  expect(address.getCity()).toEqual('Springfield')
  expect(address.getState()).toEqual('Oregon')
  expect(address.getZip()).toEqual('12345-678')
  expect(address.getCountry()).toEqual('United States')
  expect(address.getComplement()).toEqual('Apartment')
})

test('Should be possible to create a address without complement', function () {
  const address = new Address(
    'Street',
    'Main street',
    23,
    'Springfield Park District',
    'Springfield',
    'Oregon',
    '12345-678',
    'United States'
  )
  expect(address.getAddressType()).toEqual('STREET')
  expect(address.getStreet()).toEqual('Main street')
  expect(address.getNumber()).toEqual(23)
  expect(address.getDistrict()).toEqual('Springfield Park District')
  expect(address.getCity()).toEqual('Springfield')
  expect(address.getState()).toEqual('Oregon')
  expect(address.getZip()).toEqual('12345-678')
  expect(address.getCountry()).toEqual('United States')
})

test('Should not be possible to create a address with an empty street field', function () {
  expect(
    () =>
      new Address(
        'Avenue',
        ' ',
        23,
        'Springfield Park District',
        'Springfield',
        'Oregon',
        '12345-678',
        'United States'
      )
  ).toThrow(new Error('Invalid street.'))
})

test('Should not be possible to create a address with number field negative', function () {
  expect(
    () =>
      new Address(
        'Avenue',
        'Main street',
        -1,
        'Springfield Park District',
        'Springfield',
        'Oregon',
        '12345-678',
        'United States'
      )
  ).toThrow(new Error('Invalid number.'))
})

test('Should not be possible to create a address with an empty district field', function () {
  expect(
    () =>
      new Address(
        'Avenue',
        'Main street',
        23,
        ' ',
        'Springfield',
        'Oregon',
        '12345-678',
        'United States'
      )
  ).toThrow(new Error('Invalid district.'))
})

test('Should not be possible to create a address with an empty city field', function () {
  expect(
    () =>
      new Address(
        'Avenue',
        'Main street',
        23,
        'Springfield Park District',
        ' ',
        'Oregon',
        '12345-678',
        'United States'
      )
  ).toThrow(new Error('Invalid city.'))
})

test('Should not be possible to create a address with an empty state field', function () {
  expect(
    () =>
      new Address(
        'Avenue',
        'Main street',
        23,
        'Springfield Park District',
        'Springfield',
        ' ',
        '12345-678',
        'United States'
      )
  ).toThrow(new Error('Invalid state.'))
})

test('Should not be possible to create a address with an empty country field', function () {
  expect(
    () =>
      new Address(
        'Avenue',
        'Main street',
        23,
        'Springfield Park District',
        'Springfield',
        'Oregon',
        '12345-678',
        ' '
      )
  ).toThrow(new Error('Invalid country.'))
})
