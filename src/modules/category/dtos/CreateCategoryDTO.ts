import { DefaultParams } from "@utils/DefaultParams";

export interface CreateCategoryData extends DefaultParams {
  name: string;
  slug: string;
}

export interface CreateCategoryRequest {
  name: string;
  token: string;
}

export interface CreateCategoryResponse {
  data: {
    id: string;
    attributes: CreateCategoryData;
  };
}
