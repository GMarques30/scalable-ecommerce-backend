export class UUID {
  private readonly value: string

  private constructor(value: string) {
    if (
      !value.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      )
    ) {
      throw new Error('Invalid UUID.')
    }
    this.value = value
  }

  static create(): UUID {
    const value = crypto.randomUUID()
    return new UUID(value)
  }

  static restore(value: string): UUID {
    return new UUID(value)
  }

  public getUUID() {
    return this.value
  }
}
