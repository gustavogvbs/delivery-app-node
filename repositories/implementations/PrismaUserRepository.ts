import { User } from "@prisma/client";

import { AppError } from "@errors/AppErro";
import { prisma } from "@prismasrc/client";

import { DataCreateUser, IUserRepository } from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {
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
}
