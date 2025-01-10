import { Name } from './../../../src/domain/vo/Name'

test.each([
  ['João', 'Silva'],
  ['Maria', 'Oliveira'],
  ['Carlos', 'Souza']
])(
  'Should check that it is a valid name',
  function (firstName: string, lastName: string) {
    const name = new Name(firstName, lastName)
    expect(name.getFirstName()).toEqual(firstName)
    expect(name.getLastName()).toEqual(lastName)
    expect(name.getFullName()).toEqual(`${firstName} ${lastName}`)
  }
)

test.each([
  ['João123', 'Silva'],
  ['Maria', 'Oliveira99'],
  ['@João', 'Silva'],
  ['Carlos', '#Souza'],
  ['A', 'B'],
  ['', 'Silva'],
  ['João', ''],
  ['   ', 'Silva'],
  ['João', '   '],
  ['João@', 'Silva#'],
  ['123456', '78910']
])(
  'Should throw an error for invalid name',
  function (firstName: string, lastName: string) {
    expect(() => new Name(firstName, lastName)).toThrow(
      new Error('Invalid name.')
    )
  }
)

test('Should be possible to return the first name', function () {
  const name = new Name('John', 'Doe')
  expect(name.getFirstName()).toEqual('John')
})

test('Should be possible to return the surname', function () {
  const name = new Name('John', 'Doe')
  expect(name.getLastName()).toEqual('Doe')
})

test('Should be possible to return the full name', function () {
  const name = new Name('John', 'Doe')
  expect(name.getFullName()).toEqual('John Doe')
})
