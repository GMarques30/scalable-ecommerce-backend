import { UUID } from '../../../account/domain/vo/UUID'

export class OrderItem {
  private readonly orderItemId: UUID
  private readonly productId: UUID
  private productName: string
  private price: number
  private quantity: number

  private constructor(
    orderItemId: UUID,
    productId: UUID,
    productName: string,
    price: number,
    quantity: number
  ) {
    if (!productName.trim()) {
      throw new Error('Product name cannot be empty')
    }
    if (price < 0) {
      throw new Error('The price cannot be negative')
    }
    if (quantity < 1) {
      throw new Error('The quantity of items cannot be negative or zero')
    }
    this.orderItemId = orderItemId
    this.productId = productId
    this.productName = productName
    this.price = parseFloat(price.toFixed(2))
    this.quantity = quantity
  }

  static create(
    productId: string,
    productName: string,
    price: number,
    quantity: number
  ) {
    return new OrderItem(
      new UUID(crypto.randomUUID()),
      new UUID(productId),
      productName,
      price,
      quantity
    )
  }

  static restore(
    orderItemId: string,
    productId: string,
    productName: string,
    price: number,
    quantity: number
  ) {
    return new OrderItem(
      new UUID(orderItemId),
      new UUID(productId),
      productName,
      price,
      quantity
    )
  }

  public getOrderItemId() {
    return this.orderItemId.getUUID()
  }

  public getProductId() {
    return this.productId.getUUID()
  }

  public getProductName() {
    return this.productName
  }

  public getPrice() {
    return this.price
  }

  public getQuantity() {
    return this.quantity
  }
}
