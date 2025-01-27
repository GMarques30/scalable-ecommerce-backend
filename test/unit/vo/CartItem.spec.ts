import { CartItem } from '../../../src/order/domain/vo/CartItem'

test('Deve ser possivel criar um item do carrinho com sucesso', function () {
  const cartId = crypto.randomUUID()
  const productId = crypto.randomUUID()
  const cartItem = new CartItem(productId, 'Notebook', 1500.0, 1)
  expect(cartItem.getProductId()).toEqual(productId)
  expect(cartItem.getName()).toEqual('Notebook')
  expect(cartItem.getPrice()).toEqual(1500.0)
  expect(cartItem.getQuantity()).toEqual(1)
})

test('Deve ser possivel restaurar o estado de um item do carrinho', function () {
  const productId = crypto.randomUUID()
  const cartItem = new CartItem(productId, 'Notebook', 1500.0, 1)
  expect(cartItem.getProductId()).toEqual(productId)
  expect(cartItem.getName()).toEqual('Notebook')
  expect(cartItem.getPrice()).toEqual(1500.0)
  expect(cartItem.getQuantity()).toEqual(1)
})

test('Deve aumentar a quantidade de um item do carrinho', function () {
  const cartItem = new CartItem(crypto.randomUUID(), 'Notebook', 1500.0, 1)
  cartItem.incrementQuantity()
  expect(cartItem.getQuantity()).toEqual(2)
})

test('Deve diminuir a quantidade de um item no carrinho', function () {
  const cartItem = new CartItem(crypto.randomUUID(), 'Notebook', 1500, 2)
  cartItem.decrementQuantity()
  expect(cartItem.getQuantity()).toEqual(1)
})

test('Não deve diminuir a quantidade de um item do carrinho caso tenha somente uma unidade', function () {
  const cartItem = new CartItem(crypto.randomUUID(), 'Notebook', 1500, 1)
  cartItem.decrementQuantity()
  expect(cartItem.getQuantity()).toEqual(1)
})

test('Deve lançar um erro caso o nome do item seja vazio', function () {
  expect(() => new CartItem(crypto.randomUUID(), '', 1500, 1)).toThrow(
    new Error('Product name is required')
  )
})

test('Deve lançar um erro caso o valor do item seja negativo', function () {
  expect(() => new CartItem(crypto.randomUUID(), 'Notebook', -1, 1)).toThrow(
    new Error('The price cannot be negative')
  )
})

test('Deve lançar um erro caso a quantidade de um item seja menor do que um', function () {
  expect(() => new CartItem(crypto.randomUUID(), 'Notebook', 1500, -2)).toThrow(
    new Error('The quantity of items cannot be negative or zero')
  )
})
