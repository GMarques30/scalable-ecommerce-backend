import { AddressType } from './../../../src/order/domain/vo/AddressType'

test.each(['Street', 'Avenue'])(
  'Should be possible to create a valid address type',
  function (addressType: string) {
    expect(new AddressType(addressType).getAddressType()).toEqual(
      addressType.toUpperCase()
    )
  }
)

test.each(['Road', '', '    ', '213321', '12312ABDS', 'sada123'])(
  'Should not be possible to create a valid address type',
  function (addressType: string) {
    expect(() => new AddressType(addressType)).toThrow(
      new Error('Invalid address type.')
    )
  }
)
