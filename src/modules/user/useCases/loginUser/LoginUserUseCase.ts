import { prisma } from "../../../../prisma/client";
import { CreateUserDTO, UserResponseDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppErro";

import jwt from "jsonwebtoken";
import { env } from "../../../../env";
import { LoginUserDTO } from "../../dtos/LoginUserDTO";

export class LoginUserUseCase {
	async execute({ email, password }: LoginUserDTO): Promise<UserResponseDTO> {
		console.log("olaaaa");
		const userAlredyExists = await prisma.user.findUnique({
			where: {
				email,
				//password,
			},
		});
		console.log(userAlredyExists);
		if (!userAlredyExists) {
			throw new AppError("User already exists");
		}

		const token = jwt.sign(
			{
				name: userAlredyExists.name,
				email: userAlredyExists.email,
			},
			env.JWT_SECRET_KEY,
			{
				expiresIn: "12h",
			}
		);
		return { user: userAlredyExists, token };
	}
}
