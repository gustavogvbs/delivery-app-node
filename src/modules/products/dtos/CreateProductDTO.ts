import { DefaultParams } from "@utils/DefaultParams";

export interface CreateProductData extends DefaultParams {
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  tenantId: string;
  categoryId: string;
}

export interface CreateProductResponse {
  data: {
    id: string;
    attributes: CreateProductData;
  };
}
