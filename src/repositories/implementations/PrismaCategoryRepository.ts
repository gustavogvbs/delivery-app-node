import { Category } from "@prisma/client";

import {
  ICategoryRepository,
  ICreateCategoryData,
  IUpdateCategoryData,
} from "@repositories/ICategoryRepository";

import { prisma } from "@configs/client";
import { AppError } from "@errors/AppErro";

export class PrismaCategoryRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async findBySlug(slug: string, id: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        slug,
        AND: {
          tenantId: { contains: id },
        },
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
  async deleteCategory(id: string): Promise<void> {
    try {
      await prisma.category.delete({
        where: {
          id,
        },
      });
    } catch (__) {
      throw new AppError(
        "Internal erro - Não foi possivel deletar o produto!",
        500,
      );
    }
  }
}
