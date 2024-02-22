import bcrypt from "bcrypt";

import {
  CreateUserRequest,
  CreateUserResponse,
} from "@modules/user/dtos/CreateUserDTO";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";
import { USERS_ROLES } from "@utils/RoleEnum";

export class CreateAdminUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtApi: IJwtApi,
  ) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
    const adminAlreadExists = await this.userRepository.findByRole(
      USERS_ROLES.ADMIN,
    );

    if (adminAlreadExists)
      throw new AppError("Ja existe um usuário como Admin.", 403);
    if (userAlreadyExists) throw new AppError("Email ja registrado.", 400);

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await this.userRepository.createUser({
      ...data,
      role: USERS_ROLES.ADMIN,
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
