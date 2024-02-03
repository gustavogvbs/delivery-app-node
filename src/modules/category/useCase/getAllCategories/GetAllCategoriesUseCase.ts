import { Category } from "@prisma/client";

import { ICategoryRepository } from "@repositories/ICategoryRepository";

import { GetAllCategoriesRequest } from "../../dtos/GetAllCategoriesDTOS";

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ idTenant }: GetAllCategoriesRequest): Promise<Category[]> {
    const getAllCategories =
      await this.categoryRepository.getAllCategories(idTenant);

    return getAllCategories;
    // Pegar todas as categorias referente aquele tenant
    // Retornar a lista de categorias
  }
}
