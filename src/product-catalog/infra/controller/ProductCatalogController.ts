import { HttpServer } from '../../../account/infra/http/HttpServer'
import { CreateProduct } from '../../application/usecase/CreateProduct'
import { DeleteProduct } from '../../application/usecase/DeleteProduct'
import { FetchCategories } from '../../application/usecase/FetchCategories'
import { FetchProductDetails } from '../../application/usecase/FetchProductDetails'
import { FetchProducts } from '../../application/usecase/FetchProducts'

export class ProductCatalogController {
  constructor(
    private readonly server: HttpServer,
    private readonly fetchCategories: FetchCategories,
    private readonly createProduct: CreateProduct,
    private readonly fetchProducts: FetchProducts,
    private readonly deleteProduct: DeleteProduct,
    private readonly fetchProductDetails: FetchProductDetails
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

    this.server.register(
      'get',
      '/products',
      async function (params: any, body: any) {
        return await fetchProducts.execute()
      }
    )

    this.server.register(
      'delete',
      '/products/:productId',
      async function (params: any, body: any) {
        const input = {
          productId: params.productId
        }
        return await deleteProduct.execute(input)
      }
    )

    this.server.register(
      'get',
      '/products/:productId',
      async function (params: any, body: any) {
        const input = {
          productId: params.productId
        }
        return await fetchProductDetails.execute(input)
      }
    )
  }
}
