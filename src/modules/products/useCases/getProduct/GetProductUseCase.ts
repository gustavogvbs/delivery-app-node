import { GetProductRequest } from "@modules/products/dtos/GetProductDTO";
import { IProductRepository } from "@repositories/IProductRepository";

import { AppError } from "@errors/AppErro";

export class GetProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({ slug }: GetProductRequest) {
    const product = await this.productRepository.getBySlug(slug);

    if (!product) throw new AppError("Produto não encontrado", 404);

    return product;
  }
}
