import {
  GetAllProductsData,
  GetAllProductsRequest,
  GetAllProductsResponse,
} from "@modules/products/dtos/GetAllProductsDTO";
import { IProductRepository } from "@repositories/IProductRepository";

import { FormatterResponse } from "@utils/FormatterResponse";

export class GetAllProductsUseCase {
  constructor(
    private productRepository: IProductRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute(data: GetAllProductsRequest): Promise<GetAllProductsResponse> {
    const products = await this.productRepository.getAllProducts(data.tenantId);
    const formatter = this.formatterResponse.array<GetAllProductsData>(() => {
      const ids: Array<string> = [];
      const i: Array<number> = [];
      const datas: Array<GetAllProductsData> = [];

      products.forEach(
        (
          { id, slug, image, name, price, updated_at, description, created_at },
          index,
        ) => {
          ids.push(id);
          i.push(index);
          datas.push({
            slug,
            image: image as string,
            name,
            price,
            updated_at,
            description,
            created_at,
          });
        },
      );
      return { ids, i, datas };
    });

    return formatter;
  }
}
