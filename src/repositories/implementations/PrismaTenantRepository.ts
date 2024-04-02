import { Category, Order, Product, Tenant } from "@prisma/client";

import {
  ITenantRepository,
  IUpdateTenantData,
} from "@repositories/ITenantRepository";

import { prisma } from "@configs/client";

export class PrismaTenantRepository implements ITenantRepository {
  async findBySlug(
    slug: string,
    query?: string[],
  ): Promise<
    | (Tenant & {
        categories: Category[];
        orders: Order[];
        products: Product[];
      })
    | null
  > {
    const tenant = await prisma.tenant.findUnique({
      where: {
        slug,
      },
      include: {
        categories: query ? query.includes("categories") : false,
        orders: query ? query.includes("orders") : false,
        products: query ? query.includes("products") : false,
      },
    });

    return tenant;
  }
  async findById(id: string): Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return tenant;
  }
  async findByUserId(id: string): Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });

    return tenant;
  }
  async updateTenant({
    name,
    city,
    primaryColor,
    phone,
    slug,
    permission,
    id,
  }: IUpdateTenantData): Promise<Tenant> {
    const tenant = await prisma.tenant.update({
      where: {
        id,
      },
      data: {
        slug,
        name,
        city,
        primaryColor,
        phone,
        permission,
      },
    });
    return tenant;
  }

  async getAll(): Promise<Tenant[]> {
    const tenants = await prisma.tenant.findMany();

    return tenants;
  }
}
