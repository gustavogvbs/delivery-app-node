import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";

import { IUserType } from "@type/userResponseType";

import { FindUserDTO } from "../../dtos/FindUserDTO";

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: FindUserDTO): Promise<IUserType> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User already exists");
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
