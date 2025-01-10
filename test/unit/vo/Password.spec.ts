import crypto from 'node:crypto'
import { Password } from './../../../src/domain/vo/Password'

test.each(['Abc@123', 'XyZ!987', 'Pa$$word1', 'Passw@ord', 'A1b@cD2'])(
  'Should check that it is a valid password',
  function (password: string) {
    const encryptedPassword = Password.create(password)
    expect(encryptedPassword).toBeInstanceOf(Password)
    expect(encryptedPassword.getPassword()).toEqual(
      crypto.createHash('SHA-256').update(password).digest('hex')
    )
  }
)

test.each(['abcdef', 'ABC@123', 'abc123', 'Ab@1', 'A1b@cdefghijkl'])(
  'Should check that it is a invalid password',
  function (password: string) {
    expect(() => Password.create(password)).toThrow(
      new Error('Invalid password.')
    )
  }
)

test('Should be able to restore a password already encrypted', function () {
  const encryptedPassword = Password.create('Abc@123').getPassword()
  expect(Password.restore(encryptedPassword).getPassword()).toEqual(
    encryptedPassword
  )
})

test('Should be able to check that the passwords are the same', function () {
  const password = Password.create('Abc@123')
  expect(password.passwordMatches('Abc@123')).toBeTruthy()
})
