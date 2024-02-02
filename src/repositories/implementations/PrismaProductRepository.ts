import { Product } from "@prisma/client";

import {
  ICreateProductData,
  IProductRepository,
} from "@repositories/IProductRepository";

import { prisma } from "@configs/client";

export class PrismaProductRepository implements IProductRepository {
  createProduct(data: ICreateProductData): Promise<Product> {
    const product = prisma.product.create({
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
  getBySlug(slug: string): Promise<Product | null> {
    const product = prisma.product.findUnique({
      where: {
        slug,
      },
    });
    return product;
  }
}
