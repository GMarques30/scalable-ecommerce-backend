import { Quantity } from './../../../src/order/domain/vo/Quantity'
test('Deve ser possivel criar a quantidade de um produto valida', function () {
  const quantity = new Quantity(1)
  expect(quantity.getQuantity()).toEqual(1)
})

test('Deve ser possivel aumentar a quantidade de um produto', function () {
  const quantity = new Quantity(1)
  quantity.increment()
  expect(quantity.getQuantity()).toEqual(2)
})

test('Deve ser possivel reduzir a quantidade de um produto', function () {
  const quantity = new Quantity(2)
  quantity.decrement()
  expect(quantity.getQuantity()).toEqual(1)
})

test('Não deve reduzir a quantidade de um produto se ela for igual a um', function () {
  const quantity = new Quantity(1)
  quantity.decrement()
  expect(quantity.getQuantity()).toEqual(1)
})

test.each([0, -1, -2, null, undefined])(
  'Deve lançar um erro caso a quantidade de um produto seja zero ou negativa',
  function (quantity: any) {
    expect(() => new Quantity(quantity)).toThrow(
      new Error('The quantity of items cannot be negative or zero')
    )
  }
)
