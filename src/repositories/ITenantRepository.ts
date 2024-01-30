import { Tenant } from "@prisma/client";

export interface ITenantRepository {
  findBySlug(slug: string): Promise<Tenant | null>;
}
