import 'dotenv/config'
import { Authenticate } from './application/usecase/Authenticate'
import { CreateAccount } from './application/usecase/CreateAccount'
import { FetchCategories } from './application/usecase/FetchCategories'
import { JWTAdapter } from './infra/auth/JWTAdapter'
import { AccountControler } from './infra/controller/AccountController'
import { CatalogController } from './infra/controller/CatalogController'
import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { AccountRepositoryDatabase } from './infra/repository/AccountRepositoryDatabase'
;(async () => {
  const httpServer = new ExpressAdapter()

  const databaseConnection = new PgPromiseAdapter()
  const accountRepository = new AccountRepositoryDatabase(databaseConnection)

  const authProvider = new JWTAdapter()

  const createAccount = new CreateAccount(accountRepository)
  const authenticate = new Authenticate(accountRepository, authProvider)
  const fetchCategories = new FetchCategories()

  new AccountControler(httpServer, createAccount, authenticate)
  new CatalogController(httpServer, fetchCategories)

  httpServer.listen(Number(process.env.PORT))
})()
