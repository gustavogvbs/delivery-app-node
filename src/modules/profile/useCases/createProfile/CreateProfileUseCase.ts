import { CreateProfileDTO } from "@modules/profile/dtos/CreateProfileDTO";
import { UserResponseDTO } from "@modules/profile/dtos/ResponseUserDTO";

import { AppError } from "@errors/AppErro";
import { prisma } from "@prismasrc/client";
import { JwtApi } from "@utils/JwtApi";

const useJwtApi = new JwtApi();

export class CreateProfileUseCase {
  async execute({
    name,
    email,
    password,
    phone,
    role,
  }: CreateProfileDTO): Promise<UserResponseDTO> {
    const userAlredyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlredyExists) {
      throw new AppError("User already exists");
    }

    const user = await prisma
      .$transaction(async (tx) => {
        const createUser = await tx.user.create({
          data: {
            name,
            email,
            password,
            role,
          },
          include: {
            profile: true,
          },
        });

        await tx.profile.create({
          data: {
            phone,
            userId: createUser.id,
          },
        });

        const user = await tx.user.findUnique({
          where: {
            id: createUser.id,
          },
          include: {
            profile: true,
          },
        });

        if (!user) throw new AppError("Not found");

        return user;
      })
      .catch(() => {
        throw new AppError("error 500", 500);
      });

    const token = useJwtApi.generate({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    return { user, token };
  }
}
