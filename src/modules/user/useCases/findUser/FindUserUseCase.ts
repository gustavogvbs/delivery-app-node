import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";

import { FindUserRequest, FindUserResponse } from "../../dtos/FindUserDTO";

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: FindUserRequest): Promise<FindUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const result = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return result;
  }
}
