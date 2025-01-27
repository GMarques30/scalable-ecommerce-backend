enum Method {
  CREDIT_CARD = 'CREDIT CARD',
  DEBIT_CARD = 'DEBIT CARD',
  PIX = 'PIX',
  BOLETO = 'BOLETO'
}

export class PaymentMethod {
  private value: Method

  constructor(method: string) {
    if (!Object.values(Method).includes(method.toUpperCase() as Method)) {
      throw new Error('Invalid payment method.')
    }
    this.value = method.toUpperCase() as Method
  }

  public getPaymentMethod() {
    return this.value
  }
}
