import { Category, Product } from "@prisma/client";

import {
  ICreateProductData,
  IProductRepository,
  IUploadProductData,
} from "@repositories/IProductRepository";

import { prisma } from "@configs/client";

export class PrismaProductRepository implements IProductRepository {
  async createProduct(
    data: ICreateProductData,
    query: string[],
  ): Promise<Product & { category: Category | null }> {
    const product = await prisma.product.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        price: data.price,
        tenantId: data.tenantId,
        categoryId: data.categoryId,
        image: data.image,
      },
      include: {
        category: query ? query.includes("category") : false,
        tenant: query ? query.includes("tenant") : false,
      },
    });

    return product;
  }
  async getBySlug(slug: string, tenantId: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        slug,
        tenantId,
      },
    });
    return product;
  }
  async getAllProducts(
    tenantId: string,
    query?: string[],
  ): Promise<(Product & { category: Category })[]> {
    const product = await prisma.product.findMany({
      where: {
        tenantId,
      },
      include: {
        category: query ? query.includes("category") : false,
        tenant: query ? query.includes("tenant") : false,
      },
    });
    return product;
  }

  async updateProduct(data: IUploadProductData): Promise<Product | null> {
    const product = await prisma.product.update({
      where: {
        slug: data.slug,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
      },
    });
    return product;
  }
}
