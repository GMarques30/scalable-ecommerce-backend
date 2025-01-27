import { Cart } from '../../domain/entity/Cart'

export interface CartRepository {
  set(key: string, value: Cart): Promise<void>
  get(key: string): Promise<Cart | null>
  delete(key: string): Promise<void>
}
