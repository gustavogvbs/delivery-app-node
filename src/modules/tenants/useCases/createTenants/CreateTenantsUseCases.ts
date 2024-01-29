import bcrypt from "bcrypt";

import { ITenantRepository } from "@repositories/ITenantRepository";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { IJwtApi } from "@utils/JwtApi";
import { SlugGenereted } from "@utils/SlugGenereted";

import { UserResponseType } from "@type/userResponseType";

import { CreateTenantDTO } from "../../dtos/CreateTenantDTO";

export class CreateTenantUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tenantRepository: ITenantRepository,
    private jwtApi: IJwtApi,
  ) {}
  async execute(data: CreateTenantDTO): Promise<UserResponseType> {
    const slug = SlugGenereted({
      name: data.tenant.name,
      city: data.tenant.city,
    });

    const tenantAlreadyExists = await this.tenantRepository.findBySlug(slug);
    const userAlreadyExists = await this.userRepository.findByEmail(
      data.user.email,
    );
    if (tenantAlreadyExists) throw new AppError("Slug already registered");
    if (userAlreadyExists) throw new AppError("E-mail already registered");

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(data.user.password, salt);

    const user = await this.userRepository.createTenant({
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
