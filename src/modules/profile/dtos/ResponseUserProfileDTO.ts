import { User } from "@prisma/client";

export interface UserResponseProfileDTO {
  user: User;
  token: string;
}
