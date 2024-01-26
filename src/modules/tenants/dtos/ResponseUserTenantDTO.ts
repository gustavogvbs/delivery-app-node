import { User } from "@prisma/client";

export interface UserResponseTenantDTO {
  user: User;
  token: string;
}
