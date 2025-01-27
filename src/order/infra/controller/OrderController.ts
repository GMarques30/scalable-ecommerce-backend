import { HttpServer } from '../http/HttpServer'
import { AddItem } from './../../application/usecase/AddItem'

export class OrderController {
  constructor(
    private readonly server: HttpServer,
    private readonly addItem: AddItem
  ) {
    this.server.register(
      'post',
      '/carts/add',
      async function (params: any, body: any) {
        await addItem.execute(body)
      }
    )
  }
}
