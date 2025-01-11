export class Name {
  private readonly firstName: string
  private readonly lastName: string

  constructor(firstName: string, lastName: string) {
    if (
      !firstName.match(/^[A-Za-zÀ-ÿ]{3,}$/) ||
      !lastName.match(/^[A-Za-zÀ-ÿ]{3,}$/)
    ) {
      throw new Error('Invalid name.')
    }
    this.firstName = firstName
    this.lastName = lastName
  }

  public getFirstName() {
    return this.firstName
  }

  public getLastName() {
    return this.lastName
  }

  public getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
