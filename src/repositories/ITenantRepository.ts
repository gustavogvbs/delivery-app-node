import { Category, Order, Product, Tenant } from "@prisma/client";

export interface IUpdateTenantData {
  id: string;
  name: string;
  city: string;
  primaryColor: string;
  phone: string;
  slug: string;
  permission: boolean;
}

export interface ITenantRepository {
  findBySlug(
    slug: string,
    query?: string[],
  ): Promise<
    | (Tenant & {
        categories: Category[];
        orders: Order[];
        products: Product[];
      })
    | null
  >;
  findById(id: string): Promise<Tenant | null>;
  findByUserId(id: string): Promise<Tenant | null>;
  updateTenant(data: IUpdateTenantData): Promise<Tenant>;
  getAll(): Promise<Tenant[]>;
}
