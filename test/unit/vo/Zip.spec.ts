import { Zip } from './../../../src/order/domain/vo/Zip'

test.each(['12345-678', '98765-432', '01001-001', '54321-000', '00000-123'])(
  'Should be possible to create a valid zip code',
  function (zip: string) {
    expect(new Zip(zip).getValue()).toEqual(zip)
  }
)

test.each([
  '12345678',
  '1234-567',
  'ABCDE-FGH',
  '12345-67A',
  '12345_678',
  '123456-789'
])(
  'Should not be possible to create an invalid zip code',
  function (zip: string) {
    expect(() => new Zip(zip)).toThrow(new Error('Invalid zip code.'))
  }
)
