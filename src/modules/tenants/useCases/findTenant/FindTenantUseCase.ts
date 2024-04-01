import {
  FindTenantData,
  FindTenantRequest,
  FindTenantResponse,
} from "@modules/tenants/dtos/FindTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

export class FindTenantUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private formatterResponse: FormatterResponse,
  ) {}
  async execute({ slug }: FindTenantRequest): Promise<FindTenantResponse> {
    const tenant = await this.tenantRepository.findBySlug(slug);

    if (!tenant) {
      throw new AppError("Estabelecimento não encontrado", 400);
    }

    const result = this.formatterResponse.execute<FindTenantData>(tenant.id, {
      slug: tenant.slug,
      name: tenant.name,
      city: tenant.city,
      phone: tenant.phone,
      primaryColor: tenant.primaryColor,
    });

    return result;
  }
}
