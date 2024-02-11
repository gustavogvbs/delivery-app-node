import { $Enums, User } from "@prisma/client";

import { prisma } from "@configs/client";

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
    });

    return user;
  }

  async createUser(data: DataCreateUser): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
      },
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
          phone: data.phone,
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
