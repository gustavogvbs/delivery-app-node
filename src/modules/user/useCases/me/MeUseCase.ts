import { MeUserRequest } from "@modules/user/dtos/MeUserDTO";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";
import { FormatterArrayResponse } from "@utils/res/FormatterArrayResponse";
import { FormatterDataResponse } from "@utils/res/FormatterDataResponse";
import { UserResponseData } from "@utils/res/formatters/user-response";

export class MeUseCase {
  constructor(
    private formatterDataResponse: FormatterDataResponse,
    private formatterArrayResponse: FormatterArrayResponse,
    private userRepository: IUserRepository,
    private jwtApi: IJwtApi,
  ) {}

  async execute(data: MeUserRequest): Promise<UserResponseData> {
    const { query } = data;
    const decoded = this.jwtApi.verify(data.token);

    const user = await this.userRepository.findById(decoded.id, data.query);

    if (!user) {
      throw new AppError("Usuario não encontrado", 405);
    }

    const tenant = user.tenant
      ? this.formatterDataResponse.tenant(user.tenant)
      : undefined;
    const orders = this.formatterArrayResponse.orders(user.orders || []);

    const result = this.formatterDataResponse.user(user, {
      orders: query?.includes("orders") ? orders?.data : undefined,
      tenant: query?.includes("tenant") ? tenant?.data : undefined,
    });

    return result;
  }
}
