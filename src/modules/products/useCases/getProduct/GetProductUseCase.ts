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

    const formatter = this.formatterResponse.execute<GetProductData>(
      product.id,
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image as string,
        description: product.description,
        created_at: product.created_at,
        updated_at: product.updated_at,
      },
    );

    return formatter;
  }
}
