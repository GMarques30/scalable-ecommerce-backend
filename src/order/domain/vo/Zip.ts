export class Zip {
  private value: string

  constructor(value: string) {
    if (!value.match(/^\d{5}-\d{3}$/)) {
      throw new Error('Invalid zip code.')
    }
    this.value = value
  }

  public getValue() {
    return this.value
  }
}
