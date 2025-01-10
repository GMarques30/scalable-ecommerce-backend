import 'dotenv/config'
import { CreateAccount } from './application/usecase/CreateAccount'
import { AccountControler } from './infra/controller/AccountController'
import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { AccountRepositoryDatabase } from './infra/repository/AccountRepositoryDatabase'
;(async () => {
  const httpServer = new ExpressAdapter()
  const databaseConnection = new PgPromiseAdapter()
  const accountRepository = new AccountRepositoryDatabase(databaseConnection)
  const createAccount = new CreateAccount(accountRepository)
  new AccountControler(httpServer, createAccount)

  httpServer.listen(Number(process.env.PORT))
})()
