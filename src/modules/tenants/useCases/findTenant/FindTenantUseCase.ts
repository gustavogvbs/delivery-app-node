import { FindTenantRequest } from "@modules/tenants/dtos/FindTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { FormatterArrayResponse } from "@utils/res/FormatterArrayResponse";
import { FormatterDataResponse } from "@utils/res/FormatterDataResponse";
import { TenantResponseData } from "@utils/res/formatters/tenant-response";

export class FindTenantUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private formatterDataResponse: FormatterDataResponse,
    private formatterArrayResponse: FormatterArrayResponse,
  ) {}
  async execute({
    slug,
    query,
  }: FindTenantRequest): Promise<TenantResponseData> {
    const tenant = await this.tenantRepository.findBySlug(slug, query);

    if (!tenant) {
      throw new AppError("Estabelecimento não encontrado", 400);
    }

    const categories = this.formatterArrayResponse.categories(
      tenant.categories,
    ).data;
    const orders = this.formatterArrayResponse.orders(tenant.orders || []).data;
    const products = this.formatterArrayResponse.products(
      tenant.products || [],
    ).data;

    const result = this.formatterDataResponse.tenant(tenant, {
      categories: query?.includes("categories") ? categories : undefined,
      orders: query?.includes("orders") ? orders : undefined,
      products: query?.includes("products") ? products : undefined,
    });

    return result;
  }
}
