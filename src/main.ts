import 'dotenv/config'
import { Authenticate } from './account/application/usecase/Authenticate'
import { CreateAccount } from './account/application/usecase/CreateAccount'
import { JWTAdapter } from './account/infra/auth/JWTAdapter'
import { AccountControler } from './account/infra/controller/AccountController'
import { PgPromiseAdapter } from './account/infra/database/PgPromiseAdapter'
import { ExpressAdapter } from './account/infra/http/ExpressAdapter'
import { AccountRepositoryDatabase } from './account/infra/repository/AccountRepositoryDatabase'
import { CreateProduct } from './product-catalog/application/usecase/CreateProduct'
import { DeleteProduct } from './product-catalog/application/usecase/DeleteProduct'
import { FetchCategories } from './product-catalog/application/usecase/FetchCategories'
import { FetchProductDetails } from './product-catalog/application/usecase/FetchProductDetails'
import { FetchProducts } from './product-catalog/application/usecase/FetchProducts'
import { UpdateProduct } from './product-catalog/application/usecase/UpdateProduct'
import { ProductCatalogController } from './product-catalog/infra/controller/ProductCatalogController'
import { ProductCatalogDAODatabase } from './product-catalog/infra/dao/ProductCatalogDAODatabase'
import { ProductCatalogRepositoryDatabase } from './product-catalog/infra/repository/ProductCatalogRepositoryDatabase'
;(async () => {
  const httpServer = new ExpressAdapter()

  const databaseConnection = new PgPromiseAdapter()
  const accountRepository = new AccountRepositoryDatabase(databaseConnection)
  const productCatalogRepository = new ProductCatalogRepositoryDatabase(
    databaseConnection
  )

  const productCatalogDAO = new ProductCatalogDAODatabase(databaseConnection)

  const authProvider = new JWTAdapter()

  const createAccount = new CreateAccount(accountRepository)
  const authenticate = new Authenticate(accountRepository, authProvider)
  const fetchCategories = new FetchCategories()
  const createProduct = new CreateProduct(productCatalogRepository)
  const fetchProducts = new FetchProducts(productCatalogDAO)
  const deleteProduct = new DeleteProduct(productCatalogRepository)
  const fetchProductDetails = new FetchProductDetails(productCatalogDAO)
  const updateProduct = new UpdateProduct(productCatalogRepository)

  new AccountControler(httpServer, createAccount, authenticate)
  new ProductCatalogController(
    httpServer,
    fetchCategories,
    createProduct,
    fetchProducts,
    deleteProduct,
    fetchProductDetails,
    updateProduct
  )

  httpServer.listen(Number(process.env.PORT))
})()
