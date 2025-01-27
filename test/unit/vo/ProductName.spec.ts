import { ProductName } from '../../../src/order/domain/vo/ProductName'

test('Deve ser possivel criar o nome de um produto', function () {
  const productName = new ProductName('Notebook')
  expect(productName.getProductName()).toEqual('Notebook')
})

test.each(['', undefined, null, '   '])(
  'Não deve ser possivel criar um nome de um produto vazio',
  function (productName: any) {
    expect(() => new ProductName(productName)).toThrow(
      new Error('Product name is required')
    )
  }
)
