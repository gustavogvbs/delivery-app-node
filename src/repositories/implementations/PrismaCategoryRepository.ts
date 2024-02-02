import { Category } from "@prisma/client";

import {
  ICategoryRepository,
  ICreateCategoryData,
} from "@repositories/ICategoryRepository";

import { prisma } from "@configs/client";

export class PrismaCreateCategory implements ICategoryRepository {
  findById(id: string): Promise<Category | null> {
    const category = prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }
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
}
