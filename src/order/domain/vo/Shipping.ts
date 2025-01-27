import { Address } from './Address'

export class Shipping {
  private address: Address
  private shippingCost: number

  constructor(
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
    if (shippingCost < 0) {
      throw new Error('Shipping costs cannot be negative.')
    }
    this.address = new Address(
      addressType,
      street,
      number,
      district,
      city,
      state,
      zip,
      country,
      complement
    )
    this.shippingCost = shippingCost
  }

  public getAddressType() {
    return this.address.getAddressType()
  }

  public getStreet() {
    return this.address.getStreet()
  }

  public getNumber() {
    return this.address.getNumber()
  }

  public getDistrict() {
    return this.address.getDistrict()
  }

  public getCity() {
    return this.address.getCity()
  }

  public getState() {
    return this.address.getState()
  }

  public getZip() {
    return this.address.getZip()
  }

  public getCountry() {
    return this.address.getCountry()
  }

  public getComplement() {
    return this.address.getComplement()
  }

  public getShippingCost() {
    return this.shippingCost
  }
}
