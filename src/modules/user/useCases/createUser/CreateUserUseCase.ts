import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppErro";

export class CreateUserUseCase {
	async execute({ name, email }: CreateUserDTO): Promise<User> {
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

		return user;
	}
}
