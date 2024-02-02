import { Product } from "@prisma/client";

export interface ICreateProductData {}

export interface IProductRepository {
  createProduct(data: ICreateProductData): Promise<Product>;
}
