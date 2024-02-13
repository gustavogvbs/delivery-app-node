import { UpdateProductRequest } from "@modules/products/dtos/UploadProductDTO";
import { IProductRepository } from "@repositories/IProductRepository";

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: UpdateProductRequest) {
    const productUpdade = await this.productRepository.updateProduct(data);

    return productUpdade;
  }
}
