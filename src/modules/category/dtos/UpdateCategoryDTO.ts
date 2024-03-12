import { DefaultParams } from "@utils/DefaultParams";

export interface UpdateCategoryData extends DefaultParams {
  name: string;
  slug: string;
}

export interface UpdateCategoryRequest {
  slug: string;
  name: string;
}

export interface UpdateCategoryResponse {
  data: {
    id: string;
    attributes: UpdateCategoryData;
  };
}
