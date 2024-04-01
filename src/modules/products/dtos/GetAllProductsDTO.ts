import { DefaultParams } from "@utils/DefaultParams";

import { ContractResponseArr, ContractResponseAttr } from "@type/contracts";
import { ImageJsonSchemaType } from "@type/image-json";

export interface GetAllRelationCategory extends DefaultParams {
  name: string;
  slug: string;
}

export interface GetAllProductsData extends DefaultParams {
  slug: string;
  name: string;
  price: number;
  image: ImageJsonSchemaType;
  description: string;
  category: ContractResponseAttr<GetAllRelationCategory>;
}

export interface GetAllProductsRequest {
  slug: string;
  query: string[] | undefined;
}

export type GetAllProductsResponse = ContractResponseArr<GetAllProductsData>;
