import { Category } from '../../domain/vo/Category'

export class FetchCategories {
  constructor() {}

  async execute(): Promise<FetchCategoriesOutput> {
    const categories = []
    for (const category in Category) {
      categories.push(category)
    }
    return {
      categories
    }
  }
}

interface FetchCategoriesOutput {
  categories: string[]
}
