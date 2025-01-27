import { AddressType } from './AddressType'
import { Zip } from './Zip'

export class Address {
  private addressType: AddressType
  private street: string
  private number: number
  private district: string
  private city: string
  private state: string
  private zip: Zip
  private country: string
  private complement?: string

  constructor(
    addressType: string,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    complement?: string
  ) {
    if (!street.trim()) {
      throw new Error('Invalid street.')
    }
    if (number < 0) {
      throw new Error('Invalid number.')
    }
    if (!district.trim()) {
      throw new Error('Invalid district.')
    }
    if (!city.trim()) {
      throw new Error('Invalid city.')
    }
    if (!state.trim()) {
      throw new Error('Invalid state.')
    }
    if (!country.trim()) {
      throw new Error('Invalid country.')
    }
    this.addressType = new AddressType(addressType)
    this.street = street
    this.number = number
    this.district = district
    this.city = city
    this.state = state
    this.zip = new Zip(zip)
    this.country = country
    this.complement = complement
  }

  public getAddressType() {
    return this.addressType.getAddressType()
  }

  public getStreet() {
    return this.street
  }

  public getNumber() {
    return this.number
  }

  public getDistrict() {
    return this.district
  }

  public getCity() {
    return this.city
  }

  public getState() {
    return this.state
  }

  public getZip() {
    return this.zip.getValue()
  }

  public getCountry() {
    return this.country
  }

  public getComplement() {
    return this.complement
  }
}
