import { prisma } from "@prismasrc/client";
import { AppError } from "@errors/AppErro";

import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { UserResponseDTO } from "../../dtos/ResponseUserDTO";

import { JwtApi } from "@utils/JwtApi";

const useJwtApi = new JwtApi();

export class CreateUserUseCase {
  async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<UserResponseDTO> {
    const userAlredyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlredyExists) {
      throw new AppError("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        password,
        name,
        email,
        role: "client",
      },
    });

    const token = useJwtApi.generate(user);

    return { user, token };
  }
}
