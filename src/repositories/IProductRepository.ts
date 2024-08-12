import { Category, Product } from "@prisma/client";

import { ImageJsonSchemaType } from "@type/image-json";

export interface ICreateProductData {
  tenantId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: ImageJsonSchemaType;
}

export interface IUploadProductData {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface IProductRepository {
  createProduct(
    data: ICreateProductData,
    query: string[],
  ): Promise<Product & { category: Category | null }>;
  getBySlug(slug: string, tenantId: string): Promise<Product | null>;
  getById(id: string): Promise<Product | null>;
  getAllProducts(
    tenantId: string,
    query?: string[],
  ): Promise<(Product & { category: Category })[]>;
  updateProduct(data: IUploadProductData): Promise<Product | null>;
  deleteProduct(id: string): Promise<void>;
}
