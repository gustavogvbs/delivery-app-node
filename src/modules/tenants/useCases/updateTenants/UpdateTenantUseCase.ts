import { USERS_ROLES } from "@src/enums/RoleEnum";

import {
  UpdateTenantData,
  UpdateTenantRequest,
  UpdateTenantResponse,
} from "@modules/tenants/dtos/UpdateTenantDTO";
import { ITenantRepository } from "@repositories/ITenantRepository";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { getUserPermission } from "@middleware/GetUserPermission";
import { FormatterResponse } from "@utils/FormatterResponse";
import { IJwtApi } from "@utils/JwtApi";

import { JWTZod } from "@type/jwtType";

export class UpdateTenantUseCase {
  constructor(
    private tenantRepository: ITenantRepository,
    private userRepository: IUserRepository,
    private formatterResponse: FormatterResponse,
    private jwt: IJwtApi,
  ) {}

  async execute({
    city,
    name,
    permission,
    phone,
    primaryColor,
    slug,
    id,
    token,
  }: UpdateTenantRequest): Promise<UpdateTenantResponse> {
    // Pego o id do usuario que fez a requisição e busco ele no banco de dados
    const decoded = JWTZod.safeParse(this.jwt.decoded(token));
    if (!decoded.success) throw new AppError("Usuario não esta logado", 403);

    const user = await this.userRepository.findById(decoded.data.id);
    if (!user) throw new AppError("Usuario não encontrado", 404);

    const tenantAuth = await this.tenantRepository.findById(id);
    if (!tenantAuth) throw new AppError("Estabelecimento não encontrado", 401);

    const userPermission = getUserPermission(user.id, user.role as USERS_ROLES);

    const changingPermission = userPermission.can("update", "Permission");
    const changingTenant = userPermission.can(
      "update",
      "Tenant",
      tenantAuth.userId,
    );

    let tenant;

    if (changingPermission) {
      tenant = await this.tenantRepository.updateTenant({
        id,
        permission,
        slug: tenantAuth.slug,
        name: tenantAuth.name,
        city: tenantAuth.city,
        phone: tenantAuth.phone,
        primaryColor: tenantAuth.primaryColor,
      });
    }

    if (changingTenant) {
      tenant = await this.tenantRepository.updateTenant({
        id,
        name,
        slug,
        city,
        phone,
        primaryColor,
        permission: tenantAuth.permission,
      });
    }

    if (!tenant) {
      throw new AppError("Propriedades não encontradas", 404);
    }

    const result = this.formatterResponse.execute<UpdateTenantData>(tenant.id, {
      city,
      name,
      permission,
      phone,
      primaryColor,
      slug,
    });
    return result;
  }
}
