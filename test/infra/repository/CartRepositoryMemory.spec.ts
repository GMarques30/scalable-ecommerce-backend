import { Cart } from '../../../src/order/domain/entity/Cart'
import { CartRepositoryMemory } from './CartRepositoryMemory'

let cartRepository: CartRepositoryMemory

beforeEach(() => {
  cartRepository = new CartRepositoryMemory()
})

test('Deve ser possivel salvar um carrinho e obter um carrinho', async function () {
  const cart = Cart.create(crypto.randomUUID())
  cart.addItem(crypto.randomUUID(), 'Notebook', 1500.0, 1)
  await cartRepository.set(`cart:${cart.getAccountId()}`, cart)
  const cartData = await cartRepository.get(`cart:${cart.getAccountId()}`)
  expect(cartData).toBeInstanceOf(Cart)
  expect(cartData?.getCartId()).toEqual(cart.getCartId())
  expect(cartData?.getAccountId()).toEqual(cart.getAccountId())
  expect(cartData?.getTotalAmount()).toEqual(cart.getTotalAmount())
  expect(cartData?.getCartItens()).toEqual([
    {
      productId: expect.objectContaining({
        value: expect.any(String)
      }),
      name: expect.objectContaining({
        value: 'Notebook'
      }),
      price: expect.objectContaining({
        value: 1500.0
      }),
      quantity: expect.objectContaining({
        value: 1
      })
    }
  ])
})

test('Deve lançar um erro ao obter um carrinho inexistente', async function () {
  const result = await cartRepository.get(`cart:${crypto.randomUUID()}`)
  expect(result).toEqual(null)
})

test('Deve ser possivel deletar um carrinho', async function () {
  const cart = Cart.create(crypto.randomUUID())
  cart.addItem(crypto.randomUUID(), 'Notebook', 1500.0, 1)
  await cartRepository.set(`cart:${cart.getAccountId()}`, cart)
  await cartRepository.delete(`cart:${cart.getAccountId()}`)
  const result = await cartRepository.get(`cart:${cart.getAccountId()}`)
  expect(result).toEqual(null)
})
