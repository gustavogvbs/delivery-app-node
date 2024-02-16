import {
  FindTenantRequest,
  FindTenantResponse,
} from "@modules/tenants/dtos/FindTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";

export class FindTenantUseCase {
  constructor(private tenantRepository: ITenantRepository) {}
  async execute({ slug }: FindTenantRequest): Promise<FindTenantResponse> {
    const tenant = await this.tenantRepository.findBySlug(slug);

    if (!tenant) {
      throw new AppError("Propriedades não encontradas", 400);
    }
    const result = {
      slug: tenant.slug,
    };
    return result;
  }
}
