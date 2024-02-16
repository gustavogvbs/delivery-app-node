import { Tenant } from "@prisma/client";

import { FindTenantRequest } from "@modules/tenants/dtos/FindTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";

export class FindTenantUseCase {
  constructor(private tenantRepository: ITenantRepository) {}
  async execute({ slug }: FindTenantRequest): Promise<Tenant> {
    const tenant = await this.tenantRepository.findBySlug(slug);

    if (!tenant) {
      throw new AppError("Estabelecimento não encontrado", 400);
    }

    return tenant;
  }
}
