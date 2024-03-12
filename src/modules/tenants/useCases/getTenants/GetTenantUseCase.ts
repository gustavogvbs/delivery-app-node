import {
  GetTenantData,
  GetTenantResponse,
} from "@modules/tenants/dtos/GetTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

export class GetTenantsUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute(): Promise<GetTenantResponse> {
    const tenants = await this.tenantRepository.getAll();

    if (tenants.length === 0) return { data: [] };

    const result = this.formatterResponse.array<GetTenantData>(() => {
      const ids: Array<string> = [];
      const i: Array<number> = [];
      const datas: Array<GetTenantData> = [];

      tenants.forEach(
        ({ city, id, name, permission, phone, primaryColor, slug }, index) => {
          ids.push(id);
          i.push(index);
          datas.push({
            name,
            city,
            permission,
            phone,
            primaryColor,
            slug,
          });
        },
      );
      return { ids, i, datas };
    });

    return result;
  }
}
