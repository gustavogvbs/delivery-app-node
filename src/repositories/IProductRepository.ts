import { Product } from "@prisma/client";

export interface ICreateProductData {
  tenantId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
}

export interface IProductRepository {
  createProduct(data: ICreateProductData): Promise<Product>;
  getBySlug(slug: string): Promise<Product | null>;
  getAllProducts(tenantId: string): Promise<Product[]>;
}
