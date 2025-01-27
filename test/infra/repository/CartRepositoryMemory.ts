import { Cart } from '../../../src/order/domain/entity/Cart'
import { CartRepository } from './../../../src/order/application/repository/CartRepository'

export class CartRepositoryMemory implements CartRepository {
  private readonly carts: Map<
    string,
    {
      cartId: string
      accountId: string
      totalAmount: number
      itens: {
        productId: string
        name: string
        price: number
        quantity: number
      }[]
    }
  >

  constructor() {
    this.carts = new Map()
  }

  async set(key: string, value: Cart): Promise<void> {
    const cart = {
      cartId: value.getCartId(),
      accountId: value.getAccountId(),
      totalAmount: value.getTotalAmount(),
      itens: value.getCartItens().map(item => ({
        productId: item.getProductId(),
        name: item.getName(),
        price: item.getPrice(),
        quantity: item.getQuantity()
      }))
    }

    this.carts.set(key, cart)
  }

  async get(key: string): Promise<Cart | null> {
    const data = this.carts.get(key)
    if (!data) {
      return null
    }
    const cart = Cart.restore(data.cartId, data.accountId, data.totalAmount)
    for (const item of data.itens) {
      cart.addItem(item.productId, item.name, item.price, item.quantity)
    }
    return cart
  }

  async delete(key: string): Promise<void> {
    this.carts.delete(key)
  }
}
