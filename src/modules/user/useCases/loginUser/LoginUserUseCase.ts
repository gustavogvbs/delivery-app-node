import { AppError } from "@errors/AppErro";
import { prisma } from "@prismasrc/client";
import { JwtApi } from "@utils/JwtApi";

import { LoginUserDTO } from "../../dtos/LoginUserDTO";
import { UserResponseDTO } from "../../dtos/ResponseUserDTO";

const useJwtApi = new JwtApi();

export class LoginUserUseCase {
  async execute({ email, password }: LoginUserDTO): Promise<UserResponseDTO> {
    const userAlredyExists = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!userAlredyExists) {
      throw new AppError("User already exists");
    }

    const token = useJwtApi.generate(userAlredyExists);

    return { user: userAlredyExists, token };
  }
}
