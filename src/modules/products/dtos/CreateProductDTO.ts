import { DefaultParams } from "@utils/DefaultParams";

import { ContractResponseAttr, ContractResponseData } from "@type/contracts";

export interface CreateProductRelationCategory extends DefaultParams {
  name: string;
  slug: string;
}

export interface CreateProductData extends DefaultParams {
  slug: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ContractResponseAttr<CreateProductRelationCategory>;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  token: string;
  query: string[];
}

export type CreateProductResponse = ContractResponseData<CreateProductData>;
