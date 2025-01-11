import 'dotenv/config'
import { Authenticate } from './account/application/usecase/Authenticate'
import { CreateAccount } from './account/application/usecase/CreateAccount'
import { JWTAdapter } from './account/infra/auth/JWTAdapter'
import { AccountControler } from './account/infra/controller/AccountController'
import { PgPromiseAdapter } from './account/infra/database/PgPromiseAdapter'
import { ExpressAdapter } from './account/infra/http/ExpressAdapter'
import { AccountRepositoryDatabase } from './account/infra/repository/AccountRepositoryDatabase'
import { FetchCategories } from './product-catalog/application/usecase/FetchCategories'
import { ProductCatalogController } from './product-catalog/infra/controller/ProductCatalogController'
;(async () => {
  const httpServer = new ExpressAdapter()

  const databaseConnection = new PgPromiseAdapter()
  const accountRepository = new AccountRepositoryDatabase(databaseConnection)

  const authProvider = new JWTAdapter()

  const createAccount = new CreateAccount(accountRepository)
  const authenticate = new Authenticate(accountRepository, authProvider)
  const fetchCategories = new FetchCategories()

  new AccountControler(httpServer, createAccount, authenticate)
  new ProductCatalogController(httpServer, fetchCategories)

  httpServer.listen(Number(process.env.PORT))
})()
