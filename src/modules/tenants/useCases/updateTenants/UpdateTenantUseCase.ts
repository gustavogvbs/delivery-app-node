import { Tenant } from "@prisma/client";

import { UpdateTenantRequest } from "@modules/tenants/dtos/UpdateTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

export class UpdateTenantUseCase {
  constructor(private updateTenantRepository: ITenantRepository) {}

  async execute(data: UpdateTenantRequest): Promise<Tenant> {
    const tenantUpdate = await this.updateTenantRepository.updateTenant(data);
    return tenantUpdate;
  }
}
