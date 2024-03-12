import { DefaultParams } from "@utils/DefaultParams";

export interface GetAllCategoryData extends DefaultParams {
  name: string;
  slug: string;
}
export interface GetAllCategoriesRequest {
  idTenant: string;
}

export interface GetAllCategoryResponse {
  data: {
    id: string;
    attributes: GetAllCategoryData;
  }[];
}
