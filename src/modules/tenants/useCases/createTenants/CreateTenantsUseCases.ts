import bcrypt from "bcrypt";

import { ITenantRepository } from "@repositories/ITenantRepository";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";
import { IJwtApi } from "@utils/JwtApi";
import { SlugGenereted } from "@utils/SlugGenereted";

import {
  CreateTenantData,
  CreateTenantRequest,
  CreateTenantResponse,
} from "../../dtos/CreateTenantDTO";

export class CreateTenantUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tenantRepository: ITenantRepository,
    private jwtApi: IJwtApi,
    private formatterResponse: FormatterResponse,
  ) {}
  async execute(data: CreateTenantRequest): Promise<CreateTenantResponse> {
    const slug = SlugGenereted({
      name: data.tenant.name,
      prefix: data.tenant.city,
    });

    const tenantAlreadyExists = await this.tenantRepository.findBySlug(slug);
    const userAlreadyExists = await this.userRepository.findByEmail(
      data.user.email,
    );
    if (tenantAlreadyExists) throw new AppError("Slug ja foi registrado", 400);
    if (userAlreadyExists) throw new AppError("E-mail ja foi registered", 400);

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.user.password, salt);

    const { tenant, user } = await this.userRepository.createTenant({
      name: data.user.name,
      email: data.user.email,
      password: passwordHash,
      role: data.user.role,
      tenantName: data.tenant.name,
      city: data.tenant.city,
      phone: data.tenant.phone,
      primaryColor: data.tenant.primaryColor,
      slug,
    });

    const token = this.jwtApi.generate({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    const res = this.formatterResponse.execute<CreateTenantData>(tenant.id, {
      city: tenant.city,
      name: tenant.name,
      slug: tenant.slug,
      phone: tenant.phone,
      permission: tenant.permission,
      primaryColor: tenant.primaryColor,
    });

    const result = {
      token,
      tenant: res,
    };

    return result;
  }
}
