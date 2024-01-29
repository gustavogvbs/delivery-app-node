import bcrypt from "bcrypt";

import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";

import { UserResponseType } from "@type/userResponseType";

import { IUserRepository } from "../../../../../repositories/IUserRepository";

export class CreateAdminUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtApi: IJwtApi,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserResponseType> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (!userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await this.userRepository.createUser({
      ...data,
      role: "ADMIN",
      password: passwordHash,
    });

    const token = this.jwtApi.generate({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    const result = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };

    return result;
  }
}
