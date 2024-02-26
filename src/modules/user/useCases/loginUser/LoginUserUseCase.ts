import bcrypt from "bcrypt";

import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";
import { IJwtApi } from "@utils/JwtApi";

import {
  LoginUserData,
  LoginUserRequest,
  LoginUserResponse,
} from "../../dtos/LoginUserDTO";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtApi: IJwtApi,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({
    email,
    password,
  }: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email não registrado", 404);
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("Senha incorreta!", 400);
    }

    const token = this.jwtApi.generate({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    const data = this.formatterResponse.execute<LoginUserData>(user.id, {
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      phone: user.phone,
    });

    const result = {
      token,
      user: data,
    };

    return result;
  }
}
