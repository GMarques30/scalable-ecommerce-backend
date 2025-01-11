import crypto from 'node:crypto'
import { Account } from '../../../src/account/domain/entity/Account'

test('Should be possible to create an account successfully', function () {
  const account = Account.create(
    'John',
    'Doe',
    'john.doe@example.com',
    'John@123'
  )
  expect(account.getAccountId()).toBeDefined()
  expect(account.getFirstName()).toEqual('John')
  expect(account.getLastName()).toEqual('Doe')
  expect(account.getEmail()).toEqual('john.doe@example.com')
  expect(account.getPassword()).toEqual(
    crypto.createHash('SHA-256').update('John@123').digest('hex')
  )
})

test('Should be possible to restore the account status', function () {
  const accountId = '123e4567-e89b-12d3-a456-426614174000'
  const passwordEncrypted = crypto
    .createHash('SHA-256')
    .update('John@123')
    .digest('hex')
  const account = Account.restore(
    accountId,
    'John',
    'Doe',
    'john.doe@example.com',
    passwordEncrypted
  )
  expect(account.getAccountId()).toEqual(accountId)
  expect(account.getFirstName()).toEqual('John')
  expect(account.getLastName()).toEqual('Doe')
  expect(account.getEmail()).toEqual('john.doe@example.com')
  expect(account.getPassword()).toEqual(
    crypto.createHash('SHA-256').update('John@123').digest('hex')
  )
})

test('Should be possible to return the full name', function () {
  const account = Account.create(
    'John',
    'Doe',
    'john.doe@example.com',
    'John@123'
  )
  expect(account.getFullName()).toEqual('John Doe')
})

test('Must be possible to compare two passwords successfully', function () {
  const account = Account.create(
    'John',
    'Doe',
    'john.doe@example.com',
    'John@123'
  )
  expect(account.passwordMatches('John@123')).toBeTruthy()
})
