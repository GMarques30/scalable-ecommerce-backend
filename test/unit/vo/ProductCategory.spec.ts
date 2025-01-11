import { ProductCategory } from '../../../src/domain/vo/ProductCategory'

test.each(['ELECTRONICS', 'CLOTHING', 'APPLIANCES', 'BOOKS', 'BEAUTY'])(
  'Must be possible to create a valid category',
  function (category: string) {
    const productCategory = new ProductCategory(category)
    expect(productCategory).toBeInstanceOf(ProductCategory)
    expect(productCategory.getCategory()).toEqual(category)
  }
)

test.each(['JEWELRY', 'AUTOMOTIVE', 'PET', 'FURNITURE', 'OFFICE'])(
  'Should not be possible to create a category if it is not listed',
  function (category: string) {
    const productCategory = expect(() => new ProductCategory(category)).toThrow(
      new Error('Invalid category.')
    )
  }
)
