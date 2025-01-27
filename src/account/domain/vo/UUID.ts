export class UUID {
  private readonly value: string

  constructor(value: string) {
    if (
      !value.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      )
    ) {
      throw new Error('Invalid UUID.')
    }
    this.value = value
  }

  public getUUID() {
    return this.value
  }
}
