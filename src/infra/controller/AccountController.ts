import { Authenticate } from '../../application/usecase/Authenticate'
import { CreateAccount } from '../../application/usecase/CreateAccount'
import { HttpServer } from './../http/HttpServer'

export class AccountControler {
  constructor(
    private readonly server: HttpServer,
    private readonly createAccount: CreateAccount,
    private readonly authenticate: Authenticate
  ) {
    this.server.register(
      'post',
      '/accounts',
      async function (params: any, body: any) {
        return await createAccount.execute(body)
      }
    )

    this.server.register(
      'post',
      '/accounts/login',
      async function (params: any, body: any) {
        return await authenticate.execute(body)
      }
    )
  }
}
