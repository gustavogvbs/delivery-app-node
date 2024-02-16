import { Tenant } from "@prisma/client";

import {
  ITenantRepository,
  IUpdateTenantData,
} from "@repositories/ITenantRepository";

import { prisma } from "@configs/client";

export class PrismaTenantRepository implements ITenantRepository {
  async findBySlug(slug: string): Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({
      where: {
        slug,
      },
    });

    return tenant;
  }
  async findById(slug: string): Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({
      where: {
        slug,
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
  }: IUpdateTenantData): Promise<Tenant> {
    const tenant = await prisma.tenant.update({
      where: {
        slug,
      },
      data: {
        name,
        city,
        primaryColor,
        phone,
        permission,
      },
    });
    return tenant;
  }
}
