import { Tenant } from "@prisma/client";

export interface IUpdateTenantData {
  name: string;
  city: string;
  primaryColor: string;
  phone: string;
  slug: string;
  permission: boolean;
}

export interface ITenantRepository {
  findBySlug(slug: string): Promise<Tenant | null>;
  findById(id: string): Promise<Tenant | null>;
  updateTenant(data: IUpdateTenantData): Promise<Tenant>;
}
