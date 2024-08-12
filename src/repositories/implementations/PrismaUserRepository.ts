import { $Enums, Order, Tenant, User } from "@prisma/client";

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

  async findById(
    id: string,
    query?: string[],
  ): Promise<(User & { tenant?: Tenant | null; orders: Order[] }) | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        tenant: query ? query.includes("tenant") : false,
        adresses: query ? query.includes("adresses") : false,
        orders: query ? query.includes("orders") : false,
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
  async createTenant(
    data: DataCreateTenant,
  ): Promise<{ tenant: Tenant; user: User }> {
    const { createTenant, createUser } = await prisma.$transaction(
      async (tx) => {
        const createUser = await tx.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            phone: data.phone,
          },
        });
        const createTenant = await tx.tenant.create({
          data: {
            slug: data.slug,
            name: data.tenantName,
            primaryColor: data.primaryColor,
            phone: data.phone,
            city: data.city,
            userId: createUser.id,
          },
        });

        return { createUser, createTenant };
      },
    );

    return { tenant: createTenant, user: createUser };
  }
}
