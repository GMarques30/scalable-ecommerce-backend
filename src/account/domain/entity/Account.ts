import { Email } from '../vo/Email'
import { Name } from '../vo/Name'
import { Password } from '../vo/Password'
import { UUID } from '../vo/UUID'

export class Account {
  private readonly accountId: UUID
  private name: Name
  private email: Email
  private password: Password

  private constructor(
    accountId: UUID,
    name: Name,
    email: Email,
    password: Password
  ) {
    this.accountId = accountId
    this.name = name
    this.email = email
    this.password = password
  }

  static create(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Account {
    const accountId = new UUID(crypto.randomUUID())
    const name = new Name(firstName, lastName)
    const emailValueObject = new Email(email)
    const passwordValueObject = Password.create(password)
    return new Account(accountId, name, emailValueObject, passwordValueObject)
  }

  static restore(
    accountId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Account {
    const accountIdValueObject = new UUID(accountId)
    const name = new Name(firstName, lastName)
    const emailValueObject = new Email(email)
    const passwordValueObject = Password.restore(password)
    return new Account(
      accountIdValueObject,
      name,
      emailValueObject,
      passwordValueObject
    )
  }

  public getAccountId() {
    return this.accountId.getUUID()
  }

  public getFirstName() {
    return this.name.getFirstName()
  }

  public getLastName() {
    return this.name.getLastName()
  }

  public getFullName() {
    return this.name.getFullName()
  }

  public getEmail() {
    return this.email.getEmail()
  }

  public getPassword() {
    return this.password.getPassword()
  }

  public passwordMatches(password: string): boolean {
    return this.password.passwordMatches(password)
  }
}
