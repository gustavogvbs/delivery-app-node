import { Product } from "@prisma/client";

import {
  ICreateProductData,
  IProductRepository,
  IUploadProductData,
} from "@repositories/IProductRepository";

import { prisma } from "@configs/client";

export class PrismaProductRepository implements IProductRepository {
  async createProduct(data: ICreateProductData): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        price: data.price,
        tenantId: data.tenantId,
        categoryId: data.categoryId,
      },
    });

    return product;
  }
  async getBySlug(slug: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
    });
    return product;
  }
  async getAllProducts(tenantId: string): Promise<Product[]> {
    const product = await prisma.product.findMany({
      where: {
        tenantId,
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
