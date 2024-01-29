import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";

import { AppError } from "@errors/AppErro";

import { IUserRepository } from "../../../../../repositories/IUserRepository";

export class CreateAdminUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (!userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const user = await this.userRepository.createUser({
      role: "ADMIN",
      ...data,
    });

    return user;
  }
}
