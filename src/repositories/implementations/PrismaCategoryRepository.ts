import { Category } from "@prisma/client";

import {
  ICategoryRepository,
  ICreateCategoryData,
} from "@repositories/ICategoryRepository";

import { prisma } from "@configs/client";

export class PrismaCategoryRepository implements ICategoryRepository {
  createCategory(data: ICreateCategoryData): Promise<Category> {
    const category = prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        tenantId: data.tenantId,
      },
    });

    return category;
  }
  getAllCategories(idTenant: string): Promise<Category[]> {
    const categories = prisma.category.findMany({
      where: {
        tenantId: idTenant,
      },
    });

    return categories;
  }
}
