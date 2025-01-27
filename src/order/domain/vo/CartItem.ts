import { UUID } from '../../../account/domain/vo/UUID'
import { Price } from './Price'
import { ProductName } from './ProductName'
import { Quantity } from './Quantity'

export class CartItem {
  private readonly productId: UUID
  private name: ProductName
  private price: Price
  private quantity: Quantity

  constructor(
    productId: string,
    name: string,
    price: number,
    quantity: number
  ) {
    this.productId = new UUID(productId)
    this.name = new ProductName(name)
    this.price = new Price(price)
    this.quantity = new Quantity(quantity)
  }

  public incrementQuantity() {
    this.quantity.increment()
  }

  public decrementQuantity() {
    this.quantity.decrement()
  }

  public getProductId() {
    return this.productId.getUUID()
  }

  public getName() {
    return this.name.getProductName()
  }

  public getPrice() {
    return this.price.getPrice()
  }

  public getQuantity() {
    return this.quantity.getQuantity()
  }
}
