import { ICategoryRepository } from "@repositories/ICategoryRepository";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";

import { CreateProductRequest } from "../dtos/CreateProductDTO";

export class CreateProductUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private tenantRepository: ITenantRepository,
  ) {}
  async execute(data: CreateProductRequest) {
    const categoryAlreadExist = await this.categoryRepository.findById(
      data.categoryId,
    );
    const tenantAlreadExist = await this.tenantRepository.findById(
      data.tenantId,
    );

    if (!categoryAlreadExist || !tenantAlreadExist)
      throw new AppError("error 500");
    if (categoryAlreadExist.tenantId !== tenantAlreadExist.id)
      throw new AppError("categoria não existe");
  }
}
