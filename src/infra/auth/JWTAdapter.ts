import { sign, verify } from 'jsonwebtoken'
import { AuthProvider } from './AuthProvider'

export class JWTAdapter implements AuthProvider {
  sign(payload: object, secretKey: string, options: object): string {
    return sign(payload, secretKey, options)
  }
  verify(token: string, secretKey: string, options: object): string | object {
    return verify(token, secretKey, options)
  }
}
