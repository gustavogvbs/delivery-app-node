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
    const categories = await this.categoryRepository.getAllCategories(idTenant);

    if (!categories) {
      throw new AppError("Propriedades não encontradas", 404);
    }

    const result = this.formatterResponse.array<GetAllCategoryData>(() => {
      const ids: Array<string> = [];
      const i: Array<number> = [];
      const datas: Array<GetAllCategoryData> = [];

      categories.forEach(
        ({ id, name, slug, created_at, updated_at }, index) => {
          ids.push(id);
          i.push(index);
          datas.push({
            name,
            slug,
            created_at,
            updated_at,
          });
        },
      );
      return { ids, i, datas };
    });

    return result;
  }
}
