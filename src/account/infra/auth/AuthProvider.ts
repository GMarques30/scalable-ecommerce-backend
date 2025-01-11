export interface AuthProvider {
  sign(payload: object, secretKey: string, options: object): string
  verify(token: string, secretKey: string, options: object): string | object
}
