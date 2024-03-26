import {
  MeUserData,
  MeUserRelationTenant,
  MeUserRequest,
  MeUserResponse,
} from "@modules/user/dtos/MeUserDTO";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";
import { IJwtApi } from "@utils/JwtApi";

import { JWTZod } from "@type/jwtType";

export class MeUseCase {
  constructor(
    private formatterResponse: FormatterResponse,
    private userRepository: IUserRepository,
    private jwtApi: IJwtApi,
  ) {}

  async execute(data: MeUserRequest): Promise<MeUserResponse> {
    const decoded = JWTZod.safeParse(this.jwtApi.decoded(data.token));

    if (!decoded.success) throw new AppError("jwt invalido", 403);

    const res = await this.userRepository.findById(decoded.data.id);

    if (!res || !res?.user) {
      throw new AppError("Usuario não encontrado", 405);
    }

    const { user, tenant } = res;

    const relationResult = tenant
      ? this.formatterResponse.execute<MeUserRelationTenant>(tenant.id, {
          city: tenant.city,
          name: tenant.name,
          phone: tenant.phone,
          primaryColor: tenant.primaryColor,
          slug: tenant.slug,
          userId: tenant.userId,
        })
      : undefined;

    const result = this.formatterResponse.execute<MeUserData>(user.id, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      created_at: user.created_at,
      updated_at: user.updated_at,
      tenant: relationResult?.data ?? undefined,
    });

    return result;
  }
}
