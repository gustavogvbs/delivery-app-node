import { DefaultParams } from "@utils/DefaultParams";

export interface GetAllProductsData extends DefaultParams {
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface GetAllProductsRequest {
  tenantId: string;
}
export interface GetAllProductsResponse {
  data: {
    id: string;
    attributes: GetAllProductsData;
  }[];
}
