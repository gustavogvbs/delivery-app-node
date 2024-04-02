import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { JwtApi } from "@utils/JwtApi";
import { FormatterDataResponse } from "@utils/res/FormatterDataResponse";

import { JWTZod } from "@type/jwtType";

import { FindUserRequest, FindUserResponse } from "../../dtos/FindUserDTO";

export class FindUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtApi: JwtApi,
    private formatterDataResponse: FormatterDataResponse,
  ) {}

  async execute({ id, token }: FindUserRequest): Promise<FindUserResponse> {
    const decoded = JWTZod.safeParse(this.jwtApi.decoded(token));
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError("Usuário não encontrado", 404);
    if (decoded.success && user.id !== decoded.data.id)
      throw new AppError("Não tem permissão", 403);

    const result = this.formatterDataResponse.user(user);

    return result;
  }
}
