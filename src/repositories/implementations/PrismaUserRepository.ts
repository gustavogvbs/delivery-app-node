import { $Enums, User } from "@prisma/client";

import { prisma } from "@configs/client";
import { AppError } from "@errors/AppErro";

import {
  DataCreateTenant,
  DataCreateUser,
  IUserRepository,
} from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async findByRole(role: $Enums.role): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        role,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    return user;
  }

  async createUser(data: DataCreateUser): Promise<User> {
    const user = await prisma
      .$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
          },
          include: {
            profile: true,
          },
        });

        await tx.profile.create({
          data: {
            phone: data.phone,
            userId: user.id,
          },
        });
        return user;
      })
      .catch(() => {
        throw new AppError("error 500", 500);
      });

    return user;
  }
  async createTenant(data: DataCreateTenant): Promise<User> {
    const user = await prisma.$transaction(async (tx) => {
      const createUser = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        },
      });
      await tx.tenant.create({
        data: {
          slug: data.slug,
          name: data.tenantName,
          primaryColor: data.primaryColor,
          phone: data.phone,
          city: data.city,
          userId: createUser.id,
        },
      });

      return createUser;
    });

    return user;
  }
}
