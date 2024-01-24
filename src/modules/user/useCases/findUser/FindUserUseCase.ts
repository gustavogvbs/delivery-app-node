import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppErro";

import { FindUserDTO } from "../../dtos/FindUserDTO";

export class FindUserUseCase {
	async execute({ id }: FindUserDTO): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			throw new AppError("User already exists");
		}

		return user;
	}
}
