import { Tenant } from "@prisma/client";

export interface ITenantRepository {
  findPermission(permission: boolean): Promise<Tenant | null>;
  findBySlug(slug: string): Promise<Tenant | null>;
  findById(id: string): Promise<Tenant | null>;
}
