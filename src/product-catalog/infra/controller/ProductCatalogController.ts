import { HttpServer } from '../../../account/infra/http/HttpServer'
import { CreateProduct } from '../../application/usecase/CreateProduct'
import { FetchCategories } from '../../application/usecase/FetchCategories'

export class ProductCatalogController {
  constructor(
    private readonly server: HttpServer,
    private readonly fetchCategories: FetchCategories,
    private readonly createProduct: CreateProduct
  ) {
    this.server.register(
      'get',
      '/products/categories',
      async function (params: any, body: any) {
        return await fetchCategories.execute()
      }
    )

    this.server.register(
      'post',
      '/products',
      async function (params: any, body: any) {
        return await createProduct.execute(body)
      }
    )
  }
}
