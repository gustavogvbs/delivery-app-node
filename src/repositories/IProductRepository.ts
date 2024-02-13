import { Product } from "@prisma/client";

export interface ICreateProductData {
  tenantId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
}

export interface IUploadProductData {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface IProductRepository {
  createProduct(data: ICreateProductData): Promise<Product>;
  getBySlug(slug: string): Promise<Product | null>;
  getAllProducts(tenantId: string): Promise<Product[]>;
  updateProduct(data: IUploadProductData): Promise<Product | null>;
}
