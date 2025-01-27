import { CartRepository } from '../../application/repository/CartRepository'
import { Cart } from '../../domain/entity/Cart'
import { CacheConnection } from '../cache/RedisAdapter'

export class CartRepositoryDatabase implements CartRepository {
  constructor(private readonly connection: CacheConnection) {}

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

    await this.connection.set(key, value)
  }

  async get(key: string): Promise<Cart | null> {
    const data = await this.connection.get(key)
    if (!data) {
      throw new Error('Cart not found.')
    }
    const cart = Cart.restore(data.cartId, data.accountId, data.totalAmount)
    for (const item of data.itens) {
      cart.addItem(item.productId, item.name, item.price, item.quantity)
    }
    return cart
  }

  async delete(key: string): Promise<void> {
    await this.connection.delete(key)
  }
}
