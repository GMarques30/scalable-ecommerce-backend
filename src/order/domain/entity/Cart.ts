import { UUID } from '../../../account/domain/vo/UUID'
import { CartItem } from '../vo/CartItem'

export class Cart {
  private readonly cartId: UUID
  private readonly accountId: UUID
  private totalAmount: number
  private readonly itens: CartItem[]

  private constructor(cartId: string, accountId: string, totalAmount: number) {
    this.cartId = new UUID(cartId)
    this.accountId = new UUID(accountId)
    this.totalAmount = totalAmount
    this.itens = []
  }

  static create(accountId: string) {
    return new Cart(crypto.randomUUID(), accountId, 0)
  }

  static restore(cartId: string, accountId: string, totalAmount: number) {
    return new Cart(cartId, accountId, totalAmount)
  }

  public addItem(
    productId: string,
    name: string,
    price: number,
    quantity: number
  ) {
    const item = this.findItemByProductId(productId)
    if (item) {
      item.incrementQuantity()
    } else {
      this.itens.push(new CartItem(productId, name, price, quantity))
    }
    this.recalculateTotalAmount()
  }

  public removeItem(productId: string) {
    const itemIndex = this.findItemIndexByProductId(productId)
    if (itemIndex === -1) {
      throw new Error('Cart item not found.')
    }
    const item = this.itens[itemIndex]
    if (item.getQuantity() > 1) {
      item.decrementQuantity()
    } else {
      this.itens.splice(itemIndex, 1)
    }
    this.recalculateTotalAmount()
  }

  public getCartId() {
    return this.cartId.getUUID()
  }

  public getAccountId() {
    return this.accountId.getUUID()
  }

  public getTotalAmount() {
    return this.totalAmount
  }

  public getCartItens() {
    return this.itens
  }

  private findItemByProductId(productId: string) {
    return this.itens.find(item => item.getProductId() === productId)
  }

  private findItemIndexByProductId(productId: string) {
    return this.itens.findIndex(item => item.getProductId() === productId)
  }

  private recalculateTotalAmount() {
    this.totalAmount = this.itens.reduce(
      (total, item) => total + item.getPrice() * item.getQuantity(),
      0
    )
  }
}
