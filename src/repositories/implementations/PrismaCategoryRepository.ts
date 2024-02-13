import { Category } from "@prisma/client";

import {
  ICategoryRepository,
  ICreateCategoryData,
  IUpdateCategoryData,
} from "@repositories/ICategoryRepository";

import { prisma } from "@configs/client";

export class PrismaCategoryRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }
  async findBySlug(slug: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    return category;
  }
  async createCategory(data: ICreateCategoryData): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        tenantId: data.tenantId,
      },
    });

    return category;
  }
  async getAllCategories(tenantId: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        tenantId: tenantId,
      },
    });

    return categories;
  }

  async updateCategory({ slug, name }: IUpdateCategoryData): Promise<Category> {
    const category = await prisma.category.update({
      where: {
        slug,
      },
      data: {
        name,
      },
    });
    return category;
  }
}
