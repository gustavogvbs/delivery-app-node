import {
  UpdateCategoryData,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "@modules/category/dtos/UpdateCategoryDTO";
import { ICategoryRepository } from "@repositories/ICategoryRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

export class UpdateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({
    name,
    slug,
  }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const category = await this.categoryRepository.updateCategory({
      name,
      slug,
    });
    if (!category) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const data = this.formatterResponse.execute<UpdateCategoryData>(
      category.id,
      {
        created_at: category.created_at,
        name: category.name,
        slug: category.slug,
        updated_at: category.updated_at,
      },
    );
    return data;
  }
}
