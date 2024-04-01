import { $Enums, Tenant, User } from "@prisma/client";

export interface DataCreateUser {
  name: string;
  email: string;
  password: string;
  role: $Enums.role;
  phone: string;
}

export interface DataCreateTenant {
  name: string;
  email: string;
  password: string;
  role: $Enums.role;
  slug: string;
  tenantName: string;
  primaryColor: string;
  city: string;
  phone: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: DataCreateUser): Promise<User>;
  createTenant(data: DataCreateTenant): Promise<{ tenant: Tenant; user: User }>;
  findByRole(role: $Enums.role): Promise<User | null>;
  findById(
    id: string,
    query?: string[],
  ): Promise<(User & { tenant: Tenant | null }) | null>;
}
