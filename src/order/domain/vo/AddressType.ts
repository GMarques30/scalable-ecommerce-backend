enum AddressArea {
  STREET = 'STREET',
  AVENUE = 'AVENUE'
}

export class AddressType {
  private value: AddressArea

  constructor(addressArea: string) {
    if (
      !Object.values(AddressArea).includes(
        addressArea.toUpperCase() as AddressArea
      )
    ) {
      throw new Error('Invalid address type.')
    }
    this.value = addressArea.toUpperCase() as AddressArea
  }

  public getAddressType() {
    return this.value
  }
}
