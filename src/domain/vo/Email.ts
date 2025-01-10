export class Email {
  private value: string

  constructor(value: string) {
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      throw new Error('Invalid email.')
    }
    this.value = value
  }

  public getEmail() {
    return this.value
  }
}
