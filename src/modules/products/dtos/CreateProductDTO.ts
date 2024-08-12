import { DefaultParams } from "@utils/DefaultParams";

import { ContractResponseAttr, ContractResponseData } from "@type/contracts";
import { ImageJsonSchemaType } from "@type/image-json";

export interface CreateProductRelationCategory extends DefaultParams {
  name: string;
  slug: string;
}

export interface CreateProductData extends DefaultParams {
  slug: string;
  name: string;
  price: number;
  description: string;
  image: ImageJsonSchemaType;
  category: ContractResponseAttr<CreateProductRelationCategory>;
}

export interface CreateProductRequest {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  token: string;
  query: string[];
  image: ImageJsonSchemaType;
}

export type CreateProductResponse = ContractResponseData<CreateProductData>;
