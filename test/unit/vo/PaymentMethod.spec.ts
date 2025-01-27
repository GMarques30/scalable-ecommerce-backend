import { PaymentMethod } from '../../../src/order/domain/vo/PaymentMethod'

test.each([
  'CREDIT CARD',
  'credit card',
  'Credit Card',
  'DEBIT CARD',
  'debit card',
  'Debit Card',
  'PIX',
  'pix',
  'Pix',
  'BOLETO',
  'boleto',
  'Boleto'
])(
  'Should be possible to create a payment method',
  function (paymentMethod: string) {
    expect(new PaymentMethod(paymentMethod).getPaymentMethod()).toEqual(
      paymentMethod.toUpperCase()
    )
  }
)

test.each([
  'CREDITCARD',
  'creditcard',
  'paypal',
  'boleto payment',
  'pixpayment',
  'CARD'
])(
  'Should throw an error if the payment method is invalid',
  function (paymentMethod: string) {
    expect(() => new PaymentMethod(paymentMethod)).toThrow(
      'Invalid payment method.'
    )
  }
)
