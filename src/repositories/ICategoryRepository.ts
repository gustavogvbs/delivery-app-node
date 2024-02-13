import { Category } from "@prisma/client";

export interface ICreateCategoryData {
  slug: string;
  name: string;
  tenantId: string;
}

export interface ICategoryRepository {
  createCategory(data: ICreateCategoryData): Promise<Category>;
  getAllCategories(idTenant: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  updateCategory(slug: string, name: string): Promise<Category>;
}
