import { UserAuthRequest } from "@modules/user/dtos/UserAuthenticationDTO";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";

import { JWTZod } from "@type/jwtType";

export class UserAuthUseCase {
  constructor(
    private userRepository: IUserRepository,

    private jwt: IJwtApi,
  ) {}
  async execute({ role, token }: UserAuthRequest) {
    const decoded = JWTZod.safeParse(this.jwt.decoded(token));
    if (!decoded.success) throw new AppError("Usuario não esta logado", 403);
    const { id } = decoded.data;

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    if (role !== user.role) {
      throw new AppError("Você não tem permissão para fazer o login", 403);
    }
  }
}
