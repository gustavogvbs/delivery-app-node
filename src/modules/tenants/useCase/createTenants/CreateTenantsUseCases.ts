import { Tenant } from "@prisma/client";

import { prisma } from "@prismasrc/client";

import { CreateTenantDTO } from "../../dtos/CreateTenantDTO";

export class CreateTanantUseCase {
  async execute({
    slug,
    name,
    primaryColor,
    phone,
  }: CreateTenantDTO): Promise<Tenant> {
    const tenant = await prisma.tenant.create({
      data: {
        slug,
        name,
        primaryColor,
        phone,
      },
    });

    return tenant;
  }
}
