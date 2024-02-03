import bcrypt from "bcrypt";

import {
  CreateProfileRequest,
  CreateProfileResponse,
} from "@modules/profile/dtos/CreateProfileDTO";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";

export class CreateProfileUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtApi: IJwtApi,
  ) {}
  async execute(data: CreateProfileRequest): Promise<CreateProfileResponse> {
    const userAlredyExists = await this.userRepository.findByEmail(data.email);

    if (userAlredyExists) {
      throw new AppError("O Usuário ja existe", 404);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await this.userRepository.createUser({
      ...data,
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
