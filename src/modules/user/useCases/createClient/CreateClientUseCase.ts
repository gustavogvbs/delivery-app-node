import bcrypt from "bcrypt";

import {
  CreateUserRequest,
  CreateUserResponse,
} from "@modules/user/dtos/CreateUserDTO";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";
import { USERS_ROLES } from "@utils/RoleEnum";

export class CreateClientUseCase {
  constructor(
    private clientRepository: IUserRepository,
    private jwtApi: IJwtApi,
  ) {}
  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const clieAlredyExists = await this.clientRepository.findByEmail(
      data.email,
    );

    if (clieAlredyExists) {
      throw new AppError("Email já registrado", 404);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const client = await this.clientRepository.createUser({
      ...data,
      role: USERS_ROLES.CLIENT,
      password: passwordHash,
    });

    const token = this.jwtApi.generate({
      name: client.name,
      id: client.id,
      role: client.role,
    });

    const result = {
      token,
      user: {
        id: client.id,
        name: client.name,
        email: client.email,
        created_at: client.created_at,
        updated_at: client.updated_at,
      },
    };

    return result;
  }
}
