import { Category } from "@prisma/client";

import { CreateCategoryRequest } from "@modules/category/dtos/CreateCategoryDTO";
import { ICategoryRepository } from "@repositories/ICategoryRepository";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { SlugGenereted } from "@utils/SlugGenereted";

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private tenantRepository: ITenantRepository,
  ) {}
  async execute(data: CreateCategoryRequest): Promise<Category> {
    const tenantAlredyExists = await this.tenantRepository.findById(
      data.tenantId,
    );

    if (!tenantAlredyExists) {
      throw new AppError("Estabelecimento não encontrado", 400);
    }
    const slug = SlugGenereted({
      name: data.name,
      prefix: tenantAlredyExists.slug,
    });
    const categoryAlreadExist = await this.categoryRepository.findBySlug(slug);
    if (categoryAlreadExist)
      throw new AppError("O slug da categoria ja foi registrado", 400);

    const category = await this.categoryRepository.createCategory({
      name: data.name,
      tenantId: data.tenantId,
      slug,
    });
    return category;
  }
}
