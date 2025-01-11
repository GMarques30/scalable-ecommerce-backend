import { Account } from '../../domain/entity/Account'
import { AccountRepository } from '../repository/AccountRepository'

export class CreateAccount {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: CreateAccountInput): Promise<void> {
    const accountExists = await this.accountRepository.findByEmail(input.email)
    if (accountExists) {
      throw new Error('Email already used.')
    }
    const account = Account.create(
      input.firstName,
      input.lastName,
      input.email,
      input.password
    )
    await this.accountRepository.save(account)
  }
}

interface CreateAccountInput {
  firstName: string
  lastName: string
  email: string
  password: string
}
