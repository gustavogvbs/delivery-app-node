import {
  UpdateProductData,
  UpdateProductRequest,
  UpdateProductResponse,
} from "@modules/products/dtos/UploadProductDTO";
import { IProductRepository } from "@repositories/IProductRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";

export class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({
    categoryId,
    description,
    name,
    price,
    slug,
  }: UpdateProductRequest): Promise<UpdateProductResponse> {
    const product = await this.productRepository.updateProduct({
      categoryId,
      description,
      name,
      price,
      slug,
    });
    if (!product) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const formatter = await this.formatterResponse.execute<UpdateProductData>(
      product.id,
      {
        created_at: product.created_at,
        description: product.description,
        name: product.name,
        price: product.price,
        slug: product.slug,
        updated_at: product.updated_at,
      },
    );
    return formatter;
  }
}
