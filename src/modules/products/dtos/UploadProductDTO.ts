import { DefaultParams } from "@utils/DefaultParams";

export interface UpdateProductData extends DefaultParams {
  name: string;
  description: string;
  price: number;
  slug: string;
}
export interface UpdateProductRequest {
  name: string;
  description: string;
  price: number;
  slug: string;
  categoryId: string;
}

export interface UpdateProductResponse {
  data: {
    id: string;
    attributes: UpdateProductData;
  };
}
