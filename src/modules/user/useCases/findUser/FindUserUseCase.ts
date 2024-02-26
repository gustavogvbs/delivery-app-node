import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";
import { JwtApi } from "@utils/JwtApi";

import { JWTZod } from "@type/jwtType";

import {
  FindUserData,
  FindUserRequest,
  FindUserResponse,
} from "../../dtos/FindUserDTO";

export class FindUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtApi: JwtApi,
    private formatterResponse: FormatterResponse,
  ) {}

  async execute({ id, token }: FindUserRequest): Promise<FindUserResponse> {
    const decoded = JWTZod.safeParse(this.jwtApi.decoded(token));
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError("Usuário não encontrado", 404);
    if (decoded.success && user.id !== decoded.data.id)
      throw new AppError("Não tem permissão", 403);

    const result = this.formatterResponse.execute<FindUserData>(user.id, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    return result;
  }
}
