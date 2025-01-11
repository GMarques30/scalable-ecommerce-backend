import { FetchCategories } from './../../../src/product-catalog/application/usecase/FetchCategories'

let sut: FetchCategories

beforeEach(() => {
  sut = new FetchCategories()
})

test('Must be possible to list all categories', async function () {
  const result = await sut.execute()
  expect(result.categories).toEqual(
    expect.objectContaining([
      'ELECTRONICS',
      'CLOTHING',
      'APPLIANCES',
      'BOOKS',
      'BEAUTY',
      'SPORTS',
      'TOYS',
      'FOOD'
    ])
  )
})
