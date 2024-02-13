import { Category } from "@prisma/client";

import { UpdateCategoryRequest } from "@modules/category/dtos/UpdateCategoryDTO";
import { ICategoryRepository } from "@repositories/ICategoryRepository";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ slug, name }: UpdateCategoryRequest): Promise<Category> {
    const category = await this.categoryRepository.updateCategory(slug, name);
    return category;
  }
}
