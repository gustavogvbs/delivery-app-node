import {
  GetProductData,
  GetProductRequest,
  GetProductResponse,
} from "@modules/products/dtos/GetProductDTO";
import { IProductRepository } from "@repositories/IProductRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

export class GetProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({ slug }: GetProductRequest): Promise<GetProductResponse> {
    const product = await this.productRepository.getBySlug(slug);

    if (!product) throw new AppError("Produto não encontrado", 404);

    const formatter = await this.formatterResponse.execute<GetProductData>(
      product.id,
      { slug },
    );

    return formatter;
  }
}
