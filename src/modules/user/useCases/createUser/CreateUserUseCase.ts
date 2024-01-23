import { prisma } from "../../../../prisma/client";
import { CreateUserDTO, UserResponseDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppErro";

import jwt from "jsonwebtoken";
import { env } from "../../../../env";

export class CreateUserUseCase {
	async execute({ name, email }: CreateUserDTO): Promise<UserResponseDTO> {
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
				name,
				email,
			},
		});

		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			env.JWT_SECRET_KEY,
			{
				expiresIn: "12h",
			}
		);

		return { user, token };
	}
}
