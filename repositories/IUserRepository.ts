import { $Enums, User } from "@prisma/client";

export interface DataCreateUser {
  name: string;
  email: string;
  password: string;
  role: $Enums.role;
  phone: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: DataCreateUser): Promise<User>;
}
