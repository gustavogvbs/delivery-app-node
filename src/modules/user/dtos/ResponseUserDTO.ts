import { User } from "@prisma/client";

export interface UserResponseDTO {
  user: User;
  token: string;
}
