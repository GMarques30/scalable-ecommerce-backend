import 'dotenv/config'
import { Authenticate } from './application/usecase/Authenticate'
import { CreateAccount } from './application/usecase/CreateAccount'
import { JWTAdapter } from './infra/auth/JWTAdapter'
import { AccountControler } from './infra/controller/AccountController'
import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { AccountRepositoryDatabase } from './infra/repository/AccountRepositoryDatabase'
;(async () => {
  const httpServer = new ExpressAdapter()
  const databaseConnection = new PgPromiseAdapter()
  const authProvider = new JWTAdapter()
  const accountRepository = new AccountRepositoryDatabase(databaseConnection)
  const createAccount = new CreateAccount(accountRepository)
  const authenticate = new Authenticate(accountRepository, authProvider)
  new AccountControler(httpServer, createAccount, authenticate)

  httpServer.listen(Number(process.env.PORT))
})()
