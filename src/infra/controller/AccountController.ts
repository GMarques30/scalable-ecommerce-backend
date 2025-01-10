import { CreateAccount } from '../../application/usecase/CreateAccount'
import { HttpServer } from './../http/HttpServer'

export class AccountControler {
  constructor(
    private readonly server: HttpServer,
    private readonly createAccount: CreateAccount
  ) {
    this.server.register(
      'post',
      '/accounts',
      async function (params: any, body: any) {
        return await createAccount.execute(body)
      }
    )
  }
}
