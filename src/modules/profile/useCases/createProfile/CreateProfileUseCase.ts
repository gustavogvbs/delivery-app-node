import { CreateProfileDTO } from "@modules/profile/dtos/CreateProfileDTO";
import { UserResponseProfileDTO } from "@modules/profile/dtos/ResponseUserProfileDTO";

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
  }: CreateProfileDTO): Promise<UserResponseProfileDTO> {
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
        const user = await tx.user.create({
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
            userId: user.id,
          },
        });
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
