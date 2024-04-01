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
      name,
      price,
      slug,
      categoryId,
      description,
    });
    if (!product) {
      throw new AppError("Propriedades não encontradas", 404);
    }
    const formatter = this.formatterResponse.execute<UpdateProductData>(
      product.id,
      {
        name: product.name,
        slug: product.slug,
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
