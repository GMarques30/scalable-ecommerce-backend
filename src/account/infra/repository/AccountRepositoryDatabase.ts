import { AccountRepository } from '../../application/repository/AccountRepository'
import { Account } from '../../domain/entity/Account'
import { DatabaseConnection } from '../database/DatabaseConnection'

export class AccountRepositoryDatabase implements AccountRepository {
  private readonly connection: DatabaseConnection

  constructor(connection: DatabaseConnection) {
    this.connection = connection
  }

  async save(account: Account): Promise<void> {
    await this.connection.query(
      'INSERT INTO accounts (account_id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
      [
        account.getAccountId(),
        account.getFirstName(),
        account.getLastName(),
        account.getEmail(),
        account.getPassword()
      ]
    )
  }

  async findByEmail(email: string): Promise<Account | null> {
    const [account] = await this.connection.query(
      'SELECT * FROM accounts WHERE email = $1',
      [email]
    )
    if (!account) {
      return null
    }
    return Account.restore(
      account.accountId,
      account.first_name,
      account.last_name,
      account.email,
      account.password
    )
  }
}
