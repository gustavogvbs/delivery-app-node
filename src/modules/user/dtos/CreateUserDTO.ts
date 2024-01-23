import { User } from "@prisma/client";

export interface CreateUserDTO {
	name: string;
	email: string;
}

export interface UserResponseDTO {
	user: User;
	token: string;
}
