import { FetchCategories } from '../../application/usecase/FetchCategories'
import { HttpServer } from '../http/HttpServer'

export class CatalogController {
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
