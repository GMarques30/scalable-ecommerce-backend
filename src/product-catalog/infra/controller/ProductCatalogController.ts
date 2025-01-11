import { HttpServer } from '../../../account/infra/http/HttpServer'
import { FetchCategories } from '../../application/usecase/FetchCategories'

export class ProductCatalogController {
  constructor(
    private readonly server: HttpServer,
    private readonly fetchCategories: FetchCategories
  ) {
    this.server.register(
      'get',
      '/products/categories',
      async function (params: any, body: any) {
        return await fetchCategories.execute()
      }
    )
  }
}
