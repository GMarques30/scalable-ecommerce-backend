import { UUID } from '../../../account/domain/vo/UUID'
import { OrderStatus, OrderStatusFactory } from '../vo/OrderStatus'
import { PaymentMethod } from '../vo/PaymentMethod'
import { Shipping } from '../vo/Shipping'

export class Order {
  private readonly orderId: UUID
  private readonly accountId: UUID
  private date: Date
  public status: OrderStatus
  private paymentMethod: PaymentMethod
  private totalAmount: number
  private shipping: Shipping

  private constructor(
    orderId: UUID,
    accountId: UUID,
    date: Date,
    status: string,
    paymentMethod: string,
    totalAmount: number,
    shipping: Shipping
  ) {
    if (totalAmount < 0) {
      throw new Error('Total amount costs cannot be negative.')
    }
    this.orderId = orderId
    this.accountId = accountId
    this.date = date
    this.status = OrderStatusFactory.create(this, status)
    this.paymentMethod = new PaymentMethod(paymentMethod)
    this.totalAmount = totalAmount
    this.shipping = shipping
  }

  static create(
    accountId: string,
    paymentMethod: string,
    totalAmount: number,
    addressType: string,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    shippingCost: number,
    complement?: string
  ) {
    const orderId = new UUID(crypto.randomUUID())
    const accountIdObject = new UUID(accountId)
    const status = 'Pending'
    const orderCreatedOn = new Date()
    const shipping = new Shipping(
      addressType,
      street,
      number,
      district,
      city,
      state,
      zip,
      country,
      shippingCost,
      complement
    )
    return new Order(
      orderId,
      accountIdObject,
      orderCreatedOn,
      status,
      paymentMethod,
      totalAmount,
      shipping
    )
  }

  static restore(
    orderId: string,
    accountId: string,
    date: Date,
    status: string,
    paymentMethod: string,
    totalAmount: number,
    addressType: string,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    shippingCost: number,
    complement?: string
  ) {
    return new Order(
      new UUID(orderId),
      new UUID(accountId),
      new Date(date),
      status,
      paymentMethod,
      totalAmount,
      new Shipping(
        addressType,
        street,
        number,
        district,
        city,
        state,
        zip,
        country,
        shippingCost,
        complement
      )
    )
  }

  public getOrderId() {
    return this.orderId.getUUID()
  }

  public getAccountId() {
    return this.accountId.getUUID()
  }

  public getDate() {
    return this.date
  }

  public getStatus() {
    return this.status.getStatus()
  }

  public processing() {
    this.status.processing()
  }

  public refused() {
    this.status.refused()
  }

  public paid() {
    this.status.paid()
  }

  public sent() {
    this.status.sent()
  }

  public completed() {
    this.status.completed()
  }

  public canceled() {
    this.status.canceled()
  }

  public getPaymentMethod() {
    return this.paymentMethod.getPaymentMethod()
  }

  public getTotalAmount() {
    return this.totalAmount
  }

  public getAddressType() {
    return this.shipping.getAddressType()
  }

  public getStreet() {
    return this.shipping.getStreet()
  }

  public getNumber() {
    return this.shipping.getNumber()
  }

  public getDistrict() {
    return this.shipping.getDistrict()
  }

  public getCity() {
    return this.shipping.getCity()
  }

  public getState() {
    return this.shipping.getState()
  }

  public getZip() {
    return this.shipping.getZip()
  }

  public getCountry() {
    return this.shipping.getCountry()
  }

  public getComplement() {
    return this.shipping.getComplement()
  }

  public getShippingCost() {
    return this.shipping.getShippingCost()
  }
}
