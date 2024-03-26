import { DefaultParams } from "@utils/DefaultParams";

import { ContractResponseArr } from "@type/contracts";

export interface GetAllCategoryData extends DefaultParams {
  name: string;
  slug: string;
}
export interface GetAllCategoriesRequest {
  slug: string;
}

export type GetAllCategoryResponse = ContractResponseArr<GetAllCategoryData>;
