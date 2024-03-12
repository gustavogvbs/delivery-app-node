import { ICategoryRepository } from "@repositories/ICategoryRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

import {
  GetAllCategoriesRequest,
  GetAllCategoryData,
  GetAllCategoryResponse,
} from "../../dtos/GetAllCategoriesDTOS";

export class GetAllCategoriesUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({
    idTenant,
  }: GetAllCategoriesRequest): Promise<GetAllCategoryResponse> {
    const getAllCategories =
      await this.categoryRepository.getAllCategories(idTenant);

    if (!getAllCategories) {
      throw new AppError("Propriedades não encontradas", 404);
    }

    const result =
      this.formatterResponse.array<GetAllCategoryData>(getAllCategories);

    return result;
  }
}
