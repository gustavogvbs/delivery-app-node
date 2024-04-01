import { ICategoryRepository } from "@repositories/ICategoryRepository";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

import {
  GetAllCategoriesRequest,
  GetAllCategoryData,
  GetAllCategoryResponse,
} from "../../dtos/GetAllCategoriesDTOS";

export class GetAllCategoriesUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private categoryRepository: ICategoryRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({
    slug,
  }: GetAllCategoriesRequest): Promise<GetAllCategoryResponse> {
    const tenant = await this.tenantRepository.findBySlug(slug);

    if (!tenant) throw new AppError("Estabelecimento não encontrado", 403);

    const categories = await this.categoryRepository.getAllCategories(
      tenant.id,
    );

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
