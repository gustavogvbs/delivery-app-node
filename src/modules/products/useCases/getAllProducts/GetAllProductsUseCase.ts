import {
  GetAllProductsData,
  GetAllProductsRequest,
  GetAllProductsResponse,
  GetAllRelationCategory,
} from "@modules/products/dtos/GetAllProductsDTO";
import { IProductRepository } from "@repositories/IProductRepository";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

export class GetAllProductsUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private productRepository: IProductRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute(data: GetAllProductsRequest): Promise<GetAllProductsResponse> {
    const tenantAuth = await this.tenantRepository.findBySlug(data.slug);

    if (!tenantAuth) throw new AppError("Estabelecimento não encontrado", 404);

    const products = await this.productRepository.getAllProducts(
      tenantAuth.id,
      data.query,
    );

    const formatter = this.formatterResponse.array<GetAllProductsData>(() => {
      const ids: Array<string> = [];
      const i: Array<number> = [];
      const datas: Array<GetAllProductsData> = [];

      products.forEach((product, index) => {
        const { category } = product;
        ids.push(product.id);
        i.push(index);
        datas.push({
          name: product.name,
          slug: product.slug,
          image: product.image as string,
          price: product.price,
          description: product.description,
          created_at: product.created_at,
          updated_at: product.updated_at,
          category: this.formatterResponse.execute<GetAllRelationCategory>(
            category.id,
            {
              name: category.name,
              slug: category.slug,
              created_at: category.created_at,
              updated_at: category.updated_at,
            },
          ).data,
        });
      });
      return { ids, i, datas };
    });

    return formatter;
  }
}
