import bcrypt from "bcrypt";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";

import { UserResponseType } from "@type/userResponseType";

import { IUserRepository } from "../../../../../repositories/IUserRepository";
import { LoginUserDTO } from "../../dtos/LoginUserDTO";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtApi: IJwtApi,
  ) {}

  async execute({ email, password }: LoginUserDTO): Promise<UserResponseType> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email not found");
    }

    const checkPassword = bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("Senha incorreta!");
    }

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
