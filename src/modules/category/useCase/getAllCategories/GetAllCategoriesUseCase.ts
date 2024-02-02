import { Category } from "@prisma/client";

import { ICategoryRepository } from "@repositories/ICategoryRepository";

export class GetAllCategories {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ idTenant }: GetAllCategoriesRequest): Promise<Category[]> {
    // Pegar todas as categorias referente aquele tenant
    // Retornar a lista de categorias
  }
}
