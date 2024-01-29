import { UserResponseTenantDTO } from "@modules/tenants/dtos/ResponseUserTenantDTO";

import { AppError } from "@errors/AppErro";
import { prisma } from "@prismasrc/client";
import { JwtApi } from "@utils/JwtApi";
import { SlugGenereted } from "@utils/SlugGenereted";

import { CreateTenantDTO } from "../../dtos/CreateTenantDTO";

const useJwtApi = new JwtApi();

export class CreateTanantUseCase {
  async execute({
    user,
    tenant,
  }: CreateTenantDTO): Promise<UserResponseTenantDTO> {
    const slug = SlugGenereted({ name: tenant.name, city: tenant.city });
    await prisma
      .$transaction(async (tx) => {
        const checkUser = await tx.user.findUnique({
          where: { email: user.email },
        });
        const tenant = await tx.tenant.findUnique({ where: { slug } });

        if (checkUser) throw new AppError("E-mail already registered");
        if (tenant) throw new AppError("Slug already registered");

        return { checkUser, tenant };
      })
      .then((data) => {
        if (!data.tenant && !data.checkUser) return null;
        return true;
      })
      .catch(() => {
        throw new AppError("error 500", 500);
      });

    const newUser = await prisma.$transaction(async (tx) => {
      const createUser = await tx.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });
      await tx.tenant.create({
        data: {
          slug,
          name: tenant.name,
          primaryColor: tenant.primaryColor,
          phone: tenant.phone,
          city: tenant.city,
          userId: createUser.id,
        },
      });

      return createUser;
    });

    const token = useJwtApi.generate({
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
    });

    return { user: newUser, token };
  }
}
