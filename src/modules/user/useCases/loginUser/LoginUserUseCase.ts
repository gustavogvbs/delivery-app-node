import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { UserResponseDTO } from "../../dtos/ResponseUserDTO";
import { AppError } from "../../../../errors/AppErro";

import { LoginUserDTO } from "../../dtos/LoginUserDTO";
import { JwtApi } from "../../../../utils/JwtApi";

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
