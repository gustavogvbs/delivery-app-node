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
    const formatter =
      await this.formatterResponse.array<GetAllProductsData>(products);

    return formatter;
  }
}
