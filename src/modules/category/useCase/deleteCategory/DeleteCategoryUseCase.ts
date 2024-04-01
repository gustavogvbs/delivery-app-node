import { DeleteCategoryRequest } from "@modules/category/dtos/DeleteCategoryDTO";
import { ICategoryRepository } from "@repositories/ICategoryRepository";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";

export class DeleteCategoryUseCase {
  constructor(
    private jwt: IJwtApi,
    private userRepository: IUserRepository,
    private categoryrepository: ICategoryRepository,
  ) {}

  async execute(data: DeleteCategoryRequest) {
    const token = this.jwt.verify(data.token);

    const userAuth = await this.userRepository.findById(token.id);

    if (!userAuth || !userAuth.tenant) {
      throw new AppError("Forbidden", 403);
    }
    const categoryAlReadExists = await this.categoryrepository.findById(
      data.id,
    );
    if (!categoryAlReadExists) {
      throw new AppError("Categoria não encontrada", 404);
    }
    await this.categoryrepository.deleteCategory(data.id);
  }
}
