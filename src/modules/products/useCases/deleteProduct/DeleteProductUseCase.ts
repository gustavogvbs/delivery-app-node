import { DeleteProductRequest } from "@modules/products/dtos/DeleteProductDTO";
import { IProductRepository } from "@repositories/IProductRepository";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";

export class DeleteProductUseCase {
  constructor(
    private userRepository: IUserRepository,
    private productRepository: IProductRepository,
    private jwt: IJwtApi,
  ) {}

  async execute(data: DeleteProductRequest) {
    const token = this.jwt.verify(data.token);

    const userAuth = await this.userRepository.findById(token.id, ["tenant"]);

    if (!userAuth || !userAuth.tenant) throw new AppError("Forbidden", 403);

    const productAlreadExist = await this.productRepository.getById(data.id);
    if (!productAlreadExist) throw new AppError("Produto não encontrado", 404);

    await this.productRepository.deleteProduct(data.id);
  }
}
