import { AuthProvider } from '../../infra/auth/AuthProvider'
import { AccountRepository } from '../repository/AccountRepository'

export class Authenticate {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly authProvider: AuthProvider
  ) {}

  async execute(input: AuthenticateInput): Promise<AuthenticateOutput> {
    const account = await this.accountRepository.findByEmail(input.email)
    if (!account) {
      throw new Error('Account not found.')
    }
    if (!account.passwordMatches(input.password)) {
      throw new Error('Credentials invalid.')
    }
    const token = this.authProvider.sign(
      {
        accountId: account.getAccountId()
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: '2h'
      }
    )
    return {
      token
    }
  }
}

interface AuthenticateInput {
  email: string
  password: string
}

interface AuthenticateOutput {
  token: string
}
