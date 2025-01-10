import { AccountRepository } from './../../../src/application/repository/AccountRepository'
import { CreateAccount } from './../../../src/application/usecase/CreateAccount'
import { AccountRepositoryMemory } from './../../infra/repository/AccountRepositoryMemory'

let accountRepository: AccountRepository
let sut: CreateAccount

beforeEach(() => {
  accountRepository = new AccountRepositoryMemory()
  sut = new CreateAccount(accountRepository)
})

test('Should be possible to create an account', async function () {
  const input = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'John@123'
  }
  await sut.execute(input)
  const account = await accountRepository.findByEmail(input.email)
  expect(account?.getAccountId()).toBeDefined()
  expect(account?.getFirstName()).toEqual(input.firstName)
  expect(account?.getLastName()).toEqual(input.lastName)
  expect(account?.getEmail()).toEqual(input.email)
})

test('Should throw an error if there is already an account with the same email address', async function () {
  const input = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'John@123'
  }
  await sut.execute(input)
  expect(() => sut.execute(input)).rejects.toThrow(
    new Error('Email already used.')
  )
})
