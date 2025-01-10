import { Account } from '../../../src/domain/entity/Account'
import { AuthProvider } from '../../../src/infra/auth/AuthProvider'
import { AccountRepository } from './../../../src/application/repository/AccountRepository'
import { Authenticate } from './../../../src/application/usecase/Authenticate'
import { JWTAdapter } from './../../../src/infra/auth/JWTAdapter'
import { AccountRepositoryMemory } from './../../infra/repository/AccountRepositoryMemory'

jest.mock('./../../../src/infra/auth/JWTAdapter', () => {
  return {
    JWTAdapter: jest.fn().mockImplementation(() => {
      return {
        sign: jest.fn().mockReturnValue('mockedToken'),
        verify: jest.fn().mockReturnValue('mockedPayload')
      }
    })
  }
})

let authProvider: AuthProvider
let accountRepository: AccountRepository
let sut: Authenticate

beforeEach(() => {
  authProvider = new JWTAdapter()
  accountRepository = new AccountRepositoryMemory()
  sut = new Authenticate(accountRepository, authProvider)
  accountRepository.save(
    Account.create('John', 'Doe', 'john.doe@example.com', 'John@123')
  )
})

test('Deve ser possivel se autenticar', async function () {
  const input = {
    email: 'john.doe@example.com',
    password: 'John@123'
  }
  const result = await sut.execute(input)
  expect(result.token).toBeDefined()
  expect(result.token).toEqual(expect.any(String))
})

test('Deve lançar um erro caso a conta não seja encontrada', function () {
  const input = {
    email: 'non-existent@example.com',
    password: 'John@123'
  }
  expect(() => sut.execute(input)).rejects.toThrow(
    new Error('Account not found.')
  )
})

test('Deve lançar um erro caso a senha não seja igual', function () {
  const input = {
    email: 'john.doe@example.com',
    password: 'Invalid@123'
  }
  expect(() => sut.execute(input)).rejects.toThrow(
    new Error('Credentials invalid.')
  )
})
