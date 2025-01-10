import { AccountRepository } from '../../../src/application/repository/AccountRepository'
import { Account } from '../../../src/domain/entity/Account'

export class AccountRepositoryMemory implements AccountRepository {
  private readonly accounts: {
    accountId: string
    firstName: string
    lastName: string
    email: string
    password: string
  }[]

  constructor() {
    this.accounts = []
  }

  async save(account: Account): Promise<void> {
    this.accounts.push({
      accountId: account.getAccountId(),
      firstName: account.getFirstName(),
      lastName: account.getLastName(),
      email: account.getEmail(),
      password: account.getPassword()
    })
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = this.accounts.find(account => account.email === email)
    if (!account) {
      return null
    }
    return Account.restore(
      account.accountId,
      account.firstName,
      account.lastName,
      account.email,
      account.password
    )
  }
}
