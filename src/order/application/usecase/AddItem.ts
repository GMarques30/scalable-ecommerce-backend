import { Cart } from '../../domain/entity/Cart'
import { CartRepository } from './../repository/CartRepository'

export class AddItem {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(input: AddItemInput) {
    //Achar uma forma de verificar se existe a quantidade necessária no inventário.
    let cart = await this.cartRepository.get(`cart:${input.accountId}`)
    if (!cart) {
      cart = Cart.create(input.accountId)
    }
    cart.addItem(input.productId, input.name, input.price, input.quantity)
    await this.cartRepository.set(`cart:${input.accountId}`, cart)
  }
}

interface AddItemInput {
  accountId: string
  productId: string
  name: string
  price: number
  quantity: number
}
