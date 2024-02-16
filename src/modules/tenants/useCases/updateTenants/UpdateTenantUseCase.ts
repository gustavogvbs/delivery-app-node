import { UpdateTenantRequest } from "@modules/tenants/dtos/UpdateTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

export class UpdateTenantUseCase {
  constructor(private updateTenantRepository: ITenantRepository) {}

  async execute(data: UpdateTenantRequest) {
    const tenantUpdate = await this.updateTenantRepository.updateTenant(data);
    return tenantUpdate;
  }
}
