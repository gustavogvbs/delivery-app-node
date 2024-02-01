import { Category } from "@prisma/client";

export interface ICreateCategoryData {
  name: string;
  slug: string;
  tenantId: string;
}

export interface ICategoryRepository {
  createCategory(data: ICreateCategoryData): Promise<Category>;
}
