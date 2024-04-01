import { DefaultParams } from "@utils/DefaultParams";

export interface GetProductData extends DefaultParams {
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
}

export interface GetProductRequest {
  slug: string;
}

export interface GetProductResponse {
  data: {
    id: string;
    attributes: GetProductData;
  };
}
