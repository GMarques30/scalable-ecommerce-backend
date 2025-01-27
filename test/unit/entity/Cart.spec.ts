import { Cart } from './../../../src/order/domain/entity/Cart'

test('Deve ser possivel criar um carrinho', function () {
  const accountId = crypto.randomUUID()
  const cart = Cart.create(accountId)
  expect(cart.getCartId()).toEqual(expect.any(String))
  expect(cart.getAccountId()).toEqual(accountId)
  expect(cart.getTotalAmount()).toEqual(0)
  expect(cart.getCartItens()).toEqual([])
})

test('Deve ser possivel restaurar o estado de um carrinho', function () {
  const cartId = crypto.randomUUID()
  const accountId = crypto.randomUUID()
  const cart = Cart.restore(cartId, accountId, 1500.0)
  cart.addItem(crypto.randomUUID(), 'Notebook', 1500.0, 1)
  expect(cart.getCartId()).toEqual(cartId)
  expect(cart.getAccountId()).toEqual(accountId)
  expect(cart.getTotalAmount()).toEqual(1500)
  expect(cart.getCartItens()).toEqual([
    {
      productId: expect.any(Object),
      name: expect.objectContaining({
        value: 'Notebook'
      }),
      price: expect.objectContaining({
        value: 1500
      }),
      quantity: expect.objectContaining({
        value: 1
      })
    }
  ])
})

test('Deve ser possivel adicionar itens no carrinho', function () {
  const cart = Cart.create(crypto.randomUUID())
  cart.addItem(crypto.randomUUID(), 'Notebook', 1500.0, 1)
  cart.addItem(crypto.randomUUID(), 'Desktop', 2000.0, 2)
  expect(cart.getTotalAmount()).toEqual(5500.0)
  expect(cart.getCartItens()).toEqual([
    {
      productId: expect.any(Object),
      name: expect.objectContaining({
        value: 'Notebook'
      }),
      price: expect.objectContaining({
        value: 1500
      }),
      quantity: expect.objectContaining({
        value: 1
      })
    },
    {
      productId: expect.any(Object),
      name: expect.objectContaining({
        value: 'Desktop'
      }),
      price: expect.objectContaining({
        value: 2000
      }),
      quantity: expect.objectContaining({
        value: 2
      })
    }
  ])
})

test('Quando adicionar um mesmo item ao carrinho deve atualizar somente a quantidade', function () {
  const cart = Cart.create(crypto.randomUUID())
  const notebookProductId = crypto.randomUUID()
  cart.addItem(notebookProductId, 'Notebook', 1500.0, 1)
  cart.addItem(notebookProductId, 'Notebook', 1500.0, 1)
  expect(cart.getCartItens()).toEqual([
    {
      productId: expect.any(Object),
      name: expect.objectContaining({
        value: 'Notebook'
      }),
      price: expect.objectContaining({
        value: 1500
      }),
      quantity: expect.objectContaining({
        value: 2
      })
    }
  ])
})

test('Deve ser possivel remover itens do carrinho', function () {
  const cart = Cart.create(crypto.randomUUID())
  const desktopProductId = crypto.randomUUID()
  cart.addItem(crypto.randomUUID(), 'Notebook', 1500.0, 1)
  cart.addItem(desktopProductId, 'Desktop', 2000.0, 2)
  cart.removeItem(desktopProductId)
  expect(cart.getTotalAmount()).toEqual(3500.0)
  expect(cart.getCartItens()).toEqual([
    {
      productId: expect.any(Object),
      name: expect.objectContaining({
        value: 'Notebook'
      }),
      price: expect.objectContaining({
        value: 1500
      }),
      quantity: expect.objectContaining({
        value: 1
      })
    },
    {
      productId: expect.any(Object),
      name: expect.objectContaining({
        value: 'Desktop'
      }),
      price: expect.objectContaining({
        value: 2000
      }),
      quantity: expect.objectContaining({
        value: 1
      })
    }
  ])
})

test('Deve remover do carrinho caso só tenha uma unidade daquele item', function () {
  const cart = Cart.create(crypto.randomUUID())
  const notebookProductId = crypto.randomUUID()
  cart.addItem(notebookProductId, 'Notebook', 1500.0, 1)
  cart.removeItem(notebookProductId)
  expect(cart.getTotalAmount()).toEqual(0)
  expect(cart.getCartItens()).toEqual([])
})

test('Deve lançar um erro caso o item a ser removido não exista no carrinho', function () {
  const cart = Cart.create(crypto.randomUUID())
  expect(() => cart.removeItem(crypto.randomUUID())).toThrow(
    new Error('Cart item not found.')
  )
})
