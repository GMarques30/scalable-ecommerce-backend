import { Cart } from '../../../src/order/domain/entity/Cart'
import { CartRepository } from './../../../src/order/application/repository/CartRepository'
import { AddItem } from './../../../src/order/application/usecase/AddItem'
import { CartRepositoryMemory } from './../../infra/repository/CartRepositoryMemory'

let cartRepository: CartRepository
let sut: AddItem

beforeEach(() => {
  cartRepository = new CartRepositoryMemory()
  sut = new AddItem(cartRepository)
})

test('Deve ser possivel criar um carrinho e adicionar um item', async function () {
  const input = {
    accountId: crypto.randomUUID(),
    productId: crypto.randomUUID(),
    name: 'Notebook',
    price: 1500.0,
    quantity: 1
  }
  await sut.execute(input)
  const result = await cartRepository.get(`cart:${input.accountId}`)
  expect(result?.getAccountId()).toEqual(input.accountId)
  expect(result?.getTotalAmount()).toEqual(input.price)
  expect(result?.getCartItens()).toEqual([
    {
      productId: expect.objectContaining({
        value: input.productId
      }),
      name: expect.objectContaining({
        value: input.name
      }),
      price: expect.objectContaining({
        value: input.price
      }),
      quantity: expect.objectContaining({
        value: input.quantity
      })
    }
  ])
})

test('Deve obter um carrinho já existente e adicionar um item a ele', async function () {
  const accountId = crypto.randomUUID()
  const cart = Cart.create(accountId)
  cart.addItem(crypto.randomUUID(), 'Notebook', 1500.0, 1)
  await cartRepository.set(`cart:${accountId}`, cart)
  const input = {
    accountId,
    productId: crypto.randomUUID(),
    name: 'Desktop',
    price: 2000.0,
    quantity: 1
  }
  await sut.execute(input)
  const result = await cartRepository.get(`cart:${accountId}`)
  expect(result?.getCartId()).toEqual(cart.getCartId())
  expect(result?.getTotalAmount()).toEqual(3500.0)
  expect(result?.getCartItens()).toEqual([
    {
      productId: expect.objectContaining({
        value: expect.any(String)
      }),
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
      productId: expect.objectContaining({
        value: input.productId
      }),
      name: expect.objectContaining({
        value: input.name
      }),
      price: expect.objectContaining({
        value: input.price
      }),
      quantity: expect.objectContaining({
        value: input.quantity
      })
    }
  ])
})
