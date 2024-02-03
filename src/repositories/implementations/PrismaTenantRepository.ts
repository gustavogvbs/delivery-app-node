import { Tenant } from "@prisma/client";

import { ITenantRepository } from "@repositories/ITenantRepository";

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
}
