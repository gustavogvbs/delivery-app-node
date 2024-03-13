import {
  UpdateTenantData,
  UpdateTenantRequest,
  UpdateTenantResponse,
} from "@modules/tenants/dtos/UpdateTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

export class UpdateTenantUseCase {
  constructor(
    private updateTenantRepository: ITenantRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({
    city,
    name,
    permission,
    phone,
    primaryColor,
    slug,
    id,
  }: UpdateTenantRequest): Promise<UpdateTenantResponse> {
    const tenant = await this.updateTenantRepository.updateTenant({
      city,
      id,
      name,
      permission,
      phone,
      primaryColor,
      slug,
    });
    if (!tenant) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const formatter = this.formatterResponse.execute<UpdateTenantData>(
      tenant.id,
      { city, name, permission, phone, primaryColor, slug },
    );
    return formatter;
  }
}
