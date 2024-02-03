import { GetAllProductsRequest } from "@modules/products/dtos/GetAllProductsDTO";
import { IProductRepository } from "@repositories/IProductRepository";

export class GetAllProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: GetAllProductsRequest) {
    const products = await this.productRepository.getAllProducts(data.tenantId);

    return products;
  }
}
