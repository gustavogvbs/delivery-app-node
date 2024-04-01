import { Category } from "@prisma/client";

export interface ICreateCategoryData {
  name: string;
  slug: string;
  tenantId: string;
}
export interface IUpdateCategoryData {
  name: string;
  slug: string;
}

export interface ICategoryRepository {
  createCategory(data: ICreateCategoryData): Promise<Category>;
  getAllCategories(id: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string, id: string): Promise<Category | null>;
  updateCategory({ slug, name }: IUpdateCategoryData): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
}
